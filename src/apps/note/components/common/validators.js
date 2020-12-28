import {isNil, isEmpty} from 'ramda';

// evernote도 http://ksdjflaskd.sdflksjdlfk 링크 처리함
const urlRegex = new RegExp(
  /(http(s)?:\/\/|www.)([a-z0-9\w]+\.)+([a-z0-9]{0,})(?:[\/\.\?\%\&\+\~\#\=\-\!\:]\w{0,}){0,}|(\w{3,}\@[\w\.]{1,})/i
);
// http가 있을 때는 뒤에 .com 같은거 검사 안하고 유효성 판별
// 혹시 나중에 안되는거 있으면 이거 테스트해보기
// const urlRegex2 = new RegExp(
//   /^https?:\/\/([^/]+)\/(.*)$/i
// ); 


// naver.com 같은거 인식하기
// evernote도 section.blog.naver.com/BlogHome.nhn?directoryNo=0&currentPage=1&groupId=0 에서 .com까지만 인식한다
// evernote에서 -허용, @는 mailto
// evernote에서 google.com/index.html : google.com까지만 링크처리
// localhost:3000/~ : 링크 처리 안 됨
const urlRegex3 = new RegExp(
  /[^\{\}\[\]\/\(\)\\\=\'\"\s?,;:|*~`!_+<>@#$%&]+(.com|.net|.kr|.org|.biz)/i
);

// 유효하면 true
export const composeValidators = (...args) => (value) => {
  for (const validator of args) {
    const error = !validator(value);

    if (error) return false;
  }
  return true;
};
// 내용이 있는지 : true(있음, 유효)
// isNil : Checks if the input value is null or undefined.
// isEmpty : Returns true if the given value is its type's empty value; false otherwise.
export const isFilled = (value) => (!isNil(value) && !isEmpty(value) ? true : false);
export const validUrl = (value) => (urlRegex.test(value) || urlRegex3.test(value));

// url validation
export const checkUrlValidation = (inputValue) => {
  const validator =  composeValidators(isFilled, validUrl);
  return validator(inputValue);
}

// true : valid, false : invalid
export const checkWhitespace = (value) => value.trim().length > 0;

// true : valid(중복X), false : invalid(중복)
// chapter 생성
export const checkNotDuplicate = (targetArr, key, value) =>{
  return targetArr.find((item) => item[key] === value) ? false : true;
}

// true : valid(중복X), false : invalid(중복)
// 태그 생성 : 대소문자 구분 없이 동일 text 처리
export const checkNotDuplicateIgnoreCase = (targetArr, key, value) =>{
  return targetArr.find((item) => item[key].toUpperCase() === value.toUpperCase()) ? false : true;
}