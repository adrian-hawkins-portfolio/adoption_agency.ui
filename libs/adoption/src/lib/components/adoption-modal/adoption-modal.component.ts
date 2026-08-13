import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetModel } from '@adoption-agency/pets-service';

export type UserActionType = 'search' | 'create';

export interface AdopterData {
  email: string;
  action: UserActionType;
  name?: string; // Only needed if creating
}

@Component({
  selector: 'lib-adoption-modal',
  imports: [FormsModule],
  templateUrl: './adoption-modal.component.html',
  styleUrl: './adoption-modal.component.css',
})
export class AdoptionModalComponent {
@Input({ required: true }) isOpen = false;
  @Input({ required: true }) pet!: PetModel;
  
  // Renamed to 'closeModal' to avoid collisions with DOM events
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitAdopter = new EventEmitter<AdopterData>();

  selectedAction = signal<UserActionType>('search');
  email = '';
  name = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.email.trim()) return;

    this.submitAdopter.emit({
      email: this.email.trim(),
      action: this.selectedAction(),
      name: this.selectedAction() === 'create' ? this.name.trim() : undefined
    });

    this.email = '';
    this.name = '';
  }
}
