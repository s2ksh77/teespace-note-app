import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import EditorStore from '../../store/editorStore';
import GlobalVariable from '../../GlobalVariable';

// 축소모드로 1panel 진입했을 때 사용하기 위한 editor
const TempEditor = () => {
  return (
    <div style={{display:"none"}}>
      <Editor 
        id="tempEditor"
        apiKey={GlobalVariable.apiKey}
        init={{
          setup: function(editor) {
            EditorStore.setTempTinymce(editor);
          }      
        }}
      />
    </div>
  )
};

export default TempEditor;