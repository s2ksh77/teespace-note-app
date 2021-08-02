const GlobalVariable = {
  apiKey: '90655irb9nds5o8ycj2bpivk0v2y34e2oa6qta82nclxrnx3',
  editorWrapper: null,
  isBasicPlan: false,
  isMailApp: false,
  setEditorWrapper(ref) {
    this.editorWrapper = ref;
  },
  setIsBasicPlan(isBasicPlan) {
    this.isBasicPlan = isBasicPlan;
  },
  setIsMailApp(isMailApp) {
    this.isMailApp = isMailApp;
  },
};

export default GlobalVariable;

// 오타로 인한 버그 막기 및 타입 리스트 확인
export const CHAPTER_TYPE = {
  DEFAULT: 'default',
  NOTEBOOK: 'notebook',
  SHARED_PAGE: 'shared_page',
  SHARED: 'shared',
  RECYCLE_BIN: 'recycle_bin',
};

export const DRAG_TYPE = {
  CHAPTER: 'Item:Note:Chapters',
  PAGE: 'Item:Note:Pages',
  SHARED_CHAPTER: 'Item:Note:SharedChapters',
  SHARED_PAGE: 'Item:Note:SharedPages',
};
