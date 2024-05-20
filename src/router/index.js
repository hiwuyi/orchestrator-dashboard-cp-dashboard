import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
const home = () =>
    import ("@/components/Home");
const dashboard = () =>
    import ("@/views/dashboard/index");
const main = () =>
    import ("@/views/dashboard/main/index");
const rankings = () =>
    import ("@/views/dashboard/rankings/index");
const aar = () =>
    import ("@/views/dashboard/aar/index");
const accountInfo = () =>
    import ("@/views/dashboard/accountInfo/index");

const routes = [{
        path: '/',
        redirect: '/overview'
    },
    {
        path: '/',
        component: home,
        children: [{
                path: '/overview',
                name: 'dashboard',
                component: main,
                meta: {
                    keepAlive: true,
                    title: ''
                }
            },
            {
                path: '/rankings/:type',
                name: 'rankings',
                component: rankings,
                meta: {
                    keepAlive: true,
                    title: ''
                },
                // beforeEnter: (to, from, next) => {
                //     if (!sessionStorage.getItem('access_token_swan')) {
                //         next({
                //             path: '/overview'
                //         })
                //     } else {
                //         next()
                //     }
                // }
            },
            {
                path: '/aar/:type',
                name: 'aar',
                component: aar,
                meta: {
                    keepAlive: true,
                    title: ''
                }
            },
            {
                path: '/accountInfo/:type',
                name: 'accountInfo',
                component: accountInfo,
                meta: {
                    keepAlive: true,
                    title: ''
                },
                beforeEnter: (to, from, next) => {
                    if (!sessionStorage.getItem('access_token_swan')) {
                        next({
                            path: '/overview'
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