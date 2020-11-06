import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import ChapterStore from "./chapterStore";
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
  // 그릴 targetTagList(searching이냐 아니냐 따라서)
  targetTagList:[],
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
  setNoteTagList(tagArr) {
    this.notetagList = tagArr;
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
  setPanelLoading(isLoading) {
    this.tagPanelLoading = isLoading;
  },
  setHasTag(hasTag) {
    this.hasTag = hasTag;
  },
  // 처음 TagContainer render할 때 필요한 모든 데이터 fetching 및 processing
  // 일련의 flow
  async fetchTagData() { 
    this.setPanelLoading(true);
    await this.getAllSortedTagList();
    // 태그별 정리
    this.getFilteredTagObj(); 
    // kor, eng, num, etc별 sort한 키
    this.setSortedTagList();
    this.setTargetTagList();
    this.setPanelLoading(false);  
  },

  getFilteredTagObj() {
    /*
       this.filteredTagObj 만들기
       item : KEY별로
       this.filteredTagObj = 
       {"ㄱ" : {tagName1:{tagId:'', note_id:[]},
                tagName2:{tagId:'', note_id:[]}}        
        }
    */
    let results = {};
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
      results[item.KEY] = resultObj;
    });
    this.filteredTagObj = {...results};
    return this.filteredTagObj;
  },
  // tag key 정렬
  // sortTagKey 예시 : ["*", "1", "8", "T", "a", "t", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅌ", "ㅍ", "ㅎ"]
  sortTagKey() {
    let tagKey = [];
    this.allSortedTagList.forEach((category) => {
      tagKey.push(category["KEY"])
    })
    tagKey.sort();
    return tagKey;
  },

  // kor, eng, num, etc별 sort한 키
  setSortedTagList() {
    let tagKey = this.sortTagKey();
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
    return this.sortedTagList;
  },
  setAllSortedTagList(tagList) {
    this.allSortedTagList = tagList;
    if (this.allSortedTagList.length === 0) {
      this.setHasTag(false);
    }
    else this.setHasTag(true);
  },
  async getAllSortedTagList() { 
    const tag_index_list_dto = await NoteRepository.getAllSortedTagList();
    this.setAllSortedTagList(tag_index_list_dto);
    return this.allSortedTagList;
  },
  async getTagNoteList(tagId) {
    const res = await NoteRepository.getTagNoteList(tagId);
    const {data:{dto:{noteList}}} = res; 
    
    let resultPageArr = [];
    noteList.map((page) => {
      const chapterId = page.parent_notebook;
      const targetChapter = ChapterStore.chapterList.find((chapter)=>{
        return chapter.id === chapterId;
      });
      if (targetChapter) {
        resultPageArr.push({
          chapterId : chapterId,
          chapterTitle: targetChapter.text,
          id: page.note_id,
          title: page.note_title
        })
      }      
    })

    ChapterStore.setSearchResult({chapter:[],page:resultPageArr});
  },
  getTargetTagList() {
    return this.targetTagList;
  },
  setTargetTagList() {
    if (this.isSearching) {
      this.targetTagList = TagStore.searchResult;
    } else {
      this.targetTagList = TagStore.sortedTagList;
    }
  },
  getIsSearching() {
    return this.isSearching;
  },
  setIsSearching(isSearching) {
    this.isSearching = isSearching;
    this.setTargetTagList();
    // 초기화
    if (!isSearching) {
      this.searchString = '';
      this.searchResult = {};
    }
  },
  getSearchString() {
    return this.searchString;
  },
  setSearchString(str) {
    this.searchString = str;
    // search
    // {"KOR" : {"ㄱ" :["가나다", "고교구"]}}
    let searchResultObj = {};
    Object.keys(this.sortedTagList).filter((category) => {
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
        searchResultObj[category] = keyObj
      }
      return _keyList.length > 0; 
    });
    
    this.searchResult = searchResultObj;
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
  setEditCreateTag() {
    // add Tag List 갱신
    this.addTagList.forEach((tag, index) => { if (tag === TagStore.currentTagValue) this.addTagList[index] = TagStore.editTagValue; });
    // 현재 보여지는 List 갱신
    this.notetagList.forEach(tag => { if (tag.text === TagStore.currentTagValue) tag.text = TagStore.editTagValue })
  },
  getTagSortList() {
    return this.tagSortList;
  },
  isInvalidTag(text) {
    const targetTag = this.notetagList.find(function (tag) {
      return tag.text === text;
    });
    const _idx = this.notetagList.indexOf(targetTag);
    if (_idx !== -1) return true;
    else return false;
  },
});

export default TagStore;
