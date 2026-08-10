import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PetsSelectors } from '../../state';
import { PetsApiActions } from '../../state/pets.actions';
import { AsyncPipe } from '@angular/common';
import { selectPetById } from '../../state/pets.selectors';
import { PetCardComponent } from '../../components/pet-card/pet-card.component';

@Component({
  imports: [AsyncPipe, PetCardComponent ],
  templateUrl: './all-pets.page.html',
  styleUrl: './all-pets.page.css',
})
export class AllPetsPage implements OnInit {
  private store = inject(Store);

  pets$ = this.store.select(PetsSelectors.selectAllPets);
  loading$ = this.store.select(PetsSelectors.selectPetsLoading);

  ngOnInit(): void {
    this.store.dispatch(PetsApiActions.loadPets());
    this.store.select(selectPetById(11)).subscribe(res => console.log(res));
  }
}
