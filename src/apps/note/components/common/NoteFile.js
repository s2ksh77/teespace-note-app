import useNoteStore from '../../store/useStore';
import html2pdf from 'html2pdf.js';
import { toJS } from 'mobx';
import { openLink } from '../editor/customLink';
import EditorStore from '../../store/editorStore';
import NoteRepository from '../../store/noteRepository';
import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';

export const handleFileUpload = async () => {
    const imgTarget = await EditorStore.tinymce.dom.doc.images;
    const videoTarget = await EditorStore.tinymce.dom.doc.getElementsByClassName('mce-object-video');
    const fileTarget = document.querySelectorAll('div[temp-id]');
    const imgArray = [...imgTarget];
    const videoArray = [...videoTarget];
    const fileArray = [...fileTarget];
    let uploadArr = [];

    imgArray.forEach(img => {
        if (EditorStore.fileMetaList.filter(item => item.KEY === img.getAttribute('temp-id'))[0] !== undefined)
            EditorStore.uploadFileList.push(EditorStore.fileMetaList.filter(item => item.KEY === img.getAttribute('temp-id'))[0]);
    })
    videoArray.forEach(video => {
        if (EditorStore.fileMetaList.filter(item => item.KEY === video.getAttribute('temp-id'))[0] !== undefined)
            EditorStore.uploadFileList.push(EditorStore.fileMetaList.filter(item => item.KEY === video.getAttribute('temp-id'))[0]);
    })
    fileArray.forEach(file => {
        if (EditorStore.fileMetaList.filter(item => item.KEY === file.getAttribute('temp-id'))[0] !== undefined)
            EditorStore.uploadFileList.push(EditorStore.fileMetaList.filter(item => item.KEY === file.getAttribute('temp-id'))[0]);
    })

    const _success = (data, index) => {
        if (data.resultMsg === 'Success') {
            EditorStore.uploadFileList[index].element.setAttribute('id', data.storageFileInfoList[0].file_id);
            EditorStore.uploadFileList[index].element.removeAttribute('temp-id');
            if (EditorStore.uploadFileList[index].element) {
                if (EditorStore.uploadFileList[index].element.getAttribute('src')) {
                    const targetSRC = `${NoteRepository.FILE_URL}Storage/StorageFile?action=Download&fileID=${data.storageFileInfoList[0].file_id}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
                    EditorStore.uploadFileList[index].element.setAttribute('src', targetSRC);
                }
                if (EditorStore.uploadFileList[index].element.children[0]
                    && EditorStore.uploadFileList[index].element.children[0].children[0]
                    && EditorStore.uploadFileList[index].element.children[0].children[0].getAttribute('src')) {
                        const targetSRC = `${NoteRepository.FILE_URL}Storage/StorageFile?action=Download&fileID=${data.storageFileInfoList[0].file_id}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
                        EditorStore.uploadFileList[index].element.children[0].children[0].setAttribute('src', targetSRC);
                }
            }
        }
    }
    const _failure = e => {
        console.warn('error ---> ', e);
    };
    if (EditorStore.uploadFileList.length > 0) {
        if (EditorStore.uploadFileList[0] !== undefined) {
            uploadArr = toJS(EditorStore.uploadFileList).map((item, index) => {
                return EditorStore.uploadFile(item.uploadMeta, item.file, _success, _failure, index)
            })

            try {
                await Promise.all(uploadArr).then(() => {
                    EditorStore.uploadFileList = [];
                    EditorStore.fileMetaList = [];
                    PageStore.setContent(EditorStore.tinymce.getContent());
                })
            } catch (e) {

            } finally {

            }
        }
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
        window.open(NoteRepository.FILE_URL + "Storage/StorageFile?action=Download" + "&fileID=" + fileId + "&workspaceID=" + NoteRepository.WS_ID +
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
    await handleFileUpload();
    await handleFileDelete();
}