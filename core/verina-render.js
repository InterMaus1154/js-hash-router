/**
 * Custom render component where content is rendered to
 * Author: Mark Kiss 2024 - <amarco1154@gmail.com>
 */
class VerinaRender extends HTMLElement{
    constructor() {
        super();
        this.window = window;

        const existingRenders = document.querySelectorAll("verina-render");
        if(existingRenders.length > 1){
            console.error("----------");
            console.error(this);
            console.error("You can only define one renderer component!");
            console.error("----------");
            return;
        }
    }
}
window.customElements.define("verina-render", VerinaRender);