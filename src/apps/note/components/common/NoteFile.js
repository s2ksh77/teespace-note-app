import html2pdf from 'html2pdf.js';
import { toJS } from 'mobx';
import { API } from 'teespace-core';
import { openLink } from '../editor/customLink';
import NoteRepository from '../../store/noteRepository';
import NoteStore from '../../store/noteStore';
import ChapterStore from '../../store/chapterStore';
import PageStore from '../../store/pageStore';
import EditorStore from '../../store/editorStore';
import TagStore from '../../store/tagStore';
import { isFilled } from './validators';
// import { defineBoundAction } from 'mobx/lib/internal';

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
                                            EditorStore.processCount = 0;
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
        if (!isValidFileLength(fileList) || !isValidFileSize(fileList)) return;
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

const isValidFileLength = fileList => {
    if (fileList.length > 30) {
        NoteStore.setModalInfo('failUpload');
        return false;
    }
    return true;
}

const isValidFileSize = fileList => {
    const totalSize = 20000000000; // 20GB
    let uploadSize = 0;
    fileList.forEach(file => {
        uploadSize += file.file_size;
    })
    
    if (uploadSize > totalSize) {
        NoteStore.setModalInfo('sizefailUpload');
        return false;
    }
    return true;
}

export const isValidFileNameLength = fileName => {
  if (!isFilled(fileName)) return false; // 파일명 없으면 invalid 처리
  if (fileName.split('.')[0].length > 70) return false; // 파일명 70자 초과는 invalid
  return true;
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
                                EditorStore.processCount = 0;
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

export const exportData = async (isMailShare, type, exportId) => {
    const html =
        type === 'chapter'
            ? await getChapterHtml(exportId)
            : await getPageHtml(exportId);
    if (!html) return;

    makeExportElement(html);
    exportDownloadPDF(isMailShare, type);
};

export const getChapterHtml = async exportId => {
    let html = '';
    const {
        data: { dto: { noteList } },
    } = await NoteRepository.getChapterChildren(exportId);

    if (noteList.length > 0) {
        noteList.forEach((page, idx) => {
            html += `<span style="font-size:24px;">${NoteStore.getI18n('title')} : ${page.note_title}</span><br>${page.note_content}<span class=${idx === (noteList.length - 1) ? '' : "afterClass"}></span>`
        })
    } else alert('하위에 속한 페이지가 없습니다.');

    return html;
};

export const getPageHtml = async exportId => {
    let html = '';
    const {
        data: { dto },
    } = await NoteRepository.getNoteInfoList(exportId);

    PageStore.exportPageTitle = dto.note_title;
    html = `<span style="font-size:24px;">${NoteStore.getI18n('title')} : ${dto.note_title}</span><br>${dto.note_content}`

    return html;
};

export const makeExportElement = html => {
    const fragment = document.createElement('div');
    fragment.style.visibility = 'visible';
    fragment.style.opacity = 0;
    fragment.style.width = 'fit-content';
    fragment.setAttribute('id', 'exportTarget');

    const targetDIV = document.createElement('div');
    targetDIV.setAttribute('id', 'exportTargetDiv');
    targetDIV.setAttribute('class', 'export');
    targetDIV.innerHTML = html;
    fragment.appendChild(targetDIV);
    document.body.appendChild(fragment);
};

export const exportDownloadPDF = (isMailShare, type) => {
    const element = document.getElementById('exportTargetDiv');
    const opt = getExportOpt(type);
    htmlToPdf(isMailShare, element, opt);
};

const getExportOpt = type => {
    const opt = {
        margin: 2,
        filename:
            type === 'chapter'
                ? `${ChapterStore.exportChapterTitle}.pdf`
                : `${PageStore.exportPageTitle}.pdf`,
        pagebreak: { after: '.afterClass', avoid: 'span' },
        image: { type: 'jpeg', quality: 0.98 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };

    return opt;
};

const htmlToPdf = (isMailShare, element, opt) => {
    if (!isMailShare) {
        html2pdf(element, opt).then(() => {
            document.getElementById('exportTarget').remove();
        });
    }
    else {
        html2pdf().set(opt).from(element).toPdf().outputPdf('blob').then((blob) => {
            const pdf = new File([blob], opt.filename, { type: blob.type });
            const fileObjs = [{ originFileObj: pdf, name: opt.filename, uid: '1', type: 'application/pdf', fileSize: pdf.size },];
            NoteStore.setMailShareFileObjs(fileObjs);
            document.getElementById('exportTarget').remove();
            NoteStore.setIsMailShare(true);
        });
    }
};

const downloadTxt = (title, data) => {
    const link = document.createElement('a');
    const mimeType = "text/plain;charset=utf-8";
    link.setAttribute('download', `${title}.txt`);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(data));
    link.click();
}
// txt로 내보내기 전에 setContent해줄 tempEditor init
export const createTempEditor = () => {
    const frag = document.createElement('div');
    frag.setAttribute('id', 'exportTxtParent')
    const area = document.createElement('textarea');
    area.setAttribute('id', 'exportTxt');
    document.body.appendChild(frag);
    frag.appendChild(area);

    EditorStore.tempTinymce.editorManager.init({
        target: area,
        setup: function (editor) {
            EditorStore.setTempTinymce(editor);
        }
    })
    const targetEditor = EditorStore.tempTinymce.editorManager.get('exportTxt');
    return targetEditor;
}

export const getTxtFormat = (title, contents) => {
    const targetEditor = createTempEditor();
    targetEditor.setContent(contents);
    let exportText = targetEditor.getContent({ format: "text" });
    exportText = exportText.replace(/\n\n/g, '\n');
    downloadTxt(title, exportText);
    EditorStore.tempTinymce.remove('#exportTxt')
    document.getElementById('exportTxtParent').remove();
}

export const exportPageAsTxt = async (noteId) => {
    const response = await NoteRepository.getNoteInfoList(noteId);
    const {
        data: { dto },
    } = response;
    // PageStore.exportPageTitle = dto.note_title
    let returnData = `<span style="font-size:24px;">${NoteStore.getI18n('title')} : ${dto.note_title}</span><br />${dto.note_content}`;

    getTxtFormat(dto.note_title, returnData);
}

export const exportChapterAsTxt = async (chapterTitle, chapterId) => {
    let returnData = '';
    const { data: { dto: { noteList } } } = await NoteRepository.getChapterChildren(chapterId);
    if (noteList.length > 0) {
        noteList.forEach((page, idx) => {
            returnData += `<span style="font-size:24px;">${NoteStore.getI18n('title')} : ${page.note_title}</span>
      <br />
      ${page.note_content}
      ${(idx === (noteList.length - 1)) ? '' : '<br />'}`
        })
    } else return alert('하위에 속한 페이지가 없습니다.');

    getTxtFormat(chapterTitle, returnData);
}

const handleClickLink = (el) => {
    // e.preventDefault(); // Mail App 열리는걸 막을 수 없다...!
    const href = el.getAttribute('href');
    const target = el.getAttribute('target');
    openLink({ isOnlyReadMode: true, url: href, target });
};

const handleClickImg = (el) => {
    if (!PageStore.isReadMode()) return;

    const file = el.getAttribute('data-name')?.split('.');
    if (file === undefined) return;
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
    if (PageStore.moveInfoMap.size > 1) {
        PageStore.handleClickOutside();
    }
    if (ChapterStore.moveInfoMap.size > 1) {
        ChapterStore.handleClickOutside();
    }
    //ref 귀찮 - 임시 구현
    const contextMenuList = document.querySelectorAll('div.ant-dropdown');
    [...contextMenuList].forEach(el => {
        if (!el.classList.contains('ant-dropdown-hidden')) {
            el.classList.add('ant-dropdown-hidden');
            NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        }
    })
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

// DriveUtils.getDriveFileInfo 참고
export const isImg = { ext: ['apng', 'bmp', 'gif', 'jpg', 'jpeg', 'jfif', 'png', 'rle', 'die', 'raw'], isPreview: true };
// 동영상 html 미지원
export const isVideoWithoutPreview = { ext: ['mkv', 'avi', 'mpg', 'flv', 'wmv', 'asf', 'asx', 'ogm', '3gp', 'mov', 'dat', 'rm', 'mpe', 'mpeg'], isPreview: false };
// 동영상 html 지원
export const isVideoWithPreview = { ext: ['mp4', 'ogv', 'webm'], isPreview: true };
// 오디오
export const isAudio = { ext: ['mp3', 'wav', 'ogg', 'flac', 'wma', 'aac'], isPreview: true };
// 오피스(파워포인트)
export const isPowerPoint = { ext: ['ppt', 'pptx', 'tpt'], isPreview: false };
// 오피스(워드)
export const isWord = { ext: ['doc', 'docx', 'toc'], isPreview: false };
// 오피스(엑셀)
export const isExcel = { ext: ['xls', 'xlsx', 'tls', 'csv'], isPreview: false };
// 오피스(한글)
export const isHangul = { ext: ['hwp'], isPreview: false };
export const isTxt = { ext: ['txt'], isPreview: false };
export const isPdf = { ext: ['pdf'], isPreview: false };
export const isZip = {
    ext: ['zip', 'tar', 'rar', 'tgz', 'war', 'alz', 'ace', 'arc', 'arj', 'b64', 'bh', 'bhx', 'bin',
        'bz2', 'cab', 'ear', 'enc', 'gz', 'ha', 'hqx', 'ice', 'img', 'jar', 'lha', 'lzh', 'mim', 'pak', 'uue', 'xxe', 'zoo'], isPreview: false
};
export const isEtc = { ext: ['exe', 'psd', 'mui', 'dll'], isPreview: false };

export const fileCategory = {
    isImg,
    isVideoWithoutPreview,
    isVideoWithPreview,
    isAudio, isPowerPoint, isWord, isExcel, isHangul, isTxt, isPdf, isZip, isEtc
}

export const isPreview = (extension) => {
    const cat = Object.keys(fileCategory).find(cat => fileCategory[cat]['ext'].includes(extension));
    if (!cat) return false;
    return fileCategory[cat]["isPreview"];
}

