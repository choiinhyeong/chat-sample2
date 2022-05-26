// // 사업자 등록 번호
// const businessmanRegistrationNumRule = /^\d{3}-\d{2}-\d{5}$/;
// export const checkBusinessmanRegistrationNum = (bzmnRegNo) => {
//   return businessmanRegistrationNumRule.test(bzmnRegNo);
// }

// // 법인 번호
// const businessmanCorporationNumRule = /^\d{6}-\d{7}$/;
// export const checkBusinessmanCorporationNum = (bzmnCrno) => {
//   return businessmanCorporationNumRule.test(bzmnCrno);
// }
import {useAlert} from "@/assets/js/common/alert";

// const emailRule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const checkEmail = (email) => {
//   return emailRule.test(email);
// };

// const regRule = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,13}$/
const regRule = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/
export const checkPassword = (passwd) => {
  // 숫자 + 문자 8~13자리
  return regRule.test(passwd);
}

const idRule = /^[a-z][a-z\d]{4,11}$/;
export const checkId = (id) => {
  // 숫자 또는 문자 4~11자리
  return idRule.test(id);
}

const {showAlert} = useAlert();

export const validateAlert = (validateKeys, target, isMulti) => {
  let msgs = [];
  if(validateKeys instanceof Object){
    msgs = validateObject(validateKeys, target);
  }
  // 오류가 없다면 msgs 에 데이터 가 채워져있지 않다.
  const result = (msgs.length === 0);

  if(!result) showAlert({
    text: isMulti ? msgs.join('<br>') : msgs[0],
    centered: true
  });
  return result;
}

const validateObject = (validateKeys, target) => {
  const keys = Object.keys(validateKeys);
  const msgs = [];

  for(let i = 0; i < keys.length; i++){
    if(!target[keys[i]]){
      msgs.push(validateKeys[keys[i]]);
    }
  }
  return msgs;
}

// export const msgAlert = (title, msgs, width) => {
//   store.commit(`common/${MUT_SHOW_ALERT}`, {
//     title:  `${title ? title : '입력정보를 확인하세요.'}`,
//     subText: msgs.join(',<br>'),
//     html: true,
//     bodyClass: width ? `gachi-body-width-${width}` : 'gachi-popup-body'
//   });
// }