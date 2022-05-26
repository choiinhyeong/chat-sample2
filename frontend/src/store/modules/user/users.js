import ApiService from "@/assets/js/api.service";

export const ACT_GET_USERS = 'actGetUsers';

const state = {}

const mutations = {};

const actions = {

    [ACT_GET_USERS](context, userSn){
        console.log('ACT_GET_USERS;;',userSn)
        return new Promise(resolve => {
            ApiService.get('/api/chat/user',userSn).then(response => resolve(response))
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
