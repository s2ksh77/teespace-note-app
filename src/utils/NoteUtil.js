import CHAPTER_TYPE from './const';
import i18n from '../i18n/i18n';
import PageStore from '../stores/store/PageStore';

const NoteUtil = {
  // 인코딩 대상 : 알파벳, 0~9의 숫자, -_.!~*' 제외하고 이스케이프 처리(아스키 문자셋으로 변경)
  // encodeURI : 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주한다.
  // 따라서 쿼리스트링 구분자로 사용되는 =,?,&은 인코딩하지 않는다
  // encodeURIComponent는 위 세 개까지 인코딩한다(쿼리스트링의 일부로 간주하여)
  encodeStr(str) {
    return escape(encodeURIComponent(this.decodeStr(str)));
  },
  decodeStr(str) {
    let pre = str;
    let cur;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        cur = decodeURIComponent(pre);
        if (cur === pre) return cur;
        pre = cur;
      }
    } catch (e) {
      // 노트 내용 중에 url이나 mail이 있으면 URI malformed error가 발생한다.
      // 이때 decode가 완료된것으로 보이므로 그대로 return한다
      return pre;
    }
  },
  // encoding해서 일치 비교
  isSameStr(str1, str2) {
    return this.encodeStr(str1) === this.encodeStr(str2);
  },

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
  // storage에서 주는 "2021-02-18 15:01:28.0 Asia/Seoul" 형식을 unixTime으로
  // getUnixTime(inputTime = '') {
  //   const [date = null, time = null, zone = null] = inputTime.split(' ');
  //   if ([date, time, zone].includes(null)) return null;
  //   return moment.tz(`${date} ${time}`, zone).unix();
  // },

  replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: [...value], // Array.from(value.entries()).. iterator 객체
      };
    }
    return value;
  },

  reviver(key, value) {
    if (typeof value === 'object' && value !== null && value.dataType === 'Map')
      return new Map(value.value);
    return value;
  },

  setLocalChapterFoldedState({ channelId, chapterId, isFolded, isShared }) {
    if (isShared) {
      this.setLocalSharedFoldedState({ channelId, chapterId, isFolded });
      return;
    }

    let item = localStorage.getItem(`NoteSortData_${channelId}`);
    if (!item) return;
    item = JSON.parse(item);
    const idx = item.findIndex(chapter => chapter.id === chapterId);
    if (idx === -1) return;
    item[idx].isFolded = isFolded;
    localStorage.setItem(`NoteSortData_${channelId}`, JSON.stringify(item));
  },

  setLocalSharedFoldedState({ channelId, chapterId, isFolded }) {
    let item = localStorage.getItem(`Note_sharedFoldedState_${channelId}`);
    if (!item) return;
    item = JSON.parse(item, NoteUtil.reviver);
    item.set(chapterId, isFolded);
    localStorage.setItem(
      `Note_sharedFoldedState_${channelId}`,
      JSON.stringify(item, NoteUtil.replacer),
    );
  },

  isEmpty(arr) {
    return arr?.length === 0;
  },
  convertDateFormat(date, isSharedInfo) {
    const mDate = date.split(' ')[0];
    const mTime = date.split(' ')[1];
    const mYear = parseInt(mDate.split('.')[0]);
    const mMonth = parseInt(mDate.split('.')[1]);
    const mDay = parseInt(mDate.split('.')[2]);
    const mHour = parseInt(mTime.split(':')[0]);
    const mMinute = parseInt(mTime.split(':')[1]);
    const curDate = new Date();
    const convertTwoDigit = digit => ('0' + digit).slice(-2);
    const m12Hour = mHour > 12 ? mHour - 12 : mHour;

    const hhmm = convertTwoDigit(m12Hour) + ':' + convertTwoDigit(mMinute);
    const basicDate =
      mHour < 12
        ? i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_01', { time: hhmm })
        : i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_02', { time: hhmm });

    if (
      date === PageStore.pageModel.modDate &&
      mYear === curDate.getFullYear() &&
      !isSharedInfo
    ) {
      // 같은 해
      if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate())
        return basicDate;
      // 같은 날
      else
        return (
          convertTwoDigit(mMonth) +
          '.' +
          convertTwoDigit(mDay) +
          ' ' +
          basicDate
        ); // 다른 날
    } else {
      // 다른 해, 정보 보기
      return (
        mYear +
        '.' +
        convertTwoDigit(mMonth) +
        '.' +
        convertTwoDigit(mDay) +
        ' ' +
        basicDate
      );
    }
  },
};

export default NoteUtil;