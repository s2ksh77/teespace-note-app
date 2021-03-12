const languageSet = {
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
    NOTE_PAGE_LIST_DEL_PGE_CHPT_02: `It is currently being modified by {{userName}}`,
    NOTE_PAGE_LIST_DEL_PGE_CHPT_03: 'Do you want to delete this page?',
    NOTE_PAGE_LIST_DEL_PGE_CHPT_04: 'Delete',
    NOTE_PAGE_LIST_DEL_PGE_CHPT_05: 'Cancel',
    NOTE_PAGE_LIST_DEL_PGE_CHPT_06: 'Do you want to delete this chapter?',
    NOTE_PAGE_LIST_DEL_PGE_CHPT_07: 'The pages that belong to the chapter are also deleted.',
    NOTE_PAGE_LIST_ADD_NEW_PGE_01: 'Modify',
    NOTE_PAGE_LIST_ADD_NEW_PGE_02: 'Read Mode',
    NOTE_PAGE_LIST_ADD_NEW_PGE_03: 'Click the Modify button to modify.',
    NOTE_PAGE_LIST_ADD_NEW_PGE_04: 'Save',
    NOTE_PAGE_LIST_MOVE_PGE_CHPT_01: `{{moveCnt}} pages moved to {{targetPage}}`,
    NOTE_PAGE_LIST_MOVE_PGE_CHPT_02: `{{moveCnt}} chapters moved.`,
    NOTE_PAGE_LIST_MOVE_PGE_CHPT_03: `{{moveCnt}} pages moved.`,
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
    NOTE_PAGE_LIST_DEL_PGE_CHPT_08: `It is currently being modified by {{count}} people`,
    NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01: 'PDF Format(.pdf)',
    NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02: 'TXT Format(.txt)',
    NOTE_EDIT_PAGE_ATTACH_FILE_06: 'Unable to upload some files.',
    NOTE_EDIT_PAGE_ATTACH_FILE_07: `({{failCnt}} out of {{uploadCnt}} failed)`,
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
    
    NOTE_EDIT_PAGE_UPDATE_TIME_01: `{{time}} AM`,
    NOTE_EDIT_PAGE_UPDATE_TIME_02: `{{time}} PM`,
    NOTE_EXPORT_TITLE: 'Title',
    
    enterText: 'Enter a Text.',
    enterLink: 'Enter a link.',
};

export default languageSet;
