import {isNil, isEmpty} from 'ramda';

const urlRegex = new RegExp(
  /(http(s)?:\/\/|www.)([a-z0-9\w]+\.)+([a-z0-9]{0,})(?:[\/\.\?\%\&\+\~\#\=\-\!\:]\w{0,}){0,}|(\w{3,}\@[\w\.]{1,})/
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
export const validUrl = (value) => urlRegex.test(value);

// url validation
export const checkUrlValidation = (inputValue) => {
  const validator =  composeValidators(isFilled, validUrl);
  return validator(inputValue);
}