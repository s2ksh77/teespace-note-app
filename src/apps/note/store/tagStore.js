import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import PageStore from "./pageStore";

const TagStore = observable({
  notetagList: [],
  tagSortList: [],
  isNewTag: false,
  tagText: "",
  addTagList: [],
  removeTagList: [],
  updateTagList: [],
  tagList: [],
  currentTagId: "",
  currentTagValue: "",
  editTagIndex: "",
  editTagValue: "",
  // allTagList: [],
  hasTag:false,
  // 처음 받아오는 데이터
  allSortedTagList:[],
  // key당 tagList
  filteredTagObj:{},
  // a,b,c 같은 키들만 담는다
  sortedTagList: {},
  // sortedTagList:{
  //   KOR:[],
  //   ENG:[],
  //   NUM:[],
  //   ETC:[]
  // },
  // 태그 검색
  isSearching:false,
  searchString:"",
  searchResult:{},
  //filteredTagObj에 담을 때마다 render되는 것 같아서 loading 넣어줌
  tagPanelLoading:true,
  getChannelTagList() {
    return this.tagList;
  },  
  async getNoteTagList(noteId) {
    await NoteRepository.getNoteTagList(noteId).then((response) => {
      if (response.status === 200) {
        const {
          data: { dto: tagList },
        } = response;
        this.notetagList = tagList.tagList;
      }
    });
    return this.notetagList;
  },
  // 없어도 될 것 같음
  // async getAllTagList() {
  //   const res = await NoteRepository.getAllTagList();
  //   const {data:{dto:{tagList}}} = res;
  //   //{dto:{tagList:[0,1,2,3,4]}
  //   this.allTagList = tagList;
  //   const target = tagList.filter((item) => item.text.includes('번'));
  //   return this.allTagList;
  // },  
  async getAllSortedTagList() {  
    this.tagPanelLoading = true;
    const res = await NoteRepository.getAllSortedTagList();
    const {data:{dto:{tag_index_list_dto}}} = res;    
    this.allSortedTagList = tag_index_list_dto;
    if (this.allSortedTagList.length === 0) {
      this.hasTag = false;
      return; 
    } else this.hasTag = true;

    /*
       this.filteredTagObj 만들기
       item : KEY별로
       this.filteredTagObj = 
       {"ㄱ" : {tagName1:{tagId:'', note_id:[]},
                tagName2:{tagId:'', note_id:[]}}        
        }
    */

    this.allSortedTagList.forEach((item) => { 
      let resultObj = {};
      // 'ㄱ','ㄴ'... 해당 KEY에 속한 TAG LIST
      let tagList = item.tag_indexdto.tagList;
      tagList.forEach((tag) => {
        let target = resultObj[tag.text];
        if (target) target["note_id"].push(tag.note_id);
        else {
          resultObj[tag.text] = {
            id: tag.tag_id,
            note_id : [tag.note_id]
          }
        }
      })
      this.filteredTagObj[item.KEY] = resultObj;
    })

    // key 정렬
    let tagKey = [];
    this.allSortedTagList.forEach((category) => {
      tagKey.push(category["KEY"])
    })
    tagKey.sort();
    
    // sort하고 분류해서 koArr, engArr, numArr, etcArr은 sort 돼 있음
    let korObj = {}, engObj = {}, numObj = {}, etcObj = {};
    tagKey.forEach((key) => {
      if( key.charCodeAt(0) >= 12593 && key.charCodeAt(0) < 55203 ){
        korObj[key] = this.filteredTagObj[key];
      }
      else if(key.charCodeAt(0) > 64 && key.charCodeAt(0) < 123){
        engObj[key] = this.filteredTagObj[key];
      }
      else if(key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57){
        numObj[key] = this.filteredTagObj[key];
      }
      else {
        etcObj[key] = this.filteredTagObj[key];
      }
    })

    if ( Object.keys(korObj).length > 0 ) this.sortedTagList["KOR"] = korObj;
    if ( Object.keys(engObj).length > 0 ) this.sortedTagList["ENG"] = engObj;
    if ( Object.keys(numObj).length > 0 ) this.sortedTagList["NUM"] = numObj;
    if ( Object.keys(etcObj).length > 0 ) this.sortedTagList["ETC"] = etcObj;
    
    this.tagPanelLoading=false;    
    return this.allSortedTagList;
  },
  getIsSearching() {
    return this.isSearching;
  },
  setIsSearching(isSearching) {
    this.isSearching = isSearching;
  },
  getSearchString() {
    return this.searchString;
  },
  setSearchString(str) {
    this.searchString = str;
    // search
    // {"KOR" : {"ㄱ" :["가나다", "고교구"]}}
    this.searchResult = {};
    let result = Object.keys(this.sortedTagList).filter((category) => {
      let keyObj = {};
      let _keyList = Object.keys(this.sortedTagList[category]).filter((key) => {
        let tagObj = {};
        let _tagList = Object.keys(this.filteredTagObj[key]).filter((tag) => {
          let result = tag.includes(this.searchString);
          if (result) tagObj[tag] = this.filteredTagObj[key][tag];
          return result;
        })        
        if (_tagList.length > 0) {
          keyObj[key] = tagObj;
        }
        return _tagList.length > 0
      })
      if (_keyList.length>0) {
        this.searchResult[category] = keyObj
      }
      return _keyList.length > 0; 
    });
  },
  setTagText(text) {
    this.tagText = text;
  },
  setCurrentTagData(id, text) {
    this.currentTagId = id;
    this.currentTagValue = text;
  },
  createTag(createTagList) {
    createTagList.forEach((tag) =>
      NoteRepository.createTag(tag, PageStore.currentPageId)
    );
    this.addTagList = [];
  },
  deleteTag(deleteTagList) {
    deleteTagList.forEach((tag) =>
      NoteRepository.deleteTag(tag, PageStore.currentPageId)
    );
    this.removeTagList = [];
  },
  updateTag(updateTagList) {
    updateTagList.forEach((tag) => {
      NoteRepository.updateTag(tag.tag_id, tag.text);
    });
  },
  setIsNewFlag(flag) {
    this.isNewTag = flag;
  },
  setTagNoteList(tagList) {
    this.notetagList = tagList;
  },
  setAddTagList(tagText) {
    this.addTagList.push(tagText);
  },
  async setUpdateTagList(tagId, tagText) {
    if (this.updateTagList.length === 0) {
      this.updateTagList.push({ tag_id: tagId, text: tagText });
    } else {
      if (this.updateTagList.map((item) => item.tag_id).indexOf(tagId) === -1) {
        this.updateTagList.push({ tag_id: tagId, text: tagText });
      } else {
        this.updateTagList.forEach((item) => {
          if (item.tag_id === tagId) item.text = tagText;
        });
      }
    }
  },
  removeAddTagList(tagText) {
    this.addTagList = this.addTagList.filter((tag) => tag !== tagText);
  },
  setDeleteTagList(tagId) {
    this.removeTagList.push(tagId);
  },
  setEditTagIndex(index) {
    this.editTagIndex = index;
  },
  setEditTagText(text) {
    this.editTagValue = text;
  },
  getTagSortList() {
    return this.tagSortList;
  },
  validTag(text) {
    const targetTag = this.notetagList.find(function (tag) {
      return tag.text === text;
    });
    const _idx = this.notetagList.indexOf(targetTag);
    if (_idx !== -1) return true;
    else return false;
  },
});

export default TagStore;
