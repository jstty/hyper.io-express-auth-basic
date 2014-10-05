var hyper     = require('hyper.io');
var basicAuth = require('../index.js');

// add Basic Auth, this is optional,
// hyper.io will auto try to require the 'auth-basic'
// if it's not included in the middleware already
hyper().use(basicAuth);

// load config and routes
hyper().start({
    routes: [
        {
            required: {
                'auth-basic': {
                    user: 'joe',
                    pass: 'bob',
                    message: 'Login with user:"joe" pass:"bob"'
                }
            },
            api: "/hello",
            method: {
                get: function world($done)
                {
                    $done( { hello: "world" } );
                }
            }
        }
    ]
});
