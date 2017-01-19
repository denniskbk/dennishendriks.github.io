import Backbone from 'backbone';
// import Cookies from 'cookiejs';

import Router from './routers/default';

import PortfolioView from './views/portfolio';


class Application {

    get loadViews() {
        return [
            PortfolioView,
        ];
    }

    constructor() {
        this.setupAjax();
        this.setupViews();
        // this.setupRouter();
    }

    setupAjax() {
        Backbone.emulateHTTP = true;
        // Backbone.$.ajaxSetup({
        //     headers: {
        //         'X-CSRFToken': Cookies.get('csrftoken'),
        //     },
        // });
    }

    setupViews() {
        this.loadViews.forEach((ViewClass) => {
            const instance = new ViewClass;
            return instance;
        });
    }
    // 
    // setupRouter() {
    //     this.router = new Router;
    //     Backbone.history.start({
    //         hashChange: false,
    //         pushState: true,
    //         root: '/',
    //     });
    // }

}

(function bootstrap() {
    return new Application;
}());
