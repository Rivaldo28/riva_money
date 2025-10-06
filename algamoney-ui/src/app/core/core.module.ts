import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../services/lancamento-service.service';
import { PessoaService } from '../services/pessoa.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
  exports: [NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    TooltipModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ErrorHandlerService,
  ],
})
export class CoreModule { }
