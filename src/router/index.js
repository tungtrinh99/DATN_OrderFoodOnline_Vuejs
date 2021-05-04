import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

// configure router
const router = new Router({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  let adminLoggedIn = JSON.parse(localStorage.getItem('admin_logged_in'));
  let customerLoggedIn = JSON.parse(localStorage.getItem('default_auth_token'));
  if (to.matched.some(record => record.meta.auth)) {

    if (!adminLoggedIn) {
      next('/admin/login');
    } else {
      next();
    }
  } else {
    next()
  }
});
export default router;
