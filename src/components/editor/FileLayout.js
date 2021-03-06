import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
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
import useNoteStore from '../../store/useStore';
import NoteRepository from '../../store/noteRepository';
import cancelBtn from '../../assets/ts_cancel@3x.png';
import downloadBtn from '../../assets/file_download.svg';
import { Dropdown, Menu, Progress, Tooltip } from 'antd';
import {
  downloadFile,
  openSaveDrive,
  fileExtension,
  isPreview,
} from '../common/NoteFile';
import { ExclamationCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useCoreStores } from 'teespace-core';

const StyledMenu = styled(Menu)`
  width: 6.69rem;
  border-radius: 5px;
`;

const FileLayout = () => {
  const { EditorStore, PageStore, NoteStore } = useNoteStore();
  const { configStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const [hoverFileId, setHoverFileId] = useState(null);
  const [hoverFileIdx, setHoverFileIdx] = useState(null);
  const [hoverTempIdx, setHoverTempIdx] = useState(null);
  const [clickFileIdx, setClickFileIdx] = useState(null);
  const [downloadFileId, setDownLoadFileId] = useState('');
  const filebodyRef = useRef([]);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  // const driveGetFileIcon = ComponentStore.get('Drive:getFileIcon');

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  const handleFileDown = key => {
    if (key === '0') openSaveDrive();
    if (key === '1') downloadFile(downloadFileId);
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
    // file layout ??? ?????? ?????????.. ?????? ???????????? ?????????????????? ???
    if (!filebodyRef.current.includes(target.closest('.noteFile'))) {
      setClickFileIdx(null);
    }
  };

  const handleFileBodyClick = index => {
    if (clickFileIdx !== index) {
      setClickFileIdx(index);
      changeSelectFile(index);
    } else {
      setClickFileIdx(null);
    }
  };

  const changeSelectFile = changeIdx => {
    filebodyRef.current[changeIdx]?.focus();
    filebodyRef.current[changeIdx]?.scrollIntoView(false);
  };

  const handleKeyDownFile = ({ fileId, index, type }) => e => {
    const { keyCode, target } = e;
    switch (keyCode) {
      case 37: // <-
        if (clickFileIdx === 0) return;
        else {
          const leftIdx = clickFileIdx - 1;
          setClickFileIdx(leftIdx);
          changeSelectFile(leftIdx);
        }
        break;
      case 39: // ->
        if (clickFileIdx === filebodyRef.current.length - 1) return;
        else {
          const rightIdx = clickFileIdx + 1;
          setClickFileIdx(rightIdx);
          changeSelectFile(rightIdx);
        }
        break;
      case 8: // backspace
      case 46: // delete : ?????? ?????? ?????? ???????????? focus??? ????????? ????????? ??? ?????? chip?????? ??????
        if (!PageStore.isReadMode()) handleFileRemove(fileId, index, type);
        break;
      default:
        break;
    }
  };

  const onClickFileName = item => {
    const { file_id, file_name, file_extension: extension, user_context_2 } = item;
    // ?????????????????? preview ????????? ????????? ?????? ?????? ?????? ?????? ?????? ??????
    if (!PageStore.isReadMode() && !isPreview(extension)) return;
    if (PageStore.isRecycleBin) return;

    if (isPreview(extension)) {
      EditorStore.setPreviewFileMeta({
        userId: NoteRepository.USER_ID,
        channelId: NoteRepository.chId,
        roomId: NoteRepository.WS_ID,
        fileId: file_id,
        fileName: file_name,
        fileExtension: extension?.toLowerCase(),
      });
      EditorStore.setIsPreview(true);
      return;
    }
    downloadFile(file_id);
  };

  const handleFileRemove = async (fileId, index, type) => {
    const removePostProcess = () => {
      if (EditorStore.isFile) {
        EditorStore.setFileIndex(''); // click ?????? index??? fileIndex?????? ????????? click ??????????????? ?????????????????????
        if (type === 'uploaded') filebodyRef.current[index > 0 ? index - 1 : 0]?.click();
      } else {
        try {
          // ???????????? ?????? try catch???
          EditorStore.tinymce.focus();
          EditorStore.tinymce.selection.select(EditorStore.tinymce.getBody(), true);
          EditorStore.tinymce.selection.collapse(false);
        } catch (err) {}
      }
    };
    if (type === 'pending' && EditorStore.fileLayoutList.length > 0) {
      EditorStore.fileLayoutList[index].cancelSource.cancel();
      EditorStore.fileLayoutList[index].deleted = true;
    } else if (
      (type === 'uploaded' || type === undefined) &&
      EditorStore.fileLayoutList.length > 0
    ) {
      EditorStore.fileLayoutList[index].deleted = true;
      await EditorStore.deleteFile(fileId).then(dto => {
        if (dto.resultMsg === 'Success') {
          setTimeout(() => {
            EditorStore.fileLayoutList.splice(index, 1);
            EditorStore.isFileLength();
            EditorStore.removeFileList(fileId);
            removePostProcess();
          }, 1000);
        } else if (dto.resultMsg === 'Fail') {
          EditorStore.fileLayoutList[index].deleted = undefined;
          EditorStore.fileLayoutList.splice(index, 1);
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
    document.addEventListener('click', handleSelectFile);
    return () => {
      document.removeEventListener('click', handleSelectFile);
    };
  }, []);

  const handleClickDropDown = (fileId, fileExt, fileName) => e => {
    e.stopPropagation();
    setDownLoadFileId(fileId);
    EditorStore.setSaveFileMeta(fileId, fileExt, fileName);
  };

  return useObserver(() => (
    <>
      <FileBodyLayout id="fileLayout">
        {EditorStore.fileLayoutList?.map((item, index) => (
          <FileBody
            id={item.file_id ? item.file_id : item.user_context_2}
            ref={el => (filebodyRef.current[index] = el)}
            key={index}
            onClick={handleFileBodyClick.bind(null, index)}
            onMouseEnter={handleMouseHover.bind(null, item.file_id)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDownFile({
              fileId: item.file_id ? item.file_id : item.user_context_2,
              index,
              type: 'uploaded',
            })}
            tabIndex={index}
            className={index === clickFileIdx ? 'noteFile fileSelected' : 'noteFile'}
            closable={!PageStore.isReadMode()}
          >
            <FileContent>
              {!authStore.hasPermission('notePage', 'U') || PageStore.isRecycleBin ? (
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
                      <FileExtensionBtn src={fileExtension(item.file_extension)} />
                    )}
                  </FileDownloadIcon>
                </Dropdown>
              )}
              <FileData mode={PageStore.isReadMode().toString()}>
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
                      ? EditorStore.convertFileSize(item.progress * item.file_size) + '/'
                      : null}
                  </FileTime>
                  <FileTime>
                    {item.deleted === undefined && item.file_size
                      ? EditorStore.convertFileSize(item.file_size)
                      : item.status === 'canceled'
                      ? '?????? ???'
                      : item.file_size === 0
                      ? '0 KB'
                      : '?????? ???'}
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
                  !PageStore.isReadMode() && item.file_id === hoverFileId
                    ? { display: 'flex' }
                    : { display: 'none' }
                }
              >
                <FileCloseBtn
                  src={cancelBtn}
                  onClick={handleFileRemove.bind(null, item.file_id, index, item.status)}
                />
              </FileClose>
            </FileContent>
          </FileBody>
        ))}
      </FileBodyLayout>
    </>
  ));
};

export default React.memo(FileLayout);
