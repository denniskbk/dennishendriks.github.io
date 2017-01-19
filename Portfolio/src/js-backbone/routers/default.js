/* eslint-disable no-console */
import { Router as BackboneRouter } from 'backbone';

// import MediaComponent from '../components/media';

class Router extends BackboneRouter {

    get componentMap() {
        return {
            // media: MediaComponent,
            // office: OfficeComponent,
            // officeAddress: OfficeAddressComponent,
            // filter: FilterComponent,
            // linkbox: LinkboxComponent,
            // slider: SliderComponent,
        };
    }

    get routes() {
        return {
            '*urlPath': 'loadComponents',
        };
    }

    route(route, name, callback) {
        const finalCallback = callback || typeof name === 'function' ? name : this[name];
        const finalName = typeof name === 'string' ? name : '';

        const wrapped = (...args) => {
            this.unloadComponents.apply(this, args);
            finalCallback.apply(this, args);
        };

        BackboneRouter.prototype.route.apply(this, [route, finalName, wrapped]);
    }

    unloadComponents() {
        // if ('activeComponents' in this) {
        //     // TODO: destroy active components
        //     console.log('destroy active components');
        // }
    }

    loadComponents() {
        this.activeComponents = [];

        const elementlist = document.querySelectorAll('[data-js-component]');
        [].slice.call(elementlist).forEach((el) => {
            const index = el.getAttribute('data-js-component');
            if (index in this.componentMap) {
                const instance = new this.componentMap[index](el);
                this.activeComponents.push(instance);
            }
        });
    }
}

export default Router;
