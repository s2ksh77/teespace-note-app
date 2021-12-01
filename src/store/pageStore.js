/* eslint-disable no-underscore-dangle */
import { observable, action } from 'mobx';
import { UserStore } from 'teespace-core';
import PageModel from './model/PageModel';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import { isFilled } from '../components/common/validators';
import GlobalVariable, { CHAPTER_TYPE, DRAG_TYPE } from '../GlobalVariable';
import NoteUtil, { get12HourFormat, getUserDisplayName } from '../NoteUtil';
import emojiRegexRGI from 'emoji-regex/RGI_Emoji.js';
import emojiRegex from 'emoji-regex/index.js';
import emojiRegexText from 'emoji-regex/text.js';
import i18n from '../i18n/i18n';

const PageStore = observable({
  pageInfo: new PageModel({}),
  noteInfoList: [],
  saveStatus: { saving: false, saved: false },
  otherEdit: false,
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createParent: '',
  renameId: '',
  dragData: new Map(),
  isCtrlKeyDown: false,
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  isNewPage: false,
  exportPageTitle: '',
  editingUserID: '',
  restorePageId: '',
  isRecycleBin: false,
  recoverInfo: {}, // 복원 팝업에서 '복구'클릭시 필요
  pageList: [],
  selectedPages: new Map(),
  isMove: false, // 모바일 웹뷰 -> 페이지 이동 Container Flag

  setPageList(arr, color) {
    this.pageList = arr.map(page => ({ ...page, color }));
  },

  setRecoverInfo(info) {
    // parentId, id, note_content
    this.recoverInfo = info;
  },
  setNoteInfoList(infoList) {
    this.noteInfoList = infoList;
  },

  // 함수 호출시 3가지 상태 중 true인거 하나만 넣어주기 : ex. {saving:true}
  setSaveStatus({ saving = false, saved = false }) {
    this.saveStatus.saving = saving;
    this.saveStatus.saved = saved;
  },

  /**
   * [임시]
   * 본인 또는 다른 사람이 해당 페이지를 수정하고 있는지 확인한다.
   * @returns 해당 페이지에 대한 자신의 읽기모드 여부
   */
  isReadMode() {
    if (!this.pageInfo.editingUserId) {
      this.setOtherEdit(false);
      return true;
    }
    if (NoteRepository.USER_ID === this.pageInfo.editingUserId) {
      this.setOtherEdit(false);
      return false;
    }
    this.setOtherEdit(true);
    return true;
  },
  setOtherEdit(flag) {
    this.otherEdit = flag;
  },
  getContent() {
    return this.noteContent;
  },
  setContent(content) {
    this.noteContent = content;
  },
  getTitle() {
    return this.noteTitle;
  },
  setTitle(title) {
    this.noteTitle = [].filter
      .call(title.slice(0, 200), c => c.charCodeAt(0) !== 65279)
      .join('');
  },

  getCurrentPageId() {
    return this.currentPageId;
  },
  setCurrentPageId(pageId) {
    this.currentPageId = pageId;
  },

  getCreatePageParent() {
    return this.createParent;
  },
  setCreatePageParent(chapterId) {
    this.createParent = chapterId;
  },

  getRenameId() {
    return this.renameId;
  },
  setRenameId(pageId) {
    this.renameId = pageId;
  },

  getDragData() {
    return this.dragData;
  },
  setDragData(dragData) {
    this.dragData = dragData;
  },
  appendDragData(key, value) {
    this.dragData.set(key, value);
  },
  deleteDragData(key) {
    this.dragData.delete(key);
  },
  clearDragData() {
    this.dragData.clear();
  },
  setIsCtrlKeyDown(flag) {
    this.isCtrlKeyDown = flag;
  },
  getDragEnterPageIdx() {
    return this.dragEnterPageIdx;
  },
  setDragEnterPageIdx(pageIdx) {
    this.dragEnterPageIdx = pageIdx;
  },
  getDragEnterChapterIdx() {
    return this.dragEnterChapterIdx;
  },
  setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },

  getIsNewPage() {
    return this.isNewPage;
  },
  setIsNewPage(isNew) {
    this.isNewPage = isNew;
  },
  getExportTitle() {
    return this.exportPageTitle;
  },
  setExportTitle(pageTitle) {
    this.exportPageTitle = pageTitle;
  },
  setRestorePageId(pageId) {
    this.restorePageId = pageId;
  },
  setIsRecycleBin(flag) {
    this.isRecycleBin = flag;
  },
  setIsMove(flag) {
    this.isMove = flag;
  },

  async getNoteInfoList(noteId) {
    const {
      data: { dto },
    } = await NoteRepository.getNoteInfoList(noteId);
    TagStore.setNoteTagList(dto?.tagList);
    EditorStore.setFileList(dto?.fileList);
    return dto;
  },

  async createPage(title, content, parent) {
    const {
      data: { dto },
    } = await NoteRepository.createPage(title, content, parent);
    return dto;
  },

  async deletePage(pageList) {
    const {
      data: { dto },
    } = await NoteRepository.deletePage(pageList);
    return dto;
  },

  async renamePage(id, title, chapterId, callback) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.renamePage(id, title, chapterId);
    return returnData;
  },

  async editStart(noteId, parentNotebook) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.editStart(noteId, parentNotebook);
    return returnData;
  },

  async editDone(updateDTO) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.editDone(updateDTO);
    return returnData;
  },

  async noneEdit(noteId, parentNotebook) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.nonEdit(noteId, parentNotebook);

    return returnData;
  },

  async throwPage(pageList) {
    const {
      data: { dto },
    } = await NoteRepository.throwPage(pageList);
    if (dto.resultMsg === 'Success') {
      return dto;
    }
  },

  async restorePage(pageId, chapterId) {
    const pageList = [];
    pageList.push({ note_id: pageId, parent_notebook: chapterId });
    const {
      data: { dto },
    } = await NoteRepository.restorePage(pageList);
    if (dto.resultMsg === 'Success') {
      return dto;
    }
  },

  async bookmarkPage(pageId) {
    const {
      data: { dto },
    } = await NoteRepository.bookmarkPage(pageId);
    if (dto.resultMsg === 'Success') {
      return dto;
    }
  },

  async unbookmarkPage(pageId) {
    const {
      data: { dto },
    } = await NoteRepository.unbookmarkPage(pageId);
    if (dto.resultMsg === 'Success') {
      return dto;
    }
  },

  async getbookmarkList(chId) {
    const {
      data: { dto },
    } = await NoteRepository.getbookmarkList(chId);
    return dto;
  },

  /**
   * 에디터의 텍스트/배경 색상을 초기화한다.
   */
  initializeBoxColor() {
    document.getElementById('tox-icon-text-color__color')?.removeAttribute('fill');
    document.getElementById('tox-icon-text-color__color')?.removeAttribute('stroke');
    document
      .getElementById('tox-icon-highlight-bg-color__color')
      ?.removeAttribute('fill');
    document
      .getElementById('tox-icon-highlight-bg-color__color')
      ?.removeAttribute('stroke');
  },

  async createNotePage(isWeb = true) {
    const dto = await this.createPage(
      i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'),
      '<p><br></p>',
      this.createParent,
    );
    this.pageInfo = new PageModel(dto);

    this.setIsNewPage(true);
    if (isWeb) ChapterStore.getNoteChapterList();
    ChapterStore.setCurrentChapterInfo(dto.parent_notebook, false);
    this.currentPageId = dto.note_id;
    TagStore.setNoteTagList(dto.tagList); // []
    EditorStore.setFileList(dto.fileList); // null
    this.noteTitle = '';

    // initialize editor properties
    this.initializeBoxColor();
    EditorStore.tinymce?.undoManager?.clear();
    if (EditorStore.tinymce?.selection) EditorStore.tinymce.focus();
  },

  /**
   * It throw away pages in recycle bin.
   * NOTE: If you want to delete 'New Page', you should 'deleteNotePage'!
   */
  async throwNotePage({ pageList, selectablePageId, isDnd }) {
    await this.throwPage(pageList);
    await ChapterStore.getNoteChapterList();
    if (pageList.find(page => page.note_id === this.currentPageId)) {
      const pageId = isDnd
        ? ChapterStore.chapterList[0]?.children[0]?.id
        : selectablePageId;
      this.setCurrentPageId(pageId);
      await this.fetchCurrentPageData(pageId);

      NoteStore.updateDragData(ChapterStore.currentChapterId, this.currentPageId);
      ChapterStore.setIsCtrlKeyDown(false);
      this.setIsCtrlKeyDown(false);
    }

    NoteStore.setIsDragging(false);
    const num = pageList.length;
    NoteStore.setToastText(
      num > 1 ? i18n.t('NOTE_BIN_03', { num }) : i18n.t('NOTE_BIN_02'),
    );
    NoteStore.setIsVisibleToast(true);
    NoteStore.setShowModal(false);
  },

  async deleteNotePage({ pageList, selectablePageId }) {
    await this.deletePage(pageList);
    if (!this.isNewPage) {
      if (this.currentPageId === pageList[0].note_id) {
        this.setCurrentPageId(selectablePageId);
        this.fetchCurrentPageData(selectablePageId);
      }
    } else {
      if (NoteStore.layoutState === 'collapse') {
        NoteStore.setTargetLayout('LNB');
        this.setIsNewPage(false);
        this.fetchCurrentPageData('');
        ChapterStore.setCurrentChapterInfo('', false); // chapterId='', isRecycleBin=false
      } else {
        const currentChapter = ChapterStore.chapterList.find(
          chapter => chapter.id === this.createParent,
        );
        if (currentChapter.children.length > 1) {
          const pageId = currentChapter.children[currentChapter.children.length - 2].id;
          this.setCurrentPageId(pageId);
          this.fetchCurrentPageData(pageId);
        } else {
          this.fetchCurrentPageData('');
        }
      }
    }
    ChapterStore.getNoteChapterList();
    NoteStore.setShowModal(false);
  },

  async renameNotePage({ id, title, chapterId }) {
    const { note_title: text } = await this.renamePage(id, title.trim(), chapterId);
    if (this.dragData.get(id)) this.dragData.get(id).item.text = text;
    this.fetchNoteInfoList(id);
    await ChapterStore.getNoteChapterList();
  },

  createDragData(pageId, chapterId) {
    const chapterIdx = ChapterStore.chapterList.findIndex(
      chapter => chapter.id === chapterId,
    );
    if (chapterIdx < 0) return;
    const pageIdx = ChapterStore.chapterList[chapterIdx].children.findIndex(
      page => page.id === pageId,
    );
    if (pageIdx < 0) return;
    return {
      item: ChapterStore.chapterList[chapterIdx].children[pageIdx],
      pageIdx: pageIdx,
      chapterId: chapterId,
      chapterIdx: chapterIdx,
    };
  },

  async movePage(movePageId, moveTargetChapterId) {
    const {
      data: { dto },
    } = await NoteRepository.movePage(movePageId, moveTargetChapterId);
    return dto;
  },

  getSortedDragDataList() {
    const dragDataList = [...this.dragData].map(keyValue => keyValue[1]);
    return dragDataList.sort((a, b) => {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  },

  async moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    const item = JSON.parse(
      localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()),
    );

    const sortedDragDataList = this.getSortedDragDataList();
    const sortedMovePages = sortedDragDataList.map(
      data => item[data.chapterIdx].children[data.pageIdx],
    );

    const pageIds = []; // 갈아 끼울 페이지 아이디 리스트
    item[moveTargetChapterIdx].children.forEach((pageId, idx) => {
      if (idx === moveTargetPageIdx) pageIds.push(...sortedMovePages);
      if (!this.dragData.get(pageId)) pageIds.push(pageId);
    });
    if (moveTargetPageIdx >= pageIds.length) pageIds.push(...sortedMovePages);

    await Promise.all(
      sortedDragDataList
        .slice()
        .reverse()
        .map(data => {
          if (
            data.chapterId !== moveTargetChapterId &&
            ChapterStore.pageMap.get(data.item.id)
          ) {
            item[data.chapterIdx].children.splice(data.pageIdx, 1);
            return this.movePage(data.item.id, moveTargetChapterId);
          }
        }),
    );

    item[moveTargetChapterIdx].children = pageIds;

    let moveCntInSameChapter = 0;
    let moveCntToAnotherChapter = 0;
    const startIdx = item[moveTargetChapterIdx].children.findIndex(
      pageId => pageId === sortedDragDataList[0].item.id,
    );
    sortedDragDataList.map((data, idx) => {
      if (data.chapterId !== moveTargetChapterId) moveCntToAnotherChapter++;
      else if (data.pageIdx !== startIdx + idx) moveCntInSameChapter++;
      this.dragData.set(data.item.id, {
        item: data.item,
        pageIdx: startIdx + idx,
        chapterId: moveTargetChapterId,
        chapterIdx: moveTargetChapterIdx,
      });
    });

    const moveCnt = moveCntInSameChapter + moveCntToAnotherChapter;
    if (moveCnt > 0) {
      localStorage.setItem(
        'NoteSortData_' + NoteStore.getChannelId(),
        JSON.stringify(item),
      );
      await ChapterStore.getNoteChapterList();
      await this.fetchCurrentPageData(sortedMovePages[0]);

      if (!moveCntToAnotherChapter) {
        NoteStore.setToastText(
          i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_03', {
            moveCnt: moveCntInSameChapter,
          }),
        );
      } else {
        ChapterStore.setDragData(
          new Map([
            [moveTargetChapterId, ChapterStore.createDragData(moveTargetChapterId)],
          ]),
        );
        NoteStore.setToastText(
          i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_01', {
            moveCnt: moveCnt,
            targetPage: ChapterStore.chapterList[moveTargetChapterIdx].text,
          }),
        );
      }
      NoteStore.setIsVisibleToast(true);
    } else {
      // 이동한 페이지가 없는 경우: 기존 선택되어 있던 페이지 select
      NoteStore.handleClickOutside('Page');
    }

    NoteStore.setIsDragging(false);
  },

  async fetchNoteInfoList(noteId) {
    const dto = await this.getNoteInfoList(noteId);
    if (!isFilled(dto.note_id)) {
      if (this.currentPageId === noteId) this.currentPageId = '';
      return;
    }

    this.setCurrentPageId(dto.note_id);
    ChapterStore.setCurrentChapterInfo(dto.parent_notebook);
    dto.note_content = NoteUtil.decodeStr(dto.note_content);
    dto.modUserName = await getUserDisplayName(dto.USER_ID);
    this.pageInfo = new PageModel(dto);
    this.noteTitle = dto.note_title;

    if (this.isNewPage) {
      NoteStore.updateDragData(ChapterStore.currentChapterId, this.currentPageId);
      this.dragData.get(dto.note_id).item.text = dto.note_title;

      import('teespace-core')
        .then(module => {
          try {
            const { logEvent } = module;
            logEvent('note', 'clickNoteBtn');
          } catch (e) {
            console.error(e);
          }
        })
        .catch(e => console.error(e));
      this.setIsNewPage(false);
    }
  },

  async fetchCurrentPageData(pageId) {
    if (pageId) {
      await this.fetchNoteInfoList(pageId);
    } else {
      this.pageInfo = new PageModel({});
      this.setCurrentPageId('');
    }
  },
  // 저장 후 지우기
  removeLocalContent() {
    if (!NoteStore.notechannel_id || !this.currentPageId) return;
    localStorage.removeItem(
      `Note_autosave_${NoteStore.notechannel_id}_${this.currentPageId}`,
    );
  },

  // 노트앱 진입시 수정중인 노트 확인하기
  async checkEditingPage() {
    try {
      if (!NoteStore.notechannel_id || !NoteStore.user_id) return;

      // 수정 중인 노트 하나만 찾는다, Note_autosave_625be3d3-ca73-429a-8f87-34936d31e9a4_ee884b85-3c77-43f2-8c93-c2c10eccb5fa
      const target = Object.keys(localStorage).find(
        key =>
          key.replace(/^(Note_autosave_)(.+)_(.+)$/, '$2') === NoteStore.notechannel_id,
      );
      if (!target) return;
      const noteId = target.replace(/^(Note_autosave_)(.+)_(.+)$/, '$3');

      /**
       * 챕터, 페이지 선택이 됐다가 풀려야할 때(확인했더니 is_edit이 아닌 경우)
       * 페이지 선택 효과가 깜빡이게 돼 fetchCurrentPageData 쓸 수 없음
       */
      const dto = await this.getNoteInfoList(noteId);

      if (dto?.is_edit === NoteStore.user_id) {
        this.setRecoverInfo({
          parentId: dto.parent_notebook,
          id: noteId,
          note_content: localStorage.getItem(target),
        });
        NoteStore.setModalInfo('recover');
      } else {
        // 수정 중인 상태 아니면 스토리지에서 지우기
        this.setRecoverInfo({});
        localStorage.removeItem(target);
      }
    } catch (err) {
      console.log('checkEditingPage, 노트 진입시 수정 중인 노트 확인하기');
    }
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart(noteId, editorFocus = true) {
    this.editStart(noteId, this.pageInfo.chapterId).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      // focus에서 getRng error가 나서 selection부터 체크
      if (EditorStore.tinymce?.selection) {
        if (editorFocus) EditorStore.tinymce.focus();
        EditorStore.tinymce.selection.setCursorLocation();
        EditorStore.tinymce?.setContent(this.pageInfo.content);
      }
      this.initializeBoxColor();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone(updateDto) {
    this.editDone(updateDto).then(dto => {
      this.removeLocalContent();
      if (this.dragData.get(dto.note_id)) {
        this.dragData.get(dto.note_id).item.text = dto.note_title;
      }
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteNoneEdit(noteId) {
    this.noneEdit(noteId, this.pageInfo.chapterId).then(dto => {
      this.fetchCurrentPageData(dto.note_id);
      EditorStore.handleMenuHidden();
      EditorStore.tinymce?.setContent(this.pageInfo.content);
      NoteStore.setShowModal(false);
      EditorStore.setIsSearch(false);
    });
  },

  async handleNoneEdit() {
    this.removeLocalContent(); // 로컬 스토리지에서 내용도 지워야
    if (this.isNewPage) {
      this.deleteNotePage({ pageList: [{ note_id: this.currentPageId }] });
    } else {
      if (this.otherEdit) return;
      else this.noteNoneEdit(this.currentPageId);
    }
  },

  getSaveDto(isAutoSave) {
    return {
      dto: {
        note_id: this.pageInfo.id,
        note_title: this.noteTitle.trim() || i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'),
        note_content: this.noteContent ? this.noteContent : '<p><br></p>',
        text_content: EditorStore.tinymce.getContent({ format: 'text' }),
        parent_notebook: this.pageInfo.chapterId,
        is_edit: isAutoSave ? this.pageInfo.editingUserId : '',
        TYPE: 'EDIT_DONE',
        is_favorite: !isAutoSave && this.isNewPage ? 'isNewPage' : '',
      },
    };
  },

  // 자동저장, 저장 버튼 포함, isAutoSave default는 false(원래 함수 고치지 않기 위해)
  handleSave(isAutoSave = false) {
    if (!isAutoSave && !this.noteTitle) this.setTitle(this.getTitleFromPageContent());
    this._checkEmojiContent();
    const updateDTO = this.getSaveDto(isAutoSave);
    if (isAutoSave) this.handleAutoSave(updateDTO);
    else this.handleSaveBtn(updateDTO);
  },

  handleAutoSave(updateDTO) {
    this.setSaveStatus({ saving: true });
    this.editDone(updateDTO).then(dto => {
      this.removeLocalContent();
      if (document.getElementById(this.pageInfo.id)?.innerText !== dto.note_title)
        ChapterStore.getNoteChapterList();
      this.setSaveStatus({ saved: true });
      // 2초 후 수정 중 인터렉션으로 바꾸기
      setTimeout(() => {
        this.setSaveStatus({});
      }, 2000);
    });
  },

  handleSaveBtn(updateDTO) {
    this.noteEditDone(updateDTO);

    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    EditorStore.setInitialSearchState();
    EditorStore.handleMenuHidden();
    EditorStore.tinymce?.selection.setCursorLocation();
    EditorStore.tinymce?.undoManager.clear();
  },

  _checkEmojiContent() {
    const regRGI = emojiRegexRGI();
    const reg = emojiRegex();
    const regText = emojiRegexText();

    this.noteContent = this.noteContent.replace(regRGI && reg && regText, (m, idx) => {
      return NoteUtil.encodeStr(m);
    });
  },

  getTitleFromPageContent(data) {
    return this._getFirstTxtOfPage(data) || i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03');
  },

  /**
   * 페이지에서 가장 처음으로 표시되는 txt를 반환한다.
   * 단, 테이블인 경우에는 여러 셀 중 처음으로 나타나는 txt를 반환한다.
   * @returns 가장 처음으로 표시되는 txt
   */
  _getFirstTxtOfPage(data = EditorStore.tinymce.getBody().children) {
    const targetNode = [...data].find(node => this._hasTxt(node));

    return targetNode?.tagName === 'TABLE'
      ? this._getTxtFromTable(targetNode)
      : targetNode?.textContent;
  },

  _hasTxt(node) {
    return !!node.textContent;
  },

  _getTxtFromTable(node) {
    const targetTd = [...node.getElementsByTagName('td')].find(td => this._hasTxt(td));
    return targetTd?.textContent;
  },

  async createSharePage(targetList) {
    const {
      data: {
        dto: { noteList },
      },
    } = await NoteRepository.createSharePage(targetList);
    return noteList;
  },

  createNoteSharePage(targetRoomId, targetPageList) {
    if (!targetPageList) return;

    const targetChId = NoteStore.getTargetChId(targetRoomId);
    const targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');
    const targetList = targetPageList.map(page => {
      return {
        WS_ID: NoteRepository.WS_ID,
        note_id: page.note_id || page.id,
        note_title: page.text,
        modified_date: page.date,
        TYPE: page.type === CHAPTER_TYPE.SHARED ? DRAG_TYPE.SHARED_PAGE : DRAG_TYPE.PAGE,
        note_channel_id: NoteRepository.chId,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: NoteRepository.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
        messenger_id: targetTalkChId,
      };
    });

    this.createSharePage(targetList).then(() => {
      ChapterStore.getNoteChapterList();
      NoteStore.setIsDragging(false);
    });
  },
  /**
   * NoteMeta에서도 쓰이고, context menu에서 복구할 챕터가 없을 때도 필요해서 store로 옮김
   * 나중에 필요한 인자가 더 생길까 대비해 object로 인자 받음
   */
  async restorePageLogic({ chapterId, pageId, toastTxt }) {
    const res = await this.restorePage(pageId, chapterId);
    if (res.resultMsg === 'Success') {
      NoteStore.setModalInfo(null);
      Promise.all([
        ChapterStore.getNoteChapterList(),
        PageStore.fetchCurrentPageData(pageId),
      ]).then(() => {
        if (this.currentPageId === pageId) {
          ChapterStore.setCurrentChapterInfo(chapterId, false);
          this.setCurrentPageId(pageId);
        }
        NoteStore.setToastText(toastTxt);
        NoteStore.setIsVisibleToast(true);
      });
    }
  },

  editCancel() {
    if (EditorStore.isSearch) {
      const instance = new Mark(EditorStore.tinymce?.getBody());
      instance.unmark();
    }
    if (EditorStore.isUploading) {
      EditorStore.uploadingFileallCancel();
      return;
    }
    this.handleSave();
    import('teespace-core')
      .then(module => {
        try {
          const { logEvent } = module;
          logEvent('note', 'clickModifyBtn');
        } catch (e) {
          console.error(e);
        }
      })
      .catch(e => console.error(e));
    NoteStore.setToastText(i18n.t('NOTE_SAVE_PAGE'));
    NoteStore.setIsVisibleToast(true);
  },
});

export default PageStore;
