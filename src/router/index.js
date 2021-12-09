import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: Home,
    component: Home,
    children: [
      {
        path: '/Commidity',
        name: 'Commidity',
        component: () => import(/* webpackChunkName: "activityconfiguration" */ '../views/Commidity.vue'),
      }, {
        path: '/ComConfig',
        name: 'ComConfig',
        component: () => import(/* webpackChunkName: "activityconfiguration" */ '../views/ComConfig.vue'),
      }, {
        path: '/FrmLoss',
        name: 'FrmLoss',
        component: () => import(/* webpackChunkName: "activityconfiguration" */ '../views/FrmLoss.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
