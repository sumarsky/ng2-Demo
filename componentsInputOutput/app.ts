import { bootstrap } from "angular2/platform/browser";
import { Component, Input, EventEmitter } from "angular2/core";

export class Counter {
    value: number;

    constructor() {
        console.log("Counter.constructor()");
        this.value = 0;
    }

    increase() {
        console.log("Counter.increase()");
        this.value += 1;
    }
    decrease() {        
        console.log("Counter.decrease()");
        this.value -= 1;
    }
}

@Component({
    selector: "my-increase-decrease",
    outputs: ["increase", "decrease"],
    template: `
        <button (click)="doIncrease()">Increase</button>
        <button (click)="doDecrease()">Decrease</button>
    `
})
class IncreaseDecreaseComponent {
    increase: EventEmitter<any>;
    decrease: EventEmitter<any>;
    
    constructor() {
        console.log("CounterComponent.constructor()");
        this.increase = new EventEmitter();
        this.decrease = new EventEmitter();
    }

    doIncrease() {
        console.log("CounterComponent.doIncrease()");
        this.increase.emit(null);
    }

    doDecrease() {
        console.log("CounterComponent.doDecrease()");
        this.decrease.emit(null);
    }
}

@Component({
    selector: "my-app",
    directives: [IncreaseDecreaseComponent],
    template: `
        <div>
            {{ counter.value }}
            <br>
            <button (click)="counterIncrease()">Increase</button>
            <button (click)="counterDecrease()">Decrease</button>
        </div>
        <hr>
        <div>
            {{ counterUsingComponent.value }}
            <br>
            <my-increase-decrease
                (increase)="executeIncrease($event)"
                (decrease)="executeDecrease($event)">
            </my-increase-decrease>
        </div>
    `
})
class MyApp {
    private counter: Counter;
    private counterUsingComponent: Counter;

    constructor() {
        console.log("MyApp.constructor()");
        this.counter = new Counter();
        this.counterUsingComponent = new Counter();
    }

    counterIncrease() {
        console.log("MyApp.counterIncrease()");
        return this.counter.increase();
    }

    counterDecrease() {
        console.log("MyApp.counterDecrease()");
        return this.counter.decrease();
    }

    executeIncrease() {
        console.log("MyApp.executeIncrease()");
        this.counterUsingComponent.increase();
    }
    executeDecrease() {
        console.log("MyApp.executeDecrease()");
        this.counterUsingComponent.decrease();
    }
}

bootstrap(MyApp);