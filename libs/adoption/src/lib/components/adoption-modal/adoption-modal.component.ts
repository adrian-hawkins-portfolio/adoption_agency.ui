import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetModel, Status } from '@adoption-agency/pets-service';
import { OwnerModel, OwnerService, RegisterOwnerReq } from '@adoption-agency/owners-service';
import { ToastService } from '@adoption-agency.ui/common';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { AdoptionService, AdoptPetReq, BoaResponseModelAdoptionModel } from '@adoption-agency/adoption-service';
import { Store } from '@ngrx/store';
import { PetsActions } from '@adoption-agency.ui/pets';

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
  adoptionService = inject(AdoptionService);
  toast = inject(ToastService);
  store = inject(Store);

  selectedAction = signal<UserActionType>('search');
  email = '';
  name = '';
  phoneNumber = '';
  streetAddress = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.email.trim()) return;
    switch(this.selectedAction()) {
        case "search": {
      this.ownerService.getOwnerByEmailOwnerByEmailEmailGet(this.email)
          .pipe(
                take(1),
                catchError(err => {
                this.toast.error(`An error has occured`);
                return throwError(() => (err));
              }),
              switchMap((res) => {
                  const req: AdoptPetReq = {
                      owner_id: res.response.id,
                      pet_id: this.pet.id
                    }
                return this.adoptionService.adoptPetAdoptionAdoptPetPost(req).pipe(take(1));
              })
          )
          .subscribe({
            next: () => {
              this.toast.success("Succesfully adopted pet");
            },
            error: (res: BoaResponseModelAdoptionModel) => {
              this.toast.error(`An error has occured - ${res.unique_reference}`)
            }
          });
          break;
      }
      case "create": {
          const req: RegisterOwnerReq = {
          name: this.name,
          email_address: this.email,
          phone_number: this.phoneNumber,
          street_address: this.streetAddress
        };
        this.ownerService.createOwnerOwnerCreateOwnerPost(req)
          .pipe(
                take(1),
                switchMap((res) => {
                      const req: AdoptPetReq = {
                          owner_id: res.response.id,
                          pet_id: this.pet.id
                        }
                  return this.adoptionService.adoptPetAdoptionAdoptPetPost(req);
              })
          )
          .subscribe({
            next: () => {
              this.toast.success("Succesfully adopted pet");
              this.isOpen = false;
              this.store.dispatch(PetsActions.PetsApiActions.setPetStatus({petId: 1, petSatus: Status.Reserved}));
            },
            error: (res: BoaResponseModelAdoptionModel) => {
                this.toast.error(`An error has occured - ${res.unique_reference}`)
            }
          });
        break;
      }
      default:
        break
    }

    this.isOpen = false;
    
    this.phoneNumber = '';
    this.streetAddress = '';
    this.email = '';
    this.name = '';
  }
}
