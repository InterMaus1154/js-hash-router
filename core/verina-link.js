/**
 * Custom link component for router
 * Author: Mark Kiss 2024 - <amarco1154@gmail.com>
 */
class VerinaLink extends HTMLAnchorElement{
    constructor() {
        super();

        const href = this.href;
        if(!href){
            console.error("----------");
            console.error(this);
            console.error("No href attribute found!");
            console.error("----------")
            return;
        }

        this.addEventListener("click", e => {
            e.preventDefault();
            window.history.pushState({}, "", href);
            window.dispatchEvent(new Event("popstate"));
        });
    }
}

window.customElements.define("verina-link", VerinaLink, {extends: "a"});