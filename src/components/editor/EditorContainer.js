import React, { useLayoutEffect, useEffect, useRef, useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import NoteRepository from '../../store/noteRepository';
import EditorHeader from './EditorHeader';
import {
  EditorContainerWrapper,
  PageContentLayoutChangeBtnArea,
  FoldBtn,
  FoldBtnImg,
  ReadModeContainer,
  ReadModeIcon,
  ReadModeText,
  ReadModeSubText,
} from '../../styles/editorStyle';
import foldImg from '../../assets/arrow_back_1.svg';
import lockImg from '../../assets/lock.svg';
import TagListContainer from '../tag/TagListContainer';
import FileLayout from './FileLayout';
import GlobalVariable from '../../GlobalVariable';
import PageStore from '../../store/pageStore';
import {
  driveCancelCb,
  driveSaveCancel,
  driveSaveSuccess,
  driveSuccessCb,
  handleUnselect,
} from '../common/NoteFile';
import { ComponentStore, useCoreStores, WaplSearch } from 'teespace-core';
import Mark from 'mark.js';
import styled, { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import EditorStore from '../../store/editorStore';
import useSave from './useSave';
import MobileEditorHeader from '../mobile/content/EditorHeader';
import NewTagContent from '../mobile/content/NewTagContent';
import HandleUploader from './Uploader';
import Editor from './Editor';

// useEffect return 문에서 쓰면 변수값이 없어 저장이 안 됨
// tinymce.on('BeforeUnload', ()=>{})가 동작을 안해서 유지
window.addEventListener('beforeunload', function (e) {
  if (!PageStore.isReadMode()) PageStore.handleSave();
});

document.addEventListener('visibilitychange', () => {
  if (!PageStore.isReadMode() && document.visibilityState === 'hidden') {
    EditorStore.setVisiblityState('hidden');
  }
});

const EditorContainer = ({ isWeb = true }) => {
  const { NoteStore, PageStore, EditorStore, TagStore } = useNoteStore();
  const { configStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const DriveAttachModal = ComponentStore.get('Drive:DriveAttachModal');
  const FilePreview = ComponentStore.get('Drive:FilePreview');
  const DriveSaveModal = ComponentStore.get('Drive:DriveSaveModal');
  const inputRef = useRef(null);
  const themeContext = useContext(ThemeContext);

  const editorWrapperRef = useRef(null);
  const editorRef = useRef(null);
  const instance = new Mark(EditorStore.tinymce?.getBody());
  let eleArr = EditorStore.tinymce?.getBody()?.querySelectorAll('mark');

  const [searchValue, setSearchValue] = useState('');
  const instanceOption = {
    accuracy: {
      value: 'partially',
      limiters: [],
    },
    done: function (count) {
      EditorStore.setSearchTotalCount(count);
    },
  };

  const handleSearchInputChange = value => {
    EditorStore.setSearchValue(value);
  };

  const handleSearchEditor = () => {
    if (searchValue === EditorStore.searchValue) {
      handleSearchNext();
    } else {
      instance.unmark();
      setSearchValue(EditorStore.searchValue);
      instance.mark(EditorStore.searchValue, instanceOption);
      eleArr = EditorStore.tinymce?.getBody()?.querySelectorAll('mark');
      if (EditorStore.searchTotalCount === 0) EditorStore.setSearchCurrentCount(0);
      else {
        EditorStore.setSearchCurrentCount(1);
        eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
      }
      EditorStore.setSearchResultState(true);
    }
  };

  const handleClearSearch = () => {
    EditorStore.setSearchValue('');
    setSearchValue('');
    EditorStore.setIsSearch(false);
    EditorStore.setSearchResultState(false);
    instance.unmark();
  };
  const handleSearchPrev = () => {
    if (EditorStore.searchTotalCount === 0) return;
    else {
      if (EditorStore.searchCurrentCount > 1) {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchCurrentCount - 1);
      } else {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchTotalCount);
      }
      eleArr[EditorStore.searchCurrentCount - 1].scrollIntoView(false);
      eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
    }
  };

  const handleSearchNext = () => {
    if (EditorStore.searchTotalCount === 0) return;
    else {
      if (EditorStore.searchCurrentCount < EditorStore.searchTotalCount) {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchCurrentCount + 1);
      } else {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(1);
      }
      eleArr[EditorStore.searchCurrentCount - 1].scrollIntoView(false);
      eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
    }
  };

  const handleModeChange = ref => {
    if (PageStore.isReadMode() && !PageStore.isRecycleBin) {
      try {
        PageStore.noteEditStart(PageStore.pageInfo?.id, false);
        ref?.current?.focus();
      } catch (e) {
        console.log(`EditStart Error ${e}`);
      }
    }
  };

  useLayoutEffect(() => {
    // 모드 변경의 목적
    if (PageStore.isReadMode()) {
      setTimeout(() => {
        EditorStore.tinymce?.setMode('readonly');
        EditorStore.editor?.addEventListener('click', handleUnselect);
        if (!isWeb)
          EditorStore.tinymce?.getBody()?.addEventListener('click', handleModeChange);
      }, 100);
    } else {
      setTimeout(() => {
        EditorStore.tinymce?.setMode('design');
        EditorStore.tinymce?.undoManager?.add();
        EditorStore.editor?.removeEventListener('click', handleUnselect);
        if (!isWeb)
          EditorStore.tinymce?.getBody()?.removeEventListener('click', handleModeChange);
      }, 100);
    }
  }, [PageStore.isReadMode()]);

  useEffect(() => {
    if (editorWrapperRef.current) {
      GlobalVariable.setEditorWrapper(editorWrapperRef.current);
    }
    return () => {
      GlobalVariable.setEditorWrapper(null);
    };
  }, [editorWrapperRef.current]);

  // Search Toggle 시 reset
  useEffect(() => {
    return () => setSearchValue('');
  }, [EditorStore.isSearch]);

  // auto save
  useSave();

  useEffect(() => {
    // WaplSearch ref prop이 없음.
    if (EditorStore.isSearch) inputRef.current?.lastChild?.lastChild.focus();
  }, [EditorStore.isSearch]);

  const changeTheme = () => {
    if (!EditorStore.tinymce) return;
    if (themeContext.name !== 'dark' && themeContext.name !== 'white') return;

    // 변경된 settings을 적용하기 위해 에디터 reinit이 필요하다.
    tinymce.settings.language = NoteStore.i18nLanguage;
    tinymce.settings.skin = themeContext.name === 'dark' ? 'oxide-dark' : 'oxide';
    tinymce.EditorManager.execCommand('mceRemoveEditor', false, 'noteEditor');
    tinymce.EditorManager.execCommand('mceAddEditor', false, 'noteEditor');

    // theme에 맞춰 배경 및 글자색을 변경한다.
    const opacity = themeContext.name === 'dark' ? 0.9 : 0.04;
    EditorStore.tinymce.editorManager.DOM.setStyle(EditorStore.tinymce.getBody(), {
      background: `radial-gradient(rgba(0, 0, 0, ${opacity}) 0.063rem, ${themeContext.StateNormal} 0rem)`,
      color: `${themeContext.TextMain}`,
    });
  };

  useEffect(() => {
    changeTheme();
  }, [themeContext.name, NoteStore.i18nLanguage]);

  return useObserver(() => (
    <>
      <EditorContainerWrapper
        ref={editorWrapperRef}
        isReadMode={PageStore.isReadMode()}
        isFile={EditorStore.isFile}
        isSearch={EditorStore.isSearch}
        isWorks={NoteStore.appType === 'wapl' ? false : true}
        isTagEdit={EditorStore.isTagEditPage}
      >
        <PageContentLayoutChangeBtnArea
          onMouseOver={() => NoteStore.setIsHoveredFoldBtnLine(true)}
          onMouseOut={() => NoteStore.setIsHoveredFoldBtnLine(false)}
        />
        <FoldBtn
          isExpanded={NoteStore.isContentExpanded}
          show={
            NoteStore.layoutState !== 'collapse' &&
            NoteStore.isHoveredFoldBtnLine &&
            isWeb
          }
          onMouseMove={() => NoteStore.setIsHoveredFoldBtnLine(true)}
          onClick={() => NoteStore.toggleIsContentExpanded()}
        >
          <FoldBtnImg src={foldImg} />
        </FoldBtn>
        {isWeb ? (
          <EditorHeader />
        ) : (
          <MobileEditorHeader handleModeChange={handleModeChange} />
        )}
        {/* {PageStore.isReadMode() && !EditorStore.isSearch && isWeb ? (
          <ReadModeContainer style={{ display: 'flex' }}>
            {authStore.hasPermission('notePage', 'U') ? (
              PageStore.isRecycleBin ? (
                <ReadModeText style={{ marginLeft: '1rem' }}>
                  {' '}
                  {t('NOTE_BIN_05')}{' '}
                </ReadModeText>
              ) : (
                <>
                  <ReadModeIcon src={lockImg} />
                  <ReadModeText>{t('NOTE_PAGE_LIST_ADD_NEW_PGE_02')}</ReadModeText>
                  <ReadModeSubText>{t('NOTE_PAGE_LIST_ADD_NEW_PGE_03')}</ReadModeSubText>
                </>
              )
            ) : (
              <>
                <ReadModeIcon src={lockImg} />
                <ReadModeSubText>{t('NOTE_GUEST_01')}</ReadModeSubText>
              </>
            )}
          </ReadModeContainer>
        ) : null} */}
        {EditorStore.isSearch ? (
          <ReadModeContainer ref={inputRef} style={{ display: 'flex' }}>
            <StyledWaplSearch
              searchIconColor={{
                default: !EditorStore.searchValue
                  ? themeContext.IconHinted
                  : themeContext.Iconmain,
              }}
              clearIconColor={{
                default: !EditorStore.searchValue
                  ? themeContext.IconHinted
                  : themeContext.Iconmain,
              }}
              onChange={handleSearchInputChange}
              placeholder={t('NOTE_EDIT_PAGE_SEARCH_03')}
              onEnterDown={handleSearchEditor}
              onClear={handleClearSearch}
              onSearchPrev={handleSearchPrev}
              onSearchNext={handleSearchNext}
              className=""
              isCountExist={EditorStore.searchResultState ? true : false}
              SearchNumber={EditorStore.searchCurrentCount}
              TotalNumber={EditorStore.searchTotalCount}
            />
          </ReadModeContainer>
        ) : null}
        <Editor />
        {EditorStore.isFile ? <FileLayout /> : null}
        {(authStore.hasPermission('notePage', 'U') ||
          TagStore.notetagList.length > 0) && <TagListContainer isWeb={isWeb} />}
        <DriveAttachModal
          visible={EditorStore.isDrive}
          successCallback={driveSuccessCb}
          cancelCallback={driveCancelCb}
          roomId={NoteRepository.WS_ID}
        />
        {EditorStore.isPreview ? (
          <FilePreview
            visible={EditorStore.isPreview}
            fileMeta={EditorStore.previewFileMeta}
            handleClose={() => EditorStore.setIsPreview(false)}
          />
        ) : null}
        <DriveSaveModal
          visible={EditorStore.isSaveDrive}
          successCallback={driveSaveSuccess}
          cancelCallback={driveSaveCancel}
          file={EditorStore.saveDriveMeta}
          roomId={NoteRepository.WS_ID}
        />
        <HandleUploader isWeb={isWeb} />
      </EditorContainerWrapper>
      {EditorStore.isTagEditPage && <NewTagContent />}
    </>
  ));
};

export default React.memo(EditorContainer);

const StyledWaplSearch = styled(WaplSearch)`
  width: 100%;
  margin: 0 0.438rem;
  border-radius: 0.375rem;
  padding: 0.38rem 0.625rem;
  &:hover:not(:focus-within) {
    background-color: ${props => props.theme.SubStateBright};
    path {
      fill: ${props => props.theme.IconNormal};
    }
  }
  &:focus-within {
    background-color: ${props => props.theme.StateNormal};
    border: 1px solid ${props => props.theme.SubStateVivid};
    path {
      fill: ${props => props.theme.IconActive};
    }
  }
  color: ${props => props.theme.TextMain};
  border: 1px solid transparent;
  background-color: ${props => props.theme.SubStateNormal};
`;
