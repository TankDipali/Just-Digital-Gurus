import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z ]+$')
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')
            ]),
            dob: new FormControl('', [
                Validators.required
            ])
        });

        const body = {title: "Angular Request"};
        this.http.put<any>('http://localhost/api.php', body).subscribe(data => console.log(data));
    }

    onSubmit(): void {
        console.log(this.registerForm.value);
    }
}