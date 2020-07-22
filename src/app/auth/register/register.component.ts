/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    formRegister: FormGroup = this.formBuilder.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        address: ['', []],
        city: ['', []],
        state: ['', []],
        phone: ['', []],
        mobilephone: ['', []],
        email: ['', [Validators.required]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        validator: this.matchingPasswords
    });

    states = ['MG', 'RS', 'SP', 'RJ'];

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    matchingPasswords(group: FormGroup): null | { matching: boolean } {
        if (group){
            const password1 = group.controls.password1.value;
            const password2 = group.controls.password2.value;

            if (password1 === password2){
                return null;
            }

            return { matching: false };
        }
    }

    onSubmit(): void {
        const newUser: User = {
            firstname: this.formRegister.value.firstname,
            lastname: this.formRegister.value.lastname,
            address: this.formRegister.value.address,
            city: this.formRegister.value.city,
            state: this.formRegister.value.state,
            phone: this.formRegister.value.phone,
            mobilephone: this.formRegister.value.mobilephone,
            email: this.formRegister.value.email,
            password: this.formRegister.value.password1,
        };
        this.authService.register(newUser)
            .subscribe(
                (u) => {
                    this.snackBar.open('Successfully registered. Use your new credentials to sign in.', 'OK',
                        { duration: 2000 });

                    this.router.navigateByUrl('/auth/login');
                },
                (err) => {
                    console.error(err);
                    this.snackBar.open('Error. You are not registered.', 'OK',
                        { duration: 2000 });
                }
            );
    }

}
