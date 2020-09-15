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
  allTagList: [],
  allSortedTagList:[],
  filteredTagObj:{},
  // a,b,c 같은 키들만 담는다
  sortedTagList:{
    KOR:[],
    ENG:[],
    NUM:[],
    ETC:[]
  },
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
  async getAllTagList() {
    const res = await NoteRepository.getAllTagList();
    const {data:{dto:{tagList}}} = res;
    //{dto:{tagList:[0,1,2,3,4]}
    this.allTagList = tagList;
    return this.allTagList;
  },
  async getAllSortedTagList() {  
    this.tagPanelLoading = true;
    const res = await NoteRepository.getAllSortedTagList();
    const {data:{dto:{tag_index_list_dto}}} = res;    
    this.allSortedTagList = tag_index_list_dto;

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
      console.log(this.filteredTagObj[item.KEY])
    })

    // key 정렬
    let tagKey = [];
    this.allSortedTagList.forEach((category) => {
      tagKey.push(category["KEY"])
    })
    tagKey.sort();
    
    // sort하고 분류해서 koArr, engArr, numArr, etcArr은 sort 돼 있음
    let korArr = [], engArr = [], numArr = [], etcArr = [];
    tagKey.forEach((key) => {
      if( key.charCodeAt(0) >= 12593 && key.charCodeAt(0) < 55203 ){
        korArr.push(key)
      }
      else if(key.charCodeAt(0) > 64 && key.charCodeAt(0) < 123){
        engArr.push(key);
      }
      else if(key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57){
        numArr.push(key);
      }
      else {
        etcArr.push(key);
      }
    })

    this.sortedTagList["KOR"] = korArr;
    this.sortedTagList["ENG"] = engArr;
    this.sortedTagList["NUM"] = numArr;
    this.sortedTagList["ETC"] = etcArr;
    
    this.tagPanelLoading=false;    
    return this.allSortedTagList;
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
