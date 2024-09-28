import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sessiontimeout',
  standalone: true,
  imports: [],
  templateUrl: './sessiontimeout.component.html',
  styleUrl: './sessiontimeout.component.css'
})
export class SessiontimeoutComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
