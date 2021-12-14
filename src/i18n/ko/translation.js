const languageSet = {
  NOTE_PAGE_LIST_CMPNT_DEF_01: '새 챕터',
  NOTE_PAGE_LIST_CMPNT_DEF_02: '새 페이지',
  NOTE_PAGE_LIST_CMPNT_DEF_03: '(제목 없음)',
  NOTE_PAGE_LIST_CMPNT_DEF_04: '새 페이지 추가',
  NOTE_PAGE_LIST_CMPNT_DEF_05: '페이지, 챕터 검색',
  NOTE_PAGE_LIST_CMPNT_DEF_06: '태그',
  NOTE_PAGE_LIST_CMPNT_DEF_07: '전달받은 페이지',
  NOTE_PAGE_LIST_CREATE_N_CHPT_01: '중복된 이름이 있습니다.',
  NOTE_PAGE_LIST_CREATE_N_CHPT_02: '다른 이름을 입력하세요.',
  NOTE_PAGE_LIST_CREATE_N_CHPT_03: '확인',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_01: '삭제할 수 없습니다.',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_02: `{{userName}} 님이 수정 중입니다.`,
  NOTE_PAGE_LIST_DEL_PGE_CHPT_03: '페이지를 삭제하시겠습니까?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_04: '삭제',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_05: '취소',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_06: '챕터를 삭제하시겠습니까?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: '챕터에 속한 페이지는 휴지통으로 이동됩니다.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_01: '수정',
  NOTE_PAGE_LIST_ADD_NEW_PGE_02: '읽기 모드',
  NOTE_PAGE_LIST_ADD_NEW_PGE_03: '편집하려면 수정 버튼을 클릭해 주세요.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_04: '저장',
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_01: `{{moveCnt}}개의 페이지를 {{targetPage}}(으)로 이동하였습니다.`,
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_02: `{{moveCnt}}개의 챕터가 이동하였습니다.`,
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_03: `{{moveCnt}}개의 페이지가 이동하였습니다.`,
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01: '페이지가 없습니다.',
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02: "시작하려면 '새 페이지 추가' 버튼을 클릭하세요.",
  NOTE_EDIT_PAGE_WORK_AREA_DEF_01: '(탈퇴한 멤버)',
  NOTE_EDIT_PAGE_SEARCH_01: '검색 결과가 없습니다.',
  NOTE_EDIT_PAGE_SEARCH_02: '검색 중...',
  NOTE_EDIT_PAGE_SEARCH_03: '내용 검색',
  NOTE_EDIT_PAGE_INSERT_LINK_01: '링크 삽입',
  NOTE_EDIT_PAGE_INSERT_LINK_02: '완료',
  NOTE_EDIT_PAGE_INSERT_LINK_03: '텍스트를 입력하세요.',
  NOTE_EDIT_PAGE_INSERT_LINK_04: '텍스트',
  NOTE_EDIT_PAGE_INSERT_LINK_05: '링크',
  NOTE_EDIT_PAGE_INSERT_LINK_06: '해당 URL은 유효하지 않습니다.',
  NOTE_EDIT_PAGE_INSERT_LINK_07: '링크 편집',
  NOTE_EDIT_PAGE_INSERT_LINK_08: '링크 삭제',
  NOTE_EDIT_PAGE_ATTACH_FILE_01: 'Drive에서 첨부',
  NOTE_EDIT_PAGE_ATTACH_FILE_02: '내 PC에서 첨부',
  NOTE_EDIT_PAGE_ATTACH_FILE_03: '그룹 공간이 부족하여\\n 파일을 첨부할 수 없습니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_04: '파일 첨부는 한 번에 최대 20GB까지 가능합니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_05: '파일 첨부는 한 번에 30개까지 가능합니다.',
  NOTE_EDIT_PAGE_COMPLETE_01: '페이지를 저장하고 나가시겠습니까?',
  NOTE_EDIT_PAGE_COMPLETE_02: '저장 안 함',
  NOTE_DELIVER_CONTEXT_MENU_01: '이름 변경',
  NOTE_DELIVER_CONTEXT_MENU_02: 'Mail로 전달',
  NOTE_DELIVER_CONTEXT_MENU_03: '내보내기',
  NOTE_DELIVER_CONTEXT_MENU_04: '정보 보기',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_01: '출처 룸',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_02: '전달한 멤버',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_03: '전달 날짜',
  NOTE_DELIVER_TO_ANOTHER_ROOM_01: '별명 검색',
  NOTE_DELIVER_TO_ANOTHER_ROOM_02: '룸',
  NOTE_DELIVER_TO_ANOTHER_ROOM_03: '프렌즈',
  NOTE_DELIVER_TO_ANOTHER_ROOM_04: '나에게',
  NOTE_DELIVER_TO_ANOTHER_ROOM_05: '프렌즈/룸 목록에서\n선택해 주세요.',
  NOTE_DELIVER_TO_ANOTHER_ROOM_06: '룸 이름, 멤버 검색',
  NOTE_DELIVER_TO_ANOTHER_ROOM_07: '전달',
  NOTE_DELIVER_TO_ANOTHER_ROOM_08: '즐겨찾기',
  NOTE_TAG_TAG_MENU_01: 'ㄱ~ㅎ',
  NOTE_TAG_TAG_MENU_02: 'A~Z',
  NOTE_TAG_TAG_MENU_03: '0~9',
  NOTE_TAG_TAG_MENU_04: '기타',
  NOTE_TAG_TAG_MENU_05: '태그 검색',
  NOTE_TAG_NO_CONTENTS_01: '태그가 없습니다.',
  NOTE_TAG_NO_CONTENTS_02: '페이지 하단에 태그를 입력하여 추가하세요.',
  NOTE_EDIT_PAGE_MENUBAR_01: '실행 취소',
  NOTE_EDIT_PAGE_MENUBAR_02: '다시 실행',
  NOTE_EDIT_PAGE_MENUBAR_03: '본문 스타일',
  NOTE_EDIT_PAGE_MENUBAR_04: '폰트 종류',
  NOTE_EDIT_PAGE_MENUBAR_05: '폰트 크기',
  NOTE_EDIT_PAGE_MENUBAR_06: '글자색',
  NOTE_EDIT_PAGE_MENUBAR_07: '배경색',
  NOTE_EDIT_PAGE_MENUBAR_08: '볼드체',
  NOTE_EDIT_PAGE_MENUBAR_09: '이탤릭체',
  NOTE_EDIT_PAGE_MENUBAR_10: '밑줄체',
  NOTE_EDIT_PAGE_MENUBAR_11: '왼쪽 정렬',
  NOTE_EDIT_PAGE_MENUBAR_12: '가운데 정렬',
  NOTE_EDIT_PAGE_MENUBAR_13: '오른쪽 정렬',
  NOTE_EDIT_PAGE_MENUBAR_14: '양쪽 정렬',
  NOTE_EDIT_PAGE_MENUBAR_15: '번호 매기기',
  NOTE_EDIT_PAGE_MENUBAR_16: '글머리 기호',
  NOTE_EDIT_PAGE_MENUBAR_17: '체크리스트',
  NOTE_EDIT_PAGE_MENUBAR_18: '들여쓰기',
  NOTE_EDIT_PAGE_MENUBAR_19: '내어쓰기',
  NOTE_EDIT_PAGE_MENUBAR_20: '구분선',
  NOTE_EDIT_PAGE_MENUBAR_21: '표',
  NOTE_EDIT_PAGE_MENUBAR_22: '현재 시간 입력',
  NOTE_EDIT_PAGE_MENUBAR_23: '이미지 삽입',
  NOTE_EDIT_PAGE_MENUBAR_24: '파일 첨부',
  NOTE_EDIT_PAGE_MENUBAR_25: '반시계 방향 90도 회전',
  NOTE_EDIT_PAGE_MENUBAR_26: '시계 방향 90도 회전',
  NOTE_EDIT_PAGE_MENUBAR_27: '상하 반전',
  NOTE_EDIT_PAGE_MENUBAR_28: '좌우 반전',
  NOTE_EDIT_PAGE_MENUBAR_29: '이미지 편집',
  NOTE_EDIT_PAGE_MENUBAR_30: '이미지 교체',
  NOTE_EDIT_PAGE_MENUBAR_31: '취소선',
  NOTE_EDIT_PAGE_INSERT_LINK_09: '링크로 이동',
  NOTE_EDIT_PAGE_ADD_TAG_01: '이미 존재하는 태그 이름입니다.',
  NOTE_PAGE_LIST_NO_CHPT_01: '챕터가 없습니다.',
  NOTE_PAGE_LIST_NO_CHPT_02: "시작하려면 '새 챕터' 버튼을 클릭하세요.",
  NOTE_EDIT_PAGE_MENUBAR_32: 'Drive에 저장',
  NOTE_EDIT_PAGE_MENUBAR_33: '내 PC에 저장',
  NOTE_EDIT_PAGE_MENUBAR_34: '다운로드',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_08: `{{count}}명이 수정 중입니다.`,
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01: 'PDF 형식(.pdf)',
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02: 'TXT 형식(.txt)',
  NOTE_EDIT_PAGE_ATTACH_FILE_06: '일부 파일이 업로드되지 못하였습니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_07: `({{uploadCnt}}개 항목 중 {{failCnt}}개 실패)`,
  NOTE_EDIT_PAGE_ATTACH_FILE_08:
    '업로드 중인 파일이 있습니다.\\n페이지를 저장하고 나가시겠습니까?',
  NOTE_EDIT_PAGE_ATTACH_FILE_09: '업로드 완료된 파일은 페이지에 저장됩니다.',
  NOTE_EDIT_PAGE_INSERT_LINK_10: '올바르지 않은 주소입니다.',
  NOTE_EDIT_PAGE_INSERT_LINK_11: '텍스트를 입력해 주세요.',
  NOTE_EDIT_PAGE_INSERT_LINK_12: '링크를 입력해 주세요.',
  NOTE_EDIT_PAGE_INSERT_LINK_13: "이메일의 경우, 앞에 'mailto:'를 붙여주세요.",
  NOTE_EDIT_PAGE_AUTO_SAVE_01: '저장 중',
  NOTE_EDIT_PAGE_AUTO_SAVE_02: '저장되었습니다.',
  NOTE_EDIT_PAGE_CANT_EDIT_01: '수정할 수 없습니다.',
  NOTE_ADD_TAGS_01: '태그 추가',
  NOTE_ADD_TAGS_02: '읽기 모드에서는 태그 추가를 할 수 없습니다.',
  NOTE_EDIT_PAGE_MENUBAR_35: '정렬',

  NOTE_GUEST_01: '게스트는 챕터 및 페이지를 편집할 수 없습니다.',
  NOTE_GUEST_02: '게스트는 사용할 수 없는 기능입니다.',

  DRIVE_UPLOAD_BTN_04: '파일명이 70자를 넘는 경우 업로드할 수 없습니다.',

  NOTE_EDIT_PAGE_UPDATE_TIME_01: `오전 {{time}}`,
  NOTE_EDIT_PAGE_UPDATE_TIME_02: `오후 {{time}}`,
  NOTE_EXPORT_TITLE: '제목',

  NOTE_CONTEXT_MENU_01: '다른 룸으로 전달',
  NOTE_CONTEXT_MENU_02: '복원',
  NOTE_CONTEXT_MENU_03: '휴지통 비우기',
  NOTE_DND_ACTION_01: '이동이 불가능합니다.',
  NOTE_DND_ACTION_02: '전달받은 챕터 및 페이지는 이동 불가능합니다.',

  NOTE_BIN_01: '휴지통',
  NOTE_BIN_02: '휴지통으로 이동되었습니다.',
  NOTE_BIN_03: `{{num}}개의 페이지가 휴지통으로 이동되었습니다.`,
  NOTE_BIN_04: '챕터가 삭제되었습니다.',
  NOTE_BIN_05: '휴지통에 있는 페이지는 30일 동안 보관되며 이후 휴지통에서 삭제됩니다.',
  NOTE_BIN_06: '페이지를 영구 삭제하시겠습니까?',
  NOTE_BIN_07: '삭제된 페이지는 복원할 수 없습니다.',
  NOTE_BIN_08: `{{num}}개의 페이지를 영구 삭제하시겠습니까?`,

  NOTE_BIN_RESTORE_01: '복원될 챕터가 존재하지 않습니다.\\n어느 챕터로 복원하시겠습니까?',
  NOTE_BIN_RESTORE_02: '{{name}}(으)로 복원되었습니다.',
  NOTE_BIN_RESTORE_03: `{{num}}개의 페이지가 복원되었습니다.`,

  NOTE_EDIT_PAGE_MENUBAR_36: '소스 코드',
  NOTE_RECOVER_DATA_01: '작성 중인 페이지가 있습니다.\\n내용을 복원하시겠습니까?',
  NOTE_META_TAG_01: '챕터',
  NOTE_META_TAG_02: '페이지',
  NOTE_META_TAG_03: '페이지가 삭제되어 불러올 수 없습니다.',
  NOTE_META_TAG_04: '챕터가 삭제되어 불러올 수 없습니다.',

  NOTE_SAVE_PAGE: '페이지가 저장되었습니다.',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_09: '전달받은 페이지는 영구 삭제됩니다.',

  NOTE_NOTICENTER_01: '챕터를 공유했습니다.',
  NOTE_NOTICENTER_02: '페이지를 공유했습니다.',
  NOTE_NOTICENTER_03: `{{title}}을 생성했습니다.`,
};

export default languageSet;
