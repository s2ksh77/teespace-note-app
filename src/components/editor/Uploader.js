import React, { useEffect, useRef } from 'react';
import { Button, Upload } from 'antd';
import { handleUpload, isValidFileNameLength } from '../common/NoteFile';
import { API } from 'teespace-core';
import NoteRepository from '../../store/noteRepository';
import StorageModel from '../../store/model/StorageModel';
import { useNoteStore } from '../../external';
import { useObserver } from 'mobx-react';

const HandleUploader = ({ isWeb }) => {
  const { EditorStore, NoteStore } = useNoteStore();
  const uploaderRef = useRef('');

  const uploadProps = {
    beforeUpload: async (file, fileList) => {
      let uploadsize = 0;
      let totalsize = 21474836480; // 20GB

      if (file === fileList[0]) {
        const filtered = fileList.filter(file => isValidFileNameLength(file.name));
        if (fileList.length !== filtered.length) {
          if (filtered.length === 0) {
            NoteStore.setModalInfo('failUploadByFileNameLen');
            return;
          }
        }
        EditorStore.setTotalUploadLength(fileList.length); // 실패가 되어도 전체 선택한 length 필요
        EditorStore.setFileLength(filtered.length);

        if (EditorStore.uploadLength > 30) {
          NoteStore.setModalInfo('failUpload');
          return;
        }

        if (filtered) {
          for (let i = 0; i < filtered.length; i++) {
            uploadsize += filtered[i].size;
          }
          if (uploadsize > totalsize) {
            NoteStore.setModalInfo('sizefailUpload');
            return;
          }
          if (!EditorStore.checkUploadUsage(uploadsize)) {
            NoteStore.setModalInfo('failUploadSpaceFullSize');
            return;
          }
        }
        setTimeout(() => {
          for (let i = 0; i < filtered.length; i++) {
            (function (file) {
              const { fileName, fileExtension, fileSize } = EditorStore.getFileInfo(file);
              const type =
                fileExtension && EditorStore.uploadFileIsImage(fileExtension)
                  ? 'image'
                  : 'file';
              const cancelToken = new API.CancelToken.source();
              const model = new StorageModel({
                workspace_id: NoteRepository.WS_ID,
                channel_id: NoteRepository.chId,
                storageFileInfo: {
                  user_id: NoteRepository.USER_ID,
                  file_last_update_user_id: NoteRepository.USER_ID,
                  file_name: fileName,
                  file_extension: fileExtension,
                  file_size: fileSize,
                },
              });
              EditorStore.setUploadFileDTO(model, filtered[i], type, cancelToken);
            })(filtered[i]);
          }
          if (fileList.length !== filtered.length) {
            EditorStore.failCount = fileList.length - filtered.length;
            NoteStore.setModalInfo('failUploadByFileNameLen');
          } else if (EditorStore.uploadDTO.length === EditorStore.uploadLength)
            EditorStore.uploadDTO.forEach(item => handleUpload(item));
        }, 1);
      }
      return false;
    },
    showUploadList: false,
    multiple: true,
  };
  useEffect(() => {
    EditorStore.setUploaderRef(uploaderRef.current);
    EditorStore.getStorageVolume();
    return () => EditorStore.setUploaderRef('');
  }, []);

  return useObserver(() => (
    <div style={{ display: isWeb ? 'flex' : 'none' }}>
      <Upload
        {...uploadProps}
        accept={EditorStore.uploaderType === 'image' ? 'image/*, video/*' : 'file'}
      >
        <Button ref={uploaderRef} />
      </Upload>
    </div>
  ));
};

export default HandleUploader;
