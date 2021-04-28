import React, { useEffect, useState, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';
import { ComponentStore, useCoreStores } from 'teespace-core';
import { PageFileListWrapper } from '../../styles/EditorStyle';
import {
  FileBodyLayout,
  FileBody,
  FileContent,
  FileDownloadIcon,
  FileExtensionIcon,
  FileData,
  FileClose,
  FileCloseBtn,
  FileDataName,
  FileName,
  FileDataTime,
  FileTime,
  FileDownloadBtn,
  FileExtensionBtn,
  FileErrorIcon,
  ProgressWrapper,
  FileProgress,
} from '../../styles/editorStyle';
import NoteRepository from '../../stores/repository/NoteRepository';
import cancelBtn from '../../assets/ts_cancel@3x.png';
import downloadBtn from '../../assets/file_download.svg';
import { Dropdown, Menu, Progress, Tooltip } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  convertFileSize,
  fileExtension,
  isPreview,
} from '../common/FileUpload';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledMenu = styled(Menu)`
  width: 6.69rem;
  border-radius: 5px;
`;

const PageFileList = () => {
  const { EditorStore, PageStore, NoteStore } = useNoteStore();
  const { configStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const [hoverFileId, setHoverFileId] = useState(null);
  const [hoverFileIdx, setHoverFileIdx] = useState(null);
  const [hoverTempIdx, setHoverTempIdx] = useState(null);
  const filebodyRef = useRef([]);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  // const driveGetFileIcon = ComponentStore.get('Drive:getFileIcon');

  const handleTooltip = e => {
    setIsEllipsisActive(
      e.currentTarget.offsetWidth < e.currentTarget.scrollWidth,
    );
  };

  const handleFileDown = key => {
    if (key === '0') openSaveDrive();
    if (key === '1') downloadFile(EditorStore.downloadFileId);
  };
  const onClickContextMenu = ({ key }) => {
    handleFileDown(key);
  };

  const handleMouseHover = fileId => {
    setHoverFileId(fileId);
  };
  const handleMouseLeave = () => {
    setHoverFileId(null);
    setHover(false);
  };
  const handleHoverIcon = idx => {
    setHoverFileIdx(idx);
    setHover(true);
  };
  const handleLeaveIcon = () => {
    setHoverFileIdx(null);
    setHover(false);
  };

  const handleSelectFile = e => {
    const { target } = e;
    // file layout 외 영역 클릭시.. 다른 구현방법 생각해봐야될 듯
    if (!filebodyRef.current.includes(target.closest('.noteFile'))) {
      EditorStore.setFileIndex('');
      EditorStore.setFileElement('');
      document.removeEventListener('click', handleSelectFile);
    }
  };

  const handleFileBodyClick = index => {
    EditorStore.setFileElement(filebodyRef.current[index]);
    EditorStore.selectFileElement.focus();
    EditorStore.selectFileElement.scrollIntoView(false);
    if (EditorStore.selectFileIdx === '')
      document.addEventListener('click', handleSelectFile);
    if (index !== EditorStore.selectFileIdx) EditorStore.setFileIndex(index);
    else {
      EditorStore.setFileIndex('');
      EditorStore.setFileElement('');
    }
  };
  const changeSelectFile = ele => {
    EditorStore.setFileElement(ele);
    EditorStore.selectFileElement.focus();
    EditorStore.selectFileElement.scrollIntoView(false);
  };

  const handleKeyDownFile = ({ fileId, index, type }) => e => {
    const { keyCode, target } = e;
    if (EditorStore.selectFileElement === '')
      EditorStore.setFileElement(target);
    switch (keyCode) {
      case 37: // <-
        if (EditorStore.selectFileIdx > 0) {
          EditorStore.setFileIndex(EditorStore.selectFileIdx - 1);
          if (EditorStore.selectFileElement.previousElementSibling !== null) {
            changeSelectFile(
              EditorStore.selectFileElement.previousElementSibling,
            );
          }
        }
        break;
      case 39: // ->
        if (EditorStore.selectFileIdx < EditorStore.fileLayoutList.length - 1) {
          EditorStore.setFileIndex(EditorStore.selectFileIdx + 1);
          if (EditorStore.selectFileElement.nextElementSibling !== null) {
            changeSelectFile(EditorStore.selectFileElement.nextElementSibling);
          }
        }
        break;
      case 8: // backspace
      case 46: // delete : 해당 첨부 파일 삭제되며 focus는 삭제된 파일의 위 파일 chip으로 이동
        if (!PageStore.isReadMode()) handleFileRemove(fileId, index, type);
        break;
      default:
        break;
    }
  };

  const onClickFileName = item => {
    const {
      file_id,
      file_name,
      file_extension: extension,
      user_context_2,
    } = item;
    // 수정모드에서 preview 가능한 동영상 파일 아닌 경우 아무 반응 없음
    if (!PageStore.isReadMode() && !isPreview(extension)) return;

    if (isPreview(extension)) {
      EditorStore.setPreviewFileMeta({
        userId: NoteRepository.USER_ID,
        channelId: NoteRepository.chId,
        roomId: NoteRepository.WS_ID,
        fileId: file_id ? file_id : user_context_2,
        fileName: file_name,
        fileExtension: extension,
      });
      EditorStore.setIsPreview(true);
      return;
    }
    downloadFile(file_id ? file_id : user_context_2);
  };

  const handleFileRemove = (fileId, index, type) => async e => {
    e.stopPropagation();

    if (type === 'uploaded') {
      PageStore.pageModel.fileList[index].deleted = true;
      await EditorStore.deleteFile(fileId).then(dto => {
        if (dto.resultMsg === 'Success') {
          setTimeout(() => {
            PageStore.pageModel.fileList.splice(index, 1);
            // EditorStore.isFileLength();
            // removePostProcess();
          }, 1000);
        } else if (dto.resultMsg === 'Fail') {
          PageStore.pageModel.fileList[index].deleted = undefined;
          PageStore.pageModel.fileList.splice(index, 1);
          removePostProcess();
        }
      });
    }
  };

  const menu = (
    <StyledMenu onClick={onClickContextMenu}>
      {configStore.isActivateComponent('Note', 'FileLayout:SaveToDrive') ? (
        <Menu.Item key="0">{t('NOTE_EDIT_PAGE_MENUBAR_32')}</Menu.Item>
      ) : (
        ''
      )}
      <Menu.Item key="1">{t('NOTE_EDIT_PAGE_MENUBAR_33')}</Menu.Item>
    </StyledMenu>
  );

  useEffect(() => {
    console.log(filebodyRef);
    return () => {
      document.removeEventListener('click', handleSelectFile);
    };
  }, []);

  const handleClickDropDown = (fileId, fileExt, fileName) => e => {
    e.stopPropagation();
    EditorStore.setDownLoadFileId(fileId);
    EditorStore.setSaveFileMeta(fileId, fileExt, fileName);
  };

  return useObserver(() => (
    <PageFileListWrapper>
      {PageStore.pageModel.fileList?.map((item, index) => (
        <FileBody
          ref={el => (filebodyRef.current[index] = el)}
          key={index}
          onClick={handleFileBodyClick.bind(null, index)}
          onMouseEnter={handleMouseHover.bind(null, item)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDownFile({
            fileId: item.file_id ? item.file_id : item.user_context_2,
            index,
            type: 'uploaded',
          })}
          tabIndex={index}
          closable={!PageStore.pageModel.isReadMode}
        >
          <FileContent>
            {!authStore.hasPermission('notePage', 'U') ? (
              <FileDownloadIcon>
                <FileExtensionBtn src={fileExtension(item.file_extension)} />
              </FileDownloadIcon>
            ) : (
              <Dropdown
                overlay={menu}
                trigger={['click']}
                placement="bottomCenter"
                onClick={handleClickDropDown(
                  item.file_id,
                  item.file_extension,
                  item.file_name,
                )}
              >
                <FileDownloadIcon
                  onMouseEnter={handleHoverIcon.bind(null, index)}
                  onMouseLeave={handleLeaveIcon}
                >
                  {hover && index === hoverFileIdx ? (
                    <FileDownloadBtn src={downloadBtn} />
                  ) : (
                    <FileExtensionBtn
                      src={fileExtension(item.file_extension)}
                    />
                  )}
                </FileDownloadIcon>
              </Dropdown>
            )}
            <FileData mode={PageStore.pageModel.isReadMode.toString()}>
              <FileDataName>
                <Tooltip
                  title={
                    isEllipsisActive
                      ? item.file_name +
                        (item.file_extension ? `.${item.file_extension}` : '')
                      : null
                  }
                  placement="top"
                >
                  <FileName
                    onClick={onClickFileName.bind(null, item)}
                    onMouseOver={handleTooltip}
                  >
                    {item.file_name}
                    {item.file_extension && `.${item.file_extension}`}
                  </FileName>
                </Tooltip>
              </FileDataName>
              <FileDataTime>
                <FileTime>
                  {item.status === 'pending' && item.progress && item.file_size
                    ? convertFileSize(item.progress * item.file_size) + '/'
                    : null}
                </FileTime>
                <FileTime>
                  {item.deleted === undefined && item.file_size
                    ? convertFileSize(item.file_size)
                    : '삭제 중'}
                </FileTime>
                <FileProgress>
                  {item.status === 'pending' &&
                  (item.progress * 100).toFixed(1) !== '0.0'
                    ? (item.progress * 100).toFixed(1) + '%'
                    : ''}
                </FileProgress>
              </FileDataTime>
              <ProgressWrapper>
                {item.progress && item.status === 'pending' ? (
                  <Progress
                    percent={item.progress * 100}
                    showInfo={false}
                    strokeWidth={'0.25rem'}
                    trailColor="#E3E4E9"
                    strokeColor="#232D3B"
                  />
                ) : null}
              </ProgressWrapper>
            </FileData>
            <FileClose
              style={
                !PageStore.pageModel.isReadMode
                  ? { display: 'flex' }
                  : { display: 'none' }
              }
            >
              <FileCloseBtn
                src={cancelBtn}
                onClick={handleFileRemove(item.file_id, index, 'uploaded')}
              />
            </FileClose>
          </FileContent>
        </FileBody>
      ))}
    </PageFileListWrapper>
  ));
};

export default PageFileList;