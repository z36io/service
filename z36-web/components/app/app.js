/* global angular, _ */

window.z36 = angular
    .module('app', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('blue');
    })
    .service('i18n', function() {
        return window.i18n;
    })
    .service('url', function() {
        var service = this;
        service.build = function() {
            return window.URI(window.location.href);
        };
        service.qs = function() {
            return service.build().query(true) || {};
        };
    })
    .service('history', function() {
        var service = this;
        service.push = function(url) {
            if (_.get(window, 'history.pushState')) {
                window.history.pushState({}, '', url);
            }
        };
    })
    .service('api', function($sce, $http, $q) {
        var service = this;
        service.public = function() {
            return $q(function(resolve, reject) {
                $http.get(window.api + 'public')
                    .then(function(res) {
                        resolve(_.get(res, 'data.config'));
                    });
            });
        };
        service.price = function(code) {
            return $q(function(resolve, reject) {
                $http.get('https://api.coinbase.com/v2/prices/' + code + '-EUR/buy', {
                        headers: {
                            'CB-VERSION': '2015-04-08'
                        }
                    })
                    .then(function(res) {
                        resolve(Number(_.get(res, 'data.data.amount')));
                    });
            });
        };
    });
