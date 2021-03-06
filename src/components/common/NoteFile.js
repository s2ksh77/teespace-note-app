import html2pdf from 'html2pdf.js';
import { toJS, flow } from 'mobx';
import { API } from 'teespace-core';
import { openLink } from '../editor/customLink';
import NoteRepository from '../../store/noteRepository';
import NoteStore from '../../store/noteStore';
import ChapterStore from '../../store/chapterStore';
import PageStore from '../../store/pageStore';
import EditorStore from '../../store/editorStore';
import TagStore from '../../store/tagStore';
import { isFilled } from './validators';
import i18n from '../../i18n/i18n';
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
import NoteUtil, { getExtension, getRelativeUrl, isAvailableUrl } from '../../NoteUtil';
// import { defineBoundAction } from 'mobx/lib/internal';

// @flow
export const handleUpload = flow(function* handleUpload(item) {
  let targetFile;
  const handleUploadProgress = function (e) {
    const totalLength = e.lengthComputable
      ? e.total
      : e.target.getResponseHeader('content-length') ||
        e.target.getResponseHeader('x-decompressed-content-length');

    targetFile = EditorStore.fileLayoutList.filter(
      file => file.file_id === item.file.uid,
    )[0];

    if (item.type !== 'image' && targetFile) {
      targetFile.progress = e.loaded / totalLength;
      targetFile.status = 'pending';
    }
  };
  try {
    const duplicateName = yield EditorStore.getDuflicateFile(
      fixedEncodeURIComponent(item.model.storageFileInfo.file_name),
      item.model.storageFileInfo.file_extension,
    );
    EditorStore.setIsUploading(true);
    const res = yield EditorStore.uploadFileGW(
      item.file,
      duplicateName,
      item.model.storageFileInfo.file_extension,
      fixedEncodeURIComponent(
        duplicateName + '.' + item.model.storageFileInfo.file_extension,
      ),
      handleUploadProgress,
      item.cancelSource,
    ).catch(e => {
      if (e !== 'Network Error') {
        if (!targetFile) return;
        targetFile.error = API.isCancel(e) ? API.isCancel(e) : true;
        targetFile.status = 'canceled';
        EditorStore.failCount += 1;
        EditorStore.processLength += 1;

        const hasPending = EditorStore.fileLayoutList.some(
          file => file['status'] === 'pending',
        );
        if (!hasPending) {
          // ????????? ???????????? ????????? ?????? ???
          EditorStore.uploadDTO = [];
          EditorStore.setProcessLength(0);
          EditorStore.setIsUploading(false);
          if (EditorStore.failCount > 0) {
            NoteStore.setModalInfo('multiFileSomeFail');
          }
          initialFileList();
        }
      }
    });
    if (res) {
      let fileId = res.file[0].file_id;
      let fileName = res.file[0].file_name + '.' + res.file[0].file_extension;

      if (res.result === 'Y') {
        if (item.type === 'image')
          EditorStore.createDriveElement('image', fileId, fileName);
        yield EditorStore.createFileMeta([fileId], PageStore.getCurrentPageId());
        if (item.type !== 'image' && targetFile) {
          targetFile.file_id = fileId;
          targetFile.status = 'uploaded';
        }
      } else if (res.result === 'Fail') {
        EditorStore.failCount += 1;
        targetFile.progress = 0;
        targetFile.error = true;
        targetFile.status = 'failed';
      }
      EditorStore.processLength += 1;
      if (EditorStore.processLength == EditorStore.uploadLength) {
        EditorStore.uploadDTO = [];
        EditorStore.setProcessLength(0);
        EditorStore.setIsUploading(false);
        if (EditorStore.failCount > 0) {
          NoteStore.setModalInfo('multiFileSomeFail');
          initialFileList();
        } else if (EditorStore.failCount === 0) initialFileList();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const initialFileList = () => {
  if (EditorStore.uploadFileCancelStatus) {
    PageStore.handleSave();
    EditorStore.uploadFileCancelStatus = false;
    EditorStore.setProcessCount(0);
    EditorStore.setFailCount(0);
  } else {
    PageStore.getNoteInfoList(PageStore.getCurrentPageId()).then(() => {
      EditorStore.setProcessCount(0);
      EditorStore.setFailCount(0);
    });
  }
};

export const driveSuccessCb = fileList => {
  if (fileList) {
    if (!isValidFileLength(fileList) || !isValidFileSize(fileList)) return;
    EditorStore.setFileLength(fileList.length);
    fileList.forEach(file => EditorStore.addDriveFileList(file));
    handleDriveCopy();
    EditorStore.setIsAttatch(true);
    EditorStore.setIsDrive(false);
  }
};
export const driveCancelCb = () => {
  EditorStore.setIsAttatch(true);
  EditorStore.setIsDrive(false);
  setTimeout(() => {
    EditorStore.setIsAttatch(false);
  }, 100);
};

const isValidFileLength = fileList => {
  if (fileList.length > 30) {
    NoteStore.setModalInfo('failUpload');
    return false;
  }
  return true;
};

const isValidFileSize = fileList => {
  const totalSize = 20000000000; // 20GB
  const uploadSize = fileList.reduce(
    (accumulator, current) => accumulator + current.file_size,
    0,
  );

  if (uploadSize > totalSize) {
    NoteStore.setModalInfo('sizefailUpload');
    return false;
  }
  if (!EditorStore.checkUploadUsage(uploadSize)) {
    NoteStore.setModalInfo('failUploadSpaceFullSize');
    EditorStore.setIsAttatch(true);
    EditorStore.setIsDrive(false);
    return false;
  }
  return true;
};

export const isValidFileNameLength = fileName => {
  if (!isFilled(fileName)) return false; // ????????? ????????? invalid ??????
  if (fileName.length > 70) return false;
  // ?????? ???????????? ?????? ?????? ??????
  const targetIdx =
    fileName.lastIndexOf('.') !== -1 ? fileName.lastIndexOf('.') : fileName.length;
  if (fileName.slice(0, targetIdx).length > 70) return false; // ????????? 70??? ????????? invalid
  return true;
};

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
          })(results[i]);
        }
        EditorStore.createFileMeta(resultArray, PageStore.getCurrentPageId()).then(
          dto => {
            if (dto.resultMsg === 'Success') {
              EditorStore.driveFileList = [];
              if (EditorStore.failCount > 0) NoteStore.setModalInfo('multiFileSomeFail');
              else if (EditorStore.failCount === 0) {
                PageStore.getNoteInfoList(PageStore.getCurrentPageId()).then(
                  () => (EditorStore.processCount = 0),
                );
                EditorStore.setIsAttatch(false);
              }
            }
          },
        );
      }
    });
  }
};

export const handleFileDelete = async () => {
  const imgTarget = await EditorStore.tinymce.dom.doc.images;
  const fileTarget = document.querySelectorAll('div #fileLayout [id]');
  const imgArray = [...imgTarget];
  const fileArray = [...fileTarget];

  let deleteArr = [];

  imgArray.forEach(img => EditorStore.tempFileList.push(img.getAttribute('id')));
  fileArray.forEach(file => EditorStore.tempFileList.push(file.getAttribute('id')));
  if (EditorStore.fileList)
    EditorStore.deleteFileList = EditorStore.fileList.filter(
      file => !EditorStore.tempFileList.includes(file.file_id),
    );

  if (EditorStore.deleteFileList) {
    deleteArr = toJS(EditorStore.deleteFileList).map(item => {
      return EditorStore.deleteFile(item.file_id);
    });
    try {
      await Promise.all(deleteArr).then(() => {
        EditorStore.deleteFileList = [];
        EditorStore.tempFileList = [];
        PageStore.setContent(EditorStore.tinymce.getContent());
      });
    } catch (e) {
    } finally {
    }
  }
};
export const downloadFile = async fileId => {
  if (fileId) {
    const url =
      `${API.baseURL}/Storage/StorageFile?action=Download` +
      `&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;

    const a = document.createElement('a');
    a.style = 'display: none';
    a.href = url;
    a.target = '_blank';
    a.download = '';
    a.click();
    a.remove();
    return;
  }
  const res = await fetch(EditorStore.tinymce.selection.getNode().src);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style = 'display: none';
  a.href = url;
  a.download = EditorStore.tinymce.selection.getNode().getAttribute('data-name')
    ? EditorStore.tinymce.selection.getNode().getAttribute('data-name')
    : EditorStore.tinymce.selection.getNode().getAttribute('alt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const exportData = async (isMailShare, type, exportId) => {
  const html =
    type === 'chapter' ? await getChapterHtml(exportId) : await getPageHtml(exportId);
  if (!html) return;

  makeExportElement(html);
  exportDownloadPDF(isMailShare, type);
};

export const getChapterHtml = async exportId => {
  let html = '<div style="color: #000;">';
  const {
    data: {
      dto: { noteList },
    },
  } = await NoteRepository.getChapterChildren(exportId);

  const orderedPageList = ChapterStore.getLocalOrderPageList(
    NoteStore.getChannelId(),
    exportId,
    noteList,
  );

  if (orderedPageList.length > 0) {
    orderedPageList.forEach((page, idx) => {
      html += `<span style="font-size:24px;">${i18n.t('NOTE_EXPORT_TITLE')} : ${
        page.note_title
      }</span><p><br></p>${NoteUtil.decodeStr(page.note_content)}<span class=${
        idx === orderedPageList.length - 1 ? '' : 'afterClass'
      }></span>`;
    });
  } else
    html += `<span style="font-size:24px;">${i18n.t('NOTE_EXPORT_TITLE')} : ${
      ChapterStore.exportChapterTitle
    }</span>`;
  return `${html}</div>`;
};

export const getPageHtml = async exportId => {
  let html = '';
  const {
    data: { dto },
  } = await NoteRepository.getNoteInfoList(exportId);

  PageStore.exportPageTitle = dto.note_title;
  html = `<div style="color: #000;"><span style="font-size:24px;">${i18n.t(
    'NOTE_EXPORT_TITLE',
  )} : ${dto.note_title}</span><p><br></p>${NoteUtil.decodeStr(dto.note_content)}<div/>`;

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

const preloadingImage = el => {
  return new Promise((resolve, reject) => {
    el.onload = () => resolve();
  });
};

export const exportDownloadPDF = async (isMailShare, type) => {
  const imgElementList = document
    .getElementById('exportTargetDiv')
    .querySelectorAll('img');
  const opt = getExportOpt(type);
  let requests = [];
  if (imgElementList && imgElementList.length > 0) {
    requests = [...imgElementList].map(el => {
      el.setAttribute('style', 'width: 100%;');
      return preloadingImage(el);
    });
    // setTimeout(async () => {
    await Promise.all(requests).then(() => {
      const element = document.getElementById('exportTargetDiv');
      htmlToPdf(isMailShare, element, opt);
    });
    // }, 1000)
  } else {
    const element = document.getElementById('exportTargetDiv');
    htmlToPdf(isMailShare, element, opt);
  }
};

const getExportOpt = type => {
  const opt = {
    margin: 2,
    filename:
      type === 'chapter'
        ? `${ChapterStore.exportChapterTitle}.pdf`
        : `${PageStore.exportPageTitle}.pdf`,
    pagebreak: { after: '.afterClass', avoid: 'span' },
    image: { type: 'png', quality: 0.98 },
    html2canvas: {
      scale: 1,
      letterRendering: true,
      useCORS: true,
      allowTaint: true,
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      usePromise: true,
    },
  };

  return opt;
};

const htmlToPdf = (isMailShare, element, opt) => {
  if (!isMailShare) {
    html2pdf(element, opt).then(() => {
      document.getElementById('exportTarget').remove();
      // loading ?????? ?????????
      NoteStore.setIsExporting(false);
    });
  } else {
    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .outputPdf('blob')
      .then(blob => {
        const pdf = new File([blob], opt.filename, { type: blob.type });
        const fileObjs = [
          {
            originFileObj: pdf,
            name: opt.filename,
            uid: '1',
            type: 'application/pdf',
            fileSize: pdf.size,
          },
        ];
        NoteStore.setMailShareFileObjs(fileObjs);
        document.getElementById('exportTarget').remove();
        // loading ?????? ?????????
        NoteStore.setIsExporting(false);
        NoteStore.setIsMailShare(true);
      });
  }
};

const downloadTxt = (title, data) => {
  const link = document.createElement('a');
  const mimeType = 'text/plain;charset=utf-8';
  link.setAttribute('download', `${title}.txt`);
  link.setAttribute(
    'href',
    'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(data),
  );
  link.click();
};

export const getTxtFormat = (title, contents) => {
  const div = document.createElement('div');
  div.innerHTML = contents;
  downloadTxt(title, div.innerText);
  NoteStore.setIsExporting(false);
};

export const exportPageAsTxt = async noteId => {
  const response = await NoteRepository.getNoteInfoList(noteId);
  const {
    data: { dto },
  } = response;

  const returnData = `<p>${i18n.t('NOTE_EXPORT_TITLE')} : ${
    dto.note_title
  }</p>\n${NoteUtil.decodeStr(dto.note_content)}`;

  getTxtFormat(dto.note_title, returnData);
};

export const exportChapterAsTxt = async (chapterTitle, chapterId) => {
  let returnData = '';
  const {
    data: {
      dto: { noteList },
    },
  } = await NoteRepository.getChapterChildren(chapterId);

  const orderedPageList = ChapterStore.getLocalOrderPageList(
    NoteStore.getChannelId(),
    chapterId,
    noteList,
  );

  if (orderedPageList.length > 0) {
    orderedPageList.forEach((page, idx) => {
      returnData += `<p>${i18n.t('NOTE_EXPORT_TITLE')} : ${
        page.note_title
      }</p>\n${NoteUtil.decodeStr(page.note_content)}${
        idx === orderedPageList.length - 1 ? '' : '\n\n'
      }`;
    });
  } else returnData += `<p>${i18n.t('NOTE_EXPORT_TITLE')} : ${chapterTitle}</p>`;

  getTxtFormat(chapterTitle, returnData);
};

const handleClickLink = el => {
  // e.preventDefault(); // Mail App ???????????? ?????? ??? ??????...!
  const href = el.getAttribute('href');
  const target = el.getAttribute('target');
  openLink({ isOnlyReadMode: true, url: href, target });
};

const handleClickImg = el => {
  if (!PageStore.isReadMode() || PageStore.isRecycleBin) return;

  const file = el.getAttribute('data-name')?.split('.');
  const fileExtension = getExtension(el.getAttribute('data-name'))
    ? getExtension(el.getAttribute('data-name'))
    : 'jpg';
  if (file === undefined) return;
  EditorStore.setPreviewFileMeta({
    userId: NoteRepository.USER_ID,
    channelId: NoteRepository.chId,
    roomId: NoteRepository.WS_ID,
    fileId: el.id,
    fileName: file[0],
    fileExtension,
  });
  EditorStore.setIsPreview(true);
};

export const handleEditorContentsListener = () => {
  if (EditorStore.tinymce) {
    const targetList = EditorStore.tinymce
      .getBody()
      ?.querySelectorAll(['a', 'img', 'pre']);
    const targetBody = EditorStore.tinymce.getBody();
    EditorStore.setEditorDOM(targetBody);
    if (targetList && targetList.length > 0) {
      Array.from(targetList).forEach(el => {
        if (el.getAttribute('hasListener')) return;
        if (el.tagName === 'IMG') {
          el.addEventListener('click', handleClickImg.bind(null, el));
          if (!isAvailableUrl(el.getAttribute('src'))) {
            el.setAttribute('src', getRelativeUrl(el.getAttribute('src')));
            el.removeAttribute('data-mce-src');
          }
        } else if (el.tagName === 'PRE') {
          el.style.backgroundColor =
            EditorStore.tinymce.settings.skin === 'oxide' ? '#f7f4ef' : '#171819';
        }
        el.setAttribute('hasListener', true);
      });
    }
    targetBody.addEventListener('click', handleUnselect);
  }
};
export const handleUnselect = () => {
  const selectEle = document.querySelector('.fileSelected');
  if (selectEle) selectEle.classList.remove('fileSelected');
  // if (TagStore.selectTagIdx !== '') {
  //     TagStore.setSelectTagIndex('')
  // }
  if (PageStore.dragData.size > 1) NoteStore.handleClickOutside('Page');
  if (ChapterStore.dragData.size > 1) NoteStore.handleClickOutside('Chapter');
  EditorStore.handleMenuHidden(true);
  //ref ?????? - ?????? ??????
  const contextMenuList = document.querySelectorAll('div.ant-dropdown');
  [...contextMenuList].forEach(el => {
    if (!el.classList.contains('ant-dropdown-hidden')) {
      el.classList.add('ant-dropdown-hidden');
      NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
    }
  });
};

export const handleFileSync = async () => {
  await handleFileDelete();
};

export const openSaveDrive = () => {
  EditorStore.setIsSaveDrive(true);
  EditorStore.setSaveDriveMeta();
};

export const driveSaveSuccess = () => {
  EditorStore.setIsSaveDrive(false);
  EditorStore.setIsAttatch(true);
};

export const driveSaveCancel = () => {
  EditorStore.setIsSaveDrive(false);
};

// DriveUtils.getDriveFileInfo ??????
export const isImg = {
  ext: ['apng', 'bmp', 'gif', 'jpg', 'jpeg', 'jfif', 'png', 'rle', 'die', 'raw'],
  isPreview: true,
};
// ????????? html ?????????
export const isVideoWithoutPreview = {
  ext: [
    'mkv',
    'avi',
    'mpg',
    'flv',
    'wmv',
    'asf',
    'asx',
    'ogm',
    '3gp',
    'mov',
    'dat',
    'rm',
    'mpe',
    'mpeg',
  ],
  isPreview: false,
};
// ????????? html ??????
export const isVideoWithPreview = {
  ext: ['mp4', 'ogv', 'webm'],
  isPreview: true,
};
// ?????????
export const isAudio = {
  ext: ['mp3', 'wav', 'ogg', 'flac', 'wma', 'aac'],
  isPreview: true,
};
// ?????????(???????????????)
export const isPowerPoint = { ext: ['ppt', 'pptx', 'tpt'], isPreview: true };
// ?????????(??????)
export const isWord = { ext: ['doc', 'docx', 'toc'], isPreview: true };
// ?????????(??????)
export const isExcel = { ext: ['xls', 'xlsx', 'tls', 'csv'], isPreview: true };
// ?????????(??????)
export const isHangul = { ext: ['hwp'], isPreview: false };
export const isTxt = { ext: ['txt'], isPreview: false };
export const isPdf = { ext: ['pdf'], isPreview: true };
export const isZip = {
  ext: [
    'zip',
    'tar',
    'rar',
    'tgz',
    'war',
    'alz',
    'ace',
    'arc',
    'arj',
    'b64',
    'bh',
    'bhx',
    'bin',
    'bz2',
    'cab',
    'ear',
    'enc',
    'gz',
    'ha',
    'hqx',
    'ice',
    'img',
    'jar',
    'lha',
    'lzh',
    'mim',
    'pak',
    'uue',
    'xxe',
    'zoo',
  ],
  isPreview: true,
};
export const isEtc = { ext: ['exe', 'psd', 'mui', 'dll'], isPreview: false };

export const fileCategory = {
  isImg,
  isVideoWithoutPreview,
  isVideoWithPreview,
  isAudio,
  isPowerPoint,
  isWord,
  isExcel,
  isHangul,
  isTxt,
  isPdf,
  isZip,
  isEtc,
};

export const isPreview = extension => {
  const cat = Object.keys(fileCategory).find(cat =>
    fileCategory[cat]['ext'].includes(extension),
  );
  if (!cat) return false;
  return fileCategory[cat]['isPreview'];
};

export const fileExtension = extension => {
  // driveGetFileIcon(fileName)
  const cat = Object.keys(fileCategory).find(cat =>
    fileCategory[cat]['ext'].includes(extension),
  );
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
    default:
      return etc;
  }
};

export const getOS = () => {
  const { userAgent, platform } = window.navigator;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
};

export const fixedEncodeURIComponent = str => {
  const OS = getOS();
  const forEncodeStr = OS === 'Mac OS' || OS === 'iOS' ? str.normalize('NFC') : str;
  const encodeURIString = encodeURIComponent(forEncodeStr).replace(/[!'()*]/g, c => {
    return `%${c.charCodeAt(0).toString(16)}`;
  });
  return encodeURIString;
};
