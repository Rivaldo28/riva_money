import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
         <p-message *ngIf="temErro()" severity="error" text="{{text}}"></p-message>
       `,
  styles: [
  ]
})
export class MessageComponent {

  @Input() error: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() text: string = '';

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }


}
