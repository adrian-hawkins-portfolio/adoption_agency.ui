import { Component, Input } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error';

@Component({
  selector: 'lib-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: ToastType = 'success';
  dismiss: () => void = () => {};
}
