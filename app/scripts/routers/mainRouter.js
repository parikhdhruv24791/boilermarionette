
define(['underscore', 'marionette', 'controllers/mainController', 'utils/appConfig' ,'App'], function(_, Marionette, Controller, appConfig, App){

    'use strict'

    return Marionette.AppRouter.extend({
        controller: new Controller(),
        before: {
            '*any': function(fragment, args) {
                // Code to store hash list
                var _hash = window.location.hash;

             
            }
        },
        appRoutes: {
            ""                                    : "home"
        }
    });
});