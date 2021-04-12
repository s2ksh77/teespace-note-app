import React from 'react';
import { useObserver } from 'mobx-react';
import { Menu, Dropdown } from 'antd';
import useNoteStore from '../../stores/useNoteStore';

import { ContextMenuWrapper, ContextMenuIcon } from '../../styles/LNBStyle';
import viewMoreIcon from '../../assets/view_more.svg';

const ContextMenu = () => {
  const { NoteStore } = useNoteStore();
  const { SubMenu, Item } = Menu;

  const menu = (
    <Menu>
      <Item key="rename">이름 변경</Item>
    </Menu>
  );

  return useObserver(() => (
    <ContextMenuWrapper className="contextMenu">
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <ContextMenuIcon src={viewMoreIcon} />
      </Dropdown>
    </ContextMenuWrapper>
  ));
};

export default ContextMenu;
