import PageStore from "../store/pageStore";
import EditorStore from "../store/editorStore";

const languageSet = {
  newChapter: '새 챕터',
  page: '페이지',
  chapter: '챕터',
  searchPageChapter: '페이지, 챕터 검색',
  addNewPage: '새 페이지 추가',
  tag: '태그',
  untitled: '(제목 없음)',
  table: '(표)',
  newPage: '새 페이지',
  receivedPage: '전달받은 페이지',
  duplicate: '중복된 이름이 있습니다.',
  anotherName: '다른 이름을 입력해주세요.',
  ok: '확인',
  unableModify: '수정할 수 없습니다.',
  unableDelte: '삭제 할 수 없습니다.',
  otherEditing: `${PageStore.editingUserName} 님이 수정 중 입니다.`,
  othersEditing: `${PageStore.editingUserCount}명이 수정 중입니다.`,
  pageDelete: '페이지를 삭제하시겠습니까?',
  chapterDelete: '챕터를 삭제하시겠습니까?',
  chapterChildrenDelete: '챕터에 속한 페이지도 삭제됩니다.',
  delete: '삭제',
  cancel: '취소',
  modify: '수정',
  download: '다운로드',
  amSameDay: (hhmm) => `오전 ${hhmm}`,
  pmSameDay: (hhmm) => `오후 ${hhmm}`,
  readmode: '읽기 모드',
  save: '저장',
  pageotherMove: (moveCnt, targetPage) => `${moveCnt}개의 페이지를 ${targetPage} 으로 이동하였습니다.`,
  chapterMove: (moveCnt) => `${moveCnt}개의 챕터가 이동하였습니다.`,
  pageMove: (moveCnt) => `${moveCnt}개의 페이지가 이동하였습니다.`,
  noPage: '페이지가 없습니다.',
  noChapter: '챕터가 없습니다.',
  // clickNewPage: '시작하려면 "새 페이지 추가" 버튼을 클릭하세요.',
  clickNewChapter: '시작하려면 "새 챕터" 버튼을 클릭하세요.',
  // unregisteredMember: `${}`,
  noSearchResult: '검색 결과가 없습니다.',
  searching: '검색중 ...',
  searchContent: '내용 검색',
  insertLink: '링크 삽입',
  done: '완료',
  enterText: '텍스트를 입력해 주세요.',
  enterLink: '링크를 입력해 주세요.',
  text: '텍스트',
  link: '링크',
  editLink: '링크 편집',
  deleteLink: '링크 삭제',
  moveToLink: '링크로 이동',
  invalidLink: '해당 URL은 유효하지 않습니다.',
  attachFile: '파일 첨부',
  attachDrive: 'Drive에서 첨부',
  attachLocal: '내 PC에서 첨부',
  spaceStorageFull: '스페이스 공간이 부족하여 파일을 첨부할 수 없습니다.',
  sizeoverUpload: '파일 첨부는 한 번에 최대 20GB까지 가능합니다.',
  countoverUpload: '파일 첨부는 한 번에 30개까지 가능합니다.',
  lengthoverUpload: '파일명이 70자를 넘는 경우 업로드할 수 없습니다.',
  someFilesUploadFail: '일부 파일이 업로드되지 못하였습니다.',
  uploadFail: `(${EditorStore.uploadLength}개 항목 중 ${EditorStore.failCount}개 실패)`,
  selectedDelete: (fileName) => `선택한 ${fileName}을 삭제하시겠습니까?`,
  notRestore: '삭제 후에는 복구할 수 없습니다.',
  editCancel: '페이지를 저장하고 나가시겠습니까?',
  notSave: '저장 안함',
  rename: '이름 변경',
  forward: '다른 룸으로 전달',
  sendEmail: 'Mail로 전달',
  export: '내보내기',
  viewInfo: '정보 보기',
  title: '제목',
  forwardRoom: '출처 룸',
  forwardMemeber: '전달한 멤버',
  forwardDate: '전달 날짜',
  // amOtherDay: (yyyymmdd, hhmm) => `${yyyymmdd} 오전 ${hhmm}`,
  // pmOtherDay: (yyyymmdd, hhmm) => `${yyyymmdd} 오후 ${hhmm}`,
  selectFromList: '프렌즈/구성원/룸 목록에서\n 선택해 주세요.',
  send: '전달',
  pdfFormat: 'PDF 형식(.pdf)',
  txtFormat: 'TXT 형식(.txt)',
  korCategory: 'ㄱ~ㅎ',
  engCategory: 'A~Z',
  numCategory: '0~9',
  etcCategory: '기타',
  searchTag: '태그 검색',
  noTagFound: '태그가 없습니다.',
  notag: '페이지 하단에 태그를 입력하여 추가하세요.',
  addTag: '태그 추가',
  notavailableTag: '읽기모드에서는 추가할 수 없습니다.',
  usedTagName: '이미 있는 태그 이름입니다.',
  deletedNote: '노트가 삭제되어 불러올 수 없습니다.',
  align: '정렬',
  replaceImages: '이미지 교체',
  saveToDrive: 'Drive에 저장',
  saveToMyPC: '내 PC에 저장',
};

export default { translation: languageSet };
