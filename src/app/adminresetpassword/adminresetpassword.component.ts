import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminresetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './adminresetpassword.component.html',
  styleUrl: './adminresetpassword.component.css'
})
export class AdminresetpasswordComponent {
  public userForm: any; 
  isChecked:any= false
  

  constructor(public http:HttpClient, private formbuilder: FormBuilder, public routes:Router) {}

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const isValid = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value);
    return isValid ? null : { 'invalidPassword': true };
  }


  public msg0:any=''
  public msg1:any=''

  onSubmit(): void {

    if (this.userForm.value['password'] === this.userForm.value['confirmPassword']) {
      // console.log("same to same");
      
          let obj ={
            password:this.userForm.value['password'],
      
      
          }
          console.log(obj);
        
          
      
          this.http.post('https://dgen.com.ng/Election/adminresetpassword.php', obj).subscribe((data:any)=>{
            // if (data.state===false) {
            //   this.msg0 = data.message
            //   this.showMessageWithTimeout(this.msg0, 3000)
              
            // }else{
            //   this.msg1 = data.message
            //   this.showMessageWithTimeout(this.msg1, 5000)
      
      
            // }
            console.log(data);
      
            
          })
      
    }
    else{
      this.msg0 = "Passwords does not match"
      this.showMessageWithTimeout(this.msg0, 3000)
    }
    
    this.userForm.reset()
  }

  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.msg0 = '';
    this.msg1 = '';
    this.showMsg = false
  }

}
