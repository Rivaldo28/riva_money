import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:5000/categorias/';

  constructor(private http: HttpClient) { }

  public listarTodos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4=');
    
    return this.http.get<any>(this.categoriaUrl, { headers });
  }
  
 /*  public listarTodos(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AY3Jlc2NlbmRvZGlnaXRhbC5jb206YWRtaW4=');
    
    return this.http.get<any>(this.categoriaUrl, { headers })
    .toPromise()
    .then(response => {
       return response.content;
    });
  } */

}
