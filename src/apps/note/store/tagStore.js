import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import ChapterStore from "./chapterStore";
import PageStore from "./pageStore";
import { checkNotDuplicate } from '../components/common/validators';

const TagStore = observable({
  // note에 딸린 tagList
  notetagList: [],
  isNewTag: false,
  tagText: "",
  addTagList: [],
  removeTagList: [],
  updateTagList: [],
  currentTagId: "",
  currentTagValue: "",
  editTagIndex: "",
  editTagValue: "",
  // 처음 받아오는 데이터를 여기에 저장
  allSortedTagList: [],
  // key당 tagList
  keyTagPairObj: {},
  // a,b,c 같은 키들만 담는다(render용)
  sortedTagList: {},
  // sortedTagList:{
  //   KOR:[],
  //   ENG:[],
  //   NUM:[],
  //   ETC:[]
  // },
  tagKeyArr: [], // sort해서 그림
  // 검색 시작 ~ 검색 종료
  isSearching: false,
  // 태그 검색 시작 ~ 검색 결과 나오기까지
  isSearchLoading: false,
  searchStr: "",
  tagPanelLoading: true,
  // tag가 있는 노트 가져오기
  async getTagNoteList(tagId) {
    const res = await NoteRepository.getTagNoteList(tagId);
    return res.status === 200 ? res.data.dto : null;
  },
  // notetagList
  async getNoteTagList(noteId) {
    const res = await NoteRepository.getNoteTagList(noteId)
    return res.status === 200 ? res.data.dto : null;
  },
  setNoteTagList(tagArr) {
    this.notetagList = tagArr;
  },
  prependNoteTagList(tagText) {
    this.notetagList.unshift({ text: tagText });
  },
  //isNewTag
  getIsNewTag() {
    return this.isNewTag;
  },
  setIsNewTag(flag) {
    this.isNewTag = flag;
  },
  // tagTest
  getTagText(text) {
    this.tagText = text;
  },
  setTagText(text) {
    this.tagText = text;
  },
  // addTagList
  getAddTagList() {
    return this.addTagList;
  },
  setAddTagList(arr) {
    this.addTagList = arr;
  },
  appendAddTagList(tagText) {
    this.addTagList.push(tagText);
  },
  removeAddTagList(tagText) {
    this.addTagList = this.addTagList.filter((tag) => tag !== tagText);
  },
  // removeTagList
  getRemoveTagList() {
    return this.removeTagList;
  },
  setRemoveTagList(arr) {
    this.removeTagList = arr;
  },
  appendRemoveTagList(tagId) {
    this.removeTagList.push(tagId);
  },
  // updateTagList
  getUpdateTagList() {
    return this.updateTagList;
  },
  setUpdateTagList(arr) {
    this.updateTagList = arr;
  },
  appendUpdateTagList(tagId, tagText) {
    this.updateTagList.push({ tag_id: tagId, text: tagText });
  },
  getCurrentTagId() {
    return this.currentTagId;
  },
  setCurrentTagId(tagId) {
    this.currentTagId = tagId;
  },
  getCurrentTagValue() {
    return this.currentTagValue;
  },
  setCurrentTagValue(value) {
    this.currentTagValue = value;
  },
  getEditTagIndex() {
    return this.editTagIndex;
  },
  setEditTagIndex(index) {
    this.editTagIndex = index;
  },
  // editTagValue
  getEditTagValue() {
    return this.editTagValue;
  },
  setEditTagValue(text) {
    this.editTagValue = text;
  },
  async getAllSortedTagList() {
    const res = await NoteRepository.getAllSortedTagList();
    return res.status === 200 ? res.data.dto : null;
  },
  setAllSortedTagList(tagList) {
    this.allSortedTagList = tagList;
  },
  getKeyTagPairObj() {
    return this.keyTagPairObj;
  },
  setKeyTagPairObj(obj) {
    this.keyTagPairObj = obj;
  },
  getSortedTagList() {
    return this.sortedTagList;
  },
  setSortedTagList(tagList) {
    this.sortedTagList = tagList;
  },
  getTagKeyArr() {
    return this.tagKeyArr;
  },
  setTagKeyArr(arr) {
    this.tagKeyArr = arr;
  },
  getIsSearching() {
    return this.isSearching;
  },
  setIsSearching(isSearching) {
    this.isSearching = isSearching;
  },
  getIsSearchLoading() {
    return this.isSearchLoading;
  },
  setIsSearchLoading(isLoading) {
    this.isSearchLoading = isLoading;
  },
  getSearchStr() {
    return this.searchStr;
  },
  setSearchStr(str) {
    this.searchStr = str;
  },
  getTagPanelLoading() {
    return this.tagPanelLoading;
  },
  setTagPanelLoading(isLoading) {
    this.tagPanelLoading = isLoading;
  },

  async createTag(createTagList, noteId) {
    const createTagArray = [];
    createTagList.forEach(tag => {
      createTagArray.push({
        text: tag,
        note_id: noteId,
      })
    })
    const { data: { dto } } = await NoteRepository.createTag(createTagArray);
    this.setAddTagList([]);
    return dto;
  },
  async deleteTag(deleteTagList, noteId) {
    const deleteTagArray = [];
    deleteTagList.forEach(tag => {
      deleteTagArray.push({
        tag_id: tag,
        note_id: noteId,
      })
    });
    const { data: { dto } } = await NoteRepository.deleteTag(deleteTagArray);
    this.setRemoveTagList([]);
    return dto;
  },

  async updateTag(updateTagList) {
    const updateTagArray = [];
    updateTagList.forEach(async tag => {
      updateTagArray.push({
        tag_id: tag.tag_id,
        text: tag.text,
      })
    });
    const { data: { dto } } = await NoteRepository.updateTag(updateTagArray);
    return dto;
  },

  /*
    비즈니스 로직
  */
  async fetchNoteTagList(noteId) {
    await NoteRepository.getNoteTagList(noteId).then((response) => {
      if (response.status === 200) {
        const {
          data: { dto: tagList },
        } = response;
        this.setNoteTagList(tagList.tagList);
      }
    });
    return this.notetagList;
  },
  async setUpdateNoteTagList(tagId, tagText) {
    if (this.updateTagList.length === 0) {
      this.appendUpdateTagList(tagId, tagText);
    } else {
      if (this.updateTagList.map((item) => item.tag_id).indexOf(tagId) === -1) {
        this.appendUpdateTagList(tagId, tagText);
      } else {
        this.updateTagList.forEach((item) => {
          if (item.tag_id === tagId) item.text = tagText;
        });
      }
    }
  },
  setCurrentTagData(id, text) {
    this.setCurrentTagId(id);
    this.setCurrentTagValue(text);
  },
  // 서버에서 받아와서 store 변수에 set하기
  async fetchAllSortedTagList() {
    const { data: { dto: { tag_index_list_dto } } } = await NoteRepository.getAllSortedTagList();
    this.setAllSortedTagList(tag_index_list_dto);
    return this.allSortedTagList;
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
  // 처음 TagContainer render할 때 필요한 모든 데이터 fetching 및 processing
  // 일련의 flow
  async fetchTagData() {
    this.setTagPanelLoading(true);
    await this.fetchAllSortedTagList();
    // 키-태그 pair obj
    this.createKeyTagPairObj();
    // kor, eng, num, etc별 sort한 키
    this.categorizeTagObj();
    this.setTagPanelLoading(false);
  },

  async searchTag(str) {
    this.setIsSearching(true);
    this.setIsSearchLoading(true);
    this.setSearchStr(str);
    await this.fetchAllSortedTagList();
    // 키-태그 pair obj
    this.createSearchResultObj(str);
    // kor, eng, num, etc별 sort한 키
    this.categorizeTagObj();
    this.setIsSearchLoading(false);
  },
  // search result용 KeyTagObj
  createSearchResultObj(str) {
    let results = {};
    let tagKeyArr$ = [];
    this.allSortedTagList.forEach((item) => {
      let KEY = item.KEY;
      let resultKeyTags = {};
      item.tag_indexdto.tagList.forEach((tag) => {
        let tagName = tag.text;
        if (!tagName.toLowerCase().includes(str)) return;
        if (resultKeyTags.hasOwnProperty(tagName)) {
          resultKeyTags[tagName]["note_id"].push(tag.note_id);
        } else {
          resultKeyTags[tagName] = {
            id: tag.tag_id,
            note_id: [tag.note_id]
          }
        }
      })
      if (Object.keys(resultKeyTags).length > 0) {
        results[KEY.toUpperCase()] = resultKeyTags;
        if (tagKeyArr$.indexOf(KEY.toUpperCase()) === -1) tagKeyArr$.push(KEY);
      }
    })
    this.setKeyTagPairObj({ ...results });
    this.setTagKeyArr([...tagKeyArr$.sort()]);
    return this.keyTagPairObj;
  },
  createKeyTagPairObj() {
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
      item.tag_indexdto.tagList.forEach((tag) => {
        if (resultObj.hasOwnProperty(tag.text)) resultObj[tag.text]["note_id"].push(tag.note_id);
        else {
          resultObj[tag.text] = {
            id: tag.tag_id,
            note_id: [tag.note_id]
          }
        }
      })
      results[KEY.toUpperCase()] = resultObj;
      if (tagKeyArr$.indexOf(KEY.toUpperCase()) === -1) tagKeyArr$.push(KEY.toUpperCase());
    });
    this.setKeyTagPairObj({ ...results });
    this.setTagKeyArr([...tagKeyArr$.sort()]);
    return this.keyTagPairObj;
  },
  getEngTagObj(key) {
    let sortedEngTags = {};
    const targetKeyObj = this.keyTagPairObj[key];
    let sortedTagName = Object.keys(targetKeyObj).sort((a, b) => {
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
  categorizeTagObj() {
    this.setSortedTagList({});
    let _sortedTagList = {};
    // sort하고 분류해서 koArr, engArr, numArr, etcArr은 sort 돼 있음
    let korObj = {}, engObj = {}, numObj = {}, etcObj = {};
    this.tagKeyArr.forEach((key) => {
      if (key.charCodeAt(0) >= 12593 && key.charCodeAt(0) < 55203) {
        korObj[key] = this.keyTagPairObj[key];
      }
      else if (key.charCodeAt(0) > 64 && key.charCodeAt(0) < 123) {
        // engObj[key] = this.keyTagPairObj[key];
        engObj[key] = this.getEngTagObj(key);
      }
      else if (key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57) {
        numObj[key] = this.keyTagPairObj[key];
      }
      else {
        etcObj[key] = this.keyTagPairObj[key];
      }
    })

    if (Object.keys(korObj).length > 0) _sortedTagList["KOR"] = korObj;
    if (Object.keys(engObj).length > 0) _sortedTagList["ENG"] = engObj;
    if (Object.keys(numObj).length > 0) _sortedTagList["NUM"] = numObj;
    if (Object.keys(etcObj).length > 0) _sortedTagList["ETC"] = etcObj;
    this.setSortedTagList(_sortedTagList);
  },
  async setTagNoteSearchResult(tagId) {
    const { data: { dto: { noteList } } } = await NoteRepository.getTagNoteList(tagId);

    const resultPageArr = noteList.map((page) => {
      const targetChapter = ChapterStore.chapterList.find((chapter) => chapter.id === page.parent_notebook);
      return {
        chapterId: page.parent_notebook,
        chapterTitle: targetChapter ? targetChapter.text : "",
        id: page.note_id,
        title: page.note_title
      }
    })
    ChapterStore.setSearchResult({ chapter: [], page: resultPageArr });
  },
  setEditCreateTag() {
    // add Tag List 갱신
    this.addTagList.forEach((tag, index) => {
      if (tag === TagStore.currentTagValue) this.addTagList[index] = TagStore.editTagValue;
    });
    // 현재 보여지는 List 갱신
    this.notetagList.forEach(tag => {
      if (tag.text === TagStore.currentTagValue) tag.text = TagStore.editTagValue;
    })
  },
  isValidTag(text) {
    return checkNotDuplicate(this.notetagList, 'text', text);
  },
});

export default TagStore;
