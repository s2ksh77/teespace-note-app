import React, { useEffect } from 'react';
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
import { toJS } from 'mobx';

const FileLayout = () => {
    const { EditorStore, PageStore } = useStore();

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
    const handleFileDown = (fileId) => {
        EditorStore.downloadFile(fileId)
    }
    return useObserver(() => (
        <>
            <FileBodyLayout>
                {EditorStore.fileLayoutList.map((item, index) => (
                    <FileBody id={item.file_id} key={index}>
                        <FileContent>
                            <FileDownloadIcon>
                                <FileDownloadBtn src={downloadBtn} onClick={handleFileDown.bind(null, item.file_id)} />
                            </FileDownloadIcon>
                            <FileExtensionIcon>
                                <FileExtensionBtn src={fileExtension(item.file_extension)} />
                            </FileExtensionIcon>
                            <FileData>
                                <FileDataName>
                                    <FileName>{item.file_name + '.' + item.file_extension}</FileName>
                                </FileDataName>
                                <FileDataTime>
                                    <FileTime>{item.file_updated_at}</FileTime>
                                </FileDataTime>
                            </FileData>
                            <FileClose style={PageStore.isReadMode() ? { display: 'none' } : { display: 'flex' }}>
                                <FileCloseBtn src={cancelBtn} />
                            </FileClose>
                        </FileContent>
                    </FileBody>
                ))}
            </FileBodyLayout>
        </>
    ))
};

export default FileLayout;