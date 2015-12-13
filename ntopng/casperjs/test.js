// CasperJS/PhantomJS Unit-Test Test
// Subject: ntopng 2.x

phantom.casperTest = true;

var casper = require('casper').create({   
    verbose: true, 
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false         // use these settings
    }
});

// set the viewport size to include all our page content.
casper.options.viewportSize = {width: 1200, height: 600};

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'http://127.0.0.1:3000/lua/login.lua?referer=/';

casper.start(url, function() {
    // search for 'casperjs' from google form
    console.log("page loaded");
    this.test.assertExists('form', 'Login form is found');
    this.fill('form', { 
        user: 'admin', 
        password:  'admin'
    }, true);
    this.click('button');
});


casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
});

casper.then(function() {
    // capture the entire page.
    casper.capture("ntopng.png");

    // capture the nav element.
    // casper.captureSelector("ntopng_footer.png", "#footer");
  });


casper.run(function() {
    var _this = this;

    _this.page.close();

    setTimeout(function exit(){
        _this.exit();
    }, 0);
});
