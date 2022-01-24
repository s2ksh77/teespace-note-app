import React, { useState, useLayoutEffect } from 'react';
import { Table } from 'antd';
import { useCoreStores } from 'teespace-core';
import useNoteStore from '../../store/useStore';

import { TalkTableWrapper as TableWrapper } from '../../style/GNBStyle';
import Content from '../lnb/Content';

const TalkSearch = () => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { roomStore } = useCoreStores();

  const [isRowSelected, setIsRowSelected] = useState(false);

  useLayoutEffect(() => {}, []);

  const handleRowClick = roomId => async () => {
    NoteStore.setWsId(roomId);
    NoteStore.setChannelId(roomStore.getChannelIds(roomId).CHN0003);
    await ChapterStore.fetchChapterList(true);
    setIsRowSelected(true);
  };

  return (
    <>
      {isRowSelected ? (
        <Content selectedMenu="talk" />
      ) : (
        <TableWrapper>
          <Table
            columns={[
              {
                title: '룸 이름',
                dataIndex: 'name',
                fixed: 'top',
              },
              {
                title: '룸 관리자',
                dataIndex: 'adminName',
                fixed: 'top',
              },
              {
                title: '최종 수정 날짜',
                dataIndex: 'modefiedDate',
                fixed: 'top',
              },
            ]}
            dataSource={roomStore
              .getRoomArray()
              .map(room => ({ key: room.id, name: room.name }))}
            onRow={room => ({
              onClick: handleRowClick(room.key),
            })}
            scroll={{ y: 700 }}
            pagination={{
              total: 1000,
              pageSize: 1000,
              hideOnSinglePage: true,
            }}
          />
        </TableWrapper>
      )}
    </>
  );
};

export default TalkSearch;
