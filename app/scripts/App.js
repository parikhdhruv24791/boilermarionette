define(['jquery', 'backbone', 'marionette','utils/templates'], function($, Backbone, Marionette, Templates){

    'use strict'

    var App = new Marionette.Application();

    App.addRegions({
        main: $('#main')
    });

    App.addInitializer(function() {
        //Make the Layout For the App
        this.initAppLayout();
    });

    App.on("initialize:after", function(){
        Backbone.history.start();
    });

    App.initAppLayout = function(){
        var slider;
        var contentReg = Backbone.Marionette.Region.extend({
            el: "#content",

            open: function(view){
               this.$el.empty().append(view.el);
            }
        });

        var AppLayout = Backbone.Marionette.Layout.extend({

            template: Templates['app-layout'],
            //Initialize the Sub Regions
            regions: {
                content: new contentReg()
            }

        });
        var layout = new AppLayout();
        //Show the Layout in the main region of the App
        App.main.show(layout);

        // this can be a main menu navigation
        // this will change content at the "main" app screen
        // your links should include the role=nav-main-app
        
    };

    return App;
});
