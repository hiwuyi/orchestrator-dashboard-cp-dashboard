import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
const home = () =>
    import ("@/components/Home.vue");
const dashboard = () =>
    import ("@/views/dashboard/index.vue");
const main = () =>
    import ("@/views/dashboard/main/index.vue");
const paymentHistory = () =>
    import ("@/components/paymentHistory.vue");
const UBIHistory = () =>
    import ("@/components/UBIHistory.vue");
const myCPInfo = () =>
    import ("@/views/dashboard/cpInfo/index.vue");

const routes = [{
        path: '/',
        redirect: '/provider-status'
    },
    {
        path: '/',
        component: home,
        children: [{
                path: '/provider-status',
                name: 'dashboard',
                component: main,
                meta: {
                    keepAlive: true,
                    title: ''
                }
            },
            {
                path: '/payment-history',
                name: 'paymentHistory',
                component: paymentHistory,
                meta: {
                    keepAlive: true,
                    title: ''
                },
                beforeEnter: (to, from, next) => {
                    if (!sessionStorage.getItem('access_token_swan')) {
                        next({
                            path: '/provider-status'
                        })
                    } else {
                        next()
                    }
                }
            },
            {
                path: '/UBI-reward-history',
                name: 'UBIHistory',
                component: UBIHistory,
                meta: {
                    keepAlive: true,
                    title: ''
                },
                beforeEnter: (to, from, next) => {
                    if (!sessionStorage.getItem('access_token_swan')) {
                        next({
                            path: '/provider-status'
                        })
                    } else {
                        next()
                    }
                }
            },
            {
                path: '/cp-profile',
                name: 'myCPInfo',
                component: myCPInfo,
                meta: {
                    keepAlive: true,
                    title: ''
                },
                beforeEnter: (to, from, next) => {
                    if (!sessionStorage.getItem('access_token_swan')) {
                        next({
                            path: '/provider-status'
                        })
                    } else {
                        next()
                    }
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router