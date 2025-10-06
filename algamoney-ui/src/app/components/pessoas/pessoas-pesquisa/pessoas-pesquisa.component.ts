import { FormBuilder, FormGroup } from '@angular/forms';
import { /* PessoaFiltro, */ PessoaService } from './../../../services/pessoa.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExportCSVService } from 'src/app/services/export-csv.service';
import { NgForm } from '@angular/forms';
import { PessoaModel } from 'src/app/models/pessoa.model';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild(PessoasGridComponent) componenteFilho: PessoasGridComponent | undefined;
  @ViewChild('form') form!: NgForm;
  public habilitaLimpar: boolean = true;
  filtro = new PessoaModel();
  
  totalRegistros = 0;
  pagina = 0;
  formGroup: FormGroup | undefined;
/*   public pessoaList: Array<PessoaFiltro> = []; */
  public listExportCSV = new Array<PessoaModel>();
  public pessoaLista: Array<PessoaModel> = [];
  public habilitaDownloadCsv: boolean = true;

  constructor(
    private pessoaService: PessoaService,
    private exportCsvService: ExportCSVService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.pesquisar();
    
  }

  public pesquisar(pagina = this.pagina): void {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoaLista = resultado.pessoas
        this.habilitaDownloadCsv = false;
        this.cd.detectChanges();
      });
  }

  public verificarNome(): void {
    if(this.filtro.nome && this.filtro.nome.length > 0){
      this.habilitaLimpar = false;
    }else{
      this.habilitaLimpar = true;
    }
  }

  public exportCSV() {
    const header: string[] = ['Código', 'Nome', 'Cidade', 'Estado', 'Status'];
    const dados: any[] = [];

      this.listExportCSV = this.pessoaLista;
      this.listExportCSV.forEach((index) => {
        dados.push(index.codigo);
        dados.push(index.nome ? index.nome : '');
        dados.push(index.endereco?.cidade ? index.endereco?.cidade : '');
        dados.push(index.endereco?.estado ? index.endereco?.estado : '');
        dados.push(index.ativo ? 'ATIVO' : 'INATIVO');
       
        console.log(dados);
      });
      this.exportCsvService.exportCsv(header, dados, 'pessoas.csv');
  }

  public limpar() {
    this.form.controls['nome'].reset();
  }
}