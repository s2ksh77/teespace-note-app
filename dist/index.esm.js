import { observable, toJS } from 'mobx';
import { API, WWMS } from 'teespace-core';
import 'ramda';

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
    this.FILE_URL = process.env.REACT_APP_SERVICE_URL;
    this.WS_ID = '';
    this.CH_TYPE = 'CHN0003';
    this.USER_ID = '';
    this.chId = '';
    this.USER_NAME = '';
    this.URL = url || process.env.REACT_APP_SERVICE_URL + '/Note';
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
                return API.get("Note/noteChapter?action=List&note_channel_id=".concat(chId));

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
                return API.Get("Note/noteinfo?action=List&note_id=".concat(noteId, "&note_channel_id=").concat(this.chId));

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
      return API.Get("Note/tag?action=List&note_id=".concat(noteId, "&t=").concat(new Date().getTime().toString()));
    } // 태그 컨텐츠 관련
    // getAllTagList() {
    //   return API.Get(
    //     `Note/alltag?action=List&note_channel_id=${this.chId}`
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
                return API.Get("Note/tagSort?action=List&note_channel_id=".concat(this.chId, "&t=").concat(new Date().getTime().toString()));

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
      return API.Get("Note/tagnote?action=List&tag_id=".concat(tagId, "&USER_ID=").concat(this.USER_ID, "\n      &note_channel_id=").concat(this.chId));
    }
  }, {
    key: "getChapterChildren",
    value: function getChapterChildren(chapterId) {
      return API.Get("Note/note?action=List&note_channel_id=".concat(this.chId, "&parent_notebook=").concat(chapterId));
    }
  }, {
    key: "getChapterInfoList",
    value: function getChapterInfoList(chapterId) {
      return API.Get("Note/chaptershare?action=List&id=".concat(chapterId));
    }
  }, {
    key: "getChapterColor",
    value: function getChapterColor(chapterId) {
      var _API$Get = API.Get("Note/chaptershare?action=List&id=".concat(chapterId)),
          data = _API$Get.data;

      return data.color;
    }
  }, {
    key: "getChapterText",
    value: function getChapterText(chapterId) {
      var _API$Get2 = API.Get("Note/chaptershare?action=List&id=".concat(chapterId)),
          data = _API$Get2.data;

      return data.text;
    }
  }, {
    key: "createChapter",
    value: function () {
      var _createChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(chapterTitle, chapterColor) {
        var _yield$API$post, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return API.post("Note/notebooks", {
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
                _yield$API$post = _context4.sent;
                data = _yield$API$post.data;
                return _context4.abrupt("return", data);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                throw Error(JSON.stringify(_context4.t0));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function createChapter(_x3, _x4) {
        return _createChapter.apply(this, arguments);
      }

      return createChapter;
    }()
  }, {
    key: "deleteChapter",
    value: function () {
      var _deleteChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(chapterId) {
        var _yield$API$delete, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return API.delete("Note/notebook?action=Delete&id=".concat(chapterId, "&note_channel_id=").concat(this.chId, "&USER_ID=").concat(this.USER_ID));

              case 3:
                _yield$API$delete = _context5.sent;
                data = _yield$API$delete.data;
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

      function deleteChapter(_x5) {
        return _deleteChapter.apply(this, arguments);
      }

      return deleteChapter;
    }()
  }, {
    key: "renameChapter",
    value: function () {
      var _renameChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(chapterId, chapterTitle, color) {
        var _yield$API$put, data;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return API.put("Note/notebooks?action=Update", {
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
                _yield$API$put = _context6.sent;
                data = _yield$API$put.data;
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

      function renameChapter(_x6, _x7, _x8) {
        return _renameChapter.apply(this, arguments);
      }

      return renameChapter;
    }()
  }, {
    key: "createPage",
    value: function () {
      var _createPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(pageName, pageContent, chapterId) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                return _context7.abrupt("return", API.Post("Note/note", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    USER_ID: this.USER_ID,
                    note_channel_id: this.chId,
                    user_name: this.USER_NAME,
                    note_title: pageName,
                    note_content: pageContent ? pageContent : '',
                    is_edit: this.USER_ID,
                    parent_notebook: chapterId
                  }
                }));

              case 4:
                _context7.prev = 4;
                _context7.t0 = _context7["catch"](0);
                throw Error(JSON.stringify(_context7.t0));

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 4]]);
      }));

      function createPage(_x9, _x10, _x11) {
        return _createPage.apply(this, arguments);
      }

      return createPage;
    }()
  }, {
    key: "deletePage",
    value: function () {
      var _deletePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(pageList) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                pageList.forEach(function (page) {
                  page.USER_ID = _this.USER_ID;
                  page.WS_ID = _this.WS_ID;
                  page.note_channel_id = _this.chId;
                  page.user_name = _this.USER_NAME;
                });
                _context8.prev = 1;
                _context8.next = 4;
                return API.Post("Note/note?action=Delete", {
                  dto: {
                    noteList: pageList
                  }
                });

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](1);
                throw Error(JSON.stringify(_context8.t0));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 7]]);
      }));

      function deletePage(_x12) {
        return _deletePage.apply(this, arguments);
      }

      return deletePage;
    }()
  }, {
    key: "renamePage",
    value: function () {
      var _renamePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(pageId, pageTitle, chapterId) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return API.Put("Note/note?action=Update", {
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
                return _context9.abrupt("return", _context9.sent);

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9["catch"](0);
                throw Error(JSON.stringify(_context9.t0));

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 6]]);
      }));

      function renamePage(_x13, _x14, _x15) {
        return _renamePage.apply(this, arguments);
      }

      return renamePage;
    }()
  }, {
    key: "movePage",
    value: function movePage(pageId, chapterId) {
      return API.Put("Note/note?action=Update", {
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
    }
  }, {
    key: "editStart",
    value: function () {
      var _editStart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(noteId, chapterId) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return API.post("Note/note?action=Update", {
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
                return _context10.abrupt("return", _context10.sent);

              case 6:
                _context10.prev = 6;
                _context10.t0 = _context10["catch"](0);
                throw Error(JSON.stringify(_context10.t0));

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 6]]);
      }));

      function editStart(_x16, _x17) {
        return _editStart.apply(this, arguments);
      }

      return editStart;
    }()
  }, {
    key: "editDone",
    value: function () {
      var _editDone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(updateDto) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                updateDto.dto.WS_ID = this.WS_ID;
                updateDto.dto.note_channel_id = this.chId;
                updateDto.dto.USER_ID = this.USER_ID;
                updateDto.dto.CH_TYPE = this.CH_TYPE;
                updateDto.dto.user_name = this.USER_NAME;
                _context11.prev = 5;
                _context11.next = 8;
                return API.post("Note/note?action=Update", updateDto);

              case 8:
                return _context11.abrupt("return", _context11.sent);

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](5);
                throw Error(JSON.stringify(_context11.t0));

              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[5, 11]]);
      }));

      function editDone(_x18) {
        return _editDone.apply(this, arguments);
      }

      return editDone;
    }()
  }, {
    key: "nonEdit",
    value: function () {
      var _nonEdit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(noteId, chapterId, userName) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return API.post("Note/note?action=Update", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    USER_ID: this.USER_ID,
                    note_channel_id: this.chId,
                    note_id: noteId,
                    is_edit: '',
                    parent_notebook: chapterId,
                    TYPE: 'NONEDIT',
                    user_name: userName
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

      function nonEdit(_x19, _x20, _x21) {
        return _nonEdit.apply(this, arguments);
      }

      return nonEdit;
    }()
  }, {
    key: "createTag",
    value: function () {
      var _createTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(tagText, noteId) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return API.post("Note/tag", {
                  dto: {
                    text: tagText,
                    note_id: noteId
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
        }, _callee13, null, [[0, 6]]);
      }));

      function createTag(_x22, _x23) {
        return _createTag.apply(this, arguments);
      }

      return createTag;
    }()
  }, {
    key: "deleteTag",
    value: function () {
      var _deleteTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(tagId, noteId) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return API.post("Note/tag?action=Delete", {
                  dto: {
                    tag_id: tagId,
                    note_id: noteId
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
        }, _callee14, null, [[0, 6]]);
      }));

      function deleteTag(_x24, _x25) {
        return _deleteTag.apply(this, arguments);
      }

      return deleteTag;
    }()
  }, {
    key: "updateTag",
    value: function () {
      var _updateTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(tagId, tagText) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return API.post("Note/tag?action=Update", {
                  dto: {
                    tag_id: tagId,
                    text: tagText
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
        }, _callee15, null, [[0, 6]]);
      }));

      function updateTag(_x26, _x27) {
        return _updateTag.apply(this, arguments);
      }

      return updateTag;
    }()
  }, {
    key: "deleteFile",
    value: function deleteFile(deleteFileId) {
      return API.put("Note/noteFile?action=Delete", {
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
    }
  }, {
    key: "deleteAllFile",
    value: function deleteAllFile(fileList) {
      var deleteFileList = [];

      if (fileList) {
        fileList.map(function (file) {
          return deleteFileList.push(file.file_id);
        });
        return API.put("".concat(this.FILE_URL, "Storage/StorageFile?action=MultiDelete"), {
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
      return API.post("Note/chaptershare", {
        dto: {
          notbookList: chapterList
        }
      });
    }
  }, {
    key: "createSharePage",
    value: function createSharePage(pageList) {
      return API.post("Note/noteshare", {
        dto: {
          noteList: pageList
        }
      });
    }
  }]);

  return NoteRepository;
}();

var NoteRepository$1 = new NoteRepository();

var checkNotDuplicate = function checkNotDuplicate(targetArr, key, value) {
  return targetArr.find(function (item) {
    return item[key] === value;
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
  tagPanelLoading: true,
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
    createTagList.forEach( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tag) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return NoteRepository$1.createTag(tag, noteId);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    this.setAddTagList([]);
  },
  deleteTag: function deleteTag(deleteTagList, noteId) {
    deleteTagList.forEach( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(tag) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return NoteRepository$1.deleteTag(tag, noteId);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    this.setRemoveTagList([]);
  },
  updateTag: function updateTag(updateTagList) {
    updateTagList.forEach( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(tag) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return NoteRepository$1.updateTag(tag.tag_id, tag.text);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  },

  /*
    비즈니스 로직
  */
  fetchNoteTagList: function fetchNoteTagList(noteId) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return NoteRepository$1.getNoteTagList(noteId).then(function (response) {
                if (response.status === 200) {
                  var tagList = response.data.dto;

                  _this.setNoteTagList(tagList.tagList);
                }
              });

            case 2:
              return _context7.abrupt("return", _this.notetagList);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  setUpdateNoteTagList: function setUpdateNoteTagList(tagId, tagText) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (_this2.updateTagList.length === 0) {
                _this2.appendUpdateTagList(tagId, tagText);
              } else {
                if (_this2.updateTagList.map(function (item) {
                  return item.tag_id;
                }).indexOf(tagId) === -1) {
                  _this2.appendUpdateTagList(tagId, tagText);
                } else {
                  _this2.updateTagList.forEach(function (item) {
                    if (item.tag_id === tagId) item.text = tagText;
                  });
                }
              }

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  setCurrentTagData: function setCurrentTagData(id, text) {
    this.setCurrentTagId(id);
    this.setCurrentTagValue(text);
  },
  // 서버에서 받아와서 store 변수에 set하기
  fetchAllSortedTagList: function fetchAllSortedTagList() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var _yield$NoteRepository, tag_index_list_dto;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return NoteRepository$1.getAllSortedTagList();

            case 2:
              _yield$NoteRepository = _context9.sent;
              tag_index_list_dto = _yield$NoteRepository.data.dto.tag_index_list_dto;

              _this3.setAllSortedTagList(tag_index_list_dto);

              return _context9.abrupt("return", _this3.allSortedTagList);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
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
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _this4.setTagPanelLoading(true);

              _context10.next = 3;
              return _this4.fetchAllSortedTagList();

            case 3:
              // 키-태그 pair obj
              _this4.createKeyTagPairObj(); // kor, eng, num, etc별 sort한 키


              _this4.categorizeTagObj();

              _this4.setTagPanelLoading(false);

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  searchTag: function searchTag(str) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _this5.setIsSearching(true);

              _this5.setIsSearchLoading(true);

              _this5.setSearchStr(str);

              _context11.next = 5;
              return _this5.fetchAllSortedTagList();

            case 5:
              // 키-태그 pair obj
              _this5.createSearchResultObj(str); // kor, eng, num, etc별 sort한 키


              _this5.categorizeTagObj();

              _this5.setIsSearchLoading(false);

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },
  // search result용 KeyTagObj
  createSearchResultObj: function createSearchResultObj(str) {
    var results = {};
    var tagKeyArr$ = [];
    this.allSortedTagList.forEach(function (item) {
      var KEY = item.KEY;
      var resultKeyTags = {};
      item.tag_indexdto.tagList.forEach(function (tag) {
        var tagName = tag.text;
        if (!tagName.toLowerCase().includes(str)) return;

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
        if (tagKeyArr$.indexOf(KEY.toUpperCase()) === -1) tagKeyArr$.push(KEY);
      }
    });
    this.setKeyTagPairObj(_objectSpread2({}, results));
    this.setTagKeyArr(_toConsumableArray(tagKeyArr$.sort()));
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
    var tagKeyArr$ = [];
    this.allSortedTagList.forEach(function (item) {
      var KEY = item.KEY;
      var resultObj = {}; // 'ㄱ','ㄴ'... 해당 KEY에 속한 TAG LIST

      item.tag_indexdto.tagList.forEach(function (tag) {
        if (resultObj.hasOwnProperty(tag.text)) resultObj[tag.text]["note_id"].push(tag.note_id);else {
          resultObj[tag.text] = {
            id: tag.tag_id,
            note_id: [tag.note_id]
          };
        }
      });
      results[KEY.toUpperCase()] = resultObj;
      if (tagKeyArr$.indexOf(KEY.toUpperCase()) === -1) tagKeyArr$.push(KEY.toUpperCase());
    });
    this.setKeyTagPairObj(_objectSpread2({}, results));
    this.setTagKeyArr(_toConsumableArray(tagKeyArr$.sort()));
    return this.keyTagPairObj;
  },
  getEngTagObj: function getEngTagObj(key) {
    var sortedEngTags = {};
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
    var _this6 = this;

    this.setSortedTagList({});
    var _sortedTagList = {}; // sort하고 분류해서 koArr, engArr, numArr, etcArr은 sort 돼 있음

    var korObj = {},
        engObj = {},
        numObj = {},
        etcObj = {};
    this.tagKeyArr.forEach(function (key) {
      if (key.charCodeAt(0) >= 12593 && key.charCodeAt(0) < 55203) {
        korObj[key] = _this6.keyTagPairObj[key];
      } else if (key.charCodeAt(0) > 64 && key.charCodeAt(0) < 123) {
        // engObj[key] = this.keyTagPairObj[key];
        engObj[key] = _this6.getEngTagObj(key);
      } else if (key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57) {
        numObj[key] = _this6.keyTagPairObj[key];
      } else {
        etcObj[key] = _this6.keyTagPairObj[key];
      }
    });
    if (Object.keys(korObj).length > 0) _sortedTagList["KOR"] = korObj;
    if (Object.keys(engObj).length > 0) _sortedTagList["ENG"] = engObj;
    if (Object.keys(numObj).length > 0) _sortedTagList["NUM"] = numObj;
    if (Object.keys(etcObj).length > 0) _sortedTagList["ETC"] = etcObj;
    this.setSortedTagList(_sortedTagList);
  },
  setTagNoteSearchResult: function setTagNoteSearchResult(tagId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var _yield$NoteRepository2, noteList, resultPageArr;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return NoteRepository$1.getTagNoteList(tagId);

            case 2:
              _yield$NoteRepository2 = _context12.sent;
              noteList = _yield$NoteRepository2.data.dto.noteList;
              resultPageArr = noteList.map(function (page) {
                var targetChapter = ChapterStore.chapterList.find(function (chapter) {
                  return chapter.id === page.parent_notebook;
                });
                return {
                  chapterId: page.parent_notebook,
                  chapterTitle: targetChapter ? targetChapter.text : "",
                  id: page.note_id,
                  title: page.note_title
                };
              });
              ChapterStore.setSearchResult({
                chapter: [],
                page: resultPageArr
              });

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  setEditCreateTag: function setEditCreateTag() {
    var _this7 = this;

    // add Tag List 갱신
    this.addTagList.forEach(function (tag, index) {
      if (tag === TagStore.currentTagValue) _this7.addTagList[index] = TagStore.editTagValue;
    }); // 현재 보여지는 List 갱신

    this.notetagList.forEach(function (tag) {
      if (tag.text === TagStore.currentTagValue) tag.text = TagStore.editTagValue;
    });
  },
  isValidTag: function isValidTag(text) {
    return checkNotDuplicate(this.notetagList, 'text', text);
  }
});

var _observable;
var EditorStore = observable((_observable = {
  contents: '',
  tinymce: null,
  uploadFile: "",
  imgElement: '',
  isFile: false,
  selectFileIdx: '',
  selectFileElement: '',
  downloadFileId: '',
  deleteFileId: '',
  deleteFileName: '',
  deleteFileIndex: '',
  uploadFileList: [],
  deleteFileList: [],
  tempFileList: [],
  fileMetaList: [],
  fileList: [],
  fileLayoutList: [],
  fileName: "",
  fileSize: "",
  fileExtension: "",
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
  setImgElement: function setImgElement(element) {
    this.imgElement = element;
  },
  getImgElement: function getImgElement() {
    return this.imgElement;
  }
}, _defineProperty(_observable, "uploadFile", function () {
  var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dto, file, successCallback, errorCallback, index) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return API.Post(NoteRepository$1.URL + "/noteFile", JSON.stringify(dto), {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                var dto;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        dto = data.data.dto;

                        if (!dto.file_id) {
                          _context.next = 4;
                          break;
                        }

                        _context.next = 4;
                        return API.Post("http://222.122.67.176:8080/CMS/Storage/StorageFile?action=Create&fileID=" + dto.file_id + '&workspaceID=' + NoteRepository$1.WS_ID + '&channelID=' + dto.ch_id + '&userID=' + NoteRepository$1.USER_ID, file, {
                          headers: {
                            'Content-Type': 'multipart/form-data'
                          }
                        }).then(function (data) {
                          var dto = data.data.dto;

                          if (dto.resultMsg === "Success") {
                            if (typeof successCallback === "function") successCallback(dto, index);
                          } else {
                            if (typeof errorCallback === "function") errorCallback(dto, index);
                          }
                        }).catch(function (error) {
                          console.log(error);
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x6) {
                return _ref.apply(this, arguments);
              };
            }());

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  function uploadFile(_x, _x2, _x3, _x4, _x5) {
    return _uploadFile.apply(this, arguments);
  }

  return uploadFile;
}()), _defineProperty(_observable, "setDownLoadFileId", function setDownLoadFileId(fileId) {
  this.downloadFileId = fileId;
}), _defineProperty(_observable, "tempDeleteFile", function tempDeleteFile() {
  this.fileLayoutList.splice(this.deleteFileIndex, 1);
  if (this.fileLayoutList.length === 0) this.setIsFile(false);
}), _defineProperty(_observable, "deleteFile", function deleteFile(deleteId) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return NoteRepository$1.deleteFile(deleteId).then(function (response) {
              var dto = response.data.dto;
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))();
}), _defineProperty(_observable, "deleteAllFile", function deleteAllFile() {
  var _this = this;

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return NoteRepository$1.deleteAllFile(_this.fileList).then(function (response) {
              var dto = response.data.dto;

              if (dto.resultMsg === 'Success') {
                ChapterStore.getChapterList();
              }
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
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
      return !ImageExt.includes(file.file_extension.toLowerCase());
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
}), _defineProperty(_observable, "setUploadFileMeta", function setUploadFileMeta(type, tempId, config, file, element) {
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
  var uploadArr = {
    KEY: tempId,
    TYPE: type,
    uploadMeta: uploadMeta,
    file: file,
    element: element
  };
  this.setFileMetaList(uploadArr);
}), _defineProperty(_observable, "setFileMetaList", function setFileMetaList(fileMeta) {
  this.fileMetaList.push(fileMeta);
  console.log(toJS(this.fileMetaList));
}), _defineProperty(_observable, "getFileMetaList", function getFileMetaList() {
  return this.fileMetaList;
}), _defineProperty(_observable, "getTempTimeFormat", function getTempTimeFormat() {
  var date = new Date();
  var year = date.getFullYear();
  var month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + time;
}), _defineProperty(_observable, "setTempFileMeta", function setTempFileMeta(config) {
  var tempId = config.tempId,
      fileName = config.fileName,
      fileExtension = config.fileExtension,
      fileSize = config.fileSize;
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
    "user_context_2": tempId,
    "user_context_3": ''
  };
  this.setTempFileList(tempMeta);
}), _defineProperty(_observable, "setTempFileList", function setTempFileList(target) {
  this.fileLayoutList.push(target);
  if (!this.isFile) this.setIsFile(true);
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
}), _observable));

var _observable$1;
var PageStore = observable((_observable$1 = {
  noteInfoList: [],
  currentPageData: [],
  isEdit: '',
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createParent: '',
  createParentIdx: '',
  deletePageList: [],
  deleteParentIdx: '',
  nextSelectablePageId: '',
  isRename: false,
  renamePageId: '',
  renamePageText: '',
  isMovingPage: false,
  movePageId: '',
  // 이동을 원하는 page의 id
  movePageIdx: '',
  // 이동을 원하는 page의 index
  moveChapterId: '',
  // 이동을 원하는 page가 속한 chapter의 id
  moveChapterIdx: '',
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  modifiedDate: '',
  prevModifiedUserName: '',
  isNewPage: false,
  exportPageId: '',
  exportPageTitle: '',
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
    return this.isEdit === null || this.isEdit === '';
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
  getNextSelectablePageId: function getNextSelectablePageId() {
    return this.nextSelectablePageId;
  },
  setNextSelectablePageId: function setNextSelectablePageId(pageId) {
    this.nextSelectablePageId = pageId;
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
  getMovePageId: function getMovePageId() {
    return this.movePageId;
  },
  setMovePageId: function setMovePageId(pageId) {
    this.movePageId = pageId;
  },
  getMovePageIdx: function getMovePageIdx() {
    return this.movePageIdx;
  },
  setMovePageIdx: function setMovePageIdx(pageIdx) {
    this.movePageIdx = pageIdx;
  },
  getMoveChapterId: function getMoveChapterId() {
    return this.moveChapterId;
  },
  setMoveChapterId: function setMoveChapterId(chapterId) {
    this.moveChapterId = chapterId;
  },
  getMoveChapterIdx: function getMoveChapterIdx() {
    return this.moveChapterIdx;
  },
  setMoveChapterIdx: function setMoveChapterIdx(chapterIdx) {
    this.moveChapterIdx = chapterIdx;
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
  noneEdit: function noneEdit(noteId, parentNotebook, prevModifiedUserName, callback) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _yield$NoteRepository7, returnData;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return NoteRepository$1.nonEdit(noteId, parentNotebook, prevModifiedUserName);

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
  createNotePage: function createNotePage() {
    var _this = this;

    this.createPage('제목 없음', null, this.createParent).then(function (dto) {
      _this.currentPageData = dto;
      ChapterStore.getNoteChapterList();

      _this.setIsEdit(dto.is_edit);

      _this.noteTitle = '';
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      _this.currentPageId = dto.note_id;
      _this.isNewPage = true;
      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(dto.fileList);
    });
  },
  deleteNotePage: function deleteNotePage() {
    var _this2 = this;

    this.deletePage(this.deletePageList).then(function () {
      if (_this2.currentPageId === _this2.deletePageList[0].note_id) {
        _this2.setCurrentPageId(_this2.nextSelectablePageId);

        _this2.fetchCurrentPageData(_this2.nextSelectablePageId);
      }

      ChapterStore.getChapterList();
      NoteStore.setShowModal(false);
    });
  },
  renameNotePage: function renameNotePage(chapterId) {
    var _this3 = this;

    this.renamePage(this.renamePageId, this.renamePageText, chapterId).then(function (dto) {
      _this3.fetchNoteInfoList(dto.note_id);

      ChapterStore.getChapterList();
    });
  },
  clearMoveData: function clearMoveData() {
    this.movePageId = '';
    this.movePageIdx = '';
    this.moveChapterId = '';
  },
  movePage: function movePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageList, moveTargetPageIdx) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var item, pageList, children;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(_this4.moveChapterId === moveTargetChapterId)) {
                _context8.next = 5;
                break;
              }

              // 같은 챕터 내에 있는 페이지를 이동하고자 하는 경우
              if (_this4.movePageIdx !== moveTargetPageIdx && _this4.movePageIdx + 1 !== moveTargetPageIdx) {
                item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
                pageList = [];
                children = []; // Update pageList & localStorage

                moveTargetPageList.forEach(function (page, idx) {
                  if (idx === _this4.movePageIdx) return false;

                  if (idx === moveTargetPageIdx) {
                    pageList.push(moveTargetPageList[_this4.movePageIdx]);
                    children.push(item[moveTargetChapterIdx].children[_this4.movePageIdx]);
                  }

                  pageList.push(page);
                  children.push(page.id);
                });

                if (moveTargetPageIdx === moveTargetPageList.length) {
                  pageList.push(moveTargetPageList[_this4.movePageIdx]);
                  children.push(item[moveTargetChapterIdx].children[_this4.movePageIdx]);
                }

                ChapterStore.changePageList(moveTargetChapterIdx, pageList);
                item[moveTargetChapterIdx].children = children;
                localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));

                _this4.setCurrentPageId(_this4.movePageId);

                _this4.fetchCurrentPageData(_this4.movePageId);

                ChapterStore.setCurrentChapterId(moveTargetChapterId);
              }

              _this4.clearMoveData();

              _context8.next = 7;
              break;

            case 5:
              _context8.next = 7;
              return NoteRepository$1.movePage(_this4.movePageId, moveTargetChapterId).then(function (response) {
                if (response.status === 200) {
                  // 기존꺼 지우고
                  var _item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));

                  var _children = _item[_this4.moveChapterIdx].children.filter(function (pageId) {
                    return _this4.movePageId !== pageId;
                  });

                  _item[_this4.moveChapterIdx].children = _children; // 원하는 위치에 새로 추가

                  var newChildren = [];
                  moveTargetPageList.forEach(function (page, index) {
                    if (index === moveTargetPageIdx) newChildren.push(_this4.movePageId);
                    newChildren.push(page.id);
                  });
                  if (moveTargetPageIdx === moveTargetPageList.length) newChildren.push(_this4.movePageId);
                  _item[moveTargetChapterIdx].children = newChildren;
                  localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(_item));
                  ChapterStore.getChapterList();

                  _this4.setCurrentPageId(_this4.movePageId);

                  _this4.fetchCurrentPageData(_this4.movePageId);

                  ChapterStore.setCurrentChapterId(moveTargetChapterId);

                  _this4.clearMoveData();
                }
              });

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  modifiedDateFormatting: function modifiedDateFormatting() {
    var date = this.currentPageData.modified_date;
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

    if (mYear === curDate.getFullYear()) {
      // 같은 해
      if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate()) return basicDate; // 같은 날
      else return convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + ' ' + basicDate; // 다른 날
    } else {
      // 다른 해
      return mYear + '.' + convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + basicDate;
    }
  },
  fetchNoteInfoList: function fetchNoteInfoList(noteId) {
    var _this5 = this;

    this.getNoteInfoList(noteId).then(function (dto) {
      _this5.noteInfoList = dto;
      _this5.currentPageData = dto;
      _this5.isEdit = dto.is_edit;
      _this5.noteTitle = dto.note_title;
      _this5.modifiedDate = _this5.modifiedDateFormatting();
      EditorStore.setFileList(dto.fileList);
    });
  },
  fetchCurrentPageData: function fetchCurrentPageData(pageId) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!pageId) {
                _context9.next = 7;
                break;
              }

              _context9.next = 3;
              return _this6.fetchNoteInfoList(pageId);

            case 3:
              _context9.next = 5;
              return TagStore.fetchNoteTagList(pageId);

            case 5:
              _context9.next = 8;
              break;

            case 7:
              _this6.setIsEdit('');

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart: function noteEditStart(noteId) {
    var _this7 = this;

    this.prevModifiedUserName = this.currentPageData.user_name;
    this.editStart(noteId, this.currentPageData.parent_notebook).then(function (dto) {
      _this7.fetchNoteInfoList(dto.note_id);

      EditorStore.tinymce.focus();
      EditorStore.tinymce.selection.setCursorLocation();
    });
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone: function noteEditDone(updateDto) {
    var _this8 = this;

    this.editDone(updateDto).then(function (dto) {
      _this8.fetchNoteInfoList(dto.note_id);

      ChapterStore.getChapterList();
    });
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteNoneEdit: function noteNoneEdit(noteId) {
    var _this9 = this;

    this.noneEdit(noteId, this.currentPageData.parent_notebook, this.prevModifiedUserName).then(function (dto) {
      var _EditorStore$tinymce;

      _this9.fetchNoteInfoList(dto.note_id);

      (_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : _EditorStore$tinymce.setContent(_this9.currentPageData.note_content);
      NoteStore.setShowModal(false);
    });
  },
  handleNoneEdit: function handleNoneEdit() {
    var _this10 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var childList, pageId;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!_this10.isNewPage) {
                _context10.next = 11;
                break;
              }

              _this10.setDeletePageList({
                note_id: _this10.currentPageId
              });

              _this10.deleteParentIdx = _this10.createParentIdx;
              _context10.next = 5;
              return _this10.deleteNotePage();

            case 5:
              _this10.isNewPage = false;
              childList = ChapterStore.getChapterChildren(_this10.createParent);
              ChapterStore.setCurrentChapterId(_this10.createParent);

              if (childList.length > 1) {
                pageId = childList[1].id;

                _this10.setCurrentPageId(pageId);

                _this10.fetchCurrentPageData(pageId);
              }

              _context10.next = 12;
              break;

            case 11:
              _this10.noteNoneEdit(_this10.currentPageId);

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  handleSave: function handleSave() {
    var _EditorStore$tinymce2;

    if (this.noteTitle === '' || this.noteTitle === '제목 없음') {
      if (this.getTitle() !== undefined) PageStore.setTitle(this.getTitle());
    }

    var updateDTO = {
      dto: {
        note_id: this.currentPageData.note_id,
        note_title: this.noteTitle,
        note_content: this.noteContent ? this.noteContent : '<p><br></p>',
        parent_notebook: this.currentPageData.parent_notebook,
        is_edit: '',
        TYPE: 'EDIT_DONE'
      }
    };
    this.noteEditDone(updateDTO);
    if (TagStore.removeTagList) TagStore.deleteTag(TagStore.removeTagList, PageStore.currentPageId);
    if (TagStore.addTagList) TagStore.createTag(TagStore.addTagList, PageStore.currentPageId);
    if (TagStore.updateTagList) TagStore.updateTag(TagStore.updateTagList);
    NoteStore.setShowModal(false);
    (_EditorStore$tinymce2 = EditorStore.tinymce) === null || _EditorStore$tinymce2 === void 0 ? void 0 : _EditorStore$tinymce2.undoManager.clear();
    this.isNewPage = false;
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
      if (contentList[i].tagName === 'P') {
        if (contentList[i].getElementsByTagName('img').length > 0) {
          return contentList[i].getElementsByTagName('img')[0].dataset.name;
        } else if (!!contentList[i].textContent) return contentList[i].textContent;
      } else if (contentList[i].tagName === 'TABLE') {
        var tdList = contentList[i].getElementsByTagName('td');

        for (var tdIndex = 0; tdIndex < tdList.length; tdIndex++) {
          var tableTitle = this._getTableTitle(tdList[tdIndex].childNodes);

          if (tableTitle !== undefined) return tableTitle;
        }

        if (i === contentList.length - 1) return '표';
      } else if (contentList[i].tagName === 'IMG') {
        if (!!contentList[i].dataset.name) return contentList[i].dataset.name;
      } else if (contentList[i].nodeName === 'STRONG' || contentList[i].nodeName === 'BLOCKQUOTE' || contentList[i].nodeName === 'EM' || contentList[i].nodeName === 'H2' || contentList[i].nodeName === 'H3') {
        if (!!contentList[i].textContent) return contentList[i].textContent;
      } else if (contentList[i].nodeName === 'OL' || contentList[i].nodeName === 'UL') {
        if (!!contentList[i].children[0].textContent) return contentList[i].children[0].textContent;
      }
    }
  }
}), _defineProperty(_observable$1, "_getTableTitle", function _getTableTitle(td) {
  if (td) {
    for (var j = 0; j < td.length; j++) {
      if (td[j].nodeName === '#text') {
        return td[j].textContent;
      } else if (td[j].nodeName === 'STRONG' || td[j].nodeName === 'BLOCKQUOTE' || td[j].nodeName === 'EM' || td[j].nodeName === 'H2' || td[j].nodeName === 'H3') {
        if (!!td[j].textContent) return td[j].textContent;
      } else if (td[j].nodeName === 'OL' || td[j].nodeName === 'UL') {
        if (!!td[j].children[0].textContent) return td[j].children[0].textContent;
      } else if (td[j].nodeName === 'IMG') {
        return td[j].dataset.name;
      } else if (td[j].nodeName === 'TABLE') {
        // 두번 루프
        var tdList = td[j].getElementsByTagName('td');

        for (var tdIndex = 0; tdIndex < tdList.length; tdIndex++) {
          var tableTitle = this._getTableTitle(tdList[tdIndex].childNodes);

          if (tableTitle !== undefined) return tableTitle;
        }
      }
    }
  }
}), _defineProperty(_observable$1, "createSharePage", function createSharePage(shareTargetRoomId, shareTargetList) {// const shareTargetChId = roomStore.getChannelIds(shareTargetRoomId);
  // const shareTargetRoomName = roomStore.getRoomName(shareTargetRoomId);
  // if (shareTargetList) {
  //   let targetList = [];
  //   shareTargetList.map(page => {
  //     targetList.push(
  //       {
  //         WS_ID: NoteRepository.WS_ID,
  //         note_id: (page.note_id || page.id),
  //         note_channel_id: NoteRepository.chId,
  //         USER_ID: NoteRepository.USER_ID,
  //         shared_user_id: NoteRepository.USER_ID,
  //         shared_room_name: shareTargetRoomName,
  //         target_workspace_id: shareTargetRoomId,
  //         target_channel_id: shareTargetChId
  //       }
  //     )
  //   })
  // }
  // await NoteRepository.createSharePage(targetList).then(
  //   (response) => {
  //     if (response.status === 200) {
  //       const {
  //         data: { dto: noteList },
  //       } = response;
  //     }
  //   }
  // );

  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }))();
}), _observable$1));

var ChapterStore = observable({
  chapterColor: "",
  chapterList: [],
  currentChapterId: "",
  chapterNewTitle: "",
  isNewChapterColor: "",
  isNewChapter: false,
  colorArray: {
    1: "#FB7748",
    2: "#FB891B",
    3: "#E7B400",
    4: "#B4CC1B",
    5: "#65D03F",
    6: "#14C0B3",
    7: "#00C6E6",
    8: "#4A99F5",
    9: "#046305",
    10: "#E780FF",
    11: "#FF7BA8"
  },
  isSearching: false,
  isTagSearching: false,
  //tag chip 클릭해서 tag chip 띄울 때 씀
  searchingTagName: '',
  searchStr: "",
  // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요
  searchResult: {},
  // {chapter:[], page:[]} 형태
  deleteChapterId: '',
  nextSelectableChapterId: '',
  renameChapterId: '',
  renameChapterText: '',
  allDeleted: false,
  isMovingChapter: false,
  moveChapterIdx: '',
  dragEnterChapterIdx: '',
  chapterMap: new Map(),
  pageMap: new Map(),
  chapterChildren: [],
  exportChapterId: '',
  exportChapterTitle: '',
  sharedCnt: 0,
  getCurrentChapterId: function getCurrentChapterId() {
    return this.currentChapterId;
  },
  setCurrentChapterId: function setCurrentChapterId(chapterId) {
    this.currentChapterId = chapterId;
  },
  getDeleteChapterId: function getDeleteChapterId() {
    return this.deleteChapterId;
  },
  setDeleteChapterId: function setDeleteChapterId(chapterId) {
    this.deleteChapterId = chapterId;
  },
  getNextSelectableChapterId: function getNextSelectableChapterId() {
    return this.nextSelectableChapterId;
  },
  setNextSelectableChapterId: function setNextSelectableChapterId(chapterId) {
    this.nextSelectableChapterId = chapterId;
  },
  getRenameChapterId: function getRenameChapterId() {
    return this.renameChapterId;
  },
  setRenameChapterId: function setRenameChapterId(chapterId) {
    this.renameChapterId = chapterId;
  },
  getRenameChapterText: function getRenameChapterText() {
    return this.renameChapterText;
  },
  setRenameChapterText: function setRenameChapterText(chapterText) {
    this.renameChapterText = chapterText;
  },
  getAllDeleted: function getAllDeleted() {
    return this.allDeleted;
  },
  setAllDeleted: function setAllDeleted(allDeleted) {
    this.allDeleted = allDeleted;
  },
  getIsMovingChapter: function getIsMovingChapter() {
    return this.isMovingChapter;
  },
  setIsMovingChapter: function setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  getMoveChapterIdx: function getMoveChapterIdx() {
    return this.moveChapterIdx;
  },
  setMoveChapterIdx: function setMoveChapterIdx(chapterIdx) {
    this.moveChapterIdx = chapterIdx;
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
  },
  getChapterColor: function getChapterColor(chapterId) {
    var _NoteRepository$getCh = NoteRepository$1.getChapterColor(chapterId),
        value = _NoteRepository$getCh.value;

    return value;
  },
  getChapterName: function getChapterName(chapterId) {
    var _NoteRepository$getCh2 = NoteRepository$1.getChapterText(chapterId),
        value = _NoteRepository$getCh2.value;

    return value;
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

  /**
   *  ChapterStore Method : getChapterList, createChapter, deleteChapter, renameChapter
   */
  getChapterList: function getChapterList() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$NoteRepository, notbookList;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return NoteRepository$1.getChapterList(NoteStore.getChannelId());

            case 2:
              _yield$NoteRepository = _context.sent;
              notbookList = _yield$NoteRepository.data.dto.notbookList;

              _this.setChapterList(notbookList);

              return _context.abrupt("return", notbookList);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  setChapterList: function setChapterList(chapterList) {
    this.chapterList = chapterList;
  },
  createChapter: function createChapter(chapterTitle, chapterColor) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$NoteRepository2, dto;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return NoteRepository$1.createChapter(chapterTitle, chapterColor);

            case 2:
              _yield$NoteRepository2 = _context2.sent;
              dto = _yield$NoteRepository2.dto;
              return _context2.abrupt("return", dto);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  deleteChapter: function deleteChapter(deleteChapterId) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$NoteRepository3, dto;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return NoteRepository$1.deleteChapter(deleteChapterId);

            case 2:
              _yield$NoteRepository3 = _context3.sent;
              dto = _yield$NoteRepository3.dto;
              return _context3.abrupt("return", dto);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  renameChapter: function renameChapter(renameId, renameText, color) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$NoteRepository4, dto;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return NoteRepository$1.renameChapter(renameId, renameText, color);

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

  /**
   * ChapterStore Business Logic in NoteApp
   */
  createMap: function createMap(notebookList) {
    var _this2 = this;

    this.chapterMap.clear();
    this.pageMap.clear();
    notebookList.forEach(function (chapter, i) {
      if (chapter.type !== 'notebook') return;

      _this2.chapterMap.set(chapter.id, i);

      chapter.children.forEach(function (page, j) {
        _this2.pageMap.set(page.id, {
          parent: chapter.id,
          idx: j
        });
      });
    });
  },
  getSharedList: function getSharedList(notebookList) {
    var sharedList = [];
    notebookList.forEach(function (chapter, idx) {
      if (chapter.type === 'notebook') return;
      if (chapter.type === 'shared_page') sharedList.splice(0, 0, notebookList[idx]);else if (chapter.type === 'shared') sharedList.push(notebookList[idx]);
    });
    return sharedList;
  },
  setLocalStorageItem: function setLocalStorageItem(targetChannelId) {
    var item = [];
    this.chapterList.forEach(function (chapter) {
      if (chapter.type !== 'notebook') return;
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
  },
  applyDifference: function applyDifference(targetChannelId, notebookList) {
    var _this3 = this;

    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId)); // 로컬 스토리지에 없는 챕터/페이지가 있는지 확인한다.

    var createdChapterIds = [];
    var chapterIds = item.map(function (chapter) {
      return chapter.id;
    });
    notebookList.forEach(function (chapter) {
      if (chapter.type !== 'notebook') return;

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
        chapter.children.forEach(function (page) {
          if (!item[chapterIdx].children.includes(page.id)) {
            createdPageIds.push(page.id);
          }
        });
        item[chapterIdx].children = createdPageIds.concat(item[chapterIdx].children);
      }
    });
    item = createdChapterIds.concat(item);
    item.slice().forEach(function (chapter) {
      chapterIds = item.map(function (chapter) {
        return chapter.id;
      });

      if (_this3.chapterMap.get(chapter.id) === undefined) {
        item.splice(chapterIds.indexOf(chapter.id), 1);
      } else {
        chapter.children.slice().forEach(function (pageId) {
          var pageIds = chapter.children;

          if (_this3.pageMap.get(pageId) === undefined || _this3.pageMap.get(pageId).parent !== chapter.id) {
            chapter.children.splice(pageIds.indexOf(pageId), 1);
          }
        });
      }
    });
    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
  },
  getLocalStorageItem: function getLocalStorageItem(targetChannelId, notebookList) {
    var _this4 = this;

    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));
    var localChapterList = [];
    item.forEach(function (chapter, idx) {
      var chapterIdx = _this4.chapterMap.get(chapter.id);

      localChapterList.push(notebookList[chapterIdx]);
      var localPageList = [];
      chapter.children.forEach(function (pageId) {
        var pageIdx = _this4.pageMap.get(pageId).idx;

        localPageList.push(notebookList[chapterIdx].children[pageIdx]);
      });
      localChapterList[idx].children = localPageList;
    });
    return localChapterList;
  },
  fetchChapterList: function fetchChapterList() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _this5$chapterList$0$, _this5$chapterList$0$2, chapterId, pageId;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(_this5.chapterList.length !== 0)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              _context5.next = 4;
              return _this5.getNoteChapterList();

            case 4:
              if (_this5.chapterList.length === 0) {
                NoteStore.setShowPage(false);
              } else {
                NoteStore.setShowPage(true);
                chapterId = _this5.chapterList[0].id;
                pageId = (_this5$chapterList$0$ = _this5.chapterList[0].children) === null || _this5$chapterList$0$ === void 0 ? void 0 : (_this5$chapterList$0$2 = _this5$chapterList$0$[0]) === null || _this5$chapterList$0$2 === void 0 ? void 0 : _this5$chapterList$0$2.id;

                _this5.setCurrentChapterId(chapterId);

                PageStore.setCurrentPageId(pageId);
                PageStore.fetchCurrentPageData(pageId);
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  getNoteChapterList: function getNoteChapterList() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var notbookList, sharedList;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this6.getChapterList();

            case 2:
              notbookList = _context6.sent;

              _this6.createMap(notbookList);

              sharedList = _this6.getSharedList(notbookList);
              _this6.sharedCnt = sharedList.length;

              if (!localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
                _this6.chapterList = notbookList.filter(function (chapter) {
                  return chapter.type === 'notebook';
                });

                _this6.setLocalStorageItem(NoteStore.getChannelId());
              } else {
                _this6.applyDifference(NoteStore.getChannelId(), notbookList);

                _this6.chapterList = _this6.getLocalStorageItem(NoteStore.getChannelId(), notbookList);
              }

              _this6.chapterList = _this6.chapterList.concat(sharedList);
              return _context6.abrupt("return", _this6.chapterList);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  createNoteChapter: function createNoteChapter(chapterTitle, chapterColor) {
    var _this7 = this;

    this.createChapter(chapterTitle, chapterColor).then(function (notbookList) {
      _this7.getNoteChapterList();

      _this7.setCurrentChapterId(notbookList.id);

      PageStore.setCurrentPageId(notbookList.children[0].id);

      _this7.setChapterTempUl(false);

      _this7.setAllDeleted(false);
    });
  },
  deleteNoteChapter: function deleteNoteChapter() {
    var _this8 = this;

    this.deleteChapter(this.deleteChapterId).then(function () {
      if (_this8.currentChapterId === _this8.deleteChapterId) {
        _this8.setCurrentChapterId(_this8.nextSelectableChapterId);

        PageStore.setCurrentPageId(PageStore.nextSelectablePageId ? PageStore.nextSelectablePageId : '');
        PageStore.fetchCurrentPageData(PageStore.nextSelectablePageId ? PageStore.nextSelectablePageId : '');
        if (!_this8.nextSelectableChapterId) _this8.setAllDeleted(true);
      }

      _this8.getNoteChapterList();

      if (_this8.allDeleted) NoteStore.setShowPage(false);
      _this8.deleteChapterId = '';
      NoteStore.setShowModal(false);
    });
  },
  renameNoteChapter: function renameNoteChapter(color) {
    var _this9 = this;

    this.renameChapter(this.renameChapterId, this.renameChapterText, color).then(function () {
      return _this9.getNoteChapterList();
    });
  },
  moveChapter: function moveChapter(moveTargetChapterIdx) {
    var _this10 = this;

    if (this.moveChapterIdx !== moveTargetChapterIdx && this.moveChapterIdx + 1 !== moveTargetChapterIdx) {
      var item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
      var curChapterList = [];
      var curItem = []; // Update chapterList & localStorage

      this.chapterList.forEach(function (chapter, idx) {
        if (idx === _this10.moveChapterIdx) return false;

        if (idx === moveTargetChapterIdx) {
          curChapterList.push(_this10.chapterList[_this10.moveChapterIdx]);
          curItem.push(item[_this10.moveChapterIdx]);
        }

        curChapterList.push(chapter);
        if (chapter.type === 'notebook') curItem.push(item[idx]);
      });

      if (curChapterList.length !== this.chapterList.length) {
        curChapterList.push(this.chapterList[this.moveChapterIdx]);
        curItem.push(item[this.moveChapterIdx]);
      }

      this.chapterList = curChapterList;
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(curItem));
    }

    this.moveChapterIdx = '';
  },
  // search 관련  
  initSearchVar: function initSearchVar() {
    var _this11 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this11.setIsSearching(false);

              _this11.setIsTagSearching(false);

              _this11.setSearchResult({});

              _this11.setSearchStr("");

              _context7.next = 6;
              return _this11.getNoteChapterList();

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },

  /*
    태그와 챕터리스트 isSearching이 다름
    chapterStore에서 isSearching은 검색 시작 ~ 검색 결과나온 후 더는 안 보려고 결과 초기화하는 동작까지임
    태그는 sortedTagList란 변수 하나로 검색 결과까지 출력해서 
    isSearching이 검색 시작 ~ 검색 결과 출력전까지임
  */
  fetchSearchResult: function fetchSearchResult(searchStr) {
    var _this12 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this12.setIsSearching(true); // 검색 결과 출력 종료까지임


              _this12.setSearchStr(searchStr); // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요


              _context8.next = 4;
              return _this12.getSearchResult();

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  getSearchResult: function getSearchResult() {
    var _this13 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var _yield$NoteRepository5, chapterList, resultChapterArr, resultPageArr;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _this13.setSearchResult({});

              _context9.next = 3;
              return NoteRepository$1.getChapterList(NoteStore.getChannelId());

            case 3:
              _yield$NoteRepository5 = _context9.sent;
              chapterList = _yield$NoteRepository5.data.dto.notbookList;
              // searchResult 만들기
              resultChapterArr = [], resultPageArr = [];
              chapterList.map(function (chapter) {
                // chapter 저장
                if (chapter.text.includes(_this13.searchStr)) {
                  resultChapterArr.push({
                    id: chapter.id,
                    title: chapter.text,
                    color: chapter.color,
                    // 클릭하면 setCurrentPageId 해야해서 필요
                    firstPageId: chapter.children.length > 0 ? chapter.children[0].id : null
                  });
                } // page 저장


                chapter.children.map(function (page) {
                  if (page.text.includes(_this13.searchStr)) {
                    resultPageArr.push({
                      chapterId: chapter.id,
                      chapterTitle: chapter.text,
                      id: page.id,
                      title: page.text
                    });
                  }
                });
              });

              _this13.setSearchResult({
                chapter: resultChapterArr,
                page: resultPageArr
              });

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  createShareChapter: function createShareChapter(shareTargetRoomId, shareTargetList) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              // const shareTargetRoomName = roomStore.getRoomName(shareTargetRoomId);
              // if (shareTargetList) {
              //   shareTargetList.map(chapter => {
              //     targetList.push(
              //       {
              //         id: chapter.id,
              //         ws_id: NoteRepository.WS_ID,
              //         note_channel_id: NoteRepository.chId,
              //         text: chapter.text,
              //         USER_ID: NoteRepository.USER_ID,
              //         shared_user_id: NoteRepository.USER_ID,
              //         shared_room_name: shareTargetRoomName,
              //         target_workspace_id: shareTargetRoomId,
              //         target_channel_id: shareTargetChId
              //       }
              //     )
              //   })
              // }
              // await NoteRepository.createShareChapter(targetList).then(
              //   (response) => {
              //     if (response.status === 200) {
              //       const {
              //         data: { dto: notbookList },
              //       } = response;
              //     }
              //   }
              // );

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  }
});

var NoteMeta = {
  openDialog: function openDialog(type) {
    return this.setDialogConfig(this.setModalConfig(type), this.setEventConfig(type));
  },
  setDialogConfig: function setDialogConfig(dialogType, eventList) {
    var buttonList = [];
    eventList.map(function (event, index) {
      dialogType.buttonConfig[index].onClick = event;
      buttonList.push(dialogType.buttonConfig[index]);
    });
    return {
      type: 'alert',
      title: dialogType.title,
      subTitle: dialogType.subtitle ? dialogType.subtitle : null,
      buttons: buttonList
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
          PageStore.handleSave();
        });
        eventList.push(function (e) {
          e.stopPropagation();
          if (PageStore.isNewPage) PageStore.handleNoneEdit();else {
            var _EditorStore$tinymce;

            PageStore.noteNoneEdit(PageStore.currentPageId);
            (_EditorStore$tinymce = EditorStore.tinymce) === null || _EditorStore$tinymce === void 0 ? void 0 : _EditorStore$tinymce.undoManager.clear();
          }
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'confirm':
      case 'titleDuplicate':
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;

      case 'fileDelete':
        eventList.push(function (e) {
          e.stopPropagation();
          EditorStore.tempDeleteFile();
          NoteStore.setModalInfo(null);
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
          EditorStore.setDeleteFileConfig('', '');
        });
        break;

      case 'imageDelete':
        eventList.push(function (e) {
          e.stopPropagation();
          EditorStore.deleteImage();
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
    }

    return eventList;
  },
  setButtonConfig: function setButtonConfig(type) {
    switch (type) {
      case 'delete':
      case 'fileDelete':
      case 'imageDelete':
        return [{
          type: 'delete',
          text: '삭제'
        }, {
          type: 'cancel',
          text: '취소'
        }];

      case 'confirm':
        return [{
          type: 'confirom',
          text: '확인'
        }];

      case 'editCancel':
        return [{
          type: 'save',
          text: '저장'
        }, {
          type: 'notSave',
          text: '저장 안 함'
        }, {
          type: 'cancel',
          text: '취소'
        }];

      case 'titleDuplicate':
        return [{
          type: 'confirom',
          text: '확인'
        }];

      default:
        return;
    }
  },
  setModalConfig: function setModalConfig(type) {
    var userName = '';
    var fileName = EditorStore.deleteFileName;
    var dialogType = {
      type: 'alert',
      title: '',
      subtitle: '',
      buttonConfig: []
    };

    switch (type) {
      case 'chapter':
        dialogType.title = '챕터를 삭제하시겠습니까?';
        dialogType.subtitle = '챕터에 속한 페이지도 삭제됩니다.';
        dialogType.buttonConfig = this.setButtonConfig('delete');
        break;

      case 'page':
        dialogType.title = '페이지를 삭제하시겠습니까?';
        dialogType.subtitle = '';
        dialogType.buttonConfig = this.setButtonConfig('delete');
        break;

      case 'confirm':
        dialogType.type = 'normal';
        dialogType.title = '삭제할 수 없습니다.';
        dialogType.subtitle = "".concat(userName, " \uB2D8\uC774 \uC218\uC815 \uC911 \uC785\uB2C8\uB2E4.");
        dialogType.buttonConfig = this.setButtonConfig(type);
        break;

      case 'editCancel':
        dialogType.title = '페이지를 저장하고 나가시겠습니까?';
        dialogType.subtitle = '';
        dialogType.buttonConfig = this.setButtonConfig(type);
        break;

      case 'fileDelete':
        dialogType.title = "\uC120\uD0DD\uD55C ".concat(fileName, " \uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?");
        dialogType.subtitle = '삭제 후에는 복구할 수 없습니다.';
        dialogType.buttonConfig = this.setButtonConfig('delete');
        break;

      case 'titleDuplicate':
        dialogType.title = '중복된 이름이 있습니다.';
        dialogType.subtitle = '다른 이름을 입력해주세요.';
        dialogType.buttonConfig = this.setButtonConfig('titleDuplicate');
        break;

      case 'imageDelete':
        dialogType.title = "\uC120\uD0DD\uD55C ".concat(EditorStore.tinymce.selection.getNode().getAttribute('data-name'), " \uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?");
        dialogType.subtitle = '삭제 후에는 복구할 수 없습니다.';
        dialogType.buttonConfig = this.setButtonConfig('imageDelete');
    }

    return dialogType;
  }
};

var handleWebsocket = function handleWebsocket(message) {
  console.log(message);
  var EVENT_CASE = message.NOTI_ETC.split(',')[0];
};

var NoteStore = observable({
  workspaceId: '',
  notechannel_id: '',
  user_id: '',
  noteFileList: [],
  showPage: true,
  // editor 보고 있는지 태그 보고 있는지
  layoutState: '',
  targetLayout: null,
  isExpanded: false,
  showModal: false,
  modalInfo: {},
  LNBChapterCoverRef: '',
  isDragging: false,
  draggedType: '',
  draggedTitle: '',
  draggedOffset: {},
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
  getUserId: function getUserId() {
    return this.user_id;
  },
  init: function init(roomId, channelId, userId, userName, callback) {
    NoteStore.setWsId(roomId);
    NoteStore.setChannelId(channelId);
    NoteStore.setUserName(userName);
    NoteStore.setUserId(userId);
    if (typeof callback === 'function') callback();
  },
  addWWMSHandler: function addWWMSHandler() {
    WWMS.addHandler('CHN0003', handleWebsocket);
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
    if (state !== 'collapse') this.targetLayout = null;
  },
  // lnb, content 중 하나
  setTargetLayout: function setTargetLayout(target) {
    this.targetLayout = target;
  },
  setIsExpanded: function setIsExpanded() {
    this.isExpanded = !this.isExpanded;
  },
  setShowModal: function setShowModal(showModal) {
    this.showModal = showModal;
  },
  // { type, title, subTitle, buttons }
  setModalInfo: function setModalInfo(modalType) {
    switch (modalType) {
      case 'fileDelete':
      case 'chapter':
      case 'page':
      case 'editCancel':
      case 'titleDuplicate':
      case 'imageDelete':
        this.modalInfo = NoteMeta.openDialog(modalType);
        this.setShowModal(true);
        break;

      case null:
      default:
        this.modalInfo = {};
        this.setShowModal(false);
        break;
    }
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
  setDraggedTitle: function setDraggedTitle(title) {
    this.draggedTitle = title;
  },
  setDraggedOffset: function setDraggedOffset(offset) {
    this.draggedOffset = offset;
  },
  disableScroll: function disableScroll(e) {
    e.preventDefault();
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
