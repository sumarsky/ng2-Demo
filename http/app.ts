import { bootstrap } from "angular2/platform/browser";
import { Component, Input } from "angular2/core";

@Component({
    selector: "my-app",
    template: `
        <div>hello world</div>
    `
})
class MyApp {
    constructor() { }
}

bootstrap(MyApp);