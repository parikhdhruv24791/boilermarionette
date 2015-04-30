/*global require*/
'use strict';

define([
    'App',
    'routers/mainRouter'
], function (App, mainRouter) {
	//Start The Router
    App.Router = new mainRouter();
    //Start The Application
    App.start();
});
