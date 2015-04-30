define(['utils/localstorage','App'], function(LocalStorage, App){
    var utils = {

        Ajax: {
            get: function (url, data, callback, type, errorcallback, otherdata) {
                if (typeof data == 'undefined' || data == null) data = {};
                return this.execute(url, data, callback, type, 'GET', errorcallback, otherdata);
            },
            post: function (url, data, callback, type, errorcallback, otherdata) {
                if (typeof data == 'undefined' || data == null) data = {};
                return this.execute(url, data, callback, type, 'POST', errorcallback, otherdata);
            },
            put: function (url, data, callback, type) {
                return this.execute(url, data, callback, type, 'PUT');
            },
            delete_: function (url, data, callback, type) {
                return this.execute(url, data, callback, type, 'DELETE');
            },
            execute: function (url, data, callback, type, method, errorcallback, otherdata) {

                    if (typeof errorcallback == 'undefined' || errorcallback == null) errorcallback = this.defaultError;

                    var isAsyncCall = true;

                    return $.ajax({
                        type        : method,
                        url         : url,
                        dataType    : type,
                        contentType : "application/json",
                        data        : JSON.stringify(data),
                        crossDomain : true,
                        async       : isAsyncCall,
                        timeout     : 30000,
                        beforeSend  : function(xhr){
                            if(otherdata && otherdata.noAuthentication)
                                return;
                        },
                        success     : function (data) {
                            var args = arguments[2];
                            if (typeof otherdata == 'undefined')
                                callback.call(this, data);
                            else
                                callback.call(this, data, otherdata);
                        },
                        error       : function (xhr, ajaxOptions, thrownError) {
                            // Check if refersh is done
                            if(xhr.statusText == 'timeout'){
                                App.vent.trigger("noData",true) 
                            }
                            else if(xhr.status == 401 && window.location.hash != '#login'){
                                App.execute("logout",true);
                            }
                            else errorcallback.call(xhr, ajaxOptions, thrownError);
                        }
                    });
            },
            defaultError: function (data, textStatus, jqXHR) {
            }
        },
        
        isMobile:{
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        },
        
    };
    return utils;
});