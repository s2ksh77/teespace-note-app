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
  // 처음 받아오는 데이터를 여기에 저장
  allSortedTagList:[],
  // key당 tagList
  keyTagPairObj:{},
  searchResult:{}, // search용 keyTagPairObj
  // a,b,c 같은 키들만 담는다(render용)
  sortedTagList: {},
  // sortedTagList:{
  //   KOR:[],
  //   ENG:[],
  //   NUM:[],
  //   ETC:[]
  // },
  tagKeyArr:[], // sort해서 그림
  // 태그 검색 시작 ~ 검색 결과 나오기까지
  isSearching:false,
  searchString:"",
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
    this.getKeyTagPairObj(); 
    // kor, eng, num, etc별 sort한 키
    this.setSortedTagList();
    this.setPanelLoading(false);  
  },

  async searchTag(str) {
    this.setIsSearching(true);
    this.setSearchString(str);
    await this.getAllSortedTagList();
    this.getSearchResult(str);
    // kor, eng, num, etc별 sort한 키
    this.setSortedTagList();
    this.setIsSearching(false);
  },
  // search result용 KeyTagObj
  getSearchResult(str) {
    let results = {};
    let tagKeyArr$ = [];
    this.allSortedTagList.forEach((item) => {
      let KEY = item.KEY;
      let resultKeyTags = {};
      item.tag_indexdto.tagList.forEach((tag) => {
        let tagName = tag.text;
        if (!tagName.toLowerCase().includes(str)) return;
        if (resultKeyTags[tagName]) {
          resultKeyTags[tagName]["note_id"].push(tag.note_id);
        } else {
          resultKeyTags[tagName] = {
            id : tag.tag_id,
            note_id : [tag.note_id]
          }
        }
      })
      if (Object.keys(resultKeyTags).length > 0) {        
        results[KEY] = resultKeyTags;
        if (tagKeyArr$.indexOf(KEY.toUpperCase()) === -1) tagKeyArr$.push(KEY);
      }
    })
    this.keyTagPairObj = {...results};
    this.tagKeyArr = [...tagKeyArr$.sort()]
    return this.keyTagPairObj;
  },
  getKeyTagPairObj() {
    /*
      this.keyTagPairObj 만들기
      item : KEY별로
      this.keyTagPairObj = 
      {"ㄱ" : {tagName1:{tagId:'', note_id:[]},
               tagName2:{tagId:'', note_id:[]}}        
      }
      정렬 순서는 대소문자 구분하지 않음!
    */
    let results = {};
    let tagKeyArr$ = [];
    this.allSortedTagList.forEach((item) => { 
      let KEY = item.KEY;
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
      results[KEY] = resultObj;   
      if (tagKeyArr$.indexOf(KEY.toUpperCase()) === -1) tagKeyArr$.push(KEY.toUpperCase());
    });
    this.keyTagPairObj = {...results};
    this.tagKeyArr = [...tagKeyArr$.sort()]
    return this.keyTagPairObj;
  },
  getEngTagSortList(key) {
    let sortedEngTags = {};
    const targetKeyObj = this.keyTagPairObj[key];    
    let sortedTagName = Object.keys(targetKeyObj).sort((a,b) =>{
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1; // 순서 바꾼다
      }
      if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
      }
      return 0
    });
    // 영문 시작 태그 keyTagPairObj 다시 만들어주기
    sortedTagName.forEach((tagName) => {
      sortedEngTags[tagName] = targetKeyObj[tagName]
    })
    return sortedEngTags;
  },
  // kor, eng, num, etc별 sort한 키
  setSortedTagList() {
    this.sortedTagList = {};
    // sort하고 분류해서 koArr, engArr, numArr, etcArr은 sort 돼 있음
    let korObj = {}, engObj = {}, numObj = {}, etcObj = {};
    this.tagKeyArr.forEach((key) => {
      if( key.charCodeAt(0) >= 12593 && key.charCodeAt(0) < 55203 ){
        korObj[key] = this.keyTagPairObj[key];
      }
      else if(key.charCodeAt(0) > 64 && key.charCodeAt(0) < 123){
        // engObj[key] = this.keyTagPairObj[key];
        engObj[key] = this.getEngTagSortList(key);
      }
      else if(key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57){
        numObj[key] = this.keyTagPairObj[key];
      }
      else {
        etcObj[key] = this.keyTagPairObj[key];
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
  setIsSearching(isSearching) {
    this.isSearching = isSearching;
  },
  setSearchString(str) {
    this.searchString = str;
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
