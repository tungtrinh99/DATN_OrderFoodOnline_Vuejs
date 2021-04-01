const Router = require('./api')
function router(app) {
    app.use('/api', Router)
}
module.exports = router;