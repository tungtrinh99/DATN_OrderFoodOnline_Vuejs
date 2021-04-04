module.exports.requireAuth = (to, from, next) => {

 
    var isAuthenticated = false;
    if (localStorage.getItem('logged-in'))
      isAuthenticated = true;
    else
      isAuthenticated = false;
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  
  }
  