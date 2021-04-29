import EditorStore from '../../stores/store/EditorStore';
import { action, computed, flow, observable } from 'mobx';
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
import PageStore from '../../stores/store/PageStore';
import { isFilled } from '../../utils/validators';
import { API } from 'teespace-core';
import NoteStore from '../../stores/store/NoteStore';

// @flow
/**
 * .then(async result => {
        if (result.resultMsg === 'Success') {
            if (item.type === 'image') EditorStore.createDriveElement('image', result.storageFileInfoList[0].file_id, EditorStore.tempFileLayoutList[i].file_name + '.' + EditorStore.tempFileLayoutList[i].file_extension);
            EditorStore.tempFileLayoutList[i].progress = 0;
            EditorStore.tempFileLayoutList[i].file_id = result.storageFileInfoList[0].file_id;
            EditorStore.tempFileLayoutList[i].status = 'uploaded';
            await EditorStore.createFileMeta([result.storageFileInfoList[0].file_id], PageStore.getCurrentPageId());
        } else if (dto.resultMsg === 'Fail') {
            EditorStore.failCount += 1;
            EditorStore.tempFileLayoutList[i].progress = 0;
            EditorStore.tempFileLayoutList[i].error = true;
            EditorStore.tempFileLayoutList[i].status = 'failed';
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
    }).catch(e => {
        if (e !== 'Network Error') {
            if(!EditorStore.tempFileLayoutList[i]) return;
            EditorStore.tempFileLayoutList[i].error = API.isCancel(e) ? API.isCancel(e) : true;
            EditorStore.failCount += 1;
            EditorStore.processLength += 1;
            EditorStore.tempFileLayoutList[i].status = 'canceled'

            const hasPending = EditorStore.tempFileLayoutList.some(file => file['status'] === 'pending');
            if (!hasPending) { // 업로드 중인것이 하나도 없을 때
                EditorStore.uploadDTO = [];
                EditorStore.setProcessLength(0);
                EditorStore.setIsUploading(false);
                if (EditorStore.failCount > 0) { NoteStore.setModalInfo('multiFileSomeFail'); }
                initialFileList();
            }
        }
    })
 */
export const handleUpload = flow(function* handleUpload(item) {
  let targetFile;
  const handleUploadProgress = function (e) {
    const totalLength = e.lengthComputable
      ? e.total
      : e.target.getResponseHeader('content-length') ||
        e.target.getResponseHeader('x-decompressed-content-length');
    targetFile = PageStore.pageModel.fileList.filter(
      file => file.file_id === item.file.uid,
    );
    if (item.type !== 'image') {
      targetFile[0].progress = e.loaded / totalLength;
      targetFile[0].status = 'pending';
    }
  };
  try {
    console.log('item', item);
    const result = yield EditorStore.uploadFileGW(
      item.file,
      item.model.storageFileInfo.file_name,
      item.model.storageFileInfo.file_extension,
      handleUploadProgress,
      item.cancelSource,
    );
    if (result.resultMsg === 'Success') {
      if (item.type === 'image')
        insertImage(
          'image',
          result.storageFileInfoList[0].file_id,
          result.storageFileInfoList[0].file_name,
        );
      yield EditorStore.createFileMeta(
        [result.storageFileInfoList[0].file_id],
        PageStore.pageModel.id,
      );
      targetFile[0].file_id = result.storageFileInfoList[0].file_id;
      targetFile[0].status = 'uploaded';
    }
  } catch (error) {
    console.log(error);
  }
});

export const openSaveDrive = () => {
  EditorStore.setIsSaveDrive(true);
};

export const driveSaveSuccess = () => {
  EditorStore.setIsSaveDrive(false);
  // EditorStore.setIsAttatch(true);
};

export const driveSaveCancel = () => {
  EditorStore.setIsSaveDrive(false);
};

// DriveUtils.getDriveFileInfo 참고
export const isImg = {
  ext: [
    'apng',
    'bmp',
    'gif',
    'jpg',
    'jpeg',
    'jfif',
    'png',
    'rle',
    'die',
    'raw',
  ],
  isPreview: true,
};
// 동영상 html 미지원
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
// 동영상 html 지원
export const isVideoWithPreview = {
  ext: ['mp4', 'ogv', 'webm'],
  isPreview: true,
};
// 오디오
export const isAudio = {
  ext: ['mp3', 'wav', 'ogg', 'flac', 'wma', 'aac'],
  isPreview: true,
};
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
  isPreview: false,
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

export const convertFileSize = bytes => {
  if (bytes == 0) return '0 Bytes';
  let k = 1000,
    dm = 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getFileInfo = file => {
  let fileName = file.name;
  let dotIndex = fileName.lastIndexOf('.');
  let fileExtension = '';
  let fileSize = file.size;
  // 확장자 없으면 file.type === ""
  if (file.type && dotIndex !== -1) {
    fileExtension = fileName.slice(dotIndex + 1);
    fileName = fileName.slice(0, dotIndex);
  }
  return { fileName, fileExtension, fileSize };
};

export const isValidFileNameLength = fileName => {
  if (!isFilled(fileName)) return false; // 파일명 없으면 invalid 처리
  // 혹시 확장자가 없는 경우 대비
  const targetIdx =
    fileName.lastIndexOf('.') !== -1
      ? fileName.lastIndexOf('.')
      : fileName.length;
  if (fileName.slice(0, targetIdx).length > 70) return false; // 파일명 70자 초과는 invalid
  return true;
};

export const downloadFile = (fileId: string) => {
  if (fileId) {
    window.open(
      API.baseURL +
        '/Storage/StorageFile?action=Download' +
        '&fileID=' +
        fileId +
        '&workspaceID=' +
        NoteStore.roomId +
        '&channelID=' +
        NoteStore.chId +
        '&userID=' +
        NoteStore.userId,
    );
    return;
  }

  let a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = EditorStore.editor.selection.getNode().src;
  a.download = EditorStore.editor.selection.getNode().getAttribute('data-name');
  a.click();
  document.body.removeChild(a);
};

const insertImage = (type: string, fileId: string, fileName: string) => {
  const targetSRC = `${API.baseURL}/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteStore.roomId}&channelID=${NoteStore.chId}&userID=${NoteStore.userId}`;
  switch (type) {
    case 'image':
      EditorStore.editor.execCommand(
        'mceInsertContent',
        false,
        '<img id="' +
          fileId +
          '" src="' +
          targetSRC +
          '" data-name="' +
          fileName +
          '"data-mce-src="' +
          targetSRC +
          '"crossorigin="' +
          '*' +
          '"/>',
      );
      break;
    case 'video':
      EditorStore.editor.insertContent(
        `<p>
            <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src='' data-mce-html="%20">
              <video width="400" controls>
                <source src=${targetSRC} />
              </video>
            </span>
          </p>`,
      );
      break;
    default:
      break;
  }
};
