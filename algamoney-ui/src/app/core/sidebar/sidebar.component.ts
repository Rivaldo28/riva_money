import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = false;
  imagemSrc: string = '../../../assets/rs.png';
  profileSrc: string =   '../../../assets/imgriv.PNG';
  namePerfil: string = 'Rivaldo Souza';
  dashboard: string = 'Dashboard';
  categoria: string = 'Categoria';
  pessoas: string = 'Pessoas';
  lancamentos: string = 'Lançamentos';
  sair: string = 'sair';
  displayDate: string = '';
  displayTime: string = '';
  _locale: string = 'pt-BR';

  constructor() { }
  ngOnInit(): void {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  handleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  get currentDate() {
    return new Date();
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }
}
