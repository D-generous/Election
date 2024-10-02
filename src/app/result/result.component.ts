import { R } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { NavComponent } from '../nav/nav.component';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatTableModule, NavComponent, CandidatesuploadsComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {


  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  constructor(public http:HttpClient){}

  public results:any[]=[]
  public msg:any=''

  ngOnInit(){
    this.http.get('https://dgen.com.ng/Election/result.php').subscribe((data:any)=>{
     
      
      if (data.status===true) {
        this.results = data.candidates;
        
      }else{
        this.msg = data.message
        
      }
      
      
      
    })
  }

}
