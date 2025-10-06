import { PessoaModel } from './pessoa.model';
import { CategoriaModel } from './categoria';
import { TipoLancamento } from './enum/tipoLancamento.enum.model';

export class LancamentoModel {
  public lancamentoFiltro: Array<LancamentoModel> = [];
  codigo?: number;
  tipo?: TipoLancamento;
  descricao?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor?: number = 0.0;
  pessoa?: PessoaModel = new PessoaModel();
  observacao?: string;
  categoria?: CategoriaModel = new CategoriaModel();
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = this.lancamentoFiltro.length;
  tamanho?: number = 0;

  constructor(codigo?: number, descricao: string = '', dataVencimento?: Date, dataPagamento?: Date,
  valor: number = 0, observacao?: string, tipo?: TipoLancamento,
  categoria?: CategoriaModel, pessoa?: PessoaModel) {
  this.codigo = codigo;
  this.descricao = descricao;
  this.dataVencimento = dataVencimento;
  this.dataPagamento = dataPagamento;
  this.valor = valor;
  this.observacao = observacao;
  this.tipo = tipo || TipoLancamento.RECEITA;
  this.categoria = categoria || new CategoriaModel();
  this.pessoa =  pessoa || new PessoaModel();
 }

}