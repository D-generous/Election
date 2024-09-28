import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookiesService } from '../services/cookies.service';
import { CandidatesuploadsComponent } from "../candidatesuploads/candidatesuploads.component";

@Component({
  selector: 'app-adminlandinpage',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, CandidatesuploadsComponent],
  templateUrl: './adminlandinpage.component.html',
  styleUrl: './adminlandinpage.component.css'
})
export class AdminlandinpageComponent {


  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  constructor(private router: Router, public http:HttpClient, public cookiesService:CookiesService, public routes:Router) {}

  mobileMenuVisible: boolean = false;

  // Method to toggle mobile menu
  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  details:any[] =[]
  admin:any =''
  ngOnInit(){
    this.http.get('http://localhost/Election/admindashboard.php').subscribe((data:any)=>{
      this.details = data
      
    })

    this.checkadmin()
    this.startSessionTimeoutChecker()
    this.getStatus()
  }

  checkadmin(){
    this.http.get('http://localhost/Election/adminuser.php', {withCredentials: true}).subscribe((data:any)=>{

      this.admin = data
      
    })

  }

  public token:any =''
  public sessionExpired:any =''
  
  startSessionTimeoutChecker() {
    const checkInterval = 10000; // Check every 10 seconds
  
    this.token = this.cookiesService.getAdminToken(); 
  
    setInterval(() => {
      const isTokenExpired = this.cookiesService.isTokenAdminExpired(this.token);
  
      if (isTokenExpired && !this.sessionExpired) {
        this.sessionExpired = true; // Mark session as expired
        this.handleSessionTimeout();
      }
    }, checkInterval);
  }
  
  handleSessionTimeout() {
    // alert('Session Timeout. Please log in again.');
    this.routes.navigate(['/adminsignin']);
  }

  public msg: any
  statusOfElection(){

    this.http.get('http://localhost/Election/electionstatus.php').subscribe((data:any)=>{
      alert(data)
      
    })

  }
  getStatus(){
    this.http.get('http://localhost/Election/statusdisplay.php').subscribe((data:any)=>{
      
      this.msg = data
      
    })

  }

}
