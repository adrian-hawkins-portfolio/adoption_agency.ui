import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetModel } from '@adoption-agency/pets-service';
import { OwnerModel, OwnerService, RegisterOwnerReq } from '@adoption-agency/owners-service';
import { ToastService } from '@adoption-agency.ui/common';
import { take, tap } from 'rxjs';

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

  @Output() closeModal = new EventEmitter<void>();

  ownerService = inject(OwnerService);
  private toast = inject(ToastService);

  selectedAction = signal<UserActionType>('search');
  email = '';
  name = '';
  phoneNumber = '';
  streetAddress = '';
  owner!: OwnerModel;

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.email.trim()) return;
    console.log(this.selectedAction());
    this.toast.success("test");
    switch(this.selectedAction()) {
      case "search":
      this.ownerService.getOwnerByEmailOwnerByEmailEmailGet(this.email)
          .pipe(take(1), tap(res => console.log(res)))
          .subscribe(res => this.owner = res.response);
          break;
      case "create": {
        const req: RegisterOwnerReq = {
          name: this.name,
          email_address: this.email,
          phone_number: this.phoneNumber,
          street_address: this.streetAddress
        };
        this.ownerService.createOwnerOwnerCreateOwnerPost(req);
        break;
      }
      default:
        break
    }

    this.email = '';
    this.name = '';
  }
}
