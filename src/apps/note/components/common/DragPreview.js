import React, { useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { DragLayer } from "react-dnd";
import takaImg from '../../assets/file_move_taka.png';
import NoteStore from '../../store/noteStore';
import {
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

const DragPreview = ({ type, title, titles }) => {
  const { PageStore } = useNoteStore();
  const previewRef = useRef(null);
  const element = document.getElementById(PageStore.movePageId);

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
    <div
      ref={previewRef}
      className={
        type === 'chapter'
          ? 'draggedChapter'
          : 'draggedPageContainer'
      }
    >
      {type === 'chapter'
        ? <img
          src={takaImg}
          style={{ position: 'absolute', top: '-1.5rem', left: '-2.5rem' }}
        />
        : null}
      {type === 'chapter'
        ? title
        : (
          titles.map((title, idx) => {
            return (
              <DraggedComponent 
                key={idx}
                style={{ 
                  width: `${element.offsetWidth}px`,
                }}
              >
                <DraggedComponentTitle>{title}</DraggedComponentTitle>
              </DraggedComponent>
            )
          })
        )
      }
    </div>
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