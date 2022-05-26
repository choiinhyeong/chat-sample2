export const MUT_SET_ALERT_INS = 'mutSetAlertIns';
export const MUT_SET_CONFIRM_INS = 'mutSetConfirmIns';
export const MUT_SET_LOADING_INS = 'mutSetLoadingIns';
export const MUT_SET_LOADING_PERCENTAGE = 'mutSetLoadingPercentage';

export const MUT_SHOW_ALERT = 'mutShowAlert';
export const MUT_CLOSE_ALERT = 'mutCloseAlert';
export const MUT_SHOW_CONFIRM = 'mutShowConfirm';
export const MUT_CLOSE_CONFIRM = 'mutCloseConfirm';

export const MUT_SHOW_LOADING = 'mutShowLoading';
export const MUT_CLOSE_LOADING = 'mutCloseLoading';


const state = {
    loading: {
        ins: null,
        showPercent: false,
        percent: 0
    },
    alert: {
        ins: null,
        text: '',
        centered: false,
        callback: null,
        alertTimeout: null
    },
    confirm: {
        ins: null,
        text: '',
        centered: false,
        callback: null,
        closeCallback: null
    },
}

const mutations = {
    [MUT_SET_ALERT_INS](state, ins){
        state.alert.ins = ins;
    },
    [MUT_SET_CONFIRM_INS](state, ins){
        state.confirm.ins = ins;
    },
    [MUT_SET_LOADING_INS](state, ins){
        state.loading.ins = ins;
    },
    [MUT_SHOW_ALERT](state, {text, callback, centered, timeout}) {
        state.alert.text = text;
        state.alert.callback = callback;
        state.alert.centered = !!centered;
        if(timeout > 0){
            if(state.alert.alertTimeout){
                clearTimeout(state.alert.alertTimeout);
                state.alert.alertTimeout = null;
            }
            state.alert.alertTimeout = setTimeout(() => {
                state.alert.show = false;
            }, (timeout * 1000));
        }
        // state.alert.show = true;
        state.alert.ins.show();
    },
    [MUT_CLOSE_ALERT](state) {
        state.alert.ins.hide();
        state.alert.text = '';
    },
    [MUT_SHOW_CONFIRM](state, {text, callback, closeCallback, centered}) {
        state.confirm.text = text;
        state.confirm.callback = callback;
        state.confirm.closeCallback = closeCallback;
        state.confirm.centered = !!centered;
        state.confirm.ins.show();
    },
    [MUT_CLOSE_CONFIRM](state) {
        state.confirm.ins.hide();
        state.confirm.text = '';
    },
    [MUT_SHOW_LOADING](state, showPercent) {
        state.loading.ins.show();
        state.loading.percent = 0;
        state.loading.showPercent = showPercent;
    },
    [MUT_CLOSE_LOADING](state) {
        state.loading.ins.hide();
    },
    [MUT_SET_LOADING_PERCENTAGE](state, percent){
        state.loading.percent = percent;
    }

}

export default {
    namespaced: true,
    state,
    mutations
};