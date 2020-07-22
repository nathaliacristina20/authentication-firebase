/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onSubmit(){
        this.loading = true;
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        this.authService.login(email, password)
            .subscribe(
                (u) => {
                    this.loginOkNotification(u);
                    this.router.navigateByUrl('/');
                    this.loading = false;
                },
                (err) => {
                    this.loginErrorNotification(err);
                    this.loading = false;
                }
            );
    }

    loginGoogle(){

    }

    private loginOkNotification(u: User): void {
        this.snackBar.open(`Logged in successfuly. Welcome ${u.firstname}!`, 'OK', { duration: 2000} );
    }

    private loginErrorNotification(err): void {
        this.snackBar.open(err, 'OK', { duration: 2000} );
    }

}
