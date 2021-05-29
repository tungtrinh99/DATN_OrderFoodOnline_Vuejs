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
  let merchantLoggedIn = JSON.parse(localStorage.getItem('merchant_logged_in'));
  let customerLoggedIn = JSON.parse(localStorage.getItem('default_auth_token'));
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;


  next();
  if (to.matched.some(record => record.meta.auth)) {

    if (!adminLoggedIn) {
      next('/admin/login');
    } else {
      next();
    }
  } else {
    next()
  } 
  if (to.matched.some(record => record.meta.authMerchant)) {

    if (!merchantLoggedIn) {
      next('/merchant/login');
    } else {
      next();
    }
  } else {
    next()
  }
});
export default router;
