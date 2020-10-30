import errorImg from '../../assets/note_error.svg';

// tinyMCE dialog에 끼워넣는거라 react로 안 짬
const renderErrorMark = target => {
  const img = document.createElement('img');
  img.src=errorImg;
  img.classList.add('note-link-error');
  const tooltip = document.createElement('div');
  tooltip.classList.add('note-link-error-tooltip');
  tooltip.textContent = '해당 URL은 유효하지 않습니다.';
  target.appendChild(img);
  target.appendChild(tooltip); 
  return [img, tooltip];
}

const modifyDisplay = (method, target, targetInput, saveBtn) => {
  switch (method) {
    case "remove":
      target.map((child)=>child.classList.remove('note-show-element'));
      targetInput.classList.remove('note-link-input');
      saveBtn.removeAttribute('disabled');
      break;
    case "add" :
      target.map((child)=>child.classList.add('note-show-element'));
      targetInput.classList.add('note-link-input');
      saveBtn.setAttribute('disabled', true);
      break;
    default:
      break;
  }
}

// const validationSchema = Yup.object({
//   url: Yup.string().url('해당 URL은 유효하지 않습니다.').required('Required')
// })

export const checkValidation = (inputValue) => {
  if (inputValue === "") return true;
  else if (/(http(s)?:\/\/|www.)([a-z0-9\w]+\.)+([a-z0-9]{0,})(?:[\/\.\?\%\&\+\~\#\=\-\!\:]\w{0,}){0,}|(\w{3,}\@[\w\.]{1,})/.test(inputValue)) {
    return true;
  } else return false;
}

const validateAndModify = (inputValue, target, targetInput, saveBtn) => {
  modifyDisplay(checkValidation(inputValue) ? "remove" : "add", target, targetInput, saveBtn);
}

const attach_setTimeout = (count)=>{
  const targetInput = document.querySelector('.tox-dialog__body .tox-form__controls-h-stack input[type=url]'); 
  const saveBtn = document.querySelector('.tox-dialog .tox-dialog__footer-end')?.childNodes[1]
  if (targetInput && saveBtn) {
    const nodes =  renderErrorMark( targetInput.parentElement);
    targetInput.oninput = (e) => {
      validateAndModify(e.target.value, nodes, targetInput, saveBtn)
    }
  } else if (count >= 10000) return;
  else {
    ++count;
    setTimeout(attach_setTimeout, 50, count);
  }
}

const attachUrlValidator = () => {
  attach_setTimeout(0);
}

export default attachUrlValidator;
// const UrlValidation = ({show, targetSelector}) => {
//   if (!show) return null;
//   return ReactDOM.render(
//     <>
//       <img src='../../assets/note_error.svg' className="note-link-error" style={{display: "flex"}} />
//       <div className="note-link-error-tooltip" style={{display: "flex"}}>
//         <span className="note-link-error-tooltip-text">해당 URL은 유효하지 않습니다.</span>
//       </div>
//     </>,
//     targetSelector.parentElement
//   )
// }

// export default UrlValidation
