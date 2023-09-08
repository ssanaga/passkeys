var router = require('express').Router();
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});


/*router.use(
  auth({
    issuerBaseURL: 'https://sstrain.cic-demo-platform.auth0app.com',
    baseURL: 'http://localhost:3000',
    clientID: 'XBNnjGgJDrYPyXkeK0rh8LopJvv8CO8G',
    secret: 'LONG_RANDOM_STRING',
    authorizationParams: {
      // Note: you need to provide required parameters if this object is set.
      response_type: "id_token",
      response_mode: "form_post",
      scope: "openid profile email read:payments"
      //acr_value: "do-step-up-mfa",
      // custom_param: "custom-value"
    }
  })
)

/*router
  .route('/step-up-mfa-required')
  .all(requiresAuth())
  .get(
    controller.serveStepUpAuth
  )*/


router.get('/sensitivePage', requiresAuth(), function (req, res, next) {

  // Request for elevated scopes like read:payments

  res.render('sensitivePage', {
    userAmount: 'Amount: $1000',
    title: 'Sensitive page'
  });
});


module.exports = router;
