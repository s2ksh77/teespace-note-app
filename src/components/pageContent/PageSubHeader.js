import React from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';

import {
  PageSubHeaderContainer,
  ReadModeIcon,
  ReadModeText,
  ReadModeText as ReadModeSubText,
} from '../../styles/EditorStyle';
import lockIcon from '../../assets/lock.svg';

const PageSubHeader = () => {
  const { NoteStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const { t } = useTranslation();

  return useObserver(() => (
    <>
      {PageStore.pageModel?.isReadMode ? (
        <PageSubHeaderContainer>
          <ReadModeIcon src={lockIcon} />
          {authStore.hasPermission('notePage', 'U') ? (
            <>
              <ReadModeText color="#999999">
                {t('NOTE_PAGE_LIST_ADD_NEW_PGE_02')}
              </ReadModeText>
              <ReadModeSubText color="#a3a3a3">
                {t('NOTE_PAGE_LIST_ADD_NEW_PGE_03')}
              </ReadModeSubText>
            </>
          ) : (
            <ReadModeText>{t('NOTE_GUEST_01')}</ReadModeText>
          )}
        </PageSubHeaderContainer>
      ) : null}
    </>
  ));
};

export default PageSubHeader;
