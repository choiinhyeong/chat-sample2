import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    // {
    //   path: '/',
    //   redirect: '/chat'
    // },
    // {
    //     path: '/home',
    //     name: 'HomeMng',
    //     component: () => import('@/views/HomeMng')
    // },
    {
        path: '/chat',
        name: 'ChatMng',
        component: () => import('@/views/ChatMng')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;