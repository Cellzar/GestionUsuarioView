import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined){
      this.router.navigate([""]);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
