import {Component} from 'angular2/core';
import {
    Router,
    RouterOutlet,
    RouteConfig,
    RouterLink
} from 'angular2/router';

@Component({
    template: `
        <h1>NestedHomeComponent</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus praesentium fugiat aperiam quidem. Aperiam sunt, velit blanditiis. Aut, ipsa ut dicta molestias nostrum iste tempore blanditiis quam provident beatae cumque atque hic, eos dolores doloremque ab repudiandae! Itaque architecto expedita soluta quia reiciendis dolores ut hic odit numquam sint. Autem natus quia, quo architecto dolorem sed deleniti, amet laudantium perferendis neque culpa praesentium est omnis! Alias quas dolore, reprehenderit neque cupiditate. Quisquam ea assumenda ullam commodi quaerat necessitatibus facere? Nobis in ipsa quaerat architecto perferendis nulla maiores nisi nihil optio libero exercitationem error, magnam sint temporibus esse corporis? Unde, quas!</p>
    `
})
class NestedHomeComponent { }

@Component({
    template: `<h1>NestedAboutComponent</h1>`
})
class NestedAboutComponent { }

@Component({
    selector: 'nested',
    directives: [RouterOutlet, RouterLink],
    template: `
        <h1>NestedComponent</h1>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-nested-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>                    
                </div>

                <div class="collapse navbar-collapse" id="bs-nested-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['./Home']">Home</a></li>
                        <li><a [routerLink]="['./About']">About</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="content">
            <router-outlet></router-outlet>
        </div>
  `
})
@RouteConfig([
    { path: '/home', name: 'Home', component: NestedHomeComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: NestedAboutComponent },
    { path: '*', redirectTo: ['Home'] } // fallback route
])

export class NestedComponent { }