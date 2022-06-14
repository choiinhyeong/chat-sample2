import ApiService from "@/assets/js/api.service";

export const ACT_GET_USERS = 'actGetUsers';
export const ACT_GET_USERS_ENCRYPT = 'actGetUsersEncrypt';
export const ACT_GET_USERS_DECRYPT = 'actGetUsersDecrypt';
export const ACT_GET_REDIS_USERS_LIST = 'actGetRedisUsersList';

const state = {
}

const mutations = {
};

const actions = {

    [ACT_GET_USERS](context, userSn){
        console.log('ACT_GET_USERS;;',userSn)
        return new Promise(resolve => {
            ApiService.get('/api/chat/user',userSn).then(response => resolve(response))
        });
    },
    [ACT_GET_USERS_ENCRYPT](context, params){
        console.log('ACT_GET_USERS_ENCRYPT;;',params)
        return new Promise(resolve => {
            ApiService.query('/api/chat/users/encrypt',params).then(response => resolve(response))
        });
    },
    [ACT_GET_USERS_DECRYPT](context, params){
        console.log('ACT_GET_USERS_DECRYPT;;',params)
        return new Promise(resolve => {
            ApiService.query('/api/chat/users/decrypt',params).then(response => resolve(response))
        });
    },
    [ACT_GET_REDIS_USERS_LIST](context, channelNo){
        console.log('ACT_GET_REDIS_USERS_LIST;;',channelNo)
        return new Promise(resolve => {
            ApiService.query('/api/chat/redis/userlist',channelNo).then(response => resolve(response))
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
