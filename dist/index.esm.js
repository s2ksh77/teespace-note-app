import React, { useRef, useState, useEffect } from 'react';
import { initReactI18next, useTranslation, I18nextProvider } from 'react-i18next';
import { useObserver } from 'mobx-react';
import { UserStore, API, EventBus, useCoreStores, Message, RoomStore, ComponentStore } from 'teespace-core';
import { action, computed, observable, set, flow } from 'mobx';
import autobind from 'autobind-decorator';
import i18next from 'i18next';
import styled, { css, createGlobalStyle } from 'styled-components';
import { Tag, Collapse, Menu, Dropdown } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useHistory } from 'react-router-dom';

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

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _temp;

var PageModel = autobind(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function PageModel(data) {
    _classCallCheck(this, PageModel);

    _initializerDefineProperty(this, "chType", _descriptor, this);

    _initializerDefineProperty(this, "type", _descriptor2, this);

    _initializerDefineProperty(this, "lastUserId", _descriptor3, this);

    _initializerDefineProperty(this, "roomId", _descriptor4, this);

    _initializerDefineProperty(this, "chapterColor", _descriptor5, this);

    _initializerDefineProperty(this, "createDate", _descriptor6, this);

    _initializerDefineProperty(this, "deleteDate", _descriptor7, this);

    _initializerDefineProperty(this, "fileList", _descriptor8, this);

    _initializerDefineProperty(this, "fileDeletedAt", _descriptor9, this);

    _initializerDefineProperty(this, "fileExtension", _descriptor10, this);

    _initializerDefineProperty(this, "fileName", _descriptor11, this);

    _initializerDefineProperty(this, "fileSize", _descriptor12, this);

    _initializerDefineProperty(this, "editingUserId", _descriptor13, this);

    _initializerDefineProperty(this, "messengerId", _descriptor14, this);

    _initializerDefineProperty(this, "modDate", _descriptor15, this);

    _initializerDefineProperty(this, "chId", _descriptor16, this);

    _initializerDefineProperty(this, "content", _descriptor17, this);

    _initializerDefineProperty(this, "id", _descriptor18, this);

    _initializerDefineProperty(this, "name", _descriptor19, this);

    _initializerDefineProperty(this, "chapterId", _descriptor20, this);

    _initializerDefineProperty(this, "resultMsg", _descriptor21, this);

    _initializerDefineProperty(this, "shareRoomId", _descriptor22, this);

    _initializerDefineProperty(this, "shareUserId", _descriptor23, this);

    _initializerDefineProperty(this, "tagList", _descriptor24, this);

    _initializerDefineProperty(this, "targetChId", _descriptor25, this);

    _initializerDefineProperty(this, "targetRoomId", _descriptor26, this);

    _initializerDefineProperty(this, "chapterName", _descriptor27, this);

    _initializerDefineProperty(this, "textContent", _descriptor28, this);

    _initializerDefineProperty(this, "userName", _descriptor29, this);

    this.setValues(data);
  }

  _createClass(PageModel, [{
    key: "setValues",
    value: function setValues(data) {
      set(this, data);
    }
  }, {
    key: "setChType",
    value: function setChType(data) {
      this.chType = data;
    }
  }, {
    key: "setType",
    value: function setType(data) {
      this.type = data;
    }
  }, {
    key: "setRoomId",
    value: function setRoomId(data) {
      this.roomId = data;
    }
  }, {
    key: "setUserId",
    value: function setUserId(data) {
      this.lastUserId = data;
    }
  }, {
    key: "setColor",
    value: function setColor(data) {
      this.chapterColor = data;
    }
  }, {
    key: "setCreatedDate",
    value: function setCreatedDate(data) {
      this.createDate = data;
    }
  }, {
    key: "setDeletedDate",
    value: function setDeletedDate(data) {
      this.deleteDate = data;
    }
  }, {
    key: "setFileList",
    value: function setFileList(data) {
      this.fileList = data;
    }
  }, {
    key: "setFileDeletedAt",
    value: function setFileDeletedAt(data) {
      this.file_deleted_at = data;
    }
  }, {
    key: "setFileExtension",
    value: function setFileExtension(data) {
      this.file_extension = data;
    }
  }, {
    key: "setFileName",
    value: function setFileName(data) {
      this.file_name = data;
    }
  }, {
    key: "setFileSize",
    value: function setFileSize(data) {
      this.file_size = data;
    }
  }, {
    key: "setIsEdit",
    value: function setIsEdit(data) {
      this.editingUserId = data;
    }
  }, {
    key: "setMessengerId",
    value: function setMessengerId(data) {
      this.messengerId = data;
    }
  }, {
    key: "setModifiedDate",
    value: function setModifiedDate(data) {
      this.modDate = data;
    }
  }, {
    key: "setNoteChannelId",
    value: function setNoteChannelId(data) {
      this.chId = data;
    }
  }, {
    key: "setNoteContent",
    value: function setNoteContent(data) {
      this.content = data;
    }
  }, {
    key: "setNoteId",
    value: function setNoteId(data) {
      this.id = data;
    }
  }, {
    key: "setNoteTitle",
    value: function setNoteTitle(data) {
      this.name = data;
    }
  }, {
    key: "setChapterId",
    value: function setChapterId(data) {
      this.chapterId = data;
    }
  }, {
    key: "setSharedRoomId",
    value: function setSharedRoomId(data) {
      this.shareRoomId = data;
    }
  }, {
    key: "setSharedUserId",
    value: function setSharedUserId(data) {
      this.shareUserId = data;
    }
  }, {
    key: "setTagList",
    value: function setTagList(data) {
      this.tagList = data;
    }
  }, {
    key: "setTargetChId",
    value: function setTargetChId(data) {
      this.targetChId = data;
    }
  }, {
    key: "setTargetRoomId",
    value: function setTargetRoomId(data) {
      this.targetRoomId = data;
    }
  }, {
    key: "setChapterText",
    value: function setChapterText(data) {
      this.chapterName = data;
    }
  }, {
    key: "setTextContent",
    value: function setTextContent(data) {
      this.textContent = data;
    }
  }, {
    key: "setUserName",
    value: function setUserName(data) {
      this.userName = data;
    }
  }, {
    key: "getDisplayName",
    // eslint-disable-next-line consistent-return
    value: function () {
      var _getDisplayName = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var userProfile;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return UserStore.fetchProfile(this.lastUserId);

              case 2:
                userProfile = _context.sent;

                if (!userProfile) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", userProfile.displayName);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDisplayName() {
        return _getDisplayName.apply(this, arguments);
      }

      return getDisplayName;
    }()
  }, {
    key: "isReadMode",
    get: function get() {
      if (this.editingUserId === null || this.editingUserId === '') return true;
      if (this.editingUserId !== null && NoteStore$1.userId === this.editingUserId) return false; // PageStore.setOtherEditUserID(this.editingUserId);

      return true;
    }
  }]);

  return PageModel;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "chType", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lastUserId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "roomId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "chapterColor", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "createDate", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "deleteDate", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fileList", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fileDeletedAt", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "fileExtension", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "fileName", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "fileSize", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "editingUserId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "messengerId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "modDate", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "chId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "content", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "id", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "name", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "chapterId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "resultMsg", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "shareRoomId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "shareUserId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "tagList", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "targetChId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "targetRoomId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "chapterName", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "textContent", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "userName", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "setValues", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setValues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setChType", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setChType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setType", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRoomId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRoomId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setColor", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCreatedDate", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCreatedDate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDeletedDate", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDeletedDate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFileList", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFileList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFileDeletedAt", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFileDeletedAt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFileExtension", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFileExtension"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFileName", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFileName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFileSize", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFileSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsEdit", [action, action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsEdit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMessengerId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMessengerId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setModifiedDate", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setModifiedDate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNoteChannelId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNoteChannelId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNoteContent", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNoteContent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNoteId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNoteId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNoteTitle", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNoteTitle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setChapterId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setChapterId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSharedRoomId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSharedRoomId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSharedUserId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSharedUserId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTagList", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTagList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTargetChId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTargetChId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTargetRoomId", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTargetRoomId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setChapterText", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setChapterText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTextContent", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTextContent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserName", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isReadMode", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "isReadMode"), _class2.prototype)), _class2)) || _class;
/**
 * @param ServerObj to PageInfo mapping
 * @returns PageModel
 */

var convertPageObjToModel = function convertPageObjToModel(obj) {
  if (obj.USER_ID) {
    return {
      lastUserId: obj.USER_ID
    };
  }

  if (obj.CH_TYPE) {
    return {
      chType: obj.CH_TYPE
    };
  }

  if (obj.color) {
    return {
      chapterColor: obj.color
    };
  }

  if (obj.note_id) {
    return {
      id: obj.note_id
    };
  }

  if (obj.note_title) {
    return {
      name: obj.note_title
    };
  }

  if (obj.note_content) {
    return {
      content: obj.note_content
    };
  }

  if (obj.text_content) {
    return {
      textContent: obj.text_content
    };
  }

  if (obj.parent_notebook) {
    return {
      chapterId: obj.parent_notebook
    };
  }

  if (obj.is_edit) {
    return {
      editingUserId: obj.is_edit
    };
  }

  if (obj.fileList) {
    return {
      fileList: obj.fileList
    };
  }

  if (obj.tagList) {
    return {
      tagList: obj.tagList
    };
  }

  if (obj.messenger_id) {
    return {
      messengerId: obj.messenger_id
    };
  }

  if (obj.modified_date) {
    return {
      modDate: obj.modified_date
    };
  }

  if (obj.note_channel_id) {
    return {
      chId: obj.note_channel_id
    };
  }

  if (obj.shared_date) {
    return {
      sharedDate: obj.shared_date
    };
  }

  if (obj.shared_room_name) {
    return {
      shareRoomId: obj.shared_room_name
    };
  }

  if (obj.shared_user_id) {
    return {
      shareUserId: obj.shared_user_id
    };
  }

  if (obj.target_channel_id) {
    return {
      targetChId: obj.target_channel_id
    };
  }

  if (obj.target_workspace_id) {
    return {
      targetRoomId: obj.target_workspace_id
    };
  }

  if (obj.text) {
    return {
      chapterName: obj.text
    };
  }

  if (obj.user_name) {
    return {
      userName: obj.user_name
    };
  }

  if (obj.WS_ID) {
    return {
      roomId: obj.WS_ID
    };
  }

  return '';
};

var NoteUtil = {
  getChapterType: function getChapterType(type) {
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
  getChapterRandomColor: function getChapterRandomColor() {
    var COLOR_ARRAY = ['#C84847', '#F29274', '#F6C750', '#77B69B', '#679886', '#3A7973', '#77BED3', '#5C83DA', '#8F91E7', '#DF97AA', '#CA6D6D'];
    return COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
  }
};

var _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6$1, _descriptor7$1, _descriptor8$1, _descriptor9$1, _descriptor10$1, _descriptor11$1, _descriptor12$1, _descriptor13$1, _descriptor14$1, _descriptor15$1, _temp$1;

var ChapterModel = autobind(_class$1 = (_class2$1 = (_temp$1 = /*#__PURE__*/function () {
  function ChapterModel(data) {
    _classCallCheck(this, ChapterModel);

    _initializerDefineProperty(this, "userId", _descriptor$1, this);

    _initializerDefineProperty(this, "pageList", _descriptor2$1, this);

    _initializerDefineProperty(this, "color", _descriptor3$1, this);

    _initializerDefineProperty(this, "id", _descriptor4$1, this);

    _initializerDefineProperty(this, "type", _descriptor5$1, this);

    _initializerDefineProperty(this, "modDate", _descriptor6$1, this);

    _initializerDefineProperty(this, "chId", _descriptor7$1, this);

    _initializerDefineProperty(this, "sharedDate", _descriptor8$1, this);

    _initializerDefineProperty(this, "shareRoomId", _descriptor9$1, this);

    _initializerDefineProperty(this, "shareUserId", _descriptor10$1, this);

    _initializerDefineProperty(this, "targetChId", _descriptor11$1, this);

    _initializerDefineProperty(this, "targetRoomId", _descriptor12$1, this);

    _initializerDefineProperty(this, "name", _descriptor13$1, this);

    _initializerDefineProperty(this, "userName", _descriptor14$1, this);

    _initializerDefineProperty(this, "roomId", _descriptor15$1, this);

    this.setValues(data);
  }

  _createClass(ChapterModel, [{
    key: "setValues",
    value: function setValues(data) {
      set(this, data);
    }
  }, {
    key: "setRoomId",
    value: function setRoomId(data) {
      this.roomId = data;
    }
  }, {
    key: "setType",
    value: function setType(data) {
      this.type = data;
    }
  }, {
    key: "setUserId",
    value: function setUserId(data) {
      this.userId = data;
    }
  }, {
    key: "setChildren",
    value: function setChildren(data) {
      this.pageList = data;
    }
  }, {
    key: "setColor",
    value: function setColor(data) {
      this.color = data;
    }
  }, {
    key: "setChapterId",
    value: function setChapterId(data) {
      this.id = data;
    }
  }, {
    key: "setModifiedDate",
    value: function setModifiedDate(data) {
      this.modDate = data;
    }
  }, {
    key: "setNoteChannelId",
    value: function setNoteChannelId(data) {
      this.chId = data;
    }
  }, {
    key: "setSharedDate",
    value: function setSharedDate(data) {
      this.sharedDate = data;
    }
  }, {
    key: "setSharedRoomName",
    value: function setSharedRoomName(data) {
      this.shareRoomId = data;
    }
  }, {
    key: "setSharedUserId",
    value: function setSharedUserId(data) {
      this.shareUserId = data;
    }
  }, {
    key: "setTargetChId",
    value: function setTargetChId(data) {
      this.targetChId = data;
    }
  }, {
    key: "setTargetRoomId",
    value: function setTargetRoomId(data) {
      this.targetRoomId = data;
    }
  }, {
    key: "setChapterText",
    value: function setChapterText(data) {
      this.name = data;
    }
  }, {
    key: "setUserName",
    value: function setUserName(data) {
      this.userName = data;
    }
  }]);

  return ChapterModel;
}(), _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "userId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$1 = _applyDecoratedDescriptor(_class2$1.prototype, "pageList", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3$1 = _applyDecoratedDescriptor(_class2$1.prototype, "color", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4$1 = _applyDecoratedDescriptor(_class2$1.prototype, "id", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5$1 = _applyDecoratedDescriptor(_class2$1.prototype, "type", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6$1 = _applyDecoratedDescriptor(_class2$1.prototype, "modDate", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7$1 = _applyDecoratedDescriptor(_class2$1.prototype, "chId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8$1 = _applyDecoratedDescriptor(_class2$1.prototype, "sharedDate", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9$1 = _applyDecoratedDescriptor(_class2$1.prototype, "shareRoomId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10$1 = _applyDecoratedDescriptor(_class2$1.prototype, "shareUserId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11$1 = _applyDecoratedDescriptor(_class2$1.prototype, "targetChId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12$1 = _applyDecoratedDescriptor(_class2$1.prototype, "targetRoomId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13$1 = _applyDecoratedDescriptor(_class2$1.prototype, "name", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14$1 = _applyDecoratedDescriptor(_class2$1.prototype, "userName", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15$1 = _applyDecoratedDescriptor(_class2$1.prototype, "roomId", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2$1.prototype, "setValues", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setValues"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setRoomId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setRoomId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setType", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setType"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setUserId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setUserId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setChildren", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setChildren"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setColor", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setColor"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setChapterId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setChapterId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setModifiedDate", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setModifiedDate"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setNoteChannelId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setNoteChannelId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setSharedDate", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setSharedDate"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setSharedRoomName", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setSharedRoomName"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setSharedUserId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setSharedUserId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setTargetChId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setTargetChId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setTargetRoomId", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setTargetRoomId"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setChapterText", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setChapterText"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "setUserName", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "setUserName"), _class2$1.prototype)), _class2$1)) || _class$1;
/**
 * @param ServerObj to ChapterInfo mapping
 * @returns ChapterModel
 */

var convertChapterObjToModel = function convertChapterObjToModel(obj) {
  if (obj.USER_ID) {
    return {
      userId: obj.USER_ID
    };
  }

  if (obj.children) {
    return {
      pageList: obj.children
    };
  }

  if (obj.color) {
    return {
      color: obj.color
    };
  }

  if (obj.id) {
    return {
      id: obj.id
    };
  }

  if (obj.type) {
    return {
      type: obj.type
    };
  }

  if (obj.modified_date) {
    return {
      modDate: obj.modified_date
    };
  }

  if (obj.note_channel_id) {
    return {
      chId: obj.note_channel_id
    };
  }

  if (obj.shared_date) {
    return {
      sharedDate: obj.shared_date
    };
  }

  if (obj.shared_room_name) {
    return {
      shareRoomId: obj.shared_room_name
    };
  }

  if (obj.shared_user_id) {
    return {
      shareUserId: obj.shared_user_id
    };
  }

  if (obj.target_channel_id) {
    return {
      targetChId: obj.target_channel_id
    };
  }

  if (obj.target_workspace_id) {
    return {
      targetRoomId: obj.target_workspace_id
    };
  }

  if (obj.text) {
    return {
      name: obj.text
    };
  }

  if (obj.user_name) {
    return {
      userName: obj.user_name
    };
  }

  if (obj.ws_id) {
    return {
      roomId: obj.ws_id
    };
  }

  return '';
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
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: '챕터에 속한 페이지도 삭제됩니다.',
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
  NOTE_EDIT_PAGE_ATTACH_FILE_03: '스페이스 공간이 부족하여 파일을 첨부할 수 없습니다.',
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
  NOTE_EDIT_PAGE_ADD_TAG_01: '이미 있는 태그 이름입니다.',
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
  CM_FORWARD: '다른 룸으로 전달',
  TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01: '노트가 삭제되어 불러올 수 없습니다.',
  DRIVE_UPLOAD_BTN_04: '파일명이 70자를 넘는 경우 업로드할 수 없습니다.',
  NOTE_EDIT_PAGE_UPDATE_TIME_01: "\uC624\uC804 {{time}}",
  NOTE_EDIT_PAGE_UPDATE_TIME_02: "\uC624\uD6C4 {{time}}",
  NOTE_EXPORT_TITLE: '제목'
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
  NOTE_PAGE_LIST_DEL_PGE_CHPT_07: 'The pages that belong to the chapter are also deleted.',
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
  CM_FORWARD: 'Forward',
  TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01: 'Failed to get the note because it has deleted.',
  DRIVE_UPLOAD_BTN_04: 'The name of the file cannot exceed the limit of 70 characters. ',
  NOTE_EDIT_PAGE_UPDATE_TIME_01: "{{time}} AM",
  NOTE_EDIT_PAGE_UPDATE_TIME_02: "{{time}} PM",
  NOTE_EXPORT_TITLE: 'Title'
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

/**
 * tagKey의 category(KOR, ENG, NUM, ETC)를 반환한다.
 * @param {string} tagKey
 * @return category of tag
 */

var getKeyCategory = function getKeyCategory(tagKey) {
  var charCode = tagKey.charCodeAt(0);
  if (charCode >= 12593 && charCode < 55203) return 'KOR';
  if (charCode > 64 && charCode < 123) return 'ENG';
  if (charCode >= 48 && charCode <= 57) return 'NUM';
  return 'ETC';
};

var compareFunc = function compareFunc(a, b) {
  if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
  if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
  return 0;
};

var numCompare = function numCompare(a, b) {
  return a.text - b.text;
};

var createRoomTagInfo = function createRoomTagInfo(isNum, data) {
  var sorted = isNum ? data.sort(numCompare) : data.sort(compareFunc);
  var reduced = sorted.reduce(function (obj, tag) {
    if (obj[tag.text]) {
      obj[tag.text].noteList.push(tag.note_id);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[tag.text] = {
        id: tag.tag_id,
        noteList: [tag.note_id]
      };
    }

    return obj;
  }, {});
  return Object.entries(reduced).map(function (item) {
    return {
      tagId: item[1].id,
      text: item[0],
      noteList: item[1].noteList
    };
  });
};
/**
 *
 * @param {*} data
 * @returns
 */


var createTagKeyInfo = function createTagKeyInfo(data) {
  return {
    key: data.KEY,
    tagList: createRoomTagInfo(getKeyCategory(data.KEY) === 'NUM', data.tag_indexdto.tagList)
  };
};

var getSortedServerTagList = function getSortedServerTagList(dto) {
  return dto.sort(function (a, b) {
    if (a.KEY > b.KEY) return 1;
    if (a.KEY < b.KEY) return -1;
    return 0;
  });
};

var getTagCategory = function getTagCategory(keyList) {
  return keyList.reduce(function (result, keyInfo) {
    result[getKeyCategory(keyInfo.key)].push(keyInfo);
    return result;
  }, {
    KOR: [],
    ENG: [],
    NUM: [],
    ETC: []
  });
};
/**
 * @param {*} dto
 * @return { KOR: [{key,tagList:[{tagId,text,noteList}]}], ENG: [], NUM: [], ETC: [] }
 */


var convertServerTagList = function convertServerTagList(dto) {
  var keyList = getSortedServerTagList(dto).map(createTagKeyInfo);
  return getTagCategory(keyList);
};

/* eslint-disable class-methods-use-this */

/* eslint-disable no-unused-vars */

var convertChapterObj = function convertChapterObj(dtoObj) {
  var result = {};
  Object.keys(dtoObj).forEach(function (key) {
    if ({}.hasOwnProperty.call(dtoObj, key)) {
      var obj = {};
      obj[key] = dtoObj[key];
      Object.assign(result, convertChapterObjToModel(_objectSpread2({}, obj)));
    }
  });
  return result;
};

var convertPageObj = function convertPageObj(dtoObj) {
  var result = {};
  Object.keys(dtoObj).forEach(function (key) {
    if ({}.hasOwnProperty.call(dtoObj, key)) {
      var obj = {};
      obj[key] = dtoObj[key];
      Object.assign(result, convertPageObjToModel(_objectSpread2({}, obj)));
    }
  });
  return result;
};

var NoteRepository = /*#__PURE__*/function () {
  function NoteRepository() {
    _classCallCheck(this, NoteRepository);
  }

  _createClass(NoteRepository, [{
    key: "getChapterList",
    value: function () {
      var _getChapterList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return API.get("note-api/noteChapter?action=List&note_channel_id=".concat(NoteStore$1.chId));

              case 3:
                response = _context.sent;
                return _context.abrupt("return", response ? response.data.dto.notbookList.map(function (chapter) {
                  return convertChapterObj(chapter);
                }) : []);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw Error(JSON.stringify(_context.t0));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getChapterList() {
        return _getChapterList.apply(this, arguments);
      }

      return getChapterList;
    }()
  }, {
    key: "getNoteInfoList",
    value: function () {
      var _getNoteInfoList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(noteId) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return API.Get("note-api/noteinfo?action=List&note_id=".concat(noteId, "&note_channel_id=").concat(NoteStore$1.chId));

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", response ? convertPageObj(response.data.dto) : []);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw Error(JSON.stringify(_context2.t0));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function getNoteInfoList(_x) {
        return _getNoteInfoList.apply(this, arguments);
      }

      return getNoteInfoList;
    }()
  }, {
    key: "fetchNoteTagList",
    value: function () {
      var _fetchNoteTagList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(noteId) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return API.Get("note-api/tag?action=List&note_id=".concat(noteId, "&t=").concat(new Date().getTime().toString()));

              case 2:
                response = _context3.sent;
                return _context3.abrupt("return", response ? convertTagObj(response.data.dto.tagList) : []);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function fetchNoteTagList(_x2) {
        return _fetchNoteTagList.apply(this, arguments);
      }

      return fetchNoteTagList;
    }() // 태그 컨텐츠 관련
    // getAllTagList() {
    //   return API.Get(
    //     `note-api/alltag?action=List&note_channel_id=${this.chId}`
    //   )
    // }

  }, {
    key: "getAllTagObj",
    value: function () {
      var _getAllTagObj = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _response$data, _response$data$dto;

        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return API.Get("note-api/tagSort?action=List&note_channel_id=".concat(NoteStore$1.chId, "&t=").concat(new Date().getTime().toString()));

              case 2:
                response = _context4.sent;
                return _context4.abrupt("return", response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && (_response$data$dto = _response$data.dto) !== null && _response$data$dto !== void 0 && _response$data$dto.tag_index_list_dto ? convertServerTagList(response.data.dto.tag_index_list_dto) : {});

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAllTagObj() {
        return _getAllTagObj.apply(this, arguments);
      }

      return getAllTagObj;
    }()
  }, {
    key: "fetchTagNoteList",
    value: function () {
      var _fetchTagNoteList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref) {
        var USER_ID, tagId, chId, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                USER_ID = _ref.USER_ID, tagId = _ref.tagId, chId = _ref.chId;
                _context5.next = 3;
                return API.Get("note-api/tagnote?action=List&tag_id=".concat(tagId, "&USER_ID=").concat(USER_ID, "\n        &note_channel_id=").concat(this.chId));

              case 3:
                response = _context5.sent;
                return _context5.abrupt("return", response ? convertPageObj(response.data.dto.noteList) : []);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchTagNoteList(_x3) {
        return _fetchTagNoteList.apply(this, arguments);
      }

      return fetchTagNoteList;
    }()
  }, {
    key: "getChapterChildren",
    value: function () {
      var _getChapterChildren = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(chapterId) {
        var response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return API.Get("note-api/note?action=List&note_channel_id=".concat(this.chId, "&parent_notebook=").concat(chapterId));

              case 3:
                response = _context6.sent;
                return _context6.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                throw Error(JSON.stringify(_context6.t0));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      function getChapterChildren(_x4) {
        return _getChapterChildren.apply(this, arguments);
      }

      return getChapterChildren;
    }()
  }, {
    key: "getChapterInfoList",
    value: function () {
      var _getChapterInfoList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(chapterId) {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return API.Get("note-api/chaptershare?action=List&id=".concat(chapterId));

              case 2:
                response = _context7.sent;
                return _context7.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getChapterInfoList(_x5) {
        return _getChapterInfoList.apply(this, arguments);
      }

      return getChapterInfoList;
    }()
  }, {
    key: "getChapterColor",
    value: function () {
      var _getChapterColor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(chapterId) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return API.get("note-api/chaptershare?action=List&id=".concat(chapterId));

              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getChapterColor(_x6) {
        return _getChapterColor.apply(this, arguments);
      }

      return getChapterColor;
    }()
  }, {
    key: "updateChapterColor",
    value: function () {
      var _updateChapterColor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref2) {
        var chapterId, targetColor, response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                chapterId = _ref2.chapterId, targetColor = _ref2.targetColor;
                _context9.prev = 1;
                _context9.next = 4;
                return API.put("note-api/notebooks?action=Update", {
                  dto: {
                    id: chapterId,
                    ws_id: this.WS_ID,
                    color: targetColor
                  }
                });

              case 4:
                response = _context9.sent;
                return _context9.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](1);
                throw Error(JSON.stringify(_context9.t0));

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 8]]);
      }));

      function updateChapterColor(_x7) {
        return _updateChapterColor.apply(this, arguments);
      }

      return updateChapterColor;
    }()
  }, {
    key: "getChapterText",
    value: function getChapterText(chapterId) {
      var response = API.get("note-api/chaptershare?action=List&id=".concat(chapterId));
      return response;
    }
  }, {
    key: "createChapter",
    value: function () {
      var _createChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref3) {
        var chapterTitle, chapterColor, response;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                chapterTitle = _ref3.chapterTitle, chapterColor = _ref3.chapterColor;
                _context10.prev = 1;
                _context10.next = 4;
                return API.post("note-api/notebooks", {
                  dto: {
                    id: '',
                    ws_id: NoteStore$1.roomId,
                    note_channel_id: NoteStore$1.chId,
                    text: chapterTitle,
                    children: [],
                    type: 'notebook',
                    USER_ID: NoteStore$1.userId,
                    user_name: NoteStore$1.userName,
                    color: chapterColor
                  }
                });

              case 4:
                response = _context10.sent;
                return _context10.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 8:
                _context10.prev = 8;
                _context10.t0 = _context10["catch"](1);
                throw Error(JSON.stringify(_context10.t0));

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[1, 8]]);
      }));

      function createChapter(_x8) {
        return _createChapter.apply(this, arguments);
      }

      return createChapter;
    }()
  }, {
    key: "deleteChapter",
    value: function () {
      var _deleteChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(chapterId) {
        var response;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return API.delete("note-api/notebook?action=Delete&id=".concat(chapterId, "&note_channel_id=").concat(this.chId, "&USER_ID=").concat(this.USER_ID, "&ws_id=").concat(this.WS_ID));

              case 3:
                response = _context11.sent;
                return _context11.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 7:
                _context11.prev = 7;
                _context11.t0 = _context11["catch"](0);
                throw Error(JSON.stringify(_context11.t0));

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 7]]);
      }));

      function deleteChapter(_x9) {
        return _deleteChapter.apply(this, arguments);
      }

      return deleteChapter;
    }()
  }, {
    key: "renameChapter",
    value: function () {
      var _renameChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_ref4) {
        var chapterId, chapterTitle, color, response;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                chapterId = _ref4.chapterId, chapterTitle = _ref4.chapterTitle, color = _ref4.color;
                _context12.prev = 1;
                _context12.next = 4;
                return API.put("note-api/notebooks?action=Update", {
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

              case 4:
                response = _context12.sent;
                return _context12.abrupt("return", response ? convertChapterObj(response.data.dto) : []);

              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12["catch"](1);
                throw Error(JSON.stringify(_context12.t0));

              case 11:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[1, 8]]);
      }));

      function renameChapter(_x10) {
        return _renameChapter.apply(this, arguments);
      }

      return renameChapter;
    }()
  }, {
    key: "createPage",
    value: function () {
      var _createPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_ref5) {
        var pageName, pageContent, chapterId, today, response;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                pageName = _ref5.pageName, pageContent = _ref5.pageContent, chapterId = _ref5.chapterId;
                _context13.prev = 1;
                today = new Date();
                response = API.Post("note-api/note", {
                  dto: {
                    WS_ID: this.WS_ID,
                    CH_TYPE: 'CHN0003',
                    modified_date: "".concat(today.getFullYear(), ".").concat(today.getMonth() + 1, ".").concat(today.getDate(), " ").concat(today.getHours(), ":").concat(today.getMinutes()),
                    USER_ID: this.USER_ID,
                    note_channel_id: this.chId,
                    user_name: this.USER_NAME,
                    note_title: pageName,
                    note_content: pageContent || '',
                    is_edit: this.USER_ID,
                    parent_notebook: chapterId
                  }
                });
                return _context13.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13["catch"](1);
                throw Error(JSON.stringify(_context13.t0));

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 7]]);
      }));

      function createPage(_x11) {
        return _createPage.apply(this, arguments);
      }

      return createPage;
    }()
  }, {
    key: "deletePage",
    value: function () {
      var _deletePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(pageList) {
        var _this = this;

        var response;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                pageList.forEach(function (page) {
                  page.USER_ID = _this.USER_ID;
                  page.WS_ID = _this.WS_ID;
                  page.note_channel_id = _this.chId;
                  page.user_name = _this.USER_NAME;
                });
                _context14.prev = 1;
                _context14.next = 4;
                return API.Post("note-api/note?action=Delete", {
                  dto: {
                    noteList: pageList
                  }
                });

              case 4:
                response = _context14.sent;
                return _context14.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 8:
                _context14.prev = 8;
                _context14.t0 = _context14["catch"](1);
                throw Error(JSON.stringify(_context14.t0));

              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[1, 8]]);
      }));

      function deletePage(_x12) {
        return _deletePage.apply(this, arguments);
      }

      return deletePage;
    }()
  }, {
    key: "renamePage",
    value: function () {
      var _renamePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_ref6) {
        var pageId, pageTitle, chapterId, response;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                pageId = _ref6.pageId, pageTitle = _ref6.pageTitle, chapterId = _ref6.chapterId;
                _context15.prev = 1;
                _context15.next = 4;
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

              case 4:
                response = _context15.sent;
                return _context15.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 8:
                _context15.prev = 8;
                _context15.t0 = _context15["catch"](1);
                throw Error(JSON.stringify(_context15.t0));

              case 11:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[1, 8]]);
      }));

      function renamePage(_x13) {
        return _renamePage.apply(this, arguments);
      }

      return renamePage;
    }()
  }, {
    key: "movePage",
    value: function () {
      var _movePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_ref7) {
        var pageId, chapterId, response;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                pageId = _ref7.pageId, chapterId = _ref7.chapterId;
                _context16.prev = 1;
                _context16.next = 4;
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

              case 4:
                response = _context16.sent;
                return _context16.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 8:
                _context16.prev = 8;
                _context16.t0 = _context16["catch"](1);
                throw Error(JSON.stringify(_context16.t0));

              case 11:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[1, 8]]);
      }));

      function movePage(_x14) {
        return _movePage.apply(this, arguments);
      }

      return movePage;
    }()
  }, {
    key: "editStart",
    value: function () {
      var _editStart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_ref8) {
        var noteId, chapterId, response;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                noteId = _ref8.noteId, chapterId = _ref8.chapterId;
                _context17.prev = 1;
                _context17.next = 4;
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

              case 4:
                response = _context17.sent;
                return _context17.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 8:
                _context17.prev = 8;
                _context17.t0 = _context17["catch"](1);
                throw Error(JSON.stringify(_context17.t0));

              case 11:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[1, 8]]);
      }));

      function editStart(_x15) {
        return _editStart.apply(this, arguments);
      }

      return editStart;
    }()
  }, {
    key: "editDone",
    value: function () {
      var _editDone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(updateDto) {
        var today, response;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                today = new Date();
                updateDto.dto.WS_ID = this.WS_ID;
                updateDto.dto.note_channel_id = this.chId;
                updateDto.dto.USER_ID = this.USER_ID;
                updateDto.dto.CH_TYPE = this.CH_TYPE;
                updateDto.dto.user_name = this.USER_NAME;
                updateDto.dto.modified_date = "".concat(today.getFullYear(), ".").concat(today.getMonth() + 1, ".").concat(today.getDate(), " ").concat(today.getHours(), ":").concat(today.getMinutes());
                _context18.prev = 7;
                _context18.next = 10;
                return API.post("note-api/note?action=Update", updateDto);

              case 10:
                response = _context18.sent;
                return _context18.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 14:
                _context18.prev = 14;
                _context18.t0 = _context18["catch"](7);
                throw Error(JSON.stringify(_context18.t0));

              case 17:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[7, 14]]);
      }));

      function editDone(_x16) {
        return _editDone.apply(this, arguments);
      }

      return editDone;
    }()
  }, {
    key: "nonEdit",
    value: function () {
      var _nonEdit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(_ref9) {
        var noteId, chapterId, userName, userId, response;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                noteId = _ref9.noteId, chapterId = _ref9.chapterId, userName = _ref9.userName, userId = _ref9.userId;
                _context19.prev = 1;
                _context19.next = 4;
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

              case 4:
                response = _context19.sent;
                return _context19.abrupt("return", response ? convertPageObj(response.data.dto) : '');

              case 8:
                _context19.prev = 8;
                _context19.t0 = _context19["catch"](1);
                throw Error(JSON.stringify(_context19.t0));

              case 11:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[1, 8]]);
      }));

      function nonEdit(_x17) {
        return _nonEdit.apply(this, arguments);
      }

      return nonEdit;
    }()
  }, {
    key: "createTag",
    value: function () {
      var _createTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(targetList) {
        var response;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                _context20.next = 3;
                return API.post("note-api/tag", {
                  dto: {
                    tagList: targetList
                  }
                });

              case 3:
                response = _context20.sent;
                return _context20.abrupt("return", response ? convertTagObj(response.data.dto) : '');

              case 7:
                _context20.prev = 7;
                _context20.t0 = _context20["catch"](0);
                throw Error(JSON.stringify(_context20.t0));

              case 10:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[0, 7]]);
      }));

      function createTag(_x18) {
        return _createTag.apply(this, arguments);
      }

      return createTag;
    }()
  }, {
    key: "deleteTag",
    value: function () {
      var _deleteTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(targetList) {
        var response;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                _context21.next = 3;
                return API.post("note-api/tag?action=Delete", {
                  dto: {
                    tagList: targetList
                  }
                });

              case 3:
                response = _context21.sent;
                return _context21.abrupt("return", response ? convertTagObj(response.data.dto) : '');

              case 7:
                _context21.prev = 7;
                _context21.t0 = _context21["catch"](0);
                throw Error(JSON.stringify(_context21.t0));

              case 10:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[0, 7]]);
      }));

      function deleteTag(_x19) {
        return _deleteTag.apply(this, arguments);
      }

      return deleteTag;
    }()
  }, {
    key: "updateTag",
    value: function () {
      var _updateTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(targetList) {
        var response;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                _context22.next = 3;
                return API.post("note-api/tag?action=Update", {
                  dto: {
                    tagList: targetList
                  }
                });

              case 3:
                response = _context22.sent;
                return _context22.abrupt("return", response ? convertTagObj(response.data.dto) : '');

              case 7:
                _context22.prev = 7;
                _context22.t0 = _context22["catch"](0);
                throw Error(JSON.stringify(_context22.t0));

              case 10:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, null, [[0, 7]]);
      }));

      function updateTag(_x20) {
        return _updateTag.apply(this, arguments);
      }

      return updateTag;
    }()
  }, {
    key: "storageFileDeepCopy",
    value: function () {
      var _storageFileDeepCopy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(fileId) {
        var targetSRC, response;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                targetSRC = "Storage/StorageFile?action=Copy&Type=Deep";
                _context23.prev = 1;
                _context23.next = 4;
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
                response = _context23.sent;
                return _context23.abrupt("return", response);

              case 8:
                _context23.prev = 8;
                _context23.t0 = _context23["catch"](1);
                throw Error(JSON.stringify(_context23.t0));

              case 11:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[1, 8]]);
      }));

      function storageFileDeepCopy(_x21) {
        return _storageFileDeepCopy.apply(this, arguments);
      }

      return storageFileDeepCopy;
    }()
  }, {
    key: "createUploadMeta",
    value: function () {
      var _createUploadMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(dto) {
        var response;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.prev = 0;
                _context24.next = 3;
                return API.post('note-api/noteFile', dto);

              case 3:
                response = _context24.sent;
                return _context24.abrupt("return", response);

              case 7:
                _context24.prev = 7;
                _context24.t0 = _context24["catch"](0);
                throw Error(JSON.stringify(_context24.t0));

              case 10:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[0, 7]]);
      }));

      function createUploadMeta(_x22) {
        return _createUploadMeta.apply(this, arguments);
      }

      return createUploadMeta;
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
      var _uploadFileGW = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(_ref10) {
        var file, fileName, fileExtension, onUploadProgress, cancelSource;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                file = _ref10.file, fileName = _ref10.fileName, fileExtension = _ref10.fileExtension, onUploadProgress = _ref10.onUploadProgress, cancelSource = _ref10.cancelSource;
                _context25.next = 3;
                return API.post("/gateway-api/upload?user_id=".concat(this.USER_ID, "&ws_id=").concat(this.WS_ID, "&ch_id=").concat(this.chId, "&file_name=").concat(fileName, "&file_extension=").concat(fileExtension), file, {
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

              case 3:
                return _context25.abrupt("return", _context25.sent);

              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function uploadFileGW(_x23) {
        return _uploadFileGW.apply(this, arguments);
      }

      return uploadFileGW;
    }()
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(deleteFileId) {
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.prev = 0;
                _context26.next = 3;
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
                return _context26.abrupt("return", _context26.sent);

              case 6:
                _context26.prev = 6;
                _context26.t0 = _context26["catch"](0);
                throw Error(JSON.stringify(_context26.t0));

              case 9:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this, [[0, 6]]);
      }));

      function deleteFile(_x24) {
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
      }

      return Promise.resolve();
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
      var _getSearchList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(searchKey) {
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.prev = 0;
                _context27.next = 3;
                return API.post("note-api/noteSearch?action=List", {
                  dto: {
                    note_channel_id: this.chId,
                    text: searchKey
                  }
                });

              case 3:
                return _context27.abrupt("return", _context27.sent);

              case 6:
                _context27.prev = 6;
                _context27.t0 = _context27["catch"](0);
                throw Error(JSON.stringify(_context27.t0));

              case 9:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this, [[0, 6]]);
      }));

      function getSearchList(_x25) {
        return _getSearchList.apply(this, arguments);
      }

      return getSearchList;
    }()
  }, {
    key: "createFileMeta",
    value: function () {
      var _createFileMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(targetList) {
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return API.post("note-api/noteFileMeta", {
                  dto: {
                    fileList: targetList
                  }
                });

              case 2:
                return _context28.abrupt("return", _context28.sent);

              case 3:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      function createFileMeta(_x26) {
        return _createFileMeta.apply(this, arguments);
      }

      return createFileMeta;
    }()
  }]);

  return NoteRepository;
}();

var NoteRepository$1 = new NoteRepository();

var _class$2, _descriptor$2, _descriptor2$2, _descriptor3$2, _temp$2;
var ChapterStore = (_class$2 = (_temp$2 = /*#__PURE__*/function () {
  function ChapterStore() {
    _classCallCheck(this, ChapterStore);

    _initializerDefineProperty(this, "chapterList", _descriptor$2, this);

    _initializerDefineProperty(this, "newChapterVisible", _descriptor2$2, this);

    _initializerDefineProperty(this, "chapterMap", _descriptor3$2, this);
  }

  _createClass(ChapterStore, [{
    key: "fetchChapterList",
    value: function () {
      var _fetchChapterList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return NoteRepository$1.getChapterList();

              case 2:
                res = _context.sent;
                this.chapterList = res.map(function (chapter) {
                  return new ChapterModel(chapter);
                }); // Server Chapter Map

                this.chapterMap = this.chapterList.reduce(function (acc, chapter, idx) {
                  return acc.set(chapter.id, chapter);
                }, new Map());

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchChapterList() {
        return _fetchChapterList.apply(this, arguments);
      }

      return fetchChapterList;
    }()
  }, {
    key: "getChapterInfoList",
    value: function () {
      var _getChapterInfoList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(chapterId) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return NoteRepository$1.getChapterInfoList(chapterId);

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", new ChapterModel(res));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getChapterInfoList(_x) {
        return _getChapterInfoList.apply(this, arguments);
      }

      return getChapterInfoList;
    }()
  }, {
    key: "createChapter",
    value: function () {
      var _createChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chapterTitle, chapterColor) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!chapterTitle) chapterTitle = i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_01');
                _context3.next = 3;
                return NoteRepository$1.createChapter({
                  chapterTitle: chapterTitle,
                  chapterColor: chapterColor
                });

              case 3:
                res = _context3.sent;

                if (!res) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return this.fetchChapterList();

              case 7:
                return _context3.abrupt("return", new ChapterModel(res));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createChapter(_x2, _x3) {
        return _createChapter.apply(this, arguments);
      }

      return createChapter;
    }()
  }, {
    key: "updateChapterColor",
    value: function () {
      var _updateChapterColor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(chapterId, chapterColor) {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return NoteRepository$1.updateChapterColor({
                  chapterId: chapterId,
                  chapterColor: chapterColor
                });

              case 2:
                res = _context4.sent;

                if (!res) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 6;
                return this.fetchChapterList();

              case 6:
                return _context4.abrupt("return", new ChapterModel(res));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateChapterColor(_x4, _x5) {
        return _updateChapterColor.apply(this, arguments);
      }

      return updateChapterColor;
    }()
  }, {
    key: "deleteChapter",
    value: function () {
      var _deleteChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(chapterId) {
        var res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return NoteRepository$1.deleteChapter(chapterId);

              case 2:
                res = _context5.sent;

                if (!res) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 6;
                return this.fetchChapterList();

              case 6:
                return _context5.abrupt("return", new ChapterModel(res));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteChapter(_x6) {
        return _deleteChapter.apply(this, arguments);
      }

      return deleteChapter;
    }()
  }, {
    key: "renameChapter",
    value: function () {
      var _renameChapter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(chapterId, chapterTitle, color) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return NoteRepository$1.renameChapter({
                  chapterId: chapterId,
                  chapterTitle: chapterTitle,
                  chapterColor: chapterColor
                });

              case 2:
                res = _context6.sent;

                if (!res) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 6;
                return this.fetchChapterList();

              case 6:
                return _context6.abrupt("return", new ChapterModel(res));

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function renameChapter(_x7, _x8, _x9) {
        return _renameChapter.apply(this, arguments);
      }

      return renameChapter;
    }()
  }, {
    key: "setNewChapterVisible",
    value: function setNewChapterVisible(bool) {
      this.newChapterVisible = bool;
    }
  }]);

  return ChapterStore;
}(), _temp$2), (_descriptor$2 = _applyDecoratedDescriptor(_class$2.prototype, "chapterList", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2$2 = _applyDecoratedDescriptor(_class$2.prototype, "newChapterVisible", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$2 = _applyDecoratedDescriptor(_class$2.prototype, "chapterMap", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class$2.prototype, "fetchChapterList", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "fetchChapterList"), _class$2.prototype), _applyDecoratedDescriptor(_class$2.prototype, "getChapterInfoList", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "getChapterInfoList"), _class$2.prototype), _applyDecoratedDescriptor(_class$2.prototype, "createChapter", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "createChapter"), _class$2.prototype), _applyDecoratedDescriptor(_class$2.prototype, "updateChapterColor", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "updateChapterColor"), _class$2.prototype), _applyDecoratedDescriptor(_class$2.prototype, "deleteChapter", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "deleteChapter"), _class$2.prototype), _applyDecoratedDescriptor(_class$2.prototype, "renameChapter", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "renameChapter"), _class$2.prototype), _applyDecoratedDescriptor(_class$2.prototype, "setNewChapterVisible", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "setNewChapterVisible"), _class$2.prototype)), _class$2);
var ChapterStore$1 = new ChapterStore();

var _class$3, _descriptor$3, _descriptor2$3, _descriptor3$3, _temp$3;
var NoteStore = (_class$3 = (_temp$3 = /*#__PURE__*/function () {
  function NoteStore() {
    _classCallCheck(this, NoteStore);

    this.roomId = void 0;
    this.chId = void 0;
    this.userId = void 0;
    this.userName = void 0;
    this.userEmail = void 0;

    _initializerDefineProperty(this, "layoutState", _descriptor$3, this);

    _initializerDefineProperty(this, "targetLayout", _descriptor2$3, this);

    _initializerDefineProperty(this, "isContentExpanded", _descriptor3$3, this);
  }

  _createClass(NoteStore, [{
    key: "init",

    /* init 관련 변수 Repo -> NoteStore */
    value: function init(data) {
      this.setRoomId(data.roomId);
      this.setUserId(data.userId);
      this.setChId(data.chId);
      this.setUserName(data.userName);
      this.setUserEmail(data.userEmail);
    }
  }, {
    key: "setRoomId",
    value: function setRoomId(data) {
      this.roomId = data;
    }
  }, {
    key: "setUserId",
    value: function setUserId(data) {
      this.userId = data;
    }
  }, {
    key: "setChId",
    value: function setChId(data) {
      this.chId = data;
    }
  }, {
    key: "setUserName",
    value: function setUserName(data) {
      this.userName = data;
    }
  }, {
    key: "setUserEmail",
    value: function setUserEmail(data) {
      this.userEmail = data;
    }
  }, {
    key: "setLayoutState",
    value: function setLayoutState(data) {
      this.layoutState = data;
    }
  }, {
    key: "setTargetLayout",
    value: function setTargetLayout(data) {
      this.targetLayout = data;
    }
  }, {
    key: "toggleIsContentExpanded",
    value: function toggleIsContentExpanded() {
      this.isContentExpanded = !this.isContentExpanded;
    }
  }, {
    key: "isCollapsed",
    get: function get() {
      return this.layoutState === 'collapse';
    }
  }, {
    key: "isTargetLayout",
    get: function get() {
      var _this = this;

      return function (layout) {
        return _this.targetLayout === layout;
      };
    }
  }]);

  return NoteStore;
}(), _temp$3), (_descriptor$3 = _applyDecoratedDescriptor(_class$3.prototype, "layoutState", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2$3 = _applyDecoratedDescriptor(_class$3.prototype, "targetLayout", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'lnb';
  }
}), _descriptor3$3 = _applyDecoratedDescriptor(_class$3.prototype, "isContentExpanded", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class$3.prototype, "toggleIsContentExpanded", [action], Object.getOwnPropertyDescriptor(_class$3.prototype, "toggleIsContentExpanded"), _class$3.prototype), _applyDecoratedDescriptor(_class$3.prototype, "isCollapsed", [computed], Object.getOwnPropertyDescriptor(_class$3.prototype, "isCollapsed"), _class$3.prototype), _applyDecoratedDescriptor(_class$3.prototype, "isTargetLayout", [computed], Object.getOwnPropertyDescriptor(_class$3.prototype, "isTargetLayout"), _class$3.prototype)), _class$3);
var NoteStore$1 = new NoteStore();

var _class$4, _class2$2, _descriptor$4, _descriptor2$4, _descriptor3$4, _temp$4;

var TagModel = autobind(_class$4 = (_class2$2 = (_temp$4 = /*#__PURE__*/function () {
  function TagModel(data) {
    _classCallCheck(this, TagModel);

    _initializerDefineProperty(this, "note_id", _descriptor$4, this);

    _initializerDefineProperty(this, "tag_id", _descriptor2$4, this);

    _initializerDefineProperty(this, "text", _descriptor3$4, this);

    this.setValues(data);
  }

  _createClass(TagModel, [{
    key: "setValues",
    value: function setValues(data) {
      set(this, data);
    }
  }, {
    key: "setNoteId",
    value: function setNoteId(data) {
      this.note_id = data;
    }
  }, {
    key: "setTagId",
    value: function setTagId(data) {
      this.tag_id = data;
    }
  }, {
    key: "setTagText",
    value: function setTagText(data) {
      this.text = data;
    }
  }]);

  return TagModel;
}(), _temp$4), (_descriptor$4 = _applyDecoratedDescriptor(_class2$2.prototype, "note_id", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$4 = _applyDecoratedDescriptor(_class2$2.prototype, "tag_id", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3$4 = _applyDecoratedDescriptor(_class2$2.prototype, "text", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2$2.prototype, "setValues", [action], Object.getOwnPropertyDescriptor(_class2$2.prototype, "setValues"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "setNoteId", [action], Object.getOwnPropertyDescriptor(_class2$2.prototype, "setNoteId"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "setTagId", [action], Object.getOwnPropertyDescriptor(_class2$2.prototype, "setTagId"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "setTagText", [action], Object.getOwnPropertyDescriptor(_class2$2.prototype, "setTagText"), _class2$2.prototype)), _class2$2)) || _class$4;

var _class$5, _descriptor$5, _descriptor2$5, _temp$5;
var PageStore = (_class$5 = (_temp$5 = /*#__PURE__*/function () {
  function PageStore() {
    _classCallCheck(this, PageStore);

    _initializerDefineProperty(this, "pageModel", _descriptor$5, this);

    _initializerDefineProperty(this, "tagModel", _descriptor2$5, this);
  }

  _createClass(PageStore, [{
    key: "fetchNoteInfoList",
    value: function () {
      var _fetchNoteInfoList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return NoteRepository$1.fetchNoteInfoList();

              case 2:
                res = _context.sent;
                this.pageModel = new PageModel(res);
                console.log(this.pageModel);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchNoteInfoList() {
        return _fetchNoteInfoList.apply(this, arguments);
      }

      return fetchNoteInfoList;
    }()
  }, {
    key: "fetchNoteTagList",
    value: function () {
      var _fetchNoteTagList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return NoteRepository$1.fetchNoteTagList();

              case 2:
                res = _context2.sent;
                this.tagModel = res.map(function (tag) {
                  return new TagModel(tag);
                });
                console.log(this.tagModel);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchNoteTagList() {
        return _fetchNoteTagList.apply(this, arguments);
      }

      return fetchNoteTagList;
    }()
  }, {
    key: "createPage",
    value: function () {
      var _createPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(pageName, pageContent, chapterId) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return NoteRepository$1.createPage({
                  pageName: pageName,
                  pageContent: pageContent,
                  chapterId: chapterId
                });

              case 2:
                res = _context3.sent;
                return _context3.abrupt("return", new PageModel(res));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPage(_x, _x2, _x3) {
        return _createPage.apply(this, arguments);
      }

      return createPage;
    }()
  }, {
    key: "deletePage",
    value: function () {
      var _deletePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pageList) {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return NoteRepository$1.deletepage(pageList);

              case 2:
                res = _context4.sent;
                return _context4.abrupt("return", new PageModel(res));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deletePage(_x4) {
        return _deletePage.apply(this, arguments);
      }

      return deletePage;
    }()
  }, {
    key: "renamePage",
    value: function () {
      var _renamePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(pageId, pageTitle, chapterId) {
        var res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return NoteRepository$1.renamePage({
                  pageId: pageId,
                  pageTitle: pageTitle,
                  chapterId: chapterId
                });

              case 2:
                res = _context5.sent;
                return _context5.abrupt("return", new PageModel(res));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function renamePage(_x5, _x6, _x7) {
        return _renamePage.apply(this, arguments);
      }

      return renamePage;
    }()
  }, {
    key: "movePage",
    value: function () {
      var _movePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(pageId, chapterId) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return NoteRepository$1.movePage({
                  pageId: pageId,
                  chapterId: chapterId
                });

              case 2:
                res = _context6.sent;
                return _context6.abrupt("return", new PageModel(res));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function movePage(_x8, _x9) {
        return _movePage.apply(this, arguments);
      }

      return movePage;
    }()
  }, {
    key: "editStart",
    value: function () {
      var _editStart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(pageId, chapterId) {
        var res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return NoteRepository$1.editStart({
                  pageId: pageId,
                  chapterId: chapterId
                });

              case 2:
                res = _context7.sent;
                return _context7.abrupt("return", new PageModel(res));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function editStart(_x10, _x11) {
        return _editStart.apply(this, arguments);
      }

      return editStart;
    }()
  }, {
    key: "editDone",
    value: function () {
      var _editDone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(updateModel) {
        var res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return NoteRepository$1.editStart(updateModel);

              case 2:
                res = _context8.sent;
                return _context8.abrupt("return", new PageModel(res));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function editDone(_x12) {
        return _editDone.apply(this, arguments);
      }

      return editDone;
    }()
  }]);

  return PageStore;
}(), _temp$5), (_descriptor$5 = _applyDecoratedDescriptor(_class$5.prototype, "pageModel", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2$5 = _applyDecoratedDescriptor(_class$5.prototype, "tagModel", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class$5.prototype, "fetchNoteInfoList", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "fetchNoteInfoList"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "fetchNoteTagList", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "fetchNoteTagList"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "createPage", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "createPage"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "deletePage", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "deletePage"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "renamePage", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "renamePage"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "movePage", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "movePage"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "editStart", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "editStart"), _class$5.prototype), _applyDecoratedDescriptor(_class$5.prototype, "editDone", [action], Object.getOwnPropertyDescriptor(_class$5.prototype, "editDone"), _class$5.prototype)), _class$5);
var PageStore$1 = new PageStore();

var _class$6, _descriptor$6, _descriptor2$6, _descriptor3$5, _temp$6;
var TagStore = (_class$6 = (_temp$6 = /*#__PURE__*/function () {
  function TagStore() {
    _classCallCheck(this, TagStore);

    _initializerDefineProperty(this, "isLoading", _descriptor$6, this);

    _initializerDefineProperty(this, "tagCategory", _descriptor2$6, this);

    _initializerDefineProperty(this, "getTagCategory", _descriptor3$5, this);
  }

  _createClass(TagStore, [{
    key: "isNoTag",
    get: function get() {
      return Object.keys(this.tagCategory.ENG).length === 0 && Object.keys(this.tagCategory.KOR).length === 0 && Object.keys(this.tagCategory.NUM).length === 0 && Object.keys(this.tagCategory.ETC).length === 0;
    }
    /**
     * fetches all Tags with category from the server
     * RoomTagModel : class { tagId, text, noteList }
     * TagKeyModel : class { key, tags:Array<RoomTagModel> }
     */

  }]);

  return TagStore;
}(), _temp$6), (_descriptor$6 = _applyDecoratedDescriptor(_class$6.prototype, "isLoading", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2$6 = _applyDecoratedDescriptor(_class$6.prototype, "tagCategory", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      KOR: {},
      ENG: {},
      NUM: {},
      ETC: {}
    };
  }
}), _applyDecoratedDescriptor(_class$6.prototype, "isNoTag", [computed], Object.getOwnPropertyDescriptor(_class$6.prototype, "isNoTag"), _class$6.prototype), _descriptor3$5 = _applyDecoratedDescriptor(_class$6.prototype, "getTagCategory", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return flow( /*#__PURE__*/regeneratorRuntime.mark(function getTagCategory() {
      return regeneratorRuntime.wrap(function getTagCategory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.isLoading = true;
              _context.next = 3;
              return NoteRepository$1.getAllTagObj();

            case 3:
              this.tagCategory = _context.sent;
              this.isLoading = false;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, getTagCategory, this);
    }));
  }
})), _class$6);
var TagStore$1 = new TagStore();

var useNoteStore = function useNoteStore() {
  return {
    NoteStore: NoteStore$1,
    ChapterStore: ChapterStore$1,
    PageStore: PageStore$1,
    TagStore: TagStore$1
  };
};

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n  border-bottom: 1px solid #e3e7eb;\n  position: absolute;\n  left: 1.69rem;\n  right: 1.69rem;\n  bottom: 0;\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.75rem;\n  color: #888d96;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.8125rem;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: calc(100% - 1.5rem);\n  height: 3.81rem;\n  margin: 0 0.75rem;\n  padding: 0.75rem 1.69rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  cursor: pointer;\n  &:hover {\n    background-color: #faf8f7;\n  }\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  background-color: ", ";\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 100%;\n  align-items: center;\n  padding-left: 1.19rem;\n  font-size: 0.8125rem;\n  font-weight: bold;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  width: 0.25rem;\n  height: 2.19rem;\n  align-self: center;\n  border-radius: 0.13rem;\n  min-width: 0.25rem;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 0.8rem;\n  height: 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  left: -10px;\n  filter: invert(47%) sepia(6%) saturate(469%) hue-rotate(202deg)\n    brightness(95%) contrast(85%);\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: calc(100% - 1.5rem);\n  height: 3.81rem;\n  margin: 0 0.75rem;\n  padding: 0.75rem 1.69rem;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  &:hover {\n    background-color: #faf8f7;\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  user-select: none;\n  padding: 0rem;\n  display: ", ";\n  line-height: 100% !important;\n  font-size: 0.8125rem;\n  width: auto;\n  height: 2.81rem;\n  font-weight: 500;\n  border-bottom: 0.0625rem solid #eeedeb;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  width: inherit;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 500;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  width: 1rem;\n  margin-right: 0.63rem;\n  filter: invert(47%) sepia(14%) saturate(163%) hue-rotate(349deg)\n    brightness(96%) contrast(87%);\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  min-height: 2.81rem;\n  padding: 0 1rem;\n  font-size: 0.81rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 0.0625rem solid #eeedeb;\n  order: 2;\n  &:hover {\n    background-color: #faf8f7;\n    border-radius: 0.31rem;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 1rem;\n  height: 1rem;\n  filter: invert(46%) sepia(9%) saturate(281%) hue-rotate(349deg)\n    brightness(98%) contrast(84%);\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 1.5rem;\n  height: 1.5rem;\n  visibility: hidden;\n  cursor: pointer;\n  border-radius: 0.38rem;\n  margin-right: 0.15rem;\n  align-items: center;\n  justify-content: center;\n  &:hover {\n    background-color: rgba(235, 230, 223, 1);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  border-top: 1px solid #ddd9d4;\n  padding: 0 1rem;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  flex-direction: column;\n  flex: 1 1;\n  min-width: 23rem;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  border-right: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var LNBContainer = styled.div(_templateObject(), function (_ref) {
  var show = _ref.show;
  return show ? 'flex' : 'none';
}, function (_ref2) {
  var isExpanded = _ref2.isExpanded;
  return isExpanded ? '1px solid #ddd9d4' : '0';
});
var LNBBodyContainer = styled.div(_templateObject2());
var ContextMenuWrapper = styled.div(_templateObject3());
var ContextMenuIcon = styled.img(_templateObject4());
var LNBTagWrapper = styled.div(_templateObject5());
var LNBTagIcon = styled.img(_templateObject6());
var LNBTagText = styled.div(_templateObject7());
/** 여기 아래부터 아직 안 쓰이는 곳 */

var LNBEditModeCover = styled.div(_templateObject8(), function (props) {
  return props.mode === 'true' ? 'none' : 'flex';
});
var LNBNewChapter = styled.div(_templateObject9(), function (props) {
  return props.visible ? 'flex' : 'none';
}); // search 관련

var ChapterSearchResult = styled.div(_templateObject10());
var ChapterSearchShareIcon = styled.img(_templateObject11());
var ChapterSearchResultColor = styled.div(_templateObject12(), function (props) {
  return props.backgroundColor;
});
var ChapterSearchResultTitle = styled.div(_templateObject13());
var PageSearchResult = styled.div(_templateObject14(), function (props) {
  return props.isSelected ? '#F2EFEC' : '';
});
var PageSearchResultPageTitle = styled.div(_templateObject15());
var PageSearchResultChapterTitle = styled.div(_templateObject16());
var SearchResultBotttom = styled.div(_templateObject17());

function _templateObject21() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: center;\n  padding: 0 0.63rem;\n  width: 10.5rem;\n  height: 1.88rem;\n  border-radius: 6px;\n  border: 0rem solid #c6ced6;\n  background-color: #F7F4EF;\n  box-sizing: border-box;\n  &:focus-within {\n    background: #FFFFFF;\n    border: 1px solid #7B7671;\n  }\n  background-color: ", "\n  border: ", "\n"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  margin-left: auto;\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  user-select: none;\n  font-size: 0.82rem;\n  color: #c6ced6;\n  margin-right: 0.43rem;\n  cursor: pointer;\n  border: none;\n  background-color: transparent;\n  padding: 0;\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex: auto;\n  flex-shrink: 0;\n  position: relative;\n  justify-content: flex-end;\n  align-items: center;\n  width: auto;\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17$1() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  outline: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  box-sizing: border-box;\n  padding: 0.1875rem 0.1875rem 0.1875rem 0.75rem;\n  background-image: none;\n  border-radius: 0.125rem;\n  color: inherit;\n  font-size: 0.875rem;\n  font-style: inherit;\n  font-weight: inherit;\n  background-color: #ffffff;\n  border: 0rem solid #d3dbdf !important;\n"]);

  _templateObject17$1 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex: auto;\n  position: relative;\n  align-items: center;\n  width: 80%;\n"]);

  _templateObject16$1 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  padding: 8px;\n  filter: invert(49%) sepia(5%) saturate(429%) hue-rotate(349deg)\n    brightness(93%) contrast(92%);\n  &:hover {\n    background: #ebe6df;\n    border-radius: 0.25rem;\n    cursor: pointer;\n  }\n"]);

  _templateObject15$1 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.6875rem;\n  padding: 0 0.75rem 0 0.38rem;\n"]);

  _templateObject14$1 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.6875rem;\n  padding-right: 0.38rem;\n  border-right: 1px solid #d8d8d8;\n"]);

  _templateObject13$1 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.6875rem;\n  padding: 0 0.38rem 0 0 !important;\n"]);

  _templateObject12$1 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11$1() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 0.5rem;\n"]);

  _templateObject11$1 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$1() {
  var data = _taggedTemplateLiteral(["\n  color: #2e6360;\n  font-size: 0.6875rem;\n  margin-right: ", ";\n"]);

  _templateObject10$1 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  margin-right: 1rem;\n  font-size: 0.81rem;\n  color: #000000 !important;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject9$1 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$1() {
  var data = _taggedTemplateLiteral(["\n  min-width: 4.5rem;\n  height: 1.88rem;\n  color: white;\n  font-size: 0.75rem;\n  align-items: center;\n  border-radius: 0.25rem;\n  border: 0;\n  margin-right: 1rem;\n  background-color: #232d3b;\n  &:hover {\n    background-color: #4c535d;\n    cursor: pointer;\n  }\n  &:focus {\n    outline: none;\n  }\n  &:disabled {\n    background: #ccc;\n    color: #fff;\n    border: 0;\n    cursor: not-allowed;\n  }\n"]);

  _templateObject8$1 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$1() {
  var data = _taggedTemplateLiteral(["\n      display: none;\n    "]);

  _templateObject7$1 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$1() {
  var data = _taggedTemplateLiteral(["\n  width: 0.75rem;\n  height: 0.75rem;\n  cursor: pointer;\n  ", "\n"]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = _taggedTemplateLiteral(["\n  flex: auto;\n  width: 13.3rem;\n  align-self: center;\n  font-size: 0.81rem !important;\n  background-color: inherit;\n  border: 0rem;\n  overflow: hidden;\n  outline: none;\n  &:focus {\n    background: #ffffff;\n    outline: none;\n  }\n  &::placeholder {\n    color: #c9c4be;\n  }\n  background-color: ", ";\n"]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$1() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  padding: 0 0.63rem;\n  width: 14.81rem;\n  height: 1.88rem;\n  border-radius: 6px;\n  border: 1px solid transparent;\n  background-color: #f7f4ef;\n  &:focus-within {\n    background: #ffffff;\n    border: 1px solid #7b7671;\n  }\n  box-sizing: border-box;\n  flex: 1;\n  min-width: 10.6rem;\n  background-color: ", ";\n  border: ", ";\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  width: fit-content;\n  height: 1.88rem;\n  padding-left: 12px;\n  padding-right: 12px;\n  line-height: 100%;\n  margin-right: 0.63rem;\n  color: #ffffff;\n  font-size: 0.75rem;\n  justify-content: center;\n  border: 0px solid #ffffff;\n  border-radius: 0.25rem;\n  background-color: #232d3b;\n  min-width: 4.5rem;\n  &:hover {\n    background-color: #4c535d;\n    cursor: pointer;\n  }\n  &:focus {\n    outline: none;\n  }\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  width: 1rem;\n  height: 1rem;\n  cursor: pointer;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-shrink: 0;\n  width: 100%;\n  height: 3rem;\n  padding: 0 1rem;\n  align-items: center;\n  box-sizing: border-box;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var HeaderContainer = styled.div(_templateObject$1());
var BackButton = styled.img(_templateObject2$1());
var NewChapterButton = styled.button(_templateObject3$1());
var LNBSearchBar = styled.form(_templateObject4$1(), function (props) {
  return props.isSearch ? '#ffffff' : '#f7f4ef';
}, function (props) {
  return props.isSearch ? '1px solid #7b7671' : '1px solid transparent';
});
var LNBSearchInput = styled.input(_templateObject5$1(), function (props) {
  return props.isSearch ? '#ffffff' : 'inherit';
});
var SearchCancelButton = styled.img(_templateObject6$1(), function (props) {
  return !props.visible && css(_templateObject7$1());
});
var EditButton = styled.button(_templateObject8$1());
var PageContentTitle = styled.span(_templateObject9$1());
var AutoSaveMessage = styled.span(_templateObject10$1(), function (props) {
  return props.isSaving ? '0.63rem' : '0.31rem';
});
var EditingIcon = styled.img(_templateObject11$1());
var SmallText = styled.span(_templateObject12$1());
var ModifiedUser = styled.span(_templateObject13$1());
var ModifiedTime = styled.span(_templateObject14$1());
var SearchIcon = styled.img(_templateObject15$1());
/** 여기 아래부터 아직 안 쓰이는 곳 */
// contents가 tag일 때

var EditorHeaderContainer1 = styled.div(_templateObject16$1());
var EditorTitle = styled.input(_templateObject17$1());
var EditorHeaderContainer2 = styled.div(_templateObject18());
var LnbTitleSearchIcon = styled.button(_templateObject19());
var TagSearchForm = styled.form(_templateObject20(), function (props) {
  return props.show ? 'block' : 'none';
});
var TagTitleSearchContainer = styled.div(_templateObject21(), function (props) {
  return props.isSearch ? '#FFFFFF;' : '#F7F4EF;';
}, function (props) {
  return props.isSearch ? '1px solid #7B7671;' : '0rem solid #c6ced6;';
});

function _templateObject19$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 0.63rem;\n  height: calc(100% - 0.26rem);\n  width: fit-content;\n  max-width: calc(100% - 1.88rem) !important;\n  color: #000000;\n  font-size: 0.81rem;\n  cursor: pointer;\n  user-select: none;\n  outline: none !important;\n  background-color: #f7f4ef;\n  border-radius: 25px;\n  border: 0px solid #7b7671;\n  &:hover {\n    color: #000000;\n    background-color: #ebe6df;\n  }\n"]);

  _templateObject19$1 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap;\n"]);

  _templateObject18$1 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 8.75rem;\n  height: 1.88rem;\n  margin-right: 0.38rem;\n  border-radius: 1.563rem;\n  padding: 0 0.75rem;\n  border: 0.0625rem solid #7b7671;\n  background-color: #ffffff;\n  font-size: 0.81rem;\n  color: #000000;\n  outline: none;\n"]);

  _templateObject17$2 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  overflow-x: scroll;\n  max-width: none;\n  white-space: nowrap;\n  box-sizing: border-box;\n"]);

  _templateObject16$2 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15$2() {
  var data = _taggedTemplateLiteral(["\n  width: 1.25rem;\n  height: 1.25rem;\n  user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-drag: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n"]);

  _templateObject15$2 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex !important;\n  align-items: center !important;\n  width: calc(100% - 2.4rem);\n  box-sizing: border-box;\n  overflow: hidden;\n"]);

  _templateObject14$2 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13$2() {
  var data = _taggedTemplateLiteral(["\n  width: 0.8rem;\n  bottom: 1rem;\n"]);

  _templateObject13$2 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 0 0 1.25rem;\n  border: none;\n  margin-left: 0.75rem;\n  margin-right: 0.88rem;\n  align-self: center;\n  background-color: transparent;\n  cursor: pointer;\n"]);

  _templateObject12$2 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11$2() {
  var data = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  width: calc(100% - 0px);\n  height: 2.81rem;\n  border-width: 0px;\n  border-style: solid;\n  vertical-align: top;\n  overflow: hidden;\n  line-height: 66.1177px;\n  display: flex;\n  align-items: center;\n"]);

  _templateObject11$2 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$2() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.688rem;\n  margin-left: auto;\n  color: #7b7671;\n  padding-left: 0.4rem;\n  line-height: normal;\n"]);

  _templateObject10$2 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n"]);

  _templateObject9$2 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$2() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject8$2 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  font-size: 0.8125rem;\n"]);

  _templateObject7$2 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$2() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'Noto Sans KR';\n  font-style: normal;\n  font-weight: 500;\n  font-size: 13px;\n  font-color: #000000;\n"]);

  _templateObject6$2 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n"]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n"]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$2() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 0.69rem;\n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: block;\n  max-width: 15.69rem;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  height: 23px;\n  line-height: normal;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  min-width: fit-content;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 0.63rem;\n  margin-bottom: 0.4375rem;\n  margin-top: 0.4375rem;\n  margin-right: 0.38rem;\n  color: #3b3b3b;\n  font-size: 0.81rem;\n  font-weight: 400;\n  border-radius: 1.563rem;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  height: 1.88rem;\n  z-index: 1;\n  float: left;\n  cursor: pointer;\n  user-select: none;\n  outline: none !important;\n  background-color: #f7f4ef;\n  border: 1px solid transparent;\n  border-radius: 25px;\n  padding: 0 0.63rem;\n  transition-duration: 0s;\n  &:hover {\n    color: #000000;\n    border: 1px solid #7b7671;\n    background-color: #ebe6df;\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
// max-width가 display:flex일 때 먹지 않아서 내부 span tag에 max-width:15.69rem

var TagItem = styled(Tag)(_templateObject$2());
var TagText = styled.span(_templateObject2$2());
var TagCancelButton = styled.img(_templateObject3$2());
var TagContainer = styled.div(_templateObject4$2());
var TagCollapse = styled(Collapse)(_templateObject5$2());
var Panel = Collapse.Panel;
var TagCategory = styled(Panel)(_templateObject6$2());
var TagKeyContainer = styled.div(_templateObject7$2());
var TagKey = styled.div(_templateObject8$2());
var TagKeyList = styled.div(_templateObject9$2());
var TagItemNum = styled.div(_templateObject10$2());
/** 여기 아래부터 아직 안 쓰이는 곳 */

var EditorTagCover = styled.div(_templateObject11$2());
var TagNewBtn = styled.div(_templateObject12$2());
var PanelArrow = styled.img(_templateObject13$2());
var TagList = styled.div(_templateObject14$2());
var TagNewBtnIcon = styled.img(_templateObject15$2());
var TagInputDIV = styled.div(_templateObject16$2());
var TagInput = styled.input(_templateObject17$2());
var TagChipGroup = styled.div(_templateObject18$1());
var SearchTagChip = styled(Tag)(_templateObject19$1());

function _templateObject36() {
  var data = _taggedTemplateLiteral(["\n  width: 5rem;\n  height: 5rem;\n"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(250, 250, 250, 0.7);\n  z-index: 1000;\n"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["\n  padding-right: 1.75rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 2.81rem;\n  align-items: center;\n  padding-left: 1.25rem;\n  background-color: rgba(242, 239, 236, 0.6);\n  border-radius: 0.31rem;\n"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  align-items: center;\n  font-size: 0.81rem;\n  z-index: 20;\n"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  margin-left: auto;\n"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["\n  width: 4.06rem;\n  margin: auto;\n"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["\n  width: 8.44rem;\n  height: 8.44rem;\n"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.75rem;\n  color: #777777;\n  text-align: center;\n  margin-bottom: 1.25rem;\n"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: calc(100% - 7rem);\n  color: #777777;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  width: 7rem;\n  float: left;\n  color: #000000;\n  font-weight: bold;\n"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n  margin-bottom: 0.75rem;\n"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  font-size: 0.94rem;\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);

  _templateObject21$1 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20$1() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 100%;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  font-size: 0.75rem;\n  align-self: center;\n  padding-left: 0.75rem;\n"]);

  _templateObject20$1 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19$2() {
  var data = _taggedTemplateLiteral(["\n  border-radius: 0.75rem;\n  background-color: white;\n  width: 15.31rem;\n  height: 3.19rem;\n  display: flex;\n  padding: 0.69rem 0.75rem;\n  box-sizing: border-box;\n  border: 1px solid #ddd9d4;\n  cursor: pointer;\n  &:hover {\n    text-decoration: underline;\n  }\n"]);

  _templateObject19$2 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18$2() {
  var data = _taggedTemplateLiteral(["\n  width: 8.13rem;\n"]);

  _templateObject18$2 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17$3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.75rem;\n  color: #777777;\n  margin-bottom: 1.25rem;\n"]);

  _templateObject17$3 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16$3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.94rem;\n  color: #000000;\n  margin-bottom: 0.69rem;\n"]);

  _templateObject16$3 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15$3() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-weight: bold;\n"]);

  _templateObject15$3 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14$3() {
  var data = _taggedTemplateLiteral(["\n    width: 1rem;\n    height: 1rem;\n    cursor:pointer;\n    margin-right:0.43rem;\n    filter: ", "\n    &:hover{\n      filter: invert(26%) sepia(5%) saturate(1127%) hue-rotate(352deg) brightness(93%) contrast(93%);\n    }\n"]);

  _templateObject14$3 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13$3() {
  var data = _taggedTemplateLiteral(["\n  width: 1rem;\n  height: 1rem;\n  cursor: pointer;\n"]);

  _templateObject13$3 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12$3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: 0 0.25rem;\n  height: 1.5rem;\n  cursor: pointer;\n  &:hover {\n    background: #ebe6df;\n    border-radius: 0.25rem;\n  }\n  & + div {\n    margin-left: 0.5rem;\n  }\n"]);

  _templateObject12$3 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11$3() {
  var data = _taggedTemplateLiteral(["\n  width: 8.13rem;\n  margin-top: 1.25rem;\n"]);

  _templateObject11$3 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.75rem;\n  font-weight: 300;\n  margin-top: 0.75rem;\n  color: #777777;\n"]);

  _templateObject10$3 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.938rem;\n  font-weight: 400;\n  color: #000000;\n  width: auto;\n  height: 1.38rem;\n  line-height: normal;\n"]);

  _templateObject9$3 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$3() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject8$3 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$3() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: calc(100% - 3rem);\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 1.25rem 0.75rem;\n  border-top: 1px solid #ddd9d4;\n"]);

  _templateObject7$3 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$3() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  align-items: center;\n  margin-right: 0.5rem;\n  cursor: pointer;\n  padding: 8px;\n  &:hover {\n    background: #ebe6df;\n    border-radius: 0.25rem;\n    cursor: pointer;\n  }\n"]);

  _templateObject6$3 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$3() {
  var data = _taggedTemplateLiteral(["\n  height: 3rem;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  padding: 0 0.75rem 0 1rem;\n  box-sizing: border-box;\n"]);

  _templateObject5$3 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$3() {
  var data = _taggedTemplateLiteral(["\n  width: 0.06rem;\n  height: 1.5rem;\n  background: #ddd9d4;\n  margin-right: 1rem;\n"]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  margin-left: 0.63rem;\n"]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$3() {
  var data = _taggedTemplateLiteral(["\n  width: 1rem;\n  height: 1rem;\n  filter: invert(46%) sepia(9%) saturate(281%) hue-rotate(349deg)\n    brightness(98%) contrast(84%);\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 0 0 1.5rem;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 0.38rem;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  &:hover {\n    background-color: #eae6e0;\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var ButtonWrapper = styled.span(_templateObject$3());
var ButtonIcon = styled.img(_templateObject2$3());
var LayoutStateButtonWrapper = styled.div(_templateObject3$3());
var HeaderDivider = styled.div(_templateObject4$3());
/** 여기 아래부터 아직 안 쓰이는 곳 */

var ContentHeaderCover = styled.div(_templateObject5$3());
var PreBtnWrapper = styled.div(_templateObject6$3(), function (props) {
  return props.show ? 'flex' : 'none';
});
var ContentBodyCover = styled.div(_templateObject7$3());
var NoneContainer = styled.div(_templateObject8$3());
var NoneTitle = styled.div(_templateObject9$3());
var NoneText = styled.span(_templateObject10$3());
var NoneImg = styled.img(_templateObject11$3());
var ButtonDiv = styled.div(_templateObject12$3()); // 1rem인 button

var Button = styled.img(_templateObject13$3()); // 돋보기모양 submit btn

var SearchImgInput = styled.input(_templateObject14$3(), function (props) {
  return props.isSearch ? 'invert(26%) sepia(5%) saturate(1127%) hue-rotate(352deg) brightness(93%) contrast(93%);' : 'invert(87%) sepia(11%) saturate(177%) hue-rotate(169deg) brightness(94%) contrast(91%);';
});
var SearchResultNotFoundCover = styled.div(_templateObject15$3());
var SearchKeyword = styled.span(_templateObject16$3());
var NoSearchResultTitle = styled.span(_templateObject17$3());
var NoSearchResultImg = styled.img(_templateObject18$2()); // ShareNoteMessage

var MessageCover = styled.div(_templateObject19$2());
var NoteTitle = styled.span(_templateObject20$1());
var RoomShareCover = styled.div(_templateObject21$1());
var ModalSharedInfoContainer = styled.div(_templateObject22());
var ModalSharedInfoCover = styled.div(_templateObject23());
var ModalSharedInfoTitle = styled.span(_templateObject24());
var ModalSharedInfoContent = styled.span(_templateObject25());
var ButtonGroup = styled.div(_templateObject26());
var SearchLoadingContainer = styled.div(_templateObject27());
var SearchLoadingTxt = styled.div(_templateObject28());
var SearchLoadingImg = styled.img(_templateObject29());
var WaplLoadingImg = styled.img(_templateObject30());
var RightAligned = styled.div(_templateObject31());
var DraggedComponentContainer = styled.div(_templateObject32());
var DraggedComponent = styled.div(_templateObject33());
var DraggedComponentTitle = styled.span(_templateObject34());
var OverlayCover = styled.div(_templateObject35());
var LoaderOverlay = styled.img(_templateObject36());

const img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 63.1 (92452) - https://sketch.com --%3e %3ctitle%3eIcon/system/maximize%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='Icon/system/maximize' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M8.68519013%2c11.283815 L8.71618495%2c11.3148099 C9.10670925%2c11.7053342 9.10670925%2c12.3384991 8.71618495%2c12.7290234 L4.488%2c16.956 L7.15341653%2c16.9561667 C7.70570128%2c16.9561667 8.15341653%2c17.403882 8.15341653%2c17.9561667 L8.15341653%2c18 C8.15341653%2c18.5522847 7.70570128%2c19 7.15341653%2c19 L2%2c19 C1.44771525%2c19 1%2c18.5522847 1%2c18 L1%2c12.8465835 C1%2c12.2942987 1.44771525%2c11.8465835 2%2c11.8465835 L2.04383329%2c11.8465835 C2.59611804%2c11.8465835 3.04383329%2c12.2942987 3.04383329%2c12.8465835 L3.043%2c15.511 L7.27097657%2c11.283815 C7.66150086%2c10.8932908 8.29466584%2c10.8932908 8.68519013%2c11.283815 Z M18%2c1 C18.5522847%2c1 19%2c1.44771525 19%2c2 L19%2c7.15341653 C19%2c7.70570128 18.5522847%2c8.15341653 18%2c8.15341653 L17.9561667%2c8.15341653 C17.403882%2c8.15341653 16.9561667%2c7.70570128 16.9561667%2c7.15341653 L16.957%2c4.489 L12.7290234%2c8.71618495 C12.3384991%2c9.10670925 11.7053342%2c9.10670925 11.3148099%2c8.71618495 L11.283815%2c8.68519013 C10.8932908%2c8.29466584 10.8932908%2c7.66150086 11.283815%2c7.27097657 L15.512%2c3.044 L12.8465835%2c3.04383329 C12.2942987%2c3.04383329 11.8465835%2c2.59611804 11.8465835%2c2.04383329 L11.8465835%2c2 C11.8465835%2c1.44771525 12.2942987%2c1 12.8465835%2c1 L18%2c1 Z' id='Shape' fill='%237B7671'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

const img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 63.1 (92452) - https://sketch.com --%3e %3ctitle%3eIcon/system/minimize%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='Icon/system/minimize' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M8%2c11 C8.55228475%2c11 9%2c11.4477153 9%2c12 L9%2c17.1534165 C9%2c17.7057013 8.55228475%2c18.1534165 8%2c18.1534165 L7.95616671%2c18.1534165 C7.40388196%2c18.1534165 6.95616671%2c17.7057013 6.95616671%2c17.1534165 L6.957%2c14.489 L2.72902343%2c18.716185 C2.33849914%2c19.1067092 1.70533416%2c19.1067092 1.31480987%2c18.716185 L1.28381505%2c18.6851901 C0.893290755%2c18.2946658 0.893290755%2c17.6615009 1.28381505%2c17.2709766 L5.512%2c13.044 L2.84658347%2c13.0438333 C2.29429872%2c13.0438333 1.84658347%2c12.596118 1.84658347%2c12.0438333 L1.84658347%2c12 C1.84658347%2c11.4477153 2.29429872%2c11 2.84658347%2c11 L8%2c11 Z M18.676112%2c1.29289322 L18.7071068%2c1.32388804 C19.0976311%2c1.71441233 19.0976311%2c2.34757731 18.7071068%2c2.7381016 L14.4789218%2c6.965 L17.1443384%2c6.96524488 C17.6966231%2c6.96524488 18.1443384%2c7.41296013 18.1443384%2c7.96524488 L18.1443384%2c8.00907817 C18.1443384%2c8.56136292 17.6966231%2c9.00907817 17.1443384%2c9.00907817 L11.9909218%2c9.00907817 C11.4386371%2c9.00907817 10.9909218%2c8.56136292 10.9909218%2c8.00907817 L10.9909218%2c2.85566164 C10.9909218%2c2.30337689 11.4386371%2c1.85566164 11.9909218%2c1.85566164 L12.0347551%2c1.85566164 C12.5870399%2c1.85566164 13.0347551%2c2.30337689 13.0347551%2c2.85566164 L13.0339218%2c5.52 L17.2618984%2c1.29289322 C17.6524227%2c0.902368927 18.2855877%2c0.902368927 18.676112%2c1.29289322 Z' id='Shape' fill='%237B7671'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

const img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 63.1 (92452) - https://sketch.com --%3e %3ctitle%3eIcon/system/cancel%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='Icon/system/cancel' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M10%2c0 C10.5522847%2c-1.01453063e-16 11%2c0.44771525 11%2c1 L11%2c9 L19%2c9 C19.5522847%2c9 20%2c9.44771525 20%2c10 C20%2c10.5522847 19.5522847%2c11 19%2c11 L11%2c11 L11%2c19 C11%2c19.5522847 10.5522847%2c20 10%2c20 C9.44771525%2c20 9%2c19.5522847 9%2c19 L9%2c10.999 L1%2c11 C0.44771525%2c11 0%2c10.5522847 0%2c10 C0%2c9.44771525 0.44771525%2c9 1%2c9 L9%2c8.999 L9%2c1 C9%2c0.44771525 9.44771525%2c1.01453063e-16 10%2c0 Z' id='Combined-Shape' fill='%237B7671' transform='translate(10.000000%2c 10.000000) rotate(45.000000) translate(-10.000000%2c -10.000000) '%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var LayoutStateButton = function LayoutStateButton() {
  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore;
  /**
   * EventBus.dispatch('onLayoutExpand')
   * EventBus.dispatch('onLayoutCollapse')
   * EventBus.dispatch('onLayoutClose')
   * * */


  var expandCollapseIcon = function () {
    switch (NoteStore.layoutState) {
      case 'expand':
        return img$1;

      default:
        return img;
    }
  }();

  var handleLayoutState = function handleLayoutState() {
    // 같은 룸에서 layoutState만 바뀔 때
    switch (NoteStore.layoutState) {
      case 'expand':
        EventBus.dispatch('onLayoutCollapse'); // NoteStore.setTargetLayout('Content');
        // NoteStore.setIsContentExpanded(false);

        break;

      default:
        EventBus.dispatch('onLayoutExpand'); // if (NoteStore.targetLayout === 'Content')
        //   ChapterStore.getNoteChapterList();
        // else if (!PageStore.currentPageId) ChapterStore.fetchFirstNote();
        // NoteStore.setTargetLayout(null);

        break;
    }
  };

  var handleCloseBtn = function handleCloseBtn() {
    // if (!PageStore.isReadMode()) {
    //   if (EditorStore.isUploading) {
    //     NoteStore.setModalInfo('uploadingFiles');
    //     return;
    //   }
    //   if (EditorStore.tinymce && !EditorStore.tinymce.undoManager.hasUndo()) {
    //     PageStore.handleNoneEdit();
    //     return;
    //   }
    //   NoteStore.setModalInfo('editCancel');
    //   return;
    // }
    EventBus.dispatch('onLayoutClose');
  };

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(LayoutStateButtonWrapper, null, /*#__PURE__*/React.createElement(HeaderDivider, null), /*#__PURE__*/React.createElement(ButtonWrapper, {
      style: {
        marginRight: '0.5rem'
      },
      onClick: handleLayoutState
    }, /*#__PURE__*/React.createElement(ButtonIcon, {
      src: expandCollapseIcon
    })), /*#__PURE__*/React.createElement(ButtonWrapper, {
      onClick: handleCloseBtn
    }, /*#__PURE__*/React.createElement(ButtonIcon, {
      src: img$2
    })));
  });
};

const img$3 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/arrow_back_1%3c/title%3e %3cg id='Icon/common/arrow_back_1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M14.7142%2c5.3081 C14.3322%2c4.9111 13.6982%2c4.8951 13.3002%2c5.2771 L7.3912%2c10.9371 C6.8602%2c11.5331 6.8602%2c12.4661 7.4462%2c13.1201 L13.3002%2c18.7221 C13.4932%2c18.9081 13.7422%2c18.9991 13.9912%2c18.9991 C14.2542%2c18.9991 14.5182%2c18.8961 14.7142%2c18.6911 C15.0962%2c18.2911 15.0822%2c17.6591 14.6832%2c17.2771 L9.1652%2c12.0011 L14.6832%2c6.7221 C15.0822%2c6.3401 15.0962%2c5.7071 14.7142%2c5.3081' id='Fill-1' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var LNBHeader = function LNBHeader() {
  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore,
      ChapterStore = _useNoteStore.ChapterStore;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t; // Back Btn TODO


  var handleChangeState = function handleChangeState() {
    ChapterStore.setNewChapterVisible(!ChapterStore.newChapterVisible);
  };

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(HeaderContainer, null, /*#__PURE__*/React.createElement(BackButton, {
      src: img$3,
      style: {
        display: 'none'
      }
    }), /*#__PURE__*/React.createElement(NewChapterButton, {
      onClick: handleChangeState
    }, t('NOTE_PAGE_LIST_CMPNT_DEF_01')), /*#__PURE__*/React.createElement(LNBSearchBar, null, ChapterStore.isTagSearching ? /*#__PURE__*/React.createElement(TagItem, null, /*#__PURE__*/React.createElement(TagText, null), /*#__PURE__*/React.createElement(TagCancelButton, null)) : /*#__PURE__*/React.createElement(LNBSearchInput, null), /*#__PURE__*/React.createElement(SearchCancelButton, null)), NoteStore.layoutState === 'collapse' && /*#__PURE__*/React.createElement(LayoutStateButton, null));
  });
};

function _templateObject9$4() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.81rem !important;\n  color: #000000 !important;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  align-self: center;\n  border: 0rem !important;\n  background-color: transparent !important;\n  padding-left: 1.69rem;\n  // padding-right: 0.3125rem;\n  &::placeholder {\n    color: #d0d0d0;\n  }\n  &::selection {\n    background: #f2efec;\n    color: #000000;\n  }\n  &:focus {\n    outline: none;\n  }\n"]);

  _templateObject9$4 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-shrink: 0;\n  background-color: #dc4547;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  margin-left: 0.25rem;\n  margin-top: -0.5rem;\n  margin-right: ", ";\n"]);

  _templateObject8$4 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$4() {
  var data = _taggedTemplateLiteral(["\n  width: fit-content;\n  max-width: calc(100% - 3.5rem);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: normal;\n  margin-left: ", ";\n"]);

  _templateObject7$4 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  padding-left: ", ";\n  padding-right: 1.69rem;\n  font-weight: 500;\n  border: none;\n  outline: none;\n  &::placeholder {\n    color: #d0d0d0;\n  }\n  &::selection {\n    background: #f2efec;\n    color: #000000;\n  }\n"]);

  _templateObject6$4 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$4() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  font-weight: 500;\n  align-items: center;\n  margin-right: 0.3rem;\n  min-width: calc(100% - 3.75rem);\n  max-width: calc(100% - 3.75rem);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject5$4 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 1rem;\n  left: 1rem;\n  filter: invert(47%) sepia(14%) saturate(163%) hue-rotate(349deg)\n    brightness(96%) contrast(87%);\n"]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0.19rem;\n  display: flex;\n  width: 0.38rem;\n  height: 2.5rem;\n  align-items: center;\n  align-self: center;\n  border-radius: 10px;\n  margin: 0.31rem 0;\n  background: ", ";\n  min-width: 0.25rem;\n"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteral(["\n  height: 2.81rem;\n  display: flex;\n  margin: 4px 0 4px 0;\n  align-items: center;\n  font-weight: 500;\n  border-bottom: 0.0625rem solid #eeedeb;\n  cursor: pointer;\n  &:hover .contextMenu {\n    visibility: visible;\n  }\n  &:hover {\n    background-color: #faf8f7;\n    border-radius: 0.31rem;\n  }\n  &:active {\n    background-color: #ffffff;\n    border-radius: unset;\n  }\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  user-select: none;\n  display: block;\n  flex-direction: column;\n  font-size: 0.81rem;\n  order: ", ";\n  height: auto;\n  width: auto;\n  &.folded{\n    .page-li {\n      display: none;\n    }\n  }\n}\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var ChapterContainer = styled.ul(_templateObject$4(), function (props) {
  return props.order;
});
var ChapterWrapper = styled.div(_templateObject2$4());
var ChapterColor = styled.span(_templateObject3$4(), function (props) {
  return props.background;
});
var ChapterShareIcon = styled.img(_templateObject4$4());
var ChapterTitle = styled.span(_templateObject5$4());
var ChapterTitleInput = styled.input(_templateObject6$4(), function (props) {
  return props.paddingLeft;
});
/** 여기 아래부터 아직 안 쓰이는 곳 */

var ChapterTextSpan = styled.span(_templateObject7$4(), function (props) {
  return props.marginLeft;
}); // margin-right는 vertical menu 때문에 가려지지 않도록 추가

var NewNoteMark = styled.div(_templateObject8$4(), function (props) {
  return props.isChapter ? '2rem' : '';
});
var ChapterInput = styled.input(_templateObject9$4());

var LNBNewChapterForm = function LNBNewChapterForm() {
  var _useNoteStore = useNoteStore(),
      ChapterStore = _useNoteStore.ChapterStore;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var inputRef = useRef('');

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      newChapterColor = _useState4[0],
      setNewChapterColor = _useState4[1];

  var handleChange = function handleChange(e) {
    var value = e.target.value;

    if (inputRef.current.getAttribute('maxlength') && value.length > inputRef.current.getAttribute('maxlength')) {
      value = (_readOnlyError("value"), value.slice(0, inputRef.current.getAttribute('maxlength')));
    }

    setInputValue(value);
  };

  var handleKeyDown = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(e.keyCode === 13)) {
                _context.next = 13;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return ChapterStore.createChapter(inputValue, newChapterColor);

            case 4:
              result = _context.sent;

              if (result) {
                ChapterStore.setNewChapterVisible(false);
                setInputValue('');
                setNewChapterColor('');
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.error("ChapterCreate :: Error is ".concat(_context.t0));

            case 11:
              _context.next = 14;
              break;

            case 13:
              if (e.keyCode === 27) {
                ChapterStore.setNewChapterVisible(false);
                setInputValue('');
                setNewChapterColor('');
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));

    return function handleKeyDown(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var handleBlur = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return ChapterStore.createChapter(inputValue, newChapterColor);

            case 3:
              result = _context2.sent;
              ChapterStore.setNewChapterVisible(false);
              setInputValue('');
              setNewChapterColor('');
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.error("Chapter Blur Create :: Error is ".concat(_context2.t0));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    return function handleBlur(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  useEffect(function () {
    if (ChapterStore.newChapterVisible) setNewChapterColor(NoteUtil.getChapterRandomColor());
    inputRef.current.focus();
  }, [ChapterStore.newChapterVisible]);
  return useObserver(function () {
    return /*#__PURE__*/React.createElement(LNBNewChapter, {
      visible: ChapterStore.newChapterVisible
    }, /*#__PURE__*/React.createElement(ChapterColor, {
      background: newChapterColor
    }), /*#__PURE__*/React.createElement(ChapterTitle, null, /*#__PURE__*/React.createElement(ChapterInput, {
      ref: inputRef,
      placeholder: t('NOTE_PAGE_LIST_CMPNT_DEF_01'),
      maxLength: "200",
      value: inputValue,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onBlur: handleBlur
    })));
  });
};

var LNBSearchResult = function LNBSearchResult() {

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, " LNBSearchResult "));
  });
};

const img$4 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/view_more%3c/title%3e %3cg id='Icon/common/view_more' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M12.5%2c16.6669 C13.329%2c16.6669 14%2c17.3379 14%2c18.1669 C14%2c18.9949 13.329%2c19.6669 12.5%2c19.6669 C11.671%2c19.6669 11%2c18.9949 11%2c18.1669 C11%2c17.3379 11.671%2c16.6669 12.5%2c16.6669 Z M12.5%2c10.3334 C13.329%2c10.3334 14%2c11.0044 14%2c11.8334 C14%2c12.6624 13.329%2c13.3334 12.5%2c13.3334 C11.671%2c13.3334 11%2c12.6624 11%2c11.8334 C11%2c11.0044 11.671%2c10.3334 12.5%2c10.3334 Z M12.5%2c3.9999 C13.329%2c3.9999 14%2c4.6719 14%2c5.4999 C14%2c6.3289 13.329%2c6.9999 12.5%2c6.9999 C11.671%2c6.9999 11%2c6.3289 11%2c5.4999 C11%2c4.6719 11.671%2c3.9999 12.5%2c3.9999 Z' id='Combined-Shape' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var ContextMenu = function ContextMenu() {

  var SubMenu = Menu.SubMenu,
      Item = Menu.Item;
  var menu = /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(Item, {
    key: "rename"
  }, "\uC774\uB984 \uBCC0\uACBD"));
  return useObserver(function () {
    return /*#__PURE__*/React.createElement(ContextMenuWrapper, {
      className: "contextMenu"
    }, /*#__PURE__*/React.createElement(Dropdown, {
      overlay: menu,
      trigger: ['click'],
      placement: "bottomRight"
    }, /*#__PURE__*/React.createElement(ContextMenuIcon, {
      src: img$4
    })));
  });
};

function _templateObject11$4() {
  var data = _taggedTemplateLiteral(["\n  background-image: url('../Assets/view_more.png');\n  color: #75757f;\n  width: 100%;\n  height: 100%;\n"]);

  _templateObject11$4 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$4() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  height: 2.81rem;\n"]);

  _templateObject10$4 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$5() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  padding-right: 2rem;\n  box-sizing: border-box;\n  border-radius: 0.31rem;\n  align-items: center;\n  &:hover:not(.ellipsisBtn) {\n    background-color: #faf8f7;\n    border-radius: 0.31rem;\n  }\n  &:active:not(.ellipsisBtn) {\n    background-color: #f2efec;\n  }\n"]);

  _templateObject9$5 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$5() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  max-width: calc(100% - 1.875rem);\n"]);

  _templateObject8$5 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$5() {
  var data = _taggedTemplateLiteral(["\n  flex: 0 0 1.875rem;\n  height: 100%;\n  display: flex;\n"]);

  _templateObject7$5 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$5() {
  var data = _taggedTemplateLiteral(["\n          color: #c9c4be;\n        "]);

  _templateObject6$5 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$5() {
  var data = _taggedTemplateLiteral(["\n          cursor: pointer;\n          &:hover {\n            background-color: #faf8f7;\n          }\n          &:active {\n            background-color: #f2efec;\n          }\n        "]);

  _templateObject5$5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$5() {
  var data = _taggedTemplateLiteral(["\n  height: 2.81rem;\n  display: flex;\n  margin-left: 1.875rem;\n  padding-left: 1.25rem;\n  align-items: center;\n  cursor: pointer;\n  border-radius: 0.31rem;\n  ", "\n"]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n  font-weight: 400;\n  border: none;\n  outline: none;\n  &::placeholder {\n    color: #d0d0d0;\n  }\n  &::selection {\n    background: #f2efec;\n    color: #000000;\n  }\n"]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteral(["\n  min-width: calc(100% - 2.1rem);\n  max-width: calc(100% - 2.1rem);\n  margin-right: 0.3rem;\n  cursor: pointer;\n  color: #000000 !important;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 2.81rem;\n  margin-left: 1.875rem;\n  padding-left: 1.25rem;\n  align-items: center;\n  cursor: pointer;\n  &:hover .contextMenu {\n    visibility: visible;\n  }\n  &:hover:not(.contextMenu) {\n    background-color: #faf8f7;\n    border-radius: 0.31rem;\n  }\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var PageWrapper = styled.li(_templateObject$5());
var PageTitle = styled.a(_templateObject2$5());
var PageTitleInput = styled.input(_templateObject3$5());
var NewPageButton = styled.p(_templateObject4$5(), function (props) {
  return props.active ? css(_templateObject5$5()) : css(_templateObject6$5());
});
/** 여기 아래부터 아직 안 쓰이는 곳 */

var PageMargin = styled.span(_templateObject7$5());
var PageTextCover = styled.span(_templateObject8$5());
var PageTextContainer = styled.span(_templateObject9$5());
var NewPage = styled.span(_templateObject10$4(), function (props) {
  return props.show ? 'flex' : 'none';
});
var EllipsisIcon = styled.i(_templateObject11$4());

var PageItem = function PageItem(_ref) {
  var page = _ref.page;

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(PageWrapper, null, /*#__PURE__*/React.createElement(PageTitle, null, page.text), /*#__PURE__*/React.createElement(ContextMenu, null));
  });
};

var PageList = function PageList(_ref) {
  var page = _ref.page;

  var _useCoreStores = useCoreStores(),
      authStore = _useCoreStores.authStore;

  var _useNoteStore = useNoteStore(),
      ChapterStore = _useNoteStore.ChapterStore;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var handleNewBtnClick = function handleNewBtnClick() {
    if (ChapterStore.newChapterVisible) return;
  };

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, page.map(function (item, index) {
      return /*#__PURE__*/React.createElement(PageItem, {
        key: item.id,
        page: item
      });
    }), /*#__PURE__*/React.createElement(NewPageButton, {
      active: !!authStore.hasPermission('notePage', 'C'),
      onClick: authStore.hasPermission('notePage', 'C') ? handleNewBtnClick : null
    }, "+ ", t('NOTE_PAGE_LIST_CMPNT_DEF_04')));
  });
};

const img$5 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/page_shared%3c/title%3e %3cg id='Icon/common/page_shared' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M21.1402%2c12.0905 C22.3292%2c11.7545 23.5772%2c12.4475 23.9142%2c13.6345 C24.0782%2c14.2075 24.0072%2c14.8105 23.7162%2c15.3325 C23.4232%2c15.8575 22.9422%2c16.2365 22.3602%2c16.3995 C22.1572%2c16.4565 21.9522%2c16.4835 21.7512%2c16.4835 C21.2572%2c16.4835 20.7842%2c16.3205 20.3992%2c16.0335 L20.3992%2c16.0335 L17.4962%2c17.6405 C17.5282%2c17.8325 17.5412%2c18.0255 17.5232%2c18.2155 L17.5232%2c18.2155 L20.4182%2c19.9635 C20.6332%2c19.8055 20.8752%2c19.6815 21.1402%2c19.6075 C22.3292%2c19.2705 23.5772%2c19.9635 23.9142%2c21.1515 C24.0782%2c21.7235 24.0072%2c22.3275 23.7162%2c22.8485 C23.4232%2c23.3735 22.9422%2c23.7525 22.3602%2c23.9155 C22.1582%2c23.9725 21.9532%2c23.9995 21.7522%2c23.9995 C20.7702%2c23.9995 19.8652%2c23.3555 19.5862%2c22.3715 C19.4962%2c22.0545 19.4832%2c21.7305 19.5332%2c21.4155 L19.5332%2c21.4155 L16.7242%2c19.7195 C16.4852%2c19.9185 16.2072%2c20.0705 15.8962%2c20.1575 C15.6932%2c20.2135 15.4892%2c20.2415 15.2872%2c20.2415 C14.3072%2c20.2415 13.4032%2c19.5975 13.1222%2c18.6145 L13.1222%2c18.6145 C12.9592%2c18.0405 13.0292%2c17.4365 13.3202%2c16.9155 C13.6132%2c16.3905 14.0942%2c16.0115 14.6742%2c15.8485 C15.3622%2c15.6575 16.0582%2c15.8115 16.5952%2c16.1965 L16.5952%2c16.1965 L19.5342%2c14.5695 C19.4612%2c14.0835 19.5412%2c13.5915 19.7842%2c13.1565 C20.0772%2c12.6315 20.5592%2c12.2525 21.1402%2c12.0905 Z M21.7512%2c21.2225 C21.7002%2c21.2225 21.6492%2c21.2295 21.5982%2c21.2445 C21.4562%2c21.2845 21.3382%2c21.3755 21.2672%2c21.5025 C21.1982%2c21.6265 21.1812%2c21.7695 21.2202%2c21.9055 L21.2202%2c21.9055 C21.3032%2c22.1955 21.6112%2c22.3565 21.9022%2c22.2795 C22.0442%2c22.2395 22.1612%2c22.1475 22.2322%2c22.0195 C22.3012%2c21.8955 22.3182%2c21.7525 22.2792%2c21.6175 C22.2112%2c21.3785 21.9912%2c21.2225 21.7512%2c21.2225 Z M12.2716%2c1.0002 C13.2716%2c1.0002 14.2166%2c1.3822 14.9336%2c2.0742 L14.9336%2c2.0742 L19.8366%2c6.8062 C20.5756%2c7.5192 20.9996%2c8.5162 20.9996%2c9.5412 L20.9996%2c9.5412 L20.9996%2c10.0972 C20.9996%2c10.6492 20.5526%2c11.0972 19.9996%2c11.0972 C19.4466%2c11.0972 18.9996%2c10.6492 18.9996%2c10.0972 L18.9996%2c10.0972 L18.9996%2c9.6782 L15.5276%2c9.6262 C13.7016%2c9.5992 12.2166%2c8.0982 12.2166%2c6.2792 L12.2166%2c6.2792 L12.2166%2c3.0002 L7.7086%2c3.0002 C5.6636%2c3.0002 3.9996%2c4.6512 3.9996%2c6.6812 L3.9996%2c6.6812 L3.9996%2c16.0972 C3.9996%2c18.1262 5.6636%2c19.7772 7.7086%2c19.7772 L7.7086%2c19.7772 L12.2906%2c19.7772 C12.8436%2c19.7772 13.2906%2c20.2242 13.2906%2c20.7772 C13.2906%2c21.3302 12.8436%2c21.7772 12.2906%2c21.7772 L12.2906%2c21.7772 L7.7086%2c21.7772 C4.5616%2c21.7772 1.9996%2c19.2292 1.9996%2c16.0972 L1.9996%2c16.0972 L1.9996%2c6.6812 C1.9996%2c3.5492 4.5616%2c1.0002 7.7086%2c1.0002 L7.7086%2c1.0002 Z M15.8152%2c17.8585 C15.7332%2c17.5705 15.4262%2c17.4005 15.1342%2c17.4855 C14.9932%2c17.5255 14.8762%2c17.6175 14.8042%2c17.7455 C14.7352%2c17.8695 14.7182%2c18.0115 14.7562%2c18.1475 C14.8392%2c18.4365 15.1532%2c18.6045 15.4362%2c18.5205 C15.5802%2c18.4805 15.6972%2c18.3885 15.7682%2c18.2605 C15.8372%2c18.1375 15.8542%2c17.9945 15.8152%2c17.8585 Z M11.2816%2c15.083 C11.8346%2c15.083 12.2816%2c15.53 12.2816%2c16.083 C12.2816%2c16.636 11.8346%2c17.083 11.2816%2c17.083 L11.2816%2c17.083 L7.7176%2c17.083 C7.1646%2c17.083 6.7176%2c16.636 6.7176%2c16.083 C6.7176%2c15.53 7.1646%2c15.083 7.7176%2c15.083 L7.7176%2c15.083 Z M21.7512%2c13.7065 C21.7002%2c13.7065 21.6492%2c13.7125 21.5982%2c13.7275 C21.4562%2c13.7675 21.3382%2c13.8595 21.2672%2c13.9865 C21.1982%2c14.1105 21.1812%2c14.2525 21.2202%2c14.3895 L21.2202%2c14.3895 C21.3032%2c14.6785 21.6112%2c14.8455 21.9012%2c14.7625 C22.0442%2c14.7225 22.1612%2c14.6305 22.2322%2c14.5025 C22.3012%2c14.3785 22.3182%2c14.2365 22.2792%2c14.1005 C22.2112%2c13.8625 21.9912%2c13.7065 21.7512%2c13.7065 Z M15.282%2c11.3281 C15.835%2c11.3281 16.282%2c11.7751 16.282%2c12.3281 C16.282%2c12.8811 15.835%2c13.3281 15.282%2c13.3281 L15.282%2c13.3281 L7.718%2c13.3281 C7.165%2c13.3281 6.718%2c12.8811 6.718%2c12.3281 C6.718%2c11.7751 7.165%2c11.3281 7.718%2c11.3281 L7.718%2c11.3281 Z M10.5606%2c7.5723 C11.1136%2c7.5723 11.5606%2c8.0193 11.5606%2c8.5723 C11.5606%2c9.1253 11.1136%2c9.5723 10.5606%2c9.5723 L10.5606%2c9.5723 L7.7176%2c9.5723 C7.1646%2c9.5723 6.7176%2c9.1253 6.7176%2c8.5723 C6.7176%2c8.0193 7.1646%2c7.5723 7.7176%2c7.5723 L7.7176%2c7.5723 Z M14.2166%2c4.1622 L14.2166%2c6.2792 C14.2166%2c7.0122 14.8186%2c7.6152 15.5576%2c7.6262 L15.5576%2c7.6262 L17.8406%2c7.6602 L14.2166%2c4.1622 Z' id='Combined-Shape' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

const img$6 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/share_1%3c/title%3e %3cg id='Icon/common/share_1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M17.8098%2c17.6693 C17.9668%2c17.6253 18.1248%2c17.6043 18.2808%2c17.6043 C19.0318%2c17.6043 19.7228%2c18.0943 19.9358%2c18.8423 C20.0598%2c19.2743 20.0058%2c19.7293 19.7868%2c20.1223 C19.5628%2c20.5223 19.1958%2c20.8113 18.7498%2c20.9353 C17.8398%2c21.1923 16.8828%2c20.6663 16.6258%2c19.7633 L16.6258%2c19.7623 C16.5018%2c19.3303 16.5558%2c18.8753 16.7758%2c18.4813 C16.9978%2c18.0823 17.3668%2c17.7943 17.8098%2c17.6693 M6.1928%2c13.6333 C5.2758%2c13.8913 4.3238%2c13.3633 4.0668%2c12.4603 L4.0668%2c12.4603 C3.9428%2c12.0273 3.9968%2c11.5733 4.2158%2c11.1803 C4.4388%2c10.7803 4.8068%2c10.4913 5.2508%2c10.3663 C5.4088%2c10.3223 5.5668%2c10.3013 5.7218%2c10.3013 C6.4728%2c10.3013 7.1638%2c10.7913 7.3758%2c11.5403 C7.4998%2c11.9723 7.4468%2c12.4273 7.2268%2c12.8203 C7.0038%2c13.2193 6.6358%2c13.5083 6.1928%2c13.6333 M16.7758%2c3.8763 C16.9978%2c3.4773 17.3668%2c3.1893 17.8108%2c3.0643 C17.9678%2c3.0203 18.1258%2c2.9993 18.2818%2c2.9993 C19.0328%2c2.9993 19.7228%2c3.4883 19.9358%2c4.2373 C20.0598%2c4.6693 20.0058%2c5.1243 19.7868%2c5.5173 C19.5638%2c5.9173 19.1958%2c6.2053 18.7508%2c6.3303 C17.8338%2c6.5873 16.8828%2c6.0613 16.6258%2c5.1573 L16.6258%2c5.1573 C16.5018%2c4.7243 16.5558%2c4.2703 16.7758%2c3.8763 M4.7108%2c8.4403 C3.7498%2c8.7113 2.9548%2c9.3363 2.4698%2c10.2043 C1.9888%2c11.0653 1.8718%2c12.0613 2.1428%2c13.0083 C2.6068%2c14.6333 4.1018%2c15.6983 5.7238%2c15.6983 C6.0568%2c15.6983 6.3958%2c15.6533 6.7328%2c15.5593 C7.3948%2c15.3733 7.9698%2c15.0073 8.4268%2c14.5213 L14.7068%2c18.3123 C14.5248%2c18.9613 14.5128%2c19.6473 14.7028%2c20.3113 C15.1648%2c21.9363 16.6608%2c23.0013 18.2818%2c23.0013 C18.6158%2c23.0013 18.9548%2c22.9553 19.2898%2c22.8613 C20.2508%2c22.5913 21.0468%2c21.9653 21.5328%2c21.0983 C22.0138%2c20.2373 22.1298%2c19.2413 21.8598%2c18.2943 C21.3008%2c16.3353 19.2478%2c15.1903 17.2698%2c15.7433 C16.6908%2c15.9063 16.1818%2c16.2113 15.7548%2c16.6093 L9.3498%2c12.7423 C9.4688%2c12.1673 9.4658%2c11.5713 9.2998%2c10.9913 C9.2958%2c10.9783 9.2888%2c10.9673 9.2858%2c10.9553 L15.7388%2c7.3823 C16.4208%2c8.0183 17.3268%2c8.3953 18.2828%2c8.3953 C18.6168%2c8.3953 18.9558%2c8.3503 19.2908%2c8.2563 C20.2518%2c7.9863 21.0478%2c7.3603 21.5328%2c6.4923 C22.0138%2c5.6313 22.1298%2c4.6363 21.8598%2c3.6893 C21.3008%2c1.7283 19.2368%2c0.5873 17.2708%2c1.1383 C16.3098%2c1.4083 15.5138%2c2.0333 15.0298%2c2.9003 C14.5538%2c3.7523 14.4378%2c4.7353 14.6968%2c5.6723 L8.2078%2c9.2653 C7.2888%2c8.4423 5.9838%2c8.0843 4.7108%2c8.4403' id='Fill-1' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

const img$7 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/arrow_top_1%3c/title%3e %3cg id='Icon/common/arrow_top_1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M18.0002%2c15.99161 C18.2492%2c15.99161 18.4982%2c15.89961 18.6912%2c15.71461 C19.0912%2c15.33261 19.1042%2c14.69961 18.7232%2c14.30061 L13.0632%2c8.39061 C12.4672%2c7.85961 11.5322%2c7.86161 10.8792%2c8.44661 L5.2772%2c14.30061 C4.8962%2c14.69961 4.9092%2c15.33261 5.3092%2c15.71461 C5.7062%2c16.09561 6.3412%2c16.08261 6.7232%2c15.68261 L11.9982%2c10.16561 L17.2772%2c15.68261 C17.4742%2c15.88761 17.7362%2c15.99161 18.0002%2c15.99161' id='Fill-1' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var ChapterItem = function ChapterItem(_ref) {
  var chapter = _ref.chapter,
      flexOrder = _ref.flexOrder,
      isShared = _ref.isShared;

  var ChapterIcon = function ChapterIcon() {
    if (chapter.type === 'shared_page') return /*#__PURE__*/React.createElement(ChapterShareIcon, {
      src: img$5
    });
    if (chapter.type === 'shared') return /*#__PURE__*/React.createElement(ChapterShareIcon, {
      src: img$6
    });
    return /*#__PURE__*/React.createElement(ChapterColor, {
      background: chapter.color
    });
  };

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(ChapterContainer, {
      order: flexOrder
    }, /*#__PURE__*/React.createElement(ChapterWrapper, {
      style: {
        paddingLeft: isShared ? '2.63rem' : '1.69rem'
      }
    }, /*#__PURE__*/React.createElement(ChapterIcon, null), /*#__PURE__*/React.createElement(ChapterTitle, null, chapter.name), /*#__PURE__*/React.createElement(ContextMenu, null), /*#__PURE__*/React.createElement(ButtonWrapper, null, /*#__PURE__*/React.createElement(ButtonIcon, {
      src: img$7
    }))), /*#__PURE__*/React.createElement(PageList, {
      page: chapter.pageList
    }));
  });
};

const img$8 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/add_tag%3c/title%3e %3cg id='Icon/common/add_tag' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M9.9367%2c2.0313 C10.7577%2c2.0313 11.5697%2c2.2483 12.2827%2c2.6573 C12.7607%2c2.9323 12.9267%2c3.5443 12.6517%2c4.0223 C12.3757%2c4.5013 11.7647%2c4.6653 11.2857%2c4.3913 C10.8757%2c4.1563 10.4087%2c4.0313 9.9367%2c4.0313 L9.9367%2c4.0313 L6.7117%2c4.0313 C5.2167%2c4.0313 3.9997%2c5.2493 3.9997%2c6.7463 L3.9997%2c6.7463 L3.9997%2c9.9733 C3.9997%2c10.6883 4.2887%2c11.3873 4.7937%2c11.8923 L4.7937%2c11.8923 L12.0987%2c19.2023 C13.1247%2c20.2283 14.9097%2c20.2273 15.9327%2c19.2023 L15.9327%2c19.2023 L19.1587%2c15.9753 C19.9777%2c15.1553 20.1867%2c13.9043 19.6777%2c12.8633 C19.4357%2c12.3673 19.6407%2c11.7673 20.1367%2c11.5253 C20.6327%2c11.2823 21.2317%2c11.4883 21.4747%2c11.9843 C22.3587%2c13.7933 21.9957%2c15.9643 20.5737%2c17.3883 L20.5737%2c17.3883 L17.3477%2c20.6163 C16.4577%2c21.5063 15.2757%2c21.9983 14.0157%2c21.9983 C12.7567%2c21.9983 11.5737%2c21.5063 10.6837%2c20.6163 L10.6837%2c20.6163 L3.3797%2c13.3063 C2.5027%2c12.4293 1.9997%2c11.2143 1.9997%2c9.9733 L1.9997%2c9.9733 L1.9997%2c6.7463 C1.9997%2c4.1463 4.1137%2c2.0313 6.7117%2c2.0313 L6.7117%2c2.0313 Z M8.0488%2c5.7412 C9.3668%2c5.7412 10.4398%2c6.8132 10.4398%2c8.1332 C10.4398%2c9.4512 9.3668%2c10.5232 8.0488%2c10.5232 C6.7308%2c10.5232 5.6578%2c9.4512 5.6578%2c8.1332 C5.6578%2c6.8132 6.7308%2c5.7412 8.0488%2c5.7412 Z M18.5%2c0.9999 C19.053%2c0.9999 19.5%2c1.4469 19.5%2c1.9999 L19.5%2c1.9999 L19.5%2c4.5009 L22%2c4.5009 C22.553%2c4.5009 23%2c4.9479 23%2c5.5009 C23%2c6.0539 22.553%2c6.5009 22%2c6.5009 L22%2c6.5009 L19.5%2c6.5009 L19.5%2c9.0009 C19.5%2c9.5539 19.053%2c10.0009 18.5%2c10.0009 C17.947%2c10.0009 17.5%2c9.5539 17.5%2c9.0009 L17.5%2c9.0009 L17.5%2c6.5009 L15%2c6.5009 C14.447%2c6.5009 14%2c6.0539 14%2c5.5009 C14%2c4.9479 14.447%2c4.5009 15%2c4.5009 L15%2c4.5009 L17.5%2c4.5009 L17.5%2c1.9999 C17.5%2c1.4469 17.947%2c0.9999 18.5%2c0.9999 Z M8.0488%2c7.4402 C7.6678%2c7.4402 7.3578%2c7.7512 7.3578%2c8.1332 C7.3578%2c8.5132 7.6678%2c8.8242 8.0488%2c8.8242 C8.4298%2c8.8242 8.7398%2c8.5132 8.7398%2c8.1332 C8.7398%2c7.7512 8.4298%2c7.4402 8.0488%2c7.4402 Z' id='Combined-Shape' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var LNBTag = function LNBTag() {

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(LNBTagWrapper, null, /*#__PURE__*/React.createElement(LNBTagIcon, {
      src: img$8
    }), /*#__PURE__*/React.createElement(LNBTagText, null, "\uD0DC\uADF8"));
  });
};

var LNBBody = function LNBBody() {
  var _useNoteStore = useNoteStore(),
      ChapterStore = _useNoteStore.ChapterStore;

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(LNBBodyContainer, null, /*#__PURE__*/React.createElement(LNBNewChapterForm, null), ChapterStore.isSearching || ChapterStore.isTagSearching ? /*#__PURE__*/React.createElement(LNBSearchResult, null) // SearchingContent도 넣어야 함
    :
    /*#__PURE__*/
    React.createElement(DndProvider, {
      backend: HTML5Backend
    }, ChapterStore.chapterList && ChapterStore.chapterList.map(function (item, index) {
      switch (NoteUtil.getChapterType(item.type)) {
        case 0:
        case 1:
          // default, NOTEBOOK
          return /*#__PURE__*/React.createElement(ChapterItem, {
            key: item.id,
            chapter: item,
            flexOrder: 1,
            isShared: false
          });

        case 2:
          // SHARED_PAGE
          if (item.pageList.length > 0) return /*#__PURE__*/React.createElement(ChapterItem, {
            key: item.id,
            chapter: item,
            flexOrder: 3,
            isShared: true
          });
          break;

        case 3:
          return /*#__PURE__*/React.createElement(ChapterItem, {
            key: item.id,
            chapter: item,
            flexOrder: 3,
            isShared: true
          });
      }

      return null;
    }), /*#__PURE__*/React.createElement(LNBTag, null)));
  });
};

var LNB = function LNB() {
  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore;

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(LNBContainer, {
      show: NoteStore.isCollapsed && NoteStore.isTargetLayout('lnb') || !NoteStore.isCollapsed && !NoteStore.isContentExpanded,
      isExpanded: !NoteStore.isCollapsed
    }, /*#__PURE__*/React.createElement(LNBHeader, null), /*#__PURE__*/React.createElement(LNBBody, null));
  });
};

function _templateObject38() {
  var data = _taggedTemplateLiteral(["\n  width: 0.56rem;\n  height: 0.56rem;\n  filter: invert(52%) sepia(1%) saturate(2165%) hue-rotate(202deg)\n    brightness(90%) contrast(109%);\n"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 100%;\n  padding-left: 0.4625rem;\n  color: #000000;\n  cursor: pointer;\n  border-radius: 0.5rem;\n  align-items: top;\n"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36$1() {
  var data = _taggedTemplateLiteral(["\n  background-color: inherit;\n  line-height: 0.9375rem;\n  display: flex;\n  font-size: 0.63rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #888d96;\n  margin-left: auto;\n"]);

  _templateObject36$1 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35$1() {
  var data = _taggedTemplateLiteral(["\n  background-color: inherit;\n  line-height: 0.9375rem;\n  display: inline-block;\n  font-size: 0.63rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #888d96;\n"]);

  _templateObject35$1 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 0.9375rem;\n  height: auto;\n  overflow: inherit;\n  max-width: 9.55rem;\n"]);

  _templateObject34$1 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.69rem;\n  background-color: inherit;\n  margin-right: 0rem;\n  margin-top: 0;\n  color: #45474a;\n  line-height: 0.9375rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  &:hover {\n    text-decoration: underline;\n  }\n"]);

  _templateObject33$1 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject32$1 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31$1() {
  var data = _taggedTemplateLiteral(["\n  height: auto;\n  line-height: 0.9375rem;\n  max-width: 9.55rem;\n  min-width: ", ";\n  overflow: inherit;\n  display: inline-block;\n  height: 40px;\n  cursor: pointer;\n  flex: 1;\n"]);

  _templateObject31$1 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30$1() {
  var data = _taggedTemplateLiteral(["\n  width: 1.5rem;\n  height: 1.5rem;\n"]);

  _templateObject30$1 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29$1() {
  var data = _taggedTemplateLiteral(["\n  width: 1.5rem;\n  height: 1.5rem;\n"]);

  _templateObject29$1 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  cursor: pointer;\n  margin-right: 0.375rem;\n  margin-top: 0;\n  width: 30px;\n  height: 40px;\n  ", ":hover & {\n    display: none;\n  }\n"]);

  _templateObject28$1 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  position: relative !important;\n  display: flex;\n"]);

  _templateObject27$1 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26$1() {
  var data = _taggedTemplateLiteral(["\n  .anticon-exclamation-circle {\n    position: absolute;\n    left: 1.5rem;\n    top: 1.5rem;\n    font-size: 0.875rem;\n    color: #fb3a3a;\n  }\n"]);

  _templateObject26$1 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  cursor: pointer;\n  margin-right: 0.38rem;\n  margin-right: 0.375rem;\n  width: 1.88rem;\n  height: 1.88rem;\n"]);

  _templateObject25$1 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24$1() {
  var data = _taggedTemplateLiteral(["\n  min-width: calc(100% - 1.325rem);\n  display: flex;\n  margin-left: 0px;\n"]);

  _templateObject24$1 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23$1() {
  var data = _taggedTemplateLiteral(["\n          width: 12.5rem;\n          min-width: 12.5rem;\n        "]);

  _templateObject23$1 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22$1() {
  var data = _taggedTemplateLiteral(["\n          width: 13.75rem;\n          min-width: 13.75rem;\n        "]);

  _templateObject22$1 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  position: relative;\n  padding: 0.375rem;\n  border-radius: 0.5rem;\n  ", "\n  box-sizing: border-box;\n  border: 1px solid #dadada;\n  height: 2.63rem;\n  margin-left: 0.5rem;\n  flex-direction: row;\n  flex-wrap: wrap;\n  &:first-child {\n    margin-left: 0rem;\n  }\n  &:focus {\n    outline: 0;\n  }\n"]);

  _templateObject21$2 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20$2() {
  var data = _taggedTemplateLiteral(["\n  width: auto;\n  display: flex;\n  align-items: center;\n  height: 4.19rem;\n  border-bottom: 1px solid #ddd9d4;\n  overflow: hidden;\n  box-sizing: border-box;\n  padding: 0rem 0.5rem;\n"]);

  _templateObject20$2 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19$3() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 0.63rem;\n  color: #a3a3a3;\n  font-size: 0.75rem;\n  display: flex;\n  font-size: 0.75rem;\n"]);

  _templateObject19$3 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18$3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.75rem;\n  margin-right: 0.63rem;\n  color: ", ";\n"]);

  _templateObject18$3 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17$4() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 0.5rem;\n"]);

  _templateObject17$4 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16$4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  height: 2.81rem;\n  padding: 0 1rem;\n  border-top: 1px solid #ddd9d4;\n  align-items: center;\n  color: #999999;\n"]);

  _templateObject16$4 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15$4() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject15$4 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14$4() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        // ContentHeaderCover, ReadModeContainer(Search), FileBodyLayout, EditorTagCover\n        height: calc(100% - 3rem - 2.81rem - 4.19rem - 2.81rem) !important;\n      }\n    "]);

  _templateObject14$4 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13$4() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        // ContentHeaderCover, FileBodyLayout, EditorTagCover\n        height: calc(100% - 3rem - 4.19rem - 2.81rem) !important;\n      }\n    "]);

  _templateObject13$4 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12$4() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        // ContentHeaderCover, ReadModeContainer(Search), EditorTagCover\n        height: calc(100% - 3rem - 2.81rem - 2.81rem) !important;\n      }\n    "]);

  _templateObject12$4 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11$5() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        // ContentHeaderCover, EditorTagCover\n        height: calc(100% - 3rem - 2.81rem) !important;\n      }\n    "]);

  _templateObject11$5 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$5() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        // ContentHeaderCover, ReadModeContainer, FileBodyLayout, EditorTagCover\n        height: calc(100% - 3rem - 2.81rem - 4.19rem - 2.81rem) !important;\n      }\n    "]);

  _templateObject10$5 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$6() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        // ContentHeaderCover, ReadModeContainer, EditorTagCover\n        height: calc(100% - 3rem - 2.81rem - 2.81rem) !important;\n      }\n    "]);

  _templateObject9$6 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$6() {
  var data = _taggedTemplateLiteral(["\n      .tox-tinymce {\n        border-left: 0.1px solid transparent;\n      }\n    "]);

  _templateObject8$6 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$6() {
  var data = _taggedTemplateLiteral(["\n      .tox-editor-header {\n        display: none;\n      }\n    "]);

  _templateObject7$6 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$6() {
  var data = _taggedTemplateLiteral(["\n      .tox-editor-header {\n        display: none;\n      }\n    "]);

  _templateObject6$6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$6() {
  var data = _taggedTemplateLiteral(["\n      .tox-editor-header {\n        display: block;\n      }\n    "]);

  _templateObject5$6 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  .tox-tinymce {\n    border-left: 0px solid black;\n    border-color: #ddd9d4;\n  }\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject4$6 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  flex-direction: row;\n  flex: 2 2 42rem;\n  overflow-x: hidden;\n  width: 100%;\n  height: 100%;\n  border-left: ", ";\n"]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  filter: invert(99%) sepia(41%) saturate(0%) hue-rotate(145deg)\n    brightness(113%) contrast(100%);\n"]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  width: 0.94rem;\n  height: 2.06rem;\n  display: ", ";\n  background-color: #205855;\n  border: 0px solid #9ca7ad;\n  cursor: pointer;\n  border-top-left-radius: 0.31rem;\n  border-bottom-left-radius: 0.31rem;\n  position: fixed;\n  z-index: 18;\n  top: 50%;\n  transform: ", ";\n  &:hover {\n    background-color: #205855;\n  }\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var ContentFoldButton = styled.div(_templateObject$6(), function (props) {
  return props.show ? 'flex' : 'none';
}, function (props) {
  return props.isContentExpanded ? 'rotate(180deg)' : 'translate(-0.9rem, 0rem)';
});
var ContentFoldButtonIcon = styled.img(_templateObject2$6());
var ContentContainer = styled.div(_templateObject3$6(), function (props) {
  return props.show ? 'flex' : 'none';
}, function (props) {
  return props.isBorderLeft ? '1px solid  #ddd9d4' : '0px';
});
var PageContainer = styled.div(_templateObject4$6(), function (props) {
  return !props.isReadMode && !props.isSearch && css(_templateObject5$6());
}, function (props) {
  return !props.isReadMode && props.isSearch && css(_templateObject6$6());
}, function (props) {
  return props.isReadMode && css(_templateObject7$6());
}, function (props) {
  return !props.isReadMode && css(_templateObject8$6());
}, function (props) {
  return !props.isFile && props.isReadMode && css(_templateObject9$6());
}, function (props) {
  return props.isFile && props.isReadMode && css(_templateObject10$5());
}, function (props) {
  return !props.isFile && !props.isReadMode && !props.isSearch && css(_templateObject11$5());
}, function (props) {
  return !props.isFile && !props.isReadMode && props.isSearch && css(_templateObject12$4());
}, function (props) {
  return props.isFile && !props.isReadMode && !props.isSearch && css(_templateObject13$4());
}, function (props) {
  return props.isFile && !props.isReadMode && props.isSearch && css(_templateObject14$4());
});
var PageBodyContainer = styled.div(_templateObject15$4());
var PageSubHeaderContainer = styled.div(_templateObject16$4());
var ReadModeIcon = styled.img(_templateObject17$4());
var ReadModeText = styled.span(_templateObject18$3(), function (props) {
  return props.color;
});
/** 여기 아래부터 아직 안 쓰이는 곳 */
// export const ReadModeText = styled.span`
//   margin-left: 0.5rem;
//   color: #999999;
//   font-size: 0.75rem;
//   display: flex;
//   font-size: 0.75rem;
// `;

var ReadModeSubText = styled.span(_templateObject19$3());
var FileBodyLayout = styled.div(_templateObject20$2());
var FileBody = styled.div(_templateObject21$2(), function (props) {
  return props.closable ? css(_templateObject22$1()) : css(_templateObject23$1());
});
var FileContent = styled.div(_templateObject24$1());
var FileDownloadIcon = styled.div(_templateObject25$1());
var FileErrorIcon = styled.div(_templateObject26$1());
var ProgressWrapper = styled.div(_templateObject27$1());
var FileExtensionIcon = styled.div(_templateObject28$1(), FileDownloadIcon); // filter: invert(40%) sepia(53%) saturate(5337%) hue-rotate(235deg) brightness(93%) contrast(91%);

var FileDownloadBtn = styled.img(_templateObject29$1());
var FileExtensionBtn = styled.img(_templateObject30$1());
var FileData = styled.div(_templateObject31$1(), function (props) {
  return props.mode === 'true' ? '' : '9.5rem';
});
var FileDataName = styled.div(_templateObject32$1());
var FileName = styled.div(_templateObject33$1());
var FileDataTime = styled.div(_templateObject34$1());
var FileTime = styled.div(_templateObject35$1());
var FileProgress = styled.div(_templateObject36$1());
var FileClose = styled.div(_templateObject37());
var FileCloseBtn = styled.img(_templateObject38());

function _templateObject2$7() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: cener;\n  justify-content: center;\n"]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  textarea#noteEditor {\n    flex-grow:1;\n  }\n  .noteFocusedTag {\n    background-color: #DDD7CD;\n    border: 1px solid #7B7671;\n  }\n  .readModeIcon{\n     margin-left: 1.19rem;\n  }\n  .fileSelected{\n    border: 1px solid #EC6222 !important;\n  }\n  .selected{\n    background-color: #F2EFEC;\n  }\n  .selectedMenu {\n    color: #205855;\n  } \n  .ant-collapse {\n    border:0;\n  }\n  .ant-collapse-header {\n    height: 2.81rem !important;\n    display: flex;\n    align-items:center;\n    border-bottom: 1px solid #EEEDEB !important;\n    padding: 0 0.75rem !important;\n    background-color: #FFFFFF;\n    color: #000000;\n    font-size: 0.8125rem;\n  }\n  .ant-collapse-content {\n    border:0 !important;\n  }\n  .ant-collapse-content-box {\n    padding: 10px 2.51rem !important;\n  }\n  .ant-collapse-item {\n    border:0 !important;\n  }\n  .ant-tooltip-inner {\n    width: fit-content;\n  }\n  .mce-tinymce iframe{\n    flex: 1;\n  }\n  .tox-edit-area__iframe html{\n    height:100% !important;\n  }\n  .tox-statusbar__branding{\n    display: none !important;\n  }\n  .tox-statusbar__resize-handle{\n    display: none !important;\n  }\n  .tox-tinymce-aux{\n    z-index: 100 !important;\n  }\n  .borderTopLine{\n    border-top: 0.13rem solid #FB3A3A;\n    &::before {\n      content: '';\n      position: absolute;\n      width: 0; \n      height: 0; \n      border-top: 0.375rem solid transparent;\n      border-bottom: 0.375rem solid transparent;\n      border-left: 0.5rem solid #FB3A3A;\n      transform: translate(-0.43rem, -0.45rem);\n    }\n  }\n  .borderBottomLine{\n    border-bottom: 0.13rem solid #FB3A3A;\n    &::before {\n      content: '';\n      position: absolute;\n      width: 0; \n      height: 0; \n      border-top: 0.375rem solid transparent;\n      border-bottom: 0.375rem solid transparent;\n      border-left: 0.5rem solid #FB3A3A;\n      transform: translate(-0.43rem, 2.38rem);\n    }\n  }\n  .tagBorderTopLine{\n    border-top: 0.13rem solid #FB3A3A;\n    &::before {\n      content: '';\n      position: absolute;\n      width: 0; \n      height: 0; \n      border-top: 0.375rem solid transparent;\n      border-bottom: 0.375rem solid transparent;\n      border-left: 0.5rem solid #FB3A3A;\n      transform: translate(-0.43rem, -1.405rem);\n    }\n  }\n  .custom-dialog-header {\n    height: 2.75rem !important;\n    border-bottom: 1px solid #DDD9D4 !important;\n    font-size: 0.875rem !important;\n    color: #000000 !important;\n  }\n  .custom-link-dialog {\n    height:18rem !important;\n  }\n  .custom-dialog-title {\n    font-weight: bold !important;\n    margin: auto !important;\n  }\n  .custom-dialog-form > .tox-form__group{\n    position:relative;\n  }\n  .custom-dialog-form label{\n    margin-bottom:0.75rem !important;\n    font-weight: bold !important;\n  }\n  .custom-dialog-form input{\n    height:1.88rem !important;\n  }\n  .custom-dialog-form .tox-form__group:nth-child(1) input{\n    margin-bottom:1.25rem !important;\n  }\n  .custom-dialog-footer {\n    height: 4.39rem !important;\n  }\n  .custom-dialog-btns{\n    margin: auto !important;\n  }\n  .custom-dialog-btns button {\n    width:4.5rem !important;\n    height:1.88rem !important;\n    font-size:0.75rem !important;\n    border:0 !important;\n  }\n  .custom-dialog-btns #custom-link-save {\n    background-color: #232D3B !important;\n    color: white !important;\n  }\n  .custom-dialog-btns #custom-link-save:hover {\n    background-color: #4C535D !important;\n  }\n  .custom-dialog-btns #custom-link-save.disabled-btn {\n    background-color: #CCCCCC !important;\n  }\n  .custom-dialog-btns #custom-link-cancel {\n    background-color:#FFFFFF !important;\n    border: 1px solid #D0CCC7 !important;\n    color: #3B3B3B !important;\n  }\n  .custom-dialog-btns #custom-link-cancel:hover {\n    border:1px solid #232D3B !important;\n  }\n  .link-toolbar {\n    flex-direction:column !important;\n    width: 118px !important;\n  }\n  .link-toolbar button {\n    width:100% !important;\n    justify-content : flex-start !important;\n  }\n  .link-toolbar button .link-toolbar-btn {\n    margin-left: 0.5rem;\n  }\n  .note-show-element{\n    display:flex !important;\n  }\n  .note-link-form-error {\n    position: absolute !important;\n    display:none;\n    align-items: center;\n    width: 1.63rem !important;\n    height: 1.63rem !important;\n    right:0.25rem;\n  }\n  .tox-form__group > .note-link-form-error {\n    top: 37px;\n  }\n  .tox-control-wrap > .note-link-form-error {\n    top : 2px;\n  }\n  .note-link-error-tooltip{\n    display:none;\n    align-items: center;\n    justify-content: center;\n    width: fit-content !important;\n    height: 1.5rem !important;\n    padding:0 0.75rem !important;\n    font-size:0.688rem !important; \n    background: #FF5151 !important;\n    border-radius:10px;\n    position:absolute !important;\n    top:-90%;\n    right: 0rem;\n    color: #ffffff !important;;\n  }\n  .tox-form__group > .note-link-error-tooltip {\n    top: -2px;\n  }\n  .tox-control-wrap > .note-link-error-tooltip {\n    top : -36px;\n  }\n  input{\n    border:none;\n  }\n  input:focus{\n    outline:none;\n  }\n  .tox-statusbar{ display :none !important; }\n\n  .tox .tox-dialog.custom-link-dialog {\n    max-width: 24.38rem;\n    border: 0;\n    border-radius: 0.25rem;\n    box-shadow: 0 0 0.375rem 0 rgba(0,0,0,0.35);\n  }\n  \n  .tox .tox-dialog__header.custom-dialog-header {\n    position: relative;\n    padding: 0;\n    height: 2.69rem;\n    justify-content: center;\n  }\n\n  .tox .tox-dialog__title.custom-dialog-title {\n    font-family: 'Noto Sans KR';\n    font-weight: 500;\n    font-size: 0.88rem;\n  }\n\n  .tox .tox-dialog__header.custom-dialog-header .tox-button {\n    position: absolute;\n    right: 0;\n    top: 0;\n    padding: 0;\n    width: 2.69rem;\n    height: 2.69rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  .tox .custom-dialog-header .tox-button.tox-button--naked:hover {\n    background-color: transparent;\n    border-color: transparent;\n  }\n\n  .tox .tox-dialog.custom-link-dialog .tox-dialog__body-content {\n    padding: 1rem;\n  }\n\n  .tox .tox-dialog.custom-link-dialog .tox-label, .tox .tox-dialog.custom-link-dialog .tox-toolbar-label {\n    font-size: 0.81rem;\n    font-weight: 500;\n  }\n\n .tox .tox-dialog.custom-link-dialog .tox-textfield {\n  border-color: #d0ccc7;\n }\n .tox .tox-dialog.custom-link-dialog .tox-textfield:focus {\n   border-color: #7B7671;\n }\n\n .tox .tox-dialog__footer.custom-dialog-footer {\n   padding: 0;\n   border-top: 1px solid #DDD9D4;\n }\n\n .tox .custom-dialog-btns.tox-button {\n   border-color: transparent;\n   width: 4.5rem;\n   height: 1.88rem;\n }\n\n  .export {\n    table { \n      max-width: 770px;\n      width: 100%;\n    }\n    table tr{\n      page-break-inside:avoid; \n      page-break-after: auto;\n    }\n    table {\n      border-collapse: collapse;\n    }\n    table:not([cellpadding]) th,\n    table:not([cellpadding]) td {\n      padding: 0.4rem;\n    }\n    table[border]:not([border=\"0\"]):not([style*=\"border-width\"]) th,\n    table[border]:not([border=\"0\"]):not([style*=\"border-width\"]) td {\n      border-width: 1px;\n    }\n    table[border]:not([border=\"0\"]):not([style*=\"border-style\"]) th,\n    table[border]:not([border=\"0\"]):not([style*=\"border-style\"]) td {\n      border-style: solid;\n    }\n    table[border]:not([border=\"0\"]):not([style*=\"border-color\"]) th,\n    table[border]:not([border=\"0\"]):not([style*=\"border-color\"]) td {\n      border-color: #ccc;\n    }\n    figure {\n      display: table;\n      margin: 1rem auto;\n    }\n    figure figcaption {\n      color: #999;\n      display: block;\n      margin-top: 0.25rem;\n      text-align: center;\n    }\n    hr {\n      border-color: #ccc;\n      border-style: solid;\n      border-width: 1px 0 0 0;\n    }\n    code {\n      background-color: #e8e8e8;\n      border-radius: 3px;\n      padding: 0.1rem 0.2rem;\n    }\n    .mce-content-body:not([dir=rtl]) blockquote {\n      border-left: 2px solid #ccc;\n      margin-left: 1.5rem;\n      padding-left: 1rem;\n    }\n    .mce-content-body[dir=rtl] blockquote {\n      border-right: 2px solid #ccc;\n      margin-right: 1.5rem;\n      padding-right: 1rem;\n    }\n    ol {\n      display: block;\n      list-style-type: decimal;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n      padding-inline-start: 40px;\n    }\n    ul {\n      display: block;\n      list-style-type: disc;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n      padding-inline-start: 40px;\n    }\n    ::marker {\n      unicode-bidi: isolate;\n      font-variant-numeric: tabular-nums;\n      text-transform: none;\n      text-indent: 0px !important;\n      text-align: start !important;\n      text-align-last: start !important;\n    }\n  }\n  .afterClass{\n    page-break-after:always;\n  }\n  .ant-dropdown-menu {\n    min-width: 7rem;\n  }\n  .ant-dropdown-menu-submenu-title {\n    padding: 0.1875rem 0.75rem;\n    font-size: 0.75rem;\n    line-height: 1.25rem;\n    color: #000;\n  }\n  .ant-dropdown-menu-submenu-popup ul{\n    margin: 0;\n  }\n  .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-popup.ant-dropdown-menu {\n    padding: 0;\n    border: 0px solid #e0e0e0;\n  }\n  .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled {\n    background-color: unset;\n  }\n  .ant-dropdown::before{\n    bottom:0 !important;\n  }\n  .forwardModal .ant-modal-content{\n    width:32.5rem !important;\n  }\n  .forwardModal .ant-modal-body {\n    padding: 0rem !important;\n  }\n  .viewInfoModal .ant-modal-body {\n    padding: 1.69rem 3.44rem 0 3.44rem !important;\n  }\n  .viewInfoModal .ant-modal-footer{\n    border-top: 0px solid black !important;\n    padding:1.75rem 0 !important;\n  }\n  #note-content .ant-upload.ant-upload-select{\n    display: none;\n  }\n  .x-todo li {\n    list-style:none;\n  }\n  .x-todo-box {\n    position: relative; \n    left: -24px;\n  }\n  .x-todo-box input{\n    position: absolute;\n  }\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var GlobalStyle = createGlobalStyle(_templateObject$7()); // export const LNB = styled.div`
//   display:${props => props.show ? "flex" : "none"};
//   height: 100%;
//   flex: 1 1 17.06rem;
//   min-width: 17.06rem;
// `;
// export const Content = styled.div`
//   display:${props => props.show ? "flex" : "none"};
//   flex-direction:column;
//   flex: 2 2 42rem;
//   height: 100%;
//   overflow-x: hidden;
//   position: relative;
//   border-left:${props => props.isBorderLeft ? "1px solid  #DDD9D4" : "0px"};
// `;

var CenterContent = styled.div(_templateObject2$7());

const img$9 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/search%3c/title%3e %3cg id='Icon/common/search' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M10.6826%2c1 C16.0216%2c1 20.3646%2c5.375 20.3646%2c10.752 C20.3646%2c13.042 19.5726%2c15.145 18.2556%2c16.81 L18.2556%2c16.81 L22.1736%2c20.76 L22.7096%2c21.301 C23.0986%2c21.693 23.0966%2c22.326 22.7036%2c22.715 C22.5086%2c22.908 22.2546%2c23.005 21.9996%2c23.005 C21.7436%2c23.005 21.4856%2c22.906 21.2896%2c22.709 L21.2896%2c22.709 L17.8786%2c19.271 C17.8786%2c19.27 17.8776%2c19.269 17.8776%2c19.269 L17.8776%2c19.269 L16.8666%2c18.249 C15.1876%2c19.656 13.0326%2c20.504 10.6826%2c20.504 C5.3436%2c20.504 0.9996%2c16.129 0.9996%2c10.752 C0.9996%2c5.375 5.3436%2c1 10.6826%2c1 Z M10.6826%2c3 C6.4466%2c3 2.9996%2c6.478 2.9996%2c10.752 C2.9996%2c15.027 6.4466%2c18.504 10.6826%2c18.504 C14.9176%2c18.504 18.3646%2c15.027 18.3646%2c10.752 C18.3646%2c6.478 14.9176%2c3 10.6826%2c3 Z M10.284%2c4.5271 C10.837%2c4.5271 11.284%2c4.9751 11.284%2c5.5271 C11.284%2c6.0791 10.837%2c6.5271 10.284%2c6.5271 C8.197%2c6.5271 6.499%2c8.2421 6.499%2c10.3511 C6.499%2c10.9031 6.052%2c11.3511 5.499%2c11.3511 C4.946%2c11.3511 4.499%2c10.9031 4.499%2c10.3511 C4.499%2c7.1401 7.094%2c4.5271 10.284%2c4.5271 Z' id='Combined-Shape' fill='black'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var PageHeader = function PageHeader() {
  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore;

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(HeaderContainer, null, /*#__PURE__*/React.createElement(EditButton, null), /*#__PURE__*/React.createElement(PageContentTitle, null, "(\uC81C\uBAA9 \uC5C6\uC74C)"), /*#__PURE__*/React.createElement(ModifiedUser, null, "User"), /*#__PURE__*/React.createElement(ModifiedTime, null, "Time"), /*#__PURE__*/React.createElement(ButtonWrapper, {
      style: {
        marginRight: '0.37rem'
      }
    }, /*#__PURE__*/React.createElement(ButtonIcon, {
      src: img$9
    })), NoteStore.layoutState === 'expand' && /*#__PURE__*/React.createElement(LayoutStateButton, null));
  });
};

const img$a = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='20px' height='20px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eIcon/common/lock%3c/title%3e %3cg id='Icon/common/lock' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M12.49%2c0.9997 C16.251%2c0.9997 19.311%2c4.2457 19.311%2c8.2357 L19.311%2c8.2357 L19.311%2c10.3417 C20.87%2c10.8827 22%2c12.3537 22%2c14.0977 L22%2c14.0977 L22%2c19.0097 C22%2c21.2097 20.213%2c22.9997 18.016%2c22.9997 L18.016%2c22.9997 L5.984%2c22.9997 C3.787%2c22.9997 2%2c21.2097 2%2c19.0097 L2%2c19.0097 L2%2c14.0977 C2%2c12.3507 3.134%2c10.8787 4.697%2c10.3397 L4.697%2c10.3397 L4.697%2c8.2357 C4.697%2c4.2457 7.757%2c0.9997 11.519%2c0.9997 L11.519%2c0.9997 Z M18.016%2c12.1067 L5.984%2c12.1067 C4.89%2c12.1067 4%2c12.9997 4%2c14.0977 L4%2c14.0977 L4%2c19.0097 C4%2c20.1067 4.89%2c20.9997 5.984%2c20.9997 L5.984%2c20.9997 L18.016%2c20.9997 C19.11%2c20.9997 20%2c20.1067 20%2c19.0097 L20%2c19.0097 L20%2c14.0977 C20%2c12.9997 19.11%2c12.1067 18.016%2c12.1067 L18.016%2c12.1067 Z M12%2c12.96 C12.969%2c12.96 13.758%2c13.758 13.758%2c14.74 C13.758%2c15.345 13.457%2c15.879 13%2c16.201 L13%2c16.201 L13%2c18.731 C13%2c19.284 12.552%2c19.731 12%2c19.731 C11.448%2c19.731 11%2c19.284 11%2c18.731 L11%2c18.731 L11%2c16.201 C10.543%2c15.879 10.242%2c15.345 10.242%2c14.74 C10.242%2c13.758 11.031%2c12.96 12%2c12.96 Z M12.49%2c2.9997 L11.519%2c2.9997 C8.86%2c2.9997 6.697%2c5.3487 6.697%2c8.2357 L6.697%2c8.2357 L6.697%2c10.1067 L17.311%2c10.1067 L17.311%2c8.2357 C17.311%2c5.3487 15.148%2c2.9997 12.49%2c2.9997 L12.49%2c2.9997 Z' id='Combined-Shape' fill='%23999999'%3e%3c/path%3e %3c/g%3e%3c/svg%3e";

var PageSubHeader = function PageSubHeader() {

  var _useCoreStores = useCoreStores(),
      authStore = _useCoreStores.authStore;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(PageSubHeaderContainer, null, /*#__PURE__*/React.createElement(ReadModeIcon, {
      src: img$a
    }), authStore.hasPermission('notePage', 'U') ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReadModeText, {
      color: "#999999"
    }, t('NOTE_PAGE_LIST_ADD_NEW_PGE_02')), /*#__PURE__*/React.createElement(ReadModeText, {
      color: "#a3a3a3"
    }, t('NOTE_PAGE_LIST_ADD_NEW_PGE_03'))) : /*#__PURE__*/React.createElement(ReadModeText, null, t('NOTE_GUEST_01')));
  });
};

var Editor = function Editor() {

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, " Editor "));
  });
};

var PageFileList = function PageFileList() {

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, " PageFileList "));
  });
};

var PageTagList = function PageTagList() {

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, " PageTagList "));
  });
};

var PageBody = function PageBody() {

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(PageBodyContainer, null, /*#__PURE__*/React.createElement(PageSubHeader, null), /*#__PURE__*/React.createElement(Editor, null), /*#__PURE__*/React.createElement(PageFileList, null), /*#__PURE__*/React.createElement(PageTagList, null));
  });
};

var PageContent = function PageContent() {
  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore;

  var handleFoldBtnClick = function handleFoldBtnClick() {
    NoteStore.toggleIsContentExpanded();
  };

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(PageContainer, null, /*#__PURE__*/React.createElement(ContentFoldButton, {
      show: !NoteStore.isCollapsed,
      onClick: handleFoldBtnClick,
      isContentExpanded: NoteStore.isContentExpanded
    }, /*#__PURE__*/React.createElement(ContentFoldButtonIcon, {
      src: img$3
    })), /*#__PURE__*/React.createElement(PageHeader, null), /*#__PURE__*/React.createElement(PageBody, null));
  });
};

var Content = function Content() {
  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore;

  var RenderContent = function RenderContent() {
    // 임시로 PageContent 띄우기. 이름도 다시 생각해보기!
    return /*#__PURE__*/React.createElement(PageContent, null);
  };

  return useObserver(function () {
    return /*#__PURE__*/React.createElement(ContentContainer, {
      show: !NoteStore.isCollapsed || NoteStore.isTargetLayout('content')
    }, /*#__PURE__*/React.createElement(RenderContent, null));
  });
};

var NoteApp = function NoteApp(_ref) {
  var layoutState = _ref.layoutState,
      roomId = _ref.roomId,
      channelId = _ref.channelId,
      language = _ref.language;

  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore,
      ChapterStore = _useNoteStore.ChapterStore;

  var _useCoreStores = useCoreStores(),
      userStore = _useCoreStores.userStore,
      spaceStore = _useCoreStores.spaceStore,
      authStore = _useCoreStores.authStore;

  var _userStore$myProfile = userStore.myProfile,
      userId = _userStore$myProfile.id,
      userName = _userStore$myProfile.name,
      userEmail = _userStore$myProfile.email;
  useEffect(function () {
    NoteStore.init({
      roomId: roomId,
      chId: channelId,
      userId: userId,
      userName: userName,
      userEmail: userEmail
    });
    ChapterStore.fetchChapterList();
  }, [roomId, channelId]);
  useEffect(function () {
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);
  return useObserver(function () {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LNB, null), /*#__PURE__*/React.createElement(Content, null));
  });
};

var NoteApp$1 = function NoteApp$1(_ref) {
  var layoutState = _ref.layoutState,
      roomId = _ref.roomId,
      channelId = _ref.channelId,
      language = _ref.language;
  return /*#__PURE__*/React.createElement(I18nextProvider, {
    i18n: i18n
  }, /*#__PURE__*/React.createElement(NoteApp, {
    layoutState: layoutState,
    roomId: roomId,
    channelId: channelId,
    language: language
  }));
};

var REM_UNIT = 16;

var NoteActiveIcon = function NoteActiveIcon(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1.75 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 1.75 : _ref$height,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#55C6FF' : _ref$color;
  var defaultWidth = 24;
  var defaultHeight = 24;
  return /*#__PURE__*/React.createElement("svg", {
    width: "".concat(width, "rem"),
    height: "".concat(height, "rem"),
    viewBox: "0 0 ".concat(width * REM_UNIT, " ").concat(height * REM_UNIT),
    version: "1.1"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Icon/apps/note_active",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    transform: "scale(".concat(width * REM_UNIT / defaultWidth, ", ").concat(height * REM_UNIT / defaultHeight, ")"),
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15,1 C17.761,1 20,3.238 20,6 L20,6 L20,9.594 C20,10.389 19.684,11.151 19.122,11.714 L19.122,11.714 L14.166,16.675 C13.992,16.848 13.869,17.065 13.808,17.303 L13.808,17.303 L13.044,20.301 C13.014,20.415 13,20.532 13,20.65 C13,20.758 13.014,20.866 13.041,20.971 C13.095,21.188 13.203,21.392 13.354,21.558 C13.484,21.701 13.673,21.77 13.813,21.902 C13.829,21.918 13.844,21.933 13.858,21.949 C14.088,22.206 14.018,22.565 13.723,22.729 C13.613,22.789 13.497,22.839 13.378,22.878 C13.142,22.958 12.892,23 12.643,23 L12.643,23 L6,23 C3.239,23 1,20.762 1,18 L1,18 L1,6 C1,3.238 3.239,1 6,1 L6,1 Z M20.0947,13.2477 C20.4327,12.9087 20.9817,12.9077 21.3217,13.2447 L21.3217,13.2447 L21.3247,13.2477 L22.7427,14.6797 C23.0837,15.0167 23.0857,15.5667 22.7497,15.9077 C22.7467,15.9087 22.7447,15.9107 22.7427,15.9137 L22.7427,15.9137 L18.4117,20.2587 C18.3007,20.3687 18.1617,20.4487 18.0107,20.4887 L18.0107,20.4887 L16.0877,20.9797 C16.0167,20.9967 15.9447,21.0067 15.8717,21.0077077 C15.3917,21.0097 15.0017,20.6227 14.9997,20.1437 C14.9997,20.0687 15.0097,19.9926978 15.0287,19.9207 L15.0287,19.9207 L15.5197,17.9937 C15.5587,17.8447 15.6377,17.7087 15.7457,17.5997 L15.7457,17.5997 Z M11.5,15.469 L7,15.469 C6.448,15.469 6,15.916 6,16.469 C6,17.021 6.448,17.469 7,17.469 L7,17.469 L11.5,17.469 C12.052,17.469 12.5,17.021 12.5,16.469 C12.5,15.916 12.052,15.469 11.5,15.469 L11.5,15.469 Z M14,11 L7,11 C6.448,11 6,11.447 6,12 C6,12.553 6.448,13 7,13 L7,13 L14,13 C14.552,13 15,12.553 15,12 C15,11.447 14.552,11 14,11 L14,11 Z M14,6.531 L7,6.531 C6.448,6.531 6,6.979 6,7.531 C6,8.084 6.448,8.531 7,8.531 L7,8.531 L14,8.531 C14.552,8.531 15,8.084 15,7.531 C15,6.979 14.552,6.531 14,6.531 L14,6.531 Z",
    id: "Combined-Shape",
    fill: color
  })));
};

var ShareNoteMessageContent = function ShareNoteMessageContent(_ref2) {
  var roomId = _ref2.roomId,
      noteId = _ref2.noteId,
      noteTitle = _ref2.noteTitle;

  /*
    test id
    1) 유효하지 않은 노트 id는 "123"
    noteId = "123"
    2) 삭제된 노트 id test
    noteId = "f73d1c57-2f40-4aa4-960e-212b70a894f3"
    3) 유효한 노트 id
    noteId = "010ddb34-ea14-4ff4-ae1d-61cfb2349625"
  */
  // 테스트용
  // roomId = "d2456ccd-c4f3-4b74-8645-b31c04ee82ac";
  // if (!noteId) noteId = "0e27f084-1088-4110-bbf1-73817f1662ef"
  var history = useHistory();

  var _useNoteStore = useNoteStore(),
      NoteStore = _useNoteStore.NoteStore;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      informDeleted = _useState2[0],
      setInformDeleted = _useState2[1];

  if (!noteId) return null; // const [imgSrc, setImgSrc] = useState(noteImg);
  // hover 효과 사라짐(혹시 몰라 남겨둠)
  // const handleMouseOver = () => {
  //   setImgSrc(hoverImg);
  // }
  // const handleMouseOut = () => {
  //   setImgSrc(noteImg);
  // }

  var handleClickMessage = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var isNoteApp, targetChId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 해당 페이지 보고 있을 때(readMode, 수정 모드 모두) handleClickOutside editor 로직 타지 않도록
              e.stopPropagation(); // 혹시나

              if (history) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              isNoteApp = history.location.search === '?sub=note'; // 0. 해당 페이지 보고 있었거나 다른 페이지 수정중인 경우는 Modal 먼저 띄워야
              // LNB를 보고 있어도 PageStore.isReadMode() === true인경우 있어
              // if (isNoteApp && NoteStore.targetLayout !== 'LNB') {
              //   if (PageStore.currentPageId === noteId) return;
              //   // 다른 페이지 수정중인 경우 Modal 띄우기
              //   if (!PageStore.isReadMode()) {
              //     const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
              //     if (!isUndoActive && !PageStore.otherEdit) {
              //       PageStore.handleNoneEdit();
              //       return;
              //     }
              //     NoteStore.setModalInfo('editCancel');
              //     return;
              //   }
              // }
              // 1. 해당 noteInfo를 가져온다(삭제되었는지 확인)

              targetChId = RoomStore.getChannelIds({
                roomId: roomId
              })[NoteRepository$1.CH_TYPE]; // const {
              //   data: { dto: noteInfo },
              // } = await API.Get(
              //   `note-api/noteinfo?action=List&note_id=${noteId}&note_channel_id=${targetChId}`,
              // );
              // if (!noteInfo || !isFilled(noteInfo.note_id)) {
              //   // 아직 모달을 띄울 수 없음
              //   setInformDeleted(true);
              //   return;
              // }
              // 2. 노트앱 열기
              // 노트앱이 열려있지 않았다면 NoteApp -> useEffect에 있는 NoteStore.init 동작에서 openNote 수행한다

              if (!isNoteApp) {
                history.push({
                  pathname: history.location.pathname,
                  search: "?sub=note"
                });
                NoteStore.setNoteIdFromTalk(noteId);
              } else NoteStore.openNote(noteId);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleClickMessage(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var handleClick = function handleClick() {
    setInformDeleted(false);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Message, {
    visible: informDeleted,
    title: t('TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01'),
    type: "error",
    btns: [{
      type: 'solid',
      shape: 'round',
      text: t('NOTE_PAGE_LIST_CREATE_N_CHPT_03'),
      onClick: handleClick
    }]
  }), /*#__PURE__*/React.createElement(MessageCover, {
    id: "shareNoteMessage",
    onClick: handleClickMessage
  }, /*#__PURE__*/React.createElement(NoteActiveIcon, null), /*#__PURE__*/React.createElement(NoteTitle, null, noteTitle)));
};

function ShareNoteMessage(props) {
  var roomId = props.roomId,
      noteId = props.noteId,
      noteTitle = props.noteTitle;
  return /*#__PURE__*/React.createElement(I18nextProvider, {
    i18n: i18n
  }, /*#__PURE__*/React.createElement(ShareNoteMessageContent, {
    roomId: roomId,
    noteId: noteId,
    noteTitle: noteTitle
  }));
}

var initApp = function initApp() {
  ComponentStore.register('Note:ShareNoteMessage', ShareNoteMessage);
};

var beforeRoute = function beforeRoute(location) {
  var targetApp = location.search,
      pathname = location.pathname;
  console.log(targetApp, pathname);
};

export { NoteApp$1 as NoteApp, beforeRoute, initApp };
