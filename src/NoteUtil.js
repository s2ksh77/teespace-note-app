import moment from 'moment-timezone';
import i18n from './i18n/i18n';
import { CHAPTER_TYPE } from './GlobalVariable';
import { UserStore } from 'teespace-core';

const NoteUtil = {
  // 인코딩 대상 : 알파벳, 0~9의 숫자, -_.!~*' 제외하고 이스케이프 처리(아스키 문자셋으로 변경)
  // encodeURI : 매개변수로 전달된 문자열을 완전한 URI 전체라고 간주한다.
  // 따라서 쿼리스트링 구분자로 사용되는 =,?,&은 인코딩하지 않는다
  // encodeURIComponent는 위 세 개까지 인코딩한다(쿼리스트링의 일부로 간주하여)
  encodeStr(str) {
    return escape(encodeURIComponent(this.decodeStr(str)));
  },
  decodeStr(str) {
    let pre = str,
      cur;
    try {
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

  getChapterNumType(type) {
    switch (type) {
      case CHAPTER_TYPE.DEFAULT:
        return 0;
      case CHAPTER_TYPE.NOTEBOOK:
        return 1;
      case CHAPTER_TYPE.SHARED_PAGE:
        return 2;
      case CHAPTER_TYPE.SHARED:
        return 3;
      case CHAPTER_TYPE.RECYCLE_BIN:
        return 4;
      default:
        return null;
    }
  },
  // storage에서 주는 "2021-02-18 15:01:28.0 Asia/Seoul" 형식을 unixTime으로
  getUnixTime(inputTime = '') {
    const [date = null, time = null, zone = null] = inputTime.split(' ');
    if ([date, time, zone].includes(null)) return null;
    return moment.tz(date + ' ' + time, zone).unix();
  },

  replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: [...value], //Array.from(value.entries()).. iterator 객체
      };
    } else return value;
  },

  reviver(key, value) {
    if (typeof value === 'object' && value !== null && value.dataType === 'Map')
      return new Map(value.value);
    return value;
  },

  setLocalChapterFoldedState({ channelId, chapterId, isFolded, isTheRest }) {
    if (isTheRest) {
      // default, notebook 아닌 것
      this.setLocalRestFoldedState({ channelId, chapterId, isFolded });
      return;
    }

    let item = localStorage.getItem(`NoteSortData_${channelId}`);
    if (!item) return;
    item = JSON.parse(item);
    const idx = item.findIndex(chapter => chapter.id === chapterId);
    if (idx === -1) return;
    item[idx]['isFolded'] = isFolded;
    localStorage.setItem(`NoteSortData_${channelId}`, JSON.stringify(item));
  },
  // shared, recylce_bin의 folded state
  setLocalRestFoldedState({ channelId, chapterId, isFolded }) {
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
    return arr?.length === 0 ? true : false;
  },
};

/**
 * 날짜를 같은 연월일을 생략한 12시간 형식으로 변환한다.
 * NOTE: showAllDates가 true인 경우에는 같은 연월일이라도 생략하지 않는다.
 * @param {string} date yyyy.mm.dd hh:mm:ss
 * @param {boolean} showsAllDates 연월일 표시 여부
 * @returns 12시간 형식의 날짜
 */
export const get12HourFormat = (date, showsAllDates = false) => {
  if (!date) return '';
  const [mDate, mTime] = date.split(' ');
  let mYear = parseInt(mDate.split('.')[0], 10);
  let mMonth = parseInt(mDate.split('.')[1], 10);
  let mDay = parseInt(mDate.split('.')[2], 10);
  const mHour = parseInt(mTime.split(':')[0], 10);
  const mMinute = parseInt(mTime.split(':')[1], 10);
  const curDate = new Date();
  const convertTwoDigit = digit => `0${digit}`.slice(-2);

  if (isNaN(mMonth)) {
    // for spring
    mYear = parseInt(mDate.split('-')[0], 10);
    mMonth = parseInt(mDate.split('-')[1], 10);
    mDay = parseInt(mDate.split('-')[2], 10);
  }

  const hhmm = `${convertTwoDigit(
    mHour > 12 ? mHour - 12 : mHour === 0 ? 12 : mHour,
  )}:${convertTwoDigit(mMinute)}`;
  const basicDate =
    mHour < 12
      ? i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_01', { time: hhmm })
      : i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_02', { time: hhmm });

  if (mYear === curDate.getFullYear() && !showsAllDates) {
    if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate()) return basicDate;
    return `${convertTwoDigit(mMonth)}.${convertTwoDigit(mDay)} ${basicDate}`;
  }
  return `${mYear}.${convertTwoDigit(mMonth)}.${convertTwoDigit(mDay)} ${basicDate}`;
};

export const getUserDisplayName = async userId => {
  if (!userId) return '';
  const userProfile = await UserStore.getProfile(userId);
  return userProfile?.isWithdrawn
    ? i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01')
    : userProfile?.displayName;
};

export const isNormalChapter = type => {
  return ['default', 'notebook'].includes(type);
};

export const getI18nChapterTitle = (type, title) => {
  switch (type) {
    case CHAPTER_TYPE.SHARED_PAGE:
      return i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_07');
    case CHAPTER_TYPE.RECYCLE_BIN:
      return i18n.t('NOTE_BIN_01');
    default:
      return title;
  }
};

export const isAvailableUrl = url => {
  const isUploadedUrl = /\/CMS\/Storage\//.test(url);
  const isRelativeUrl = /..\/..\/CMS\/Storage\//.test(url);
  return !isUploadedUrl || isRelativeUrl;
};

export const getRelativeUrl = url => {
  return url.replace(url.split('/CMS/Storage')[0], '../..');
};

export const getExtension = fileName => {
  const reg = /[^\s]+\.(.*)*/;
  const result = reg.exec(fileName);
  if (!result || result.length < 1) return false;
  const extension = result[1]?.toLowerCase();
  return extension;
};

export default NoteUtil;
