import { useEffect } from 'react';
import useNoteStore from '../../store/useStore';

/**
 * editor setting에 있던 옵션들 제거함
 * - plugins에서 autosave 제거
 * - autosave_interval: '1s',
 * - autosave_prefix: `Note_autosave_${NoteStore.notechannel_id}_${PageStore.currentPageId}`,
 * why) 읽기모드에서도 계속 갱신됨, autosave_prefix가 한 번 mount된 이후로 바뀌지 않음(language처럼)
 * 따라서 따로 훅 만듦
 */
const useSave = () => {
	const { NoteStore, PageStore, EditorStore, TagStore } = useNoteStore();

	// auto save
  useEffect(() => {
    if (!PageStore.isReadMode()) {

      const toServerId = setInterval(() => {
        PageStore.handleSave(true); // 저장 후 콜백에서 localStorage.removeItem 한다
      }, 60000);

			// 수정모드일 때 : localStorage에 저장하기
      const toLocalId = setInterval(() => {
				if (!NoteStore.notechannel_id || !PageStore.currentPageId) return; // 에러 방지
				// EditorStore.tinymce?.getContent()를 넣으면 초마다 postProcess 이벤트가 터져서 PageStore.noteContent 넣음
        localStorage.setItem(`Note_autosave_${NoteStore.notechannel_id}_${PageStore.currentPageId}`, PageStore.noteContent);
      }, 1000);

      // test할 때 beforeunload evet도 주석처리해야함      
      // console.log('이제부터 15초후에 비정상 종료')
			// const testId = setTimeout(() => { 
			// 	console.log('비정상 종료 test!')
			// 	throw new Error('비정상 종료 test');
			// }, 15000);

      return () => {
        // if (testId) clearTimeout(testId); // test
        if (toServerId) clearInterval(toServerId);
        if (toLocalId) clearInterval(toLocalId);
      };
    }
  }, [PageStore.isReadMode()]);
}

export default useSave;