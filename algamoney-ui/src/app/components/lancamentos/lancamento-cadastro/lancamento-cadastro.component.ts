import { TipoLancamento } from './../../../models/enum/tipoLancamento.enum.model';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoa.service';
import { LancamentoModel } from 'src/app/models/lancamento.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LancamentoService } from 'src/app/services/lancamento-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  submitType: string = "button";

  /* tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ]; */

  tipos: TipoLancamento[] = [
    TipoLancamento.RECEITA,
    TipoLancamento.DESPESA
  ];

  categorias = [ ];
  pessoas = [ ];
  lancamento = new LancamentoModel();
  form = new FormControl();
  formGroup?:FormGroup;
  


  constructor(
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,
    private categoriaService :CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo']);
    this.listarCategorias();
    this.listarPessoas();
    this.configurarForm();
  }

  private configurarForm(): void {
    this.formGroup = this.formBuilder.group({
      tipo: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: [null, Validators.required],
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: [],
      }),
      observacao: [],
    });
  }

  public listarCategorias(): void {
    this.categoriaService.listarTodos().subscribe(
      response => {
        this.categorias = response.map((c: { nome: any; codigo: any; }) => {
          return { label: c.nome, value: c.codigo };
        })
      },
      error => {
        console.error('Erro ao obter as categorias:', error);
        this.errorHandler.handle(error);
      }
    );
  }

  /* public listarPessoas(): void {
    this.pessoaService.listarTodos().then(
      response => {
        this.pessoas = response.map((p: { nome: any; codigo: any; }) => {
          return { label: p.nome, value: p.codigo };
        })
      }
    )
  } */

  public async listarPessoas(): Promise<void> {
    try {
      const response = await this.pessoaService.listarTodos();
      this.pessoas = response.map((p: { nome: any; codigo: any; }) => {
        return { label: p.nome, value: p.codigo };
      });
    } catch (error) {
      console.error('Erro ao obter as pessoas:', error);
      this.errorHandler.handle(error);
    }
  }
  

  public salvar(form: FormControl): void {
    this.lancamentoService.adicionar(this.lancamento)
      .then(
        () => {
          this.toastr.success('Lancamento adicionado com sucesso!');
          form.reset();
          this.lancamento = new LancamentoModel();
        }
      ).catch(erro => this.errorHandler.handle(erro));
  }

  public limpar() {
    this.lancamento = new LancamentoModel();
  }

 /*  public salvar(form: FormControl): void {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(
        response => {
          this.toastr.success('Lançamento adicionado com sucesso!');
          form.reset();
          this.lancamento = new LancamentoModel();
        },
        error => {
          console.error(error);
          this.errorHandler.handle(error);
        }
      );
  } */

}
