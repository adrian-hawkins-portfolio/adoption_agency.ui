import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  success(message: string, duration = 4000): void {
    this.addToast(message, 'success', duration);
  }

  warning(message: string, duration = 5000): void {
    this.addToast(message, 'warning', duration);
  }

  error(message: string, duration = 6000): void {
    this.addToast(message, 'error', duration);
  }


  remove(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  private addToast(message: string, type: ToastType, duration: number): void {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, type, message, duration };

    this.toasts.update((current) => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }
}
