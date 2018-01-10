/* global _ */

window.z36.controller('controller', function($timeout, i18n, url, history, api) {
    var ctrl = this;

    ctrl.init = function() {
        var qs = url.qs();
        ctrl.config = undefined;
        ctrl.price = {};
        ctrl.setFrom(qs.from);
        ctrl.setTo(qs.to);
        ctrl.label = {
            paypal: i18n.eur,
            liqpay: i18n.uah,
            payoneer: i18n.usd
        };
    };

    ctrl.change = function() {
        if (ctrl.from === ctrl.to) {
            ctrl.setTo();
        }
        ctrl.toName = i18n[ctrl.to];
        ctrl.history();
    };

    ctrl.history = function() {
        var qs = url.qs();
        qs.from = ctrl.from;
        qs.to = ctrl.to;
        history.push(url.build().query(qs).search());
    };

    ctrl.initConfig = function() {
        if (!ctrl.config) {
            api.public().then(function(config) {
                $timeout(function() {
                    ctrl.config = config;
                });
            });
        }
    };

    ctrl.calc = function() {
        var price = ctrl.price[ctrl.to];
        if (price && ctrl.config) {
            return Math.floor(ctrl.amount * (1 - ctrl.config.fee) / price);
        }
    };

    ctrl.initPrice = function() {
        var price = ctrl.price[ctrl.to];
        if (!price) {
            api.price(ctrl.to).then(function(price) {
                $timeout(function() {
                    ctrl.price[ctrl.to] = price;
                });
            });
        }
    };

    ctrl.setFrom = function(from) {
        ctrl.from = from || undefined;
    };

    ctrl.setTo = function(to) {
        ctrl.to = to || undefined;
    };

    ctrl.init();
    ctrl.change();

});
