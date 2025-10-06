import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { LancamentoModel } from '../models/lancamento.model';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';


export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
  tamanho?= 0;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:5000/lancamento';

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService,) { }

  public pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4=' });

    let params = new HttpParams();
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get<any>(`${this.lancamentoUrl}?resumo`, { headers, params })
      .toPromise().then(response => {
        /* const responseJson = response.json(); */
        const lancamentos = response.content;
        const resultado = {
          lancamentos: lancamentos,
          total: response.totalElements
        };
        return resultado;
      });

  }

 public excluir(codigo: number): Promise<void | null> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4=='
  });
  return this.http.delete(`${this.lancamentoUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null) as Promise<void | null>;
  }

  public adicionar(lancamento: LancamentoModel): Promise<LancamentoModel> {
    console.log('Objeto lancamento antes de serialização:', lancamento);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4=='
    });
    return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response as LancamentoModel)
      .catch(error => {
         console.log(error);
        throw error;
      });
  }

  atualizar(codigo: number, body: any): Observable<LancamentoModel> {
  return this.http.put<LancamentoModel>(`${this.lancamentoUrl}/${codigo}`, body);
}


 /*  public adicionar(lancamento: LancamentoModel): Observable<LancamentoModel> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4==');;
    headers.append('Content-Type', 'application/json');
      
    return this.http.post<LancamentoModel>(this.lancamentoUrl, JSON.stringify(lancamento), { headers });
  } */

}
