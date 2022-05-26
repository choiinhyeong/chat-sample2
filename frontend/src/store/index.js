import { createStore } from 'vuex'
import auth from "@/store/modules/auth/auth";
import users from "@/store/modules/user/users";
import common from "@/store/modules/common/common";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    users,
    common
  }
})
