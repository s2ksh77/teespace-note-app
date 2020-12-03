import useNoteStore from '../../store/useStore';
import html2pdf from 'html2pdf.js';
import { toJS } from 'mobx';
import { openLink } from '../editor/customLink';
import EditorStore from '../../store/editorStore';
import NoteRepository from '../../store/noteRepository';
import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';

export const handleUpload = () => {
    if (EditorStore.uploadDTO) {
        const _success = (data) => {
            if (data.resultMsg === 'Success') {
                if (EditorStore.uploadDTO.element) replaceTempFileId(EditorStore.uploadDTO.element, data.storageFileInfoList[0].file_id);
                EditorStore.setUploadDTO([]);
                PageStore.getNoteInfoList(PageStore.getCurrentPageId()).then(dto => {
                    EditorStore.setFileList(
                        dto.fileList,
                    );
                });
            } else if (data.resultMsg === 'Fail') {
                EditorStore.uploadDTO.element.remove();
            }
        }
        const _failure = e => {
            console.warn('error ---> ', e);
        };
        try {
            EditorStore.uploadFile(EditorStore.uploadDTO.uploadMeta, EditorStore.uploadDTO.file, _success, _failure)
        } catch (e) {
            console.warn('error ---> ', e);
        } finally { }
    }
}
export const driveSuccessCb = (fileList) => {
    if (fileList) {
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
    if (EditorStore.driveFileList) {
        copyArr = toJS(EditorStore.driveFileList).map(item => {
            return EditorStore.storageFileDeepCopy(item.file_id, item.type);
        });
        await Promise.all(copyArr).then(results => {
            const resultArray = toJS(results).filter(result => result !== undefined);
            EditorStore.driveFileList = [];

            if (resultArray.length > 0) {
                EditorStore.createFileMeta(resultArray, PageStore.getCurrentPageId()).then(dto => {
                    if (dto.resultMsg === 'Success') {
                        PageStore.getNoteInfoList(PageStore.getCurrentPageId()).then(dto => {
                            EditorStore.setFileList(
                                dto.fileList,
                            );
                        });
                    }
                });
            }
            EditorStore.setIsAttatch(false);
        })
    }
}

export const replaceTempFileId = (node, fileId) => {
    if (!node) return;
    node.setAttribute('id', fileId);
    node.removeAttribute('temp-id');
    if (node.getAttribute('src')) {
        const targetSRC = `${NoteRepository.FILE_URL}/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
        node.setAttribute('src', targetSRC);
    }
    if (node.children[0]
        && node.children[0].children[0]
        && node.children[0].children[0].getAttribute('src')) {
        const targetSRC = `${NoteRepository.FILE_URL}/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
        node.children[0].children[0].setAttribute('src', targetSRC);
    }
}

export const handleFileDelete = async () => {
    const imgTarget = await EditorStore.tinymce.dom.doc.images;
    const videoTarget = await EditorStore.tinymce.dom.doc.getElementsByClassName('mce-object-video');
    const fileTarget = document.querySelectorAll('div #fileLayout [id]');
    const imgArray = [...imgTarget];
    const videoArray = [...videoTarget];
    const fileArray = [...fileTarget];

    let deleteArr = [];

    imgArray.forEach(img => EditorStore.tempFileList.push(img.getAttribute('id')));
    videoArray.forEach(video => EditorStore.tempFileList.push(video.getAttribute('id')));
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
        window.open(NoteRepository.FILE_URL + "/Storage/StorageFile?action=Download" + "&fileID=" + fileId + "&workspaceID=" + NoteRepository.WS_ID +
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

export const handleLinkListener = () => {
    if (EditorStore.tinymce) {
        const targetList = EditorStore.tinymce.getBody()?.querySelectorAll('a');
        if (targetList && targetList.length > 0) {
            Array.from(targetList).forEach((el) => {
                if (el.getAttribute('hasListener')) return;
                el.addEventListener('click', handleClickLink.bind(null, el));
                el.setAttribute('hasListener', true);
            });
        }
    }
}

export const handleFileSync = async () => {
    await handleFileDelete();
}

export const handleImageListener = async () => {
    if (EditorStore.tinymce && PageStore.isEdit) {
        const targetImageList = await EditorStore.tinymce.dom.doc.images;
        console.log(targetImageList);
    }
}