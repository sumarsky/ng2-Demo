import { bootstrap } from "angular2/platform/browser";
import { Component, Input } from "angular2/core";

@Component({
    selector: "my-app",
    template: `        
        <div>
            Hello World
        </div>
    `
})
class MyApp {

}

bootstrap(MyApp);