import { bootstrap } from "angular2/platform/browser";
import { Component, Input } from "angular2/core";
import { FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators } from "angular2/common";

@Component({
    selector: "form-1",
    directives: [FORM_DIRECTIVES],
    template: `        
        <form #f="ngForm" 
                (ngSubmit)="onSubmit(f.value)">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="f1_nameField" placeholder="Name" 
                    ngControl="name">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `
})
export class form1 {
    onSubmit(value: string) {
        console.log(value);
    }
}

@Component({
    selector: "form-2",
    directives: [FORM_DIRECTIVES],
    template: `        
        <form [ngFormModel]="myForm" 
                (ngSubmit)="onSubmit(myForm.value)">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="f2_nameField" placeholder="Name" 
                    [ngFormControl]="myForm.controls['name']">
            </div>
            
            <div *ngIf="myForm.controls['name'].hasError('required')" class="alert alert-danger">Name is required.</div>
            <div *ngIf="!myForm.controls['name'].valid" class="alert alert-danger">Name must start with a big letter.</div>
            <div *ngIf="!myForm.valid" class="alert alert-danger">Form is invalid.</div>
            
            <button type="submit" [disabled]="!myForm.valid" class="btn btn-primary">Submit</button>
        </form>
    `
})
export class form2 {
    myForm: ControlGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'name': ['', Validators.compose([
                Validators.required,
                this.nameValidator
            ])]
        });
    }
    
    onSubmit(value: string) {
        console.log(value);
    }
    nameValidator(control: Control): { [s: string]: boolean } {
        if (!control.value.match(/^[A-Z]/)) {
            return { invalidName: true };
        }
    }
}

@Component({
    selector: "my-app",
    directives: [form1, form2],
    template: `
        <h1> form-1 </h1>
        <form-1> </form-1>
        <hr>
        <h1> form-2 </h1>
        <form-2> </form-2>
        <hr>
    `
})
class MyApp {

}

bootstrap(MyApp);