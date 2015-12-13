// CasperJS/PhantomJS Unit-Test Test
// Subject: Homer 5.x

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

/*
var fs = require('fs');
var referenceImage = fs.read('./reference.png');
var newImage = fs.read('./new_reference.png');
this.test.assert(newImage == referenceImage);
*/

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

var url = 'http://127.0.0.1/#/login';

casper.start(url, function() {
    // search for 'casperjs' from google form
    console.log("page loaded");
    this.test.assertExists('form', 'H5 Login form is found');
    this.fill('form', { 
        username: 'admin', 
        password: 'test1234'
    }, true);
    this.click('#login_buton');
});

casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
});

casper.then(function() {
   this.wait(2000, function() {
	    // capture the entire page.
	    casper.capture("homer5.png");
	    	// perform default search
		this.click('.btn-primary');
		   this.wait(2000, function() {
			    // capture the entire page.
			    casper.capture("homer5_search.png");
		    });
    });
  });

casper.run(function() {
    var _this = this;
    _this.page.close();
    setTimeout(function exit(){
        _this.exit();
    }, 0);
});
