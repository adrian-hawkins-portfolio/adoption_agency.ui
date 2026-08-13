import { PetModel } from '@adoption-agency/pets-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPetById } from '../../state/pets.selectors';
import { AsyncPipe } from '@angular/common';
import { AdoptionModalComponent } from '@adoption-agency.ui/adoption';

@Component({
  selector: 'lib-pet',
  imports: [AsyncPipe, RouterLink, AdoptionModalComponent],
  templateUrl: './pet.page.html',
  styleUrl: './pet.page.css',
})
export class PetPage implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  isModalOpen = false;

  pet$: Observable<PetModel | undefined> | undefined;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pet$ = this.store.select(selectPetById(Number(id)));
  }

  onAdopt(pet: PetModel): void {
    // Dispatch an adopt action to NgRx store or open an adoption modal
    // this.store.dispatch(PetsApiActions.adoptPet({ id: pet.id }));
    alert(`Thank you for your interest in adopting ${pet.name}!`);
  }

  openAdoptionModal(): void {
    this.isModalOpen = true;
  }

  closeAdoptionModal(): void {
    this.isModalOpen = false;
  }

  handleAdopterSubmission(data: any, pet: PetModel): void {
    this.isModalOpen = false;
    
    if (data.action === 'search') {
      alert(`Searching for user with email: ${data.email} to adopt ${pet.name}`);
      // Dispatch search action or API call here
    } else {
      alert(`Creating new user (${data.name} - ${data.email}) and linking adoption for ${pet.name}`);
      // Dispatch create user & adopt action here
    }
  }
  
}
