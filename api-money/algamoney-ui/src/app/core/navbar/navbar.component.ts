import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imagemSrc: string = '../../../assets/rs.png';
  displayDate: string = '';
  displayTime: string = '';
  _locale: string = 'pt-BR';
  isSidebarOpen: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get currentDate() {
    return new Date();
  }

  toggleSidebar() {
    console.log("teste");
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}