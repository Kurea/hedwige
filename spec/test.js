// run with casperjs test spec/test.js

casper.on('remote.message', function(message) {
    console.log(message);
});

casper.test.begin('Hedwige does work', function(test) {
    casper.start('http://localhost:9292/accueil');
    
    casper.then(function() {
        test.assertExists('#app', 'Server responding')
    });

    casper.waitForSelector('h1');

    casper.then(function() {
        test.assertSelectorHasText('h1', 'Bienvenue chez Hedwige !', 'Page loaded');
        test.assertExists('div#button-next', 'Next button found');
    });

    casper.thenClick('div#button-next');

    casper.then(function() {
        test.assertSelectorHasText('h1', 'Votre appareil', 'Page 2 loaded');
        test.assertExists('#content>.form-horizontal', 'Form in page 2');
        test.assertExists('div#button-next.disabled', 'Next button disabled');
        
    });

    casper.run(function() {
        test.done();
    });
});


/*
casper.test.begin('Hedwige form does work', function suite(test) {
    casper.start("http://localhost:9292/new_stage");
    casper.waitFor(function check() {
        return this.evaluate(function() {
            return document.querySelectorAll('form').length > 0;
        });
    }, function() {
        this.fill('form.form-horizontal', {
            key: "id",
            prev: "appareil",
            next: "appliLecture",
            title: "titre",
            text: "texte",
        }, true);
    });

    casper.then(function() {
    });

    casper.run(function() {
        test.done();
    });
});*/
