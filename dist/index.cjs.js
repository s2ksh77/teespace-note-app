'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var teespaceCore = require('teespace-core');
var ramda = require('ramda');
require('styled-components');
var Mark = require('mark.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Mark__default = /*#__PURE__*/_interopDefaultLegacy(Mark);

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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
                return teespaceCore.API.post("note-api/notebooks", {
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
                return teespaceCore.API.delete("note-api/notebook?action=Delete&id=".concat(chapterId, "&note_channel_id=").concat(this.chId, "&USER_ID=").concat(this.USER_ID));

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
                return teespaceCore.API.put("note-api/notebooks?action=Update", {
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
                return _context9.abrupt("return", teespaceCore.API.Post("note-api/note", {
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
                return teespaceCore.API.Post("note-api/note?action=Delete", {
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
                return teespaceCore.API.Put("note-api/note?action=Update", {
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
                return teespaceCore.API.post("note-api/note?action=Update", updateDto);

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
                return teespaceCore.API.post("note-api/note?action=Update", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    USER_ID: userId,
                    note_channel_id: this.chId,
                    note_id: noteId,
                    is_edit: '',
                    parent_notebook: chapterId,
                    TYPE: 'NONEDIT',
                    user_name: userName
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
                return teespaceCore.API.post("note-api/tag", {
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
                return teespaceCore.API.post("note-api/tag?action=Delete", {
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
                return teespaceCore.API.post("note-api/tag?action=Update", {
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
                return teespaceCore.API.post("note-api/noteFile", dto);

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
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(deleteFileId) {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                _context22.next = 3;
                return teespaceCore.API.put("note-api/noteFile?action=Delete", {
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

      function deleteFile(_x36) {
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
        return teespaceCore.API.put("Storage/StorageFile?action=MultiDelete", {
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
      var _getSearchList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(searchKey) {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.prev = 0;
                _context23.next = 3;
                return teespaceCore.API.post("note-api/noteSearch?action=List", {
                  dto: {
                    note_channel_id: this.chId,
                    text: searchKey
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

      function getSearchList(_x37) {
        return _getSearchList.apply(this, arguments);
      }

      return getSearchList;
    }()
  }, {
    key: "createFileMeta",
    value: function () {
      var _createFileMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(targetList) {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return teespaceCore.API.post("note-api/noteFileMeta", {
                  dto: {
                    fileList: targetList
                  }
                });

              case 2:
                return _context24.abrupt("return", _context24.sent);

              case 3:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      }));

      function createFileMeta(_x38) {
        return _createFileMeta.apply(this, arguments);
      }

      return createFileMeta;
    }()
  }]);

  return NoteRepository;
}();

var NoteRepository$1 = new NoteRepository();

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
  }
};

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

var checkNotDuplicateIgnoreCase = function checkNotDuplicateIgnoreCase(targetArr, key, value) {
  return targetArr.find(function (item) {
    return NoteUtil.encodeStr(item[key].toUpperCase()) === NoteUtil.encodeStr(value.toUpperCase());
  }) ? false : true;
};

var TagStore = mobx.observable({
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
  tagKeyArr: [],
  // sort해서 그림
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
  getKeyTagPairObj: function getKeyTagPairObj() {
    return this.keyTagPairObj;
  },
  setKeyTagPairObj: function setKeyTagPairObj(obj) {
    this.keyTagPairObj = obj;
  },
  getSortedTagList: function getSortedTagList() {
    return this.sortedTagList;
  },
  setSortedTagList: function setSortedTagList(tagList) {
    this.sortedTagList = tagList;
  },
  getTagKeyArr: function getTagKeyArr() {
    return this.tagKeyArr;
  },
  setTagKeyArr: function setTagKeyArr(arr) {
    this.tagKeyArr = arr;
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
  // 서버에서 받아와서 store 변수에 set하기
  fetchAllSortedTagList: function fetchAllSortedTagList() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var _yield$NoteRepository6, tag_index_list_dto;

      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return NoteRepository$1.getAllSortedTagList();

            case 2:
              _yield$NoteRepository6 = _context11.sent;
              tag_index_list_dto = _yield$NoteRepository6.data.dto.tag_index_list_dto;

              _this6.setAllSortedTagList(tag_index_list_dto);

              return _context11.abrupt("return", _this6.allSortedTagList);

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
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
  fetchTagData: function fetchTagData() {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _this7.fetchAllSortedTagList();

            case 2:
              // 키-태그 pair obj
              _this7.createKeyTagPairObj(); // kor, eng, num, etc별 sort한 키


              _this7.categorizeTagObj();

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
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

              _context13.next = 5;
              return _this8.fetchAllSortedTagList();

            case 5:
              // 키-태그 pair obj
              _this8.createSearchResultObj(str); // kor, eng, num, etc별 sort한 키


              _this8.categorizeTagObj();

              _this8.setIsSearchLoading(false);

            case 8:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  },
  // search result용 KeyTagObj
  createSearchResultObj: function createSearchResultObj(str) {
    var results = {};
    var _tagKeyArr = [];
    this.allSortedTagList.forEach(function (item) {
      var KEY = item.KEY;
      var resultKeyTags = {};
      item.tag_indexdto.tagList.forEach(function (tag) {
        var tagName = NoteUtil.decodeStr(tag.text);
        if (!tagName.toUpperCase().includes(str.toUpperCase())) return;

        if (resultKeyTags.hasOwnProperty(tagName)) {
          resultKeyTags[tagName]["note_id"].push(tag.note_id);
        } else {
          resultKeyTags[tagName] = {
            id: tag.tag_id,
            note_id: [tag.note_id]
          };
        }
      });

      if (Object.keys(resultKeyTags).length > 0) {
        results[KEY.toUpperCase()] = resultKeyTags;
        if (_tagKeyArr.indexOf(KEY.toUpperCase()) === -1) _tagKeyArr.push(KEY.toUpperCase());
      }
    });
    this.setKeyTagPairObj(_objectSpread2({}, results));
    this.setTagKeyArr(_toConsumableArray(_tagKeyArr.sort()));
    return this.keyTagPairObj;
  },
  createKeyTagPairObj: function createKeyTagPairObj() {
    /*
      this.keyTagPairObj 만들기
      item : KEY별로
      this.keyTagPairObj = 
      {"ㄱ" : {tagName1:{tagId:'', note_id:[]},
               tagName2:{tagId:'', note_id:[]}}        
      }
      정렬 순서는 대소문자 구분하지 않음!
    */
    var results = {};
    var _tagKeyArr = [];
    this.allSortedTagList.forEach(function (item) {
      var KEY = item.KEY;
      var resultObj = {}; // 'ㄱ','ㄴ'... 해당 KEY에 속한 TAG LIST

      item.tag_indexdto.tagList.forEach(function (tag) {
        tag.text = NoteUtil.decodeStr(tag.text);
        if (resultObj.hasOwnProperty(tag.text)) resultObj[tag.text]["note_id"] = [].concat(_toConsumableArray(resultObj[tag.text]["note_id"]), [tag.note_id]);else {
          resultObj[tag.text] = {
            id: tag.tag_id,
            note_id: [tag.note_id]
          };
        }
      });
      results[KEY.toUpperCase()] = resultObj;
      if (_tagKeyArr.indexOf(KEY.toUpperCase()) === -1) _tagKeyArr.push(KEY.toUpperCase());
    });
    this.setKeyTagPairObj(_objectSpread2({}, results));
    this.setTagKeyArr(_toConsumableArray(_tagKeyArr.sort()));
    return this.keyTagPairObj;
  },
  getEngTagObj: function getEngTagObj(key) {
    var sortedEngTags = {}; // targetKeyObj : {tagName1:{tagId:'', note_id:[]}, tagName2:{tagId:'', note_id:[]}} 

    var targetKeyObj = this.keyTagPairObj[key];
    var sortedTagName = Object.keys(targetKeyObj).sort(function (a, b) {
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1; // 순서 바꾼다
      }

      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }

      return 0;
    }); // 영문 시작 태그 keyTagPairObj 다시 만들어주기

    sortedTagName.forEach(function (tagName) {
      sortedEngTags[tagName] = targetKeyObj[tagName];
    });
    return sortedEngTags;
  },
  // kor, eng, num, etc별 sort한 키
  categorizeTagObj: function categorizeTagObj() {
    var _this9 = this;

    this.setSortedTagList({});
    var _sortedTagList = {}; // sort하고 분류해서 koArr, engArr, numArr, etcArr은 sort 돼 있음

    var korObj = {},
        engObj = {},
        numObj = {},
        etcObj = {};

    if (this.tagKeyArr.length > 0) {
      this.tagKeyArr.forEach(function (key) {
        if (key.charCodeAt(0) >= 12593 && key.charCodeAt(0) < 55203) {
          korObj[key] = _this9.keyTagPairObj[key];
        } else if (key.charCodeAt(0) > 64 && key.charCodeAt(0) < 123) {
          // engObj[key] = this.keyTagPairObj[key];
          engObj[key] = _this9.getEngTagObj(key);
        } else if (key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57) {
          numObj[key] = _this9.keyTagPairObj[key];
        } else {
          etcObj[key] = _this9.keyTagPairObj[key];
        }
      });

      if (TagStore.isSearching) {
        if (Object.keys(korObj).length > 0) _sortedTagList["KOR"] = korObj;
        if (Object.keys(engObj).length > 0) _sortedTagList["ENG"] = engObj;
        if (Object.keys(numObj).length > 0) _sortedTagList["NUM"] = numObj;
        if (Object.keys(etcObj).length > 0) _sortedTagList["ETC"] = etcObj;
      } else {
        _sortedTagList["KOR"] = korObj;
        _sortedTagList["ENG"] = engObj;
        _sortedTagList["NUM"] = numObj;
        _sortedTagList["ETC"] = etcObj;
      }

      this.setSortedTagList(_sortedTagList);
    } else this.setSortedTagList([]);
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
    var _this10 = this;

    // add Tag List 갱신
    this.addTagList.forEach(function (tag, index) {
      if (tag === TagStore.currentTagValue) _this10.addTagList[index] = TagStore.editTagValue;
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
var EditorStore = mobx.observable((_observable = {
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
  processLength: 0,
  processCount: 0,
  failCount: 0,
  searchResultState: false,
  searchCurrentCount: 1,
  searchTotalCount: 0,
  searchValue: '',
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
    this.isSearch = false;
    this.searchResultState = false;
    this.searchValue = '';
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
  }
}, _defineProperty(_observable, "uploadFile", function () {
  var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dto, file, index) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
            return _context3.stop();
        }
      }
    }, _callee3, this);
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _yield$NoteRepository3, dto;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return NoteRepository$1.deleteFile(deleteId);

          case 2:
            _yield$NoteRepository3 = _context4.sent;
            dto = _yield$NoteRepository3.data.dto;
            return _context4.abrupt("return", dto);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }))();
}), _defineProperty(_observable, "deleteAllFile", function deleteAllFile() {
  var _this2 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return NoteRepository$1.deleteAllFile(_this2.fileList).then(function (response) {
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
  var uploadArr = {
    uploadMeta: uploadMeta,
    file: file,
    type: type
  };
  this.setUploadDTO(uploadArr);
}), _defineProperty(_observable, "setUploadDTO", function setUploadDTO(meta) {
  this.uploadDTO.push(meta);
}), _defineProperty(_observable, "setTempFileList", function setTempFileList(target) {
  if (this.processCount !== this.uploadLength) {
    this.tempFileLayoutList.unshift(target);
    this.processCount++;
  } else this.processCount = 0;

  if (!this.isFile) this.setIsFile(true);
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var createCopyArray, _yield$NoteRepository4, dto;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            createCopyArray = [];
            fileArray.forEach(function (file) {
              createCopyArray.push({
                note_id: noteId,
                file_id: file
              });
            });
            _context6.next = 4;
            return NoteRepository$1.createFileMeta(createCopyArray);

          case 4:
            _yield$NoteRepository4 = _context6.sent;
            dto = _yield$NoteRepository4.data.dto;
            return _context6.abrupt("return", dto);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }))();
}), _defineProperty(_observable, "storageFileDeepCopy", function storageFileDeepCopy(fileId, type) {
  var _this3 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var _yield$NoteRepository5, dto, _dto$storageFileInfoL, file_id, file_name, file_extension, file_updated_at, file_size, isImage, tempMeta;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return NoteRepository$1.storageFileDeepCopy(fileId);

          case 2:
            _yield$NoteRepository5 = _context7.sent;
            dto = _yield$NoteRepository5.data.dto;

            if (!(dto.resultMsg === 'Success')) {
              _context7.next = 13;
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
            return _context7.abrupt("return", {
              id: file_id,
              type: type
            });

          case 13:
            EditorStore.failCount++;

          case 14:

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }))();
}), _defineProperty(_observable, "createDriveElement", function createDriveElement(type, fileId, fileName) {
  var targetSRC = "".concat(teespaceCore.API.baseURL, "/Storage/StorageFile?action=Download&fileID=").concat(fileId, "&workspaceID=").concat(NoteRepository$1.WS_ID, "&channelID=").concat(NoteRepository$1.chId, "&userID=").concat(NoteRepository$1.USER_ID);

  switch (type) {
    case 'image':
      EditorStore.tinymce.execCommand('mceInsertContent', false, '<img id="' + fileId + '" src="' + targetSRC + '" data-name="' + fileName + '"data-mce-src="' + targetSRC + '"/>');
      break;

    case 'video':
      EditorStore.tinymce.insertContent("<p>\n            <span class=\"mce-preview-object mce-object-video\" contenteditable=\"false\" data-mce-object=\"video\" data-mce-p-allowfullscreen=\"allowfullscreen\" data-mce-p-frameborder=\"no\" data-mce-p-scrolling=\"no\" data-mce-p-src='' data-mce-html=\"%20\">\n              <video width=\"400\" controls>\n                <source src=".concat(targetSRC, " />\n              </video>\n            </span>\n          </p>"));
      break;
  }
}), _defineProperty(_observable, "notSaveFileDelete", function notSaveFileDelete() {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var deleteArr;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            deleteArr = [];

            if (!(EditorStore.notSaveFileList.length > 0)) {
              _context8.next = 12;
              break;
            }

            deleteArr = mobx.toJS(EditorStore.notSaveFileList).map(function (item) {
              return EditorStore.deleteFile(item.file_id);
            });
            _context8.prev = 3;
            _context8.next = 6;
            return Promise.all(deleteArr).then(function () {
              EditorStore.notSaveFileList = [];
              if (EditorStore.tempFileLayoutList.length > 0) EditorStore.tempFileLayoutList = [];
            });

          case 6:
            _context8.next = 10;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](3);

          case 10:
            _context8.prev = 10;
            return _context8.finish(10);

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[3, 8, 10, 12]]);
  }))();
}), _observable));

var _observable$1;
var PageStore = mobx.observable((_observable$1 = {
  noteInfoList: [],
  currentPageData: [],
  isEdit: '',
  userNick: '',
  otherEdit: false,
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createPageId: '',
  createParent: '',
  createParentIdx: '',
  deletePageList: [],
  deleteParentIdx: '',
  selectablePageId: '',
  isRename: false,
  renamePageId: '',
  renamePagePrevText: '',
  renamePageText: '',
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
  getDeleteParentIdx: function getDeleteParentIdx() {
    return this.deleteParentIdx;
  },
  setDeleteParentIdx: function setDeleteParentIdx(chapterIdx) {
    this.deleteParentIdx = chapterIdx;
  },
  getSelectablePageId: function getSelectablePageId() {
    return this.selectablePageId;
  },
  setSelectablePageId: function setSelectablePageId(pageId) {
    this.selectablePageId = pageId;
  },
  getIsRename: function getIsRename() {
    return this.isRename;
  },
  setIsRename: function setIsRename(flag) {
    this.isRename = flag;
  },
  getRenamePageId: function getRenamePageId() {
    return this.renamePageId;
  },
  setRenamePageId: function setRenamePageId(pageId) {
    this.renamePageId = pageId;
  },
  getRenamePagePrevText: function getRenamePagePrevText() {
    return this.renamePagePrevText;
  },
  setRenamePagePrevText: function setRenamePagePrevText(pageText) {
    this.renamePagePrevText = pageText;
  },
  getRenamePageText: function getRenamePageText() {
    return this.renamePageText;
  },
  setRenamePageText: function setRenamePageText(pageText) {
    this.renamePageText = pageText;
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

    this.createPage('(제목 없음)', null, this.createParent).then(function (dto) {
      var _EditorStore$tinymce, _EditorStore$tinymce$, _EditorStore$tinymce2;

      EditorStore.setIsSearch(false);

      _this.setIsEdit(dto.is_edit);

      ChapterStore.getNoteChapterList();
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      _this.createPageId = dto.note_id;
      _this.currentPageId = dto.note_id;
      _this.isNewPage = true;
      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(dto.fileList);

      _this.initializeBoxColor();

      dto.note_content = NoteUtil.decodeStr('<p><br></p>');
      dto.note_title = NoteUtil.decodeStr('(제목 없음)');
      _this.currentPageData = dto;
      _this.noteTitle = '';
      _this.prevModifiedUserName = _this.currentPageData.user_name;
      _this.modifiedDate = _this.modifiedDateFormatting(_this.currentPageData.modified_date, false);
      NoteStore.setTargetLayout('Content');
      NoteStore.setShowPage(true);
      (_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : (_EditorStore$tinymce$ = _EditorStore$tinymce.undoManager) === null || _EditorStore$tinymce$ === void 0 ? void 0 : _EditorStore$tinymce$.clear();
      (_EditorStore$tinymce2 = EditorStore.tinymce) === null || _EditorStore$tinymce2 === void 0 ? void 0 : _EditorStore$tinymce2.focus();
    });
  },
  deleteNotePage: function deleteNotePage() {
    var _this2 = this;

    this.deletePage(this.deletePageList).then(function () {
      if (_this2.currentPageId === _this2.deletePageList[0].note_id) {
        _this2.setCurrentPageId(_this2.selectablePageId);

        _this2.fetchCurrentPageData(_this2.selectablePageId);
      }

      if (_this2.isNewPage) {
        if (NoteStore.layoutState === "collapse") {
          NoteStore.setTargetLayout('LNB');
          _this2.isNewPage = false;
          _this2.createPageId = '';

          _this2.setCurrentPageId('');

          ChapterStore.setCurrentChapterId('');
        } else {
          var currentChapter = ChapterStore.chapterList.find(function (chapter) {
            return chapter.id === _this2.createParent;
          });

          if (currentChapter.children.length > 1) {
            var pageId = currentChapter.children[currentChapter.children.length - 2].id;
            _this2.createPageId = '';

            _this2.setCurrentPageId(pageId);

            _this2.fetchCurrentPageData(pageId);
          }
        }
      }

      ChapterStore.getNoteChapterList();
      NoteStore.setShowModal(false);
    });
  },
  renameNotePage: function renameNotePage(chapterId) {
    var _this3 = this;

    this.renamePage(this.renamePageId, this.renamePageText, chapterId).then(function (dto) {
      if (_this3.moveInfoMap.get(dto.note_id)) {
        _this3.moveInfoMap.get(dto.note_id).item.text = dto.note_title;
      }

      _this3.fetchNoteInfoList(dto.note_id);

      ChapterStore.getNoteChapterList();
    });
  },
  createMoveInfo: function createMoveInfo(pageData) {
    var pageId = pageData.note_id;
    var chapterId = pageData.parent_notebook;
    var chapterIdx = ChapterStore.chapterList.findIndex(function (chapter) {
      return chapter.id === chapterId;
    });
    var pageIdx = ChapterStore.chapterList[chapterIdx].children.findIndex(function (page) {
      return page.id === pageId;
    });
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
    if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentPageData);
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
                _context9.next = 28;
                break;
              }

              localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
              _context9.next = 18;
              return ChapterStore.getNoteChapterList();

            case 18:
              if (!ChapterStore.currentChapterId) {
                _context9.next = 23;
                break;
              }

              _context9.next = 21;
              return _this4.fetchCurrentPageData(sortedMovePages[0]);

            case 21:
              _context9.next = 24;
              break;

            case 23:
              _this4.handleClickOutside();

            case 24:
              if (!moveCntToAnotherChapter) {
                NoteStore.setToastText("".concat(moveCntInSameChapter, "\uAC1C\uC758 \uD398\uC774\uC9C0\uAC00 \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4."));
              } else {
                NoteStore.setToastText("".concat(moveCnt, "\uAC1C\uC758 \uD398\uC774\uC9C0\uB97C ").concat(ChapterStore.chapterList[moveTargetChapterIdx].text, "\uC73C\uB85C \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4."));
              }

              NoteStore.setIsVisibleToast(true);
              _context9.next = 29;
              break;

            case 28:
              // 이동한 페이지가 없는 경우: 기존 선택되어 있던 페이지 select
              _this4.handleClickOutside();

            case 29:
              NoteStore.setIsDragging(false);

            case 30:
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
    var meridiem = mHour < 12 ? '오전' : '오후';
    var curDate = new Date();

    var convertTwoDigit = function convertTwoDigit(digit) {
      return ('0' + digit).slice(-2);
    };

    if (mHour > 12) mHour = mHour - 12;
    var basicDate = meridiem + ' ' + convertTwoDigit(mHour) + ':' + convertTwoDigit(mMinute);

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
              return teespaceCore.UserStore.fetchProfile(dto.USER_ID);

            case 9:
              userProfile = _context10.sent;
              _this5.userNick = userProfile.nick;

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

                _this5.setMoveInfoMap(new Map([[_this5.currentPageId, _this5.createMoveInfo(_this5.currentPageData)]]));

                _this5.isNewPage = false;
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
      var _EditorStore$tinymce3, _EditorStore$tinymce4;

      _this7.fetchNoteInfoList(dto.note_id);

      (_EditorStore$tinymce3 = EditorStore.tinymce) === null || _EditorStore$tinymce3 === void 0 ? void 0 : _EditorStore$tinymce3.focus();
      (_EditorStore$tinymce4 = EditorStore.tinymce) === null || _EditorStore$tinymce4 === void 0 ? void 0 : _EditorStore$tinymce4.selection.setCursorLocation();

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
      var _EditorStore$tinymce5;

      _this9.fetchNoteInfoList(dto.note_id);

      var floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
      if (floatingMenu !== null) floatingMenu.click();
      (_EditorStore$tinymce5 = EditorStore.tinymce) === null || _EditorStore$tinymce5 === void 0 ? void 0 : _EditorStore$tinymce5.setContent(_this9.currentPageData.note_content);
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
                _context12.next = 6;
                break;
              }

              _this10.setDeletePageList({
                note_id: _this10.createPageId
              });

              _this10.deleteParentIdx = _this10.createParentIdx;

              _this10.deleteNotePage();

              _context12.next = 11;
              break;

            case 6:
              if (!_this10.otherEdit) {
                _context12.next = 10;
                break;
              }

              return _context12.abrupt("return");

            case 10:
              _this10.noteNoneEdit(_this10.currentPageId);

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  handleSave: function handleSave() {
    var _EditorStore$tinymce6, _EditorStore$tinymce7;

    if (this.noteTitle === '' || this.noteTitle === '(제목 없음)') {
      if (this.getTitle() !== undefined) PageStore.setTitle(this.getTitle());else if (this.getTitle() === undefined && (EditorStore.tempFileLayoutList.length > 0 || EditorStore.fileLayoutList.length > 0)) {
        if (EditorStore.tempFileLayoutList.length > 0) {
          this.setTitle(EditorStore.tempFileLayoutList[0].file_name + (EditorStore.tempFileLayoutList[0].file_extension ? '.' + EditorStore.tempFileLayoutList[0].file_extension : ''));
        } else if (EditorStore.fileLayoutList.length > 0) {
          this.setTitle(EditorStore.fileLayoutList[0].file_name + (EditorStore.fileLayoutList[0].file_extension ? '.' + EditorStore.fileLayoutList[0].file_extension : ''));
        }
      } else this.setTitle('(제목 없음)');
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
      EditorStore.processCount = 0;
      EditorStore.tempFileLayoutList = [];
    }

    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    EditorStore.setInitialSearchState();
    var floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
    if (floatingMenu !== null) floatingMenu.click();
    (_EditorStore$tinymce6 = EditorStore.tinymce) === null || _EditorStore$tinymce6 === void 0 ? void 0 : _EditorStore$tinymce6.selection.setCursorLocation();
    (_EditorStore$tinymce7 = EditorStore.tinymce) === null || _EditorStore$tinymce7 === void 0 ? void 0 : _EditorStore$tinymce7.undoManager.clear();
  }
}, _defineProperty(_observable$1, "setIsNewPage", function setIsNewPage(isNew) {
  this.isNewPage = isNew;
}), _defineProperty(_observable$1, "getTitle", function getTitle() {
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
  if (!node.textContent && node.getElementsByTagName('IMG').length === 0) return '(표)'; // td(표 셀 1개) 안에 <p></p>가 두 개이고, 첫 번째 p태그에 <br>등만 있고 아무것도 없는 경우 (제목 없음)이 출력돼서 수정

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
var ChapterStore = mobx.observable((_observable$2 = {
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
  renameChapterId: '',
  renameChapterPrevText: '',
  renameChapterText: '',
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
  getRenameChapterId: function getRenameChapterId() {
    return this.renameChapterId;
  },
  setRenameChapterId: function setRenameChapterId(chapterId) {
    this.renameChapterId = chapterId;
  },
  getRenameChapterPrevText: function getRenameChapterPrevText() {
    return this.renameChapterPrevText;
  },
  setRenameChapterPrevText: function setRenameChapterPrevText(chapterText) {
    this.renameChapterPrevText = chapterText;
  },
  getRenameChapterText: function getRenameChapterText() {
    return this.renameChapterText;
  },
  setRenameChapterText: function setRenameChapterText(chapterText) {
    this.renameChapterText = chapterText;
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
  // 웹에서 더이상 안씀!
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
}), _defineProperty(_observable$2, "createMap", function createMap(notebookList) {
  var _this3 = this;

  // chapterMap: {key: chapterId, value: chapterIndex on server}
  // pageMap: {key: pageId, value: {parent: chapterIndex on server, idx: pageIndex on server}}
  this.chapterMap.clear();
  this.pageMap.clear();
  notebookList.forEach(function (chapter, i) {
    if (chapter.type === 'shared_page' || chapter.type === 'shared') return;

    _this3.chapterMap.set(chapter.id, i);

    chapter.children.forEach(function (page, j) {
      _this3.pageMap.set(page.id, {
        parent: chapter.id,
        idx: j
      });
    });
  });
}), _defineProperty(_observable$2, "getSharedList", function getSharedList(notebookList) {
  var sharedList = [];
  notebookList.forEach(function (chapter, idx) {
    if (chapter.type === 'shared_page') sharedList.splice(0, 0, notebookList[idx]);else if (chapter.type === 'shared') sharedList.push(notebookList[idx]);
  });
  return sharedList;
}), _defineProperty(_observable$2, "setLocalStorageItem", function setLocalStorageItem(targetChannelId, tempChapterList) {
  // tempChapterList: includes only [chapterType: notebook, default]
  var item = [];
  tempChapterList.forEach(function (chapter) {
    var children = [];
    chapter.children.forEach(function (page) {
      return children.push(page.id);
    });
    item.push({
      id: chapter.id,
      children: children
    });
  });
  localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
}), _defineProperty(_observable$2, "applyDifference", function applyDifference(targetChannelId, notebookList) {
  var _this4 = this;

  var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId)); // 로컬 스토리지에 없는 챕터/페이지가 있는지 확인한다. (생성된 챕터/페이지 확인)

  var createdChapterIds = [];
  var chapterIds = item.map(function (chapter) {
    return chapter.id;
  });
  notebookList.forEach(function (chapter) {
    if (chapter.type === 'shared_page' || chapter.type === 'shared') return;

    if (!chapterIds.includes(chapter.id)) {
      createdChapterIds.push({
        id: chapter.id,
        children: chapter.children.map(function (page) {
          return page.id;
        })
      });
    } else {
      var createdPageIds = [];
      var chapterIdx = chapterIds.indexOf(chapter.id);
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
    chapterIds = item.map(function (chapter) {
      return chapter.id;
    });

    if (_this4.chapterMap.get(chapter.id) === undefined) {
      item.splice(chapterIds.indexOf(chapter.id), 1);
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
}), _defineProperty(_observable$2, "getLocalStorageItem", function getLocalStorageItem(targetChannelId, notebookList) {
  var _this5 = this;

  var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));
  var localChapterList = [];
  item.forEach(function (chapter, idx) {
    var chapterIdx = _this5.chapterMap.get(chapter.id);

    localChapterList.push(notebookList[chapterIdx]);
    var localPageList = [];
    chapter.children.forEach(function (pageId) {
      var pageIdx = _this5.pageMap.get(pageId).idx;

      localPageList.push(notebookList[chapterIdx].children[pageIdx]);
    });
    localChapterList[idx].children = localPageList;
  });
  return localChapterList;
}), _defineProperty(_observable$2, "checkDefaultChapterColor", function checkDefaultChapterColor(notbookList) {
  var _this6 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var _defaultChapter$;

    var idx, defaultChapter, _yield$_this6$updateC, color;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            idx = notbookList.findIndex(function (chapter) {
              return chapter.type === "default";
            });

            if (!(idx === -1)) {
              _context11.next = 3;
              break;
            }

            return _context11.abrupt("return", notbookList);

          case 3:
            defaultChapter = notbookList.splice(idx, 1);

            if (!(((_defaultChapter$ = defaultChapter[0]) === null || _defaultChapter$ === void 0 ? void 0 : _defaultChapter$.color) === null)) {
              _context11.next = 10;
              break;
            }

            _context11.next = 7;
            return _this6.updateChapterColor(defaultChapter[0].id);

          case 7:
            _yield$_this6$updateC = _context11.sent;
            color = _yield$_this6$updateC.color;
            defaultChapter[0].color = color;

          case 10:
            return _context11.abrupt("return", notbookList.concat(defaultChapter));

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }))();
}), _defineProperty(_observable$2, "getNoteChapterList", function getNoteChapterList() {
  var _this7 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var notbookList, sharedList, tempChapterList;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _this7.getChapterList();

          case 2:
            notbookList = _context12.sent;

            _this7.createMap(notbookList);

            sharedList = _this7.getSharedList(notbookList);
            _this7.sharedCnt = sharedList.length;
            tempChapterList = [];

            if (localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
              _context12.next = 15;
              break;
            }

            tempChapterList = notbookList.filter(function (chapter) {
              return chapter.type === 'notebook' || chapter.type === 'default';
            }); // TODO : update chapterColor 로직 더 좋은 아이디어로 수정하기

            _context12.next = 11;
            return _this7.checkDefaultChapterColor(tempChapterList);

          case 11:
            tempChapterList = _context12.sent;

            _this7.setLocalStorageItem(NoteStore.getChannelId(), tempChapterList);

            _context12.next = 17;
            break;

          case 15:
            _this7.applyDifference(NoteStore.getChannelId(), notbookList);

            tempChapterList = _this7.getLocalStorageItem(NoteStore.getChannelId(), notbookList);

          case 17:
            _this7.chapterList = tempChapterList.concat(sharedList);
            return _context12.abrupt("return", _this7.chapterList);

          case 19:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }))();
}), _defineProperty(_observable$2, "sortChapterList", function sortChapterList(chapterList) {
  var _roomChapterList = [],
      _sharedPageList = [],
      _sharedChapterList = [];
  var sortedChapterList = chapterList.map(function (chapter, idx) {
    if (chapter.type === "shared_page") _sharedPageList.push(chapter);else if (chapter.type === 'shared') _sharedChapterList.push(chapter);else _roomChapterList.push(chapter);

    if (!idx) {
      var _chapterList$, _chapterList$2, _chapterList$2$childr;

      chapter.selectableChapterId = (_chapterList$ = chapterList[1]) === null || _chapterList$ === void 0 ? void 0 : _chapterList$.id;
      chapter.selectablePageId = (_chapterList$2 = chapterList[1]) === null || _chapterList$2 === void 0 ? void 0 : (_chapterList$2$childr = _chapterList$2.children[0]) === null || _chapterList$2$childr === void 0 ? void 0 : _chapterList$2$childr.id;
    } else {
      var _chapterList$children;

      chapter.selectableChapterId = chapterList[idx - 1].id;
      chapter.selectablePageId = (_chapterList$children = chapterList[idx - 1].children[0]) === null || _chapterList$children === void 0 ? void 0 : _chapterList$children.id;
    }

    return chapter;
  });
  this.setSortedChapterList({
    roomChapterList: _roomChapterList,
    sharedPageList: _sharedPageList,
    sharedChapterList: _sharedChapterList
  });
  return sortedChapterList;
}), _defineProperty(_observable$2, "createNoteChapter", function createNoteChapter(chapterTitle, chapterColor) {
  var _this8 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var notbookList;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _this8.createChapter(chapterTitle, chapterColor);

          case 2:
            notbookList = _context13.sent;

            _this8.getNoteChapterList();

            _this8.setCurrentChapterId(notbookList.id);

            PageStore.setCurrentPageId(notbookList.children[0].id);
            PageStore.fetchCurrentPageData(notbookList.children[0].id);

            _this8.setChapterTempUl(false);

          case 8:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }))();
}), _defineProperty(_observable$2, "deleteNoteChapter", function deleteNoteChapter() {
  var _this9 = this;

  this.deleteChapter(this.deleteChapterId).then(function () {
    _this9.getNoteChapterList();

    if (_this9.currentChapterId === _this9.deleteChapterId) {
      _this9.setCurrentChapterId(_this9.selectableChapterId);

      PageStore.setCurrentPageId(PageStore.selectablePageId);
      PageStore.fetchCurrentPageData(PageStore.selectablePageId);
    }

    _this9.deleteChapterId = '';
    NoteStore.setShowModal(false);
  });
}), _defineProperty(_observable$2, "renameNoteChapter", function renameNoteChapter(color) {
  var _this10 = this;

  this.renameChapter(this.renameChapterId, this.renameChapterText, color).then(function (dto) {
    if (_this10.moveInfoMap.get(dto.id)) _this10.moveInfoMap.get(dto.id).item.text = dto.text;

    _this10.getNoteChapterList();
  });
}), _defineProperty(_observable$2, "createMoveInfo", function createMoveInfo(chapterId) {
  var chapterIdx = this.chapterList.findIndex(function (chapter) {
    return chapter.id === chapterId;
  });
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
  var _this11 = this;

  var item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
  var sortedMoveInfoList = this.getSortedMoveInfoList();
  var sortedMoveChapters = sortedMoveInfoList.map(function (moveInfo) {
    return item[moveInfo.chapterIdx];
  });
  var chapters = [];
  item.forEach(function (chapter, idx) {
    if (idx === moveTargetChapterIdx) chapters.push.apply(chapters, _toConsumableArray(sortedMoveChapters));
    if (!_this11.moveInfoMap.get(chapter.id)) chapters.push(chapter);
  });
  if (moveTargetChapterIdx >= chapters.length) chapters.push.apply(chapters, _toConsumableArray(sortedMoveChapters));
  var moveCnt = 0;
  var startIdx = chapters.findIndex(function (chapter) {
    return chapter.id === sortedMoveInfoList[0].item.id;
  });
  sortedMoveInfoList.forEach(function (moveInfo, idx) {
    if (moveInfo.chapterIdx !== startIdx + idx) moveCnt++;

    _this11.moveInfoMap.set(moveInfo.item.id, {
      item: moveInfo.item,
      chapterIdx: startIdx + idx
    });
  });

  if (moveCnt > 0) {
    localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(chapters));
    this.getNoteChapterList().then(function () {
      if (!_this11.currentChapterId) _this11.handleClickOutside();
      NoteStore.setToastText("".concat(moveCnt, "\uAC1C\uC758 \uCC55\uD130\uAC00 \uC774\uB3D9\uD558\uC600\uC2B5\uB2C8\uB2E4."));
      NoteStore.setIsVisibleToast(true);
      NoteStore.setIsDragging(false);
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
  var _this12 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _this12.getChapterList().then(function (chapterList) {
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
            return _context14.stop();
        }
      }
    }, _callee14);
  }))();
}), _defineProperty(_observable$2, "getSearchResult", function getSearchResult() {
  var _this13 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            // 모바일 안정화 이후로 (fetchSearchResult) 대신 바꿀 예정 
            _this13.setIsSearching(true);

            _this13.setIsLoadingSearchResult(true);

            _this13.getSearchList().then(function (dto) {
              _this13.setSearchResult({
                chapter: dto.chapterList,
                page: dto.pageList
              });

              _this13.setIsLoadingSearchResult(false);
            });

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }))();
}), _defineProperty(_observable$2, "fetchSearchResult", function fetchSearchResult() {
  var _this14 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _this14.setIsSearching(true); // 검색 결과 출력 종료까지임


            _this14.setIsLoadingSearchResult(true); // 검색 실행 중 화면
            // await this.getSearchResult();


            _this14.getSearchList().then(function (dto) {
              if (dto.pageList && dto.pageList.length > 0) {
                dto.pageList.map(function (page) {
                  _this14.getChapterInfoList(page.parent_notebook).then(function (dto) {
                    page.parentColor = dto.color;
                    page.parentText = dto.text;
                  }).then(function () {
                    _this14.setSearchResult({
                      chapter: dto.chapterList,
                      page: dto.pageList
                    });

                    _this14.setIsLoadingSearchResult(false);
                  });
                });
              } else {
                _this14.setSearchResult({
                  chapter: dto.chapterList,
                  page: dto.pageList
                });

                _this14.setIsLoadingSearchResult(false);
              }
            });

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }))();
}), _defineProperty(_observable$2, "createShareChapter", function createShareChapter(targetList) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
    var _yield$NoteRepository11, dto;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return NoteRepository$1.createShareChapter(targetList);

          case 2:
            _yield$NoteRepository11 = _context17.sent;
            dto = _yield$NoteRepository11.data.dto;
            return _context17.abrupt("return", dto);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }))();
}), _defineProperty(_observable$2, "createNoteShareChapter", function createNoteShareChapter(targetRoomId, targetChapterList) {
  var _this15 = this;

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
    _this15.getNoteChapterList();

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
  var _this16 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
    var targetChapter, chapterId, pageId;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            targetChapter = _this16.getFirstRenderedChapter();

            if (targetChapter) {
              _context18.next = 5;
              break;
            }

            _this16.setCurrentChapterId('');

            PageStore.setCurrentPageId('');
            return _context18.abrupt("return");

          case 5:
            _this16.setFirstMoveInfoMap(targetChapter);

            chapterId = targetChapter.id;
            pageId = targetChapter.children.length > 0 ? targetChapter.children[0].id : ''; // setCurrentPageId는 fetchNoetInfoList에서

            _context18.next = 10;
            return PageStore.fetchCurrentPageData(pageId);

          case 10:
            // pageContainer에서 currentChapterId만 있고 pageId가 없으면 render pageNotFound component
            // fetch page data 끝날 때까지 loading img 띄우도록 나중에 set chapter id
            _this16.setCurrentChapterId(chapterId);

          case 11:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }))();
}), _defineProperty(_observable$2, "fetchFirstNote", function fetchFirstNote() {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            ChapterStore.setLoadingPageInfo(true);
            _context19.next = 3;
            return ChapterStore.setFirstNoteInfo();

          case 3:
            ChapterStore.setLoadingPageInfo(false);

          case 4:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }))();
}), _defineProperty(_observable$2, "fetchChapterList", function fetchChapterList() {
  var _this17 = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _this17.setLoadingPageInfo(true);

            _context20.next = 3;
            return _this17.getNoteChapterList();

          case 3:
            if (!(_this17.chapterList.length > 0)) {
              _context20.next = 6;
              break;
            }

            _context20.next = 6;
            return _this17.setFirstNoteInfo();

          case 6:
            _this17.setLoadingPageInfo(false);

          case 7:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
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
      name: type,
      handleCancel: handleCancel
    };

    switch (type) {
      case "viewInfo":
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: "정보 보기",
          className: "viewInfoModal"
        });

      case "forward":
        return _objectSpread2(_objectSpread2({}, initialConfig), {}, {
          title: "다른 룸으로 전달",
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

          if (EditorStore.fileList) {
            PageStore.deleteNotePage();
            EditorStore.deleteAllFile();
          } else PageStore.deleteNotePage();
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

            var instance = new Mark__default['default']((_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : _EditorStore$tinymce.getBody());
            instance.unmark();
          }

          PageStore.handleSave();
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
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
    }

    return eventList;
  },
  setBtns: function setBtns(type) {
    var shape = "default";
    var defaultBtn1 = {
      type: "solid",
      shape: shape,
      text: '확인'
    }; // 버튼 한 개일 때랑 text 바꿔서 사용

    var defaultBtn2 = {
      type: "default",
      shape: shape,
      text: '취소'
    };

    switch (type) {
      case 'delete':
        // chapter랑 page
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: '삭제'
        }), defaultBtn2];

      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
        return [defaultBtn1];

      case 'editCancel':
        return [_objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: '저장'
        }), _objectSpread2(_objectSpread2({}, defaultBtn1), {}, {
          text: '저장 안 함'
        }), defaultBtn2];

      case 'failOpenMail':
        return [defaultBtn1];

      default:
        return;
    }
  },
  setMessageInfoConfig: function setMessageInfoConfig(type) {
    var fileName = EditorStore.deleteFileName; // type이 error면 빨간색, error말고 다른 색이면 보라색

    var dialogType = {
      type: 'default',
      title: '',
      subtitle: null,
      btns: []
    };
    var editingUserName = PageStore.editingUserName;

    switch (type) {
      case 'chapter':
        dialogType.title = '챕터를 삭제하시겠습니까?';
        dialogType.subtitle = '챕터에 속한 페이지도 삭제됩니다.';
        dialogType.btns = this.setBtns('delete');
        break;

      case 'page':
        dialogType.title = '페이지를 삭제하시겠습니까?';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('delete');
        break;

      case 'confirm':
        dialogType.type = 'info';
        dialogType.title = '삭제할 수 없습니다.';
        dialogType.subtitle = "".concat(PageStore.editingUserName, " \uB2D8\uC774 \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.");
        dialogType.btns = this.setBtns(type);
        break;

      case 'chapterconfirm':
        dialogType.type = 'info';
        dialogType.title = '삭제할 수 없습니다.';
        dialogType.subtitle = "".concat(PageStore.editingUserCount, "\uBA85\uC774 \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.");
        dialogType.btns = this.setBtns(type);
        break;

      case 'editCancel':
        dialogType.title = '페이지를 저장하고 나가시겠습니까?';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns(type);
        break;

      case 'fileDelete':
        dialogType.title = "\uC120\uD0DD\uD55C ".concat(fileName, " \uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?");
        dialogType.subtitle = '삭제 후에는 복구할 수 없습니다.';
        dialogType.btns = this.setBtns('delete');
        break;

      case 'titleDuplicate':
        dialogType.title = '중복된 이름이 있습니다.';
        dialogType.subtitle = '다른 이름을 입력해주세요.';
        dialogType.btns = this.setBtns(type);
        break;

      case 'duplicateTagName':
        dialogType.title = '이미 있는 태그 이름입니다.';
        dialogType.btns = this.setBtns(type);
        break;

      case 'editingPage':
        dialogType.title = '수정할 수 없습니다.';
        dialogType.subtitle = "".concat(editingUserName, " \uB2D8\uC774 \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.");
        dialogType.btns = this.setBtns('editingPage');
        break;

      case 'deletedPage':
        dialogType.title = '노트가 삭제되어 불러올 수 없습니다.';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('deletedPage');
        break;

      case 'multiFileSomeFail':
        dialogType.title = '일부 파일이 업로드되지 못하였습니다.';
        dialogType.subtitle = "(".concat(EditorStore.uploadLength, "\uAC1C \uD56D\uBAA9 \uC911 ").concat(EditorStore.failCount, "\uAC1C \uC2E4\uD328)");
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;

      case 'sizefailUpload':
        dialogType.title = '파일 첨부는 한 번에 최대 20GB까지 가능합니다.';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('sizefailUpload');
        break;

      case 'failUpload':
        dialogType.title = '파일 첨부는 한 번에 30개까지 가능합니다.';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('failUpload');
        break;

      case 'failOpenMail':
        dialogType.title = 'Mail로 전달할 수 없습니다.';
        dialogType.subtitle = '외부 메일 연동 후 다시 시도해주세요.';
        dialogType.btns = this.setBtns(type);
    }

    return dialogType;
  }
};

var handleWebsocket = function handleWebsocket(message) {
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
        if (targetUSER === loginUSER) return;else ChapterStore.getNoteChapterList();
        break;

      case EVENT_TYPE.DELETE:
        if (targetUSER === loginUSER) return;else {
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
        if (targetUSER === loginUSER) return;else {
          if (PageStore.getCurrentPageId() === targetID) {
            PageStore.fetchCurrentPageData(PageStore.getCurrentPageId());
          }

          ChapterStore.getNoteChapterList();
        }
        break;

      case EVENT_TYPE.MOVE:
        // 서버에서 곧 넣을 예정
        break;

      case EVENT_TYPE.CHAPTER_CREATE:
      case EVENT_TYPE.CHAPTER_RENAME:
        if (targetUSER === loginUSER) return;else {
          ChapterStore.getNoteChapterList();
        }
        break;

      case EVENT_TYPE.CHAPTER_DELETE:
        if (targetUSER === loginUSER) return;else {
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

var NoteStore = mobx.observable({
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
    this.setShowPage(true);
    this.setIsMailShare(false);
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
      case 'fileDelete':
      case 'chapter':
      case 'page':
      case 'editCancel':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'editingPage':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case "failOpenMail":
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
              sharedRoom = teespaceCore.RoomStore.getRoom(noteInfo.shared_room_name);
              _context.next = 13;
              return teespaceCore.UserStore.getProfile({
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
    return teespaceCore.RoomStore.getChannelIds({
      roomId: targetRoomId
    })[chType ? chType : NoteRepository$1.CH_TYPE];
  },
  getSharedRoomName: function getSharedRoomName() {
    return teespaceCore.RoomStore.getRoom(NoteRepository$1.WS_ID).isMyRoom ? this.userName : teespaceCore.RoomStore.getRoom(NoteRepository$1.WS_ID).name;
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
                return teespaceCore.RoomStore.createRoom({
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

exports.useNoteStore = useNoteStore;
