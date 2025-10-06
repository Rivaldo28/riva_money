import { EnderecoModel } from './endereco.model';

export class PessoaModel {
  public pessoaModel: Array<PessoaModel> = [];
  codigo?: number;
  nome?: string;
  endereco: EnderecoModel = new EnderecoModel(); // Inicializa o objeto EnderecoModel
  ativo?: boolean;
  pagina: number = 0;
  itensPorPagina = this.pessoaModel.length;
  tamanho?: number;

  constructor(endereco?: EnderecoModel, codigo?: number, ativo?: boolean) {
    this.endereco = endereco || new EnderecoModel(); // Garante que endereco é uma instância de EnderecoModel
    this.codigo = codigo;
    this.ativo = ativo;
  }
}