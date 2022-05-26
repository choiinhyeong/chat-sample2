import {
  MUT_CLOSE_LOADING,
  MUT_SET_LOADING_PERCENTAGE,
  MUT_SHOW_ALERT,
  MUT_SHOW_CONFIRM,
  MUT_SHOW_LOADING
} from "@/store/modules/common/common";
import store from '@/store/index'

// text => 알럿 문구
// callback => ok 후 callback
// closeCallback => close 후 callback
const showConfirm = ({text, callback, closeCallback, centered}) => {
  store.commit(`common/${MUT_SHOW_CONFIRM}`, {text, callback, closeCallback, centered});
};


const showAlert = (msg)=> {
  if(msg instanceof Object) {
    store.commit(`common/${MUT_SHOW_ALERT}`, msg);
  }else{
    store.commit(`common/${MUT_SHOW_ALERT}`, {text: msg});
  }
};

const showLoading = (showPercent) => {
  store.commit(`common/${MUT_SHOW_LOADING}`, !!showPercent);
}

const closeLoading = () => {
  // setTimeout(() => {
    store.commit(`common/${MUT_CLOSE_LOADING}`);
  // }, 500);
}

const setLoadingPercentage = (percentage) => {
  store.commit(`common/${MUT_SET_LOADING_PERCENTAGE}`, percentage);
}

export const useAlert = () => {
  return {
    showConfirm,
    showAlert,
    showLoading,
    closeLoading,
    setLoadingPercentage
  }
}