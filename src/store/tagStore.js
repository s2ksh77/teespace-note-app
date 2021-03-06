import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import { checkDuplicateIgnoreCase } from '../components/common/validators';
import NoteUtil from '../NoteUtil';
import NoteStore from './noteStore';
import ChapterModel from './model/ChapterModel';

const TagStore = observable({
  // note에 딸린 tagList
  notetagList: [],
  tagText: '',
  addTagList: [], // web에서 안씀
  // 처음 받아오는 데이터를 여기에 저장
  allSortedTagList: [],
  // a,b,c 같은 키들만 담는다(render용)
  sortedTagList: {},
  // sortedTagList:{
  //   KOR:[],
  //   ENG:[],
  //   NUM:[],
  //   ETC:[]
  // },
  // 검색 시작 ~ 검색 종료
  isSearching: false,
  // 태그 검색 시작 ~ 검색 결과 나오기까지
  isSearchLoading: false,
  searchStr: '',
  tagPanelLoading: false,
  searchTagId: '',
  // tag가 있는 노트 가져오기
  async getTagNoteList(tagId) {
    const {
      status,
      data: { dto },
    } = await NoteRepository.getTagNoteList(tagId);
    return status === 200 ? dto.noteList : null;
  },
  // notetagList
  async getNoteTagList(noteId) {
    const {
      status,
      data: { dto },
    } = await NoteRepository.getNoteTagList(noteId);
    return status === 200 ? dto : null;
  },
  setNoteTagList(tagArr) {
    this.notetagList = tagArr;
  },
  prependNoteTagList(tagText) {
    this.notetagList.unshift({ text: tagText });
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
    this.addTagList = this.addTagList.filter(tag => tag !== tagText);
  },
  async getAllSortedTagList() {
    const res = await NoteRepository.getAllSortedTagList();
    return res.status === 200 ? res.data.dto : null;
  },
  setAllSortedTagList(tagList) {
    this.allSortedTagList = tagList;
  },
  getSortedTagList() {
    return this.sortedTagList;
  },
  setSortedTagList(tagList) {
    this.sortedTagList = tagList;
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
  setSearchTagId(id) {
    this.searchTagId = id;
  },

  async createTag(createTagList, noteId) {
    const createTagArr = createTagList.map(tag => {
      return {
        text: tag,
        note_id: noteId,
        WS_ID: NoteRepository.WS_ID,
      };
    });
    const {
      data: { dto },
    } = await NoteRepository.createTag(createTagArr);
    this.setAddTagList([]);
    return dto;
  },
  async deleteTag(deleteTagList, noteId) {
    const deleteTagArray = deleteTagList.map(tag => ({
      tag_id: tag,
      note_id: noteId,
      WS_ID: NoteRepository.WS_ID,
    }));
    const {
      data: { dto },
    } = await NoteRepository.deleteTag(deleteTagArray);
    return dto;
  },

  async updateTag(updateTagList) {
    const updateTagArray = updateTagList.map(tag => ({
      tag_id: tag.tag_id,
      text: tag.text,
      WS_ID: NoteRepository.WS_ID,
    }));
    const {
      data: { dto },
    } = await NoteRepository.updateTag(updateTagArray);
    this.setUpdateTagList([]);
    return dto;
  },

  /*
    비즈니스 로직
  */
  // encode logic 추가된 createTag, updateTag
  // tag는 tag 추가 및 수정시 동일값 체크 로직 & 저장할 때 encoding한다
  async createNoteTag(createTagList, noteId) {
    const createTagArr = createTagList.map(tagText => ({
      text: tagText,
      note_id: noteId,
      WS_ID: NoteRepository.WS_ID,
    }));
    const {
      data: { dto },
    } = await NoteRepository.createTag(createTagArr);
    await this.fetchNoteTagList(noteId);
    // 항상 태그 한 개만 생성할 때 기준 코드
    return { ...dto, text: createTagArr[0].text };
  },
  /**
   * updateTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
   */
  async updateNoteTag(updateTagList, noteId) {
    const updateTagArr = updateTagList.map(tag => ({
      note_id: noteId,
      tag_id: tag.tag_id,
      text: tag.text,
      WS_ID: NoteRepository.WS_ID,
    }));
    const {
      data: { dto },
    } = await NoteRepository.updateTag(updateTagArr);
    await this.fetchNoteTagList(noteId);
    return { ...dto, text: updateTagList[0].text };
  },
  /**
   * deleteTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
   */
  async deleteNoteTag(deleteTagList, noteId) {
    const deleteTagArray = deleteTagList.map(tag => ({
      tag_id: tag,
      note_id: noteId,
      WS_ID: NoteRepository.WS_ID,
    }));
    const {
      data: { dto },
    } = await NoteRepository.deleteTag(deleteTagArray);
    this.fetchNoteTagList(noteId);
    return dto;
  },
  async fetchNoteTagList(noteId) {
    await NoteRepository.getNoteTagList(noteId).then(response => {
      if (response.status === 200) {
        const {
          data: { dto: tagList },
        } = response;
        this.setNoteTagList(tagList.tagList);
      }
    });
    return this.notetagList;
  },

  // 처음 TagContainer render할 때 필요한 모든 데이터 fetching 및 processing
  async fetchTagData() {
    this.setTagPanelLoading(true);
    this.setAllSortedTagList(await this.getAllsortedTagList());
    this.setSortedTagList(this.categorizeTagList(this.allSortedTagList, false));
    this.setTagPanelLoading(false);
  },

  /**
   * 정렬된 태그 리스트를 서버에서 가져온다.
   * @return sorted tag list
   */
  async getAllsortedTagList() {
    const {
      data: {
        dto: { tag_index_list_dto },
      },
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
    const categorizedTagObjs = { KOR: {}, ENG: {}, NUM: {}, ETC: {} };

    allTagsList.forEach(item => {
      const upperCaseKey = item.KEY.toUpperCase();
      const tagKeyCategory = this.getTagKeyCategory(upperCaseKey);
      const tagList =
        tagKeyCategory === 'ENG'
          ? this.sortEngTagList(item.tag_indexdto.tagList)
          : item.tag_indexdto.tagList;
      let tagObjs = isSearching
        ? this.getSearchTagObjs(tagList, this.searchStr)
        : this.getTagObjs(tagList);
      if (Object.keys(tagObjs).length > 0) {
        categorizedTagObjs[tagKeyCategory][upperCaseKey] = {
          ...categorizedTagObjs[tagKeyCategory][upperCaseKey],
          ...tagObjs,
        };
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
    const sortedEngTagList = tagList
      .slice()
      .sort((a, b) =>
        a.text.toLowerCase() > b.text.toLowerCase()
          ? 1
          : a.text.toLowerCase() < b.text.toLowerCase()
          ? -1
          : 0,
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
          note_id: [tag.note_id],
        };
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
          note_id: [tag.note_id],
        };
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

  async setTagNoteSearchResult(tagName) {
    const {
      data: {
        dto: { tagList },
      },
    } = await NoteRepository.getSearchList(tagName);
    ChapterStore.setSearchResult({ chapter: null, page: tagList });
  },

  isValidTag(text) {
    return checkDuplicateIgnoreCase(this.notetagList, 'text', text);
  },

  // for mobile
  async handleTagNoteList(tagId) {
    this.setSearchTagId(tagId ? tagId : this.searchTagId);
    ChapterStore.setIsTagSearching(true);

    const pageList = await TagStore.getTagNoteList(this.searchTagId);
    pageList.map(page => (page.id = page.note_id));

    const obj = { children: pageList };
    ChapterStore.chapterInfo = new ChapterModel(obj);
    NoteStore.setTargetLayout('List');
  },
});

export default TagStore;
