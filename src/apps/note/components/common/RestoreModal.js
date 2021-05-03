import React, {useState} from 'react';
import {
  RestoreModalWrapper,
	RestoreModalBody,
	RestoreChapterText,
	RestoreModalFooter
} from '../../styles/commonStyle';
import useNoteStore from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import NoteUtil from '../../NoteUtil';
import { Radio, Space } from 'antd';
import { Button } from 'teespace-core';
import styled from 'styled-components';

const LeftButton = styled(Button)`
	margin-right: 0.19rem;
`

const RightButton = styled(Button)`
	margin-left: 0.19rem;
`;

/**
 * state 관리 때문에 footer도 여기에
 */
const RestoreModal = () => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
	const [selectedId, setSelectedId] = useState('');

	const handleChange = e => setSelectedId(e.target.value);

  const chapterList = ChapterStore.chapterList.filter(chapter => NoteUtil.getChapterNumType(chapter.type) <= 1);
  
	const handleCancel = e => {
		e.stopPropagation();
		NoteStore.setModalInfo(null);
	}

	const handleClickRestore = () => {
		// 복구 로직 넣기, 선택된 챕터는 selectedId임

		NoteStore.setModalInfo(null); // 임시로 넣음
	}

  return (
    <RestoreModalWrapper>
			<RestoreModalBody>
				<Radio.Group onChange={handleChange} value={selectedId}>
					<Space direction="vertical">
						{chapterList.map(chapter => (
							<Radio key={chapter.id} value={chapter.id}>{chapter.text}</Radio>
						))}
					</Space>
				</Radio.Group>
			</RestoreModalBody>
			<RestoreModalFooter>
				<LeftButton key="confirm" type="solid" shape="defualt" disabled={selectedId === ''} onClick={handleClickRestore}>
					{t('NOTE_CONTEXT_MENU_02')}
				</LeftButton>
				<RightButton key="cancel" type="oulined" shape="defualt" onClick={handleCancel}>
					{t('NOTE_PAGE_LIST_CREATE_N_CHPT_03')}
				</RightButton>
			</RestoreModalFooter>			
    </RestoreModalWrapper>
  )
}

export default RestoreModal;