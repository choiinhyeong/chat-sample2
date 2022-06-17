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
        path: '/cloud/now',
        name: 'CloudNow',
        component: () => import('@/views/CloudNow')
    },
    {
        path: '/cloud/on',
        name: 'CloudOn',
        component: () => import('@/views/CloudOn')
    },
    {
        path: '/cloud/conf',
        name: 'LiveConference',
        component: () => import('@/components/LiveConference')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;