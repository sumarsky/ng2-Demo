import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
    selector: "my-app",
    template: `
        Hello Igor
    `
})
class MyApp {
    constructor() {
    }

    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    }
}

bootstrap(MyApp);