import useNoteStore from '../../store/useStore';
import html2pdf from 'html2pdf.js';
import { toJS } from 'mobx';
import { API } from 'teespace-core';
import { openLink } from '../editor/customLink';
import EditorStore from '../../store/editorStore';
import NoteRepository from '../../store/noteRepository';
import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';
import NoteStore from '../../store/noteStore';
import TagStore from '../../store/tagStore';

export const handleUpload = async () => {
    let uploadArr = [];
    if (EditorStore.uploadDTO) {
        uploadArr = toJS(EditorStore.uploadDTO).map(item => {
            return EditorStore.createUploadMeta(item.uploadMeta, item.type);
        });
        await Promise.all(uploadArr).then(results => {
            if (EditorStore.uploadDTO.length === results.length) {
                for (let i = 0; i < results.length; i++) {
                    (function (result) {
                        if (result.id !== undefined) {
                            const handleUploadProgress = (e) => {
                                const totalLength = e.lengthComputable
                                    ? e.total
                                    : e.target.getResponseHeader('content-length') ||
                                    e.target.getResponseHeader('x-decompressed-content-length');
                                EditorStore.tempFileLayoutList[i].progress = e.loaded / totalLength;
                                EditorStore.tempFileLayoutList[i].file_id = result.id;
                            }
                            EditorStore.createUploadStorage(result.id, EditorStore.uploadDTO[i].file, handleUploadProgress).then(dto => {
                                if (dto.resultMsg === 'Success') {
                                    if (result.type === 'image') EditorStore.createDriveElement('image', result.id, EditorStore.tempFileLayoutList[i].file_name + '.' + EditorStore.tempFileLayoutList[i].file_extension);
                                    EditorStore.tempFileLayoutList[i].progress = 0;
                                } else if (dto.resultMsg === 'Fail') {
                                    EditorStore.failCount++;
                                    EditorStore.tempFileLayoutList[i].progress = 0;
                                    EditorStore.tempFileLayoutList[i].error = true;
                                }
                                EditorStore.processLength++
                                if (EditorStore.processLength == EditorStore.uploadLength) {
                                    EditorStore.uploadDTO = [];
                                    if (EditorStore.failCount > 0) NoteStore.setModalInfo('multiFileSomeFail');
                                    else if (EditorStore.failCount === 0) {
                                        PageStore.getNoteInfoList(PageStore.getCurrentPageId()).then(dto => {
                                            EditorStore.setFileList(
                                                dto.fileList,
                                            );
                                            EditorStore.notSaveFileList = EditorStore.tempFileLayoutList;
                                            EditorStore.tempFileLayoutList = [];
                                        });
                                    }
                                }
                            })
                        }
                    })(results[i])
                }
            }
        })
    }
}

export const driveSuccessCb = (fileList) => {
    if (fileList) {
        EditorStore.setFileLength(fileList.length);
        fileList.forEach(file => EditorStore.addDriveFileList(file));
        handleDriveCopy();
        EditorStore.setIsAttatch(true);
        EditorStore.setIsDrive(false);
    }
}
export const driveCancelCb = () => {
    EditorStore.setIsAttatch(true);
    EditorStore.setIsDrive(false);
    setTimeout(() => { EditorStore.setIsAttatch(false); }, 100)
}

export const handleDriveCopy = async () => {
    let copyArr = [];
    let resultArray = [];
    if (EditorStore.driveFileList) {
        copyArr = toJS(EditorStore.driveFileList).map(item => {
            return EditorStore.storageFileDeepCopy(item.file_id, item.type);
        });
        await Promise.all(copyArr).then(results => {
            if (EditorStore.driveFileList.length === results.length) {
                for (let i = 0; i < results.length; i++) {
                    (function (result) {
                        if (result.id !== undefined) resultArray.push(result.id);
                    })(results[i])
                }
                EditorStore.createFileMeta(resultArray, PageStore.getCurrentPageId()).then(dto => {
                    if (dto.resultMsg === 'Success') {
                        EditorStore.driveFileList = [];
                        if (EditorStore.failCount > 0) NoteStore.setModalInfo('multiFileSomeFail');
                        else if (EditorStore.failCount === 0) {
                            PageStore.getNoteInfoList(PageStore.getCurrentPageId()).then(dto => {
                                EditorStore.setFileList(
                                    dto.fileList,
                                );
                                EditorStore.tempFileLayoutList = [];
                            });
                            EditorStore.setIsAttatch(false);
                        }
                    }
                });
            }
        })
    }
}

export const replaceTempFileId = (node, fileId) => {
    if (!node) return;
    node.setAttribute('id', fileId);
    node.removeAttribute('temp-id');
    if (node.getAttribute('src')) {
        const targetSRC = `${API.baseURL}/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
        node.setAttribute('src', targetSRC);
    }
    if (node.children[0]
        && node.children[0].children[0]
        && node.children[0].children[0].getAttribute('src')) {
        const targetSRC = `${API.baseURL}/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
        node.children[0].children[0].setAttribute('src', targetSRC);
    }
}

export const handleFileDelete = async () => {
    const imgTarget = await EditorStore.tinymce.dom.doc.images;
    const fileTarget = document.querySelectorAll('div #fileLayout [id]');
    const imgArray = [...imgTarget];
    const fileArray = [...fileTarget];

    let deleteArr = [];

    imgArray.forEach(img => EditorStore.tempFileList.push(img.getAttribute('id')));
    fileArray.forEach(file => EditorStore.tempFileList.push(file.getAttribute('id')));

    if (EditorStore.fileList) EditorStore.deleteFileList = EditorStore.fileList.filter(file => !EditorStore.tempFileList.includes(file.file_id))

    if (EditorStore.deleteFileList) {
        deleteArr = toJS(EditorStore.deleteFileList).map(item => {
            return EditorStore.deleteFile(item.file_id)
        })
        try {
            await Promise.all(deleteArr).then(() => {
                EditorStore.deleteFileList = [];
                EditorStore.tempFileList = [];
                PageStore.setContent(EditorStore.tinymce.getContent());
            })
        } catch (e) {

        } finally {

        }
    }
}
export const downloadFile = (fileId) => {
    if (fileId) {
        window.open(API.baseURL + "/Storage/StorageFile?action=Download" + "&fileID=" + fileId + "&workspaceID=" + NoteRepository.WS_ID +
            "&channelID=" + NoteRepository.chId + "&userID=" + NoteRepository.USER_ID);
        return;
    }

    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = EditorStore.tinymce.selection.getNode().src;
    a.download = EditorStore.tinymce.selection.getNode().getAttribute('data-name');
    a.click();
    document.body.removeChild(a);
}

export const makeExportElement = (data, type) => {
    const fragment = document.createElement('div');
    fragment.style.visibility = 'visible';
    fragment.style.opacity = 0;
    fragment.style.width = 'fit-content';
    fragment.setAttribute('id', 'exportTarget');

    const targetDIV = document.createElement('div');
    targetDIV.setAttribute('id', 'exportTargetDiv');
    targetDIV.setAttribute('class', 'export');
    targetDIV.innerHTML = data;
    fragment.appendChild(targetDIV);
    document.body.appendChild(fragment);
    exportDownloadPDF(type);
}
export const exportDownloadPDF = (type) => {
    const element = document.getElementById('exportTargetDiv');
    const opt = {
        margin: 2,
        filename: type === 'page' ? `${PageStore.exportPageTitle}.pdf` : `${ChapterStore.exportChapterTitle}.pdf`,
        pagebreak: { after: '.afterClass', avoid: 'span' },
        image: { type: 'jpeg', quality: 0.98 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    html2pdf(element, opt).then(() => {
        document.getElementById('exportTarget').remove();
    });
}
export const exportChapterData = async () => {
    let returnData = '';
    await NoteRepository.getChapterChildren(ChapterStore.exportChapterId).then((response) => {
        const {
            data: { dto: { noteList } },
        } = response;
        if (noteList.length > 0) {
            noteList.forEach((page, idx) => {
                returnData += `<span style="font-size:24px;">제목 : ${page.note_title}</span><br>${page.note_content}<span class=${idx === (noteList.length - 1) ? '' : "afterClass"}></span>`
            })
        } else return alert('하위에 속한 페이지가 없습니다.');
        makeExportElement(returnData, 'chapter');
    })
}
export const exportPageData = async () => {
    let returnData = '';
    await NoteRepository.getNoteInfoList(PageStore.exportPageId).then(response => {
        const {
            data: { dto },
        } = response;
        PageStore.exportPageTitle = dto.note_title
        returnData = `<span style="font-size:24px;">제목 : ${dto.note_title}</span><br>${dto.note_content}`
    })
    makeExportElement(returnData, 'page');
}

const handleClickLink = (el) => {
    const href = el.getAttribute('href');
    const target = el.getAttribute('target');
    openLink(href, target);
};

const handleClickImg = (el) => {
    if (!PageStore.isReadMode()) return;

    const file = el.getAttribute('data-name').split('.');
    EditorStore.setPreviewFileMeta({
        userId: NoteRepository.USER_ID,
        channelId: NoteRepository.chId,
        roomId: NoteRepository.WS_ID,
        fileId: el.id,
        fileName: file[0],
        fileExtension: file[1],
    })
    EditorStore.setIsPreview(true);
};

export const handleEditorContentsListener = () => {
    if (EditorStore.tinymce) {
        const targetList = EditorStore.tinymce.getBody()?.querySelectorAll(['a', 'img']);
        const targetBody = EditorStore.tinymce.getBody();
        EditorStore.setEditorDOM(targetBody);
        if (targetList && targetList.length > 0) {
            Array.from(targetList).forEach((el) => {
                if (el.getAttribute('hasListener')) return;
                if (el.tagName === 'A') el.addEventListener('click', handleClickLink.bind(null, el));
                else if (el.tagName === 'IMG') el.addEventListener('click', handleClickImg.bind(null, el));
                el.setAttribute('hasListener', true);
            });
        }
        targetBody.addEventListener('click', handleUnselect);
    }
}
export const handleUnselect = () => {
    if (EditorStore.selectFileElement !== '') {
        EditorStore.setFileIndex('');
        EditorStore.setFileElement('');
    }
    if (TagStore.selectTagIdx !== '') {
        TagStore.setSelectTagIndex('')
    }
}

export const handleFileSync = async () => {
    await handleFileDelete();
}

export const handleImageListener = async () => {
    if (EditorStore.tinymce && PageStore.isReadMode()) {
        const targetImageList = await EditorStore.tinymce.dom.doc.images;
        console.log(targetImageList);
    }
}

export const openSaveDrive = () => {
    EditorStore.setIsSaveDrive(true);
    EditorStore.setSaveDriveMeta();
}

export const driveSaveSuccess = () => {
    EditorStore.setIsSaveDrive(false);
    EditorStore.setIsAttatch(true);
}

export const driveSaveCancel = () => {
    EditorStore.setIsSaveDrive(false);
}