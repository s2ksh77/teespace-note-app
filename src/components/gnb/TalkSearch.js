import React, { useState, useLayoutEffect } from 'react';
import { Table } from 'antd';
import { useCoreStores } from 'teespace-core';
import useNoteStore from '../../store/useStore';

import { TalkTableWrapper as TableWrapper } from '../../style/GNBStyle';
import Content from '../lnb/Content';

const TalkSearch = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { roomStore, userStore } = useCoreStores();

  const [isRowSelected, setIsRowSelected] = useState(false);
  const [roomData, setRoomData] = useState([]);

  const handleRowClick = (roomId, roomName) => async () => {
    NoteStore.setWsId(roomId);
    NoteStore.setChannelId(roomStore.getChannelIds(roomId).CHN0003);
    await ChapterStore.fetchChapterList(true);
    setIsRowSelected(true);
    NoteStore.setTalkTitle(roomName);
  };

  const fetchRoomData = async () => {
    NoteStore.setIsFetchingGNBContent(true);
    setRoomData(
      await Promise.all(
        roomStore.getRoomArray().map(async room => {
          const admin = await userStore.getProfile(room.adminId);
          const { noteList } = await PageStore.getRecentList(1, roomStore.getChannelIds(room.id).CHN0003);
          const modifier = noteList[0]?.USER_ID ? await userStore.getProfile(noteList[0]?.USER_ID) : undefined;
          return {
            key: room.id,
            name: room.name,
            adminName: admin.displayName,
            modifiedDate: `${noteList[0]?.modified_date?.split(' ')[0] ?? ''} ${modifier?.displayName ?? ''}`,
          };
        }),
      ),
    );
    NoteStore.setIsFetchingGNBContent(false);
  };

  useLayoutEffect(() => {
    fetchRoomData();
  }, []);

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
                width: '75%',
              },
              {
                title: '룸 관리자',
                dataIndex: 'adminName',
                fixed: 'top',
              },
              {
                title: '최종 수정 날짜',
                dataIndex: 'modifiedDate',
                fixed: 'top',
              },
            ]}
            dataSource={roomData}
            onRow={room => ({
              onClick: handleRowClick(room.key, room.name),
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
