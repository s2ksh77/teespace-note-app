import React, { useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { DragLayer } from "react-dnd";
import NoteStore from '../../store/noteStore';
import {
  DraggedComponentContainer,
  DraggedComponent,
  DraggedComponentTitle,
} from "../../styles/commonStyle";

let subscribedToOffsetChange = false;
let dragPreviewRef = null;

const onOffsetChange = (monitor) => () => {
  if (!dragPreviewRef) return;

  const offset = monitor.getDifferenceFromInitialOffset();

  if (!offset) return;

  const transform = `translate(${offset.x}px, ${offset.y}px)`;

  dragPreviewRef.style['display'] = 'flex';
  dragPreviewRef.style['transform'] = transform;
  dragPreviewRef.style['-webkit-transform'] = transform;
};

const DragPreview = ({ id, titles }) => {
  const { NoteStore } = useNoteStore();
  const previewRef = useRef(null);
  const element = document.getElementById(id);

  useEffect(() => {
    dragPreviewRef = previewRef.current;
    const offset = JSON.parse(JSON.stringify(NoteStore.draggedOffset));

    if (NoteStore.layoutState === 'collapse') {
      dragPreviewRef.style['top'] = (offset.y + 30) + 'px';
      dragPreviewRef.style['left'] = (offset.x + 20) + 'px';
    }
    else {
      dragPreviewRef.style['top'] = (offset.y - 41) + 'px';
      dragPreviewRef.style['left'] = (offset.x - 346) + 'px';
    }
  }, [previewRef]);

  return useObserver(() => (
    <DraggedComponentContainer ref={previewRef}>
      {titles.map((title, idx) => {
        return (
          <DraggedComponent 
            key={idx}
            style={
              NoteStore.draggedComponentType === 'chapter'
                ? { 
                  width: `${element.offsetWidth}px`,
                  paddingLeft: '1.56rem'
                } : {
                  width: `calc(${element.offsetWidth}px - 1.875rem)`,
                }
            }
          >
            <DraggedComponentTitle>{title}</DraggedComponentTitle>
          </DraggedComponent>
        )
      })}
    </DraggedComponentContainer>
  ));
};

export default DragLayer((monitor) => {
  if (!subscribedToOffsetChange) {
    monitor.subscribeToOffsetChange(onOffsetChange(monitor));
    subscribedToOffsetChange = true;
  }

  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging()
  };
})(DragPreview);