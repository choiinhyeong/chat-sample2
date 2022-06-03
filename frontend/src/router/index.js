import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    // {
    //     path: '/',
    //     redirect: '/home'
    // },
    // {
    //     path: '/home',
    //     name: 'HomeMng',
    //     component: () => import('@/views/HomeMng')
    // },
    {
        path: '/',
        name: 'ChatMng',
        component: () => import('@/views/ChatMng')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;