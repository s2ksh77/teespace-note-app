import React from 'react';
import i18n from '../../i18n/i18n';
import useNoteStore from '../../store/useStore';

const SlashCmdNote = () => { 
    const { NoteStore, ChapterStore, PageStore } = useNoteStore();
    let chapterId = ''; 

    const getFirstChapterInfo = async (chId = NoteStore.getChannelId()) => {
        const targetItem = JSON.parse(localStorage.getItem('NoteSortData_' + chId));
         // 챕터가 하나라도 있는 경우
        if(targetItem.length !== 0){
            // 전달된 챕터인지 확인
            const chapterInfo = await ChapterStore.getChapterInfoList(targetItem[0].id);
            if(chapterInfo.type !== 'shared_page' && chapterInfo.type !== 'shared'){
                chapterId = targetItem[0].id
                return true;
            }else{ // 전달 받은거 밖에 없을 경우
                return false;
            }
        }
    }

    const _newPage = () => {
        PageStore.setCreatePageParent(chapterId);
        PageStore.setCreatePageParentIdx(0);
        PageStore.createNotePage();
    }

    const _newChapter = async () => {
        ChapterStore.setChapterTitle(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_01'));
        ChapterStore.getChapterRandomColor();
        await ChapterStore.createNoteChapter();
    }

    const createTarget = async () => {
        const isNewPage = await getFirstChapterInfo();
        if (isNewPage) _newPage();
        else _newChapter();
    }
    
    const slashCmdInit = () => {
        if (NoteStore.isSlashCmd) createTarget();
        else NoteStore.setIsSlashCmd(true);
    }

    slashCmdInit();
}

export default SlashCmdNote