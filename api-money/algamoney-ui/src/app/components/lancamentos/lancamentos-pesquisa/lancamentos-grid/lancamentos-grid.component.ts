import { LancamentoModel } from 'src/app/models/lancamento.model';
import { LancamentoFiltro, LancamentoService } from 'src/app/services/lancamento-service.service';
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa.component';



@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {
  @Input() lancamentoFiltro: Array<LancamentoFiltro> = [];
  @Output() lancamentoSelecionado = new EventEmitter<any>();
  @ViewChild(LancamentosPesquisaComponent) componentePai: LancamentosPesquisaComponent | undefined;
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  public pageSize: number = 0;
  public habilitaLimpar: boolean = true;
  mensagemDeErrorDados = 'adicione lançamento';
  MENSAGEM_TITULO_SUCESSO: string = 'Messagem';
  MENSAGEM_ECLUIDO: string = 'Registro excluído da lista de lançamentos!';
  selectedItem: { row: number, col: number } | null = null;

 ngOnit(){ 
  /* this.pesquisar(); */
 }

  onRowSelect(lancamento: any) {
    this.lancamentoSelecionado.emit(lancamento);
  }
  constructor(private lancamentoService: LancamentoService,
    private cd: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,) { }

/*   public pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentoFiltro = resultado.lancamentos

      });
  } */

  public aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first! / event.rows!;
    this.componentePai?.pesquisar(pagina);
  }

  public rowsChangeEvent(): void {
    this.rowsChangeEvent;
    this.cd.detectChanges();
  }
  
  limpar() {
    this.lancamentoFiltro = [];
    this.lancamentoFiltro.length > 0 ? this.habilitaLimpar = false : this.habilitaLimpar = true;
  }

  public selecionarLinha(lancamento: any): void {
    lancamento.selected = !lancamento.selected;
    this.lancamentoSelecionado.emit(lancamento);
  }

  handleClick(lancamento: any, rowIndex: number, colIndex: number) { 
    this.selecionarLinha(lancamento);
    this.toggleSelection(rowIndex, colIndex);
  }

  /* excluir(lancamento: any){
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
        this.lancamentoService.excluir(lancamento.codigo)
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
  } */

  toggleSelection(rowIndex: number, colIndex: number) {
    if (this.selectedItem && this.selectedItem.row === rowIndex && this.selectedItem.col === colIndex) {
      this.selectedItem = null;
    } else {
      this.selectedItem = { row: rowIndex, col: colIndex };
    }
  }

  isSelected(rowIndex: number, colIndex: number): boolean {
    return this.selectedItem?.row === rowIndex && this.selectedItem?.col === colIndex;
  }

  atualizarTabela(novaLista: LancamentoModel[]) {
    this.lancamentoFiltro = novaLista;
  }  
  
}
