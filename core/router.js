

export default class Router {

    #routes = {};

    #routePattern = /[^a-zA-Z0-9/#]/;

    #errors = {
        "no-router" : "No router component found. \nYou need to include a verina-router component!",
        "no-renderer": "No verina-render component found.\nIt is required to render out content!",
        "non-unique-route": "All routes must be unique. Duplicate route detected!",
        "illegal-route": "Route contains illegal characters.",
        "empty-route": "Empty route or view found!",
        "duplicate-index": "Only one route can be marked as index!"
    };

    constructor() {

        this.router = document.querySelector("verina-router");
        if(!this.router){
            this.#panic(this.#errors["no-router"]);
            return;
        }

        this.renderer = document.querySelector("verina-render");
        if(!this.renderer){
            this.#panic(this.#errors["no-renderer"]);
            return;
        }

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
            this.#panic(this.#errors["empty-route"]);
            return;
        }

        if(this.#routes[route]){
            this.#panic(this.#errors["non-unique-route"]);
            return;
        }

        if(this.#routePattern.test(route)){
            this.#panic(this.#errors["illegal-route"]);
            return;
        }

        if(this.#routes && index){
            for(const [key, value] of Object.entries(this.#routes)){
                if(value.index){
                    this.#panic(this.#errors["duplicate-index"], "You defined the following route as index already: "+ key);
                    break;
                }
            }
        }

        this.#routes[route] = {
            view,
            index
        };
    }

    #render(hash){
        hash = hash.replaceAll("#", "");
        const currentRoute = this.#routes[hash];
        const viewPath = "../" + currentRoute.view;


        fetch(viewPath)
            .then(r => r.text())
            .then(r =>{

            });
    }

    #panic(error, additionalMessage = ""){
        const body = document.body;

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./core/verina-style.css";
        css.type = "text/css";
        document.head.appendChild(css);

        body.innerHTML = "";

        const errorMessage = document.createElement("h1");
        errorMessage.innerText = error;

        const paragraph = document.createElement("p");
        paragraph.innerText = additionalMessage;

        body.appendChild(errorMessage);
        body.appendChild(paragraph);

    }

    /**
     * Get the registered routes
     * @returns {{}} - object of registered routes
     */
    get routes(){
        return this.#routes;
    }
}