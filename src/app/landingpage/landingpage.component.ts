import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  constructor(public http:HttpClient){}
  public candidates:any[]=[]
  ngOnInit(){
    this.getcandidate()

  }

  getcandidate(){
    this.http.get('https://dgen.com.ng/Election/landingpage.php').subscribe((data:any)=>{ 
      this.candidates = data  
    })
  }

}
