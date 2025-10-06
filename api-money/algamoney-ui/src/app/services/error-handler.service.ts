import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  MENSAGEM_LANCAMENTO: string = 'Ocorreu um erro ao processar a sua solicitação';
  MENSAGEM: string = 'Operação não permitida';
  ERROR: string = 'Erro no serviço';


  constructor(private toastr: ToastrService) { }

  handle(errorResponse: any): void {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      if (errorResponse.status >= 400 && errorResponse.status < 500) {
        const errorMessage = errorResponse.error?.[0]?.mensagemUsuario || this.MENSAGEM;
        msg = errorMessage;
      } else {
        msg = this.MENSAGEM_LANCAMENTO;
      }
  
      
      console.log(this.ERROR, errorResponse);
      this.toastr.error(msg, this.ERROR);
    }
  }
  
  
}
