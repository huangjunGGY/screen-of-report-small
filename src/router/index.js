import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '数字公务员'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/pages/search.vue'),
    meta: {
      title: '搜索新闻'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/pages/detail.vue'),
    meta: {
      title: '新闻详情'
    }
  },
  {
    path: '/read-list',
    name: 'read-list',
    component: () => import('@/pages/read-list.vue'),
    meta: {
      title: '今日阅读列表'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found.vue'),
    meta: {
      title: '404'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
