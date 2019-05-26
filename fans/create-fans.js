import acient from './fans-vue/app.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// Vue.use(ElementUI);
const routes = [
    {
        path: '/',
        component: acient
    },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router
}).$mount('#app1');


