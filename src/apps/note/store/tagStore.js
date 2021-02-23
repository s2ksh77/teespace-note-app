import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import ChapterStore from "./chapterStore";
import { checkNotDuplicateIgnoreCase } from '../components/common/validators';
import NoteUtil from '../NoteUtil';

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
  selectTagIdx: '',
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
  tagPanelLoading: false,
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
  setSelectTagIndex(index) {
    this.selectTagIdx = index
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
    const createTagArr = createTagList.map(tag => {
      return {
        text: tag,
        note_id: noteId,
      }
    });
    const { data: { dto } } = await NoteRepository.createTag(createTagArr);
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
    const updateTagArray = updateTagList.map(tag => {
      return {
        tag_id: tag.tag_id,
        text: tag.text,
      }
    });
    const { data: { dto } } = await NoteRepository.updateTag(updateTagArray);
    return dto;
  },

  /*
    비즈니스 로직
  */
  // encode logic 추가된 createTag, updateTag
  // tag는 tag 추가 및 수정시 동일값 체크 로직 & 저장할 때 encoding한다
  async createNoteTag(createTagList, noteId) {
    const createTagArr = createTagList.map(tag => {
      return {
        text: NoteUtil.encodeStr(tag),
        note_id: noteId,
      }
    });
    const { data: { dto } } = await NoteRepository.createTag(createTagArr);
    this.setAddTagList([]);
    return dto;
  },
  async updateNoteTag(updateTagList) {
    const updateTagArr = updateTagList.map(tag => {
      return {
        tag_id: tag.tag_id,
        text: NoteUtil.encodeStr(tag.text),
      }
    });
    const { data: { dto } } = await NoteRepository.updateTag(updateTagArr);
    return dto;
  },
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

  // 처음 TagContainer render할 때 필요한 모든 데이터 fetching 및 processing
  async fetchTagData() {
    this.setAllSortedTagList(await this.getAllsortedTagList());
    this.setSortedTagList(this.categorizeTagList(this.allSortedTagList, false));
  },

  /**
   * 정렬된 태그 리스트를 서버에서 가져온다.
   * @return sorted tag list
   */
  async getAllsortedTagList() {
    const { 
      data: { dto: { tag_index_list_dto } }
    } = await NoteRepository.getAllSortedTagList();
    return tag_index_list_dto;
  },

  /**
   * tagList의 KEY를 KOR, ENG, NUM, ETC 중 하나로 categorize 한다.
   * @param {Array} allTagsList 
   * @param {boolean} isSearching
   * @return categorized tag objects
   */
  categorizeTagList(allTagsList, isSearching) {
    /**
     * categorizedTagObjs: {
     *   'KOR': { 'T': { tagText1: { tagId: '', note_id: [] }, tagText2: { tagId: '', note_id: [] }, } } }
     *   ...
     * }
     */
    const categorizedTagObjs = { 'KOR': {}, 'ENG': {}, 'NUM': {}, 'ETC': {} };
    
    allTagsList.forEach(item => {
      const upperCaseKey = item.KEY.toUpperCase();
      const tagKeyCategory = this.getTagKeyCategory(upperCaseKey);
      const tagList =
        tagKeyCategory === 'ENG'
          ? this.sortEngTagList(item.tag_indexdto.tagList)
          : item.tag_indexdto.tagList;
      let tagObjs = 
        isSearching
          ? this.getSearchTagObjs(tagList, this.searchStr)
          : this.getTagObjs(tagList);
      if (Object.keys(tagObjs).length > 0) {
        categorizedTagObjs[tagKeyCategory][upperCaseKey] = tagObjs;
      }
    });

    if (isSearching) this.deleteEmptyCategory(categorizedTagObjs);

    return categorizedTagObjs;
  },

  /**
   * tagKey의 category(KOR, ENG, NUM, ETC)를 반환한다.
   * @param {string} tagKey 
   * @return category of tag
   */
  getTagKeyCategory(tagKey) {
    const charCode = tagKey.charCodeAt(0);
    if (12593 <= charCode && charCode < 55203) return 'KOR';
    else if (64 < charCode && charCode < 123) return 'ENG';
    else if (48 <= charCode && charCode <= 57) return 'NUM';
    else return 'ETC';
  },

  /**
   * tag의 category가 english인 경우 대소문자 구분 없이 정렬하여 반환한다.
   * @param {Array} tagList 
   * @return sorted tag list
   */
  sortEngTagList(tagList) {
    const sortedEngTagList = tagList.slice().sort((a, b) => 
      a.text.toLowerCase() > b.text.toLowerCase() ? 1 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 0
    );
    return sortedEngTagList;
  },

  /**
   * 동일한 KEY를 가지는 다양한 tagText의 tagId, noteIds를 담고 있는 Object를 반환한다.
   * @param {Array} tagList 
   * @return tag objects with same key
   */
  getTagObjs(tagList) {
    const tagObjs = tagList.reduce((obj, tag) => {
      const tagText = NoteUtil.decodeStr(tag.text);
      if (obj.hasOwnProperty(tagText)) {
        obj[tagText]['note_id'].push(tag.note_id);
      } else {
        obj[tagText] = {
          id: tag.tag_id,
          note_id: [tag.note_id]
        }
      }
      return obj;
    }, {});

    return tagObjs;
  },

  /**
   * 동일한 KEY를 가지면서 searchTagText를 포함하는
   * 다양한 tagText의 tagId, noteIds를 담고 있는 Object를 반환한다.
   * @param {Array} tagList 
   * @param {string} searchTagText 
   * @return tag objects with same key and search string
   */
  getSearchTagObjs(tagList, searchTagText) {
    const searchTagObjs = tagList.reduce((obj, tag) => {
      const tagText = NoteUtil.decodeStr(tag.text);
      if (!tagText.toUpperCase().includes(searchTagText.toUpperCase())) return obj;
      if (obj.hasOwnProperty(tagText)) {
        obj[tagText]['note_id'].push(tag.note_id);
      } else {
        obj[tagText] = {
          id: tag.tag_id,
          note_id: [tag.note_id]
        }
      }
      return obj;
    }, {});

    return searchTagObjs;
  },

  /**
   * 인자로 들어온 object 내부에 빈 카테고리가 존재하는 경우
   * 해당 카테고리를 object에서 삭제한다. 
   * @param {Object} categorizedTagObjs 
   */
  deleteEmptyCategory(categorizedTagObjs) {
    Object.entries(categorizedTagObjs).forEach(entry => {
      const [key, value] = entry;
      if (!Object.keys(value).length) delete categorizedTagObjs[key];
    });
  },

  async searchTag(str) {
    this.setIsSearching(true);
    this.setIsSearchLoading(true);
    this.setSearchStr(str);
    this.setAllSortedTagList(await this.getAllsortedTagList());
    this.setSortedTagList(this.categorizeTagList(this.allSortedTagList, true));
    this.setIsSearchLoading(false);
  },
  
  async setTagNoteSearchResult(tagId) {
    const { data: {
      dto: {
        noteList
      }
    }
    } = await NoteRepository.getTagNoteList(tagId);
    ChapterStore.setSearchResult({ chapter: null, page: noteList });
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
    return checkNotDuplicateIgnoreCase(this.notetagList, 'text', text);
  },
});

export default TagStore;
