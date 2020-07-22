/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required, Validators.minLength(6)]
    });

    loading = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
    }

    onSubmit(){

    }

    loginGoogle(){

    }

}
