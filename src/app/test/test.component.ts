import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule, MatRadioModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  loginForm: any='';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public errorMessage:any =''
  public message:any =''
  onSubmit() {
    const credentials = this.loginForm.value;

    // Send login request to backend
    this.http.post('http://localhost/Election/test.php', credentials, { withCredentials: true })
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.message = response.message
          // The JWT token will be stored in a cookie (set by backend)
          this.errorMessage = null; // Clear any previous error message
        },
        (error) => {
          console.error('Login failed: ');
          this.displayError(error)
        }
      );
  }

  // displayMessage(){

  // }

  // displayError(error: any) {
  //   // Generic error handling, you can customize this based on your error response
  //   if (error.status === 401) {
  //     this.errorMessage = 'Invalid credentials. Please try again.';
  //   } else if (error.status === 400) {
  //     this.errorMessage = 'Bad request. Please fill in all required fields.';
  //   } else if (error.status === 500) {
  //     this.errorMessage = 'Server error. Please try again later.';
  //   } else {
  //     this.errorMessage = 'An unexpected error occurred. Please try again.';
  //   }
  // }

  displayError(error: any) {
    if (error.error && error.error.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    }
  }
}
