import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PessoaModel } from 'src/app/models/pessoa.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new PessoaModel();

  constructor(
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,
    private pessoaService: PessoaService,
  ) { }

  ngOnInit(): void {
    this.pessoa.ativo = true;
  }

  public salvar(form: FormControl): void {
    this.pessoaService.adicionar(this.pessoa)
    .then(
      () => {
        console.log('valor!', this.pessoa.ativo);
        this.toastr.success('Pessoa adicionada com sucesso!');
        form.reset();
        this.pessoa = new PessoaModel();
      }
    ).catch(
      erro => this.errorHandler.handle(erro)      
    )
  }

}
