/**
 * Custom router component for router
 * Wrapper for links
 * Author: Mark Kiss 2024 - <amarco1154@gmail.com>
 */

class VerinaRouter extends HTMLElement{
    constructor() {
        super();
        this.window = window;

        const existingRouters = document.querySelectorAll("verina-router");
        if(existingRouters.length > 1){
            console.error("----------");
            console.error(this);
            console.error("You can only define one router!");
            console.error("----------");
            return;
        }
    }
}


window.customElements.define("verina-router", VerinaRouter);