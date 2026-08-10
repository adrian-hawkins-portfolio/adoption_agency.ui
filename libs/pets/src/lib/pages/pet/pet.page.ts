import { PetModel } from '@adoption-agency/pets-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPetById } from '../../state/pets.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-pet',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './pet.page.html',
  styleUrl: './pet.page.css',
})
export class PetPage implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

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
  
}
