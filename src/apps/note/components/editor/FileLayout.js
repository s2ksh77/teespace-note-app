import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import { FileBodyLayout, FileBody, FileContent, FileDownloadIcon, FileExtensionIcon, FileData, FileClose, FileCloseBtn, FileDataName, FileName, FileDataTime, FileTime, FileDownloadBtn, FileExtensionBtn, FileErrorIcon, ProgressWrapper, FileProgress } from '../../styles/editorStyle';
import useNoteStore from '../../store/useStore';
import NoteRepository from '../../store/noteRepository';
import cancelBtn from '../../assets/ts_cancel@3x.png'
import downloadBtn from '../../assets/file_download.svg';
import txt from '../../assets/txt.svg';
import excel from '../../assets/cell.svg';
import ppt from '../../assets/point.svg';
import pdf from '../../assets/pdf.svg';
import etc from '../../assets/etc.svg';
import zip from '../../assets/zip.svg';
import docs from '../../assets/word.svg';
import hangul from '../../assets/hangul.svg';
import video from '../../assets/movie.svg';
import audio from '../../assets/audio.svg';
import { Dropdown, Menu, Progress, Tooltip } from 'antd';
import { downloadFile, openSaveDrive, fileCategory } from '../common/NoteFile';
import { ExclamationCircleFilled } from '@ant-design/icons';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const StyledMenu = styled(Menu)`
  width:6.69rem;
  border-radius: 5px;
`;

const FileLayout = () => {
    const { EditorStore, PageStore, NoteStore } = useNoteStore();
    const { t } = useTranslation();
    const [hover, setHover] = useState(false);
    const [hoverFileId, setHoverFileId] = useState(null);
    const [hoverFileIdx, setHoverFileIdx] = useState(null);
    const [hoverTempIdx, setHoverTempIdx] = useState(null);
    const filebodyRef = useRef([]);
    const [isEllipsisActive, setIsEllipsisActive] = useState(false);
    // const driveGetFileIcon = ComponentStore.get('Drive:getFileIcon');

    const handleTooltip = e => {
        setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
    };

    const fileExtension = (extension) => {
        // driveGetFileIcon(fileName)
        const cat = Object.keys(fileCategory).find(cat => fileCategory[cat]['ext'].includes(extension));
        switch (cat) {
            case 'isTxt':
                return txt;
            case 'isPowerPoint':
                return ppt;
            case 'isPdf':
                return pdf;
            case 'isExcel':
                return excel;
            case 'isWord':
                return docs;
            case 'isHangul':
                return hangul;
            case 'isZip':
                return zip;
            case 'isVideoWithPreview':
            case 'isVideoWithoutPreview':
                return video;
            case 'isAudio':
                return audio;
            default: return etc;
        }
    }
    const handleFileDown = (key) => {
        if (key === '0') openSaveDrive();
        if (key === '1') downloadFile(EditorStore.downloadFileId);
    }
    const onClickContextMenu = ({ key }) => {
        handleFileDown(key);
    }

    const handleMouseHover = (fileId) => {
        setHoverFileId(fileId);
    }
    const handleMouseLeave = () => {
        setHoverFileId(null);
        setHover(false);
    }
    const handleHoverIcon = (idx) => {
        setHoverFileIdx(idx);
        setHover(true);
    }
    const handleLeaveIcon = () => {
        setHoverFileIdx(null);
        setHover(false);
    }
    const handleTempMouseHover = (idx) => {
        setHoverTempIdx(idx)
    }
    const handleTempMouseLeave = (idx) => {
        setHoverTempIdx(null);
    }

    const handleSelectFile = (e) => {
        const { target } = e;
        // file layout 외 영역 클릭시.. 다른 구현방법 생각해봐야될 듯
        if (!filebodyRef.current.includes(target.closest('.noteFile'))) {
            EditorStore.setFileIndex('');
            EditorStore.setFileElement('');
            document.removeEventListener("click", handleSelectFile);
        }
    }

    const handleFileBodyClick = index => {
        EditorStore.setFileElement(filebodyRef.current[index]);
        EditorStore.selectFileElement.focus();
        EditorStore.selectFileElement.scrollIntoView(false);
        if (EditorStore.selectFileIdx === '') document.addEventListener("click", handleSelectFile);
        if (index !== EditorStore.selectFileIdx) EditorStore.setFileIndex(index);
        else {
            EditorStore.setFileIndex('');
            EditorStore.setFileElement('');
        }
    }
    const changeSelectFile = (ele) => {
        EditorStore.setFileElement(ele);
        EditorStore.selectFileElement.focus();
        EditorStore.selectFileElement.scrollIntoView(false);
    }

    const handleKeyDownFile = ({ fileId, index, type }) => e => {
        const { keyCode, target } = e;
        if (EditorStore.selectFileElement === '') EditorStore.setFileElement(target);
        switch (keyCode) {
            case 37: // <-
                if (EditorStore.selectFileIdx > 0) {
                    EditorStore.setFileIndex(EditorStore.selectFileIdx - 1);
                    if (EditorStore.selectFileElement.previousElementSibling !== null) {
                        changeSelectFile(EditorStore.selectFileElement.previousElementSibling);
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
    }

    const onClickFileName = (item) => {
        const { file_id, file_name, file_extension: extension, user_context_2 } = item;
        const cat = Object.keys(fileCategory).find(cat => fileCategory[cat]['ext'].includes(extension));
        const isPreviewFile = cat && fileCategory[cat]["isPreview"];
        // 수정모드에서 preview 가능한 동영상 파일 아닌 경우 아무 반응 없음
        if (!PageStore.isReadMode() && !isPreviewFile) return;

        if (isPreviewFile) {
            EditorStore.setPreviewFileMeta({
                userId: NoteRepository.USER_ID,
                channelId: NoteRepository.chId,
                roomId: NoteRepository.WS_ID,
                fileId: file_id ? file_id : user_context_2,
                fileName: file_name,
                fileExtension: extension,
            })
            EditorStore.setIsPreview(true);
        } else { downloadFile(file_id ? file_id : user_context_2) }
    }

    const handleFileRemove = async (fileId, index, type) => {
        const removePostProcess = () => {
            if (EditorStore.isFile) {
                EditorStore.setFileIndex(""); // click 대상 index와 fileIndex값이 같으면 click 이벤트에서 초기화시켜버림
                if (type === "uploaded") filebodyRef.current[(index > 0) ? (index - 1) : 0]?.click();
            } else {
                try { // 불안해서 넣는 try catch문
                    EditorStore.tinymce.focus();
                    EditorStore.tinymce.selection.select(EditorStore.tinymce.getBody(), true);
                    EditorStore.tinymce.selection.collapse(false);
                } catch (err) { }
            }
        }
        if (type === 'temp' && EditorStore.tempFileLayoutList.length > 0) {
            EditorStore.uploadDTO[index].cancelSource.cancel()
            EditorStore.tempFileLayoutList[index].deleted = true;
        } else if (type === 'uploaded' && EditorStore.fileLayoutList.length > 0) {
            EditorStore.fileLayoutList[index].deleted = true;
            await EditorStore.deleteFile(fileId).then(dto => {
                if (dto.resultMsg === 'Success') {
                    setTimeout(() => {
                        EditorStore.fileLayoutList.splice(index, 1);
                        EditorStore.isFileLength();
                        removePostProcess();
                    }, 1000);
                } else if (dto.resultMsg === 'Fail') {
                    EditorStore.fileLayoutList[index].deleted = undefined;
                    EditorStore.fileLayoutList.splice(index, 1);
                    removePostProcess();
                }
            });
        }
    }

    const menu = (
        <StyledMenu onClick={onClickContextMenu}>
            <Menu.Item key="0">{t('NOTE_EDIT_PAGE_MENUBAR_32')}</Menu.Item>
            <Menu.Item key="1">{t('NOTE_EDIT_PAGE_MENUBAR_33')}</Menu.Item>
        </StyledMenu>
    );

    useEffect(() => {
        return () => {
            document.removeEventListener("click", handleSelectFile);
        }
    }, []);

    const handleClickDropDown = (fileId, fileExt, fileName) => (e) => {
        e.stopPropagation();
        EditorStore.setDownLoadFileId(fileId);
        EditorStore.setSaveFileMeta(fileId, fileExt, fileName);
    }

    return useObserver(() => (
        <>
            <FileBodyLayout id='fileLayout'>
                {EditorStore.tempFileLayoutList.map((item, index) => (
                    item.type === 'file' ? <FileBody id={item.file_id ? item.file_id : item.user_context_2}
                        key={index}
                        className={index === EditorStore.selectFileIdx ? 'fileSelected' : ''}
                        onKeyDown={handleKeyDownFile({
                            fileId: item.file_id ? item.file_id : item.user_context_2,
                            index,
                            type: "temp"
                        })}
                        tabIndex={index}
                        closable={!PageStore.isReadMode()}
                        onMouseEnter={handleTempMouseHover.bind(null, index)}
                        onMouseLeave={handleTempMouseLeave}>
                        <FileContent>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleClickDropDown(item.file_id)} >
                                <FileDownloadIcon>
                                    {hover && index === hoverTempIdx
                                        ? (<FileDownloadBtn src={downloadBtn} />)
                                        : (<FileExtensionBtn src={fileExtension(item.file_extension)} />)}
                                </FileDownloadIcon>
                            </Dropdown>
                            {item.error ? <FileErrorIcon><ExclamationCircleFilled /></FileErrorIcon> : null}
                            <FileData>
                                <FileDataName>
                                    <FileName onClick={onClickFileName.bind(null, item)}>
                                        {item.file_name}
                                        {item.file_extension && `.${item.file_extension}`}
                                    </FileName>
                                </FileDataName>
                                <FileDataTime>
                                    <FileTime>{item.progress && item.file_size ? EditorStore.convertFileSize(item.progress * item.file_size) + '/' : null}</FileTime>
                                    <FileTime>{item.deleted === undefined && item.file_size ? EditorStore.convertFileSize(item.file_size) : '취소 중'}</FileTime>
                                    <FileProgress>{(item.progress * 100).toFixed(1) !== '0.0' ? (item.progress * 100).toFixed(1) + '%' : ''}</FileProgress>
                                </FileDataTime>
                                <ProgressWrapper>
                                    {item.progress ? <Progress
                                        percent={item.progress * 100}
                                        showInfo={false}
                                        strokeWidth={'0.25rem'}
                                        trailColor="#E3E4E9"
                                        strokeColor="#232D3B"
                                    /> : null}
                                </ProgressWrapper>
                            </FileData>
                            <FileClose style={!PageStore.isReadMode() && index === hoverTempIdx ? { display: 'flex' } : { display: 'none' }}>
                                <FileCloseBtn src={cancelBtn} onClick={handleFileRemove.bind(null, item.file_id ? item.file_id : item.user_context_2, index, 'temp')} />
                            </FileClose>
                        </FileContent>
                    </FileBody> : null
                ))}
                {EditorStore.fileLayoutList.map((item, index) => (
                    <FileBody id={item.file_id ? item.file_id : item.user_context_2}
                        ref={el => filebodyRef.current[index] = el}
                        key={index}
                        onClick={handleFileBodyClick.bind(null, index)}
                        className={index === EditorStore.selectFileIdx ? 'noteFile fileSelected' : 'noteFile'}
                        onMouseEnter={handleMouseHover.bind(null, item.file_id)}
                        onMouseLeave={handleMouseLeave}
                        onKeyDown={handleKeyDownFile({
                            fileId: item.file_id ? item.file_id : item.user_context_2,
                            index,
                            type: "uploaded"
                        })}
                        tabIndex={index}
                        closable={!PageStore.isReadMode()}>
                        <FileContent>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleClickDropDown(item.file_id, item.file_extension, item.file_name)} >
                                <FileDownloadIcon
                                    onMouseEnter={handleHoverIcon.bind(null, index)}
                                    onMouseLeave={handleLeaveIcon}>
                                    {hover && index === hoverFileIdx
                                        ? (<FileDownloadBtn src={downloadBtn} />)
                                        : (<FileExtensionBtn src={fileExtension(item.file_extension)} />)}
                                </FileDownloadIcon>
                            </Dropdown>
                            <FileData mode={PageStore.isReadMode().toString()}>
                                <FileDataName>
                                    <Tooltip
                                        title={isEllipsisActive
                                            ? item.file_name + (item.file_extension ? `.${item.file_extension}` : '')
                                            : null}
                                        placement='top'
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
                                    <FileTime>{item.deleted === undefined && item.file_size ? EditorStore.convertFileSize(item.file_size) : '삭제 중'}</FileTime>
                                </FileDataTime>
                            </FileData>
                            <FileClose style={!PageStore.isReadMode() && item.file_id === hoverFileId ? { display: 'flex' } : { display: 'none' }}>
                                <FileCloseBtn src={cancelBtn} onClick={handleFileRemove.bind(null, item.file_id ? item.file_id : item.user_context_2, index, 'uploaded')} />
                            </FileClose>
                        </FileContent>
                    </FileBody>
                ))}
            </FileBodyLayout>
        </>
    ))
};

export default FileLayout;