

export default class Router {

    #routes = {};

    #routePattern = /[^a-zA-Z0-9/#]/;

    constructor() {
        window.addEventListener("hashchange", () => {
            this.#render(window.location.hash);
        });

        window.addEventListener("DOMContentLoaded", ()=>{
           this.#render(window.location.hash);
        });
    }

    /**
     * Register new routes in the router
     * @param route - route excluding # at the beginning
     * @param view - relative path to project root for the corresponding view
     * @param index - false by default, set to true if page is default (/) page aka home
     */
    register(route, view, index = false){
        route = route.replaceAll("#", "");

        if(route.trim().length === 0 || view.trim().length === 0){
            console.error("Route or view is empty!");
            console.error("Route:" + route);
            console.error("View: "+ view);
            console.error("Route and view must have non-empty values!");
        }

        if(this.#routes[route]){
            console.error("This route already is already registered!");
            console.error(route);
            console.error("All routes must be unique!");
            return;
        }

        if(this.#routePattern.test(route)){
            console.error("Route contains illegal characters!");
            console.error(route);
            console.error("Only letters, numbers, / and # signs are allowed!");
            return;
        }

        this.#routes[route] = {
            view,
            index
        };
    }

    #render(hash){
        console.log(hash);
    }

}