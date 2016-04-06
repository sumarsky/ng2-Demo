import { bootstrap } from "angular2/platform/browser";
import { Component, Input } from "angular2/core";

class Comment {
    /**
     *This code is alternative to the shorthand below
     *    
     public username: string;
     public comment: string;
     public rating: number;
     constructor(username: string, comment: string, rating: number) {
         this.username = username;
         this.comment = comment;
         this.rating = rating;
    }
    */

    constructor(public username: string, public comment: string, public rating: number) { }

    rateUp(): void {
        this.rating += 1;
    }
    rateDown(): void {
        this.rating -= 1;
    }
}

@Component({
    selector: 'comment',
    inputs: ['comment'],
    template: `
        <hr>
        <div style="border: 2px solid #73AD21;">
            <h3>From: {{comment.username}}</h3>
            <h2>Message: {{comment.comment}}</h2>
            <h3>Rating: {{comment.rating}}</h3>
            <a href (click)="rateUp()">Like</a>
            <a href (click)="rateDown()">Dislike</a>
        </div>
    `
})
class CommentComponent {
    // below is alternative for inputs: ['comment'],
    //@Input() public comment: Comment;
    public comment: Comment;

    rateUp() {
        this.comment.rateUp();
        return false;
    }
    rateDown() {
        this.comment.rateDown();
        return false;
    }
}

@Component({
    selector: "my-app",
    directives: [CommentComponent],
    template: `
        <form>
            <input name="username" #newUsername placeholder="username">
            <input name="message" #newMessage placeholder="message">
            <button (click)="addComment(newUsername, newMessage)">
                Submit
            </button>
        </form>
        <div>
            <comment 
                *ngFor="#comment of getSortedComments()" 
                [comment]="comment">
            </comment>
        </div>
    `
})
class MyApp {
    private comments: Array<Comment>;

    constructor() {
        this.comments = [
            new Comment("Donald Trump", "I really love ng-2! Did you know that it is mostly used in CHINA?", 2),
            new Comment("Harry Potter", "In my opinion, React + Flux is way better!", 4),
            new Comment("Isaac Newton", "WOW! Angular 2 is great!", 5)
        ];
    }

    addComment(username: HTMLInputElement, message: HTMLInputElement): void {
        console.log(`Adding comment from: ${username.value} and message: ${message.value}`);
        this.comments.push(new Comment(username.value, message.value, 0));
        username.value = '';
        message.value = '';
    }

    getSortedComments(): Array<Comment> {
        return this.comments.sort((a: Comment, b: Comment) => b.rating - a.rating);
    }
}

bootstrap(MyApp);