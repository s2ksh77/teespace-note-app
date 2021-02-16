import React from "react";
import { ColorCover, Color } from "../../styles/chpaterStyle";

const ChapterColor = ({ color }) => {
  return (
    <ColorCover>
      <Color color={color} background={color} />
    </ColorCover>
  );
};

export default ChapterColor;
