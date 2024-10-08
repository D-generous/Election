import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidatesuploadsComponent } from "../candidatesuploads/candidatesuploads.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accreditedvoters',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule, CandidatesuploadsComponent],
  templateUrl: './accreditedvoters.component.html',
  styleUrl: './accreditedvoters.component.css'
})
export class AccreditedvotersComponent {
  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  form: any=""

  constructor(private fb: FormBuilder, public http:HttpClient) {
    this.form = this.fb.group({
      statecode: ['', [Validators.required]],
    });
  }

  public msg0:any=''
  public msg1:any=''
  onSubmit() {
    if (this.form.valid) {
      let obj = {
        statecode: this.form.value['statecode']
      }
      this.http.post('https://dgen.com.ng/Election/accreditedvoter.php',obj).subscribe((data:any)=>{


        if (data.status===false) {
          this.msg0 = data.message
        this.showMessageWithTimeout(this.msg0, 3000)

          // this.msg1= ''
          
        }else{
          this.msg1 = data.message
        this.showMessageWithTimeout(this.msg1, 3000)

          // this.msg0 = ''
        }
      })
    } else {
      console.log('Form is not valid');
    }
    this.form.reset()
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
