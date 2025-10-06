import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';

//Components
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-pesquisa/pessoas-grid/pessoas-grid.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PessoasPesquisaComponent,
    PessoasGridComponent,
    PessoaCadastroComponent
  ],
  exports: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    FontAwesomeModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    SelectButtonModule,
    ReactiveFormsModule,
    SharedModule,
    CheckboxModule,
    RouterModule
  ]
})
export class PessoasModule { }
