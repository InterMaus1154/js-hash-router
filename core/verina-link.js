/**
 * Custom link component for router
 * Author: Mark Kiss 2024 - <amarco1154@gmail.com>
 */
class VerinaLink extends HTMLAnchorElement{
    constructor() {
        super();

        this.window = window;
        let href = this.href;
        if(!href){
            console.error("----------");
            console.error(this);
            console.error("No href attribute found!");
            console.error("----------")
            return;
        }

        const parent = this.parentNode;
        if(parent.nodeName !== "VERINA-ROUTER"){
            console.error("----------");
            console.error("Links must be wrapped inside a verina-router component!");
            console.error("----------");
            return;
        }

        href = this.getAttribute("href");

        this.addEventListener("click", e => {
           e.preventDefault();
           this.window.location.hash = href;
        });
    }
}

window.customElements.define("verina-link", VerinaLink, {extends: "a"});