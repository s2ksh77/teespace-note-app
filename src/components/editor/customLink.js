import errorImg from '../../assets/note_error.svg';
import NoteStore from '../../store/noteStore';
import PageStore from '../../store/pageStore';
import GlobalVariable from '../../GlobalVariable';
import {
  isFilled,
  checkUrlValidation,
  isValidMailtoMail,
  isValidMail,
  isOpenMail,
} from '../common/validators.js';
import i18n from '../../i18n/i18n';

/*
  Link Dialog 관련
*/
export const changeLinkDialog = () => {
  try {
    const dialog = document.querySelector('.tox-dialog');
    dialog.classList.add('custom-link-dialog');
    changeLinkDialogFooter(dialog.querySelector('.tox-dialog__footer')); // 일단 버튼 위치 바꾸기
    changeLinkDialogHeader(dialog.querySelector('.tox-dialog__header'));
    // saveBtn : disable하려고 넘겨준다
    changeLinkDialogForm(dialog);
  } catch (err) {
    throw Error(err);
  }
};

const changeLinkDialogHeader = header => {
  header.classList.add('custom-dialog-header');
  const title = header.querySelector('.tox-dialog__title');
  title.classList.add('custom-dialog-title');
  title.textContent = i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_01');
};

const changeLinkDialogFooter = footer => {
  footer.classList.add('custom-dialog-footer');
  const btnGroup = footer.querySelector('.tox-dialog__footer-end');
  btnGroup.classList.add('custom-dialog-btns');
  [...btnGroup.children].forEach((btn, idx) =>
    btn.setAttribute('id', 'custom-link-' + ['cancel', 'save'][idx]),
  );
  // 저장, 취소 버튼 위치 바껴야 한다
  btnGroup.insertBefore(btnGroup.children[1], btnGroup.children[0]);
};

// tinyMCE dialog에 끼워넣는거라 react로 안 짬
const renderErrorMark = target => {
  const img = document.createElement('img');
  img.src = errorImg;
  img.classList.add('note-link-form-error');
  const tooltip = document.createElement('div');
  tooltip.classList.add('note-link-error-tooltip');
  target.appendChild(img);
  target.appendChild(tooltip);
  return { img$: img, tooltip$: tooltip };
};

// NOTE: [2021-06-02] 기획 변경에 따라 에러 메세지 제거 (임시)
const textCondition = () => ({ result: true, message: '' });

const urlSaveCondition = _value => {
  if (!isFilled(_value))
    return { result: false, message: i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_12') };
  if (GlobalVariable.isMailApp) {
    if (isValidMailtoMail(_value)) return { result: true, message: '' }; // pass
    if (isValidMail(_value))
      return {
        result: false,
        message: i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_13'),
      }; // mailto 붙여달라고 메시지 띄우기
  }
  if (checkUrlValidation(_value)) return { result: true, message: '' }; // pass
  return { result: false, message: i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_10') }; // 올바르지 않은 주소라고 메시지 띄우기
};

// errorMark 관련된 함수
// params : errorMark, errorCondition, textInput
const renderValidation = params => (e, targetValue) => {
  const { type, errorMark, errorCondition, textInput } = params;
  const { img$, tooltip$ } = errorMark;
  const resultObj = errorCondition(targetValue);
  // pass
  if (resultObj.result) {
    [img$, tooltip$].forEach(node =>
      node.classList.remove('note-show-element'),
    );
  }
  // text필드 errorMark 보여주는건 focusOut일 때만
  else if (type === 'text' && e.type === 'input') {
  } else {
    tooltip$.textContent = resultObj['message'];
    [img$, tooltip$].forEach(node => node.classList.add('note-show-element'));
  }
  // multiline일 때 textInput 없음
  // 텍스트 빈 칸일 때 url 쓰면 자동으로 텍스트 채워준다 -> errorMark 지워주어야
  if (textInput && isFilled(textInput.value)) {
    [
      ...textInput.parentElement.querySelectorAll('.note-show-element'),
    ].forEach(node => node.classList.remove('note-show-element'));
  }
};

const disableSaveBtn = saveBtn => {
  saveBtn.setAttribute('disabled', true);
  saveBtn.classList.add('disabled-btn');
};

const activateSaveBtn = saveBtn => {
  saveBtn.removeAttribute('disabled');
  saveBtn.classList.remove('disabled-btn');
};

const isEmpty = targetInputs$ => {
  for (const input of targetInputs$) {
    if (!isFilled(input.value)) return true;
  }
  return false;
};

const changeLinkDialogForm = dialog => {
  // 텍스트, 링크 순으로 바꿔주기
  const form = dialog.querySelector('.tox-dialog__body .tox-form');
  form.classList.add('custom-dialog-form');
  const formStr = {
    url: i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_05'),
    text: i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_04'),
  };
  const saveBtn = dialog.querySelector('.custom-dialog-btns #custom-link-save');
  const targetInputs$ = form.querySelectorAll('input');
  if (form.children.length > 1) {
    form.insertBefore(form.children[1], form.children[0]);
  }
  if (isEmpty(targetInputs$)) disableSaveBtn(saveBtn);

  const handleInput = checkValidation => e => {
    if (typeof checkValidation === 'function')
      checkValidation(e, e.currentTarget.value);
    // 두 input창이 비어있으면 saveBtn을 disable한다
    if (isEmpty(targetInputs$)) {
      disableSaveBtn(saveBtn);
      return;
    }
    //errorMark가 있는지 확인하고 saveBtn disable 시키는게 간단할 듯
    if (form.querySelectorAll('.note-link-form-error.note-show-element').length)
      disableSaveBtn(saveBtn);
    else activateSaveBtn(saveBtn);
  };

  // string 바꿔주기, renderValidationErrorMark
  [...form.childNodes].forEach(child => {
    const input$ = child.querySelector('input');
    const type = input$.getAttribute('type') === 'url' ? 'url' : 'text';
    input$.placeholder = i18n.t('NOTE_EDIT_PAGE_INSERT_LINK_03');
    // label text 바꾸기
    child.querySelector('.tox-form__group label').textContent = formStr[type];
    // errorMark 그려주고
    const errorMark = renderErrorMark(input$.parentElement);
    /*
      유효성 검사해서 error mark 그렸다 뺐다하기
    */
    const params = {
      type,
      errorMark,
      errorCondition: type === 'text' ? textCondition : urlSaveCondition,
      textInput: form.querySelector('input[type="text"]'), // 텍스트 빈 칸일 때 url 쓰면 자동으로 텍스트 채워준다 -> errorMark 지워주어야
    };
    // validation 함수 만들기
    const renderItemValidation = renderValidation(params);
    // focus out 했을 때 동작한다
    if (type === 'text') {
      // focusOut일 때만 동작해야해서
      input$.addEventListener('focusout', handleInput(renderItemValidation));
      // 다 지웠을 때도 인식해야 하고, 중간에 focus상태에서 text 쓸 때도 에러메시지 지워져야함
      input$.addEventListener('input', handleInput(renderItemValidation));
    }
    //url
    else input$.addEventListener('input', handleInput(renderItemValidation));
  });
  // 유효하지 않은 input일 때 enter 동작 막기 ( default keydown event인 enter 동작 막기 )
  form.addEventListener("keydown",(e) => {
    if (e.key === "Enter" && saveBtn.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  })
  // text input으로 focus
  targetInputs$[0].focus();
};

/*
  Link context Toolbar 관련
  custimizing contextToolbar
*/
export const changeButtonStyle = ({ str, idx, count }) => {
  const toolbar = document.querySelector(
    '.tox-pop__dialog div.tox-toolbar__group',
  );
  toolbar.classList.add('link-toolbar');
  const target = toolbar.childNodes?.[idx];
  if (toolbar && target) {
    const strNode = document.createElement('div');
    strNode.textContent = str;
    strNode.classList.add('link-toolbar-btn');
    target.appendChild(strNode);
  } else if (count >= 50) return;
  else {
    setTimeout(changeButtonStyle, 50, str, idx, count + 1);
  }
};

// customToggleOpenLink에서는 isOnlyReadMode가 false : 수정모드에서 열려야 하는 메뉴라서
// 읽기모드에서 a tag 클릭으로 들어온 경우 isOnlyReadMode : true
export const openLink = ({ isOnlyReadMode, url, target }) => {
  if (isOnlyReadMode && !PageStore.isReadMode()) return;
  if (!url) return;

  if (isOpenMail(url)) {
    NoteStore.setIsMailShare(true);
    NoteStore.setMailReceiver([
      {
        mailAddr: url.replace(/^(mailto:\s?)/g, ''),
        displayName: null,
        userId: null,
      },
    ]);
    return;
  }

  if (target !== '_blank') {
    document.location.href = url;
    return;
  }
  // window.open(targetUrl);
  const link = document.createElement('a');
  link.href = url;
  link.target = target;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// default autolink pattern
// autolink_pattern:/^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@)(.+)$/i,
// 자동으로 mailto로 바꾸지 않는 경우
// autolink_pattern: /^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)(.+)$/i,
export const customAutoLinkPattern = () => {
  return !GlobalVariable.isMailApp
    ? /^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)(.+)$/i
    : /^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@)(.+)$/i;
};
