import { 
  ApplicationRef, 
  ComponentRef, 
  createComponent, 
  EnvironmentInjector, 
  inject, 
  Injectable 
} from '@angular/core';
import { ToastComponent, ToastType } from '../components/toast/toast.component';


@Injectable({
  providedIn: 'root',
})
export class ToastService {
private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private containerEl: HTMLElement | null = null;

  success(message: string, duration = 4000): void {
    this.show(message, 'success', duration);
  }

  warning(message: string, duration = 5000): void {
    this.show(message, 'warning', duration);
  }

  error(message: string, duration = 6000): void {
    this.show(message, 'error', duration);
  }

  private show(message: string, type: ToastType, duration: number): void {
    this.ensureContainer();

    // 1. Instantiates the component
    const componentRef: ComponentRef<ToastComponent> = createComponent(ToastComponent, {
      environmentInjector: this.injector,
    });

    // 2. Pass inputs using setInput() so Angular registers them
    componentRef.setInput('message', message);
    componentRef.setInput('type', type);
    componentRef.instance.dismiss = () => this.destroyToast(componentRef);

    // 3. Attach view to Angular's application tree
    this.appRef.attachView(componentRef.hostView);

    // 4. CRITICAL: Force initial Change Detection so template renders HTML
    componentRef.changeDetectorRef.detectChanges();

    // 5. Append host element to container DOM
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    this.containerEl?.appendChild(domElem);

    // Auto cleanup timer
    if (duration > 0) {
      setTimeout(() => this.destroyToast(componentRef), duration);
    }
  }

  private destroyToast(componentRef: ComponentRef<ToastComponent>): void {
    if (!componentRef) return;
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  private ensureContainer(): void {
    if (!this.containerEl) {
      this.containerEl = document.createElement('div');
      this.containerEl.id = 'toast-dynamic-container';
      
      Object.assign(this.containerEl.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '99999',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '380px',
        width: '100%',
        padding: '0 16px',
        pointerEvents: 'none',
      });

      document.body.appendChild(this.containerEl);
    }
  }
}
