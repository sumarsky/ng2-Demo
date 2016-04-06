import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
    selector: "my-app",
    template: `
        <form>
            <input name="username" #newUsername placeholder="username">
            <input name="message" #newMessage placeholder="message">
            <button (click)="addComment(newUsername, newMessage)">
                Submit
            </button>
        </form>
    `
})
class MyApp {
    constructor() {
    }

    addComment(username: HTMLInputElement, message: HTMLInputElement): void {
        console.log(`Adding comment from: ${username.value} and message: ${message.value}`);
    }
}

bootstrap(MyApp);