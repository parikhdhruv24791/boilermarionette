require.config({
    deps: ['main'],
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneRouteFilter: {
            deps: ['backbone']
        },
        marionette: {
            deps: ['backbone','backbone.wreqr', 'backbone.babysitter'],
            exports: 'Backbone.Marionette'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery.min',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        tpl: '../bower_components/requirejs-tpl/tpl',
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter'
    },
    catchError: {
        define: true
    },
    waitSeconds: 200
});

// Load Error Handler Module
require(function() {
    require.onError = function(err) {
        if (err.requireType === 'timeout') {
            alert("Unfortunately an error occurred, please try again.");
        } else {
            alert("Error : Module loading fail." + err);
        }
    };
});