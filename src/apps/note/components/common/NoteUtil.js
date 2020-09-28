import useStore from "../../store/useStore";

const NoteUtil = {
    SetEditorMode: function () {
        const { PageStore, EditorStore } = useStore();
        console.log(PageStore.isReadMode())
        if (PageStore.isReadMode()) {
            EditorStore.tinymce.setMode('readonly')
            if (document.querySelector('.tox-editor-header')) document.querySelector('.tox-editor-header').style.display = 'none'
        } else {
            EditorStore.tinymce.setMode('design')
            if (document.querySelector('.tox-editor-header')) document.querySelector('.tox-editor-header').style.display = 'block'
        }
    }

}

export default NoteUtil;