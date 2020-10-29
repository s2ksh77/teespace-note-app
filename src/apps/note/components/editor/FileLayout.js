import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { FileBodyLayout, FileBody, FileContent, FileDownloadIcon, FileExtensionIcon, FileData, FileClose, FileCloseBtn, FileDataName, FileName, FileDataTime, FileTime, FileDownloadBtn, FileExtensionBtn } from '../../styles/editorStyle';
import useStore from '../../store/useStore';
import cancelBtn from '../../assets/ts_cancel@3x.png'
import downloadBtn from '../../assets/drive_download.svg';
import txt from '../../assets/drive_txt.svg';
import pdf from '../../assets/drive_topoint.svg';
import excel from '../../assets/drive_tocell.svg';
import file from '../../assets/drive_file.svg';
import docs from '../../assets/drive_toword.svg';
import { Dropdown, Menu } from 'antd';

const FileLayout = () => {
    const { EditorStore, PageStore, NoteStore } = useStore();
    const [hover, setHover] = useState(false);
    const [hoverFileId, setHoverFileId] = useState(null);

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
            default: return file;
        }
    }
    const handleFileDown = (key) => {
        if (key === '0') alert('준비 중입니다.');
        if (key === '1') EditorStore.downloadFile(EditorStore.downloadFileId);
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
        if (EditorStore.selectFileElement !== '') {
            EditorStore.setFileIndex('');
            EditorStore.setFileElement('');
            document.removeEventListener("click", handleSelectFile);
        }
    }

    const handleFileBodyClick = index => {
        if (EditorStore.selectFileIdx === '') {
            document.addEventListener("click", handleSelectFile);
        }
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
    const handleFileRemove = (fileId, filename, index) => {
        // temp id
        if (fileId.length === 8) {
            EditorStore.fileLayoutList.splice(index, 1);
            if (EditorStore.fileLayoutList.length === 0) EditorStore.setIsFile(false);
        }
        else {
            EditorStore.setDeleteFileConfig(fileId, filename, index);
            NoteStore.setModalInfo('fileDelete');
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

    return useObserver(() => (
        <>
            <FileBodyLayout id='fileLayout'>
                {EditorStore.fileLayoutList.map((item, index) => (
                    <FileBody id={item.file_id ? item.file_id : item.user_context_2}
                        key={index}
                        onClick={handleFileBodyClick.bind(null, index)}
                        className={index === EditorStore.selectFileIdx ? 'selected' : ''}
                        onKeyDown={handleKeyDownFile}
                        tabIndex={index}
                        onMouseEnter={handleMouseHover.bind(null, item.file_id)}
                        onMouseLeave={handleMouseLeave}>
                        <FileContent>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={(e) => { e.stopPropagation(); EditorStore.setDownLoadFileId(item.file_id) }} >
                                <FileDownloadIcon>
                                    {hover && item.file_id === hoverFileId ? (<FileDownloadBtn src={downloadBtn} />) : (<FileExtensionBtn src={fileExtension(item.file_extension)} />)}
                                </FileDownloadIcon>
                            </Dropdown>

                            <FileData>
                                <FileDataName>
                                    <FileName>{item.file_name + '.' + item.file_extension}</FileName>
                                </FileDataName>
                                <FileDataTime>
                                    <FileTime>{(item.file_updated_at ? item.file_updated_at : null) + ',' + (item.file_size ? item.file_size : null)}</FileTime>
                                </FileDataTime>
                            </FileData>
                            <FileClose style={PageStore.isReadMode() ? { display: 'none' } : { display: 'flex' }}>
                                <FileCloseBtn src={cancelBtn} onClick={handleFileRemove.bind(null, item.file_id ? item.file_id : item.user_context_2, item.file_name, index)} />
                            </FileClose>
                        </FileContent>
                    </FileBody>
                ))}
            </FileBodyLayout>
        </>
    ))
};

export default FileLayout;