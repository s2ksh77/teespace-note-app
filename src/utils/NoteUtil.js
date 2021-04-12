const NoteUtil = {
  getChapterType(type) {
    switch (type) {
      case CHAPTER_TYPE.DEFAULT:
        return 0;
      case CHAPTER_TYPE.NOTEBOOK:
        return 1;
      case CHAPTER_TYPE.SHARED_PAGE:
        return 2;
      case CHAPTER_TYPE.SHARED:
        return 3;
      default:
        return null;
    }
  },
  getChapterRandomColor() {
    const colorArray = {
      1: '#C84847',
      2: '#F29274',
      3: '#F6C750',
      4: '#77B69B',
      5: '#679886',
      6: '#3A7973',
      7: '#77BED3',
      8: '#5C83DA',
      9: '#8F91E7',
      10: '#DF97AA',
      11: '#CA6D6D',
    };

    const COLOR_ARRAY = Object.values(this.colorArray);
    return COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
  },
};

export default NoteUtil;

const CHAPTER_TYPE = {
  DEFAULT: 'default',
  NOTEBOOK: 'notebook',
  SHARED_PAGE: 'shared_page',
  SHARED: 'shared',
};
