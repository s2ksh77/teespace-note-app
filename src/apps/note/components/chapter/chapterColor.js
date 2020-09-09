import React from "react";
import { useObserver } from "mobx-react";
import { ChapterColorDiv, ChapterColorSpan } from "../../styles/chpaterStyle";

const ChapterColor = ({ color }) => {
  return useObserver(() => (
    <>
      <ChapterColorDiv>
        <ChapterColorSpan color={color} background={color} />
      </ChapterColorDiv>
    </>
  ));
};

export default ChapterColor;
