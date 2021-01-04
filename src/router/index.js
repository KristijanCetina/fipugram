import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        requiredUser: true,
    }
},
{
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Login.vue')
},
{
    path: '/signup',
    name: 'Signup',
    component: () =>
        import('../views/Signup.vue')
},
{
    path: '/payment',
    name: 'Payment',
    component: () =>
        import('../views/Payment.vue'),
    meta: {
        requiredUser: true,
    }
},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const unidentifiedUser = (store.currentUser === null);

    if (unidentifiedUser && to.meta.requiredUser) {
        next('login')
    }
    else {
        next()
    }
})

export default router