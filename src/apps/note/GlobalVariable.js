const GlobalVariable = {  
  apiKey:"d9c90nmok7sq2sil8caz8cwbm4akovrprt6tc67ac0y7my81",
  editorWrapper:null,
  isBasicPlan:false,
  setEditorWrapper(ref){
    this.editorWrapper=ref;
  },
  setIsBasicPlan(isBasicPlan){
    this.isBasicPlan = isBasicPlan;
  }
}

export default GlobalVariable;

// 오타로 인한 버그 막기 및 타입 리스트 확인
export const CHAPTER_TYPE = {
  DEFAULT:'default',
  NOTEBOOK:'notebook',
  SHARED_PAGE:'shared_page',
  SHARED:'shared'
}