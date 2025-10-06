import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PessoaModel } from '../models/pessoa.model';


export class PessoaFiltro {
  public pessoaFiltro: Array<PessoaFiltro> = [];
  nome?: string;
  pagina = 0;
  itensPorPagina = this.pessoaFiltro.length;
  tamanho?= 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoaUrl = 'http://localhost:5000/pessoas';

  constructor(private http: HttpClient) { }

  public pesquisar(filtro: any): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4==');
   
    let params = new HttpParams();
    
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get<any>(`${this.pessoaUrl}`, { headers, params })
      .toPromise()
      .then(response => {
          const pessoas = response.content;
          const resultado = {
            pessoas: pessoas,
            total: response.totalElements
          };
        return resultado;
      });
  }

  public listarTodos(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4==');

    return this.http.get<any>(`${this.pessoaUrl}`, { headers })
    .toPromise()
    .then(response => {
       return response.content;
    })
  }

  public excluir(codigo: number): Promise<void | null> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4==');
  
    return this.http.delete(`${this.pessoaUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null) as Promise<void | null>;
  }

  public mudarStatus(codigo: number, ativo: boolean): Promise<void | null> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4==');
    headers.append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

  public adicionar(pessoa: PessoaModel): Promise<PessoaModel> {
    console.log('Objeto pessoa antes de serialização:', pessoa);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4=='
    });
    return this.http.post<PessoaModel>(this.pessoaUrl, JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => response as PessoaModel);
  }

}