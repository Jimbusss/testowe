import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useLoginStore } from 'src/stores/LoginStore';

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });


  Router.beforeEach((to) => {
    const loginStore = useLoginStore();

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !loginStore.isLoggedIn) {
      return { name: 'login' };
    }
  });

  return Router;
});