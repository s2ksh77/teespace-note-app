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
    const COLOR_ARRAY = [
      '#C84847',
      '#F29274',
      '#F6C750',
      '#77B69B',
      '#679886',
      '#3A7973',
      '#77BED3',
      '#5C83DA',
      '#8F91E7',
      '#DF97AA',
      '#CA6D6D',
    ];
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
