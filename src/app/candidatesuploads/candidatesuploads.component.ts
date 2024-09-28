import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router'; // For routing functionality
import { CookiesService } from '../services/cookies.service';

@Component({
  selector: 'app-candidatesuploads',
  standalone: true,
  imports: [NavComponent, CommonModule, HttpClientModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule],
  templateUrl: './candidatesuploads.component.html',
  styleUrl: './candidatesuploads.component.css'
})
export class CandidatesuploadsComponent {

  constructor(private router: Router, public http:HttpClient, public routes:Router, public logoutservice: CookiesService) {}

  mobileMenuVisible: boolean = false;

  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

 logout(){
  this.logoutservice.logoutAdmin()
 }

}
