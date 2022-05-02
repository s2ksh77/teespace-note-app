'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var teespaceCore = require('teespace-core');
var moment = require('moment-timezone');
var i18next = require('i18next');
var reactI18next = require('react-i18next');
var ramda = require('ramda');
var emojiRegex = require('emoji-regex/index.js');
var Mark$1 = require('mark.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var i18next__default = /*#__PURE__*/_interopDefaultLegacy(i18next);
var emojiRegex__default = /*#__PURE__*/_interopDefaultLegacy(emojiRegex);
var Mark__default = /*#__PURE__*/_interopDefaultLegacy(Mark$1);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var GlobalVariable = {
  editorWrapper: null,
  isBasicPlan: false,
  isMailApp: false,
  setEditorWrapper: function setEditorWrapper(ref) {
    this.editorWrapper = ref;
  },
  setIsBasicPlan: function setIsBasicPlan(isBasicPlan) {
    this.isBasicPlan = isBasicPlan;
  },
  setIsMailApp: function setIsMailApp(isMailApp) {
    this.isMailApp = isMailApp;
  }
};

var CHAPTER_TYPE = {
  DEFAULT: 'default',
  NOTEBOOK: 'notebook',
  SHARED_PAGE: 'shared_page',
  SHARED: 'shared',
  RECYCLE_BIN: 'recycle_bin'
};
var DRAG_TYPE = {
  CHAPTER: 'Item:Note:Chapters',
  PAGE: 'Item:Note:Pages',
  SHARED_CHAPTER: 'Item:Note:SharedChapters',
  SHARED_PAGE: 'Item:Note:SharedPages'
};

var languageSet = {
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
  NOTE_PAGE_LIST_DEL_PGE_CHPT_02: "{{userName}} \uB2D8\uC774 \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_DEL_PGE_CHPT_03: '페이지를 삭제하시겠습니까?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_04: '삭제',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_05: '취소',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_06: '챕터를 삭제하시겠습니까?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: '챕터에 속한 페이지는 휴지통으로 이동됩니다.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_01: '수정',
  NOTE_PAGE_LIST_ADD_NEW_PGE_02: '읽기 모드',
  NOTE_PAGE_LIST_ADD_NEW_PGE_03: '편집하려면 수정 버튼을 클릭해 주세요.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_04: '저장',
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_01: "{{moveCnt}}\uAC1C\uC758 \uD398\uC774\uC9C0\uB97C {{targetPage}}(\uC73C)\uB85C \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_02: "{{moveCnt}}\uAC1C\uC758 \uCC55\uD130\uAC00 \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_03: "{{moveCnt}}\uAC1C\uC758 \uD398\uC774\uC9C0\uAC00 \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4.",
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
  NOTE_PAGE_LIST_DEL_PGE_CHPT_08: "{{count}}\uBA85\uC774 \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01: 'PDF 형식(.pdf)',
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02: 'TXT 형식(.txt)',
  NOTE_EDIT_PAGE_ATTACH_FILE_06: '일부 파일이 업로드되지 못하였습니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_07: "({{uploadCnt}}\uAC1C \uD56D\uBAA9 \uC911 {{failCnt}}\uAC1C \uC2E4\uD328)",
  NOTE_EDIT_PAGE_ATTACH_FILE_08: '업로드 중인 파일이 있습니다.\\n페이지를 저장하고 나가시겠습니까?',
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
  NOTE_EDIT_PAGE_UPDATE_TIME_01: "\uC624\uC804 {{time}}",
  NOTE_EDIT_PAGE_UPDATE_TIME_02: "\uC624\uD6C4 {{time}}",
  NOTE_EXPORT_TITLE: '제목',
  NOTE_CONTEXT_MENU_01: '다른 룸으로 전달',
  NOTE_CONTEXT_MENU_02: '복원',
  NOTE_CONTEXT_MENU_03: '휴지통 비우기',
  NOTE_DND_ACTION_01: '이동이 불가능합니다.',
  NOTE_DND_ACTION_02: '전달받은 챕터 및 페이지는 이동 불가능합니다.',
  NOTE_BIN_01: '휴지통',
  NOTE_BIN_02: '휴지통으로 이동되었습니다.',
  NOTE_BIN_03: "{{num}}\uAC1C\uC758 \uD398\uC774\uC9C0\uAC00 \uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  NOTE_BIN_04: '챕터가 삭제되었습니다.',
  NOTE_BIN_05: '휴지통에 있는 페이지는 30일 동안 보관되며 이후 휴지통에서 삭제됩니다.',
  NOTE_BIN_06: '페이지를 영구 삭제하시겠습니까?',
  NOTE_BIN_07: '삭제된 페이지는 복원할 수 없습니다.',
  NOTE_BIN_08: "{{num}}\uAC1C\uC758 \uD398\uC774\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  NOTE_BIN_RESTORE_01: '복원될 챕터가 존재하지 않습니다. \n어느 챕터로 복원하시겠습니까?',
  NOTE_BIN_RESTORE_02: '{{name}}(으)로 복원되었습니다.',
  NOTE_BIN_RESTORE_03: "{{num}}\uAC1C\uC758 \uD398\uC774\uC9C0\uAC00 \uBCF5\uC6D0\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
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
  NOTE_NOTICENTER_03: "{{title}}\uC744 \uC0DD\uC131\uD588\uC2B5\uB2C8\uB2E4."
};

var languageSet$1 = {
  NOTE_PAGE_LIST_CMPNT_DEF_01: 'New Chapter',
  NOTE_PAGE_LIST_CMPNT_DEF_02: 'New Page',
  NOTE_PAGE_LIST_CMPNT_DEF_03: '(Untitled)',
  NOTE_PAGE_LIST_CMPNT_DEF_04: 'Add New Page',
  NOTE_PAGE_LIST_CMPNT_DEF_05: 'Search page or chapter',
  NOTE_PAGE_LIST_CMPNT_DEF_06: 'Tag',
  NOTE_PAGE_LIST_CMPNT_DEF_07: 'Page Received',
  NOTE_PAGE_LIST_CREATE_N_CHPT_01: 'Duplicate name exists.',
  NOTE_PAGE_LIST_CREATE_N_CHPT_02: 'Enter another name.',
  NOTE_PAGE_LIST_CREATE_N_CHPT_03: 'OK',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_01: 'Unable to delete.',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_02: "It is currently being modified by {{userName}}",
  NOTE_PAGE_LIST_DEL_PGE_CHPT_03: 'Do you want to delete this page?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_04: 'Delete',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_05: 'Cancel',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_06: 'Do you want to delete this chapter?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: 'The pages belonging to the chapter are moved to Trash.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_01: 'Modify',
  NOTE_PAGE_LIST_ADD_NEW_PGE_02: 'Read Mode',
  NOTE_PAGE_LIST_ADD_NEW_PGE_03: 'Click Modify to edit this page.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_04: 'Save',
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_01: "{{moveCnt}} pages moved to {{targetPage}}.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_02: "{{moveCnt}} chapters moved.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_03: "{{moveCnt}} pages moved.",
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01: 'No page exists.',
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02: "To create one, click 'Add New Page'.",
  NOTE_EDIT_PAGE_WORK_AREA_DEF_01: '(Unregistered Member)',
  NOTE_EDIT_PAGE_SEARCH_01: 'No search results found.',
  NOTE_EDIT_PAGE_SEARCH_02: 'Searching...',
  NOTE_EDIT_PAGE_SEARCH_03: 'Search keyword',
  NOTE_EDIT_PAGE_INSERT_LINK_01: 'Insert Link',
  NOTE_EDIT_PAGE_INSERT_LINK_02: 'Done',
  NOTE_EDIT_PAGE_INSERT_LINK_03: 'Enter a text.',
  NOTE_EDIT_PAGE_INSERT_LINK_04: 'Text',
  NOTE_EDIT_PAGE_INSERT_LINK_05: 'Link',
  NOTE_EDIT_PAGE_INSERT_LINK_06: 'The URL is not valid.',
  NOTE_EDIT_PAGE_INSERT_LINK_07: 'Edit Link',
  NOTE_EDIT_PAGE_INSERT_LINK_08: 'Delete Link',
  NOTE_EDIT_PAGE_ATTACH_FILE_01: 'Attach from Drive',
  NOTE_EDIT_PAGE_ATTACH_FILE_02: 'Attach from My PC',
  NOTE_EDIT_PAGE_ATTACH_FILE_03: 'There is not enough storage space to attach the file.',
  NOTE_EDIT_PAGE_ATTACH_FILE_04: 'You can attach up to 20 GB files at a time.',
  NOTE_EDIT_PAGE_ATTACH_FILE_05: 'You can attach up to 30 files at a time.',
  NOTE_EDIT_PAGE_COMPLETE_01: 'Do you want to save this page and exit?',
  NOTE_EDIT_PAGE_COMPLETE_02: 'Not Save',
  NOTE_DELIVER_CONTEXT_MENU_01: 'Rename',
  NOTE_DELIVER_CONTEXT_MENU_02: 'Send Email',
  NOTE_DELIVER_CONTEXT_MENU_03: 'Export',
  NOTE_DELIVER_CONTEXT_MENU_04: 'View Information',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_01: 'Room',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_02: 'Member',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_03: 'Date',
  NOTE_DELIVER_TO_ANOTHER_ROOM_01: 'Search nickname',
  NOTE_DELIVER_TO_ANOTHER_ROOM_02: 'Rooms',
  NOTE_DELIVER_TO_ANOTHER_ROOM_03: 'Friends',
  NOTE_DELIVER_TO_ANOTHER_ROOM_04: 'Me',
  NOTE_DELIVER_TO_ANOTHER_ROOM_05: 'Select people from the Friends/Rooms list.',
  NOTE_DELIVER_TO_ANOTHER_ROOM_06: 'Search room name or member',
  NOTE_DELIVER_TO_ANOTHER_ROOM_07: 'Send',
  NOTE_DELIVER_TO_ANOTHER_ROOM_08: 'Favorites',
  NOTE_TAG_TAG_MENU_01: 'ㄱ-ㅎ',
  NOTE_TAG_TAG_MENU_02: 'A-Z',
  NOTE_TAG_TAG_MENU_03: '0-9',
  NOTE_TAG_TAG_MENU_04: 'Others',
  NOTE_TAG_TAG_MENU_05: 'Search tag',
  NOTE_TAG_NO_CONTENTS_01: 'No tag found.',
  NOTE_TAG_NO_CONTENTS_02: 'Enter a tag at the bottom of the page or choose one from the list.',
  NOTE_EDIT_PAGE_MENUBAR_01: 'Undo',
  NOTE_EDIT_PAGE_MENUBAR_02: 'Redo',
  NOTE_EDIT_PAGE_MENUBAR_03: 'Body Style',
  NOTE_EDIT_PAGE_MENUBAR_04: 'Font Type',
  NOTE_EDIT_PAGE_MENUBAR_05: 'Font Size',
  NOTE_EDIT_PAGE_MENUBAR_06: 'Character Color',
  NOTE_EDIT_PAGE_MENUBAR_07: 'Background Color',
  NOTE_EDIT_PAGE_MENUBAR_08: 'Bold',
  NOTE_EDIT_PAGE_MENUBAR_09: 'Italics',
  NOTE_EDIT_PAGE_MENUBAR_10: 'Underline',
  NOTE_EDIT_PAGE_MENUBAR_11: 'Left',
  NOTE_EDIT_PAGE_MENUBAR_12: 'Middle',
  NOTE_EDIT_PAGE_MENUBAR_13: 'Right',
  NOTE_EDIT_PAGE_MENUBAR_14: 'Both',
  NOTE_EDIT_PAGE_MENUBAR_15: 'Numbering',
  NOTE_EDIT_PAGE_MENUBAR_16: 'Bullet Point',
  NOTE_EDIT_PAGE_MENUBAR_17: 'Checklist',
  NOTE_EDIT_PAGE_MENUBAR_18: 'Indent',
  NOTE_EDIT_PAGE_MENUBAR_19: 'Outdent',
  NOTE_EDIT_PAGE_MENUBAR_20: 'Delimiter',
  NOTE_EDIT_PAGE_MENUBAR_21: 'Tables',
  NOTE_EDIT_PAGE_MENUBAR_22: 'Enter Current time',
  NOTE_EDIT_PAGE_MENUBAR_23: 'Insert Images/Videos',
  NOTE_EDIT_PAGE_MENUBAR_24: 'Attach Files',
  NOTE_EDIT_PAGE_MENUBAR_25: 'Rotate by 90 Degrees Counterclockwise',
  NOTE_EDIT_PAGE_MENUBAR_26: 'Rotate by 90 Degrees Clockwise',
  NOTE_EDIT_PAGE_MENUBAR_27: 'Flip Vertically',
  NOTE_EDIT_PAGE_MENUBAR_28: 'Flip Horizontally',
  NOTE_EDIT_PAGE_MENUBAR_29: 'Edit Image',
  NOTE_EDIT_PAGE_MENUBAR_30: 'Replace Image',
  NOTE_EDIT_PAGE_MENUBAR_31: 'Strikethrough',
  NOTE_EDIT_PAGE_INSERT_LINK_09: 'Move to Link',
  NOTE_EDIT_PAGE_ADD_TAG_01: 'The tag name already exists.',
  NOTE_PAGE_LIST_NO_CHPT_01: 'No chapter exists.',
  NOTE_PAGE_LIST_NO_CHPT_02: "To create one, click 'New Chapter'.",
  NOTE_EDIT_PAGE_MENUBAR_32: 'Save to Drive',
  NOTE_EDIT_PAGE_MENUBAR_33: 'Save to My PC',
  NOTE_EDIT_PAGE_MENUBAR_34: 'Download',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_08: "It is currently being modified by {{count}}.",
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01: 'PDF Format(.pdf)',
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02: 'TXT Format(.txt)',
  NOTE_EDIT_PAGE_ATTACH_FILE_06: 'Unable to upload some files.',
  NOTE_EDIT_PAGE_ATTACH_FILE_07: "({{failCnt}} out of {{uploadCnt}} failed)",
  NOTE_EDIT_PAGE_ATTACH_FILE_08: 'There is a file currently being uploaded.\\nDo you want to save and exit?',
  NOTE_EDIT_PAGE_ATTACH_FILE_09: 'The uploaded file is saved on the page.',
  NOTE_EDIT_PAGE_INSERT_LINK_10: 'Invalid address.',
  NOTE_EDIT_PAGE_INSERT_LINK_11: 'Enter a text.',
  NOTE_EDIT_PAGE_INSERT_LINK_12: 'Enter a link.',
  NOTE_EDIT_PAGE_INSERT_LINK_13: "Add 'mailto:' in an email.",
  NOTE_EDIT_PAGE_AUTO_SAVE_01: 'Saving…',
  NOTE_EDIT_PAGE_AUTO_SAVE_02: 'Page saved.',
  NOTE_EDIT_PAGE_CANT_EDIT_01: 'Unable to Modify.',
  NOTE_ADD_TAGS_01: 'Add Tag',
  NOTE_ADD_TAGS_02: 'You cannot add tags in read mode.',
  NOTE_EDIT_PAGE_MENUBAR_35: 'Align',
  NOTE_GUEST_01: 'Guests cannot edit chapters and pages.',
  NOTE_GUEST_02: 'This feature is not available to guests.',
  DRIVE_UPLOAD_BTN_04: 'The name of the file cannot exceed the limit of 70 characters. ',
  NOTE_EDIT_PAGE_UPDATE_TIME_01: "{{time}} AM",
  NOTE_EDIT_PAGE_UPDATE_TIME_02: "{{time}} PM",
  NOTE_EXPORT_TITLE: 'Title',
  NOTE_CONTEXT_MENU_01: 'Forwarded to another room.',
  NOTE_CONTEXT_MENU_02: 'Recover',
  NOTE_CONTEXT_MENU_03: 'Empty Trash',
  NOTE_DND_ACTION_01: 'Cannot move.',
  NOTE_DND_ACTION_02: 'Received chapters and pages cannot be moved.',
  NOTE_BIN_01: 'Trash',
  NOTE_BIN_02: 'Moved to Trash.',
  NOTE_BIN_03: "{{num}} pages have been moved to Trash.",
  NOTE_BIN_04: 'Chapter deleted.',
  NOTE_BIN_05: 'After 30 days, pages are deleted from the Trash.',
  NOTE_BIN_06: 'Do you want to permanently delete this page?',
  NOTE_BIN_07: 'This action cannot be undone.',
  NOTE_BIN_08: "Do you want to permanently delete {{num}} pages?",
  NOTE_BIN_RESTORE_01: 'Which chapter do you want to restore to?',
  NOTE_BIN_RESTORE_02: 'Page has been restored.',
  NOTE_BIN_RESTORE_03: "{{num}} pages have been restored.",
  NOTE_EDIT_PAGE_MENUBAR_36: 'Source Code',
  NOTE_RECOVER_DATA_01: 'There is a page being created.\\nDo you want to recover?',
  NOTE_META_TAG_01: 'Chapter',
  NOTE_META_TAG_02: 'Page',
  NOTE_META_TAG_03: 'Unable to load the page because it has been deleted.',
  NOTE_META_TAG_04: 'Unable to load the chapter because it has been deleted.',
  NOTE_SAVE_PAGE: 'Page saved.',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_09: 'Pages forwarded will be permanently deleted.',
  NOTE_NOTICENTER_01: 'The chapter has been shared.',
  NOTE_NOTICENTER_02: 'The page has been shared.',
  NOTE_NOTICENTER_03: "{{title}} has been created."
};

var resources = {
  ko: {
    translation: languageSet
  },
  en: {
    translation: languageSet$1
  }
};
var i18n = i18next__default['default'].createInstance();
i18n.use(reactI18next.initReactI18next).init({
  debug: true,
  resources: resources,
  lng: 'ko',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});

var NoteUtil = {
  // 인코딩 대상 : 알파벳, 0~9의 숫자, -_.!~*' 제외하고 이스케이프 처리(아스키 문자셋으로 변경)
  // encodeURI : 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주한다.
  // 따라서 쿼리스트링 구분자로 사용되는 =,?,&은 인코딩하지 않는다
  // encodeURIComponent는 위 세 개까지 인코딩한다(쿼리스트링의 일부로 간주하여)
  encodeStr: function encodeStr(str) {
    return encodeURIComponent(this.decodeStr(str));
  },
  decodeStr: function decodeStr(str) {
    var pre = str,
        cur;

    try {
      while (true) {
        cur = decodeURIComponent(pre.replace(/%(?![0-9a-fA-F]+)/g, '%25'));
        if (cur === pre) return cur;
        pre = cur;
      }
    } catch (e) {
      // 노트 내용 중에 url이나 mail이 있으면 URI malformed error가 발생한다.
      // 이때 decode가 완료된것으로 보이므로 그대로 return한다
      return pre.replace(/%(?![0-9a-fA-F]+)/g, '%25');
    }
  },
  // encoding해서 일치 비교
  isSameStr: function isSameStr(str1, str2) {
    return this.encodeStr(str1) === this.encodeStr(str2);
  },
  getChapterNumType: function getChapterNumType(type) {
    switch (type) {
      case CHAPTER_TYPE.DEFAULT:
        return 0;

      case CHAPTER_TYPE.NOTEBOOK:
        return 1;

      case CHAPTER_TYPE.SHARED_PAGE:
        return 2;

      case CHAPTER_TYPE.SHARED:
        return 3;

      case CHAPTER_TYPE.RECYCLE_BIN:
        return 4;

      default:
        return null;
    }
  },
  // storage에서 주는 "2021-02-18 15:01:28.0 Asia/Seoul" 형식을 unixTime으로
  getUnixTime: function getUnixTime() {
    var inputTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _inputTime$split = inputTime.split(' '),
        _inputTime$split2 = _slicedToArray(_inputTime$split, 3),
        _inputTime$split2$ = _inputTime$split2[0],
        date = _inputTime$split2$ === void 0 ? null : _inputTime$split2$,
        _inputTime$split2$2 = _inputTime$split2[1],
        time = _inputTime$split2$2 === void 0 ? null : _inputTime$split2$2,
        _inputTime$split2$3 = _inputTime$split2[2],
        zone = _inputTime$split2$3 === void 0 ? null : _inputTime$split2$3;

    if ([date, time, zone].includes(null)) return null;
    return moment__default['default'].tz(date + ' ' + time, zone).unix();
  },
  replacer: function replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: _toConsumableArray(value) //Array.from(value.entries()).. iterator 객체

      };
    } else return value;
  },
  reviver: function reviver(key, value) {
    if (_typeof(value) === 'object' && value !== null && value.dataType === 'Map') return new Map(value.value);
    return value;
  },
  setLocalChapterFoldedState: function setLocalChapterFoldedState(_ref) {
    var channelId = _ref.channelId,
        chapterId = _ref.chapterId,
        isFolded = _ref.isFolded,
        isTheRest = _ref.isTheRest;

    if (isTheRest) {
      // default, notebook 아닌 것
      this.setLocalRestFoldedState({
        channelId: channelId,
        chapterId: chapterId,
        isFolded: isFolded
      });
      return;
    }

    var item = localStorage.getItem("NoteSortData_".concat(channelId));
    if (!item) return;
    item = JSON.parse(item);
    var idx = item.findIndex(function (chapter) {
      return chapter.id === chapterId;
    });
    if (idx === -1) return;
    item[idx]['isFolded'] = isFolded;
    localStorage.setItem("NoteSortData_".concat(channelId), JSON.stringify(item));
  },
  // shared, recylce_bin의 folded state
  setLocalRestFoldedState: function setLocalRestFoldedState(_ref2) {
    var channelId = _ref2.channelId,
        chapterId = _ref2.chapterId,
        isFolded = _ref2.isFolded;
    var item = localStorage.getItem("Note_sharedFoldedState_".concat(channelId));
    if (!item) return;
    item = JSON.parse(item, NoteUtil.reviver);
    item.set(chapterId, isFolded);
    localStorage.setItem("Note_sharedFoldedState_".concat(channelId), JSON.stringify(item, NoteUtil.replacer));
  },
  isEmpty: function isEmpty(arr) {
    return (arr === null || arr === void 0 ? void 0 : arr.length) === 0 ? true : false;
  }
};
/**
 * 날짜를 같은 연월일을 생략한 12시간 형식으로 변환한다.
 * NOTE: showAllDates가 true인 경우에는 같은 연월일이라도 생략하지 않는다.
 * @param {string} date yyyy.mm.dd hh:mm:ss
 * @param {boolean} showsAllDates 연월일 표시 여부
 * @returns 12시간 형식의 날짜
 */

var get12HourFormat = function get12HourFormat(date) {
  var showsAllDates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!date) return '';

  var _date$split = date.split(' '),
      _date$split2 = _slicedToArray(_date$split, 2),
      mDate = _date$split2[0],
      mTime = _date$split2[1];

  var mYear = parseInt(mDate.split('.')[0], 10);
  var mMonth = parseInt(mDate.split('.')[1], 10);
  var mDay = parseInt(mDate.split('.')[2], 10);
  var mHour = parseInt(mTime.split(':')[0], 10);
  var mMinute = parseInt(mTime.split(':')[1], 10);
  var curDate = new Date();

  var convertTwoDigit = function convertTwoDigit(digit) {
    return "0".concat(digit).slice(-2);
  };

  if (isNaN(mMonth)) {
    // for spring
    mYear = parseInt(mDate.split('-')[0], 10);
    mMonth = parseInt(mDate.split('-')[1], 10);
    mDay = parseInt(mDate.split('-')[2], 10);
  }

  var hhmm = "".concat(convertTwoDigit(mHour > 12 ? mHour - 12 : mHour === 0 ? 12 : mHour), ":").concat(convertTwoDigit(mMinute));
  var basicDate = mHour < 12 ? i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_01', {
    time: hhmm
  }) : i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_02', {
    time: hhmm
  });

  if (mYear === curDate.getFullYear() && !showsAllDates) {
    if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate()) return basicDate;
    return "".concat(convertTwoDigit(mMonth), ".").concat(convertTwoDigit(mDay), " ").concat(basicDate);
  }

  return "".concat(mYear, ".").concat(convertTwoDigit(mMonth), ".").concat(convertTwoDigit(mDay), " ").concat(basicDate);
};
var getUserDisplayName = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var userProfile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (userId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", '');

          case 2:
            _context.next = 4;
            return teespaceCore.UserStore.getProfile(userId);

          case 4:
            userProfile = _context.sent;
            return _context.abrupt("return", userProfile !== null && userProfile !== void 0 && userProfile.isWithdrawn ? i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01') : userProfile === null || userProfile === void 0 ? void 0 : userProfile.displayName);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUserDisplayName(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var PageModel = /*#__PURE__*/function () {
  function PageModel(data) {
    _classCallCheck(this, PageModel);

    this._data = data;
  }

  _createClass(PageModel, [{
    key: "id",
    get: function get() {
      return this._data.note_id;
    }
  }, {
    key: "chapterId",
    get: function get() {
      return this._data.parent_notebook;
    }
  }, {
    key: "content",
    get: function get() {
      return this._data.note_content;
    }
  }, {
    key: "editingUserId",
    get: function get() {
      return this._data.is_edit;
    }
  }, {
    key: "modDate",
    get: function get() {
      return get12HourFormat(this._data.modified_date);
    }
  }, {
    key: "modUserName",
    get: function get() {
      return this._data.modUserName;
    }
  }]);

  return PageModel;
}();

/* eslint-disable no-underscore-dangle */
var ChapterModel = /*#__PURE__*/function () {
  function ChapterModel(data) {
    _classCallCheck(this, ChapterModel);

    this._data = data;
  }

  _createClass(ChapterModel, [{
    key: "id",
    get: function get() {
      return this._data.id;
    }
  }, {
    key: "pageList",
    get: function get() {
      return this._data.children;
    }
  }, {
    key: "title",
    get: function get() {
      return this._data.text;
    }
  }, {
    key: "type",
    get: function get() {
      return this._data.type;
    }
  }, {
    key: "color",
    get: function get() {
      return this._data.color;
    }
  }]);

  return ChapterModel;
}();

// isNil : Checks if the input value is null or undefined.
// isEmpty : Returns true if the given value is its type's empty value; false otherwise.

var isFilled = function isFilled(value) {
  return !ramda.isNil(value) && !ramda.isEmpty(value) ? true : false;
};
// chapter 생성

var checkNotDuplicate = function checkNotDuplicate(targetArr, key, value) {
  return targetArr.find(function (item) {
    return NoteUtil.encodeStr(item[key]) === NoteUtil.encodeStr(value);
  }) ? false : true;
}; // true : valid(중복X), false : invalid(중복)
// 태그 생성 : 대소문자 구분 없이 동일 text 처리

var checkDuplicateIgnoreCase = function checkDuplicateIgnoreCase(targetArr, key, value) {
  return targetArr.find(function (item) {
    return NoteUtil.encodeStr(item[key].toUpperCase()) === NoteUtil.encodeStr(value.toUpperCase());
  }) ? false : true;
};

var ChapterStore = mobx.observable({
  chapterInfo: new ChapterModel({}),
  loadingPageInfo: false,
  // 2panel(pageContainer용)
  chapterList: [],
  currentChapterId: '',
  chapterNewTitle: '',
  isNewChapterColor: '',
  isNewChapter: false,
  colorArray: {
    1: '#C84847',
    2: '#F29274',
    3: '#F6C750',
    4: '#77B69B',
    5: '#679886',
    6: '#3A7973',
    7: '#77BED3',
    8: '#5C83DA',
    9: '#8F91E7',
    10: '#DF97AA',
    11: '#CA6D6D'
  },
  // 검색 실행 화면 필요
  isLoadingSearchResult: false,
  isSearching: false,
  isTagSearching: false,
  //tag chip 클릭해서 tag chip 띄울 때 씀
  searchingTagName: '',
  searchStr: '',
  // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요
  searchResult: {},
  // {chapter:[], page:[]} 형태
  renameId: '',
  dragData: new Map(),
  isCtrlKeyDown: false,
  dragEnterChapterIdx: '',
  chapterMap: new Map(),
  pageMap: new Map(),
  chapterChildren: [],
  exportChapterTitle: '',
  sharedCnt: 0,
  scrollIntoViewId: '',
  chapterName: '',
  selectedChapters: new Map(),
  chapterType: '',
  getLoadingPageInfo: function getLoadingPageInfo() {
    return this.loadingPageInfo;
  },
  setLoadingPageInfo: function setLoadingPageInfo(isLoading) {
    this.loadingPageInfo = isLoading;
  },
  getCurrentChapterId: function getCurrentChapterId() {
    return this.currentChapterId;
  },
  setCurrentChapterId: function setCurrentChapterId(chapterId) {
    this.currentChapterId = chapterId;
  },
  getRenameId: function getRenameId() {
    return this.renameId;
  },
  setRenameId: function setRenameId(chapterId) {
    this.renameId = chapterId;
  },
  getIsMovingChapter: function getIsMovingChapter() {
    return this.isMovingChapter;
  },
  setIsMovingChapter: function setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  getDragData: function getDragData() {
    return this.dragData;
  },
  setDragData: function setDragData(dragData) {
    this.dragData = dragData;
  },
  appendDragData: function appendDragData(key, value) {
    this.dragData.set(key, value);
  },
  deleteDragData: function deleteDragData(key) {
    this.dragData.delete(key);
  },
  clearDragData: function clearDragData() {
    this.dragData.clear();
  },
  setIsCtrlKeyDown: function setIsCtrlKeyDown(flag) {
    this.isCtrlKeyDown = flag;
  },
  getDragEnterChapterIdx: function getDragEnterChapterIdx() {
    return this.dragEnterChapterIdx;
  },
  setDragEnterChapterIdx: function setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },
  setChapterListChildren: function setChapterListChildren(chapterId) {
    this.chapterChildren = this.chapterList.filter(function (chapter) {
      return chapter.id === chapterId;
    })[0].children;
  },
  setChapterTempUl: function setChapterTempUl(flag) {
    this.isNewChapter = flag;
    if (flag === false) this.setChapterTitle('');
  },
  setChapterTitle: function setChapterTitle(title) {
    this.chapterNewTitle = title;
  },
  setChapterName: function setChapterName(title) {
    this.chapterName = title;
  },
  getChapterId: function getChapterId(e) {
    var id = e.target.id;
    return id;
  },
  setChapterType: function setChapterType(type) {
    this.chapterType = type;
  },
  getChapterRandomColor: function getChapterRandomColor() {
    var COLOR_ARRAY = Object.values(this.colorArray);
    this.isNewChapterColor = COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
    return this.isNewChapterColor;
  },
  getChapterColor: function getChapterColor(chapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$NoteRepository, dto;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return NoteRepository$1.getChapterColor(chapterId);

            case 2:
              _yield$NoteRepository = _context.sent;
              dto = _yield$NoteRepository.data.dto;
              return _context.abrupt("return", dto.color);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getChapterName: function getChapterName(chapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$NoteRepository2, dto;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return NoteRepository$1.getChapterText(chapterId);

            case 2:
              _yield$NoteRepository2 = _context2.sent;
              dto = _yield$NoteRepository2.data.dto;
              return _context2.abrupt("return", dto.text);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  getIsLoadingSearchResult: function getIsLoadingSearchResult() {
    return this.isLoadingSearching;
  },
  setIsLoadingSearchResult: function setIsLoadingSearchResult(isLoadingSearchResult) {
    this.isLoadingSearchResult = isLoadingSearchResult;
  },
  getIsSearching: function getIsSearching() {
    return this.isSearching;
  },
  setIsSearching: function setIsSearching(isSearching) {
    this.isSearching = isSearching;
  },
  getSearchStr: function getSearchStr() {
    return this.searchStr;
  },
  setSearchStr: function setSearchStr(str) {
    this.searchStr = str;
  },
  // 태그칩 선택시 사용 목적 : 해당 태그가 들어있는 페이지 리스트 보여주기
  // tagStore에서 setSearchResult({chapter:[],page:[page1,page2..]})
  setSearchResult: function setSearchResult(result) {
    this.searchResult = result;
  },
  // 태그칩 클릭해서 lnblist 띄우기
  getSearchingTagName: function getSearchingTagName() {
    return this.searchingTagName;
  },
  setSearchingTagName: function setSearchingTagName(str) {
    this.searchingTagName = str;
  },
  getIsTagSearching: function getIsTagSearching() {
    return this.isTagSearching;
  },
  setIsTagSearching: function setIsTagSearching(isSearching) {
    this.isTagSearching = isSearching;
  },
  isValidChapterText: function isValidChapterText(targetText) {
    return checkNotDuplicate(this.chapterList, 'text', targetText);
  },
  setExportTitle: function setExportTitle(chapterTitle) {
    this.exportChapterTitle = chapterTitle;
  },
  changePageList: function changePageList(chapterIdx, pageList) {
    this.chapterList[chapterIdx].children = pageList;
  },
  setScrollIntoViewId: function setScrollIntoViewId(chapterId) {
    this.scrollIntoViewId = chapterId;
  },

  /**
   *  ChapterStore Method : getChapterList, createChapter, deleteChapter, renameChapter
   */
  getChapterList: function getChapterList() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$NoteRepository3, notbookList;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.getChapterList(NoteStore.getChannelId());

            case 2:
              _yield$NoteRepository3 = _context3.sent;
              notbookList = _yield$NoteRepository3.data.dto.notbookList;

              _this.setChapterList(notbookList);

              return _context3.abrupt("return", notbookList);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  setChapterList: function setChapterList(chapterList) {
    this.chapterList = chapterList;
  },
  createChapter: function createChapter(chapterTitle, chapterColor) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$NoteRepository4, dto;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return NoteRepository$1.createChapter(chapterTitle, chapterColor);

            case 2:
              _yield$NoteRepository4 = _context4.sent;
              dto = _yield$NoteRepository4.dto;
              return _context4.abrupt("return", dto);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // 휴지통에 있는 페이지 복구할 때 페이지 없는 챕터 생성용
  createRestoreChapter: function createRestoreChapter(chapterTitle, chapterColor) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _yield$NoteRepository5, dto;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return NoteRepository$1.createRestoreChapter(chapterTitle, chapterColor);

            case 2:
              _yield$NoteRepository5 = _context5.sent;
              dto = _yield$NoteRepository5.dto;
              return _context5.abrupt("return", dto);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  deleteChapter: function deleteChapter(chapterList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var _yield$NoteRepository6, dto;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return NoteRepository$1.deleteChapter(chapterList);

            case 2:
              _yield$NoteRepository6 = _context6.sent;
              dto = _yield$NoteRepository6.dto;
              return _context6.abrupt("return", dto);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  renameChapter: function renameChapter(id, title, color) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _yield$NoteRepository7, dto;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return NoteRepository$1.renameChapter(id, title, color);

            case 2:
              _yield$NoteRepository7 = _context7.sent;
              dto = _yield$NoteRepository7.dto;
              return _context7.abrupt("return", dto);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  updateChapterColor: function updateChapterColor(chapterId) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var targetColor, _yield$NoteRepository8, dto;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              targetColor = _this2.getChapterRandomColor();
              _context8.next = 3;
              return NoteRepository$1.updateChapterColor(chapterId, targetColor);

            case 3:
              _yield$NoteRepository8 = _context8.sent;
              dto = _yield$NoteRepository8.dto;
              return _context8.abrupt("return", dto);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  getChapterChildren: function getChapterChildren(chapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var _yield$NoteRepository9, dto;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return NoteRepository$1.getChapterChildren(chapterId);

            case 2:
              _yield$NoteRepository9 = _context9.sent;
              dto = _yield$NoteRepository9.data.dto;
              return _context9.abrupt("return", dto);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  getChapterInfoList: function getChapterInfoList(chapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var _yield$NoteRepository10, dto;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return NoteRepository$1.getChapterInfoList(chapterId);

            case 2:
              _yield$NoteRepository10 = _context10.sent;
              dto = _yield$NoteRepository10.data.dto;
              return _context10.abrupt("return", dto !== undefined ? dto : {
                id: ''
              });

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  getSearchList: function getSearchList(searchStr) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var _yield$NoteRepository11, dto;

      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return NoteRepository$1.getSearchList(searchStr || _this3.searchStr);

            case 2:
              _yield$NoteRepository11 = _context11.sent;
              dto = _yield$NoteRepository11.data.dto;
              return _context11.abrupt("return", dto);

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },

  /**
   * ChapterStore Business Logic in NoteApp
   */
  // normalChapters = type이 defualt, notebook인 chapter
  createMap: function createMap(normalChapters) {
    var _this4 = this;

    // chapterMap: {key: chapterId, value: chapterIndex on server}
    // pageMap: {key: pageId, value: {parent: chapterId, idx: pageIndex on server}}
    this.chapterMap.clear();
    this.pageMap.clear();
    normalChapters.forEach(function (chapter, i) {
      _this4.chapterMap.set(chapter.id, i);

      chapter.children.forEach(function (page, j) {
        _this4.pageMap.set(page.id, {
          parent: chapter.id,
          idx: j
        });
      });
    });
  },
  setLocalStorageItem: function setLocalStorageItem(targetChannelId, normalChapters) {
    // normalChapters: includes only [chapterType: notebook, default]
    var newChapters = normalChapters.map(function (chapter) {
      chapter.isFolded = false;
      return {
        id: chapter.id,
        children: chapter.children.slice().reverse().map(function (page) {
          return page.id;
        }),
        isFolded: false
      };
    });
    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(newChapters));
  },
  // notebookList의 chapter.type은 default, notebook만 있음
  applyDifference: function applyDifference(targetChannelId, normalChapters) {
    var _this5 = this;

    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId)); // 로컬 스토리지에 없는 챕터/페이지가 있는지 확인한다. (생성된 챕터/페이지 확인)

    var createdChapterIds = [];
    var chapterIdxMap = item.reduce(function (m, chapter, idx) {
      return m.set(chapter.id, idx);
    }, new Map());
    normalChapters.forEach(function (chapter) {
      if (!chapterIdxMap.has(chapter.id)) {
        createdChapterIds.push({
          id: chapter.id,
          children: chapter.children.map(function (page) {
            return page.id;
          }),
          isFolded: false
        });
      } else {
        var createdPageIds = [];
        var chapterIdx = chapterIdxMap.get(chapter.id);
        chapter.children.slice().reverse().forEach(function (page) {
          if (!item[chapterIdx].children.includes(page.id)) {
            createdPageIds.push(page.id);
          }
        });
        item[chapterIdx].children = item[chapterIdx].children.concat(createdPageIds);
      }
    });
    item = createdChapterIds.concat(item); // 서버에 없는 챕터/페이지가 있는지 확인한다. (삭제된 챕터/페이지 확인)

    item.slice().forEach(function (chapter) {
      chapterIdxMap = item.reduce(function (m, chapter, idx) {
        return m.set(chapter.id, idx);
      }, new Map());

      if (_this5.chapterMap.get(chapter.id) === undefined) {
        item.splice(chapterIdxMap.get(chapter.id), 1);
      } else {
        chapter.children.slice().forEach(function (pageId) {
          var pageIds = chapter.children;

          if (_this5.pageMap.get(pageId) === undefined || _this5.pageMap.get(pageId).parent !== chapter.id) {
            chapter.children.splice(pageIds.indexOf(pageId), 1);
          }
        });
      }
    });
    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
  },
  getLocalOrderChapterList: function getLocalOrderChapterList(targetChannelId, normalChapters) {
    var _this6 = this;

    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));
    return item.map(function (chapter) {
      var chapterIdx = _this6.chapterMap.get(chapter.id);

      return _objectSpread2(_objectSpread2({}, normalChapters[chapterIdx]), {}, {
        children: chapter.children.map(function (pageId) {
          return normalChapters[chapterIdx].children[_this6.pageMap.get(pageId).idx];
        }),
        isFolded: chapter.isFolded ? chapter.isFolded : false
      });
    });
  },
  getLocalOrderPageList: function getLocalOrderPageList(targetChannelId, chapterId, pageList) {
    var _this7 = this;

    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));
    var chapterIdx = this.chapterMap.get(chapterId);
    return item[chapterIdx].children.map(function (pageId) {
      return pageList[_this7.pageMap.get(pageId).idx];
    });
  },
  checkDefaultChapterColor: function checkDefaultChapterColor(notebookList) {
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var _yield$_this8$updateC, color;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!(notebookList.length === 0)) {
                _context12.next = 2;
                break;
              }

              return _context12.abrupt("return", notebookList);

            case 2:
              if (!(notebookList[0].color === null && notebookList[0].id)) {
                _context12.next = 8;
                break;
              }

              _context12.next = 5;
              return _this8.updateChapterColor(notebookList[0].id);

            case 5:
              _yield$_this8$updateC = _context12.sent;
              color = _yield$_this8$updateC.color;
              notebookList[0].color = color;

            case 8:
              return _context12.abrupt("return", notebookList);

            case 9:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  // type : defalut, notebook, shared_page, shared
  // default chapterColor도 null이면 update 해준다
  sortServerChapterList: function sortServerChapterList(notebookList) {
    var _this9 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var normalChapters, sharedChapters, getChapterNumType, firstSharedIdx;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              normalChapters = [], sharedChapters = [];

              if (!(notebookList.length === 0)) {
                _context13.next = 3;
                break;
              }

              return _context13.abrupt("return", {
                normalChapters: normalChapters,
                sharedChapters: sharedChapters
              });

            case 3:
              getChapterNumType = NoteUtil.getChapterNumType; // type : defalut(0), notebook(1), shared_page, shared, recycle_bin 순으로 sort된다

              notebookList.sort(function (a, b) {
                return getChapterNumType(a.type) - getChapterNumType(b.type);
              });
              _context13.next = 7;
              return _this9.checkDefaultChapterColor(notebookList);

            case 7:
              notebookList = _context13.sent;
              firstSharedIdx = notebookList.findIndex(function (chapter) {
                return [CHAPTER_TYPE.SHARED_PAGE, CHAPTER_TYPE.SHARED, CHAPTER_TYPE.RECYCLE_BIN].includes(chapter.type);
              });
              _context13.t0 = firstSharedIdx;
              _context13.next = _context13.t0 === 0 ? 12 : _context13.t0 === -1 ? 14 : 16;
              break;

            case 12:
              // 전달만 있는 경우
              sharedChapters = notebookList.slice(0);
              return _context13.abrupt("break", 19);

            case 14:
              // 전달 챕터/페이지, 휴지통 없는 경우
              normalChapters = notebookList.slice(0);
              return _context13.abrupt("break", 19);

            case 16:
              // 전달인거, 아닌거 다 있는 경우
              normalChapters = notebookList.slice(0, firstSharedIdx);
              sharedChapters = notebookList.slice(firstSharedIdx);
              return _context13.abrupt("break", 19);

            case 19:
              return _context13.abrupt("return", {
                normalChapters: normalChapters,
                sharedChapters: sharedChapters
              });

            case 20:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  getNoteChapterList: function getNoteChapterList() {
    var _arguments = arguments,
        _this10 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var isInit, _yield$NoteRepository12, notbookList, _yield$_this10$sortSe, normalChapters, sharedChapters;

      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              isInit = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
              _context14.next = 3;
              return NoteRepository$1.getChapterList(NoteStore.getChannelId());

            case 3:
              _yield$NoteRepository12 = _context14.sent;
              notbookList = _yield$NoteRepository12.data.dto.notbookList;
              _context14.next = 7;
              return _this10.sortServerChapterList(notbookList);

            case 7:
              _yield$_this10$sortSe = _context14.sent;
              normalChapters = _yield$_this10$sortSe.normalChapters;
              sharedChapters = _yield$_this10$sortSe.sharedChapters;

              _this10.createMap(normalChapters);

              _this10.sharedCnt = sharedChapters.length;

              if (localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
                _context14.next = 17;
                break;
              }

              // 비순수함수... normalChapter에 변경이 일어남(isFolded: false 추가)
              _this10.setLocalStorageItem(NoteStore.getChannelId(), normalChapters);

              return _context14.abrupt("return", _this10.getNoteChapterList(true));

            case 17:
              _this10.applyDifference(NoteStore.getChannelId(), normalChapters); // isFolded state 추가


              normalChapters = _this10.getLocalOrderChapterList(NoteStore.getChannelId(), normalChapters);

            case 19:
              // sharedChapters = shared, recylce_bin
              sharedChapters = _this10.getTheRestFoldedState(isInit, sharedChapters);

              _this10.setChapterList(normalChapters.concat(sharedChapters));

              return _context14.abrupt("return", _this10.chapterList);

            case 22:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }))();
  },
  getTheRestFoldedState: function getTheRestFoldedState(isInit, sharedChapters) {
    if (sharedChapters.length === 0) return sharedChapters;
    var item = localStorage.getItem("Note_sharedFoldedState_".concat(NoteStore.notechannel_id));
    var newFoldedMap = new Map();

    if (!item) {
      // sharedChapters의 foldedState는 false로
      sharedChapters.forEach(function (chapter) {
        newFoldedMap.set(chapter.id, false);
        chapter.isFolded = false;
      });
    } else {
      item = JSON.parse(item, NoteUtil.reviver);
      sharedChapters.forEach(function (chapter) {
        var value = item.get(chapter.id) ? item.get(chapter.id) : false;
        if (isInit && chapter.type === CHAPTER_TYPE.RECYCLE_BIN) value = true;
        newFoldedMap.set(chapter.id, value);
        chapter.isFolded = value;
      });
    }

    localStorage.setItem("Note_sharedFoldedState_".concat(NoteStore.notechannel_id), JSON.stringify(newFoldedMap, NoteUtil.replacer));
    return sharedChapters;
  },
  createNoteChapter: function createNoteChapter() {
    var _arguments2 = arguments,
        _this11 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var _PageStore$pageInfo;

      var title, _yield$_this11$create, children, id;

      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              title = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : _this11.chapterNewTitle.trim();
              _context15.next = 3;
              return _this11.createChapter(title || i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_01'), _this11.isNewChapterColor);

            case 3:
              _yield$_this11$create = _context15.sent;
              children = _yield$_this11$create.children;
              id = _yield$_this11$create.id;
              _context15.next = 8;
              return _this11.getNoteChapterList();

            case 8:
              _this11.setChapterTempUl(false);

              _context15.next = 11;
              return PageStore.fetchCurrentPageData(children[0].id);

            case 11:
              return _context15.abrupt("return", {
                chapterId: id,
                pageId: (_PageStore$pageInfo = PageStore.pageInfo) === null || _PageStore$pageInfo === void 0 ? void 0 : _PageStore$pageInfo.id
              });

            case 12:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }))();
  },
  deleteNoteChapter: function deleteNoteChapter(_ref) {
    var _this12 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
      var chapterList, selectablePageId, isDnd, _this12$chapterList$, _this12$chapterList$2, _this12$chapterList$3, pageId;

      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              chapterList = _ref.chapterList, selectablePageId = _ref.selectablePageId, isDnd = _ref.isDnd;
              _context16.next = 3;
              return _this12.deleteChapter(chapterList);

            case 3:
              _context16.next = 5;
              return _this12.getNoteChapterList();

            case 5:
              if (!chapterList.find(function (chapter) {
                return chapter.id === _this12.currentChapterId;
              })) {
                _context16.next = 11;
                break;
              }

              pageId = isDnd || ((_this12$chapterList$ = _this12.chapterList[0]) === null || _this12$chapterList$ === void 0 ? void 0 : _this12$chapterList$.type) === CHAPTER_TYPE.RECYCLE_BIN ? (_this12$chapterList$2 = _this12.chapterList[0]) === null || _this12$chapterList$2 === void 0 ? void 0 : (_this12$chapterList$3 = _this12$chapterList$2.children[0]) === null || _this12$chapterList$3 === void 0 ? void 0 : _this12$chapterList$3.id : selectablePageId;
              _context16.next = 9;
              return PageStore.fetchCurrentPageData(pageId);

            case 9:
              ChapterStore.setIsCtrlKeyDown(false);

              _this12.setIsCtrlKeyDown(false);

            case 11:
              NoteStore.setIsDragging(false);
              NoteStore.setShowModal(false);
              NoteStore.setToastText(i18n.t('NOTE_BIN_04'));
              NoteStore.setIsVisibleToast(true); // 위에는 좀 더 보고 분리

              return _context16.abrupt("return", {
                chapterId: _this12.currentChapterId,
                pageId: PageStore.currentPageId
              });

            case 16:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  },
  renameNoteChapter: function renameNoteChapter(_ref2) {
    var _this13 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      var id, title, color, _yield$_this13$rename, text;

      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              id = _ref2.id, title = _ref2.title, color = _ref2.color;
              _context17.next = 3;
              return _this13.renameChapter(id, title.trim(), color);

            case 3:
              _yield$_this13$rename = _context17.sent;
              text = _yield$_this13$rename.text;
              if (_this13.dragData.get(id)) _this13.dragData.get(id).item.text = text;
              _context17.next = 8;
              return _this13.getNoteChapterList();

            case 8:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }))();
  },
  createDragData: function createDragData(chapterId) {
    var chapterIdx = this.chapterList.findIndex(function (chapter) {
      return chapter.id === chapterId;
    });
    if (chapterIdx < 0) return;
    return {
      item: this.chapterList[chapterIdx],
      chapterIdx: chapterIdx
    };
  },
  getSortedDragDataList: function getSortedDragDataList() {
    var dragDataList = _toConsumableArray(this.dragData).map(function (keyValue) {
      return keyValue[1];
    });

    return dragDataList.sort(function (a, b) {
      return a.chapterIdx - b.chapterIdx;
    });
  },
  moveChapter: function moveChapter() {
    var _this14 = this;

    var item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
    var sortedDragDataList = this.getSortedDragDataList();
    var sortedMoveChapters = sortedDragDataList.map(function (data) {
      return item[data.chapterIdx];
    });
    var chapters = [];
    item.forEach(function (chapter, idx) {
      if (idx === _this14.dragEnterChapterIdx) chapters.push.apply(chapters, _toConsumableArray(sortedMoveChapters));
      if (!_this14.dragData.get(chapter.id)) chapters.push(chapter);
    });
    if (this.dragEnterChapterIdx >= chapters.length) chapters.push.apply(chapters, _toConsumableArray(sortedMoveChapters));
    var moveCnt = 0;
    var startIdx = chapters.findIndex(function (chapter) {
      return chapter.id === sortedDragDataList[0].item.id;
    });
    sortedDragDataList.forEach(function (data, idx) {
      if (data.chapterIdx !== startIdx + idx) moveCnt++;

      _this14.dragData.set(data.item.id, {
        item: data.item,
        chapterIdx: startIdx + idx
      });
    });

    if (moveCnt > 0) {
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(chapters));
      this.getNoteChapterList().then(function () {
        _this14.currentChapterId = sortedMoveChapters[0].id;
        PageStore.currentPageId = sortedMoveChapters[0].children[0];
        NoteStore.setIsDragging(false);
        if (!PageStore.currentPageId) PageStore.clearDragData();else PageStore.setDragData(new Map([[PageStore.currentPageId, PageStore.createDragData(PageStore.currentPageId, _this14.currentChapterId)]]));
        PageStore.fetchCurrentPageData(sortedMoveChapters[0].children[0]).then(function () {
          NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_02', {
            moveCnt: moveCnt
          }));
          NoteStore.setIsVisibleToast(true);
        });
      });
    } else {
      NoteStore.handleClickOutside('Chapter');
      NoteStore.setIsDragging(false);
    }
  },
  fetchChapterInfo: function fetchChapterInfo(id) {
    var _this15 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var dto;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return _this15.getChapterInfoList(id);

            case 2:
              dto = _context18.sent;
              _this15.chapterInfo = new ChapterModel(dto);
              return _context18.abrupt("return", _this15.chapterInfo);

            case 5:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }))();
  },

  /* 
    - search 관련
    - 방 바꼈을 때 변수 init 필요
    - 검색 후 방 바뀌었을 때 변수 init이 안됨
  */
  initSearchVar: function initSearchVar() {
    this.setIsLoadingSearchResult(false);
    this.setIsSearching(false);
    this.setIsTagSearching(false);
    this.setSearchResult({});
    this.setSearchStr('');
  },
  getChapterFirstPage: function getChapterFirstPage(targetId) {
    var _this16 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _this16.getChapterList().then(function (chapterList) {
                var targetChapter = chapterList.filter(function (chapter) {
                  return chapter.id === targetId;
                })[0];

                if (targetChapter.children.length > 0) {
                  PageStore.setCurrentPageId(targetChapter.children[0].id);
                  PageStore.fetchCurrentPageData(targetChapter.children[0].id);
                } else PageStore.fetchCurrentPageData('');
              });

            case 1:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }))();
  },
  getSearchResult: function getSearchResult() {
    var _arguments3 = arguments,
        _this17 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
      var _dto$chapterList, _dto$pageList;

      var keyword, chapterId, dto, filtered;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              keyword = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : _this17.searchStr.trim();
              chapterId = _arguments3.length > 1 ? _arguments3[1] : undefined;

              _this17.setIsSearching(true);

              _this17.setIsLoadingSearchResult(true);

              _context20.next = 6;
              return _this17.getSearchList(keyword);

            case 6:
              dto = _context20.sent;
              filtered = (_dto$chapterList = dto.chapterList) === null || _dto$chapterList === void 0 ? void 0 : _dto$chapterList.filter(function (chapter) {
                return chapter.type !== CHAPTER_TYPE.RECYCLE_BIN;
              });
              _this17.searchResult = {
                keyword: keyword,
                chapter: (filtered === null || filtered === void 0 ? void 0 : filtered.length) > 0 ? filtered : null,
                page: _this17.preProcessPageList(chapterId ? (_dto$pageList = dto.pageList) === null || _dto$pageList === void 0 ? void 0 : _dto$pageList.filter(function (page) {
                  return page.parent_notebook === chapterId;
                }) : dto.pageList, keyword),
                tag: dto.tagList
              };

              _this17.setIsLoadingSearchResult(false);

              return _context20.abrupt("return", _this17.searchResult);

            case 11:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }))();
  },
  preProcessPageList: function preProcessPageList(pageList, keyword) {
    var _this18 = this;

    if (pageList) {
      pageList.forEach(function (page) {
        if (page.text_content.includes(keyword)) page.contentPreview = _this18.getContentPreview(page.text_content, keyword);
      });
    }

    return pageList !== null && pageList !== void 0 && pageList.length ? pageList : null;
  },
  getContentPreview: function getContentPreview(content, keyword) {
    var result = content.substring(content.indexOf(keyword) - 10);
    return content.length === result.length ? result : "...".concat(result);
  },
  createShareChapter: function createShareChapter(targetList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
      var _yield$NoteRepository13, dto;

      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return NoteRepository$1.createShareChapter(targetList);

            case 2:
              _yield$NoteRepository13 = _context21.sent;
              dto = _yield$NoteRepository13.data.dto;
              return _context21.abrupt("return", dto);

            case 5:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }))();
  },
  createNoteShareChapter: function createNoteShareChapter(targetRoomId, targetChapterList) {
    var _this19 = this;

    if (!targetChapterList) return;
    var targetChId = NoteStore.getTargetChId(targetRoomId);
    var targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');
    var targetList = targetChapterList.map(function (chapter) {
      return {
        id: chapter.id,
        ws_id: NoteRepository$1.WS_ID,
        note_channel_id: NoteRepository$1.chId,
        text: chapter.text,
        color: chapter.color,
        type: chapter.type === CHAPTER_TYPE.SHARED_PAGE || chapter.type === CHAPTER_TYPE.SHARED ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
        USER_ID: NoteRepository$1.USER_ID,
        shared_user_id: NoteRepository$1.USER_ID,
        shared_room_name: NoteRepository$1.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
        messenger_id: targetTalkChId
      };
    });
    this.createShareChapter(targetList).then(function () {
      _this19.getNoteChapterList();

      NoteStore.setIsDragging(false);
    });
  },
  setFirstDragData: function setFirstDragData(targetChapter) {
    this.setDragData(new Map([[targetChapter.id, {
      item: targetChapter,
      chapterIdx: 0
    }]]));

    if (targetChapter.children.length > 0) {
      var targetPage = targetChapter.children[0];
      PageStore.setDragData(new Map([[targetPage.id, {
        item: targetPage,
        pageIdx: 0,
        chapterId: targetChapter.id,
        chapterIdx: 0
      }]]));
    }
  },
  setFirstNoteInfo: function setFirstNoteInfo() {
    var _this20 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
      var targetChapter, pageId;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              targetChapter = _this20.chapterList.length > 0 ? _this20.chapterList[0] : null;

              if (targetChapter) {
                _context22.next = 5;
                break;
              }

              _this20.setCurrentChapterInfo('', false); //chapterId='', isRecycleBin=false


              PageStore.fetchCurrentPageData('');
              return _context22.abrupt("return");

            case 5:
              _this20.setFirstDragData(targetChapter);

              pageId = targetChapter.children.length > 0 ? targetChapter.children[0].id : ''; // pageContainer에서 currentChapterId만 있고 pageId가 없으면 render pageNotFound component
              // fetch page data 끝날 때까지 loading img 띄우도록 나중에 set chapter id

              if (!pageId) {
                _context22.next = 12;
                break;
              }

              _context22.next = 10;
              return PageStore.fetchCurrentPageData(pageId);

            case 10:
              _context22.next = 13;
              break;

            case 12:
              _this20.setCurrentChapterInfo(targetChapter.id, targetChapter.type === CHAPTER_TYPE.RECYCLE_BIN ? true : false);

            case 13:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }))();
  },

  /*
    loading true->false가 들어간 함수
  */
  // 처음 축소 상태에서 확대 상태로 바꿀 때
  fetchFirstNote: function fetchFirstNote() {
    var _this21 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _this21.setLoadingPageInfo(true);

              _context23.next = 3;
              return _this21.setFirstNoteInfo();

            case 3:
              _this21.setLoadingPageInfo(false);

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }))();
  },
  // chapterList 가져와서 첫 번째 노트 set해주고 보여주기
  fetchChapterList: function fetchChapterList() {
    var _arguments4 = arguments,
        _this22 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
      var isInit;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              isInit = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : false;

              // 한 군데에서만 부르긴하지만 일단 param 추가
              _this22.setLoadingPageInfo(true);

              _context24.next = 4;
              return _this22.getNoteChapterList(isInit);

            case 4:
              if (!(_this22.chapterList.length > 0)) {
                _context24.next = 7;
                break;
              }

              _context24.next = 7;
              return _this22.setFirstNoteInfo();

            case 7:
              _this22.setLoadingPageInfo(false);

            case 8:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }))();
  },
  // localStorage에서 page 얻기
  getChapterFirstPageId: function getChapterFirstPageId(chapterId) {
    var _chapter$children$;

    var chapter = this.chapterList.find(function (chapter) {
      return chapter.id === chapterId;
    });
    if (!chapter || chapter.children.length === 0) return null;
    return (_chapter$children$ = chapter.children[0]) === null || _chapter$children$ === void 0 ? void 0 : _chapter$children$.id;
  },

  /**
   * isRecycleBin인지 항상 같이 set해줘야해서 만든 함수
   * computed 기능용으로 만듦
   * param: 1st.chapterId, 2nd. isRecycleBin값(안 넘기면 recycleBin 찾아서 비교함)
   * chapterId 없으면 isRecycleBin은 false로 세팅함
   */
  setCurrentChapterInfo: function setCurrentChapterInfo(chapterId, isRecycleBin) {
    this.setCurrentChapterId(chapterId);

    if (typeof isRecycleBin === 'boolean') {
      PageStore.setIsRecycleBin(isRecycleBin);
      return;
    }

    if (!chapterId) {
      PageStore.setIsRecycleBin(false);
      return;
    }

    var recycleBin = this.chapterList.find(function (chapter) {
      return chapter.type === CHAPTER_TYPE.RECYCLE_BIN;
    });
    if (recycleBin && recycleBin.id === chapterId) PageStore.setIsRecycleBin(true);else PageStore.setIsRecycleBin(false);
  },
  openNote: function openNote() {
    var _this23 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
      var pageId;
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.prev = 0;
              _context25.t0 = NoteStore.metaTagInfo.type;
              _context25.next = _context25.t0 === 'chapter' ? 4 : _context25.t0 === 'page' ? 13 : 17;
              break;

            case 4:
              // chapter, page 선택
              NoteStore.setTargetLayout('LNB');

              _this23.setScrollIntoViewId(NoteStore.metaTagInfo.id);

              _context25.next = 8;
              return _this23.getNoteChapterList();

            case 8:
              // 혹시 휴지통이 챕터 메타태그로 공유되었을 경우 대비
              _this23.setCurrentChapterInfo(NoteStore.metaTagInfo.id);

              pageId = _this23.getChapterFirstPageId(NoteStore.metaTagInfo.id);
              /**
               * 현재 챕터 클릭 로직과 동일하게 함
               * lnb만 보이고 있어도 선택효과 주기 위해 noteInfo를 이때 가져옴
               * 확대버튼 눌렀을 때 다시 getNoteInfo 하지 않음
               */

              _context25.next = 12;
              return PageStore.fetchCurrentPageData(pageId ? pageId : '');

            case 12:
              return _context25.abrupt("break", 17);

            case 13:
              _context25.next = 15;
              return PageStore.fetchCurrentPageData(NoteStore.metaTagInfo.id);

            case 15:
              NoteStore.setTargetLayout('Content'); // 챕터 없습니다 페이지 나오지 않게 하기

              return _context25.abrupt("break", 17);

            case 17:
              _context25.next = 22;
              break;

            case 19:
              _context25.prev = 19;
              _context25.t1 = _context25["catch"](0);
              console.log('e', _context25.t1);

            case 22:
              NoteStore.setMetaTagInfo({
                isOpen: false,
                type: '',
                id: ''
              });

            case 23:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25, null, [[0, 19]]);
    }))();
  },
  getRoomChapterList: function getRoomChapterList() {
    var roomChapterList = this.chapterList.filter(function (chapter) {
      return chapter.type === CHAPTER_TYPE.NOTEBOOK || chapter.type === CHAPTER_TYPE.DEFAULT;
    });
    return roomChapterList;
  }
});

var TagStore = mobx.observable({
  // note에 딸린 tagList
  notetagList: [],
  tagText: '',
  addTagList: [],
  // web에서 안씀
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
  getTagNoteList: function getTagNoteList(tagId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$NoteRepository, status, dto;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return NoteRepository$1.getTagNoteList(tagId);

            case 2:
              _yield$NoteRepository = _context.sent;
              status = _yield$NoteRepository.status;
              dto = _yield$NoteRepository.data.dto;
              return _context.abrupt("return", status === 200 ? dto.noteList : null);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // notetagList
  getNoteTagList: function getNoteTagList(noteId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$NoteRepository2, status, dto;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return NoteRepository$1.getNoteTagList(noteId);

            case 2:
              _yield$NoteRepository2 = _context2.sent;
              status = _yield$NoteRepository2.status;
              dto = _yield$NoteRepository2.data.dto;
              return _context2.abrupt("return", status === 200 ? dto : null);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  setNoteTagList: function setNoteTagList(tagArr) {
    this.notetagList = tagArr;
  },
  prependNoteTagList: function prependNoteTagList(tagText) {
    this.notetagList.unshift({
      text: tagText
    });
  },
  // tagTest
  getTagText: function getTagText(text) {
    this.tagText = text;
  },
  setTagText: function setTagText(text) {
    this.tagText = text;
  },
  // addTagList
  getAddTagList: function getAddTagList() {
    return this.addTagList;
  },
  setAddTagList: function setAddTagList(arr) {
    this.addTagList = arr;
  },
  appendAddTagList: function appendAddTagList(tagText) {
    this.addTagList.push(tagText);
  },
  removeAddTagList: function removeAddTagList(tagText) {
    this.addTagList = this.addTagList.filter(function (tag) {
      return tag !== tagText;
    });
  },
  getAllSortedTagList: function getAllSortedTagList() {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.getAllSortedTagList();

            case 2:
              res = _context3.sent;
              return _context3.abrupt("return", res.status === 200 ? res.data.dto : null);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  setAllSortedTagList: function setAllSortedTagList(tagList) {
    this.allSortedTagList = tagList;
  },
  getSortedTagList: function getSortedTagList() {
    return this.sortedTagList;
  },
  setSortedTagList: function setSortedTagList(tagList) {
    this.sortedTagList = tagList;
  },
  getIsSearching: function getIsSearching() {
    return this.isSearching;
  },
  setIsSearching: function setIsSearching(isSearching) {
    this.isSearching = isSearching;
  },
  getIsSearchLoading: function getIsSearchLoading() {
    return this.isSearchLoading;
  },
  setIsSearchLoading: function setIsSearchLoading(isLoading) {
    this.isSearchLoading = isLoading;
  },
  getSearchStr: function getSearchStr() {
    return this.searchStr;
  },
  setSearchStr: function setSearchStr(str) {
    this.searchStr = str;
  },
  getTagPanelLoading: function getTagPanelLoading() {
    return this.tagPanelLoading;
  },
  setTagPanelLoading: function setTagPanelLoading(isLoading) {
    this.tagPanelLoading = isLoading;
  },
  setSearchTagId: function setSearchTagId(id) {
    this.searchTagId = id;
  },
  createTag: function createTag(createTagList, noteId) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var createTagArr, _yield$NoteRepository3, dto;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              createTagArr = createTagList.map(function (tag) {
                return {
                  text: tag,
                  note_id: noteId,
                  WS_ID: NoteRepository$1.WS_ID
                };
              });
              _context4.next = 3;
              return NoteRepository$1.createTag(createTagArr);

            case 3:
              _yield$NoteRepository3 = _context4.sent;
              dto = _yield$NoteRepository3.data.dto;

              _this.setAddTagList([]);

              return _context4.abrupt("return", dto);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  deleteTag: function deleteTag(deleteTagList, noteId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var deleteTagArray, _yield$NoteRepository4, dto;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              deleteTagArray = deleteTagList.map(function (tag) {
                return {
                  tag_id: tag,
                  note_id: noteId,
                  WS_ID: NoteRepository$1.WS_ID
                };
              });
              _context5.next = 3;
              return NoteRepository$1.deleteTag(deleteTagArray);

            case 3:
              _yield$NoteRepository4 = _context5.sent;
              dto = _yield$NoteRepository4.data.dto;
              return _context5.abrupt("return", dto);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  updateTag: function updateTag(updateTagList) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var updateTagArray, _yield$NoteRepository5, dto;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              updateTagArray = updateTagList.map(function (tag) {
                return {
                  tag_id: tag.tag_id,
                  text: tag.text,
                  WS_ID: NoteRepository$1.WS_ID
                };
              });
              _context6.next = 3;
              return NoteRepository$1.updateTag(updateTagArray);

            case 3:
              _yield$NoteRepository5 = _context6.sent;
              dto = _yield$NoteRepository5.data.dto;

              _this2.setUpdateTagList([]);

              return _context6.abrupt("return", dto);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },

  /*
    비즈니스 로직
  */
  // encode logic 추가된 createTag, updateTag
  // tag는 tag 추가 및 수정시 동일값 체크 로직 & 저장할 때 encoding한다
  createNoteTag: function createNoteTag(createTagList, noteId) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var createTagArr, _yield$NoteRepository6, dto;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              createTagArr = createTagList.map(function (tagText) {
                return {
                  text: tagText,
                  note_id: noteId,
                  WS_ID: NoteRepository$1.WS_ID
                };
              });
              _context7.next = 3;
              return NoteRepository$1.createTag(createTagArr);

            case 3:
              _yield$NoteRepository6 = _context7.sent;
              dto = _yield$NoteRepository6.data.dto;
              _context7.next = 7;
              return _this3.fetchNoteTagList(noteId);

            case 7:
              return _context7.abrupt("return", _objectSpread2(_objectSpread2({}, dto), {}, {
                text: createTagArr[0].text
              }));

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },

  /**
   * updateTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
   */
  updateNoteTag: function updateNoteTag(updateTagList, noteId) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var updateTagArr, _yield$NoteRepository7, dto;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              updateTagArr = updateTagList.map(function (tag) {
                return {
                  note_id: noteId,
                  tag_id: tag.tag_id,
                  text: tag.text,
                  WS_ID: NoteRepository$1.WS_ID
                };
              });
              _context8.next = 3;
              return NoteRepository$1.updateTag(updateTagArr);

            case 3:
              _yield$NoteRepository7 = _context8.sent;
              dto = _yield$NoteRepository7.data.dto;
              _context8.next = 7;
              return _this4.fetchNoteTagList(noteId);

            case 7:
              return _context8.abrupt("return", _objectSpread2(_objectSpread2({}, dto), {}, {
                text: updateTagList[0].text
              }));

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },

  /**
   * deleteTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
   */
  deleteNoteTag: function deleteNoteTag(deleteTagList, noteId) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var deleteTagArray, _yield$NoteRepository8, dto;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              deleteTagArray = deleteTagList.map(function (tag) {
                return {
                  tag_id: tag,
                  note_id: noteId,
                  WS_ID: NoteRepository$1.WS_ID
                };
              });
              _context9.next = 3;
              return NoteRepository$1.deleteTag(deleteTagArray);

            case 3:
              _yield$NoteRepository8 = _context9.sent;
              dto = _yield$NoteRepository8.data.dto;

              _this5.fetchNoteTagList(noteId);

              return _context9.abrupt("return", dto);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  fetchNoteTagList: function fetchNoteTagList(noteId) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return NoteRepository$1.getNoteTagList(noteId).then(function (response) {
                if (response.status === 200) {
                  var tagList = response.data.dto;

                  _this6.setNoteTagList(tagList.tagList);
                }
              });

            case 2:
              return _context10.abrupt("return", _this6.notetagList);

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  // 처음 TagContainer render할 때 필요한 모든 데이터 fetching 및 processing
  fetchTagData: function fetchTagData() {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _this7.setTagPanelLoading(true);

              _context11.t0 = _this7;
              _context11.next = 4;
              return _this7.getAllsortedTagList();

            case 4:
              _context11.t1 = _context11.sent;

              _context11.t0.setAllSortedTagList.call(_context11.t0, _context11.t1);

              _this7.setSortedTagList(_this7.categorizeTagList(_this7.allSortedTagList, false));

              _this7.setTagPanelLoading(false);

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },

  /**
   * 정렬된 태그 리스트를 서버에서 가져온다.
   * @return sorted tag list
   */
  getAllsortedTagList: function getAllsortedTagList() {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var _yield$NoteRepository9, tag_index_list_dto;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return NoteRepository$1.getAllSortedTagList();

            case 2:
              _yield$NoteRepository9 = _context12.sent;
              tag_index_list_dto = _yield$NoteRepository9.data.dto.tag_index_list_dto;
              return _context12.abrupt("return", tag_index_list_dto);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },

  /**
   * tagList의 KEY를 KOR, ENG, NUM, ETC 중 하나로 categorize 한다.
   * @param {Array} allTagsList
   * @param {boolean} isSearching
   * @return categorized tag objects
   */
  categorizeTagList: function categorizeTagList(allTagsList, isSearching) {
    var _this8 = this;

    /**
     * categorizedTagObjs: {
     *   'KOR': { 'T': { tagText1: { tagId: '', note_id: [] }, tagText2: { tagId: '', note_id: [] }, } } }
     *   ...
     * }
     */
    var categorizedTagObjs = {
      KOR: {},
      ENG: {},
      NUM: {},
      ETC: {}
    };
    allTagsList.forEach(function (item) {
      var upperCaseKey = item.KEY.toUpperCase();

      var tagKeyCategory = _this8.getTagKeyCategory(upperCaseKey);

      var tagList = tagKeyCategory === 'ENG' ? _this8.sortEngTagList(item.tag_indexdto.tagList) : item.tag_indexdto.tagList;
      var tagObjs = isSearching ? _this8.getSearchTagObjs(tagList, _this8.searchStr) : _this8.getTagObjs(tagList);

      if (Object.keys(tagObjs).length > 0) {
        categorizedTagObjs[tagKeyCategory][upperCaseKey] = _objectSpread2(_objectSpread2({}, categorizedTagObjs[tagKeyCategory][upperCaseKey]), tagObjs);
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
  getTagKeyCategory: function getTagKeyCategory(tagKey) {
    var charCode = tagKey.charCodeAt(0);
    if (12593 <= charCode && charCode < 55203) return 'KOR';else if (64 < charCode && charCode < 123) return 'ENG';else if (48 <= charCode && charCode <= 57) return 'NUM';else return 'ETC';
  },

  /**
   * tag의 category가 english인 경우 대소문자 구분 없이 정렬하여 반환한다.
   * @param {Array} tagList
   * @return sorted tag list
   */
  sortEngTagList: function sortEngTagList(tagList) {
    var sortedEngTagList = tagList.slice().sort(function (a, b) {
      return a.text.toLowerCase() > b.text.toLowerCase() ? 1 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 0;
    });
    return sortedEngTagList;
  },

  /**
   * 동일한 KEY를 가지는 다양한 tagText의 tagId, noteIds를 담고 있는 Object를 반환한다.
   * @param {Array} tagList
   * @return tag objects with same key
   */
  getTagObjs: function getTagObjs(tagList) {
    var tagObjs = tagList.reduce(function (obj, tag) {
      var tagText = NoteUtil.decodeStr(tag.text);

      if (obj.hasOwnProperty(tagText)) {
        obj[tagText]['note_id'].push(tag.note_id);
      } else {
        obj[tagText] = {
          id: tag.tag_id,
          note_id: [tag.note_id]
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
  getSearchTagObjs: function getSearchTagObjs(tagList, searchTagText) {
    var searchTagObjs = tagList.reduce(function (obj, tag) {
      var tagText = NoteUtil.decodeStr(tag.text);
      if (!tagText.toUpperCase().includes(searchTagText.toUpperCase())) return obj;

      if (obj.hasOwnProperty(tagText)) {
        obj[tagText]['note_id'].push(tag.note_id);
      } else {
        obj[tagText] = {
          id: tag.tag_id,
          note_id: [tag.note_id]
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
  deleteEmptyCategory: function deleteEmptyCategory(categorizedTagObjs) {
    Object.entries(categorizedTagObjs).forEach(function (entry) {
      var _entry = _slicedToArray(entry, 2),
          key = _entry[0],
          value = _entry[1];

      if (!Object.keys(value).length) delete categorizedTagObjs[key];
    });
  },
  searchTag: function searchTag(str) {
    var _this9 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _this9.setIsSearching(true);

              _this9.setIsSearchLoading(true);

              _this9.setSearchStr(str);

              _context13.t0 = _this9;
              _context13.next = 6;
              return _this9.getAllsortedTagList();

            case 6:
              _context13.t1 = _context13.sent;

              _context13.t0.setAllSortedTagList.call(_context13.t0, _context13.t1);

              _this9.setSortedTagList(_this9.categorizeTagList(_this9.allSortedTagList, true));

              _this9.setIsSearchLoading(false);

            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  setTagNoteSearchResult: function setTagNoteSearchResult(tagName) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var _yield$NoteRepository10, tagList;

      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return NoteRepository$1.getSearchList(tagName);

            case 2:
              _yield$NoteRepository10 = _context14.sent;
              tagList = _yield$NoteRepository10.data.dto.tagList;
              ChapterStore.setSearchResult({
                chapter: null,
                page: tagList
              });

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }))();
  },
  isValidTag: function isValidTag(text) {
    return checkDuplicateIgnoreCase(this.notetagList, 'text', text);
  },
  // for mobile
  handleTagNoteList: function handleTagNoteList(tagId) {
    var _this10 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var pageList, obj;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _this10.setSearchTagId(tagId ? tagId : _this10.searchTagId);

              ChapterStore.setIsTagSearching(true);
              _context15.next = 4;
              return TagStore.getTagNoteList(_this10.searchTagId);

            case 4:
              pageList = _context15.sent;
              pageList.map(function (page) {
                return page.id = page.note_id;
              });
              obj = {
                children: pageList
              };
              ChapterStore.chapterInfo = new ChapterModel(obj);
              NoteStore.setTargetLayout('List');

            case 9:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }))();
  }
});

var EditorStore = mobx.observable({
  contents: '',
  tinymce: null,
  editor: null,
  uploadFile: '',
  imgElement: '',
  isFile: false,
  isDrive: false,
  isAttatch: false,
  isPreview: false,
  isSaveDrive: false,
  isSearch: false,
  previewFileMeta: {},
  selectFileIdx: '',
  selectFileElement: '',
  downloadFileId: '',
  deleteFileId: '',
  deleteFileName: '',
  deleteFileIndex: '',
  uploadDTO: [],
  uploadFileList: [],
  deleteFileList: [],
  tempFileList: [],
  fileMetaList: [],
  fileList: [],
  fileLayoutList: [],
  tempArray: [],
  tempFileLayoutList: [],
  notSaveFileList: [],
  driveFileList: [],
  saveFileId: '',
  saveFileExt: '',
  saveFileName: '',
  fileName: '',
  fileSize: '',
  fileExtension: '',
  uploadLength: '',
  totalUploadLength: '',
  isFileFilteredByNameLen: false,
  processLength: 0,
  processCount: 0,
  failCount: 0,
  searchResultState: false,
  searchCurrentCount: 1,
  searchTotalCount: 0,
  searchValue: '',
  isUploading: false,
  uploaderRef: '',
  uploaderType: '',
  visiblityState: '',
  uploadFileCancelStatus: false,
  totalUsage: 0,
  spaceTotalVolume: 0,
  isTagEditPage: false,
  setContents: function setContents(content) {
    this.contents = content;
  },
  getContents: function getContents() {
    return this.contents;
  },
  setEditor: function setEditor(instance) {
    this.tinymce = instance;
  },
  getEditor: function getEditor() {
    return this.tinymce;
  },
  setEditorDOM: function setEditorDOM(el) {
    this.editor = el;
  },
  getEditorDOM: function getEditorDOM() {
    return this.editor;
  },
  setImgElement: function setImgElement(element) {
    this.imgElement = element;
  },
  getImgElement: function getImgElement() {
    return this.imgElement;
  },
  setIsDrive: function setIsDrive(flag) {
    this.isDrive = flag;
  },
  setIsSaveDrive: function setIsSaveDrive(flag) {
    this.isSaveDrive = flag;
  },
  setSaveDriveMeta: function setSaveDriveMeta() {
    var saveMeta = {
      file_id: this.saveFileId,
      file_extension: this.saveFileExt,
      file_name: this.saveFileName
    };
    this.saveDriveMeta = saveMeta;
  },
  setIsAttatch: function setIsAttatch(flag) {
    this.isAttatch = flag;
  },
  setIsPreview: function setIsPreview(flag) {
    this.isPreview = flag;
  },
  setInitialSearchState: function setInitialSearchState() {
    this.isSearch = false; // 기존거에 initialSearch에 있던거 추가함

    this.setSearchResultState(false);
    this.setSearchValue('');
    this.setSearchTotalCount(0);
    this.setSearchCurrentCount(0);
  },
  setIsSearch: function setIsSearch(flag) {
    this.isSearch = flag;
  },
  setSearchValue: function setSearchValue(value) {
    this.searchValue = value;
  },
  setSearchTotalCount: function setSearchTotalCount(count) {
    this.searchTotalCount = count;
  },
  setSearchCurrentCount: function setSearchCurrentCount(count) {
    this.searchCurrentCount = count;
  },
  setSearchResultState: function setSearchResultState(flag) {
    this.searchResultState = flag;
  },
  setPreviewFileMeta: function setPreviewFileMeta(fileMeta) {
    this.previewFileMeta = fileMeta;
  },
  setProcessLength: function setProcessLength(len) {
    this.processLength = len;
  },
  setProcessCount: function setProcessCount(count) {
    this.processCount = count;
  },
  setFailCount: function setFailCount(count) {
    this.failCount = count;
  },
  setIsUploading: function setIsUploading(isUploading) {
    this.isUploading = isUploading;
  },
  setUploaderType: function setUploaderType(type) {
    this.uploaderType = type;
  },
  setUploaderRef: function setUploaderRef(ref) {
    this.uploaderRef = ref;
  },
  setVisiblityState: function setVisiblityState(flag) {
    this.visiblityState = flag;
  },
  setIsTagEditPage: function setIsTagEditPage(flag) {
    this.isTagEditPage = flag;
  },
  // meta:{dto:{channel_id, storageFileInfo:{user_context_1:note_id 있음}, workspace_id}}, type="file"
  createUploadMeta: function createUploadMeta(meta, type) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$NoteRepository, dto;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return NoteRepository$1.createUploadMeta(meta);

            case 2:
              _yield$NoteRepository = _context.sent;
              dto = _yield$NoteRepository.data.dto;

              if (!dto.log_file_id) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", {
                id: dto.log_file_id,
                type: type
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  createUploadStorage: function createUploadStorage(fileId, file, handleProcess) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$NoteRepository2, dto;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return NoteRepository$1.createUploadStorage(fileId, file, handleProcess);

            case 2:
              _yield$NoteRepository2 = _context2.sent;
              dto = _yield$NoteRepository2.data.dto;
              return _context2.abrupt("return", dto);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  uploadFileGW: function uploadFileGW(file, file_name, file_extension, location, handleProcess, cancelSource) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$NoteRepository3, dto;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.uploadFileGW(file, file_name, file_extension, location, handleProcess, cancelSource);

            case 2:
              _yield$NoteRepository3 = _context3.sent;
              dto = _yield$NoteRepository3.data.dto;
              return _context3.abrupt("return", dto);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  deleteFile: function deleteFile(deleteId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$NoteRepository4, dto;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return NoteRepository$1.deleteFile(deleteId);

            case 2:
              _yield$NoteRepository4 = _context4.sent;
              dto = _yield$NoteRepository4.data.dto;
              return _context4.abrupt("return", dto);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  deleteAllFile: function deleteAllFile(fileList) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return NoteRepository$1.deleteAllFile(fileList ? fileList : _this.fileList).then(function (response) {
                var dto = response.data.dto;

                if (dto.resultMsg === 'Success') {
                  ChapterStore.getNoteChapterList();
                }
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  getStorageVolume: function getStorageVolume() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var _yield$NoteRepository5, dto;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return NoteRepository$1.getStorageVolume();

            case 2:
              _yield$NoteRepository5 = _context6.sent;
              dto = _yield$NoteRepository5.data.dto;

              if (dto.resultMsg === 'Success') {
                _this2.totalUsage = dto.volumeInfoList[0].total_usage;
                _this2.spaceTotalVolume = dto.volumeInfoList[0].space_max_volume;
              }

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },

  /**
   * drive에서 받은 file_id 들의 array
   * @param {*} fileArray
   */
  createFileMeta: function createFileMeta(fileArray, noteId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var createCopyArray, _yield$NoteRepository6, dto;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              createCopyArray = [];
              fileArray.forEach(function (file) {
                createCopyArray.push({
                  note_id: noteId,
                  file_id: file,
                  WS_ID: NoteRepository$1.WS_ID
                });
              });
              _context7.next = 4;
              return NoteRepository$1.createFileMeta(createCopyArray);

            case 4:
              _yield$NoteRepository6 = _context7.sent;
              dto = _yield$NoteRepository6.data.dto;
              return _context7.abrupt("return", dto);

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  storageFileDeepCopy: function storageFileDeepCopy(fileId, type) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var _yield$NoteRepository7, dto, _dto$storageFileInfoL, file_id, file_name, file_extension, file_updated_at, file_size, isImage, tempMeta;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return NoteRepository$1.storageFileDeepCopy(fileId);

            case 2:
              _yield$NoteRepository7 = _context8.sent;
              dto = _yield$NoteRepository7.data.dto;

              if (!(dto.resultMsg === 'Success')) {
                _context8.next = 13;
                break;
              }

              _dto$storageFileInfoL = dto.storageFileInfoList[0], file_id = _dto$storageFileInfoL.file_id, file_name = _dto$storageFileInfoL.file_name, file_extension = _dto$storageFileInfoL.file_extension, file_updated_at = _dto$storageFileInfoL.file_updated_at, file_size = _dto$storageFileInfoL.file_size;
              isImage = type === 'image' ? true : false;
              tempMeta = {
                user_id: NoteRepository$1.USER_ID,
                file_last_update_user_id: NoteRepository$1.USER_ID,
                file_id: file_id,
                file_name: file_name,
                file_extension: file_extension,
                file_created_at: '',
                file_updated_at: file_updated_at,
                file_size: file_size,
                user_context_1: '',
                user_context_2: '',
                user_context_3: '',
                progress: 0,
                type: isImage ? 'image' : 'file',
                error: false
              };

              _this3.addFileList(tempMeta);

              if (isImage) EditorStore.createDriveElement('image', file_id, file_name + '.' + file_extension);
              return _context8.abrupt("return", {
                id: file_id,
                type: type
              });

            case 13:
              EditorStore.failCount++;

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  getDuflicateFile: function getDuflicateFile(fileName, fileExt) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var pageId, _yield$NoteRepository8, dto, _dto$file$;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              pageId = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : PageStore.pageInfo.id;
              _context9.next = 3;
              return NoteRepository$1.getDuflicateFile(fileName, fileExt, pageId);

            case 3:
              _yield$NoteRepository8 = _context9.sent;
              dto = _yield$NoteRepository8.data.dto;

              if (!(dto.result === 'Y')) {
                _context9.next = 7;
                break;
              }

              return _context9.abrupt("return", (_dto$file$ = dto.file[0]) === null || _dto$file$ === void 0 ? void 0 : _dto$file$.user_context_1);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  getRecycleBinAllFile: function getRecycleBinAllFile() {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var _yield$NoteRepository9, dto;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return NoteRepository$1.getRecycleBinAllFile();

            case 2:
              _yield$NoteRepository9 = _context10.sent;
              dto = _yield$NoteRepository9.data.dto;
              return _context10.abrupt("return", dto);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  setSaveFileMeta: function setSaveFileMeta(fileId, fileExt, fileName) {
    this.saveFileId = fileId;
    this.saveFileExt = fileExt;
    this.saveFileName = fileName;
  },
  addDriveFileList: function addDriveFileList(fileInfo) {
    this.driveFileList.push(fileInfo);
  },
  setFileList: function setFileList(fileList) {
    this.fileList = fileList;
    this.checkFile();
  },
  getFileList: function getFileList() {
    return this.fileList;
  },
  setFileArray: function setFileArray(filelayoutlist) {
    this.fileLayoutList = filelayoutlist;
  },
  setIsFile: function setIsFile(flag) {
    this.isFile = flag;
  },
  removeFileList: function removeFileList(fileId) {
    this.fileList = this.fileList.filter(function (file) {
      return file.file_id !== fileId;
    });
  },
  // not image 파일 첨부 영역을 위함
  checkFile: function checkFile() {
    var ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png'];
    var checkFile;

    if (this.fileList) {
      checkFile = this.fileList.filter(function (file) {
        return !file.file_extension || !ImageExt.includes(file.file_extension.toLowerCase());
      });
    }

    if (checkFile === undefined) {
      this.setIsFile(false);
      this.setFileArray([]);
    } else if (checkFile !== undefined && checkFile.length === 0) {
      this.setIsFile(false);
      this.setFileArray([]);
    } else {
      this.setIsFile(true);
      var getUnixTime = NoteUtil.getUnixTime; // 혹시나 'file_updated_at'이 빈 str인 경우 대소비교는 정확하지 않음

      checkFile.sort(function (a, b) {
        return getUnixTime(b['created_at']) - getUnixTime(a['created_at']);
      });
      this.setFileArray(checkFile);
    }
  },
  isFileLength: function isFileLength() {
    var temp = this.tempFileLayoutList.filter(function (file) {
      return file.type === 'file';
    }).length;
    var uploaded = this.fileLayoutList.length;
    var totalLength = temp + uploaded;
    if (totalLength === 0) this.setIsFile(false);
  },
  uploadFileIsImage: function uploadFileIsImage(ext) {
    var ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png'];
    return ImageExt.includes(ext.toLowerCase());
  },
  getFileInfo: function getFileInfo(file) {
    var lastDotIdx = file.name.lastIndexOf('.');
    return {
      fileName: lastDotIdx < 0 ? file.name : file.name.slice(0, lastDotIdx),
      fileExtension: lastDotIdx < 0 ? '' : file.name.slice(lastDotIdx + 1),
      fileSize: file.size
    };
  },
  setFileIndex: function setFileIndex(idx) {
    this.selectFileIdx = idx;
  },
  setFileElement: function setFileElement(element) {
    this.selectFileElement = element;
  },
  setUploadFileDTO: function setUploadFileDTO(model, file, type, cancelSource) {
    this.uploadDTO.push({
      model: model,
      file: file,
      type: type,
      cancelSource: cancelSource
    });
    this.setPageFileList(model, file.uid, type, cancelSource);
  },
  setPageFileList: function setPageFileList(model, uid, type, cancelSource) {
    var obj = {
      file_id: uid,
      file_name: model.storageFileInfo.file_name,
      file_extension: model.storageFileInfo.file_extension,
      file_size: model.storageFileInfo.file_size,
      user_id: model.storageFileInfo.user_id,
      progress: 0,
      type: type,
      error: false,
      cancelSource: cancelSource
    };

    if (type !== 'image') {
      this.addFileList(obj);
    }
  },
  setUploadDTO: function setUploadDTO(meta) {
    this.uploadDTO.push(meta);
  },
  addFileList: function addFileList(target) {
    if (this.processCount !== this.uploadLength) {
      this.fileLayoutList.unshift(target);
      this.processCount++;
    } else this.processCount = 0;

    if (!this.isFile) this.setIsFile(true);
  },
  setFileLength: function setFileLength(length) {
    this.uploadLength = length;
  },
  setTotalUploadLength: function setTotalUploadLength(length) {
    this.totalUploadLength = length;
  },
  checkUploadUsage: function checkUploadUsage(fileSize) {
    return this.totalUsage + fileSize < this.spaceTotalVolume;
  },
  convertFileSize: function convertFileSize(bytes) {
    if (bytes == 0) return '0 Bytes';
    var k = 1000,
        dm = 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  deleteImage: function deleteImage() {
    var _EditorStore$tinymce, _EditorStore$tinymce$;

    var parent = this.tinymce.selection.getNode().parentNode;
    this.tinymce.selection.setContent('');
    if (!parent.hasChildNodes()) parent.innerHTML = '<br>';
    this.tinymce.focus();
    (_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : (_EditorStore$tinymce$ = _EditorStore$tinymce.undoManager) === null || _EditorStore$tinymce$ === void 0 ? void 0 : _EditorStore$tinymce$.add();
    NoteStore.setModalInfo(null);
  },
  createDriveElement: function createDriveElement(type, fileId, fileName) {
    var targetSRC = "../../CMS/Storage/StorageFile?action=Download&fileID=".concat(fileId, "&workspaceID=").concat(NoteRepository$1.WS_ID, "&channelID=").concat(NoteRepository$1.chId, "&userID=").concat(NoteRepository$1.USER_ID);

    switch (type) {
      case 'image':
        EditorStore.tinymce.execCommand('mceInsertContent', false, '<img id="' + fileId + '" src="' + targetSRC + '" data-name="' + fileName + '"crossorigin="' + '*' + '"/>');
        break;

      case 'video':
        EditorStore.tinymce.insertContent("<p>\n            <span class=\"mce-preview-object mce-object-video\" contenteditable=\"false\" data-mce-object=\"video\" data-mce-p-allowfullscreen=\"allowfullscreen\" data-mce-p-frameborder=\"no\" data-mce-p-scrolling=\"no\" data-mce-p-src='' data-mce-html=\"%20\">\n              <video width=\"400\" controls>\n                <source src=".concat(targetSRC, " />\n              </video>\n            </span>\n          </p>"));
        break;
    }
  },
  uploadingFileallCancel: function uploadingFileallCancel() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return Promise.all(EditorStore.uploadDTO.map(function (file, idx) {
                if (EditorStore.fileLayoutList[idx].status === 'pending') {
                  var _file$cancelSource;

                  EditorStore.fileLayoutList[idx].deleted = true;
                  return file === null || file === void 0 ? void 0 : (_file$cancelSource = file.cancelSource) === null || _file$cancelSource === void 0 ? void 0 : _file$cancelSource.cancel();
                }
              })).then(function () {
                _this4.uploadFileCancelStatus = true;
              });

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },
  isEditCancelOpen: function isEditCancelOpen() {
    var _this$tinymce, _this$tinymce$undoMan;

    var isEmpty = NoteUtil.isEmpty;
    if (PageStore.isNewPage && (!((_this$tinymce = this.tinymce) !== null && _this$tinymce !== void 0 && (_this$tinymce$undoMan = _this$tinymce.undoManager) !== null && _this$tinymce$undoMan !== void 0 && _this$tinymce$undoMan.hasUndo()) || !PageStore.noteContent) && isEmpty(TagStore.notetagList || []) && isEmpty(this.tempFileLayoutList || []) && isEmpty(this.fileLayoutList || [])) return false;
    return true;
  },
  handleMenuHidden: function handleMenuHidden() {
    var inEditor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');

    if (floatingMenu !== null) {
      floatingMenu === null || floatingMenu === void 0 ? void 0 : floatingMenu.click();
      if (inEditor) EditorStore.tinymce.focus();
    }
  }
});

var PageStore = mobx.observable({
  pageInfo: new PageModel({}),
  noteInfoList: [],
  saveStatus: {
    saving: false,
    saved: false
  },
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
  recoverInfo: {},
  // 복원 팝업에서 '복구'클릭시 필요
  pageList: [],
  selectedPages: new Map(),
  isMove: false,
  // 모바일 웹뷰 -> 페이지 이동 Container Flag
  setPageList: function setPageList(arr, color) {
    this.pageList = arr.map(function (page) {
      return _objectSpread2(_objectSpread2({}, page), {}, {
        color: color
      });
    });
  },
  setRecoverInfo: function setRecoverInfo(info) {
    // parentId, id, note_content
    this.recoverInfo = info;
  },
  setNoteInfoList: function setNoteInfoList(infoList) {
    this.noteInfoList = infoList;
  },
  // 함수 호출시 3가지 상태 중 true인거 하나만 넣어주기 : ex. {saving:true}
  setSaveStatus: function setSaveStatus(_ref) {
    var _ref$saving = _ref.saving,
        saving = _ref$saving === void 0 ? false : _ref$saving,
        _ref$saved = _ref.saved,
        saved = _ref$saved === void 0 ? false : _ref$saved;
    this.saveStatus.saving = saving;
    this.saveStatus.saved = saved;
  },

  /**
   * [임시]
   * 본인 또는 다른 사람이 해당 페이지를 수정하고 있는지 확인한다.
   * @returns 해당 페이지에 대한 자신의 읽기모드 여부
   */
  isReadMode: function isReadMode() {
    if (!this.pageInfo.editingUserId) {
      this.setOtherEdit(false);
      return true;
    }

    if (NoteRepository$1.USER_ID === this.pageInfo.editingUserId) {
      this.setOtherEdit(false);
      return false;
    }

    this.setOtherEdit(true);
    return true;
  },
  setOtherEdit: function setOtherEdit(flag) {
    this.otherEdit = flag;
  },
  getContent: function getContent() {
    return this.noteContent;
  },
  setContent: function setContent(content) {
    this.noteContent = content;
  },
  getTitle: function getTitle() {
    return this.noteTitle;
  },
  setTitle: function setTitle(title) {
    this.noteTitle = [].filter.call(title.slice(0, 200), function (c) {
      return c.charCodeAt(0) !== 65279;
    }).join('');
  },
  getCurrentPageId: function getCurrentPageId() {
    return this.currentPageId;
  },
  setCurrentPageId: function setCurrentPageId(pageId) {
    this.currentPageId = pageId;
  },
  getCreatePageParent: function getCreatePageParent() {
    return this.createParent;
  },
  setCreatePageParent: function setCreatePageParent(chapterId) {
    this.createParent = chapterId;
  },
  getRenameId: function getRenameId() {
    return this.renameId;
  },
  setRenameId: function setRenameId(pageId) {
    this.renameId = pageId;
  },
  getDragData: function getDragData() {
    return this.dragData;
  },
  setDragData: function setDragData(dragData) {
    this.dragData = dragData;
  },
  appendDragData: function appendDragData(key, value) {
    this.dragData.set(key, value);
  },
  deleteDragData: function deleteDragData(key) {
    this.dragData.delete(key);
  },
  clearDragData: function clearDragData() {
    this.dragData.clear();
  },
  setIsCtrlKeyDown: function setIsCtrlKeyDown(flag) {
    this.isCtrlKeyDown = flag;
  },
  getDragEnterPageIdx: function getDragEnterPageIdx() {
    return this.dragEnterPageIdx;
  },
  setDragEnterPageIdx: function setDragEnterPageIdx(pageIdx) {
    this.dragEnterPageIdx = pageIdx;
  },
  getDragEnterChapterIdx: function getDragEnterChapterIdx() {
    return this.dragEnterChapterIdx;
  },
  setDragEnterChapterIdx: function setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },
  getIsNewPage: function getIsNewPage() {
    return this.isNewPage;
  },
  setIsNewPage: function setIsNewPage(isNew) {
    this.isNewPage = isNew;
  },
  getExportTitle: function getExportTitle() {
    return this.exportPageTitle;
  },
  setExportTitle: function setExportTitle(pageTitle) {
    this.exportPageTitle = pageTitle;
  },
  setRestorePageId: function setRestorePageId(pageId) {
    this.restorePageId = pageId;
  },
  setIsRecycleBin: function setIsRecycleBin(flag) {
    this.isRecycleBin = flag;
  },
  setIsMove: function setIsMove(flag) {
    this.isMove = flag;
  },
  getNoteInfoList: function getNoteInfoList(noteId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$NoteRepository, dto;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return NoteRepository$1.getNoteInfoList(noteId);

            case 2:
              _yield$NoteRepository = _context.sent;
              dto = _yield$NoteRepository.data.dto;
              TagStore.setNoteTagList(dto === null || dto === void 0 ? void 0 : dto.tagList);
              EditorStore.setFileList(dto === null || dto === void 0 ? void 0 : dto.fileList);
              return _context.abrupt("return", dto);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  createPage: function createPage(title, content, parent) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$NoteRepository2, dto;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return NoteRepository$1.createPage(title, content, parent);

            case 2:
              _yield$NoteRepository2 = _context2.sent;
              dto = _yield$NoteRepository2.data.dto;
              return _context2.abrupt("return", dto);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  deletePage: function deletePage(pageList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$NoteRepository3, dto;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.deletePage(pageList);

            case 2:
              _yield$NoteRepository3 = _context3.sent;
              dto = _yield$NoteRepository3.data.dto;
              return _context3.abrupt("return", dto);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  renamePage: function renamePage(id, title, chapterId, callback) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$NoteRepository4, returnData;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return NoteRepository$1.renamePage(id, title, chapterId);

            case 2:
              _yield$NoteRepository4 = _context4.sent;
              returnData = _yield$NoteRepository4.data.dto;
              return _context4.abrupt("return", returnData);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  editStart: function editStart(noteId, parentNotebook) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _yield$NoteRepository5, returnData;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return NoteRepository$1.editStart(noteId, parentNotebook);

            case 2:
              _yield$NoteRepository5 = _context5.sent;
              returnData = _yield$NoteRepository5.data.dto;
              return _context5.abrupt("return", returnData);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  editDone: function editDone(updateDTO) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var _yield$NoteRepository6, returnData;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return NoteRepository$1.editDone(updateDTO);

            case 2:
              _yield$NoteRepository6 = _context6.sent;
              returnData = _yield$NoteRepository6.data.dto;
              return _context6.abrupt("return", returnData);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  noneEdit: function noneEdit(noteId, parentNotebook) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _yield$NoteRepository7, returnData;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return NoteRepository$1.nonEdit(noteId, parentNotebook);

            case 2:
              _yield$NoteRepository7 = _context7.sent;
              returnData = _yield$NoteRepository7.data.dto;
              return _context7.abrupt("return", returnData);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  throwPage: function throwPage(pageList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var _yield$NoteRepository8, dto;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return NoteRepository$1.throwPage(pageList);

            case 2:
              _yield$NoteRepository8 = _context8.sent;
              dto = _yield$NoteRepository8.data.dto;

              if (!(dto.resultMsg === 'Success')) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", dto);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  restorePage: function restorePage(pageId, chapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var pageList, _yield$NoteRepository9, dto;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              pageList = [];
              pageList.push({
                note_id: pageId,
                parent_notebook: chapterId
              });
              _context9.next = 4;
              return NoteRepository$1.restorePage(pageList);

            case 4:
              _yield$NoteRepository9 = _context9.sent;
              dto = _yield$NoteRepository9.data.dto;

              if (!(dto.resultMsg === 'Success')) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", dto);

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  bookmarkPage: function bookmarkPage(pageId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var _yield$NoteRepository10, dto;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return NoteRepository$1.bookmarkPage(pageId);

            case 2:
              _yield$NoteRepository10 = _context10.sent;
              dto = _yield$NoteRepository10.data.dto;

              if (!(dto.resultMsg === 'Success')) {
                _context10.next = 6;
                break;
              }

              return _context10.abrupt("return", dto);

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  unbookmarkPage: function unbookmarkPage(pageId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var _yield$NoteRepository11, dto;

      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return NoteRepository$1.unbookmarkPage(pageId);

            case 2:
              _yield$NoteRepository11 = _context11.sent;
              dto = _yield$NoteRepository11.data.dto;

              if (!(dto.resultMsg === 'Success')) {
                _context11.next = 6;
                break;
              }

              return _context11.abrupt("return", dto);

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },
  getbookmarkList: function getbookmarkList(chId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var _yield$NoteRepository12, dto;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return NoteRepository$1.getbookmarkList(chId);

            case 2:
              _yield$NoteRepository12 = _context12.sent;
              dto = _yield$NoteRepository12.data.dto;
              return _context12.abrupt("return", dto);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  getRecentList: function getRecentList(num) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var _yield$NoteRepository13, dto;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return NoteRepository$1.getRecentList(num);

            case 2:
              _yield$NoteRepository13 = _context13.sent;
              dto = _yield$NoteRepository13.data.dto;
              return _context13.abrupt("return", dto);

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },

  /**
   * 에디터의 텍스트/배경 색상을 초기화한다.
   */
  initializeBoxColor: function initializeBoxColor() {
    var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;

    (_document$getElementB = document.getElementById('tox-icon-text-color__color')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.removeAttribute('fill');
    (_document$getElementB2 = document.getElementById('tox-icon-text-color__color')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.removeAttribute('stroke');
    (_document$getElementB3 = document.getElementById('tox-icon-highlight-bg-color__color')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.removeAttribute('fill');
    (_document$getElementB4 = document.getElementById('tox-icon-highlight-bg-color__color')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.removeAttribute('stroke');
  },
  createNotePage: function createNotePage() {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var _EditorStore$tinymce, _EditorStore$tinymce$, _EditorStore$tinymce2;

      var isWeb, dto;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              isWeb = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : true;
              _context14.next = 3;
              return _this.createPage(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'), '<p><br></p>', _this.createParent);

            case 3:
              dto = _context14.sent;
              _this.pageInfo = new PageModel(dto);

              _this.setIsNewPage(true);

              if (isWeb) ChapterStore.getNoteChapterList();
              ChapterStore.setCurrentChapterInfo(dto.parent_notebook, false);
              _this.currentPageId = dto.note_id;
              TagStore.setNoteTagList(dto.tagList); // []

              EditorStore.setFileList(dto.fileList); // null

              _this.noteTitle = ''; // initialize editor properties

              _this.initializeBoxColor();

              (_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : (_EditorStore$tinymce$ = _EditorStore$tinymce.undoManager) === null || _EditorStore$tinymce$ === void 0 ? void 0 : _EditorStore$tinymce$.clear();
              if ((_EditorStore$tinymce2 = EditorStore.tinymce) !== null && _EditorStore$tinymce2 !== void 0 && _EditorStore$tinymce2.selection) EditorStore.tinymce.focus();

            case 15:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }))();
  },

  /**
   * It throw away pages in recycle bin.
   * NOTE: If you want to delete 'New Page', you should 'deleteNotePage'!
   */
  throwNotePage: function throwNotePage(_ref2) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var pageList, selectablePageId, isDnd, _ChapterStore$chapter, _ChapterStore$chapter2, pageId, num;

      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              pageList = _ref2.pageList, selectablePageId = _ref2.selectablePageId, isDnd = _ref2.isDnd;
              _context15.next = 3;
              return _this2.throwPage(pageList);

            case 3:
              _context15.next = 5;
              return ChapterStore.getNoteChapterList();

            case 5:
              if (!pageList.find(function (page) {
                return page.note_id === _this2.currentPageId;
              })) {
                _context15.next = 13;
                break;
              }

              pageId = isDnd ? (_ChapterStore$chapter = ChapterStore.chapterList[0]) === null || _ChapterStore$chapter === void 0 ? void 0 : (_ChapterStore$chapter2 = _ChapterStore$chapter.children[0]) === null || _ChapterStore$chapter2 === void 0 ? void 0 : _ChapterStore$chapter2.id : selectablePageId;

              _this2.setCurrentPageId(pageId);

              _context15.next = 10;
              return _this2.fetchCurrentPageData(pageId);

            case 10:
              NoteStore.updateDragData(ChapterStore.currentChapterId, _this2.currentPageId);
              ChapterStore.setIsCtrlKeyDown(false);

              _this2.setIsCtrlKeyDown(false);

            case 13:
              NoteStore.setIsDragging(false);
              num = pageList.length;
              NoteStore.setToastText(num > 1 ? i18n.t('NOTE_BIN_03', {
                num: num
              }) : i18n.t('NOTE_BIN_02'));
              NoteStore.setIsVisibleToast(true);
              NoteStore.setShowModal(false);

            case 18:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }))();
  },
  deleteNotePage: function deleteNotePage(_ref3) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
      var pageList, selectablePageId, currentChapter, pageId;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              pageList = _ref3.pageList, selectablePageId = _ref3.selectablePageId;
              _context16.next = 3;
              return _this3.deletePage(pageList);

            case 3:
              if (!_this3.isNewPage) {
                if (_this3.currentPageId === pageList[0].note_id) {
                  _this3.setCurrentPageId(selectablePageId);

                  _this3.fetchCurrentPageData(selectablePageId);
                }
              } else {
                if (NoteStore.layoutState === 'collapse') {
                  NoteStore.setTargetLayout('LNB');

                  _this3.setIsNewPage(false);

                  _this3.fetchCurrentPageData('');

                  ChapterStore.setCurrentChapterInfo('', false); // chapterId='', isRecycleBin=false
                } else {
                  currentChapter = ChapterStore.chapterList.find(function (chapter) {
                    return chapter.id === _this3.createParent;
                  });

                  if (currentChapter.children.length > 1) {
                    pageId = currentChapter.children[currentChapter.children.length - 2].id;

                    _this3.setCurrentPageId(pageId);

                    _this3.fetchCurrentPageData(pageId);
                  } else {
                    _this3.fetchCurrentPageData('');
                  }
                }
              }

              ChapterStore.getNoteChapterList();
              NoteStore.setShowModal(false);

            case 6:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  },
  renameNotePage: function renameNotePage(_ref4) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      var id, title, chapterId, _yield$_this4$renameP, text;

      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              id = _ref4.id, title = _ref4.title, chapterId = _ref4.chapterId;
              _context17.next = 3;
              return _this4.renamePage(id, title.trim(), chapterId);

            case 3:
              _yield$_this4$renameP = _context17.sent;
              text = _yield$_this4$renameP.note_title;
              if (_this4.dragData.get(id)) _this4.dragData.get(id).item.text = text;

              _this4.fetchNoteInfoList(id);

              _context17.next = 9;
              return ChapterStore.getNoteChapterList();

            case 9:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }))();
  },
  createDragData: function createDragData(pageId, chapterId) {
    var chapterIdx = ChapterStore.chapterList.findIndex(function (chapter) {
      return chapter.id === chapterId;
    });
    if (chapterIdx < 0) return;
    var pageIdx = ChapterStore.chapterList[chapterIdx].children.findIndex(function (page) {
      return page.id === pageId;
    });
    if (pageIdx < 0) return;
    return {
      item: ChapterStore.chapterList[chapterIdx].children[pageIdx],
      pageIdx: pageIdx,
      chapterId: chapterId,
      chapterIdx: chapterIdx
    };
  },
  movePage: function movePage(movePageId, moveTargetChapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var _yield$NoteRepository14, dto;

      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return NoteRepository$1.movePage(movePageId, moveTargetChapterId);

            case 2:
              _yield$NoteRepository14 = _context18.sent;
              dto = _yield$NoteRepository14.data.dto;
              return _context18.abrupt("return", dto);

            case 5:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }))();
  },
  getSortedDragDataList: function getSortedDragDataList() {
    var dragDataList = _toConsumableArray(this.dragData).map(function (keyValue) {
      return keyValue[1];
    });

    return dragDataList.sort(function (a, b) {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  },
  moveNotePage: function moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      var item, sortedDragDataList, sortedMovePages, pageIds, moveCntInSameChapter, moveCntToAnotherChapter, startIdx, moveCnt;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
              sortedDragDataList = _this5.getSortedDragDataList();
              sortedMovePages = sortedDragDataList.map(function (data) {
                return item[data.chapterIdx].children[data.pageIdx];
              });
              pageIds = []; // 갈아 끼울 페이지 아이디 리스트

              item[moveTargetChapterIdx].children.forEach(function (pageId, idx) {
                if (idx === moveTargetPageIdx) pageIds.push.apply(pageIds, _toConsumableArray(sortedMovePages));
                if (!_this5.dragData.get(pageId)) pageIds.push(pageId);
              });
              if (moveTargetPageIdx >= pageIds.length) pageIds.push.apply(pageIds, _toConsumableArray(sortedMovePages));
              _context19.next = 8;
              return Promise.all(sortedDragDataList.slice().reverse().map(function (data) {
                if (data.chapterId !== moveTargetChapterId && ChapterStore.pageMap.get(data.item.id)) {
                  item[data.chapterIdx].children.splice(data.pageIdx, 1);
                  return _this5.movePage(data.item.id, moveTargetChapterId);
                }
              }));

            case 8:
              item[moveTargetChapterIdx].children = pageIds;
              moveCntInSameChapter = 0;
              moveCntToAnotherChapter = 0;
              startIdx = item[moveTargetChapterIdx].children.findIndex(function (pageId) {
                return pageId === sortedDragDataList[0].item.id;
              });
              sortedDragDataList.map(function (data, idx) {
                if (data.chapterId !== moveTargetChapterId) moveCntToAnotherChapter++;else if (data.pageIdx !== startIdx + idx) moveCntInSameChapter++;

                _this5.dragData.set(data.item.id, {
                  item: data.item,
                  pageIdx: startIdx + idx,
                  chapterId: moveTargetChapterId,
                  chapterIdx: moveTargetChapterIdx
                });
              });
              moveCnt = moveCntInSameChapter + moveCntToAnotherChapter;

              if (!(moveCnt > 0)) {
                _context19.next = 24;
                break;
              }

              localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
              _context19.next = 18;
              return ChapterStore.getNoteChapterList();

            case 18:
              _context19.next = 20;
              return _this5.fetchCurrentPageData(sortedMovePages[0]);

            case 20:
              if (!moveCntToAnotherChapter) {
                NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_03', {
                  moveCnt: moveCntInSameChapter
                }));
              } else {
                ChapterStore.setDragData(new Map([[moveTargetChapterId, ChapterStore.createDragData(moveTargetChapterId)]]));
                NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_01', {
                  moveCnt: moveCnt,
                  targetPage: ChapterStore.chapterList[moveTargetChapterIdx].text
                }));
              }

              NoteStore.setIsVisibleToast(true);
              _context19.next = 25;
              break;

            case 24:
              // 이동한 페이지가 없는 경우: 기존 선택되어 있던 페이지 select
              NoteStore.handleClickOutside('Page');

            case 25:
              NoteStore.setIsDragging(false);

            case 26:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }))();
  },
  fetchNoteInfoList: function fetchNoteInfoList(noteId) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
      var dto;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return _this6.getNoteInfoList(noteId);

            case 2:
              dto = _context20.sent;

              if (isFilled(dto.note_id)) {
                _context20.next = 6;
                break;
              }

              if (_this6.currentPageId === noteId) _this6.currentPageId = '';
              return _context20.abrupt("return");

            case 6:
              _this6.setCurrentPageId(dto.note_id);

              ChapterStore.setCurrentChapterInfo(dto.parent_notebook);
              dto.note_content = NoteUtil.decodeStr(dto.note_content);
              _context20.next = 11;
              return getUserDisplayName(dto.USER_ID);

            case 11:
              dto.modUserName = _context20.sent;
              _this6.pageInfo = new PageModel(dto);
              _this6.noteTitle = dto.note_title;
              _this6.noteContent = dto.note_content;

              if (_this6.isNewPage) {
                NoteStore.updateDragData(ChapterStore.currentChapterId, _this6.currentPageId);
                _this6.dragData.get(dto.note_id).item.text = dto.note_title;
                Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('teespace-core')); }).then(function (module) {
                  try {
                    var logEvent = module.logEvent;
                    logEvent('note', 'clickNoteBtn');
                  } catch (e) {
                    console.error(e);
                  }
                }).catch(function (e) {
                  return console.error(e);
                });

                _this6.setIsNewPage(false);
              }

            case 16:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }))();
  },
  fetchCurrentPageData: function fetchCurrentPageData(pageId) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (!pageId) {
                _context21.next = 5;
                break;
              }

              _context21.next = 3;
              return _this7.fetchNoteInfoList(pageId);

            case 3:
              _context21.next = 7;
              break;

            case 5:
              _this7.pageInfo = new PageModel({});

              _this7.setCurrentPageId('');

            case 7:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }))();
  },
  // 저장 후 지우기
  removeLocalContent: function removeLocalContent() {
    if (!NoteStore.notechannel_id || !this.currentPageId) return;
    localStorage.removeItem("Note_autosave_".concat(NoteStore.notechannel_id, "_").concat(this.currentPageId));
  },
  // 노트앱 진입시 수정중인 노트 확인하기
  checkEditingPage: function checkEditingPage() {
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
      var target, noteId, dto;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.prev = 0;

              if (!(!NoteStore.notechannel_id || !NoteStore.user_id)) {
                _context22.next = 3;
                break;
              }

              return _context22.abrupt("return");

            case 3:
              // 수정 중인 노트 하나만 찾는다, Note_autosave_625be3d3-ca73-429a-8f87-34936d31e9a4_ee884b85-3c77-43f2-8c93-c2c10eccb5fa
              target = Object.keys(localStorage).find(function (key) {
                return key.replace(/^(Note_autosave_)(.+)_(.+)$/, '$2') === NoteStore.notechannel_id;
              });

              if (target) {
                _context22.next = 6;
                break;
              }

              return _context22.abrupt("return");

            case 6:
              noteId = target.replace(/^(Note_autosave_)(.+)_(.+)$/, '$3');
              /**
               * 챕터, 페이지 선택이 됐다가 풀려야할 때(확인했더니 is_edit이 아닌 경우)
               * 페이지 선택 효과가 깜빡이게 돼 fetchCurrentPageData 쓸 수 없음
               */

              _context22.next = 9;
              return _this8.getNoteInfoList(noteId);

            case 9:
              dto = _context22.sent;

              if ((dto === null || dto === void 0 ? void 0 : dto.is_edit) === NoteStore.user_id) {
                _this8.setRecoverInfo({
                  parentId: dto.parent_notebook,
                  id: noteId,
                  note_content: localStorage.getItem(target)
                });

                NoteStore.setModalInfo('recover');
              } else {
                // 수정 중인 상태 아니면 스토리지에서 지우기
                _this8.setRecoverInfo({});

                localStorage.removeItem(target);
              }

              _context22.next = 16;
              break;

            case 13:
              _context22.prev = 13;
              _context22.t0 = _context22["catch"](0);
              console.log('checkEditingPage, 노트 진입시 수정 중인 노트 확인하기');

            case 16:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, null, [[0, 13]]);
    }))();
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart: function noteEditStart(noteId) {
    var _this9 = this;

    var editorFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    this.editStart(noteId, this.pageInfo.chapterId).then(function (dto) {
      var _EditorStore$tinymce3;

      _this9.fetchNoteInfoList(dto.note_id); // focus에서 getRng error가 나서 selection부터 체크


      if ((_EditorStore$tinymce3 = EditorStore.tinymce) !== null && _EditorStore$tinymce3 !== void 0 && _EditorStore$tinymce3.selection) {
        var _EditorStore$tinymce4;

        if (editorFocus) EditorStore.tinymce.focus();
        EditorStore.tinymce.selection.setCursorLocation();
        (_EditorStore$tinymce4 = EditorStore.tinymce) === null || _EditorStore$tinymce4 === void 0 ? void 0 : _EditorStore$tinymce4.setContent(_this9.pageInfo.content);
      }

      _this9.initializeBoxColor();
    });
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone: function noteEditDone(updateDto) {
    var _this10 = this;

    this.editDone(updateDto).then(function (dto) {
      _this10.removeLocalContent();

      if (_this10.dragData.get(dto.note_id)) {
        _this10.dragData.get(dto.note_id).item.text = dto.note_title;
      }

      _this10.fetchNoteInfoList(dto.note_id);

      ChapterStore.getNoteChapterList();
    });
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteNoneEdit: function noteNoneEdit(noteId) {
    var _this11 = this;

    this.noneEdit(noteId, this.pageInfo.chapterId).then(function (dto) {
      var _EditorStore$tinymce5;

      _this11.fetchCurrentPageData(dto.note_id);

      EditorStore.handleMenuHidden();
      (_EditorStore$tinymce5 = EditorStore.tinymce) === null || _EditorStore$tinymce5 === void 0 ? void 0 : _EditorStore$tinymce5.setContent(_this11.pageInfo.content);
      NoteStore.setShowModal(false);
      EditorStore.setIsSearch(false);
    });
  },
  handleNoneEdit: function handleNoneEdit() {
    var _this12 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _this12.removeLocalContent(); // 로컬 스토리지에서 내용도 지워야


              if (!_this12.isNewPage) {
                _context23.next = 5;
                break;
              }

              _this12.deleteNotePage({
                pageList: [{
                  note_id: _this12.currentPageId
                }]
              });

              _context23.next = 10;
              break;

            case 5:
              if (!_this12.otherEdit) {
                _context23.next = 9;
                break;
              }

              return _context23.abrupt("return");

            case 9:
              _this12.noteNoneEdit(_this12.currentPageId);

            case 10:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }))();
  },
  getSaveDto: function getSaveDto(isAutoSave) {
    return {
      dto: {
        note_id: this.pageInfo.id,
        note_title: this.noteTitle.trim() || i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'),
        note_content: this.noteContent || '<p><br></p>',
        text_content: EditorStore.tinymce.getContent({
          format: 'text'
        }),
        parent_notebook: this.pageInfo.chapterId,
        is_edit: isAutoSave ? this.pageInfo.editingUserId : '',
        TYPE: 'EDIT_DONE',
        is_favorite: !isAutoSave && this.isNewPage ? 'isNewPage' : ''
      }
    };
  },
  // 자동저장, 저장 버튼 포함, isAutoSave default는 false(원래 함수 고치지 않기 위해)
  handleSave: function handleSave() {
    var isAutoSave = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!isAutoSave && !this.noteTitle) this.setTitle(this.getTitleFromPageContent());

    this._checkEmojiContent();

    var updateDTO = this.getSaveDto(isAutoSave);
    if (isAutoSave) this.handleAutoSave(updateDTO);else this.handleSaveBtn(updateDTO);
  },
  handleAutoSave: function handleAutoSave(updateDTO) {
    var _this13 = this;

    this.setSaveStatus({
      saving: true
    });
    this.editDone(updateDTO).then(function (dto) {
      var _document$getElementB5;

      _this13.removeLocalContent();

      if (((_document$getElementB5 = document.getElementById(_this13.pageInfo.id)) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.innerText) !== dto.note_title) ChapterStore.getNoteChapterList();

      _this13.setSaveStatus({
        saved: true
      }); // 2초 후 수정 중 인터렉션으로 바꾸기


      setTimeout(function () {
        _this13.setSaveStatus({});
      }, 2000);
    });
  },
  handleSaveBtn: function handleSaveBtn(updateDTO) {
    var _EditorStore$tinymce6, _EditorStore$tinymce7;

    this.noteEditDone(updateDTO);
    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    EditorStore.setInitialSearchState();
    EditorStore.handleMenuHidden();
    (_EditorStore$tinymce6 = EditorStore.tinymce) === null || _EditorStore$tinymce6 === void 0 ? void 0 : _EditorStore$tinymce6.selection.setCursorLocation();
    (_EditorStore$tinymce7 = EditorStore.tinymce) === null || _EditorStore$tinymce7 === void 0 ? void 0 : _EditorStore$tinymce7.undoManager.clear();
  },
  _checkEmojiContent: function _checkEmojiContent() {
    var reg = emojiRegex__default['default']();
    this.noteContent = this.noteContent.replace(reg, function (m) {
      return NoteUtil.encodeStr(m);
    });
  },
  getTitleFromPageContent: function getTitleFromPageContent(data) {
    return this._getFirstTxtOfPage(data) || i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03');
  },

  /**
   * 페이지에서 가장 처음으로 표시되는 txt를 반환한다.
   * 단, 테이블인 경우에는 여러 셀 중 처음으로 나타나는 txt를 반환한다.
   * @returns 가장 처음으로 표시되는 txt
   */
  _getFirstTxtOfPage: function _getFirstTxtOfPage() {
    var _this14 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EditorStore.tinymce.getBody().children;

    var targetNode = _toConsumableArray(data).find(function (node) {
      return _this14._hasTxt(node);
    });

    return (targetNode === null || targetNode === void 0 ? void 0 : targetNode.tagName) === 'TABLE' ? this._getTxtFromTable(targetNode) : targetNode === null || targetNode === void 0 ? void 0 : targetNode.textContent;
  },
  _hasTxt: function _hasTxt(node) {
    return !!node.textContent;
  },
  _getTxtFromTable: function _getTxtFromTable(node) {
    var _this15 = this;

    var targetTd = _toConsumableArray(node.getElementsByTagName('td')).find(function (td) {
      return _this15._hasTxt(td);
    });

    return targetTd === null || targetTd === void 0 ? void 0 : targetTd.textContent;
  },
  createSharePage: function createSharePage(targetList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
      var _yield$NoteRepository15, noteList;

      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return NoteRepository$1.createSharePage(targetList);

            case 2:
              _yield$NoteRepository15 = _context24.sent;
              noteList = _yield$NoteRepository15.data.dto.noteList;
              return _context24.abrupt("return", noteList);

            case 5:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }))();
  },
  createNoteSharePage: function createNoteSharePage(targetRoomId, targetPageList) {
    if (!targetPageList) return;
    var targetChId = NoteStore.getTargetChId(targetRoomId);
    var targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');
    var targetList = targetPageList.map(function (page) {
      return {
        WS_ID: NoteRepository$1.WS_ID,
        note_id: page.note_id || page.id,
        note_title: page.text,
        modified_date: page.date,
        TYPE: page.type === CHAPTER_TYPE.SHARED ? DRAG_TYPE.SHARED_PAGE : DRAG_TYPE.PAGE,
        note_channel_id: NoteRepository$1.chId,
        USER_ID: NoteRepository$1.USER_ID,
        shared_user_id: NoteRepository$1.USER_ID,
        shared_room_name: NoteRepository$1.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
        messenger_id: targetTalkChId
      };
    });
    this.createSharePage(targetList).then(function () {
      ChapterStore.getNoteChapterList();
      NoteStore.setIsDragging(false);
    });
  },

  /**
   * NoteMeta에서도 쓰이고, context menu에서 복구할 챕터가 없을 때도 필요해서 store로 옮김
   * 나중에 필요한 인자가 더 생길까 대비해 object로 인자 받음
   */
  restorePageLogic: function restorePageLogic(_ref5) {
    var _this16 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
      var chapterId, pageId, toastTxt, res;
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              chapterId = _ref5.chapterId, pageId = _ref5.pageId, toastTxt = _ref5.toastTxt;
              _context25.next = 3;
              return _this16.restorePage(pageId, chapterId);

            case 3:
              res = _context25.sent;

              if (res.resultMsg === 'Success') {
                NoteStore.setModalInfo(null);
                Promise.all([ChapterStore.getNoteChapterList(), PageStore.fetchCurrentPageData(pageId)]).then(function () {
                  if (_this16.currentPageId === pageId) {
                    ChapterStore.setCurrentChapterInfo(chapterId, false);

                    _this16.setCurrentPageId(pageId);
                  }

                  NoteStore.setToastText(toastTxt);
                  NoteStore.setIsVisibleToast(true);
                });
              }

            case 5:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    }))();
  },
  editCancel: function editCancel() {
    if (EditorStore.isSearch) {
      var _EditorStore$tinymce8;

      var instance = new Mark((_EditorStore$tinymce8 = EditorStore.tinymce) === null || _EditorStore$tinymce8 === void 0 ? void 0 : _EditorStore$tinymce8.getBody());
      instance.unmark();
    }

    if (EditorStore.isUploading) {
      EditorStore.uploadingFileallCancel();
      return;
    }

    this.handleSave();
    Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('teespace-core')); }).then(function (module) {
      try {
        var logEvent = module.logEvent;
        logEvent('note', 'clickModifyBtn');
      } catch (e) {
        console.error(e);
      }
    }).catch(function (e) {
      return console.error(e);
    });
    NoteStore.setToastText(i18n.t('NOTE_SAVE_PAGE'));
    NoteStore.setIsVisibleToast(true);
  }
});

var _require = require('axios'),
    axios = _require.default;

var NoteRepository = /*#__PURE__*/function () {
  // WS_ID = 'e4920305-cc0b-45ea-85ba-79e0b8514491';
  // CH_TYPE = 'CHN0003';
  // USER_ID = 'd9f5eda3-6cc1-4bed-b727-bdf43bbae2b7';
  function NoteRepository(url) {
    _classCallCheck(this, NoteRepository);

    this.URL = 'http://222.122.67.176:8080/CMS/Note';
    this.FILE_URL = process.env.REACT_APP_DEV_SERVICE_DOMAIN;
    this.WS_ID = '';
    this.CH_TYPE = 'CHN0003';
    this.USER_ID = '';
    this.chId = '';
    this.USER_NAME = '';
    this.USER_EMAIL = '';
    this.URL = url || process.env.REACT_APP_DEV_SERVICE_DOMAIN;
  }

  _createClass(NoteRepository, [{
    key: "setWsId",
    value: function setWsId(targetWsId) {
      this.WS_ID = targetWsId;
    }
  }, {
    key: "setChannelId",
    value: function setChannelId(targetchId) {
      this.chId = targetchId;
    }
  }, {
    key: "setUserId",
    value: function setUserId(targetUserId) {
      this.USER_ID = targetUserId;
    }
  }, {
    key: "setUserName",
    value: function setUserName(targetUserName) {
      this.USER_NAME = targetUserName;
    }
  }, {
    key: "setUserEmail",
    value: function setUserEmail(targetUserEmail) {
      this.USER_EMAIL = targetUserEmail;
    }
  }, {
    key: "getChannelId",
    value: function getChannelId() {
      return this.chId;
    }
  }, {
    key: "getChapterList",
    value: function () {
      var _getChapterList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(chId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return teespaceCore.API.get("note-api/noteChapter?action=List&note_channel_id=".concat(chId));

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw Error(JSON.stringify(_context.t0));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getChapterList(_x) {
        return _getChapterList.apply(this, arguments);
      }

      return getChapterList;
    }()
  }, {
    key: "getNoteInfoList",
    value: function () {
      var _getNoteInfoList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(noteId) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return teespaceCore.API.Get("note-api/noteinfo?action=List&note_id=".concat(noteId, "&note_channel_id=").concat(this.chId));

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw Error(JSON.stringify(_context2.t0));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function getNoteInfoList(_x2) {
        return _getNoteInfoList.apply(this, arguments);
      }

      return getNoteInfoList;
    }()
  }, {
    key: "getNoteTagList",
    value: function getNoteTagList(noteId) {
      return teespaceCore.API.Get("note-api/tag?action=List&note_id=".concat(noteId, "&t=").concat(new Date().getTime().toString()));
    } // 태그 컨텐츠 관련
    // getAllTagList() {
    //   return API.Get(
    //     `note-api/alltag?action=List&note_channel_id=${this.chId}`
    //   )
    // }

  }, {
    key: "getAllSortedTagList",
    value: function () {
      var _getAllSortedTagList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return teespaceCore.API.Get("note-api/tagSort?action=List&note_channel_id=".concat(this.chId, "&t=").concat(new Date().getTime().toString()));

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAllSortedTagList() {
        return _getAllSortedTagList.apply(this, arguments);
      }

      return getAllSortedTagList;
    }()
  }, {
    key: "getTagNoteList",
    value: function getTagNoteList(tagId) {
      return teespaceCore.API.Get("note-api/tagnote?action=List&tag_id=".concat(tagId, "&USER_ID=").concat(this.USER_ID, "\n      &note_channel_id=").concat(this.chId));
    }
  }, {
    key: "getChapterChildren",
    value: function () {
      var _getChapterChildren = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(chapterId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return teespaceCore.API.Get("note-api/note?action=List&note_channel_id=".concat(this.chId, "&parent_notebook=").concat(chapterId));

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                throw Error(JSON.stringify(_context4.t0));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function getChapterChildren(_x3) {
        return _getChapterChildren.apply(this, arguments);
      }

      return getChapterChildren;
    }()
  }, {
    key: "getChapterInfoList",
    value: function getChapterInfoList(chapterId) {
      return teespaceCore.API.Get("note-api/chaptershare?action=List&id=".concat(chapterId));
    }
  }, {
    key: "getChapterColor",
    value: function getChapterColor(chapterId) {
      return teespaceCore.API.get("note-api/chaptershare?action=List&id=".concat(chapterId));
    }
  }, {
    key: "updateChapterColor",
    value: function () {
      var _updateChapterColor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(chapterId, targetColor) {
        var _yield$API$put, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return teespaceCore.API.put("note-api/notebooks?action=Update", {
                  dto: {
                    id: chapterId,
                    ws_id: this.WS_ID,
                    color: targetColor
                  }
                });

              case 3:
                _yield$API$put = _context5.sent;
                data = _yield$API$put.data;
                return _context5.abrupt("return", data);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                throw Error(JSON.stringify(_context5.t0));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function updateChapterColor(_x4, _x5) {
        return _updateChapterColor.apply(this, arguments);
      }

      return updateChapterColor;
    }()
  }, {
    key: "getChapterText",
    value: function getChapterText(chapterId) {
      return teespaceCore.API.get("note-api/chaptershare?action=List&id=".concat(chapterId));
    }
  }, {
    key: "createChapter",
    value: function () {
      var _createChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(chapterTitle, chapterColor) {
        var _yield$API$post, data;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return teespaceCore.API.post("note-api/langauge/".concat(NoteStore.i18nLanguage, "/notebooks"), {
                  dto: {
                    id: '',
                    ws_id: this.WS_ID,
                    note_channel_id: this.chId,
                    text: chapterTitle,
                    children: [],
                    type: CHAPTER_TYPE.NOTEBOOK,
                    USER_ID: this.USER_ID,
                    user_name: this.USER_NAME,
                    color: chapterColor
                  }
                });

              case 3:
                _yield$API$post = _context6.sent;
                data = _yield$API$post.data;
                return _context6.abrupt("return", data);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                throw Error(JSON.stringify(_context6.t0));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 8]]);
      }));

      function createChapter(_x6, _x7) {
        return _createChapter.apply(this, arguments);
      }

      return createChapter;
    }()
  }, {
    key: "createRestoreChapter",
    value: function () {
      var _createRestoreChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(chapterTitle, chapterColor) {
        var _yield$API$post2, data;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return teespaceCore.API.post("note-api/children/".concat('none', "/notebooks"), {
                  dto: {
                    id: '',
                    ws_id: this.WS_ID,
                    note_channel_id: this.chId,
                    text: chapterTitle,
                    children: [],
                    type: CHAPTER_TYPE.NOTEBOOK,
                    USER_ID: this.USER_ID,
                    user_name: this.USER_NAME,
                    color: chapterColor
                  }
                });

              case 3:
                _yield$API$post2 = _context7.sent;
                data = _yield$API$post2.data;
                return _context7.abrupt("return", data);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                throw Error(JSON.stringify(_context7.t0));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 8]]);
      }));

      function createRestoreChapter(_x8, _x9) {
        return _createRestoreChapter.apply(this, arguments);
      }

      return createRestoreChapter;
    }()
  }, {
    key: "deleteChapter",
    value: function () {
      var _deleteChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(chapterList) {
        var _this = this;

        var _yield$API$post3, data;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                chapterList.forEach(function (chapter) {
                  chapter.USER_ID = _this.USER_ID;
                  chapter.ws_id = _this.WS_ID;
                  chapter.note_channel_id = _this.chId;
                });
                _context8.prev = 1;
                _context8.next = 4;
                return teespaceCore.API.post("note-api/notebook?action=Delete", {
                  dto: {
                    notbookList: chapterList
                  }
                });

              case 4:
                _yield$API$post3 = _context8.sent;
                data = _yield$API$post3.data;
                return _context8.abrupt("return", data);

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](1);
                throw Error(JSON.stringify(_context8.t0));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 9]]);
      }));

      function deleteChapter(_x10) {
        return _deleteChapter.apply(this, arguments);
      }

      return deleteChapter;
    }()
  }, {
    key: "renameChapter",
    value: function () {
      var _renameChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(chapterId, chapterTitle, color) {
        var _yield$API$put2, data;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return teespaceCore.API.put("note-api/notebooks?action=Update", {
                  dto: {
                    USER_ID: this.USER_ID,
                    color: color,
                    id: chapterId,
                    ws_id: this.WS_ID,
                    note_channel_id: this.chId,
                    parent_notebook: '',
                    text: chapterTitle,
                    user_name: this.USER_NAME
                  }
                });

              case 3:
                _yield$API$put2 = _context9.sent;
                data = _yield$API$put2.data;
                return _context9.abrupt("return", data);

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                throw Error(JSON.stringify(_context9.t0));

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 8]]);
      }));

      function renameChapter(_x11, _x12, _x13) {
        return _renameChapter.apply(this, arguments);
      }

      return renameChapter;
    }()
  }, {
    key: "createPage",
    value: function () {
      var _createPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(pageName, pageContent, chapterId) {
        var today;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                today = new Date();
                return _context10.abrupt("return", teespaceCore.API.Post("note-api/note", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    modified_date: "".concat(today.getFullYear(), ".").concat(today.getMonth() + 1, ".").concat(today.getDate(), " ").concat(today.getHours(), ":").concat(today.getMinutes()),
                    USER_ID: this.USER_ID,
                    note_channel_id: this.chId,
                    user_name: this.USER_NAME,
                    note_title: pageName,
                    note_content: pageContent ? pageContent : '',
                    is_edit: this.USER_ID,
                    parent_notebook: chapterId
                  }
                }));

              case 5:
                _context10.prev = 5;
                _context10.t0 = _context10["catch"](0);
                throw Error(JSON.stringify(_context10.t0));

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 5]]);
      }));

      function createPage(_x14, _x15, _x16) {
        return _createPage.apply(this, arguments);
      }

      return createPage;
    }()
  }, {
    key: "deletePage",
    value: function () {
      var _deletePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(pageList) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                pageList.forEach(function (page) {
                  page.USER_ID = _this2.USER_ID;
                  page.WS_ID = _this2.WS_ID;
                  page.note_channel_id = _this2.chId;
                  page.user_name = _this2.USER_NAME;
                });
                _context11.prev = 1;
                _context11.next = 4;
                return teespaceCore.API.Post("note-api/note?action=Delete", {
                  dto: {
                    noteList: pageList
                  }
                });

              case 4:
                return _context11.abrupt("return", _context11.sent);

              case 7:
                _context11.prev = 7;
                _context11.t0 = _context11["catch"](1);
                throw Error(JSON.stringify(_context11.t0));

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 7]]);
      }));

      function deletePage(_x17) {
        return _deletePage.apply(this, arguments);
      }

      return deletePage;
    }()
  }, {
    key: "renamePage",
    value: function () {
      var _renamePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(pageId, pageTitle, chapterId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return teespaceCore.API.Put("note-api/note?action=Update", {
                  dto: {
                    CH_TYPE: 'CHN0003',
                    TYPE: 'RENAME',
                    USER_ID: this.USER_ID,
                    WS_ID: this.WS_ID,
                    note_channel_id: this.chId,
                    note_id: pageId,
                    note_title: pageTitle,
                    parent_notebook: chapterId
                  }
                });

              case 3:
                return _context12.abrupt("return", _context12.sent);

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12["catch"](0);
                throw Error(JSON.stringify(_context12.t0));

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 6]]);
      }));

      function renamePage(_x18, _x19, _x20) {
        return _renamePage.apply(this, arguments);
      }

      return renamePage;
    }()
  }, {
    key: "movePage",
    value: function () {
      var _movePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(pageId, chapterId) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return teespaceCore.API.Put("note-api/note?action=Update", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    note_channel_id: this.chId,
                    note_id: pageId,
                    parent_notebook: chapterId,
                    user_name: this.USER_NAME,
                    USER_ID: this.USER_ID,
                    TYPE: 'MOVE'
                  }
                });

              case 3:
                return _context13.abrupt("return", _context13.sent);

              case 6:
                _context13.prev = 6;
                _context13.t0 = _context13["catch"](0);
                throw Error(JSON.stringify(_context13.t0));

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 6]]);
      }));

      function movePage(_x21, _x22) {
        return _movePage.apply(this, arguments);
      }

      return movePage;
    }()
  }, {
    key: "editStart",
    value: function () {
      var _editStart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(noteId, chapterId) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return teespaceCore.API.post("note-api/note?action=Update", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    USER_ID: this.USER_ID,
                    note_channel_id: this.chId,
                    user_name: this.USER_NAME,
                    note_id: noteId,
                    is_edit: this.USER_ID,
                    parent_notebook: chapterId,
                    TYPE: 'EDIT_START'
                  }
                });

              case 3:
                return _context14.abrupt("return", _context14.sent);

              case 6:
                _context14.prev = 6;
                _context14.t0 = _context14["catch"](0);
                throw Error(JSON.stringify(_context14.t0));

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 6]]);
      }));

      function editStart(_x23, _x24) {
        return _editStart.apply(this, arguments);
      }

      return editStart;
    }()
  }, {
    key: "editDone",
    value: function () {
      var _editDone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(updateDto) {
        var today;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                today = new Date();
                updateDto.dto.WS_ID = this.WS_ID;
                updateDto.dto.note_channel_id = this.chId;
                updateDto.dto.USER_ID = this.USER_ID;
                updateDto.dto.CH_TYPE = this.CH_TYPE;
                updateDto.dto.user_name = this.USER_NAME;
                updateDto.dto.modified_date = "".concat(today.getFullYear(), ".").concat(today.getMonth() + 1, ".").concat(today.getDate(), " ").concat(today.getHours(), ":").concat(today.getMinutes());
                _context15.prev = 7;
                _context15.next = 10;
                return teespaceCore.API.post("note-api/note?action=Update", updateDto);

              case 10:
                return _context15.abrupt("return", _context15.sent);

              case 13:
                _context15.prev = 13;
                _context15.t0 = _context15["catch"](7);
                throw Error(JSON.stringify(_context15.t0));

              case 16:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[7, 13]]);
      }));

      function editDone(_x25) {
        return _editDone.apply(this, arguments);
      }

      return editDone;
    }()
  }, {
    key: "nonEdit",
    value: function () {
      var _nonEdit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(noteId, chapterId) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                _context16.next = 3;
                return teespaceCore.API.post("note-api/note?action=Update", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    USER_ID: this.USER_ID,
                    note_channel_id: this.chId,
                    note_id: noteId,
                    is_edit: '',
                    parent_notebook: chapterId,
                    TYPE: 'NONEDIT',
                    user_name: this.USER_NAME
                  }
                });

              case 3:
                return _context16.abrupt("return", _context16.sent);

              case 6:
                _context16.prev = 6;
                _context16.t0 = _context16["catch"](0);
                throw Error(JSON.stringify(_context16.t0));

              case 9:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[0, 6]]);
      }));

      function nonEdit(_x26, _x27) {
        return _nonEdit.apply(this, arguments);
      }

      return nonEdit;
    }()
  }, {
    key: "createTag",
    value: function () {
      var _createTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(targetList) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return teespaceCore.API.post("note-api/tag", {
                  dto: {
                    tagList: targetList
                  }
                });

              case 3:
                return _context17.abrupt("return", _context17.sent);

              case 6:
                _context17.prev = 6;
                _context17.t0 = _context17["catch"](0);
                throw Error(JSON.stringify(_context17.t0));

              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[0, 6]]);
      }));

      function createTag(_x28) {
        return _createTag.apply(this, arguments);
      }

      return createTag;
    }()
  }, {
    key: "deleteTag",
    value: function () {
      var _deleteTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(targetList) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return teespaceCore.API.post("note-api/tag?action=Delete", {
                  dto: {
                    tagList: targetList
                  }
                });

              case 3:
                return _context18.abrupt("return", _context18.sent);

              case 6:
                _context18.prev = 6;
                _context18.t0 = _context18["catch"](0);
                throw Error(JSON.stringify(_context18.t0));

              case 9:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[0, 6]]);
      }));

      function deleteTag(_x29) {
        return _deleteTag.apply(this, arguments);
      }

      return deleteTag;
    }()
  }, {
    key: "updateTag",
    value: function () {
      var _updateTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(targetList) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                _context19.next = 3;
                return teespaceCore.API.post("note-api/tag?action=Update", {
                  dto: {
                    tagList: targetList
                  }
                });

              case 3:
                return _context19.abrupt("return", _context19.sent);

              case 6:
                _context19.prev = 6;
                _context19.t0 = _context19["catch"](0);
                throw Error(JSON.stringify(_context19.t0));

              case 9:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[0, 6]]);
      }));

      function updateTag(_x30) {
        return _updateTag.apply(this, arguments);
      }

      return updateTag;
    }()
  }, {
    key: "storageFileDeepCopy",
    value: function () {
      var _storageFileDeepCopy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(fileId) {
        var targetSRC;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                targetSRC = "Storage/StorageFile?action=Copy&Type=Deep";
                _context20.prev = 1;
                _context20.next = 4;
                return teespaceCore.API.put(targetSRC, {
                  dto: {
                    workspace_id: this.WS_ID,
                    channel_id: this.chId,
                    storageFileInfo: {
                      user_id: this.USER_ID,
                      file_id: fileId
                    }
                  }
                });

              case 4:
                return _context20.abrupt("return", _context20.sent);

              case 7:
                _context20.prev = 7;
                _context20.t0 = _context20["catch"](1);
                throw Error(JSON.stringify(_context20.t0));

              case 10:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[1, 7]]);
      }));

      function storageFileDeepCopy(_x31) {
        return _storageFileDeepCopy.apply(this, arguments);
      }

      return storageFileDeepCopy;
    }()
  }, {
    key: "createUploadMeta",
    value: function () {
      var _createUploadMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(dto) {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                _context21.next = 3;
                return teespaceCore.API.post('note-api/noteFile', dto);

              case 3:
                return _context21.abrupt("return", _context21.sent);

              case 6:
                _context21.prev = 6;
                _context21.t0 = _context21["catch"](0);
                throw Error(JSON.stringify(_context21.t0));

              case 9:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[0, 6]]);
      }));

      function createUploadMeta(_x32) {
        return _createUploadMeta.apply(this, arguments);
      }

      return createUploadMeta;
    }()
  }, {
    key: "createUploadStorage",
    value: function () {
      var _createUploadStorage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(fileId, file, onUploadProgress) {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                _context22.next = 3;
                return teespaceCore.API.post("Storage/StorageFile?action=Create&fileID=" + fileId + '&workspaceID=' + this.WS_ID + '&channelID=' + this.chId + '&userID=' + this.USER_ID, file, {
                  headers: {
                    'content-type': 'multipart/form-data'
                  },
                  xhrFields: {
                    withCredentials: true
                  },
                  onUploadProgress: onUploadProgress
                });

              case 3:
                return _context22.abrupt("return", _context22.sent);

              case 6:
                _context22.prev = 6;
                _context22.t0 = _context22["catch"](0);
                throw Error(JSON.stringify(_context22.t0));

              case 9:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this, [[0, 6]]);
      }));

      function createUploadStorage(_x33, _x34, _x35) {
        return _createUploadStorage.apply(this, arguments);
      }

      return createUploadStorage;
    }()
    /**
     *
     * @param {*} file
     * @param {*} fileName
     * @param {*} fileExtension
     * @param {*} onUploadProgress
     * @param {*} cancelSource
     */

  }, {
    key: "uploadFileGW",
    value: function () {
      var _uploadFileGW = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(file, fileName, fileExtension, location, onUploadProgress, cancelSource) {
        var uploadFile;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                uploadFile = new File([file], "".concat(fileName, ".").concat(fileExtension));
                _context23.next = 3;
                return teespaceCore.API.post("/gateway-api/upload?channel=" + this.chId + '&name=' + fileName + '&ext=' + fileExtension + '&location=' + location + '&dir=' + "".concat(PageStore.pageInfo.id), uploadFile, {
                  headers: {
                    'content-type': 'multipart/form-data'
                  },
                  xhrFields: {
                    withCredentials: true
                  },
                  onUploadProgress: onUploadProgress,
                  cancelToken: cancelSource.token
                });

              case 3:
                return _context23.abrupt("return", _context23.sent);

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function uploadFileGW(_x36, _x37, _x38, _x39, _x40, _x41) {
        return _uploadFileGW.apply(this, arguments);
      }

      return uploadFileGW;
    }()
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(deleteFileId) {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                _context24.next = 3;
                return teespaceCore.API.post("note-api/noteFile?action=Delete", {
                  dto: {
                    type: 'hard',
                    file: [{
                      channel: this.chId,
                      file_parent_id: this.chId,
                      file_id: deleteFileId,
                      is_folder: 'N'
                    }]
                  }
                });

              case 3:
                return _context24.abrupt("return", _context24.sent);

              case 6:
                _context24.prev = 6;
                _context24.t0 = _context24["catch"](0);
                throw Error(JSON.stringify(_context24.t0));

              case 9:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this, [[0, 6]]);
      }));

      function deleteFile(_x42) {
        return _deleteFile.apply(this, arguments);
      }

      return deleteFile;
    }()
  }, {
    key: "deleteAllFile",
    value: function deleteAllFile(fileList) {
      var _this3 = this;

      var deleteFileList = [];

      if (fileList) {
        fileList.map(function (file) {
          deleteFileList.push({
            channel: _this3.chId,
            file_parent_id: _this3.chId,
            file_id: file.file_id,
            is_folder: 'N'
          });
        });
        return teespaceCore.API.post("drive-api/files?action=Delete", {
          dto: {
            type: 'hard',
            file: deleteFileList
          }
        });
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "createShareChapter",
    value: function createShareChapter(chapterList) {
      return teespaceCore.API.post("note-api/chaptershare", {
        dto: {
          notbookList: chapterList
        }
      });
    }
  }, {
    key: "createSharePage",
    value: function createSharePage(pageList) {
      return teespaceCore.API.post("note-api/noteshare", {
        dto: {
          noteList: pageList
        }
      });
    }
  }, {
    key: "getSearchList",
    value: function () {
      var _getSearchList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(searchKey) {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.prev = 0;
                _context25.next = 3;
                return teespaceCore.API.post("note-api/noteSearch?action=List", {
                  dto: {
                    note_channel_id: this.chId,
                    text: searchKey
                  }
                });

              case 3:
                return _context25.abrupt("return", _context25.sent);

              case 6:
                _context25.prev = 6;
                _context25.t0 = _context25["catch"](0);
                throw Error(JSON.stringify(_context25.t0));

              case 9:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this, [[0, 6]]);
      }));

      function getSearchList(_x43) {
        return _getSearchList.apply(this, arguments);
      }

      return getSearchList;
    }()
  }, {
    key: "createFileMeta",
    value: function () {
      var _createFileMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(targetList) {
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return teespaceCore.API.post("note-api/noteFileMeta", {
                  dto: {
                    fileList: targetList
                  }
                });

              case 2:
                return _context26.abrupt("return", _context26.sent);

              case 3:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      }));

      function createFileMeta(_x44) {
        return _createFileMeta.apply(this, arguments);
      }

      return createFileMeta;
    }()
  }, {
    key: "throwPage",
    value: function () {
      var _throwPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(pageList) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                // pageList -> pageId 리스트
                pageList.forEach(function (page) {
                  page.USER_ID = _this4.USER_ID;
                  page.WS_ID = _this4.WS_ID;
                  page.note_channel_id = _this4.chId;
                  page.parent_notebook = null;
                });
                _context27.prev = 1;
                _context27.next = 4;
                return teespaceCore.API.post("note-api/noteRecycleBin?action=Update", {
                  dto: {
                    noteList: pageList
                  }
                });

              case 4:
                return _context27.abrupt("return", _context27.sent);

              case 7:
                _context27.prev = 7;
                _context27.t0 = _context27["catch"](1);
                throw Error(JSON.stringify(_context27.t0));

              case 10:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, null, [[1, 7]]);
      }));

      function throwPage(_x45) {
        return _throwPage.apply(this, arguments);
      }

      return throwPage;
    }()
  }, {
    key: "restorePage",
    value: function () {
      var _restorePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(pageList) {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                // pageList -> pageId 리스트, chapterId 리스트
                // [{note_id: asdf, parent_notebook : asdf} ... ]
                pageList.forEach(function (page) {
                  page.note_channel_id = _this5.chId;
                  page.USER_ID = _this5.USER_ID;
                  page.WS_ID = _this5.WS_ID;
                });
                _context28.prev = 1;
                _context28.next = 4;
                return teespaceCore.API.post("note-api/noteRecycleBin?action=Update", {
                  dto: {
                    noteList: pageList
                  }
                });

              case 4:
                return _context28.abrupt("return", _context28.sent);

              case 7:
                _context28.prev = 7;
                _context28.t0 = _context28["catch"](1);
                throw Error(JSON.stringify(_context28.t0));

              case 10:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, null, [[1, 7]]);
      }));

      function restorePage(_x46) {
        return _restorePage.apply(this, arguments);
      }

      return restorePage;
    }()
  }, {
    key: "getStorageVolume",
    value: function () {
      var _getStorageVolume = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.prev = 0;
                _context29.next = 3;
                return teespaceCore.API.get("/Storage/StorageVolumeDomain");

              case 3:
                return _context29.abrupt("return", _context29.sent);

              case 6:
                _context29.prev = 6;
                _context29.t0 = _context29["catch"](0);
                throw Error(JSON.stringify(_context29.t0));

              case 9:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, null, [[0, 6]]);
      }));

      function getStorageVolume() {
        return _getStorageVolume.apply(this, arguments);
      }

      return getStorageVolume;
    }()
  }, {
    key: "getDuflicateFile",
    value: function () {
      var _getDuflicateFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(fileName, fileExt, pageId) {
        var query;
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                query = "/drive-api/files/".concat(pageId, "?");
                query += "type=0";
                query += "&name=".concat(fileName);
                if (fileExt) query += "&ext=".concat(fileExt);
                _context30.prev = 4;
                _context30.next = 7;
                return teespaceCore.API.get(query);

              case 7:
                return _context30.abrupt("return", _context30.sent);

              case 10:
                _context30.prev = 10;
                _context30.t0 = _context30["catch"](4);
                throw Error(JSON.stringify(_context30.t0));

              case 13:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, null, [[4, 10]]);
      }));

      function getDuflicateFile(_x47, _x48, _x49) {
        return _getDuflicateFile.apply(this, arguments);
      }

      return getDuflicateFile;
    }()
  }, {
    key: "getRecycleBinAllFile",
    value: function () {
      var _getRecycleBinAllFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.prev = 0;
                _context31.next = 3;
                return teespaceCore.API.get("note-api/noteRecycleBinFile?action=List&note_channel_id=".concat(this.chId));

              case 3:
                return _context31.abrupt("return", _context31.sent);

              case 6:
                _context31.prev = 6;
                _context31.t0 = _context31["catch"](0);
                throw Error(JSON.stringify(_context31.t0));

              case 9:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this, [[0, 6]]);
      }));

      function getRecycleBinAllFile() {
        return _getRecycleBinAllFile.apply(this, arguments);
      }

      return getRecycleBinAllFile;
    }()
  }, {
    key: "bookmarkPage",
    value: function () {
      var _bookmarkPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(pageId) {
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.prev = 0;
                _context32.next = 3;
                return teespaceCore.API.post("note-api/bookmark", {
                  dto: {
                    note_id: pageId
                  }
                });

              case 3:
                return _context32.abrupt("return", _context32.sent);

              case 6:
                _context32.prev = 6;
                _context32.t0 = _context32["catch"](0);
                throw Error(JSON.stringify(_context32.t0));

              case 9:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, null, [[0, 6]]);
      }));

      function bookmarkPage(_x50) {
        return _bookmarkPage.apply(this, arguments);
      }

      return bookmarkPage;
    }()
  }, {
    key: "unbookmarkPage",
    value: function () {
      var _unbookmarkPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(pageId) {
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.prev = 0;
                _context33.next = 3;
                return teespaceCore.API.post("note-api/bookmark?action=Delete", {
                  dto: {
                    note_id: pageId
                  }
                });

              case 3:
                return _context33.abrupt("return", _context33.sent);

              case 6:
                _context33.prev = 6;
                _context33.t0 = _context33["catch"](0);
                throw Error(JSON.stringify(_context33.t0));

              case 9:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, null, [[0, 6]]);
      }));

      function unbookmarkPage(_x51) {
        return _unbookmarkPage.apply(this, arguments);
      }

      return unbookmarkPage;
    }()
  }, {
    key: "getbookmarkList",
    value: function () {
      var _getbookmarkList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(chId) {
        var query;
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                query = chId ? "&note_channel_id=".concat(chId) : '';
                _context34.prev = 1;
                _context34.next = 4;
                return teespaceCore.API.get("note-api/bookmark?action=List".concat(query));

              case 4:
                return _context34.abrupt("return", _context34.sent);

              case 7:
                _context34.prev = 7;
                _context34.t0 = _context34["catch"](1);
                throw Error(JSON.stringify(_context34.t0));

              case 10:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, null, [[1, 7]]);
      }));

      function getbookmarkList(_x52) {
        return _getbookmarkList.apply(this, arguments);
      }

      return getbookmarkList;
    }()
  }, {
    key: "getRecentList",
    value: function () {
      var _getRecentList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(num) {
        var query;
        return regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                query = num ? "&rownum=".concat(num) : '';
                _context35.prev = 1;
                _context35.next = 4;
                return teespaceCore.API.get("note-api/noteRecent?action=List&note_channel_id=".concat(this.chId).concat(query));

              case 4:
                return _context35.abrupt("return", _context35.sent);

              case 7:
                _context35.prev = 7;
                _context35.t0 = _context35["catch"](1);
                throw Error(JSON.stringify(_context35.t0));

              case 10:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this, [[1, 7]]);
      }));

      function getRecentList(_x53) {
        return _getRecentList.apply(this, arguments);
      }

      return getRecentList;
    }()
  }]);

  return NoteRepository;
}();

var NoteRepository$1 = new NoteRepository();

var NoteMeta = {
  // antd modal prop 설정
  openModal: function openModal(type) {
    return this.setModalConfig(type);
  },
  // antd modal prop 만들기
  setModalConfig: function setModalConfig(type) {
    var initialConfig = {
      targetComponent: 'Modal',
      modalName: type
    };

    switch (type) {
      case 'viewInfo':
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: i18n.t('NOTE_DELIVER_CONTEXT_MENU_04'),
          className: 'viewInfoModal'
        });

      case 'forward':
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: i18n.t('NOTE_CONTEXT_MENU_01'),
          className: 'forwardModal'
        });

      case 'restore':
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: i18n.t('NOTE_BIN_RESTORE_01'),
          className: 'restoreModal'
        });

      default:
        return;
    }
  },
  // core - Modal prop 설정
  openMessage: function openMessage(type, data) {
    return this.setMessageConfig(this.setMessageInfoConfig(type, data), this.setEventConfig(type, data));
  },
  // Modal(core - Message) prop 만들기
  setMessageConfig: function setMessageConfig(dialogType, eventList) {
    var buttonList = []; // type, shape, onClick, text

    eventList.map(function (event, index) {
      dialogType.btns[index].onClick = event;
      buttonList.push(dialogType.btns[index]);
    });
    return {
      targetComponent: 'Message',
      modalName: dialogType.modalName,
      // openMessage의 인자인 type
      type: dialogType.type,
      title: dialogType.title,
      subTitle: dialogType.subtitle,
      btns: buttonList
    };
  },
  setEventConfig: function setEventConfig(type, data) {
    var eventList = [];

    switch (type) {
      case 'sharedChapter':
      case 'chapter':
      case 'draggedChapter':
        // 삭제 함수 추가
        eventList.push( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
            var _yield$ChapterStore$d, chapterId, pageId;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    e.stopPropagation();
                    _context.next = 3;
                    return ChapterStore.deleteNoteChapter(data);

                  case 3:
                    _yield$ChapterStore$d = _context.sent;
                    chapterId = _yield$ChapterStore$d.chapterId;
                    pageId = _yield$ChapterStore$d.pageId;
                    NoteStore.updateDragData(chapterId, pageId);

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setIsDragging(false);
          NoteStore.setModalInfo(null);
        });
        break;

      case 'sharedPage':
      case 'deletePage':
        // 페이지 영구 삭제
        eventList.push(function (e) {
          e.stopPropagation();
          PageStore.deleteNotePage(data);
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'uploadingFiles':
        eventList.push(function (e) {
          e.stopPropagation();

          if (EditorStore.isSearch) {
            var _EditorStore$tinymce;

            var instance = new Mark__default['default']((_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : _EditorStore$tinymce.getBody());
            instance.unmark();
          }

          if (EditorStore.isUploading) {
            EditorStore.uploadingFileallCancel();
            EditorStore.setProcessCount(0);
            return;
          }

          PageStore.handleSave();
          Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('teespace-core')); }).then(function (module) {
            try {
              var logEvent = module.logEvent;
              logEvent('note', 'clickModifyBtn');
            } catch (e) {
              console.error(e);
            }
          }).catch(function (e) {
            return console.error(e);
          });
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'nonDeletableSinglePage':
      case 'nonDeletableMultiPage':
      case 'editingPage':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadSpaceFullSize':
      case 'fileOpenMail':
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
      // NoteFile을 import해야해서 NoeModal component에서 이벤트 추가함

      case 'failUploadByFileNameLen':
        eventList.push(function (e) {});
        break;

      case 'recover':
        eventList.push( /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
            var _EditorStore$tinymce2, _PageStore$recoverInf, id, note_content, _EditorStore$tinymce3;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // 복구 로직
                    e.stopPropagation();
                    _context2.prev = 1;
                    _PageStore$recoverInf = PageStore.recoverInfo, id = _PageStore$recoverInf.id, note_content = _PageStore$recoverInf.note_content;

                    if (id) {
                      _context2.next = 5;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 5:
                    NoteStore.setShowPage(true);
                    if (NoteStore.layoutState === 'collapse') NoteStore.setTargetLayout('Content'); // [todo] 이게 왜 ChapterStore에 있을까

                    ChapterStore.setLoadingPageInfo(true);
                    _context2.next = 10;
                    return PageStore.fetchCurrentPageData(id);

                  case 10:
                    ChapterStore.setLoadingPageInfo(false);
                    /*
                     * 내용 로컬 스토리지에 저장된 내용으로 바꾸기
                     * 여길 탄 다음에 tinymce가 init되는 경우가 대부분=> editor.on('init')에서 setContent해야함
                     * 이 경우 recoverinfo 초기화하면 안 됨
                     */

                    if ((_EditorStore$tinymce2 = EditorStore.tinymce) !== null && _EditorStore$tinymce2 !== void 0 && _EditorStore$tinymce2.getBody()) {
                      (_EditorStore$tinymce3 = EditorStore.tinymce) === null || _EditorStore$tinymce3 === void 0 ? void 0 : _EditorStore$tinymce3.setContent(note_content);
                      PageStore.setRecoverInfo({});
                    }

                    _context2.next = 17;
                    break;

                  case 14:
                    _context2.prev = 14;
                    _context2.t0 = _context2["catch"](1);
                    console.log('err', _context2.t0);

                  case 17:
                    _context2.prev = 17;
                    NoteStore.setModalInfo(null);
                    return _context2.finish(17);

                  case 20:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[1, 14, 17, 20]]);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
        eventList.push( /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
            var _PageStore$recoverInf2, parentId, id, dto;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    e.stopPropagation();
                    _PageStore$recoverInf2 = PageStore.recoverInfo, parentId = _PageStore$recoverInf2.parentId, id = _PageStore$recoverInf2.id;

                    if (id) {
                      _context3.next = 4;
                      break;
                    }

                    return _context3.abrupt("return");

                  case 4:
                    NoteStore.setShowPage(true);
                    if (NoteStore.layoutState === 'collapse') NoteStore.setTargetLayout('Content'); // 복구 원하지 않으면 로컬 스토리지에서 지우자

                    localStorage.removeItem("Note_autosave_".concat(NoteStore.notechannel_id, "_").concat(id));
                    NoteStore.setModalInfo(null); // 여기 안에서 fetchCurrentPageData한다
                    // current chapterId 없으면 에디터를 안 띄워서 await 필요

                    ChapterStore.setLoadingPageInfo(true);
                    _context3.next = 11;
                    return PageStore.noneEdit(id, parentId);

                  case 11:
                    dto = _context3.sent;
                    _context3.next = 14;
                    return PageStore.fetchCurrentPageData(id);

                  case 14:
                    ChapterStore.setLoadingPageInfo(false);
                    PageStore.setRecoverInfo({});

                  case 16:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        }());
        break;

      case 'emptyRecycleBin':
        eventList.push( /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
            var _yield$EditorStore$ge, target;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    e.stopPropagation();
                    _context4.next = 3;
                    return EditorStore.getRecycleBinAllFile();

                  case 3:
                    _yield$EditorStore$ge = _context4.sent;
                    target = _yield$EditorStore$ge.fileList;
                    PageStore.deleteNotePage(data);

                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }());
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'createChapter':
        eventList.push(function (e) {
          NoteStore.setShowDialog(false);
          NoteStore.setModalInfo(null);
          ChapterStore.setChapterTitle('');
        });
        eventList.push( /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    ChapterStore.getChapterRandomColor();
                    _context5.next = 3;
                    return ChapterStore.createNoteChapter();

                  case 3:
                    // logEvent('note', 'clickNewChapterBtn');
                    NoteStore.setShowDialog(false);
                    NoteStore.setModalInfo(null);

                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          return function (_x5) {
            return _ref5.apply(this, arguments);
          };
        }());
        break;

      case 'renameChapter':
        eventList.push(function (e) {
          NoteStore.setShowDialog(false);
          NoteStore.setModalInfo(null);
          ChapterStore.setChapterTitle('');
        });
        eventList.push( /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
            var id, color;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    id = data.id, color = data.color;
                    _context6.next = 3;
                    return ChapterStore.renameNoteChapter({
                      id: id,
                      title: ChapterStore.chapterNewTitle,
                      color: color
                    });

                  case 3:
                    NoteStore.setShowDialog(false);
                    NoteStore.setLongPress(false);
                    NoteStore.setModalInfo(null);
                    ChapterStore.selectedChapters.clear();
                    ChapterStore.setChapterTitle('');

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));

          return function (_x6) {
            return _ref6.apply(this, arguments);
          };
        }());
        break;

      case 'deleteChapter':
        eventList.push(function () {
          NoteStore.setModalInfo(null);
        });
        eventList.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return ChapterStore.deleteNoteChapter(data);

                case 2:
                  NoteStore.setModalInfo(null);
                  NoteStore.setLongPress(false);
                  ChapterStore.selectedChapters.clear();

                case 5:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        })));
        break;

      case 'deleteSharedPage':
        eventList.push(function () {
          NoteStore.setModalInfo(null);
        });
        eventList.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return PageStore.deleteNotePage(data);

                case 2:
                  _context8.next = 4;
                  return ChapterStore.fetchChapterInfo(ChapterStore.chapterInfo.id);

                case 4:
                  NoteStore.setModalInfo(null);
                  NoteStore.setLongPress(false);
                  PageStore.selectedPages.clear();

                case 7:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        })));
        break;

      case 'emptySharedPage':
        eventList.push(function () {
          NoteStore.setModalInfo(null);
        });
        eventList.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return ChapterStore.deleteNoteChapter(data);

                case 2:
                  NoteStore.setModalInfo(null);
                  NoteStore.setLongPress(false);
                  PageStore.selectedPages.clear();
                  NoteStore.setTargetLayout('LNB');

                case 6:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        })));
        break;
    }

    return eventList;
  },
  setBtns: function setBtns(type) {
    var shape = 'default';
    var defaultBtn1 = {
      type: 'solid',
      shape: shape,
      text: i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_03')
    }; // 버튼 한 개일 때랑 text 바꿔서 사용

    var defaultBtn2 = {
      type: 'default',
      shape: shape,
      text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05')
    };

    switch (type) {
      case 'delete': // chapter랑 page

      case 'deletePage':
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')
        }), defaultBtn2];

      case 'recover':
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: i18n.t('NOTE_CONTEXT_MENU_02')
        }), defaultBtn2];

      case 'nonDeletableSinglePage':
      case 'nonDeletableMultiPage':
      case 'editingPage':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadSpaceFullSize':
      case 'failUploadByFileNameLen':
        return [defaultBtn1];

      case 'uploadingFiles':
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: i18n.t('NOTE_PAGE_LIST_ADD_NEW_PGE_04')
        }), defaultBtn2];

      case 'createChapter':
        // mobile
        return [defaultBtn2, _objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: '생성'
        })];

      case 'renameChapter':
        return [defaultBtn2, _objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: '변경'
        })];

      case 'deleteChapter':
      case 'deleteSharedPage':
      case 'emptySharedPage':
        return [defaultBtn2, _objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: '삭제'
        })];

      default:
        return;
    }
  },
  setMessageInfoConfig: function setMessageInfoConfig(type, data) {
    // const userName = '';
    var fileName = EditorStore.deleteFileName; // type이 error면 빨간색, error말고 다른 색이면 보라색

    var dialogType = {
      type: 'default',
      modalName: type,
      title: '',
      subtitle: '',
      btns: []
    };

    switch (type) {
      case 'chapter':
      case 'draggedChapter':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_06');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_07');
        dialogType.btns = this.setBtns('delete');
        break;

      case 'page':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_03');
        dialogType.btns = this.setBtns('delete');
        break;

      case 'sharedChapter':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_06');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_09');
        dialogType.btns = this.setBtns('delete');
        break;

      case 'sharedPage':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_03');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_09');
        dialogType.btns = this.setBtns('delete');
        break;

      case 'deletePage':
        // 페이지 영구 삭제
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_BIN_06');
        dialogType.subtitle = i18n.t('NOTE_BIN_07');
        dialogType.btns = this.setBtns('delete');
        break;

      case 'nonDeletableSinglePage':
        dialogType.type = 'info';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', {
          userName: data.name
        });
        dialogType.btns = this.setBtns(type);
        break;

      case 'nonDeletableMultiPage':
        dialogType.type = 'info';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_08', {
          count: data.count
        });
        dialogType.btns = this.setBtns(type);
        break;

      case 'titleDuplicate':
        dialogType.title = i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_02');
        dialogType.btns = this.setBtns(type);
        break;

      case 'duplicateTagName':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ADD_TAG_01');
        dialogType.btns = this.setBtns(type);
        break;

      case 'editingPage':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_CANT_EDIT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', {
          userName: data.name
        });
        dialogType.btns = this.setBtns('editingPage');
        break;

      case 'deletedPage':
        dialogType.title = i18n.t('NOTE_META_TAG_03');
        dialogType.btns = this.setBtns('deletedPage');
        break;

      case 'multiFileSomeFail':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_06');
        dialogType.subtitle = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_07', {
          uploadCnt: EditorStore.totalUploadLength,
          failCnt: EditorStore.failCount
        });
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;

      case 'sizefailUpload':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_04');
        dialogType.btns = this.setBtns('sizefailUpload');
        break;

      case 'failUpload':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_05');
        dialogType.btns = this.setBtns('failUpload');
        break;

      case 'failUploadByFileNameLen':
        dialogType.title = i18n.t('DRIVE_UPLOAD_BTN_04');
        dialogType.btns = this.setBtns(type);
        break;

      case 'uploadingFiles':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_08');
        dialogType.subtitle = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_09');
        dialogType.btns = this.setBtns(type);
        break;

      case 'recover':
        dialogType.title = i18n.t('NOTE_RECOVER_DATA_01');
        dialogType.btns = this.setBtns(type);
        break;

      case 'emptyRecycleBin':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_BIN_08', {
          num: data.pageList.length
        });
        dialogType.subtitle = i18n.t('NOTE_BIN_07');
        dialogType.btns = this.setBtns('delete');
        break;

      case 'failUploadSpaceFullSize':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_03');
        dialogType.btns = this.setBtns(type);
        break;
      // mobile

      case 'createChapter':
        dialogType.title = '새 챕터 생성';
        dialogType.btns = this.setBtns(type);
        break;

      case 'renameChapter':
        dialogType.title = '챕터 이름 변경';
        dialogType.btns = this.setBtns(type);
        break;

      case 'deleteChapter':
        dialogType.type = 'error';
        dialogType.title = "".concat(data.chapterList.length, "\uAC1C\uC758 \uCC55\uD130\uB97C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?");
        dialogType.subtitle = '전달받은 페이지는 영구 삭제됩니다.';
        dialogType.btns = this.setBtns(type);
        break;

      case 'deleteSharedPage':
      case 'emptySharedPage':
        dialogType.type = 'error';
        dialogType.title = "".concat(type === 'deleteSharedPage' ? data.pageList.length : data.count, "\uAC1C\uC758 \uD398\uC774\uC9C0\uB97C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?");
        dialogType.subtitle = '전달받은 페이지는 영구 삭제됩니다.';
        dialogType.btns = this.setBtns(type);
        break;
    }

    return dialogType;
  }
};

var handleWebsocket = function handleWebsocket(message) {
  var EVENT_TYPE = {
    CHAPTER_CREATE: 'CHAPTERCREATE',
    CHAPTER_DELETE: 'CHAPTERDELETE',
    CHAPTER_RENAME: 'CHAPTERRENAME',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    EDIT_START: 'EDIT',
    EDIT_DONE: 'EDITDONE',
    NONEDIT: 'NONEDIT',
    MOVE: 'MOVE',
    THROW: 'THROW',
    RESTORE: 'RESTORE'
  };

  if (!message.NOTI_ETC) {
    console.warn('NOTE_ETC is empty');
    return;
  }

  console.log(message.NOTI_ETC);
  var loginUserId = NoteRepository$1.USER_ID;

  var _message$NOTI_ETC$spl = message.NOTI_ETC.split(','),
      _message$NOTI_ETC$spl2 = _slicedToArray(_message$NOTI_ETC$spl, 5),
      eventType = _message$NOTI_ETC$spl2[0],
      targetId = _message$NOTI_ETC$spl2[1],
      parentId = _message$NOTI_ETC$spl2[2],
      targetUserId = _message$NOTI_ETC$spl2[3],
      device = _message$NOTI_ETC$spl2[4];

  switch (eventType) {
    case EVENT_TYPE.CHAPTER_CREATE:
    case EVENT_TYPE.CHAPTER_RENAME:
    case EVENT_TYPE.CREATE:
      if (device === 'PC' && targetUserId === loginUserId) return;
      ChapterStore.getNoteChapterList();
      break;

    case EVENT_TYPE.CHAPTER_DELETE:
      if (device === 'PC' && targetUserId === loginUserId) return;
      ChapterStore.getNoteChapterList();

      if (ChapterStore.getCurrentChapterId() === targetId) {
        setTimeout(function () {
          var _ChapterStore$chapter;

          if (((_ChapterStore$chapter = ChapterStore.chapterList) === null || _ChapterStore$chapter === void 0 ? void 0 : _ChapterStore$chapter.length) > 0) {
            var _firstChapter$childre;

            var firstChapter = ChapterStore.chapterList[0];
            ChapterStore.setCurrentChapterInfo(firstChapter.id);
            PageStore.fetchCurrentPageData(((_firstChapter$childre = firstChapter.children) === null || _firstChapter$childre === void 0 ? void 0 : _firstChapter$childre.length) > 0 ? firstChapter.children[0].id : '');
          } else NoteStore.setShowPage(false);
        }, 200);
      }

      break;

    case EVENT_TYPE.DELETE:
      if (device === 'PC' && targetUserId === loginUserId) return;

      if (PageStore.pageInfo.id === targetId) {
        ChapterStore.getChapterFirstPage(ChapterStore.getCurrentChapterId());
      }

      ChapterStore.getNoteChapterList();
      break;

    case EVENT_TYPE.UPDATE:
    case EVENT_TYPE.EDIT_DONE:
    case EVENT_TYPE.NONEDIT:
    case EVENT_TYPE.EDIT_START:
      if (device === 'PC' && targetUserId === loginUserId) return;

      if (PageStore.pageInfo.id === targetId) {
        PageStore.fetchCurrentPageData(PageStore.pageInfo.id);
      }

      ChapterStore.getNoteChapterList();
      break;

    case EVENT_TYPE.MOVE:
      if (device === 'PC' && targetUserId === loginUserId) return;

      if (PageStore.pageInfo.id === targetId) {
        PageStore.fetchCurrentPageData(PageStore.pageInfo.id);
        NoteStore.updateDragData(parentId, targetId);
      }

      ChapterStore.getNoteChapterList();
      break;

    case EVENT_TYPE.THROW:
    case EVENT_TYPE.RESTORE:
      if (device === 'PC' && targetUserId === loginUserId) return;

      if (targetId.split(':').includes(PageStore.pageInfo.id)) {
        PageStore.fetchCurrentPageData(PageStore.pageInfo.id);
      }

      ChapterStore.getNoteChapterList();
      break;
  }
};

var NoteStore = mobx.observable({
  metaTagInfo: {
    isOpen: false,
    type: '',
    id: ''
  },
  loadingNoteApp: true,
  workspaceId: '',
  notechannel_id: '',
  user_id: '',
  userName: '',
  userEmail: '',
  noteFileList: [],
  showPage: true,
  // editor 보고 있는지 태그 보고 있는지
  layoutState: '',
  targetLayout: null,
  isHoveredFoldBtnLine: false,
  isContentExpanded: false,
  showModal: false,
  showDialog: false,
  modalInfo: {},
  LNBChapterCoverRef: '',
  isDragging: false,
  draggedType: '',
  draggedItems: [],
  draggedOffset: {},
  sharedInfo: {},
  shareNoteType: '',
  shareContent: '',
  shareArrays: {},
  // deprecated
  isMailShare: false,
  mailShareFileObjs: [],
  mailReceiver: [],
  isVisibleToast: false,
  toastText: '',
  i18nLanguage: 'ko-KR',
  i18nKeyMap: '',
  isExporting: false,
  appType: 'wapl',
  isLongPress: false,
  isWeb: true,
  setAppType: function setAppType(appType) {
    this.appType = appType;
  },
  setMetaTagInfo: function setMetaTagInfo(_ref) {
    var _ref$isOpen = _ref.isOpen,
        isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? '' : _ref$type,
        _ref$id = _ref.id,
        id = _ref$id === void 0 ? '' : _ref$id;
    this.metaTagInfo = {
      isOpen: isOpen,
      type: type,
      id: id
    };
  },
  getLoadingNoteApp: function getLoadingNoteApp() {
    return this.loadingNoteApp;
  },
  setLoadingNoteApp: function setLoadingNoteApp(isLoading) {
    this.loadingNoteApp = isLoading;
  },
  setWsId: function setWsId(wsId) {
    NoteRepository$1.setWsId(wsId);
    this.workspaceId = wsId;
  },
  getWsId: function getWsId() {
    return this.workspaceId;
  },
  setChannelId: function setChannelId(chId) {
    NoteRepository$1.setChannelId(chId);
    this.notechannel_id = chId;
  },
  getChannelId: function getChannelId() {
    return this.notechannel_id;
  },
  setUserId: function setUserId(userId) {
    NoteRepository$1.setUserId(userId);
    this.user_id = userId;
  },
  setUserName: function setUserName(userName) {
    NoteRepository$1.setUserName(userName);
    this.userName = userName;
  },
  setUserEmail: function setUserEmail(userEmail) {
    NoteRepository$1.setUserEmail(userEmail);
    this.userEmail = userEmail;
  },
  getUserId: function getUserId() {
    return this.user_id;
  },
  setIsWeb: function setIsWeb(flag) {
    this.isWeb = flag;
  },
  // todo : mobile이랑 ptask에 알리고 parameter를 객체로 바꾸기
  init: function init(roomId, channelId, userId, userName, userEmail, callback) {
    this.setWsId(roomId);
    this.setChannelId(channelId);
    this.setUserId(userId);
    this.setUserName(userName);
    this.setUserEmail(userEmail);
    if (typeof callback === 'function') callback();
  },
  // metaTagInfo는 init하면 안 됨
  initVariables: function initVariables() {
    // A방에서 lnb 검색 후 B방으로 이동했을 때 init 필요
    ChapterStore.initSearchVar();
    ChapterStore.setCurrentChapterInfo('', false); //chapterId = '', isRecycleBin=false

    PageStore.fetchCurrentPageData('');
    ChapterStore.setChapterList([]);
    TagStore.setNoteTagList([]);
    TagStore.setTagPanelLoading(true); // 처음에 '태그 없습니다' 페이지가 보이지 않아야 함!
    // 룸 변경시 전에 방문했던 룸의 태그를 잠깐 보여줘서 init

    TagStore.setAllSortedTagList([]);
    TagStore.setSortedTagList([]);
    EditorStore.setIsSearch(false);
    this.setIsContentExpanded(false);
    this.setShowPage(true);
    this.setIsMailShare(false);
  },
  setI18nLanguage: function setI18nLanguage(lang) {
    this.i18nLanguage = lang;
  },
  addWWMSHandler: function addWWMSHandler() {
    if (teespaceCore.WWMS.handlers.get('CHN0003') === undefined) teespaceCore.WWMS.addHandler('CHN0003', 'NoteWWMSHandler', handleWebsocket);
  },
  getNoteFileList: function getNoteFileList() {
    return this.noteFileList;
  },
  setShowPage: function setShowPage(showPage) {
    // true or false
    this.showPage = showPage;

    if (showPage === false) {
      ChapterStore.setCurrentChapterInfo('', false); // chapterId='', isRecycleBin=false

      PageStore.fetchCurrentPageData('');
    }
  },
  setLayoutState: function setLayoutState(state) {
    this.layoutState = state;
  },
  // lnb, content 중 하나
  setTargetLayout: function setTargetLayout(target) {
    this.targetLayout = target;
  },
  setIsHoveredFoldBtnLine: function setIsHoveredFoldBtnLine(isHovered) {
    this.isHoveredFoldBtnLine = isHovered;
  },
  // [ims 249594] 에디터 full 화면 -> 축소 버튼 누르면, 현재 상태 체크하지 않고 무조건 false로 바꾸기
  setIsContentExpanded: function setIsContentExpanded(isContentExpanded) {
    this.isContentExpanded = isContentExpanded;
  },
  toggleIsContentExpanded: function toggleIsContentExpanded() {
    this.isContentExpanded = !this.isContentExpanded;
  },
  setShareNoteType: function setShareNoteType(noteType) {
    this.shareNoteType = noteType;
  },
  setShareContent: function setShareContent(content) {
    this.shareContent = content;
  },
  setShareArrays: function setShareArrays(arrs) {
    // deprecated
    this.shareArrays = arrs;
  },
  setIsMailShare: function setIsMailShare(isMailShare) {
    this.isMailShare = isMailShare;
  },
  setMailShareFileObjs: function setMailShareFileObjs(fileObjs) {
    this.mailShareFileObjs = fileObjs;
  },
  setMailReceiver: function setMailReceiver(receivers) {
    this.mailReceiver = receivers;
  },
  setIsVisibleToast: function setIsVisibleToast(isVisible) {
    this.isVisibleToast = isVisible;
  },
  setToastText: function setToastText(text) {
    this.toastText = text;
  },
  setShowModal: function setShowModal(showModal) {
    this.showModal = showModal;
  },
  setShowDialog: function setShowDialog(showDialog) {
    this.showDialog = showDialog;
  },
  setLongPress: function setLongPress(flag) {
    this.isLongPress = flag;
  },
  // { type, title, subTitle, buttons }
  setModalInfo: function setModalInfo(modalType, data) {
    var isWeb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (['viewInfo', 'forward', 'restore'].includes(modalType)) this.modalInfo = NoteMeta.openModal(modalType);else if (!modalType) this.modalInfo = {};else this.modalInfo = NoteMeta.openMessage(modalType, data);

    if (modalType) {
      if (isWeb) this.setShowModal(true);
    } else if (this.showModal) {
      this.setShowModal(false);
    } else {
      this.setShowDialog(false);
    }
  },
  handleSharedInfo: function handleSharedInfo(type, id) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var noteInfo, roomName, sharedRoom, _sharedRoom, _yield$UserStore$getP, displayName;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(type === 'chapter')) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return ChapterStore.getChapterInfoList(id);

            case 3:
              _context.t0 = _context.sent;
              _context.next = 9;
              break;

            case 6:
              _context.next = 8;
              return PageStore.getNoteInfoList(id);

            case 8:
              _context.t0 = _context.sent;

            case 9:
              noteInfo = _context.t0;
              roomName = '';
              _context.next = 13;
              return teespaceCore.RoomStore.getRoom(noteInfo.shared_room_name);

            case 13:
              sharedRoom = _context.sent;

              if (!(sharedRoom !== undefined)) {
                _context.next = 18;
                break;
              }

              roomName = (sharedRoom === null || sharedRoom === void 0 ? void 0 : sharedRoom.customName) !== '' ? sharedRoom === null || sharedRoom === void 0 ? void 0 : sharedRoom.customName : sharedRoom === null || sharedRoom === void 0 ? void 0 : sharedRoom.name;
              _context.next = 22;
              break;

            case 18:
              _context.next = 20;
              return teespaceCore.RoomStore.fetchRoomForShare({
                roomId: noteInfo.shared_room_name
              });

            case 20:
              _sharedRoom = _context.sent;
              roomName = _sharedRoom === null || _sharedRoom === void 0 ? void 0 : _sharedRoom.name;

            case 22:
              _context.next = 24;
              return teespaceCore.UserStore.getProfile({
                userId: noteInfo.shared_user_id
              });

            case 24:
              _yield$UserStore$getP = _context.sent;
              displayName = _yield$UserStore$getP.displayName;
              _this.sharedInfo = {
                sharedRoomName: sharedRoom !== null && sharedRoom !== void 0 && sharedRoom.isMyRoom ? displayName : roomName || i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01'),
                sharedUserName: displayName || i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01'),
                sharedDate: !noteInfo.created_date ? get12HourFormat(noteInfo.shared_date, true) : get12HourFormat(noteInfo.created_date, true)
              };

              _this.setModalInfo('viewInfo');

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getTargetChId: function getTargetChId(targetRoomId, chType) {
    return teespaceCore.RoomStore.getChannelIds({
      roomId: targetRoomId
    })[chType ? chType : NoteRepository$1.CH_TYPE];
  },
  getSharedRoomName: function getSharedRoomName() {
    return teespaceCore.RoomStore.getRoom(NoteRepository$1.WS_ID).isMyRoom ? this.userName : teespaceCore.RoomStore.getRoom(NoteRepository$1.WS_ID).name;
  },
  shareNote: function shareNote(selectedItems) {
    var _this2 = this;

    selectedItems.userArray.forEach( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return teespaceCore.RoomStore.createRoom({
                  creatorId: _this2.user_id,
                  userList: [{
                    userId: user.friendId || user.id
                  }]
                });

              case 2:
                res = _context2.sent;
                if (_this2.shareNoteType === 'chapter') ChapterStore.createNoteShareChapter(res.roomId, [_this2.shareContent]);else if (_this2.shareNoteType === 'page') PageStore.createNoteSharePage(res.roomId, [_this2.shareContent]);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    selectedItems.roomArray.forEach(function (room) {
      if (!room.isVisible) {
        teespaceCore.RoomStore.activateRoom({
          roomId: room.id,
          myUserId: NoteRepository$1.USER_ID
        });
      }

      if (_this2.shareNoteType === 'chapter') ChapterStore.createNoteShareChapter(room.id, [_this2.shareContent]);else if (_this2.shareNoteType === 'page') PageStore.createNoteSharePage(room.id, [_this2.shareContent]);
    });
  },
  setLNBChapterCoverRef: function setLNBChapterCoverRef(ref) {
    this.LNBChapterCoverRef = ref;
  },
  setIsDragging: function setIsDragging(isDragging) {
    this.isDragging = isDragging;
  },
  setDraggedType: function setDraggedType(type) {
    this.draggedType = type;
  },
  setDraggedItems: function setDraggedItems(items) {
    this.draggedItems = items;
  },
  setDraggedOffset: function setDraggedOffset(offset) {
    this.draggedOffset = offset;
  },
  setIsExporting: function setIsExporting(isExporting) {
    this.isExporting = isExporting;
  },
  disableScroll: function disableScroll(e) {
    e.preventDefault();
  },
  getSearchList: function getSearchList(searchKey) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$NoteRepository, dto;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.getSearchList(searchKey);

            case 2:
              _yield$NoteRepository = _context3.sent;
              dto = _yield$NoteRepository.data.dto;
              return _context3.abrupt("return", dto);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  floatToast: function floatToast(message) {
    this.setToastText(message);
    this.setIsVisibleToast(true);
  },
  updateDragData: function updateDragData(chapterId, pageId) {
    ChapterStore.setDragData(new Map([[chapterId, ChapterStore.createDragData(chapterId)]]));
    PageStore.setDragData(new Map([[pageId, PageStore.createDragData(pageId, chapterId)]]));
  },
  handleClickOutside: function handleClickOutside(type) {
    var Store = type === 'Chapter' ? ChapterStore : PageStore;
    var Id = type === 'Chapter' ? Store.currentChapterId : Store.currentPageId;
    Store.setIsCtrlKeyDown(false);

    if (!Id) {
      Store.clearDragData();
      return;
    }

    var currentDragData = Store.dragData.get(Id) || Store.createDragData(Id, type === 'Page' ? ChapterStore.currentChapterId : null);
    Store.setDragData(new Map([[Id, currentDragData]]));
  }
});

var useNoteStore = function useNoteStore() {
  return {
    NoteStore: NoteStore,
    ChapterStore: ChapterStore,
    TagStore: TagStore,
    PageStore: PageStore,
    EditorStore: EditorStore
  };
};

var initApp = function initApp() {
  teespaceCore.i18nInit(i18n);
};

exports.initI18n = initApp;
exports.useNoteStore = useNoteStore;
