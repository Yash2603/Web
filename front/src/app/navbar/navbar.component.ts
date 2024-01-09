import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  autoClose: NgbDropdown['autoClose'] = false;

  toggleAutoClose() {
    this.autoClose = !this.autoClose ? 'inside' : false;
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  home() {

    this.router.navigate(['/user_notes'])
  }
  logout() {
    localStorage.removeItem('allNotes');
    localStorage.removeItem('userId');
    this.router.navigate(['/login'])
  }
}
