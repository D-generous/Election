import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, MatCheckboxModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public userForm: any; 
  isChecked:any= false
  

  constructor(public http:HttpClient, private formbuilder: FormBuilder, public routes:Router) {}

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      statecode: ['', [Validators.required, Validators.maxLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      agree: [false, Validators.requiredTrue] 
    });
  }
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const isValid = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value);
    return isValid ? null : { 'invalidPassword': true };
  }

  get statecode() {
    return this.userForm.get('statecode');
  }

  public msg:any=''

  onSubmit(): void {
    

    let obj ={
      name:this.userForm.value['name'],
      statecode:this.userForm.value['statecode'],
      email:this.userForm.value['email'],
      password:this.userForm.value['password'],

    }

    this.http.post('https://dgen.com.ng/signup.php', obj, { withCredentials: true }).subscribe((data:any)=>{
      this.msg = data

      if (data.status===true) {
        this.routes.navigate(['/signin'])
        
      }

      
    })
    
  }
}



