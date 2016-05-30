import { bootstrap } from "angular2/platform/browser";
import { Component, Input, provide } from "angular2/core";
import {
    RouteConfig,
    RouteParams,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    APP_BASE_HREF} from 'angular2/router';

import { NestedComponent } from "./nested.js"

@Component({
    template: `
        <h1>HomeComponent</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus praesentium fugiat aperiam quidem. Aperiam sunt, velit blanditiis. Aut, ipsa ut dicta molestias nostrum iste tempore blanditiis quam provident beatae cumque atque hic, eos dolores doloremque ab repudiandae! Itaque architecto expedita soluta quia reiciendis dolores ut hic odit numquam sint. Autem natus quia, quo architecto dolorem sed deleniti, amet laudantium perferendis neque culpa praesentium est omnis! Alias quas dolore, reprehenderit neque cupiditate. Quisquam ea assumenda ullam commodi quaerat necessitatibus facere? Nobis in ipsa quaerat architecto perferendis nulla maiores nisi nihil optio libero exercitationem error, magnam sint temporibus esse corporis? Unde, quas!</p>
    `
})
class HomeComponent { }

@Component({
    template: `<h1>AboutComponent</h1>`
})
class AboutComponent { }

@Component({
    template: `
        <h1>Post</h1>
        <h2>{{getPost()}}</h2>        
    `
})
class PostComponent {
    id: number;
    posts: Array<string> = ["First post", "Second post"];

    constructor(private routeParams: RouteParams) {
        this.id = +routeParams.get('id'); // parseInt or parseFloat functions, or simply use the unary + operator
    }

    getPost() {
        if (this.id < this.posts.length) {
            return this.posts[this.id];
        }
        return "404 - Not Found"
    }
}

@Component({
    selector: "my-app",
    directives: [ROUTER_DIRECTIVES],
    template: `
        <div class="content">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Router</a>
                    </div>

                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right">
                            <li><a [routerLink]="['/Home']">Home</a></li>
                            <li><a [routerLink]="['/About']">About</a></li>
                            <li><a [routerLink]="['/Nested']">Nested</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <router-outlet></router-outlet>
        </div>
    `
})
@RouteConfig([
    { path: '/', redirectTo: ['/Home'], useAsDefault: true },
    { path: '/home', name: 'Home', component: HomeComponent },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/aboutus', name: 'AboutUs', redirectTo: ['/About'] },
    { path: '/nested/...', name: 'Nested', component: NestedComponent },
    { path: '/posts/:id', name: 'Post', component: PostComponent },
    { path: '*', redirectTo: ['/Home'] } // fallback route
])
class MyApp {

}

bootstrap(MyApp, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }) //default is PathLocationStrategy, but F5 wont work because server routing is not configured
]);