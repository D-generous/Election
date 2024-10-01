import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatInputModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  public signinForm:any
  constructor(public formbuilder: FormBuilder, public http:HttpClient, public routes:Router) {}
  public email:any=''
  public pass:any=''

  ngOnInit(){

    this.signinForm = this.formbuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    })
  }

  setCookieFromBackend() { 
    
  }



public message:any=''
  onSubmit(){

    this.email= this.signinForm.value['email']
    this.pass= this.signinForm.value['pass']

    let obj ={
      email: this.email,
      pass: this.pass
    }


    this.http.post('https://dgen.com.ng/signin.php',obj,{ withCredentials: true }).subscribe( 
      (response:any) => { 
        this.message = response.message

        

        if (response.token) {
          document.cookie = `jwt_token=${response.token}; path=/;`;
          this.routes.navigate(['/dashboard']);
        }

        
        
      }, 
      (error) => { 
        this.message = error
      } 
    ); 
    
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
