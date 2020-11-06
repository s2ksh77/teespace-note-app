import React, { useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { DragLayer } from "react-dnd";
import takaImg from '../../assets/file_move_taka.png';

let subscribedToOffsetChange = false;
let dragPreviewRef = null;

const onOffsetChange = (monitor) => () => {
  if (!dragPreviewRef) return;

  const offset = monitor.getClientOffset();

  if (!offset) return;

  const transform = `translate(${offset.x + 10}px, ${offset.y - 20}px)`;

  dragPreviewRef.style['display'] = 'flex';
  dragPreviewRef.style['transform'] = transform;
  dragPreviewRef.style['-webkit-transform'] = transform;
};

const DragPreview = ({ type, title }) => {
  const { PageStore } = useNoteStore();
  const previewRef = useRef(null);

  useEffect(() => {
    dragPreviewRef = previewRef.current;

    switch (type) {
      case 'page':
        const element = document.getElementById(PageStore.movePageId);
        dragPreviewRef.style['width'] = element.offsetWidth + 'px';
        dragPreviewRef.style['height'] = element.offsetHeight + 'px';
        break;
      default:
        break;
    }

  }, [previewRef]);

  return useObserver(() => (
    <div
      ref={previewRef}
      className={
        type === 'chapter'
          ? 'draggedChapter'
          : 'draggedPage'
      }
    >
      {type === 'chapter'
        ? <img
          src={takaImg}
          style={{ position: 'absolute', top: '-2rem', left: '-4rem' }}
        />
        : null}
      {title}
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