import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error',
  styleUrl: './error.css',
  templateUrl: './error.html',
})
export class Error {
  @Output() ricarica = new EventEmitter();
  @Input() button!: string;

  refresh() {
    this.ricarica.emit();
  }
}
