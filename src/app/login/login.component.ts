import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    const body = {title: "Angular Request"};
    this.http.put<any>('http://localhost/api.php', body).subscribe(data => console.log(data));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http.post('http://localhost/api.php', this.loginForm.value)
        .subscribe(response => {
          console.log(response);
         }, error => {
          console.error(error);
        });
    }
  }
}