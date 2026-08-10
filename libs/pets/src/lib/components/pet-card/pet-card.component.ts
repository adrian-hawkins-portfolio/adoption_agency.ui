import { PetModel } from '@adoption-agency/pets-service';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-pet-card',
  imports: [RouterLink],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css',
})
export class PetCardComponent {
  @Input({ required: true }) pet!: PetModel;
}
