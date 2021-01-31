import errorImg from '../../assets/note_error.svg';
import PageStore from '../../store/pageStore';
import { isFilled, validUrl, checkUrlValidation } from '../common/validators.js';
/*
  Link Dialog 관련
*/
const changeLinkDialogHeader = (header) => {
  header.classList.add("custom-dialog-header")
  const title = header.querySelector('.tox-dialog__title');
  title.classList.add("custom-dialog-title");
  title.textContent = '링크 삽입';
}

// tinyMCE dialog에 끼워넣는거라 react로 안 짬
const renderErrorMark = target => {
  const img = document.createElement('img');
  img.src = errorImg;
  img.classList.add('note-link-error');
  const tooltip = document.createElement('div');
  tooltip.classList.add('note-link-error-tooltip');
  tooltip.textContent = '해당 URL은 유효하지 않습니다.';
  target.appendChild(img);
  target.appendChild(tooltip);
  return [img, tooltip];
}

const renderValidation = (targetInput, errorMark, saveBtn) => {
  const _value = targetInput.value;
  // 가독성을 위해 중복 검사함
  // 빈 str이거나 invalid
  if (!checkUrlValidation(_value)) {
    saveBtn.setAttribute('disabled', true);
  } else saveBtn.removeAttribute('disabled');

  // errorMark는 invalid할 때만
  if (!isFilled(_value) || validUrl(_value)) {
    errorMark.map((child) => child.classList.remove('note-show-element'));
    targetInput.classList.remove('note-link-input');
  } else {
    errorMark.map((child) => child.classList.add('note-show-element'));
    targetInput.classList.add('note-link-input');
  }
}

const changeLinkDialogForm = (form, footer) => {
  // 텍스트, 링크 순으로 바꿔주기
  form.insertBefore(form.children[1],form.children[0]);
  form.classList.add("custom-dialog-form");

  const formStr = {
    url: "링크",
    text: "텍스트"
  }
  // string 바꿔주기, renderValidationErrorMark
  Array.from(form.childNodes).map((child, idx) => {
    const label$ = child.querySelector('.tox-form__group label');    
    const input$ = child.querySelector('input');
    const content =
      input$.getAttribute('type') === "url" ? "url" : "text";
    // label text 바꾸기
    label$.textContent = formStr[content];

    /*
      Link Dialog에서 유효성 검사 결과 ui 띄워주는 부분
    */
    if (content === "url") {
      const saveBtn = footer.querySelector('.tox-dialog__footer-end')?.childNodes[0];
      const errorMark = renderErrorMark(input$.parentElement);
      // input value 유효하지 않으면 errorMark 띄우고 saveBtn disabled처리
      renderValidation(input$, errorMark, saveBtn);
      input$.oninput = (e) => {
        renderValidation(input$, errorMark, saveBtn);
      }
    } else input$.focus();
  });
}

const changeLinkDialogFooter = (footer) => {
  footer.classList.add("custom-dialog-footer");
  const btnGroup = footer.querySelector('.tox-dialog__footer-end');  
  btnGroup.classList.add('custom-dialog-btns')
  // 저장, 취소 버튼 위치 바껴야 한다
  btnGroup.insertBefore(btnGroup.children[1],btnGroup.children[0]);
}
export const changeLinkDialog = () => {
  try {
    const dialog = document.querySelector('.tox-dialog');
    dialog.classList.add("custom-link-dialog");
    const footer = dialog.querySelector('.tox-dialog__footer');
    changeLinkDialogFooter(footer); // 일단 버튼 위치 바꾸기
    changeLinkDialogHeader(dialog.querySelector('.tox-dialog__header'));
    changeLinkDialogForm(dialog.querySelector('.tox-dialog__body .tox-form'), footer);
  } catch (err) { throw Error(err) };
}

/*
  Link context Toolbar 관련
  custimizing contextToolbar
*/
const linkToolbarStr = ['링크 편집', '링크 삭제', '링크로 이동']
export const changeButtonStyle = (idx, count) => {
  const toolbar = document.querySelector('.tox-pop__dialog div.tox-toolbar__group');
  toolbar.classList.add('link-toolbar');
  const target = toolbar.childNodes?.[idx];
  if (toolbar && target) {
    const strNode = document.createElement('div');
    strNode.textContent = linkToolbarStr[idx];
    target.appendChild(strNode);
  } else if (count >= 50) return;
  else {
    setTimeout(changeButtonStyle, 50, idx, count + 1);
  }
}

export const openLink = (url, target) => {
  if (!PageStore.isReadMode()) return;

  if (target !== '_blank') {
    document.location.href = url;
    return;
  }
  const link = document.createElement('a');
  link.href = url;
  link.target = target;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}