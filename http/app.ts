import 'rxjs/Rx';
import { bootstrap } from "angular2/platform/browser";
import { Component, Input } from "angular2/core";
import { HTTP_PROVIDERS, Http, Response } from 'angular2/http';
import { Observable } from 'rxjs';

let BLOG_POSTS: string = 'http://jsonplaceholder.typicode.com/posts';

class Post {
    public id: number;
    public userId: number;
    public title: string;
    public body: string;
}

@Component({
    selector: "my-app",
    template: `
        <div class="row">
            <div class="col-sm-12"><button class="btn btn-success" (click)="doGet()">Retrieve data</button></div>            
        </div>
        <div class="row">
            <div class="col-sm-10"><input type="text" class="form-control" placeholder="Post" #postBody></div>
            <div class="col-sm-2"><button class="btn btn-primary" (click)="doPost(postBody)">Post</button></div>
        </div>

        <div class="row">
            <div *ngFor="#blogPost of blogPosts">
                <hr>
                <p> {{blogPost | json}} </p>
                <button class="btn btn-danger" (click)="doDelete(blogPost)">Delete</button>
            </div>
        </div>
    `
})
class MyApp {
    private blogPosts: Array<Post>;
    constructor(public http: Http) {
        this.blogPosts = new Array<Post>();
    }

    doGet() {
        this.http.get(BLOG_POSTS)
            .map(res => res.json())
            .subscribe((posts) => this.blogPosts = posts);
    }
    doPost(postBody: HTMLInputElement) {
        var newPost = new Post();
        newPost.body = postBody.value;
        newPost.title = "NEW";
        newPost.userId = 1;

        this.http.post(BLOG_POSTS, JSON.stringify(newPost))
            .subscribe((res) => {
                newPost.id = res.json().id;
                this.blogPosts.unshift(newPost);
            });
    }
    doDelete(blogPost: Post) {
        this.http.delete(BLOG_POSTS + "/" + blogPost.id)
            .subscribe((res: Response) => {
                var index = this.blogPosts.indexOf(blogPost);
                if (index > -1) {
                    this.blogPosts.splice(index, 1);
                }
                return false;
            });
    }
}

bootstrap(MyApp, [
    HTTP_PROVIDERS
]);