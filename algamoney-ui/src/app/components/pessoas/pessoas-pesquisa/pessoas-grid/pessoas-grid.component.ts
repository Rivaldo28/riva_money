import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PessoaFiltro, PessoaService } from 'src/app/services/pessoa.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {
  @ViewChild('tabela') grid: any;
  @Input() pessoaFiltro: Array<PessoaFiltro> = [];
  filtro = new PessoaFiltro();
  totalRegistros = 0;
  pagina = 0;
  formGroup: FormGroup | undefined;
  MENSAGEM_TITULO_SUCESSO: string = 'Messagem';
  MENSAGEM_ECLUIDO: string = 'Registro excluído da lista de pessoas!';
  MENSAGEM_STATUS: string = 'O status foi atualizado com sucesso!';

  public pessoaList: Array<PessoaFiltro> = [];


  constructor(private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService) {}

  ngOnInit(): void {  }

  public pesquisar(pagina = this.pagina): void {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoaFiltro = resultado.pessoas
      });
  }


  excluir(pessoa: any){
    Swal.fire({
      title: 'Deletar',
      text: "Tem certeza que deseja deletar o registro!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Não!',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.first = 0;
          }
          this.toastr.success(this.MENSAGEM_ECLUIDO, this.MENSAGEM_TITULO_SUCESSO);
        }, error => {
            this.errorHandler.handle(error);
        });
        Swal.fire(
          'Deletado!',
          'Deletado com sucesso.',
          'success'
        )
      }
    })
  }

  public mudarStatus(pessoa: any){
    this.pessoaService.mudarStatus(pessoa.codigo, !pessoa.ativo)
    .then(() => {
      pessoa.ativo = !pessoa.ativo;
      this.toastr.success(this.MENSAGEM_STATUS, this.MENSAGEM_TITULO_SUCESSO);
    }, error => {
      this.errorHandler.handle(error);
    })
  }

}