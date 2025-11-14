
import { ExportCSVService } from './../../../services/export-csv.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from 'src/app/services/lancamento-service.service';
import { LancamentoModel } from 'src/app/models/lancamento.model';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  @ViewChild(LancamentosGridComponent) componenteFilho: LancamentosGridComponent | undefined;
  filtro = new LancamentoModel();
  @ViewChild('tabela') grid: any;
  lancamentos: LancamentoModel[] = []; 
  dadosExibidos: any[] = [];
  totalRegistros = 0;
  formGroup: FormGroup | undefined;
  LANCAMENTO: string = 'Lançamentos';
  DESCRICAO: string = 'Descrição';
  VENCIMENTO: string = 'Vencimento';
  MENSAGEM_EXCLUIDO: string = 'Registro excluído da lista de lançamentos!';
  MENSAGEM_TITULO_SUCESSO: string = 'Messagem';
  ATE: string = 'até';
  selectedItem: { row: number, col: number } | null = null;
  selectedLancamento: LancamentoModel | null = null;
  public habilitaDownloadCsv: boolean = true;
  public habilitaLimpar: boolean = false;
  public listExportCSV = new Array<LancamentoModel>();
  public lancamentoList: Array<LancamentoModel> = [];
  public lancamentoFiltro: Array<LancamentoFiltro> = [];     

  ngOnit(){
    this.pesquisar();
   }

  constructor(
    private lancamentoService: LancamentoService,
    private exportCsvService: ExportCSVService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  public pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentoList = resultado.lancamentos;
        if(this.lancamentoList.length > 0){
          this.limpar();
          this.habilitaLimpar = false;
          this.habilitaDownloadCsv = false;
        }
        this.cd.detectChanges();
      }, erro => {
        this.errorHandler.handle(erro);
        if(this.filtro.descricao || this.filtro.dataVencimentoInicio || this.filtro.dataVencimentoFim){
          this.errorHandler.handle(erro);
        }
      });
  }

async editar(lancamento: LancamentoModel) {
  const body = {
    descricao: lancamento.descricao,
    dataVencimento: lancamento.dataVencimento,
    dataPagamento: lancamento.dataPagamento,
    valor: lancamento.valor,
    tipo: lancamento.tipo,
    categoria: { codigo: lancamento.categoria?.codigo },
    pessoa: { codigo: lancamento.pessoa?.codigo }
  };

  if (lancamento.codigo !== undefined && lancamento.codigo !== null) {
    try {
      console.log('Chamando edição para:', lancamento);
      console.log('Body para envio:', body);

      const response = await this.lancamentoService.atualizar(lancamento.codigo, body);

      console.log('Atualizado com sucesso:', response);
      // Aqui você pode atualizar UI ou emitir eventos, etc.

    } catch (error) {
      console.error('Erro ao atualizar:', error);
      // Tratamento de erro
    }
  } else {
    console.error('Código do lançamento não está definido. Não foi possível atualizar.');
  }
}


  public onLancamentoSelecionado(lancamento: any): void {
    if (this.selectedLancamento === lancamento) {
        this.selectedLancamento = null;
    } else {
        this.selectedLancamento = lancamento;
    }
  }

  excluir(lancamento: any) {
    if (!lancamento) {
        Swal.fire('Erro!', 'Nenhum lançamento selecionado.', 'error');
        return;
    }

    Swal.fire({
        title: 'Deletar',
        text: "Tem certeza que deseja deletar o registro?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Não!',
        confirmButtonText: 'Sim!',
    }).then((result) => {
        if (result.isConfirmed) {
            this.lancamentoService.excluir(lancamento.codigo).then(() => {
                this.lancamentos = this.lancamentos.filter(l => l.codigo !== lancamento.codigo);
                this.selectedLancamento = null;
                this.pesquisar();
                Swal.fire('Deletado!', 'Deletado com sucesso.', 'success');
            }, error => {
                console.error('Erro ao deletar o registro:', error);
                Swal.fire('Erro!', `Não foi possível deletar o registro: ${error.message || error}`, 'error');
            });
        }
    });
 }

  atualizarTabela() {
    this.componenteFilho?.atualizarTabela(this.lancamentoList);
  }

  public exportCSV() {
  const header: string[] = ['Código', 'Pessoa', 'Descrição', 
                            'Vencimento', 'Pagamento', 'Preço'];

  const dados: any[] = [];

  this.listExportCSV = this.lancamentoList;

  this.listExportCSV.forEach((item) => {

    dados.push(item.codigo);
    dados.push(item.pessoa || '');
    dados.push(item.descricao || '');
    dados.push(item.dataVencimento ? moment(item.dataVencimento).format('DD/MM/YYYY HH:mm') : '');
    dados.push(item.dataPagamento ? moment(item.dataPagamento).format('DD/MM/YYYY HH:mm') : '');
    dados.push(item.valor ? item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '');

  });

  this.exportCsvService.exportCsv(header, dados, 'lancamentos.csv');
}

 
  public limpar() {
    if (this.componenteFilho && this.componenteFilho.lancamentoFiltro && 
      this.componenteFilho.lancamentoFiltro.length > 0) {
      /* this.habilitaLimpar = true; */
      this.habilitaDownloadCsv = true;
      this.componenteFilho.limpar();
    } else {
      /* this.habilitaLimpar = false; */
      this.habilitaDownloadCsv = false;
    }
    this.filtro.descricao = '';
    this.filtro.dataVencimentoInicio = undefined;
    this.filtro.dataVencimentoFim = undefined;
    this.componenteFilho?.limpar();
    this.habilitaDownloadCsv = true;
  }    

}

function firstValueFrom(arg0: Promise<LancamentoModel>) {
  throw new Error('Function not implemented.');
}
