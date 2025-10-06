export class EnderecoModel {
  logradouro: string = '';
  numero: string = '';
  complemento: string = '';
  bairro: string = '';
  cep: string = '';
  cidade: string = '';
  estado: string = '';

    constructor(logradouro: string = '', numero: string = '', complemento: string = '',
    bairro: string = '', cep: string = '', cidade: string = '', estado: string = ''){
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
  }
}
