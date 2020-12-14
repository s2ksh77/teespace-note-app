import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import { FileBodyLayout, FileBody, FileContent, FileDownloadIcon, FileExtensionIcon, FileData, FileClose, FileCloseBtn, FileDataName, FileName, FileDataTime, FileTime, FileDownloadBtn, FileExtensionBtn, FileErrorIcon, ProgressWrapper } from '../../styles/editorStyle';
import useNoteStore from '../../store/useStore';
import NoteRepository from '../../store/noteRepository';
import cancelBtn from '../../assets/ts_cancel@3x.png'
import downloadBtn from '../../assets/drive_download.svg';
import txt from '../../assets/drive_txt.svg';
import pdf from '../../assets/pdf.svg';
import excel from '../../assets/drive_tocell.svg';
import file from '../../assets/drive_file.svg';
import docs from '../../assets/drive_toword.svg';
import video from '../../assets/movie.svg';
import { Dropdown, Menu, Progress } from 'antd';
import { downloadFile, handleDriveSave } from '../common/NoteFile';
import { ExclamationCircleFilled } from '@ant-design/icons';

const FileLayout = () => {
    const { EditorStore, PageStore, NoteStore } = useNoteStore();
    const [hover, setHover] = useState(false);
    const [hoverFileId, setHoverFileId] = useState(null);
    const filebodyRef = useRef([]);

    const fileExtension = (extension) => {
        switch (extension) {
            case 'txt':
                return txt;
            case 'pdf':
                return pdf;
            case 'xlsx':
                return excel;
            case 'docx':
                return docs;
            case 'mp4':
                return video;
            default: return file;
        }
    }
    const handleFileDown = (key) => {
        if (key === '0') handleDriveSave();
        if (key === '1') downloadFile(EditorStore.downloadFileId);
    }
    const onClickContextMenu = ({ key }) => {
        handleFileDown(key);
    }

    const handleMouseHover = (fileId) => {
        setHoverFileId(fileId);
        setHover(true);
    }
    const handleMouseLeave = () => {
        setHoverFileId(null);
        setHover(false);
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

    const handleKeyDownFile = e => {
        const { keyCode, target } = e;
        if (EditorStore.selectFileElement === '') EditorStore.setFileElement(target);
        switch (keyCode) {
            case 37:
                if (EditorStore.selectFileIdx > 0) {
                    EditorStore.setFileIndex(EditorStore.selectFileIdx - 1);
                    if (EditorStore.selectFileElement.previousElementSibling !== null) {
                        changeSelectFile(EditorStore.selectFileElement.previousElementSibling);
                    }
                }
                break;
            case 39:
                if (EditorStore.selectFileIdx < EditorStore.fileLayoutList.length - 1) {
                    EditorStore.setFileIndex(EditorStore.selectFileIdx + 1);
                    if (EditorStore.selectFileElement.nextElementSibling !== null) {
                        changeSelectFile(EditorStore.selectFileElement.nextElementSibling);
                    }
                }
                break;
            default:
                break;
        }
    }

    const onClickFileName = (item) => {
        EditorStore.setPreviewFileMeta({
            userId: NoteRepository.USER_ID,
            channelId: NoteRepository.chId,
            roomId: NoteRepository.WS_ID,
            fileId: item.file_id ? item.file_id : item.user_context_2,
            fileName: item.file_name,
            fileExtension: item.file_extension,
        })

        EditorStore.setIsPreview(true);
    }

    const handleFileRemove = async (fileId, index, type) => {
        if (type === 'temp' && EditorStore.tempFileLayoutList.length > 0) {
            EditorStore.tempFileLayoutList[index].deleted = true;
            await EditorStore.deleteFile(fileId).then(dto => {
                if (dto.resultMsg === 'Success') {
                    setTimeout(() => {
                        EditorStore.tempFileLayoutList.splice(index, 1);
                        EditorStore.isFileLength();
                    }, 1000);

                } else if (dto.resultMsg === 'Fail') {
                    EditorStore.tempFileLayoutList[index].deleted = undefined;
                }
            });
        } else if (type === 'uploaded' && EditorStore.fileLayoutList.length > 0) {
            EditorStore.fileLayoutList[index].deleted = true;
            await EditorStore.deleteFile(fileId).then(dto => {
                if (dto.resultMsg === 'Success') {
                    setTimeout(() => {
                        EditorStore.fileLayoutList.splice(index, 1);
                        EditorStore.isFileLength();
                    }, 1000);
                } else if (dto.resultMsg === 'Fail') {
                    EditorStore.fileLayoutList[index].deleted = undefined;
                }
            });
        }
    }

    const menu = (
        <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
            <Menu.Item key="0">Drive에 저장</Menu.Item>
            <Menu.Item key="1">내 PC에 저장</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        return () => {
            document.removeEventListener("click", handleSelectFile);
        }
    }, []);

    const handleClickDropDown = (fileId) => (e) => {
        e.stopPropagation();
        EditorStore.setDownLoadFileId(fileId);
    }

    return useObserver(() => (
        <>
            <FileBodyLayout id='fileLayout'>
                {EditorStore.tempFileLayoutList.map((item, index) => (
                    item.type === 'file' ? <FileBody id={item.file_id ? item.file_id : item.user_context_2}
                        key={index}
                        onClick={handleFileBodyClick.bind(null, item.file_id)}
                        className={index === EditorStore.selectFileIdx ? 'selected' : ''}
                        onKeyDown={handleKeyDownFile}
                        tabIndex={index}
                        closable={!PageStore.isReadMode()}
                        onMouseEnter={handleMouseHover.bind(null, item.file_id)}
                        onMouseLeave={handleMouseLeave}>
                        <FileContent>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleClickDropDown(item.file_id)} >
                                <FileDownloadIcon>
                                    {hover && item.file_id === hoverFileId ? (<FileDownloadBtn src={downloadBtn} />) : (<FileExtensionBtn src={fileExtension(item.file_extension)} />)}
                                </FileDownloadIcon>
                            </Dropdown>
                            {item.error ? <FileErrorIcon><ExclamationCircleFilled /></FileErrorIcon> : null}
                            <FileData>
                                <FileDataName>
                                    <FileName
                                        onClick={
                                            PageStore.isReadMode()
                                                ? onClickFileName.bind(null, item)
                                                : null
                                        }
                                    >
                                        {item.file_name + '.' + item.file_extension}
                                    </FileName>
                                </FileDataName>
                                <FileDataTime>
                                    <FileTime>{item.progress && item.file_size ? EditorStore.convertFileSize(item.progress * item.file_size) + '/' : null}</FileTime>
                                    <FileTime>{item.deleted === undefined && item.file_size ? EditorStore.convertFileSize(item.file_size) : '삭제 중'}</FileTime>
                                </FileDataTime>
                            </FileData>
                            <FileClose style={!PageStore.isReadMode() && item.file_id === hoverFileId ? { display: 'flex' } : { display: 'none' }}>
                                <FileCloseBtn src={cancelBtn} onClick={handleFileRemove.bind(null, item.file_id ? item.file_id : item.user_context_2, index, 'temp')} />
                            </FileClose>
                        </FileContent>
                        <ProgressWrapper>
                            {item.progress ? <Progress
                                percent={item.progress * 100}
                                showInfo={false}
                                strokeWidth={'0.25rem'}
                                trailColor="#E3E4E9"
                                strokeColor="#6C56E5"
                            /> : null}
                        </ProgressWrapper>
                    </FileBody> : null
                ))}
                {EditorStore.fileLayoutList.map((item, index) => (
                    <FileBody id={item.file_id ? item.file_id : item.user_context_2}
                        ref={el => filebodyRef.current[index] = el}
                        key={index}
                        onClick={handleFileBodyClick.bind(null, index)}
                        className={index === EditorStore.selectFileIdx ? 'noteFile selected' : 'noteFile'}
                        onKeyDown={handleKeyDownFile}
                        tabIndex={index}
                        closable={!PageStore.isReadMode()}
                        onMouseEnter={handleMouseHover.bind(null, item.file_id)}
                        onMouseLeave={handleMouseLeave}>
                        <FileContent>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleClickDropDown(item.file_id)} >
                                <FileDownloadIcon>
                                    {hover && item.file_id === hoverFileId ? (<FileDownloadBtn src={downloadBtn} />) : (<FileExtensionBtn src={fileExtension(item.file_extension)} />)}
                                </FileDownloadIcon>
                            </Dropdown>

                            <FileData>
                                <FileDataName>
                                    <FileName
                                        onClick={
                                            PageStore.isReadMode()
                                                ? onClickFileName.bind(null, item)
                                                : null
                                        }
                                    >
                                        {item.file_name + '.' + item.file_extension}
                                    </FileName>
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