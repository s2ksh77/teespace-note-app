import { observable, toJS } from 'mobx';
import { API, UserStore, WWMS, RoomStore } from 'teespace-core';
import { isNil, isEmpty } from 'ramda';
import moment from 'moment-timezone';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Mark from 'mark.js';

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
                return API.get("note-api/noteChapter?action=List&note_channel_id=".concat(chId));

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
                return API.Get("note-api/noteinfo?action=List&note_id=".concat(noteId, "&note_channel_id=").concat(this.chId));

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
      return API.Get("note-api/tag?action=List&note_id=".concat(noteId, "&t=").concat(new Date().getTime().toString()));
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
                return API.Get("note-api/tagSort?action=List&note_channel_id=".concat(this.chId, "&t=").concat(new Date().getTime().toString()));

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
      return API.Get("note-api/tagnote?action=List&tag_id=".concat(tagId, "&USER_ID=").concat(this.USER_ID, "\n      &note_channel_id=").concat(this.chId));
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
                return API.Get("note-api/note?action=List&note_channel_id=".concat(this.chId, "&parent_notebook=").concat(chapterId));

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
      return API.Get("note-api/chaptershare?action=List&id=".concat(chapterId));
    }
  }, {
    key: "getChapterColor",
    value: function getChapterColor(chapterId) {
      return API.get("note-api/chaptershare?action=List&id=".concat(chapterId));
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
                return API.put("note-api/notebooks?action=Update", {
                  dto: {
                    id: chapterId,
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
        }, _callee5, null, [[0, 8]]);
      }));

      function updateChapterColor(_x4, _x5) {
        return _updateChapterColor.apply(this, arguments);
      }

      return updateChapterColor;
    }()
  }, {
    key: "getChapterText",
    value: function getChapterText(chapterId) {
      return API.get("note-api/chaptershare?action=List&id=".concat(chapterId));
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
                return API.post("note-api/notebooks", {
                  dto: {
                    id: '',
                    note_channel_id: this.chId,
                    text: chapterTitle,
                    children: [],
                    type: 'notebook',
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
    key: "deleteChapter",
    value: function () {
      var _deleteChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(chapterId) {
        var _yield$API$delete, data;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return API.delete("note-api/notebook?action=Delete&id=".concat(chapterId, "&note_channel_id=").concat(this.chId, "&USER_ID=").concat(this.USER_ID));

              case 3:
                _yield$API$delete = _context7.sent;
                data = _yield$API$delete.data;
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

      function deleteChapter(_x8) {
        return _deleteChapter.apply(this, arguments);
      }

      return deleteChapter;
    }()
  }, {
    key: "renameChapter",
    value: function () {
      var _renameChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(chapterId, chapterTitle, color) {
        var _yield$API$put2, data;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return API.put("note-api/notebooks?action=Update", {
                  dto: {
                    USER_ID: this.USER_ID,
                    color: color,
                    id: chapterId,
                    note_channel_id: this.chId,
                    parent_notebook: '',
                    text: chapterTitle,
                    user_name: this.USER_NAME
                  }
                });

              case 3:
                _yield$API$put2 = _context8.sent;
                data = _yield$API$put2.data;
                return _context8.abrupt("return", data);

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);
                throw Error(JSON.stringify(_context8.t0));

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 8]]);
      }));

      function renameChapter(_x9, _x10, _x11) {
        return _renameChapter.apply(this, arguments);
      }

      return renameChapter;
    }()
  }, {
    key: "createPage",
    value: function () {
      var _createPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(pageName, pageContent, chapterId) {
        var today;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                today = new Date();
                return _context9.abrupt("return", API.Post("note-api/note", {
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
                _context9.prev = 5;
                _context9.t0 = _context9["catch"](0);
                throw Error(JSON.stringify(_context9.t0));

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 5]]);
      }));

      function createPage(_x12, _x13, _x14) {
        return _createPage.apply(this, arguments);
      }

      return createPage;
    }()
  }, {
    key: "deletePage",
    value: function () {
      var _deletePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(pageList) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                pageList.forEach(function (page) {
                  page.USER_ID = _this.USER_ID;
                  page.WS_ID = _this.WS_ID;
                  page.note_channel_id = _this.chId;
                  page.user_name = _this.USER_NAME;
                });
                _context10.prev = 1;
                _context10.next = 4;
                return API.Post("note-api/note?action=Delete", {
                  dto: {
                    noteList: pageList
                  }
                });

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10["catch"](1);
                throw Error(JSON.stringify(_context10.t0));

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[1, 7]]);
      }));

      function deletePage(_x15) {
        return _deletePage.apply(this, arguments);
      }

      return deletePage;
    }()
  }, {
    key: "renamePage",
    value: function () {
      var _renamePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(pageId, pageTitle, chapterId) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return API.Put("note-api/note?action=Update", {
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
                return _context11.abrupt("return", _context11.sent);

              case 6:
                _context11.prev = 6;
                _context11.t0 = _context11["catch"](0);
                throw Error(JSON.stringify(_context11.t0));

              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 6]]);
      }));

      function renamePage(_x16, _x17, _x18) {
        return _renamePage.apply(this, arguments);
      }

      return renamePage;
    }()
  }, {
    key: "movePage",
    value: function () {
      var _movePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(pageId, chapterId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return API.Put("note-api/note?action=Update", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    note_id: pageId,
                    parent_notebook: chapterId,
                    user_name: this.USER_NAME,
                    USER_ID: this.USER_ID,
                    TYPE: 'MOVE'
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

      function movePage(_x19, _x20) {
        return _movePage.apply(this, arguments);
      }

      return movePage;
    }()
  }, {
    key: "editStart",
    value: function () {
      var _editStart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(noteId, chapterId) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return API.post("note-api/note?action=Update", {
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

      function editStart(_x21, _x22) {
        return _editStart.apply(this, arguments);
      }

      return editStart;
    }()
  }, {
    key: "editDone",
    value: function () {
      var _editDone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(updateDto) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                updateDto.dto.WS_ID = this.WS_ID;
                updateDto.dto.note_channel_id = this.chId;
                updateDto.dto.USER_ID = this.USER_ID;
                updateDto.dto.CH_TYPE = this.CH_TYPE;
                updateDto.dto.user_name = this.USER_NAME;
                _context14.prev = 5;
                _context14.next = 8;
                return API.post("note-api/note?action=Update", updateDto);

              case 8:
                return _context14.abrupt("return", _context14.sent);

              case 11:
                _context14.prev = 11;
                _context14.t0 = _context14["catch"](5);
                throw Error(JSON.stringify(_context14.t0));

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[5, 11]]);
      }));

      function editDone(_x23) {
        return _editDone.apply(this, arguments);
      }

      return editDone;
    }()
  }, {
    key: "nonEdit",
    value: function () {
      var _nonEdit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(noteId, chapterId, userName, userId) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return API.post("note-api/note?action=Update", {
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
                return _context15.abrupt("return", _context15.sent);

              case 6:
                _context15.prev = 6;
                _context15.t0 = _context15["catch"](0);
                throw Error(JSON.stringify(_context15.t0));

              case 9:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[0, 6]]);
      }));

      function nonEdit(_x24, _x25, _x26, _x27) {
        return _nonEdit.apply(this, arguments);
      }

      return nonEdit;
    }()
  }, {
    key: "createTag",
    value: function () {
      var _createTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(targetList) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                _context16.next = 3;
                return API.post("note-api/tag", {
                  dto: {
                    tagList: targetList
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
        }, _callee16, null, [[0, 6]]);
      }));

      function createTag(_x28) {
        return _createTag.apply(this, arguments);
      }

      return createTag;
    }()
  }, {
    key: "deleteTag",
    value: function () {
      var _deleteTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(targetList) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return API.post("note-api/tag?action=Delete", {
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

      function deleteTag(_x29) {
        return _deleteTag.apply(this, arguments);
      }

      return deleteTag;
    }()
  }, {
    key: "updateTag",
    value: function () {
      var _updateTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(targetList) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return API.post("note-api/tag?action=Update", {
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

      function updateTag(_x30) {
        return _updateTag.apply(this, arguments);
      }

      return updateTag;
    }()
  }, {
    key: "storageFileDeepCopy",
    value: function () {
      var _storageFileDeepCopy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(fileId) {
        var targetSRC;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                targetSRC = "Storage/StorageFile?action=Copy&Type=Deep";
                _context19.prev = 1;
                _context19.next = 4;
                return API.put(targetSRC, {
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
                return _context19.abrupt("return", _context19.sent);

              case 7:
                _context19.prev = 7;
                _context19.t0 = _context19["catch"](1);
                throw Error(JSON.stringify(_context19.t0));

              case 10:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[1, 7]]);
      }));

      function storageFileDeepCopy(_x31) {
        return _storageFileDeepCopy.apply(this, arguments);
      }

      return storageFileDeepCopy;
    }()
  }, {
    key: "createUploadMeta",
    value: function () {
      var _createUploadMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(dto) {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                _context20.next = 3;
                return API.post("note-api/noteFile", dto);

              case 3:
                return _context20.abrupt("return", _context20.sent);

              case 6:
                _context20.prev = 6;
                _context20.t0 = _context20["catch"](0);
                throw Error(JSON.stringify(_context20.t0));

              case 9:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[0, 6]]);
      }));

      function createUploadMeta(_x32) {
        return _createUploadMeta.apply(this, arguments);
      }

      return createUploadMeta;
    }()
  }, {
    key: "createUploadStorage",
    value: function () {
      var _createUploadStorage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(fileId, file, onUploadProgress) {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                _context21.next = 3;
                return API.post("Storage/StorageFile?action=Create&fileID=" + fileId + '&workspaceID=' + this.WS_ID + '&channelID=' + this.chId + '&userID=' + this.USER_ID, file, {
                  headers: {
                    'content-type': 'multipart/form-data'
                  },
                  xhrFields: {
                    withCredentials: true
                  },
                  onUploadProgress: onUploadProgress
                });

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
        }, _callee21, this, [[0, 6]]);
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
      var _uploadFileGW = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(file, fileName, fileExtension, onUploadProgress, cancelSource) {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return API.post("/gateway-api/upload?user_id=" + this.USER_ID + '&ws_id=' + this.WS_ID + '&ch_id=' + this.chId + '&file_name=' + fileName + '&file_extension=' + fileExtension, file, {
                  headers: {
                    // pplication/x-www-form-urlencoded; charset=UTF-8
                    'content-type': 'multipart/form-data'
                  },
                  xhrFields: {
                    withCredentials: true
                  },
                  onUploadProgress: onUploadProgress,
                  cancelToken: cancelSource.token
                });

              case 2:
                return _context22.abrupt("return", _context22.sent);

              case 3:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function uploadFileGW(_x36, _x37, _x38, _x39, _x40) {
        return _uploadFileGW.apply(this, arguments);
      }

      return uploadFileGW;
    }()
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(deleteFileId) {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.prev = 0;
                _context23.next = 3;
                return API.put("note-api/noteFile?action=Delete", {
                  dto: {
                    workspace_id: this.WS_ID,
                    channel_id: this.chId,
                    storageFileInfo: {
                      user_id: '',
                      file_last_update_user_id: '',
                      file_id: deleteFileId,
                      file_name: '',
                      file_extension: '',
                      file_created_at: '',
                      file_updated_at: '',
                      user_context_1: '',
                      user_context_2: '',
                      user_context_3: ''
                    }
                  }
                });

              case 3:
                return _context23.abrupt("return", _context23.sent);

              case 6:
                _context23.prev = 6;
                _context23.t0 = _context23["catch"](0);
                throw Error(JSON.stringify(_context23.t0));

              case 9:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[0, 6]]);
      }));

      function deleteFile(_x41) {
        return _deleteFile.apply(this, arguments);
      }

      return deleteFile;
    }()
  }, {
    key: "deleteAllFile",
    value: function deleteAllFile(fileList) {
      var deleteFileList = [];

      if (fileList) {
        fileList.map(function (file) {
          return deleteFileList.push(file.file_id);
        });
        return API.put("Storage/StorageFile?action=MultiDelete", {
          dto: {
            workspace_id: this.WS_ID,
            channel_id: this.chId,
            file_id: deleteFileList,
            user_id: this.USER_ID
          }
        });
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "createShareChapter",
    value: function createShareChapter(chapterList) {
      return API.post("note-api/chaptershare", {
        dto: {
          notbookList: chapterList
        }
      });
    }
  }, {
    key: "createSharePage",
    value: function createSharePage(pageList) {
      return API.post("note-api/noteshare", {
        dto: {
          noteList: pageList
        }
      });
    }
  }, {
    key: "getSearchList",
    value: function () {
      var _getSearchList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(searchKey) {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                _context24.next = 3;
                return API.post("note-api/noteSearch?action=List", {
                  dto: {
                    note_channel_id: this.chId,
                    text: searchKey
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

      function getSearchList(_x42) {
        return _getSearchList.apply(this, arguments);
      }

      return getSearchList;
    }()
  }, {
    key: "createFileMeta",
    value: function () {
      var _createFileMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(targetList) {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return API.post("note-api/noteFileMeta", {
                  dto: {
                    fileList: targetList
                  }
                });

              case 2:
                return _context25.abrupt("return", _context25.sent);

              case 3:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      }));

      function createFileMeta(_x43) {
        return _createFileMeta.apply(this, arguments);
      }

      return createFileMeta;
    }()
  }]);

  return NoteRepository;
}();

var NoteRepository$1 = new NoteRepository();

var GlobalVariable = {
  apiKey: "d9c90nmok7sq2sil8caz8cwbm4akovrprt6tc67ac0y7my81",
  editorWrapper: null,
  isBasicPlan: false,
  setEditorWrapper: function setEditorWrapper(ref) {
    this.editorWrapper = ref;
  },
  setIsBasicPlan: function setIsBasicPlan(isBasicPlan) {
    this.isBasicPlan = isBasicPlan;
  }
};

var CHAPTER_TYPE = {
  DEFAULT: 'default',
  NOTEBOOK: 'notebook',
  SHARED_PAGE: 'shared_page',
  SHARED: 'shared'
};

var NoteUtil = {
  // 인코딩 대상 : 알파벳, 0~9의 숫자, -_.!~*' 제외하고 이스케이프 처리(아스키 문자셋으로 변경)
  // encodeURI : 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주한다.
  // 따라서 쿼리스트링 구분자로 사용되는 =,?,&은 인코딩하지 않는다
  // encodeURIComponent는 위 세 개까지 인코딩한다(쿼리스트링의 일부로 간주하여)
  encodeStr: function encodeStr(str) {
    return escape(encodeURIComponent(this.decodeStr(str)));
  },
  decodeStr: function decodeStr(str) {
    var pre = str,
        cur;

    try {
      while (true) {
        cur = decodeURIComponent(pre);
        if (cur === pre) return cur;
        pre = cur;
      }
    } // 노트 내용 중에 url이나 mail이 있으면 URI malformed error가 발생한다. 
    // 이때 decode가 완료된것으로 보이므로 그대로 return한다
    catch (e) {
      return pre;
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
    return moment.tz(date + ' ' + time, zone).unix();
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
        isShared = _ref.isShared;

    if (isShared) {
      this.setLocalSharedFoldedState({
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
    item[idx]["isFolded"] = isFolded;
    localStorage.setItem("NoteSortData_".concat(channelId), JSON.stringify(item));
  },
  setLocalSharedFoldedState: function setLocalSharedFoldedState(_ref2) {
    var channelId = _ref2.channelId,
        chapterId = _ref2.chapterId,
        isFolded = _ref2.isFolded;
    var item = localStorage.getItem("Note_sharedFoldedState_".concat(channelId));
    if (!item) return;
    item = JSON.parse(item, NoteUtil.reviver);
    item.set(chapterId, isFolded);
    localStorage.setItem("Note_sharedFoldedState_".concat(channelId), JSON.stringify(item, NoteUtil.replacer));
  }
};

// isNil : Checks if the input value is null or undefined.
// isEmpty : Returns true if the given value is its type's empty value; false otherwise.

var isFilled = function isFilled(value) {
  return !isNil(value) && !isEmpty(value) ? true : false;
};
// chapter 생성

var checkNotDuplicate = function checkNotDuplicate(targetArr, key, value) {
  return targetArr.find(function (item) {
    return NoteUtil.encodeStr(item[key]) === NoteUtil.encodeStr(value);
  }) ? false : true;
}; // true : valid(중복X), false : invalid(중복)
// 태그 생성 : 대소문자 구분 없이 동일 text 처리

var checkNotDuplicateIgnoreCase = function checkNotDuplicateIgnoreCase(targetArr, key, value) {
  return targetArr.find(function (item) {
    return NoteUtil.encodeStr(item[key].toUpperCase()) === NoteUtil.encodeStr(value.toUpperCase());
  }) ? false : true;
};

var TagStore = observable({
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
  searchStr: "",
  tagPanelLoading: false,
  // tag가 있는 노트 가져오기
  getTagNoteList: function getTagNoteList(tagId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return NoteRepository$1.getTagNoteList(tagId);

            case 2:
              res = _context.sent;
              return _context.abrupt("return", res.status === 200 ? res.data.dto : null);

            case 4:
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
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return NoteRepository$1.getNoteTagList(noteId);

            case 2:
              res = _context2.sent;
              return _context2.abrupt("return", res.status === 200 ? res.data.dto : null);

            case 4:
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
  //isNewTag
  getIsNewTag: function getIsNewTag() {
    return this.isNewTag;
  },
  setIsNewTag: function setIsNewTag(flag) {
    this.isNewTag = flag;
  },
  // tagTest
  getTagText: function getTagText(text) {
    this.tagText = text;
  },
  setSelectTagIndex: function setSelectTagIndex(index) {
    this.selectTagIdx = index;
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
  // removeTagList
  getRemoveTagList: function getRemoveTagList() {
    return this.removeTagList;
  },
  setRemoveTagList: function setRemoveTagList(arr) {
    this.removeTagList = arr;
  },
  appendRemoveTagList: function appendRemoveTagList(tagId) {
    this.removeTagList.push(tagId);
  },
  // updateTagList
  getUpdateTagList: function getUpdateTagList() {
    return this.updateTagList;
  },
  setUpdateTagList: function setUpdateTagList(arr) {
    this.updateTagList = arr;
  },
  appendUpdateTagList: function appendUpdateTagList(tagId, tagText) {
    this.updateTagList.push({
      tag_id: tagId,
      text: tagText
    });
  },
  getCurrentTagId: function getCurrentTagId() {
    return this.currentTagId;
  },
  setCurrentTagId: function setCurrentTagId(tagId) {
    this.currentTagId = tagId;
  },
  getCurrentTagValue: function getCurrentTagValue() {
    return this.currentTagValue;
  },
  setCurrentTagValue: function setCurrentTagValue(value) {
    this.currentTagValue = value;
  },
  getEditTagIndex: function getEditTagIndex() {
    return this.editTagIndex;
  },
  setEditTagIndex: function setEditTagIndex(index) {
    this.editTagIndex = index;
  },
  // editTagValue
  getEditTagValue: function getEditTagValue() {
    return this.editTagValue;
  },
  setEditTagValue: function setEditTagValue(text) {
    this.editTagValue = text;
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
  createTag: function createTag(createTagList, noteId) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var createTagArr, _yield$NoteRepository, dto;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              createTagArr = createTagList.map(function (tag) {
                return {
                  text: tag,
                  note_id: noteId
                };
              });
              _context4.next = 3;
              return NoteRepository$1.createTag(createTagArr);

            case 3:
              _yield$NoteRepository = _context4.sent;
              dto = _yield$NoteRepository.data.dto;

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
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var deleteTagArray, _yield$NoteRepository2, dto;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              deleteTagArray = [];
              deleteTagList.forEach(function (tag) {
                deleteTagArray.push({
                  tag_id: tag,
                  note_id: noteId
                });
              });
              _context5.next = 4;
              return NoteRepository$1.deleteTag(deleteTagArray);

            case 4:
              _yield$NoteRepository2 = _context5.sent;
              dto = _yield$NoteRepository2.data.dto;

              _this2.setRemoveTagList([]);

              return _context5.abrupt("return", dto);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  updateTag: function updateTag(updateTagList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var updateTagArray, _yield$NoteRepository3, dto;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              updateTagArray = updateTagList.map(function (tag) {
                return {
                  tag_id: tag.tag_id,
                  text: tag.text
                };
              });
              _context6.next = 3;
              return NoteRepository$1.updateTag(updateTagArray);

            case 3:
              _yield$NoteRepository3 = _context6.sent;
              dto = _yield$NoteRepository3.data.dto;
              return _context6.abrupt("return", dto);

            case 6:
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
      var createTagArr, _yield$NoteRepository4, dto;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              createTagArr = createTagList.map(function (tag) {
                return {
                  text: NoteUtil.encodeStr(tag),
                  note_id: noteId
                };
              });
              _context7.next = 3;
              return NoteRepository$1.createTag(createTagArr);

            case 3:
              _yield$NoteRepository4 = _context7.sent;
              dto = _yield$NoteRepository4.data.dto;

              _this3.setAddTagList([]);

              return _context7.abrupt("return", dto);

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  updateNoteTag: function updateNoteTag(updateTagList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var updateTagArr, _yield$NoteRepository5, dto;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              updateTagArr = updateTagList.map(function (tag) {
                return {
                  tag_id: tag.tag_id,
                  text: NoteUtil.encodeStr(tag.text)
                };
              });
              _context8.next = 3;
              return NoteRepository$1.updateTag(updateTagArr);

            case 3:
              _yield$NoteRepository5 = _context8.sent;
              dto = _yield$NoteRepository5.data.dto;
              return _context8.abrupt("return", dto);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  fetchNoteTagList: function fetchNoteTagList(noteId) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return NoteRepository$1.getNoteTagList(noteId).then(function (response) {
                if (response.status === 200) {
                  var tagList = response.data.dto;

                  _this4.setNoteTagList(tagList.tagList);
                }
              });

            case 2:
              return _context9.abrupt("return", _this4.notetagList);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  setUpdateNoteTagList: function setUpdateNoteTagList(tagId, tagText) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (_this5.updateTagList.length === 0) {
                _this5.appendUpdateTagList(tagId, tagText);
              } else {
                if (_this5.updateTagList.map(function (item) {
                  return item.tag_id;
                }).indexOf(tagId) === -1) {
                  _this5.appendUpdateTagList(tagId, tagText);
                } else {
                  _this5.updateTagList.forEach(function (item) {
                    if (item.tag_id === tagId) item.text = tagText;
                  });
                }
              }

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  setCurrentTagData: function setCurrentTagData(id, text) {
    this.setCurrentTagId(id);
    this.setCurrentTagValue(text);
  },
  // 처음 TagContainer render할 때 필요한 모든 데이터 fetching 및 processing
  fetchTagData: function fetchTagData() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _this6.setTagPanelLoading(true);

              _context11.t0 = _this6;
              _context11.next = 4;
              return _this6.getAllsortedTagList();

            case 4:
              _context11.t1 = _context11.sent;

              _context11.t0.setAllSortedTagList.call(_context11.t0, _context11.t1);

              _this6.setSortedTagList(_this6.categorizeTagList(_this6.allSortedTagList, false));

              _this6.setTagPanelLoading(false);

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
      var _yield$NoteRepository6, tag_index_list_dto;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return NoteRepository$1.getAllSortedTagList();

            case 2:
              _yield$NoteRepository6 = _context12.sent;
              tag_index_list_dto = _yield$NoteRepository6.data.dto.tag_index_list_dto;
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
    var _this7 = this;

    /**
     * categorizedTagObjs: {
     *   'KOR': { 'T': { tagText1: { tagId: '', note_id: [] }, tagText2: { tagId: '', note_id: [] }, } } }
     *   ...
     * }
     */
    var categorizedTagObjs = {
      'KOR': {},
      'ENG': {},
      'NUM': {},
      'ETC': {}
    };
    allTagsList.forEach(function (item) {
      var upperCaseKey = item.KEY.toUpperCase();

      var tagKeyCategory = _this7.getTagKeyCategory(upperCaseKey);

      var tagList = tagKeyCategory === 'ENG' ? _this7.sortEngTagList(item.tag_indexdto.tagList) : item.tag_indexdto.tagList;
      var tagObjs = isSearching ? _this7.getSearchTagObjs(tagList, _this7.searchStr) : _this7.getTagObjs(tagList);

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
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _this8.setIsSearching(true);

              _this8.setIsSearchLoading(true);

              _this8.setSearchStr(str);

              _context13.t0 = _this8;
              _context13.next = 6;
              return _this8.getAllsortedTagList();

            case 6:
              _context13.t1 = _context13.sent;

              _context13.t0.setAllSortedTagList.call(_context13.t0, _context13.t1);

              _this8.setSortedTagList(_this8.categorizeTagList(_this8.allSortedTagList, true));

              _this8.setIsSearchLoading(false);

            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  setTagNoteSearchResult: function setTagNoteSearchResult(tagId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var _yield$NoteRepository7, noteList;

      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return NoteRepository$1.getTagNoteList(tagId);

            case 2:
              _yield$NoteRepository7 = _context14.sent;
              noteList = _yield$NoteRepository7.data.dto.noteList;
              ChapterStore.setSearchResult({
                chapter: null,
                page: noteList
              });

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }))();
  },
  setEditCreateTag: function setEditCreateTag() {
    var _this9 = this;

    // add Tag List 갱신
    this.addTagList.forEach(function (tag, index) {
      if (tag === TagStore.currentTagValue) _this9.addTagList[index] = TagStore.editTagValue;
    }); // 현재 보여지는 List 갱신

    this.notetagList.forEach(function (tag) {
      if (tag.text === TagStore.currentTagValue) tag.text = TagStore.editTagValue;
    });
  },
  isValidTag: function isValidTag(text) {
    return checkNotDuplicateIgnoreCase(this.notetagList, 'text', text);
  }
});

var _observable;
var EditorStore = observable((_observable = {
  tempTinymce: null,
  contents: '',
  tinymce: null,
  editor: null,
  uploadFile: "",
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
  fileName: "",
  fileSize: "",
  fileExtension: "",
  uploadLength: '',
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
  getTempTinymce: function getTempTinymce() {
    return this.tempTinymce;
  },
  setTempTinymce: function setTempTinymce(editor) {
    this.tempTinymce = editor;
  },
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
  setIsFileFilteredByNameLen: function setIsFileFilteredByNameLen(flag) {
    this.isFileFilteredByNameLen = flag;
  },
  setProcessLength: function setProcessLength(len) {
    this.processLength = len;
  },
  setProcessCount: function setProcessCount(count) {
    this.processCount = count;
  },
  setIsUploading: function setIsUploading(isUploading) {
    this.isUploading = isUploading;
  },
  setUploaderType: function setUploaderType(type) {
    this.uploaderType = type;
  },
  setUploaderRef: function setUploaderRef(ref) {
    this.uploaderRef = ref;
    console.log(toJS(this.uploaderRef));
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
  uploadFileGW: function uploadFileGW(file, file_name, file_extension, handleProcess, cancelSource) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$NoteRepository3, dto;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.uploadFileGW(file, file_name, file_extension, handleProcess, cancelSource);

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
  }
}, _defineProperty(_observable, "uploadFile", function () {
  var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dto, file, index) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            this.createUploadMeta(dto).then(function (dto) {
              if (dto.log_file_id) {
                _this.createUploadStorage(dto.log_file_id, file).then(function (dto) {
                  if (dto.resultMsg === "Success") {
                    var returnID = dto.storageFileInfoList[0].file_id;
                    return returnID;
                  }
                });
              }
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  function uploadFile(_x, _x2, _x3) {
    return _uploadFile.apply(this, arguments);
  }

  return uploadFile;
}()), _defineProperty(_observable, "setDownLoadFileId", function setDownLoadFileId(fileId) {
  this.downloadFileId = fileId;
}), _defineProperty(_observable, "setSaveFileMeta", function setSaveFileMeta(fileId, fileExt, fileName) {
  this.saveFileId = fileId;
  this.saveFileExt = fileExt;
  this.saveFileName = fileName;
}), _defineProperty(_observable, "tempDeleteFile", function tempDeleteFile() {
  this.fileLayoutList.splice(this.deleteFileIndex, 1);
  if (this.fileLayoutList.length === 0) this.setIsFile(false);
}), _defineProperty(_observable, "addDriveFileList", function addDriveFileList(fileInfo) {
  this.driveFileList.push(fileInfo);
}), _defineProperty(_observable, "deleteFile", function deleteFile(deleteId) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var _yield$NoteRepository4, dto;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return NoteRepository$1.deleteFile(deleteId);

          case 2:
            _yield$NoteRepository4 = _context5.sent;
            dto = _yield$NoteRepository4.data.dto;
            return _context5.abrupt("return", dto);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }))();
}), _defineProperty(_observable, "deleteAllFile", function deleteAllFile() {
  var _this2 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return NoteRepository$1.deleteAllFile(_this2.fileList).then(function (response) {
              var dto = response.data.dto;

              if (dto.resultMsg === 'Success') {
                ChapterStore.getNoteChapterList();
              }
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }))();
}), _defineProperty(_observable, "setFileList", function setFileList(fileList) {
  this.fileList = fileList;
  this.checkFile();
}), _defineProperty(_observable, "getFileList", function getFileList() {
  return this.fileList;
}), _defineProperty(_observable, "setFileArray", function setFileArray(filelayoutlist) {
  this.fileLayoutList = filelayoutlist;
}), _defineProperty(_observable, "setIsFile", function setIsFile(flag) {
  this.isFile = flag;
}), _defineProperty(_observable, "checkFile", function checkFile() {
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
      return getUnixTime(b['file_updated_at']) - getUnixTime(a['file_updated_at']);
    });
    this.setFileArray(checkFile);
  }
}), _defineProperty(_observable, "isFileLength", function isFileLength() {
  var temp = this.tempFileLayoutList.filter(function (file) {
    return file.type === 'file';
  }).length;
  var uploaded = this.fileLayoutList.length;
  var totalLength = temp + uploaded;
  if (totalLength === 0) this.setIsFile(false);
}), _defineProperty(_observable, "uploadFileIsImage", function uploadFileIsImage(ext) {
  var ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png'];
  return ImageExt.includes(ext.toLowerCase());
}), _defineProperty(_observable, "readerIsImage", function readerIsImage(type) {
  return type.includes('image/');
}), _defineProperty(_observable, "getFileInfo", function getFileInfo(file) {
  var fileName = file.name;
  var dotIndex = fileName.lastIndexOf('.');
  var fileExtension;
  var fileSize = file.size;

  if (dotIndex !== -1) {
    fileExtension = fileName.substring(dotIndex + 1, fileName.length);
    fileName = fileName.substring(0, dotIndex);
  }

  return {
    fileName: fileName,
    fileExtension: fileExtension,
    fileSize: fileSize
  };
}), _defineProperty(_observable, "setFileIndex", function setFileIndex(idx) {
  this.selectFileIdx = idx;
}), _defineProperty(_observable, "setFileElement", function setFileElement(element) {
  this.selectFileElement = element;
}), _defineProperty(_observable, "setDeleteFileConfig", function setDeleteFileConfig(id, name, index) {
  this.deleteFileId = id;
  this.deleteFileName = name;
  this.deleteFileIndex = index;
}), _defineProperty(_observable, "setUploadFileDTO", function setUploadFileDTO(config, file, type) {
  var fileName = config.fileName,
      fileExtension = config.fileExtension,
      fileSize = config.fileSize;
  var gwMeta = {
    file_name: fileName,
    file_extension: fileExtension,
    file_size: fileSize
  };
  var uploadMeta = {
    "dto": {
      "workspace_id": NoteRepository$1.WS_ID,
      "channel_id": NoteRepository$1.chId,
      "storageFileInfo": {
        "user_id": NoteRepository$1.USER_ID,
        "file_last_update_user_id": NoteRepository$1.USER_ID,
        "file_id": '',
        "file_name": fileName,
        "file_extension": fileExtension,
        "file_created_at": '',
        "file_updated_at": '',
        "file_size": fileSize,
        "user_context_1": PageStore.currentPageId,
        "user_context_2": '',
        "user_context_3": ''
      }
    }
  };
  var tempMeta = {
    "user_id": NoteRepository$1.USER_ID,
    "file_last_update_user_id": NoteRepository$1.USER_ID,
    "file_id": '',
    "file_name": fileName,
    "file_extension": fileExtension,
    "file_created_at": '',
    "file_updated_at": this.getTempTimeFormat(),
    "file_size": fileSize,
    "user_context_1": '',
    "user_context_2": '',
    "user_context_3": '',
    "progress": 0,
    "type": type,
    "error": false
  };
  this.setTempFileList(tempMeta);
  var cancelToken = new API.CancelToken.source();
  var uploadArr = {
    gwMeta: gwMeta,
    uploadMeta: uploadMeta,
    file: file,
    type: type,
    cancelSource: cancelToken
  };
  this.setUploadDTO(uploadArr);
}), _defineProperty(_observable, "setUploadDTO", function setUploadDTO(meta) {
  this.uploadDTO.push(meta);
}), _defineProperty(_observable, "setTempFileList", function setTempFileList(target) {
  if (this.processCount !== this.uploadLength) {
    this.tempFileLayoutList.push(target);
    this.processCount++;
  } else this.processCount = 0;

  if (!this.isFile) this.setIsFile(true);
}), _defineProperty(_observable, "setTempFileLayoutList", function setTempFileLayoutList(arr) {
  this.tempFileLayoutList = arr;
}), _defineProperty(_observable, "setFileLength", function setFileLength(length) {
  this.uploadLength = length;
}), _defineProperty(_observable, "getTempTimeFormat", function getTempTimeFormat() {
  var date = new Date();
  var year = date.getFullYear();
  var month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + time;
}), _defineProperty(_observable, "convertFileSize", function convertFileSize(bytes) {
  if (bytes == 0) return '0 Bytes';
  var k = 1000,
      dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}), _defineProperty(_observable, "deleteImage", function deleteImage() {
  var parent = this.tinymce.selection.getNode().parentNode;
  this.tinymce.selection.setContent('');
  if (!parent.hasChildNodes()) parent.innerHTML = '<br>';
  this.tinymce.focus();
  NoteStore.setModalInfo(null);
}), _defineProperty(_observable, "createFileMeta", function createFileMeta(fileArray, noteId) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var createCopyArray, _yield$NoteRepository5, dto;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            createCopyArray = [];
            fileArray.forEach(function (file) {
              createCopyArray.push({
                note_id: noteId,
                file_id: file
              });
            });
            _context7.next = 4;
            return NoteRepository$1.createFileMeta(createCopyArray);

          case 4:
            _yield$NoteRepository5 = _context7.sent;
            dto = _yield$NoteRepository5.data.dto;
            return _context7.abrupt("return", dto);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }))();
}), _defineProperty(_observable, "storageFileDeepCopy", function storageFileDeepCopy(fileId, type) {
  var _this3 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _yield$NoteRepository6, dto, _dto$storageFileInfoL, file_id, file_name, file_extension, file_updated_at, file_size, isImage, tempMeta;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return NoteRepository$1.storageFileDeepCopy(fileId);

          case 2:
            _yield$NoteRepository6 = _context8.sent;
            dto = _yield$NoteRepository6.data.dto;

            if (!(dto.resultMsg === 'Success')) {
              _context8.next = 13;
              break;
            }

            _dto$storageFileInfoL = dto.storageFileInfoList[0], file_id = _dto$storageFileInfoL.file_id, file_name = _dto$storageFileInfoL.file_name, file_extension = _dto$storageFileInfoL.file_extension, file_updated_at = _dto$storageFileInfoL.file_updated_at, file_size = _dto$storageFileInfoL.file_size;
            isImage = type === 'image' ? true : false;
            tempMeta = {
              "user_id": NoteRepository$1.USER_ID,
              "file_last_update_user_id": NoteRepository$1.USER_ID,
              "file_id": file_id,
              "file_name": file_name,
              "file_extension": file_extension,
              "file_created_at": '',
              "file_updated_at": file_updated_at,
              "file_size": file_size,
              "user_context_1": '',
              "user_context_2": '',
              "user_context_3": '',
              "progress": 0,
              "type": isImage ? 'image' : 'file',
              "error": false
            };

            _this3.setTempFileList(tempMeta);

            if (isImage) EditorStore.createDriveElement('image', file_id, file_name + '.' + file_extension);
            return _context8.abrupt("return", {
              id: file_id,
              type: type
            });

          case 13:
            EditorStore.failCount++;

          case 14:

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }))();
}), _defineProperty(_observable, "createDriveElement", function createDriveElement(type, fileId, fileName) {
  var targetSRC = "".concat(API.baseURL, "/Storage/StorageFile?action=Download&fileID=").concat(fileId, "&workspaceID=").concat(NoteRepository$1.WS_ID, "&channelID=").concat(NoteRepository$1.chId, "&userID=").concat(NoteRepository$1.USER_ID);

  switch (type) {
    case 'image':
      EditorStore.tinymce.execCommand('mceInsertContent', false, '<img id="' + fileId + '" src="' + targetSRC + '" data-name="' + fileName + '"data-mce-src="' + targetSRC + '"crossorigin="' + '*' + '"/>');
      break;

    case 'video':
      EditorStore.tinymce.insertContent("<p>\n            <span class=\"mce-preview-object mce-object-video\" contenteditable=\"false\" data-mce-object=\"video\" data-mce-p-allowfullscreen=\"allowfullscreen\" data-mce-p-frameborder=\"no\" data-mce-p-scrolling=\"no\" data-mce-p-src='' data-mce-html=\"%20\">\n              <video width=\"400\" controls>\n                <source src=".concat(targetSRC, " />\n              </video>\n            </span>\n          </p>"));
      break;
  }
}), _defineProperty(_observable, "notSaveFileDelete", function notSaveFileDelete() {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var deleteArr;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            deleteArr = [];

            if (!(EditorStore.notSaveFileList.length > 0)) {
              _context9.next = 12;
              break;
            }

            deleteArr = toJS(EditorStore.notSaveFileList).map(function (item) {
              return EditorStore.deleteFile(item.file_id);
            });
            _context9.prev = 3;
            _context9.next = 6;
            return Promise.all(deleteArr).then(function () {
              EditorStore.notSaveFileList = [];
              if (EditorStore.tempFileLayoutList.length > 0) EditorStore.setTempFileLayoutList([]);
            });

          case 6:
            _context9.next = 10;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](3);

          case 10:
            _context9.prev = 10;
            return _context9.finish(10);

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[3, 8, 10, 12]]);
  }))();
}), _observable));

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
  NOTE_PAGE_LIST_DEL_PGE_CHPT_02: "{{userName}} \uB2D8\uC774 \uC218\uC815 \uC911 \uC785\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_DEL_PGE_CHPT_03: '페이지를 삭제하시겠습니까?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_04: '삭제',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_05: '취소',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_06: '챕터를 삭제하시겠습니까?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: '챕터에 속한 페이지도 삭제됩니다.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_01: '수정',
  NOTE_PAGE_LIST_ADD_NEW_PGE_02: '읽기 모드',
  NOTE_PAGE_LIST_ADD_NEW_PGE_03: '편집하려면 수정 버튼을 클릭해 주세요.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_04: '저장',
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_01: "{{moveCnt}}\uAC1C\uC758 \uD398\uC774\uC9C0\uB97C {{targetPage}} \uC73C\uB85C \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_02: "{{moveCnt}}\uAC1C\uC758 \uCC55\uD130\uAC00 \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_03: "{{moveCnt}}\uAC1C\uC758 \uD398\uC774\uC9C0\uAC00 \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01: '페이지가 없습니다.',
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02: '시작하려면 "새 페이지 추가" 버튼을 클릭하세요.',
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
  NOTE_EDIT_PAGE_ATTACH_FILE_03: '스페이스 공간이 부족하여 파일을 첨부할 수 없습니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_04: '파일 첨부는 한 번에 최대 20GB까지 가능합니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_05: '파일 첨부는 한 번에 30개까지 가능합니다.',
  NOTE_EDIT_PAGE_COMPLETE_01: '페이지를 저장하고 나가시겠습니까?',
  NOTE_EDIT_PAGE_COMPLETE_02: '저장 안함',
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
  NOTE_EDIT_PAGE_ADD_TAG_01: '이미 있는 태그 이름입니다.',
  NOTE_PAGE_LIST_NO_CHPT_01: '챕터가 없습니다.',
  NOTE_PAGE_LIST_NO_CHPT_02: '시작하려면 "새 챕터" 버튼을 클릭하세요.',
  NOTE_EDIT_PAGE_MENUBAR_32: 'Drive에 저장',
  NOTE_EDIT_PAGE_MENUBAR_33: '내 PC에 저장',
  NOTE_EDIT_PAGE_MENUBAR_34: '다운로드',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_08: "{{count}} \uBA85\uC774 \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.",
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01: 'PDF 형식(.pdf)',
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02: 'TXT 형식(.txt)',
  NOTE_EDIT_PAGE_ATTACH_FILE_06: '일부 파일이 업로드되지 못하였습니다.',
  NOTE_EDIT_PAGE_ATTACH_FILE_07: "({{uploadCnt}}\uAC1C \uD56D\uBAA9 \uC911 {{failCnt}}\uAC1C \uC2E4\uD328)",
  NOTE_EDIT_PAGE_ATTACH_FILE_08: '업로드 중인 파일이 있습니다.￦n취소 후 페이지를 저장하고 나가시겠습니까?',
  NOTE_EDIT_PAGE_INSERT_LINK_10: '',
  NOTE_EDIT_PAGE_INSERT_LINK_11: '',
  NOTE_EDIT_PAGE_INSERT_LINK_12: '',
  NOTE_EDIT_PAGE_INSERT_LINK_13: '',
  NOTE_EDIT_PAGE_AUTO_SAVE_01: '',
  NOTE_EDIT_PAGE_AUTO_SAVE_02: '',
  NOTE_EDIT_PAGE_CANT_EDIT_01: '수정할 수 없습니다.',
  NOTE_ADD_TAGS_01: '태그 추가',
  NOTE_ADD_TAGS_02: '읽기모드에서는 추가할 수 없습니다.',
  NOTE_EDIT_PAGE_MENUBAR_35: '정렬',
  CM_FORWARD: '다른 룸으로 전달',
  TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01: '노트가 삭제되어 불러올 수 없습니다.',
  DRIVE_UPLOAD_BTN_04: '파일명이 70자를 넘는 경우 업로드할 수 없습니다.',
  NOTE_EDIT_PAGE_UPDATE_TIME_01: "\uC624\uC804 {{time}}",
  NOTE_EDIT_PAGE_UPDATE_TIME_02: "\uC624\uD6C4 {{time}}",
  NOTE_EXPORT_TITLE: '제목',
  enterText: '텍스트를 입력해 주세요.',
  enterLink: '링크를 입력해 주세요.'
};

var languageSet$1 = {
  NOTE_PAGE_LIST_CMPNT_DEF_01: 'New Chapter',
  NOTE_PAGE_LIST_CMPNT_DEF_02: 'New Page',
  NOTE_PAGE_LIST_CMPNT_DEF_03: '(Untitled)',
  NOTE_PAGE_LIST_CMPNT_DEF_04: 'Add New Page',
  NOTE_PAGE_LIST_CMPNT_DEF_05: 'Search page or chapter',
  NOTE_PAGE_LIST_CMPNT_DEF_06: 'Tag',
  NOTE_PAGE_LIST_CMPNT_DEF_07: 'Page Received',
  NOTE_PAGE_LIST_CREATE_N_CHPT_01: 'Duplicate name exists',
  NOTE_PAGE_LIST_CREATE_N_CHPT_02: 'Enter another name.',
  NOTE_PAGE_LIST_CREATE_N_CHPT_03: 'OK',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_01: 'Unable to delete.',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_02: "It is currently being modified by {{userName}}",
  NOTE_PAGE_LIST_DEL_PGE_CHPT_03: 'Do you want to delete this page?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_04: 'Delete',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_05: 'Cancel',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_06: 'Do you want to delete this chapter?',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: 'The pages that belong to the chapter are also deleted.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_01: 'Modify',
  NOTE_PAGE_LIST_ADD_NEW_PGE_02: 'Read Mode',
  NOTE_PAGE_LIST_ADD_NEW_PGE_03: 'Click the Modify button to modify.',
  NOTE_PAGE_LIST_ADD_NEW_PGE_04: 'Save',
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_01: "{{moveCnt}} pages moved to {{targetPage}}",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_02: "{{moveCnt}} chapters moved.",
  NOTE_PAGE_LIST_MOVE_PGE_CHPT_03: "{{moveCnt}} pages moved.",
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01: 'No page exists.',
  NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02: 'To create one, click "Add New Page".',
  NOTE_EDIT_PAGE_WORK_AREA_DEF_01: '(Unregistered Member)',
  NOTE_EDIT_PAGE_SEARCH_01: 'No search results found.',
  NOTE_EDIT_PAGE_SEARCH_02: 'Searching...',
  NOTE_EDIT_PAGE_SEARCH_03: 'Search key word',
  NOTE_EDIT_PAGE_INSERT_LINK_01: 'Insert Link',
  NOTE_EDIT_PAGE_INSERT_LINK_02: 'Done',
  NOTE_EDIT_PAGE_INSERT_LINK_03: 'Enter a text.',
  NOTE_EDIT_PAGE_INSERT_LINK_04: 'Text',
  NOTE_EDIT_PAGE_INSERT_LINK_05: 'Link',
  NOTE_EDIT_PAGE_INSERT_LINK_06: 'The URL is not valid.',
  NOTE_EDIT_PAGE_INSERT_LINK_07: 'Modify',
  NOTE_EDIT_PAGE_INSERT_LINK_08: 'Delete',
  NOTE_EDIT_PAGE_ATTACH_FILE_01: 'Attach from Drive',
  NOTE_EDIT_PAGE_ATTACH_FILE_02: 'Attach from My PC',
  NOTE_EDIT_PAGE_ATTACH_FILE_03: 'There is not enough storage space to attach the file.',
  NOTE_EDIT_PAGE_ATTACH_FILE_04: 'You can attach up to 20 GB files at a time.',
  NOTE_EDIT_PAGE_ATTACH_FILE_05: 'You can attach up to 30 files at a time.',
  NOTE_EDIT_PAGE_COMPLETE_01: 'Do you want to save this page and exit?',
  NOTE_EDIT_PAGE_COMPLETE_02: 'Not Save',
  NOTE_DELIVER_CONTEXT_MENU_01: 'Rename',
  NOTE_DELIVER_CONTEXT_MENU_02: 'Send Email',
  NOTE_DELIVER_CONTEXT_MENU_03: 'Export to PDF',
  NOTE_DELIVER_CONTEXT_MENU_04: 'View Information',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_01: 'Room',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_02: 'Member',
  NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_03: 'Date',
  NOTE_DELIVER_TO_ANOTHER_ROOM_01: 'Search nickname',
  NOTE_DELIVER_TO_ANOTHER_ROOM_02: 'Rooms',
  NOTE_DELIVER_TO_ANOTHER_ROOM_03: 'Friends',
  NOTE_DELIVER_TO_ANOTHER_ROOM_04: 'My Room',
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
  NOTE_EDIT_PAGE_MENUBAR_22: 'Enter the Current time',
  NOTE_EDIT_PAGE_MENUBAR_23: 'Insert Images/Videos',
  NOTE_EDIT_PAGE_MENUBAR_24: 'Attach Files',
  NOTE_EDIT_PAGE_MENUBAR_25: 'Rotate by 90 Degrees Counterclockwise',
  NOTE_EDIT_PAGE_MENUBAR_26: 'Rotate by 90 Degrees Clockwise',
  NOTE_EDIT_PAGE_MENUBAR_27: 'Flip Vertically',
  NOTE_EDIT_PAGE_MENUBAR_28: 'Flip Horizontally',
  NOTE_EDIT_PAGE_MENUBAR_29: 'Edit Images',
  NOTE_EDIT_PAGE_MENUBAR_30: 'Replace Images',
  NOTE_EDIT_PAGE_MENUBAR_31: 'Strikethrough',
  NOTE_EDIT_PAGE_INSERT_LINK_09: 'Move to Link',
  NOTE_EDIT_PAGE_ADD_TAG_01: 'The tag name already exists.',
  NOTE_PAGE_LIST_NO_CHPT_01: 'No chapter exists.',
  NOTE_PAGE_LIST_NO_CHPT_02: 'To create one, click "New Chapter".',
  NOTE_EDIT_PAGE_MENUBAR_32: 'Save to Drive',
  NOTE_EDIT_PAGE_MENUBAR_33: 'Save to My PC',
  NOTE_EDIT_PAGE_MENUBAR_34: 'Download',
  NOTE_PAGE_LIST_DEL_PGE_CHPT_08: "It is currently being modified by {{count}} people",
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01: 'PDF Format(.pdf)',
  NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02: 'TXT Format(.txt)',
  NOTE_EDIT_PAGE_ATTACH_FILE_06: 'Unable to upload some files.',
  NOTE_EDIT_PAGE_ATTACH_FILE_07: "({{failCnt}} out of {{uploadCnt}} failed)",
  NOTE_EDIT_PAGE_ATTACH_FILE_08: 'There is a file currently being uploaded.￦nDo you want to save and exit?',
  NOTE_EDIT_PAGE_INSERT_LINK_10: '',
  NOTE_EDIT_PAGE_INSERT_LINK_11: '',
  NOTE_EDIT_PAGE_INSERT_LINK_12: '',
  NOTE_EDIT_PAGE_INSERT_LINK_13: '',
  NOTE_EDIT_PAGE_AUTO_SAVE_01: '',
  NOTE_EDIT_PAGE_AUTO_SAVE_02: '',
  NOTE_EDIT_PAGE_CANT_EDIT_01: 'Unable to Modify.',
  NOTE_ADD_TAGS_01: 'Add Tag',
  NOTE_ADD_TAGS_02: 'Cannot be added in read mode.',
  NOTE_EDIT_PAGE_MENUBAR_35: 'Align',
  CM_FORWARD: 'Forward',
  TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01: 'Failed to get the note because it has deleted.',
  DRIVE_UPLOAD_BTN_04: 'The name of the file cannot exceed the limit of 70 characters. ',
  NOTE_EDIT_PAGE_UPDATE_TIME_01: "{{time}} AM",
  NOTE_EDIT_PAGE_UPDATE_TIME_02: "{{time}} PM",
  NOTE_EXPORT_TITLE: 'Title',
  enterText: 'Enter a Text.',
  enterLink: 'Enter a link.'
};

var resources = {
  ko: {
    translation: languageSet
  },
  en: {
    translation: languageSet$1
  }
};
var i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
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

var _observable$1;
var PageStore = observable((_observable$1 = {
  noteInfoList: [],
  currentPageData: [],
  isEdit: '',
  userNick: '',
  otherEdit: false,
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createPageId: '',
  // web에서 안 씀
  createParent: '',
  createParentIdx: '',
  deletePageList: [],
  selectablePageId: '',
  lastSharedPageParentId: '',
  renameId: '',
  renamePrevText: '',
  renameText: '',
  isMovingPage: false,
  moveInfoMap: new Map(),
  isCtrlKeyDown: false,
  movePageId: '',
  // 이동을 원하는 page의 id
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  modifiedDate: '',
  prevModifiedUserName: '',
  isNewPage: false,
  exportPageId: '',
  exportPageTitle: '',
  editingUserID: '',
  editingUserName: '',
  editingUserCount: '',
  setNoteInfoList: function setNoteInfoList(infoList) {
    this.noteInfoList = infoList;
  },
  getCurrentPageData: function getCurrentPageData() {
    return this.currentPageData;
  },
  setCurrentPageData: function setCurrentPageData(pageData) {
    this.currentPageData = pageData;
  },
  getIsEdit: function getIsEdit() {
    return this.isEdit;
  },
  setIsEdit: function setIsEdit(id) {
    this.isEdit = id;
  },
  isReadMode: function isReadMode() {
    if (this.isEdit === null || this.isEdit === '') {
      this.setOtherEdit(false);
      return true;
    } // createNotePage에서 createPage 하고 EditorContainer.js의 setNoteEditor-initialMode한 후 getNoteInfoList에서 currentPageData를 set한다.
    // 그래서 getCurrentPageData().is_edit으로 확인하면 initialMode에서 isReadMode() === true가 된다.
    // this.isEdit으로 수정
    else if (this.isEdit !== null && NoteRepository$1.USER_ID === this.isEdit) {
        this.setOtherEdit(false);
        return false;
      } else {
        this.setEditingUserID(PageStore.getCurrentPageData().is_edit);
        this.setOtherEdit(true);
        return true;
      }
  },
  setOtherEdit: function setOtherEdit(flag) {
    this.otherEdit = flag;
  },
  setEditingUserID: function setEditingUserID(targetID) {
    this.editingUserID = targetID;
  },
  getEditingUserID: function getEditingUserID() {
    return this.editingUserID;
  },
  setEditingUserName: function setEditingUserName(targetName) {
    this.editingUserName = targetName;
  },
  getEditingUserName: function getEditingUserName() {
    return this.editingUserName;
  },
  setEditingUserCount: function setEditingUserCount(count) {
    this.editingUserCount = count;
  },
  getEditingUserCount: function getEditingUserCount() {
    return this.editingUserCount;
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
    if (title.length > 256) title = title.substring(0, 256);
    this.noteTitle = title;
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
  getCreatePageParentIdx: function getCreatePageParentIdx() {
    return this.createParentIdx;
  },
  setCreatePageParentIdx: function setCreatePageParentIdx(chapterIdx) {
    this.createParentIdx = chapterIdx;
  },
  getDeletePageList: function getDeletePageList() {
    return this.deletePageList;
  },
  setDeletePageList: function setDeletePageList(page) {
    this.deletePageList = [];
    this.deletePageList.push(page);
  },
  getSelectablePageId: function getSelectablePageId() {
    return this.selectablePageId;
  },
  setSelectablePageId: function setSelectablePageId(pageId) {
    this.selectablePageId = pageId;
  },
  getLastSharedPageParentId: function getLastSharedPageParentId() {
    return this.lastSharedPageParentId;
  },
  setLastSharedPageParentId: function setLastSharedPageParentId(chapterId) {
    this.lastSharedPageParentId = chapterId;
  },
  getRenameId: function getRenameId() {
    return this.renameId;
  },
  setRenameId: function setRenameId(pageId) {
    this.renameId = pageId;
  },
  getRenamePrevText: function getRenamePrevText() {
    return this.renamePrevText;
  },
  setRenamePrevText: function setRenamePrevText(pageText) {
    this.renamePrevText = pageText;
  },
  getRenameText: function getRenameText() {
    return this.renameText;
  },
  setRenameText: function setRenameText(pageText) {
    if (pageText.length > 256) pageText = pageText.substring(0, 256);
    this.renameText = pageText;
  },
  getIsMovingPage: function getIsMovingPage() {
    return this.isMovingPage;
  },
  setIsMovingPage: function setIsMovingPage(isMoving) {
    this.isMovingPage = isMoving;
  },
  getMoveInfoMap: function getMoveInfoMap() {
    return this.moveInfoMap;
  },
  setMoveInfoMap: function setMoveInfoMap(moveInfoMap) {
    this.moveInfoMap = moveInfoMap;
  },
  appendMoveInfoMap: function appendMoveInfoMap(key, value) {
    this.moveInfoMap.set(key, value);
  },
  deleteMoveInfoMap: function deleteMoveInfoMap(key) {
    this.moveInfoMap.delete(key);
  },
  clearMoveInfoMap: function clearMoveInfoMap() {
    this.moveInfoMap.clear();
  },
  setIsCtrlKeyDown: function setIsCtrlKeyDown(flag) {
    this.isCtrlKeyDown = flag;
  },
  getMovePageId: function getMovePageId() {
    return this.movePageId;
  },
  setMovePageId: function setMovePageId(pageId) {
    this.movePageId = pageId;
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
  getModifiedDate: function getModifiedDate() {
    return this.modifiedDate;
  },
  setModifiedDate: function setModifiedDate(date) {
    this.modifiedDate = date;
  },
  getPrevModifiedUserName: function getPrevModifiedUserName() {
    return this.prevModifiedUserName;
  },
  setPrevModifiedUserName: function setPrevModifiedUserName(userName) {
    this.prevModifiedUserName = userName;
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
  getExportId: function getExportId() {
    return this.exportPageId;
  },
  setExportId: function setExportId(pageId) {
    this.exportPageId = pageId;
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
              return _context.abrupt("return", dto);

            case 5:
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
  renamePage: function renamePage(pageId, pageTitle, chapterId, callback) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$NoteRepository4, returnData;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return NoteRepository$1.renamePage(pageId, pageTitle, chapterId);

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
  noneEdit: function noneEdit(noteId, parentNotebook, prevModifiedUserName, prevModifiedUserId, callback) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _yield$NoteRepository7, returnData;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return NoteRepository$1.nonEdit(noteId, parentNotebook, prevModifiedUserName, prevModifiedUserId);

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
  // note 처음 진입해서 축소 상태에서 새 페이지 추가 버튼 누르면 없다
  initializeBoxColor: function initializeBoxColor() {
    var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;

    (_document$getElementB = document.getElementById('tox-icon-text-color__color')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.removeAttribute('fill');
    (_document$getElementB2 = document.getElementById('tox-icon-text-color__color')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.removeAttribute('stroke');
    (_document$getElementB3 = document.getElementById('tox-icon-highlight-bg-color__color')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.removeAttribute('fill');
    (_document$getElementB4 = document.getElementById('tox-icon-highlight-bg-color__color')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.removeAttribute('stroke');
  },
  createNotePage: function createNotePage() {
    var _this = this;

    this.createPage(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'), null, this.createParent).then(function (dto) {
      var _EditorStore$tinymce, _EditorStore$tinymce$, _EditorStore$tinymce2;

      EditorStore.setIsSearch(false);

      _this.setIsEdit(dto.is_edit);

      ChapterStore.getNoteChapterList();
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      _this.currentPageId = dto.note_id;

      _this.setIsNewPage(true);

      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(dto.fileList);

      _this.initializeBoxColor();

      dto.note_content = NoteUtil.decodeStr('<p><br></p>');
      dto.note_title = NoteUtil.decodeStr(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'));
      _this.currentPageData = dto;
      _this.noteTitle = '';
      _this.prevModifiedUserName = _this.currentPageData.user_name;
      _this.modifiedDate = _this.modifiedDateFormatting(_this.currentPageData.modified_date, false);
      NoteStore.setTargetLayout('Content');
      NoteStore.setShowPage(true);
      (_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : (_EditorStore$tinymce$ = _EditorStore$tinymce.undoManager) === null || _EditorStore$tinymce$ === void 0 ? void 0 : _EditorStore$tinymce$.clear(); // getRng error가 나서 selection부터 체크

      if ((_EditorStore$tinymce2 = EditorStore.tinymce) !== null && _EditorStore$tinymce2 !== void 0 && _EditorStore$tinymce2.selection) EditorStore.tinymce.focus();
    });
  },
  deleteNotePage: function deleteNotePage() {
    var _this2 = this;

    this.deletePage(this.deletePageList).then(function () {
      _this2.setIsEdit(null); // 축소모드에서 뒤로가기로 페이지 삭제한 후 isEdit이 갱신안되는 이슈 수정


      if (!_this2.isNewPage) {
        if (_this2.currentPageId === _this2.deletePageList[0].note_id) {
          _this2.setCurrentPageId(_this2.selectablePageId);

          _this2.fetchCurrentPageData(_this2.selectablePageId);
        }
      } else {
        if (NoteStore.layoutState === "collapse") {
          NoteStore.setTargetLayout('LNB');

          _this2.setIsNewPage(false);

          _this2.setCurrentPageId('');

          ChapterStore.setCurrentChapterId('');
        } else {
          var currentChapter = ChapterStore.chapterList.find(function (chapter) {
            return chapter.id === _this2.createParent;
          });

          if (currentChapter.children.length > 1) {
            var pageId = currentChapter.children[currentChapter.children.length - 2].id;

            _this2.setCurrentPageId(pageId);

            _this2.fetchCurrentPageData(pageId);
          } else {
            _this2.setCurrentPageId('');
          }
        }
      }

      ChapterStore.getNoteChapterList();
      NoteStore.setShowModal(false);
    });
  },
  renameNotePage: function renameNotePage(chapterId) {
    var _this3 = this;

    this.renamePage(this.renameId, this.renameText, chapterId).then(function (dto) {
      if (_this3.moveInfoMap.get(dto.note_id)) {
        _this3.moveInfoMap.get(dto.note_id).item.text = dto.note_title;
      }

      _this3.fetchNoteInfoList(dto.note_id);

      ChapterStore.getNoteChapterList();
    });
  },
  createMoveInfo: function createMoveInfo(pageId, chapterId) {
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
  handleClickOutside: function handleClickOutside() {
    this.setIsCtrlKeyDown(false);

    if (!this.currentPageId) {
      this.moveInfoMap.clear();
      return;
    }

    var currentMoveInfo = this.moveInfoMap.get(this.currentPageId);
    if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentPageId, ChapterStore.currentChapterId);
    this.setMoveInfoMap(new Map([[this.currentPageId, currentMoveInfo]]));
  },
  movePage: function movePage(movePageId, moveTargetChapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var _yield$NoteRepository8, dto;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return NoteRepository$1.movePage(movePageId, moveTargetChapterId);

            case 2:
              _yield$NoteRepository8 = _context8.sent;
              dto = _yield$NoteRepository8.data.dto;
              return _context8.abrupt("return", dto);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  getSortedMoveInfoList: function getSortedMoveInfoList() {
    var moveInfoList = _toConsumableArray(this.moveInfoMap).map(function (keyValue) {
      return keyValue[1];
    });

    return moveInfoList.sort(function (a, b) {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  },
  moveNotePage: function moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var item, sortedMoveInfoList, sortedMovePages, pageIds, moveCntInSameChapter, moveCntToAnotherChapter, startIdx, moveCnt;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
              sortedMoveInfoList = _this4.getSortedMoveInfoList();
              sortedMovePages = sortedMoveInfoList.map(function (moveInfo) {
                return item[moveInfo.chapterIdx].children[moveInfo.pageIdx];
              });
              pageIds = []; // 갈아 끼울 페이지 아이디 리스트

              item[moveTargetChapterIdx].children.forEach(function (pageId, idx) {
                if (idx === moveTargetPageIdx) pageIds.push.apply(pageIds, _toConsumableArray(sortedMovePages));
                if (!_this4.moveInfoMap.get(pageId)) pageIds.push(pageId);
              });
              if (moveTargetPageIdx >= pageIds.length) pageIds.push.apply(pageIds, _toConsumableArray(sortedMovePages));
              _context9.next = 8;
              return Promise.all(sortedMoveInfoList.slice().reverse().map(function (moveInfo) {
                if (moveInfo.chapterId !== moveTargetChapterId && ChapterStore.pageMap.get(moveInfo.item.id)) {
                  item[moveInfo.chapterIdx].children.splice(moveInfo.pageIdx, 1);
                  return _this4.movePage(moveInfo.item.id, moveTargetChapterId);
                }
              }));

            case 8:
              item[moveTargetChapterIdx].children = pageIds;
              moveCntInSameChapter = 0;
              moveCntToAnotherChapter = 0;
              startIdx = item[moveTargetChapterIdx].children.findIndex(function (pageId) {
                return pageId === sortedMoveInfoList[0].item.id;
              });
              sortedMoveInfoList.map(function (moveInfo, idx) {
                if (moveInfo.chapterId !== moveTargetChapterId) moveCntToAnotherChapter++;else if (moveInfo.pageIdx !== startIdx + idx) moveCntInSameChapter++;

                _this4.moveInfoMap.set(moveInfo.item.id, {
                  item: moveInfo.item,
                  pageIdx: startIdx + idx,
                  chapterId: moveTargetChapterId,
                  chapterIdx: moveTargetChapterIdx
                });
              });
              moveCnt = moveCntInSameChapter + moveCntToAnotherChapter;

              if (!(moveCnt > 0)) {
                _context9.next = 24;
                break;
              }

              localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
              _context9.next = 18;
              return ChapterStore.getNoteChapterList();

            case 18:
              _context9.next = 20;
              return _this4.fetchCurrentPageData(sortedMovePages[0]);

            case 20:
              if (!moveCntToAnotherChapter) {
                NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_03', {
                  moveCnt: moveCntInSameChapter
                }));
              } else {
                ChapterStore.setMoveInfoMap(new Map([[moveTargetChapterId, ChapterStore.createMoveInfo(moveTargetChapterId)]]));
                NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_01', {
                  moveCnt: moveCnt,
                  targetPage: ChapterStore.chapterList[moveTargetChapterIdx].text
                }));
              }

              NoteStore.setIsVisibleToast(true);
              _context9.next = 25;
              break;

            case 24:
              // 이동한 페이지가 없는 경우: 기존 선택되어 있던 페이지 select
              _this4.handleClickOutside();

            case 25:
              NoteStore.setIsDragging(false);

            case 26:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  modifiedDateFormatting: function modifiedDateFormatting(date, isSharedInfo) {
    var mDate = date.split(' ')[0];
    var mTime = date.split(' ')[1];
    var mYear = parseInt(mDate.split('.')[0]);
    var mMonth = parseInt(mDate.split('.')[1]);
    var mDay = parseInt(mDate.split('.')[2]);
    var mHour = parseInt(mTime.split(':')[0]);
    var mMinute = parseInt(mTime.split(':')[1]);
    var curDate = new Date();

    var convertTwoDigit = function convertTwoDigit(digit) {
      return ('0' + digit).slice(-2);
    };

    var m12Hour = mHour > 12 ? mHour - 12 : mHour;
    var hhmm = convertTwoDigit(m12Hour) + ':' + convertTwoDigit(mMinute);
    var basicDate = mHour < 12 ? i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_01', {
      time: hhmm
    }) : i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_02', {
      time: hhmm
    });

    if (date === this.currentPageData.modified_date && mYear === curDate.getFullYear() && !isSharedInfo) {
      // 같은 해
      if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate()) return basicDate; // 같은 날
      else return convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + ' ' + basicDate; // 다른 날
    } else {
      // 다른 해, 정보 보기
      return mYear + '.' + convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + ' ' + basicDate;
    }
  },
  fetchNoteInfoList: function fetchNoteInfoList(noteId) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var dto, userProfile;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _this5.getNoteInfoList(noteId);

            case 2:
              dto = _context10.sent;

              if (isFilled(dto.note_id)) {
                _context10.next = 6;
                break;
              }

              if (_this5.currentPageId === noteId) _this5.currentPageId = '';
              return _context10.abrupt("return");

            case 6:
              if (!dto.USER_ID) {
                _context10.next = 11;
                break;
              }

              _context10.next = 9;
              return UserStore.fetchProfile(dto.USER_ID);

            case 9:
              userProfile = _context10.sent;
              if (userProfile) _this5.userNick = userProfile.nick;

            case 11:
              _this5.setCurrentPageId(dto.note_id);

              ChapterStore.setCurrentChapterId(dto.parent_notebook);
              dto.note_content = NoteUtil.decodeStr(dto.note_content);
              dto.note_title = NoteUtil.decodeStr(dto.note_title);
              _this5.noteInfoList = dto;
              _this5.currentPageData = dto;
              _this5.isEdit = dto.is_edit;
              _this5.noteTitle = dto.note_title;
              _this5.modifiedDate = _this5.modifiedDateFormatting(_this5.currentPageData.modified_date);
              EditorStore.setFileList(dto.fileList);

              if (_this5.isNewPage) {
                ChapterStore.setMoveInfoMap(new Map([[ChapterStore.currentChapterId, ChapterStore.createMoveInfo(ChapterStore.currentChapterId)]]));

                _this5.setMoveInfoMap(new Map([[_this5.currentPageId, _this5.createMoveInfo(_this5.currentPageId, ChapterStore.currentChapterId)]]));

                import('teespace-core').then(function (module) {
                  try {
                    var logEvent = module.logEvent;
                    logEvent('note', 'clickNoteBtn');
                  } catch (e) {
                    console.error(e);
                  }
                }).catch(function (e) {
                  return console.error(e);
                });

                _this5.setIsNewPage(false);
              }

            case 22:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  fetchCurrentPageData: function fetchCurrentPageData(pageId) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!pageId) {
                _context11.next = 7;
                break;
              }

              _context11.next = 3;
              return _this6.fetchNoteInfoList(pageId);

            case 3:
              _context11.next = 5;
              return TagStore.fetchNoteTagList(pageId);

            case 5:
              _context11.next = 9;
              break;

            case 7:
              _this6.setIsEdit('');

              _this6.setCurrentPageId('');

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart: function noteEditStart(noteId) {
    var _this7 = this;

    this.prevModifiedUserName = this.currentPageData.user_name;
    this.prevModifiedUserId = this.currentPageData.USER_ID;
    this.editStart(noteId, this.currentPageData.parent_notebook).then(function (dto) {
      var _EditorStore$tinymce3;

      _this7.fetchNoteInfoList(dto.note_id); // focus에서 getRng error가 나서 selection부터 체크


      if ((_EditorStore$tinymce3 = EditorStore.tinymce) !== null && _EditorStore$tinymce3 !== void 0 && _EditorStore$tinymce3.selection) {
        EditorStore.tinymce.focus();
        EditorStore.tinymce.selection.setCursorLocation();
      }

      _this7.initializeBoxColor();
    });
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone: function noteEditDone(updateDto) {
    var _this8 = this;

    this.editDone(updateDto).then(function (dto) {
      if (_this8.moveInfoMap.get(dto.note_id)) {
        _this8.moveInfoMap.get(dto.note_id).item.text = dto.note_title;
      }

      _this8.fetchNoteInfoList(dto.note_id);

      ChapterStore.getNoteChapterList();
    });
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteNoneEdit: function noteNoneEdit(noteId) {
    var _this9 = this;

    this.noneEdit(noteId, this.currentPageData.parent_notebook, this.prevModifiedUserName, this.prevModifiedUserId).then(function (dto) {
      var _EditorStore$tinymce4;

      _this9.fetchNoteInfoList(dto.note_id);

      var floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
      if (floatingMenu !== null) floatingMenu.click();
      (_EditorStore$tinymce4 = EditorStore.tinymce) === null || _EditorStore$tinymce4 === void 0 ? void 0 : _EditorStore$tinymce4.setContent(_this9.currentPageData.note_content);
      NoteStore.setShowModal(false);
      EditorStore.setIsSearch(false);
    });
  },
  handleNoneEdit: function handleNoneEdit() {
    var _this10 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!_this10.isNewPage) {
                _context12.next = 5;
                break;
              }

              _this10.setDeletePageList({
                note_id: _this10.currentPageId
              });

              _this10.deleteNotePage();

              _context12.next = 10;
              break;

            case 5:
              if (!_this10.otherEdit) {
                _context12.next = 9;
                break;
              }

              return _context12.abrupt("return");

            case 9:
              _this10.noteNoneEdit(_this10.currentPageId);

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  handleSave: function handleSave() {
    var _EditorStore$tinymce5, _EditorStore$tinymce6;

    if (this.noteTitle === '' || this.noteTitle === i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03')) {
      if (this.getTitle() !== undefined) PageStore.setTitle(this.getTitle());else if (this.getTitle() === undefined && (EditorStore.tempFileLayoutList.length > 0 || EditorStore.fileLayoutList.length > 0)) {
        if (EditorStore.tempFileLayoutList.length > 0) {
          this.setTitle(EditorStore.tempFileLayoutList[0].file_name + (EditorStore.tempFileLayoutList[0].file_extension ? '.' + EditorStore.tempFileLayoutList[0].file_extension : ''));
        } else if (EditorStore.fileLayoutList.length > 0) {
          this.setTitle(EditorStore.fileLayoutList[0].file_name + (EditorStore.fileLayoutList[0].file_extension ? '.' + EditorStore.fileLayoutList[0].file_extension : ''));
        }
      } else this.setTitle(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'));
    }

    this.noteTitle = [].filter.call(this.noteTitle, function (c) {
      return c.charCodeAt(0) !== 65279;
    }).join('');
    var updateDTO = {
      dto: {
        note_id: this.currentPageData.note_id,
        note_title: this.noteTitle,
        note_content: this.noteContent ? this.noteContent : '<p><br></p>',
        text_content: EditorStore.tinymce.getContent({
          format: "text"
        }),
        parent_notebook: this.currentPageData.parent_notebook,
        is_edit: '',
        TYPE: 'EDIT_DONE'
      }
    };
    this.noteEditDone(updateDTO);
    if (TagStore.removeTagList.length > 0) TagStore.deleteTag(TagStore.removeTagList, PageStore.currentPageId);
    if (TagStore.addTagList.length > 0) TagStore.createTag(TagStore.addTagList, PageStore.currentPageId);
    if (TagStore.updateTagList.length > 0) TagStore.updateTag(TagStore.updateTagList);

    if (EditorStore.tempFileLayoutList.length > 0) {
      EditorStore.setProcessCount(0);
      EditorStore.setTempFileLayoutList([]);
    }

    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    EditorStore.setInitialSearchState();
    var floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
    if (floatingMenu !== null) floatingMenu.click();
    (_EditorStore$tinymce5 = EditorStore.tinymce) === null || _EditorStore$tinymce5 === void 0 ? void 0 : _EditorStore$tinymce5.selection.setCursorLocation();
    (_EditorStore$tinymce6 = EditorStore.tinymce) === null || _EditorStore$tinymce6 === void 0 ? void 0 : _EditorStore$tinymce6.undoManager.clear();
  }
}, _defineProperty(_observable$1, "getTitle", function getTitle() {
  var contentList = EditorStore.tinymce.getBody().children;
  return this._getTitle(contentList);
}), _defineProperty(_observable$1, "_getTitle", function _getTitle(contentList) {
  if (contentList) {
    // forEach 는 항상 return 값 undefined
    for (var i = 0; i < contentList.length; i++) {
      // 표는 무조건 return
      if (contentList[i].tagName === 'TABLE') return this._getTableTitle(contentList[i]); // early return        

      if (!contentList[i].textContent && contentList[i].nodeName !== 'IMG' && contentList[i].getElementsByTagName('IMG').length === 0) continue;
      if (contentList[i].tagName === 'BR') continue; // getTitleByTagName에도 있지만 앞서 거르기
      // 표 제외, 이미지나 텍스트가 있을 때만 탄다

      var title = this._getTitleByTagName(contentList[i]);

      if (title !== undefined) return title;
    }
  }
}), _defineProperty(_observable$1, "_getTableTitle", function _getTableTitle(node) {
  if (!node.textContent && node.getElementsByTagName('IMG').length === 0) return "(".concat(i18n.t('NOTE_EDIT_PAGE_MENUBAR_21'), ")"); // td(표 셀 1개) 안에 <p></p>가 두 개이고, 첫 번째 p태그에 <br>등만 있고 아무것도 없는 경우 (제목 없음)이 출력돼서 수정

  var tdList = node.getElementsByTagName('td');

  for (var tdIndex = 0; tdIndex < tdList.length; tdIndex++) {
    var tdChildren = tdList[tdIndex].childNodes;

    for (var j = 0; j < tdChildren.length; j++) {
      var title = this._getTitleByTagName(tdChildren[j]);

      if (title !== undefined) return title;
    }
  }
}), _defineProperty(_observable$1, "_searchInsideContainerTag", function _searchInsideContainerTag(node) {
  if (!node.textContent && node.getElementsByTagName('IMG').length === 0) return; // 명시적인 줄바꿈이 있는 경우

  var lineBreakIdx = node.textContent.indexOf('\n');
  if (lineBreakIdx !== -1) return node.textContent.slice(0, lineBreakIdx); // hasLineBreak가 true면 child별로 순회하며 getTitleByTagName 함수를 탄다
  // 즉 node 단위로 title을 뽑아낼 때

  var hasLineBreak = false;
  if (Array.from(node.childNodes).some(function (child) {
    return ['DIV', 'PRE', 'P', 'IMG', 'BR', 'OL', 'UL'].includes(child.nodeName);
  })) hasLineBreak = true; // node 상관없이 title 뽑을 때 : 기사 내용은 줄바꿈없이 p태그 안에 span이나 strong 태그랑 #text만 있어

  if (!hasLineBreak) return node.textContent.slice(0, 200);

  for (var _i = 0, _Array$from = Array.from(node.childNodes); _i < _Array$from.length; _i++) {
    var item = _Array$from[_i];
    if (!item.textContent && item.nodeName !== 'IMG' && item.getElementsByTagName('IMG').length === 0) continue;

    var title = this._getTitleByTagName(item);

    if (title !== undefined) return title;
  }
}), _defineProperty(_observable$1, "_getTitleByTagName", function _getTitleByTagName(node) {
  switch (node.nodeName) {
    case 'BR':
      return;

    case 'IMG':
      return node.dataset.name ? node.dataset.name : node.src;

    case 'SPAN':
    case 'A':
    case '#text':
    case 'STRONG':
    case 'BLOCKQUOTE':
    case 'EM':
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6':
      return node.textContent.slice(0, 200);

    case 'OL':
    case 'UL':
      return node.children[0].textContent;

    case 'TABLE':
      var tableTitle = this._getTableTitle(node);

      if (tableTitle !== undefined) return tableTitle;

    case 'DIV':
    case 'PRE':
    case "P":
      var title = this._searchInsideContainerTag(node);

      if (title !== undefined) return title;
  }

  if (node.textContent) return node.textContent.slice(0, 200);
}), _defineProperty(_observable$1, "createSharePage", function createSharePage(targetList) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var _yield$NoteRepository9, noteList;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return NoteRepository$1.createSharePage(targetList);

          case 2:
            _yield$NoteRepository9 = _context13.sent;
            noteList = _yield$NoteRepository9.data.dto.noteList;
            return _context13.abrupt("return", noteList);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }))();
}), _defineProperty(_observable$1, "createNoteSharePage", function createNoteSharePage(targetRoomId, targetPageList) {
  if (!targetPageList) return;
  var targetChId = NoteStore.getTargetChId(targetRoomId);
  var targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');
  var targetList = targetPageList.map(function (page) {
    return {
      WS_ID: NoteRepository$1.WS_ID,
      note_id: page.note_id || page.id,
      note_title: page.text,
      modified_date: page.date,
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
}), _observable$1));

var _observable$2;
var ChapterStore = observable((_observable$2 = {
  chapterColor: "",
  loadingPageInfo: false,
  // 2panel(pageContainer용)
  chapterList: [],
  sortedChapterList: {
    roomChapterList: [],
    sharedPageList: [],
    sharedChapterList: []
  },
  currentChapterId: "",
  chapterNewTitle: "",
  isNewChapterColor: "",
  isNewChapter: false,
  colorArray: {
    1: "#C84847",
    2: "#F29274",
    3: "#F6C750",
    4: "#77B69B",
    5: "#679886",
    6: "#3A7973",
    7: "#77BED3",
    8: "#5C83DA",
    9: "#8F91E7",
    10: "#DF97AA",
    11: "#CA6D6D"
  },
  // 검색 실행 화면 필요
  isLoadingSearchResult: false,
  isSearching: false,
  isTagSearching: false,
  //tag chip 클릭해서 tag chip 띄울 때 씀
  searchingTagName: '',
  searchStr: "",
  // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요
  searchResult: {},
  // {chapter:[], page:[]} 형태
  deleteChapterId: '',
  selectableChapterId: '',
  renameId: '',
  renamePrevText: '',
  renameText: '',
  isMovingChapter: false,
  moveInfoMap: new Map(),
  isCtrlKeyDown: false,
  dragEnterChapterIdx: '',
  chapterMap: new Map(),
  pageMap: new Map(),
  chapterChildren: [],
  exportChapterId: '',
  exportChapterTitle: '',
  sharedCnt: 0,
  scrollIntoViewId: '',
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
  getDeleteChapterId: function getDeleteChapterId() {
    return this.deleteChapterId;
  },
  setDeleteChapterId: function setDeleteChapterId(chapter) {
    this.deleteChapterId = chapter;
  },
  getSelectableChapterId: function getSelectableChapterId() {
    return this.selectableChapterId;
  },
  setSelectableChapterId: function setSelectableChapterId(chapterId) {
    this.selectableChapterId = chapterId;
  },
  getRenameId: function getRenameId() {
    return this.renameId;
  },
  setRenameId: function setRenameId(chapterId) {
    this.renameId = chapterId;
  },
  getRenamePrevText: function getRenamePrevText() {
    return this.renamePrevText;
  },
  setRenamePrevText: function setRenamePrevText(chapterText) {
    this.renamePrevText = chapterText;
  },
  getRenameText: function getRenameText() {
    return this.renameText;
  },
  setRenameText: function setRenameText(chapterText) {
    if (chapterText.length > 256) chapterText = chapterText.substring(0, 256);
    this.renameText = chapterText;
  },
  getIsMovingChapter: function getIsMovingChapter() {
    return this.isMovingChapter;
  },
  setIsMovingChapter: function setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  getMoveInfoMap: function getMoveInfoMap() {
    return this.moveInfoMap;
  },
  setMoveInfoMap: function setMoveInfoMap(moveInfoMap) {
    this.moveInfoMap = moveInfoMap;
  },
  appendMoveInfoMap: function appendMoveInfoMap(key, value) {
    this.moveInfoMap.set(key, value);
  },
  deleteMoveInfoMap: function deleteMoveInfoMap(key) {
    this.moveInfoMap.delete(key);
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
  getChapterChildren: function getChapterChildren() {
    return this.chapterChildren;
  },
  setChapterTempUl: function setChapterTempUl(flag) {
    this.isNewChapter = flag;
    if (flag === false) this.setChapterTitle('');
  },
  setChapterTitle: function setChapterTitle(title) {
    this.chapterNewTitle = title;
  },
  // 사용자 input이 없을 때
  // 웹에서 더이상 안씀! 모바일에서도 안씀!
  getNewChapterTitle: function getNewChapterTitle() {
    var re = /^새 챕터 (\d+)$/gm;
    var chapterTitle, temp;
    var isNotAvailable = [];
    var fullLength = this.chapterList.length;
    isNotAvailable.length = fullLength + 1;
    this.chapterList.forEach(function (chapter) {
      chapterTitle = chapter.text;

      if (chapterTitle === '새 챕터') {
        isNotAvailable[0] = 1;
      } else if (re.test(chapterTitle)) {
        temp = parseInt(chapterTitle.replace(re, "$1"));

        if (temp <= fullLength) {
          isNotAvailable[temp] = 1;
        }
      }
    });
    if (!isNotAvailable[0]) return "새 챕터";

    for (var i = 1; i <= fullLength; i++) {
      if (!isNotAvailable[i]) return "새 챕터 " + i;
    }
  },
  getChapterId: function getChapterId(e) {
    var id = e.target.id;
    return id;
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
  setExportId: function setExportId(chapterId) {
    this.exportChapterId = chapterId;
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
  getSortedChapterList: function getSortedChapterList() {
    return this.sortedChapterList;
  },
  setSortedChapterList: function setSortedChapterList(obj) {
    this.sortedChapterList = obj;
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
  deleteChapter: function deleteChapter(deleteChapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _yield$NoteRepository5, dto;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return NoteRepository$1.deleteChapter(deleteChapterId);

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
  renameChapter: function renameChapter(renameId, renameText, color) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var _yield$NoteRepository6, dto;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return NoteRepository$1.renameChapter(renameId, renameText, color);

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
  updateChapterColor: function updateChapterColor(chapterId) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var targetColor, _yield$NoteRepository7, dto;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              targetColor = _this2.getChapterRandomColor();
              _context7.next = 3;
              return NoteRepository$1.updateChapterColor(chapterId, targetColor);

            case 3:
              _yield$NoteRepository7 = _context7.sent;
              dto = _yield$NoteRepository7.dto;
              return _context7.abrupt("return", dto);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  }
}, _defineProperty(_observable$2, "getChapterChildren", function getChapterChildren(chapterId) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _yield$NoteRepository8, dto;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return NoteRepository$1.getChapterChildren(chapterId);

          case 2:
            _yield$NoteRepository8 = _context8.sent;
            dto = _yield$NoteRepository8.data.dto;
            return _context8.abrupt("return", dto);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }))();
}), _defineProperty(_observable$2, "getChapterInfoList", function getChapterInfoList(chapterId) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var _yield$NoteRepository9, dto;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return NoteRepository$1.getChapterInfoList(chapterId);

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
}), _defineProperty(_observable$2, "getSearchList", function getSearchList() {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var _yield$NoteRepository10, dto;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return NoteRepository$1.getSearchList(ChapterStore.searchStr);

          case 2:
            _yield$NoteRepository10 = _context10.sent;
            dto = _yield$NoteRepository10.data.dto;
            return _context10.abrupt("return", dto);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }))();
}), _defineProperty(_observable$2, "createMap", function createMap(normalChapters) {
  var _this3 = this;

  // chapterMap: {key: chapterId, value: chapterIndex on server}
  // pageMap: {key: pageId, value: {parent: chapterId, idx: pageIndex on server}}
  this.chapterMap.clear();
  this.pageMap.clear();
  normalChapters.forEach(function (chapter, i) {
    _this3.chapterMap.set(chapter.id, i);

    chapter.children.forEach(function (page, j) {
      _this3.pageMap.set(page.id, {
        parent: chapter.id,
        idx: j
      });
    });
  });
}), _defineProperty(_observable$2, "setLocalStorageItem", function setLocalStorageItem(targetChannelId, normalChapters) {
  // normalChapters: includes only [chapterType: notebook, default]
  var newChapters = normalChapters.map(function (chapter) {
    chapter.isFolded = false;
    return {
      id: chapter.id,
      children: chapter.children.map(function (page) {
        return page.id;
      }),
      isFolded: false
    };
  });
  localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(newChapters));
}), _defineProperty(_observable$2, "applyDifference", function applyDifference(targetChannelId, normalChapters) {
  var _this4 = this;

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

    if (_this4.chapterMap.get(chapter.id) === undefined) {
      item.splice(chapterIdxMap.get(chapter.id), 1);
    } else {
      chapter.children.slice().forEach(function (pageId) {
        var pageIds = chapter.children;

        if (_this4.pageMap.get(pageId) === undefined || _this4.pageMap.get(pageId).parent !== chapter.id) {
          chapter.children.splice(pageIds.indexOf(pageId), 1);
        }
      });
    }
  });
  localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
}), _defineProperty(_observable$2, "getLocalOrderChapterList", function getLocalOrderChapterList(targetChannelId, normalChapters) {
  var _this5 = this;

  var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));
  return item.map(function (chapter) {
    var chapterIdx = _this5.chapterMap.get(chapter.id);

    return _objectSpread2(_objectSpread2({}, normalChapters[chapterIdx]), {}, {
      children: chapter.children.map(function (pageId) {
        return normalChapters[chapterIdx].children[_this5.pageMap.get(pageId).idx];
      }),
      isFolded: chapter.isFolded ? chapter.isFolded : false
    });
  });
}), _defineProperty(_observable$2, "checkDefaultChapterColor", function checkDefaultChapterColor(notebookList) {
  var _this6 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var _yield$_this6$updateC, color;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!(notebookList.length === 0 || notebookList[0].type !== 'default')) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return", notebookList);

          case 2:
            if (!(notebookList[0].color === null && notebookList[0].id)) {
              _context11.next = 8;
              break;
            }

            _context11.next = 5;
            return _this6.updateChapterColor(notebookList[0].id);

          case 5:
            _yield$_this6$updateC = _context11.sent;
            color = _yield$_this6$updateC.color;
            notebookList[0].color = color;

          case 8:
            return _context11.abrupt("return", notebookList);

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }))();
}), _defineProperty(_observable$2, "sortServerChapterList", function sortServerChapterList(notebookList) {
  var _this7 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var normalChapters, sharedChapters, getChapterNumType, firstSharedIdx;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            normalChapters = [], sharedChapters = [];

            if (!(notebookList.length === 0)) {
              _context12.next = 3;
              break;
            }

            return _context12.abrupt("return", {
              normalChapters: normalChapters,
              sharedChapters: sharedChapters
            });

          case 3:
            getChapterNumType = NoteUtil.getChapterNumType; // type : defalut(0), notebook(1), shared_page, shared 순으로 sort된다

            notebookList.sort(function (a, b) {
              return getChapterNumType(a.type) - getChapterNumType(b.type);
            });
            _context12.next = 7;
            return _this7.checkDefaultChapterColor(notebookList);

          case 7:
            notebookList = _context12.sent;
            firstSharedIdx = notebookList.findIndex(function (chapter) {
              return [CHAPTER_TYPE.SHARED_PAGE, CHAPTER_TYPE.SHARED].includes(chapter.type);
            });
            _context12.t0 = firstSharedIdx;
            _context12.next = _context12.t0 === 0 ? 12 : _context12.t0 === -1 ? 14 : 16;
            break;

          case 12:
            // 전달만 있는 경우
            sharedChapters = notebookList.slice(0);
            return _context12.abrupt("break", 19);

          case 14:
            // 전달 챕터/페이지 없는 경우
            normalChapters = notebookList.slice(0);
            return _context12.abrupt("break", 19);

          case 16:
            // 전달인거, 아닌거 다 있는 경우
            normalChapters = notebookList.slice(0, firstSharedIdx);
            sharedChapters = notebookList.slice(firstSharedIdx);
            return _context12.abrupt("break", 19);

          case 19:
            return _context12.abrupt("return", {
              normalChapters: normalChapters,
              sharedChapters: sharedChapters
            });

          case 20:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }))();
}), _defineProperty(_observable$2, "getNoteChapterList", function getNoteChapterList() {
  var _this8 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var _yield$NoteRepository11, notbookList, _yield$_this8$sortSer, normalChapters, sharedChapters;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return NoteRepository$1.getChapterList(NoteStore.getChannelId());

          case 2:
            _yield$NoteRepository11 = _context13.sent;
            notbookList = _yield$NoteRepository11.data.dto.notbookList;
            _context13.next = 6;
            return _this8.sortServerChapterList(notbookList);

          case 6:
            _yield$_this8$sortSer = _context13.sent;
            normalChapters = _yield$_this8$sortSer.normalChapters;
            sharedChapters = _yield$_this8$sortSer.sharedChapters;

            _this8.createMap(normalChapters);

            _this8.sharedCnt = sharedChapters.length;

            if (!localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
              // 비순수함수... normalChapter에 변경이 일어남(isFolded: false 추가)
              _this8.setLocalStorageItem(NoteStore.getChannelId(), normalChapters);
            } else {
              _this8.applyDifference(NoteStore.getChannelId(), normalChapters); // isFolded state 추가


              normalChapters = _this8.getLocalOrderChapterList(NoteStore.getChannelId(), normalChapters);
            }

            sharedChapters = _this8.getSharedFoldedState(sharedChapters);

            _this8.setChapterList(normalChapters.concat(sharedChapters));

            return _context13.abrupt("return", _this8.chapterList);

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }))();
}), _defineProperty(_observable$2, "getSharedFoldedState", function getSharedFoldedState(sharedChapters) {
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
      newFoldedMap.set(chapter.id, value);
      chapter.isFolded = value;
    });
  }

  localStorage.setItem("Note_sharedFoldedState_".concat(NoteStore.notechannel_id), JSON.stringify(newFoldedMap, NoteUtil.replacer));
  return sharedChapters;
}), _defineProperty(_observable$2, "getFirstPageFromChapter", function getFirstPageFromChapter(chapterId) {
  var _chapter$children$;

  var chapter = this.chapterList.find(function (chapter) {
    return chapter.id === chapterId;
  });
  if (!chapter || chapter.children.length === 0) return null;
  return (_chapter$children$ = chapter.children[0]) === null || _chapter$children$ === void 0 ? void 0 : _chapter$children$.id;
}), _defineProperty(_observable$2, "createNoteChapter", function createNoteChapter(chapterTitle, chapterColor) {
  var _this9 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var notbookList;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _this9.createChapter(chapterTitle, chapterColor);

          case 2:
            notbookList = _context14.sent;
            _context14.next = 5;
            return _this9.getNoteChapterList();

          case 5:
            _this9.setCurrentChapterId(notbookList.id);

            PageStore.setCurrentPageId(notbookList.children[0].id);
            PageStore.fetchCurrentPageData(notbookList.children[0].id);

            _this9.setChapterTempUl(false);

            _this9.setMoveInfoMap(new Map([[_this9.currentChapterId, _this9.createMoveInfo(_this9.currentChapterId)]]));

            PageStore.setMoveInfoMap(new Map([[PageStore.currentPageId, PageStore.createMoveInfo(PageStore.currentPageId, _this9.currentChapterId)]]));

          case 11:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }))();
}), _defineProperty(_observable$2, "deleteNoteChapter", function deleteNoteChapter() {
  var _this10 = this;

  this.deleteChapter(this.deleteChapterId).then(function () {
    _this10.getNoteChapterList();

    if (_this10.currentChapterId === _this10.deleteChapterId) {
      var _selectableChapter$ch, _selectableChapter$ch2;

      // 임시 코드. 서버 수정된 후 변경 예정.
      var currentChapterIdx = _this10.chapterList.findIndex(function (chapter) {
        return chapter.id === _this10.currentChapterId;
      });

      var selectableChapter = currentChapterIdx === 0 ? _this10.chapterList[1] : _this10.chapterList[currentChapterIdx - 1];

      _this10.setCurrentChapterId(selectableChapter === null || selectableChapter === void 0 ? void 0 : selectableChapter.id);

      PageStore.setCurrentPageId(selectableChapter === null || selectableChapter === void 0 ? void 0 : (_selectableChapter$ch = selectableChapter.children[0]) === null || _selectableChapter$ch === void 0 ? void 0 : _selectableChapter$ch.id);
      PageStore.fetchCurrentPageData(selectableChapter === null || selectableChapter === void 0 ? void 0 : (_selectableChapter$ch2 = selectableChapter.children[0]) === null || _selectableChapter$ch2 === void 0 ? void 0 : _selectableChapter$ch2.id);

      _this10.setMoveInfoMap(new Map([[_this10.currentChapterId, _this10.createMoveInfo(_this10.currentChapterId)]]));

      PageStore.setMoveInfoMap(new Map([[PageStore.currentPageId, PageStore.createMoveInfo(PageStore.currentPageId, _this10.currentChapterId)]]));
    }

    _this10.deleteChapterId = '';
    NoteStore.setShowModal(false);
  });
}), _defineProperty(_observable$2, "renameNoteChapter", function renameNoteChapter(color) {
  var _this11 = this;

  this.renameChapter(this.renameId, this.renameText, color).then(function (dto) {
    if (_this11.moveInfoMap.get(dto.id)) _this11.moveInfoMap.get(dto.id).item.text = dto.text;

    _this11.getNoteChapterList();
  });
}), _defineProperty(_observable$2, "createMoveInfo", function createMoveInfo(chapterId) {
  var chapterIdx = this.chapterList.findIndex(function (chapter) {
    return chapter.id === chapterId;
  });
  if (chapterIdx < 0) return;
  return {
    item: this.chapterList[chapterIdx],
    chapterIdx: chapterIdx
  };
}), _defineProperty(_observable$2, "handleClickOutside", function handleClickOutside() {
  this.setIsCtrlKeyDown(false);

  if (!this.currentChapterId) {
    this.moveInfoMap.clear();
    return;
  }

  var currentMoveInfo = this.moveInfoMap.get(this.currentChapterId);
  if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentChapterId);
  this.setMoveInfoMap(new Map([[this.currentChapterId, currentMoveInfo]]));
}), _defineProperty(_observable$2, "getSortedMoveInfoList", function getSortedMoveInfoList() {
  var moveInfoList = _toConsumableArray(this.moveInfoMap).map(function (keyValue) {
    return keyValue[1];
  });

  return moveInfoList.sort(function (a, b) {
    return a.chapterIdx - b.chapterIdx;
  });
}), _defineProperty(_observable$2, "moveChapter", function moveChapter(moveTargetChapterIdx) {
  var _this12 = this;

  var item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
  var sortedMoveInfoList = this.getSortedMoveInfoList();
  var sortedMoveChapters = sortedMoveInfoList.map(function (moveInfo) {
    return item[moveInfo.chapterIdx];
  });
  var chapters = [];
  item.forEach(function (chapter, idx) {
    if (idx === moveTargetChapterIdx) chapters.push.apply(chapters, _toConsumableArray(sortedMoveChapters));
    if (!_this12.moveInfoMap.get(chapter.id)) chapters.push(chapter);
  });
  if (moveTargetChapterIdx >= chapters.length) chapters.push.apply(chapters, _toConsumableArray(sortedMoveChapters));
  var moveCnt = 0;
  var startIdx = chapters.findIndex(function (chapter) {
    return chapter.id === sortedMoveInfoList[0].item.id;
  });
  sortedMoveInfoList.forEach(function (moveInfo, idx) {
    if (moveInfo.chapterIdx !== startIdx + idx) moveCnt++;

    _this12.moveInfoMap.set(moveInfo.item.id, {
      item: moveInfo.item,
      chapterIdx: startIdx + idx
    });
  });

  if (moveCnt > 0) {
    localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(chapters));
    this.getNoteChapterList().then(function () {
      _this12.currentChapterId = sortedMoveChapters[0].id;
      PageStore.currentPageId = sortedMoveChapters[0].children[0];
      NoteStore.setIsDragging(false);
      if (!PageStore.currentPageId) PageStore.clearMoveInfoMap();else PageStore.setMoveInfoMap(new Map([[PageStore.currentPageId, PageStore.createMoveInfo(PageStore.currentPageId, _this12.currentChapterId)]]));
      PageStore.fetchCurrentPageData(sortedMoveChapters[0].children[0]).then(function () {
        NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_02', {
          moveCnt: moveCnt
        }));
        NoteStore.setIsVisibleToast(true);
      });
    });
  } else {
    this.handleClickOutside();
    NoteStore.setIsDragging(false);
  }
}), _defineProperty(_observable$2, "initSearchVar", function initSearchVar() {
  this.setIsLoadingSearchResult(false);
  this.setIsSearching(false);
  this.setIsTagSearching(false);
  this.setSearchResult({});
  this.setSearchStr("");
}), _defineProperty(_observable$2, "getChapterFirstPage", function getChapterFirstPage(targetId) {
  var _this13 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _this13.getChapterList().then(function (chapterList) {
              var targetChapter = chapterList.filter(function (chapter) {
                return chapter.id === targetId;
              })[0];

              if (targetChapter.children.length > 0) {
                PageStore.setCurrentPageId(targetChapter.children[0].id);
                PageStore.fetchCurrentPageData(targetChapter.children[0].id);
              } else PageStore.setCurrentPageId('');
            });

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }))();
}), _defineProperty(_observable$2, "getSearchResult", function getSearchResult() {
  var _this14 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            // 모바일 안정화 이후로 (fetchSearchResult) 대신 바꿀 예정 
            _this14.setIsSearching(true);

            _this14.setIsLoadingSearchResult(true);

            _this14.getSearchList().then(function (dto) {
              _this14.setSearchResult({
                chapter: dto.chapterList,
                page: dto.pageList
              });

              _this14.setIsLoadingSearchResult(false);
            });

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }))();
}), _defineProperty(_observable$2, "fetchSearchResult", function fetchSearchResult() {
  var _this15 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _this15.setIsSearching(true); // 검색 결과 출력 종료까지임


            _this15.setIsLoadingSearchResult(true); // 검색 실행 중 화면
            // await this.getSearchResult();


            _this15.getSearchList().then(function (dto) {
              if (dto.pageList && dto.pageList.length > 0) {
                dto.pageList.map(function (page) {
                  _this15.getChapterInfoList(page.parent_notebook).then(function (dto) {
                    page.parentColor = dto.color;
                    page.parentText = dto.text;
                  }).then(function () {
                    _this15.setSearchResult({
                      chapter: dto.chapterList,
                      page: dto.pageList
                    });

                    _this15.setIsLoadingSearchResult(false);
                  });
                });
              } else {
                _this15.setSearchResult({
                  chapter: dto.chapterList,
                  page: dto.pageList
                });

                _this15.setIsLoadingSearchResult(false);
              }
            });

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }))();
}), _defineProperty(_observable$2, "createShareChapter", function createShareChapter(targetList) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    var _yield$NoteRepository12, dto;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return NoteRepository$1.createShareChapter(targetList);

          case 2:
            _yield$NoteRepository12 = _context18.sent;
            dto = _yield$NoteRepository12.data.dto;
            return _context18.abrupt("return", dto);

          case 5:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }))();
}), _defineProperty(_observable$2, "createNoteShareChapter", function createNoteShareChapter(targetRoomId, targetChapterList) {
  var _this16 = this;

  if (!targetChapterList) return;
  var targetChId = NoteStore.getTargetChId(targetRoomId);
  var targetList = targetChapterList.map(function (chapter) {
    return {
      id: chapter.id,
      ws_id: NoteRepository$1.WS_ID,
      note_channel_id: NoteRepository$1.chId,
      text: chapter.text,
      USER_ID: NoteRepository$1.USER_ID,
      shared_user_id: NoteRepository$1.USER_ID,
      shared_room_name: NoteRepository$1.WS_ID,
      target_workspace_id: targetRoomId,
      target_channel_id: targetChId
    };
  });
  this.createShareChapter(targetList).then(function () {
    _this16.getNoteChapterList();

    NoteStore.setIsDragging(false);
  });
}), _defineProperty(_observable$2, "getFirstRenderedChapter", function getFirstRenderedChapter() {
  if (this.chapterList.length > 0) return this.chapterList[0];
  return null;
}), _defineProperty(_observable$2, "setFirstMoveInfoMap", function setFirstMoveInfoMap(targetChapter) {
  this.setMoveInfoMap(new Map([[targetChapter.id, {
    item: targetChapter,
    chapterIdx: 0
  }]]));

  if (targetChapter.children.length > 0) {
    var targetPage = targetChapter.children[0];
    PageStore.setMoveInfoMap(new Map([[targetPage.id, {
      item: targetPage,
      pageIdx: 0,
      chapterId: targetChapter.id,
      chapterIdx: 0
    }]]));
  }
}), _defineProperty(_observable$2, "setFirstNoteInfo", function setFirstNoteInfo() {
  var _this17 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
    var targetChapter, chapterId, pageId;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            targetChapter = _this17.getFirstRenderedChapter();

            if (targetChapter) {
              _context19.next = 5;
              break;
            }

            _this17.setCurrentChapterId('');

            PageStore.setCurrentPageId('');
            return _context19.abrupt("return");

          case 5:
            _this17.setFirstMoveInfoMap(targetChapter);

            chapterId = targetChapter.id;
            pageId = targetChapter.children.length > 0 ? targetChapter.children[0].id : ''; // setCurrentPageId는 fetchNoetInfoList에서

            _context19.next = 10;
            return PageStore.fetchCurrentPageData(pageId);

          case 10:
            // pageContainer에서 currentChapterId만 있고 pageId가 없으면 render pageNotFound component
            // fetch page data 끝날 때까지 loading img 띄우도록 나중에 set chapter id
            _this17.setCurrentChapterId(chapterId);

          case 11:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }))();
}), _defineProperty(_observable$2, "fetchFirstNote", function fetchFirstNote() {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            ChapterStore.setLoadingPageInfo(true);
            _context20.next = 3;
            return ChapterStore.setFirstNoteInfo();

          case 3:
            ChapterStore.setLoadingPageInfo(false);

          case 4:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }))();
}), _defineProperty(_observable$2, "fetchChapterList", function fetchChapterList() {
  var _this18 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _this18.setLoadingPageInfo(true);

            _context21.next = 3;
            return _this18.getNoteChapterList();

          case 3:
            if (!(_this18.chapterList.length > 0)) {
              _context21.next = 6;
              break;
            }

            _context21.next = 6;
            return _this18.setFirstNoteInfo();

          case 6:
            _this18.setLoadingPageInfo(false);

          case 7:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }))();
}), _observable$2));

/*
  target 컴포넌트가 계속 바뀌어서 헷갈림
  open + target 컴포넌트 이름
*/

var NoteMeta = {
  // antd modal prop 설정
  openModal: function openModal(type) {
    return this.setModalConfig(type);
  },
  // antd modal prop 만들기
  setModalConfig: function setModalConfig(type) {
    var handleCancel = function handleCancel(e) {
      e.stopPropagation();
      NoteStore.setModalInfo(null);
      NoteStore.setIsShared(false);
    };

    var initialConfig = {
      targetComponent: "Modal",
      modalName: type,
      handleCancel: handleCancel
    };

    switch (type) {
      case "viewInfo":
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: i18n.t('NOTE_DELIVER_CONTEXT_MENU_04'),
          className: "viewInfoModal"
        });

      case "forward":
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: i18n.t('CM_FORWARD'),
          className: "forwardModal"
        });

      default:
        return;
    }
  },
  // core - Modal prop 설정
  openMessage: function openMessage(type) {
    return this.setMessageConfig(this.setMessageInfoConfig(type), this.setEventConfig(type));
  },
  // Modal(core - Message) prop 만들기
  setMessageConfig: function setMessageConfig(dialogType, eventList) {
    var buttonList = []; // type, shape, onClick, text 

    eventList.map(function (event, index) {
      dialogType.btns[index].onClick = event;
      buttonList.push(dialogType.btns[index]);
    });
    return {
      targetComponent: "Message",
      modalName: dialogType.modalName,
      // openMessage의 인자인 type
      type: dialogType.type,
      title: dialogType.title,
      subTitle: dialogType.subtitle,
      btns: buttonList
    };
  },
  setEventConfig: function setEventConfig(type) {
    var eventList = [];

    switch (type) {
      case 'chapter':
        // 삭제 함수 추가
        eventList.push(function (e) {
          e.stopPropagation();
          ChapterStore.deleteNoteChapter();
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'page':
        // 삭제 함수 추가
        eventList.push(function (e) {
          e.stopPropagation();

          if (PageStore.lastSharedPageParentId) {
            ChapterStore.setDeleteChapterId(PageStore.lastSharedPageParentId);
            ChapterStore.deleteNoteChapter();
          } else PageStore.deleteNotePage();

          if (EditorStore.fileList) EditorStore.deleteAllFile();
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'editCancel':
        eventList.push(function (e) {
          e.stopPropagation();

          if (EditorStore.isSearch) {
            var _EditorStore$tinymce;

            var instance = new Mark((_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : _EditorStore$tinymce.getBody());
            instance.unmark();
          }

          PageStore.handleSave();
          import('teespace-core').then(function (module) {
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
          if (PageStore.isNewPage) PageStore.handleNoneEdit();else {
            if (EditorStore.notSaveFileList.length > 0) {
              EditorStore.notSaveFileDelete().then(function () {
                var _EditorStore$tinymce2;

                PageStore.noteNoneEdit(PageStore.currentPageId);
                (_EditorStore$tinymce2 = EditorStore.tinymce) === null || _EditorStore$tinymce2 === void 0 ? void 0 : _EditorStore$tinymce2.undoManager.clear();
              });
            } else {
              var _EditorStore$tinymce3;

              PageStore.noteNoneEdit(PageStore.currentPageId);
              (_EditorStore$tinymce3 = EditorStore.tinymce) === null || _EditorStore$tinymce3 === void 0 ? void 0 : _EditorStore$tinymce3.undoManager.clear();
            }
          }
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'fileOpenMail':
      case 'uploadingFiles':
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
      // NoteFile을 import해야해서 NoeModal component에서 이벤트 추가함

      case 'failUploadByFileNameLen':
        eventList.push(function (e) {});
        break;
    }

    return eventList;
  },
  setBtns: function setBtns(type) {
    var shape = "default";
    var defaultBtn1 = {
      type: "solid",
      shape: shape,
      text: i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_03')
    }; // 버튼 한 개일 때랑 text 바꿔서 사용

    var defaultBtn2 = {
      type: "default",
      shape: shape,
      text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05')
    };

    switch (type) {
      case 'delete':
        // chapter랑 page
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')
        }), defaultBtn2];

      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadByFileNameLen':
      case 'uploadingFiles':
        return [defaultBtn1];

      case 'editCancel':
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: i18n.t('NOTE_PAGE_LIST_ADD_NEW_PGE_04')
        }), _objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: i18n.t('NOTE_EDIT_PAGE_COMPLETE_02')
        }), defaultBtn2];

      default:
        return;
    }
  },
  setMessageInfoConfig: function setMessageInfoConfig(type) {
    // const userName = '';
    var fileName = EditorStore.deleteFileName; // type이 error면 빨간색, error말고 다른 색이면 보라색

    var dialogType = {
      type: 'default',
      modalName: type,
      title: '',
      subtitle: '',
      btns: []
    }; // const editingUserName = PageStore.editingUserName;

    switch (type) {
      case 'chapter':
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_06';
        dialogType.subtitle = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_07';
        dialogType.btns = this.setBtns('delete');
        break;

      case 'page':
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_03';
        dialogType.btns = this.setBtns('delete');
        break;

      case 'confirm':
        dialogType.type = 'info';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', {
          userName: PageStore.editingUserName
        });
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_01';
        dialogType.btns = this.setBtns(type);
        break;

      case 'chapterconfirm':
        dialogType.type = 'info';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_08', {
          count: PageStore.editingUserCount
        });
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_01';
        dialogType.btns = this.setBtns(type);
        break;

      case 'editCancel':
        dialogType.title = 'NOTE_EDIT_PAGE_COMPLETE_01';
        dialogType.btns = this.setBtns(type);
        break;

      case 'titleDuplicate':
        dialogType.title = 'NOTE_PAGE_LIST_CREATE_N_CHPT_01';
        dialogType.subtitle = 'NOTE_PAGE_LIST_CREATE_N_CHPT_02';
        dialogType.btns = this.setBtns(type);
        break;

      case 'duplicateTagName':
        dialogType.title = 'NOTE_EDIT_PAGE_ADD_TAG_01';
        dialogType.btns = this.setBtns(type);
        break;

      case 'editingPage':
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', {
          userName: PageStore.editingUserName
        });
        dialogType.title = 'NOTE_EDIT_PAGE_CANT_EDIT_01';
        dialogType.btns = this.setBtns('editingPage');
        break;

      case 'deletedPage':
        dialogType.title = 'TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01';
        dialogType.btns = this.setBtns('deletedPage');
        break;

      case 'multiFileSomeFail':
        dialogType.subtitle = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_07', {
          uploadCnt: EditorStore.uploadLength,
          failCnt: EditorStore.failCount
        });
        dialogType.title = 'NOTE_EDIT_PAGE_ATTACH_FILE_06';
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;

      case 'sizefailUpload':
        dialogType.title = 'NOTE_EDIT_PAGE_ATTACH_FILE_04';
        dialogType.btns = this.setBtns('sizefailUpload');
        break;

      case 'failUpload':
        dialogType.title = 'NOTE_EDIT_PAGE_ATTACH_FILE_05';
        dialogType.btns = this.setBtns('failUpload');
        break;

      case 'failUploadByFileNameLen':
        dialogType.title = 'DRIVE_UPLOAD_BTN_04';
        dialogType.btns = this.setBtns(type);
        break;

      case 'uploadingFiles':
        dialogType.title = '업로드 중인 파일이 있습니다.'; // 아직 기능이 완벽하게 구현 안된거라 i18n은 기능 구현 후

        dialogType.btns = this.setBtns(type);
    }

    return dialogType;
  }
};

var handleWebsocket = function handleWebsocket() {
  var isWeb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return function (message) {
    var EVENT_TYPE = {
      CREATE: "CREATE",
      DELETE: "DELETE",
      UPDATE: "UPDATE",
      EDIT_START: "EDIT",
      EDIT_DONE: "EDITDONE",
      RENAME: "RENAME",
      CHAPTER_RENAME: "CHAPTERRENAME",
      CHAPTER_CREATE: "CHAPTERCREATE",
      CHAPTER_DELETE: "CHAPTERDELETE",
      NONEDIT: "NONEDIT",
      MOVE: "MOVE"
    };

    if (message.NOTI_ETC === null) {
      console.warn(" NOTE_ETC is empty");
      return;
    }

    if (message.NOTI_ETC) {
      var loginUSER = NoteRepository$1.USER_ID;
      var EVENT_CASE = message.NOTI_ETC.split(',')[0];
      var targetID = message.NOTI_ETC.split(',')[1];
      var targetUSER = message.NOTI_ETC.split(',')[2];

      switch (EVENT_CASE) {
        case EVENT_TYPE.CREATE:
          if (isWeb && targetUSER === loginUSER) return;else ChapterStore.getNoteChapterList();
          break;

        case EVENT_TYPE.DELETE:
          if (isWeb && targetUSER === loginUSER) return;else {
            if (PageStore.getCurrentPageId() === targetID) {
              ChapterStore.setCurrentChapterId(ChapterStore.getCurrentChapterId());
              ChapterStore.getChapterFirstPage(ChapterStore.getCurrentChapterId());
            }

            ChapterStore.getNoteChapterList();
          }
          break;

        case EVENT_TYPE.UPDATE:
        case EVENT_TYPE.EDIT_DONE:
        case EVENT_TYPE.NONEDIT:
        case EVENT_TYPE.EDIT_START:
          // EDIT,NOTE_ID:USER_ID
          if (isWeb && targetUSER === loginUSER) return;

          if (PageStore.getCurrentPageId() === targetID) {
            PageStore.fetchCurrentPageData(PageStore.getCurrentPageId());
          }

          ChapterStore.getNoteChapterList();
          break;

        case EVENT_TYPE.MOVE:
          // 서버에서 곧 넣을 예정
          break;

        case EVENT_TYPE.CHAPTER_CREATE:
        case EVENT_TYPE.CHAPTER_RENAME:
          if (isWeb && targetUSER === loginUSER) return;else {
            ChapterStore.getNoteChapterList();
          }
          break;

        case EVENT_TYPE.CHAPTER_DELETE:
          if (isWeb && targetUSER === loginUSER) return;else {
            if (ChapterStore.getCurrentChapterId() === targetID) {
              ChapterStore.getNoteChapterList();
              setTimeout(function () {
                if (ChapterStore.chapterList && ChapterStore.chapterList.length > 0) {
                  var firstChapter = ChapterStore.chapterList[0];
                  ChapterStore.setCurrentChapterId(firstChapter.id);

                  if (firstChapter.children && firstChapter.children.length > 0) {
                    PageStore.fetchCurrentPageData(firstChapter.children[0].id);
                  } else PageStore.setCurrentPageId('');
                } else NoteStore.setShowPage(false);
              }, 200);
            } else ChapterStore.getNoteChapterList();
          }
          break;
      }
    }
  };
};

var NoteStore = observable({
  noteIdFromTalk: '',
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
  modalInfo: {},
  LNBChapterCoverRef: '',
  isDragging: false,
  draggedType: '',
  draggedItems: [],
  draggedOffset: {},
  sharedInfo: {},
  isShared: false,
  shareNoteType: '',
  shareContent: '',
  shareArrays: {},
  // { userArray, roomArray }
  isMailShare: false,
  mailShareFileObjs: [],
  mailReceiver: [],
  isVisibleToast: false,
  toastText: '',
  i18nLanguage: 'ko',
  i18nKeyMap: '',
  isExporting: false,
  getNoteIdFromTalk: function getNoteIdFromTalk() {
    return this.noteIdFromTalk;
  },
  setNoteIdFromTalk: function setNoteIdFromTalk(noteId) {
    this.noteIdFromTalk = noteId;
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
  // todo : mobile이랑 ptask에 알리고 parameter를 객체로 바꾸기
  init: function init(roomId, channelId, userId, userName, userEmail, callback) {
    this.setWsId(roomId);
    this.setChannelId(channelId);
    this.setUserId(userId);
    this.setUserName(userName);
    this.setUserEmail(userEmail);
    if (typeof callback === 'function') callback();
  },
  initVariables: function initVariables() {
    // A방에서 lnb 검색 후 B방으로 이동했을 때 init 필요
    ChapterStore.initSearchVar();
    ChapterStore.setCurrentChapterId('');
    PageStore.setCurrentPageId('');
    ChapterStore.setChapterList([]);
    TagStore.setNoteTagList([]);
    TagStore.setTagPanelLoading(true); // 처음에 '태그 없습니다' 페이지가 보이지 않아야 함!
    // 룸 변경시 전에 방문했던 룸의 태그를 잠깐 보여줘서 init

    TagStore.setAllSortedTagList([]);
    TagStore.setSortedTagList([]);
    this.setShowPage(true);
    this.setIsMailShare(false);
  },
  setI18nLanguage: function setI18nLanguage(lang) {
    this.i18nLanguage = lang;
  },
  addWWMSHandler: function addWWMSHandler() {
    var isWeb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (WWMS.handlers.get('CHN0003') === undefined) WWMS.addHandler('CHN0003', 'NoteWWMSHandler', handleWebsocket(isWeb));
  },
  getNoteFileList: function getNoteFileList() {
    return this.noteFileList;
  },
  setShowPage: function setShowPage(showPage) {
    // true or false
    this.showPage = showPage;

    if (showPage === false) {
      ChapterStore.setCurrentChapterId('');
      PageStore.setCurrentPageId('');
      PageStore.setIsEdit('');
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
  setIsShared: function setIsShared(flag) {
    this.isShared = flag;
  },
  setShareNoteType: function setShareNoteType(noteType) {
    this.shareNoteType = noteType;
  },
  setShareContent: function setShareContent(content) {
    this.shareContent = content;
  },
  setShareArrays: function setShareArrays(arrs) {
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
  // { type, title, subTitle, buttons }
  setModalInfo: function setModalInfo(modalType) {
    switch (modalType) {
      // AntdModal로 연다
      case 'viewInfo':
      case 'forward':
        this.modalInfo = NoteMeta.openModal(modalType);
        this.setShowModal(true);
        break;

      case 'chapterconfirm':
      case 'confirm':
      case 'chapter':
      case 'page':
      case 'editCancel':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'editingPage':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadByFileNameLen':
      case 'uploadingFiles':
        // todo
        this.modalInfo = NoteMeta.openMessage(modalType);
        this.setShowModal(true);
        break;

      case null:
      default:
        this.modalInfo = {};
        this.setShowModal(false);
        break;
    }
  },
  handleSharedInfo: function handleSharedInfo(type, id) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var noteInfo, sharedRoom, _yield$UserStore$getP, name, nick;

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
              sharedRoom = RoomStore.getRoom(noteInfo.shared_room_name);
              _context.next = 13;
              return UserStore.getProfile({
                userId: noteInfo.shared_user_id
              });

            case 13:
              _yield$UserStore$getP = _context.sent;
              name = _yield$UserStore$getP.name;
              nick = _yield$UserStore$getP.nick;
              _this.sharedInfo = {
                sharedRoomName: sharedRoom ? sharedRoom.isMyRoom ? _this.userName : sharedRoom.name : nick ? nick : name // 내가 속하지 않은 방에서 전달받은 경우 룸이름 요청하는 서비스콜 기다리는 중
                ,
                sharedUserName: nick ? nick : name,
                sharedDate: !noteInfo.created_date ? PageStore.modifiedDateFormatting(noteInfo.shared_date, true) : PageStore.modifiedDateFormatting(noteInfo.created_date, true)
              };

              _this.setModalInfo('viewInfo');

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getTargetChId: function getTargetChId(targetRoomId, chType) {
    return RoomStore.getChannelIds({
      roomId: targetRoomId
    })[chType ? chType : NoteRepository$1.CH_TYPE];
  },
  getSharedRoomName: function getSharedRoomName() {
    return RoomStore.getRoom(NoteRepository$1.WS_ID).isMyRoom ? this.userName : RoomStore.getRoom(NoteRepository$1.WS_ID).name;
  },
  shareNote: function shareNote() {
    var _this2 = this;

    this.shareArrays.userArray.forEach( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
        var friendId, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                friendId = user.friendId ? user.friendId : user.id;
                _context2.next = 3;
                return RoomStore.createRoom({
                  creatorId: _this2.user_id,
                  userList: [{
                    userId: friendId
                  }]
                });

              case 3:
                res = _context2.sent;
                if (_this2.shareNoteType === 'chapter') ChapterStore.createNoteShareChapter(res.roomId, [_this2.shareContent]);else if (_this2.shareNoteType === 'page') PageStore.createNoteSharePage(res.roomId, [_this2.shareContent]);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    this.shareArrays.roomArray.forEach(function (room) {
      if (!room.isVisible) {
        RoomStore.activateRoom({
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
  openNote: function openNote(noteId) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this3.setLoadingNoteApp(true);

              _this3.setShowPage(true);

              _this3.setTargetLayout('Content');

              _context4.next = 5;
              return PageStore.fetchCurrentPageData(noteId);

            case 5:
              _this3.setLoadingNoteApp(false);

              _this3.setNoteIdFromTalk("");

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
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

export { useNoteStore };
