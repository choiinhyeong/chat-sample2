import ApiService from '@/assets/js/api.service';

export const TOKEN_KEY = 'kb-admin-token';
// MUTATION
export const MUT_SET_SESSION = 'setSession';
export const MUT_SET_EXPTIME = 'setExpiredTime';
// ACTION
export const ACT_CHECK_AUTH = 'checkAuth';
export const ACT_RENEW_AUTH = 'renewAuth';

const state = {
  // {
  // 직원, 이름, 그룹
  // }
  session: null,
  sessionExpiredTime: 0,
};

const mutations = {
  [MUT_SET_SESSION](state, session) {
    state.session = session;
  },
  [MUT_SET_EXPTIME](state, tm) {
    if (tm == 0) {
      state.sessionExpiredTime = 0;
    } else {
      state.sessionExpiredTime = new Date().getTime() + (1000 * 60 * 10);

    }
  },
};

const actions = {
  [ACT_CHECK_AUTH]() {
    return new Promise(resolve => {
      ApiService.query('/v1/admin/auth/', {}).
          then(response => resolve(response));
    });
  },
  [ACT_RENEW_AUTH]() {
    return new Promise(resolve => {
      ApiService.put('/v1/admin/auth/', {}).then(response => resolve(response));
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};