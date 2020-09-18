import React from "react";
import { useObserver } from "mobx-react";
import { ColorCover, Color } from "../../styles/chpaterStyle";

const ChapterColor = ({ color }) => {
  return useObserver(() => (
    <>
      <ColorCover>
        <Color color={color} background={color} />
      </ColorCover>
    </>
  ));
};

export default ChapterColor;
