import HomePage from './pages/HomePage.js';
import MoviePage from './pages/MoviePage.js';
import MovieDetail from './pages/MovieDetail.js';
import LoginPage from './pages/LoginPage.js';
import store from './store/store.js';

const router = new VueRouter({
  routes: [
    { path: '/', component: HomePage },
    { path: '/movies', component: MoviePage, meta: { needLogin: true } },
    {
      path: '/movies/:id',
      component: MovieDetail,
      meta: { needLogin: true }
    },
    { path: '/login', component: LoginPage }
  ],
  mode: 'hash'
});

router.beforeEach(function(to, from, next) {
  if (to.meta && to.meta.needLogin) {
    if (store.state.user.user !== null) next();
    else {
      store.commit('user/setState', { toPath: to.path });
      next('/login');
    }
  } else next();
});

export default router;
