import { PetsService } from '@adoption-agency/pets-service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'lib-pets',
  imports: [],
  templateUrl: './pets.html',
  styleUrl: './pets.css',
})
export class Pets implements OnInit {
  private petsService: PetsService = inject(PetsService);

  ngOnInit(): void {
    this.petsService.getAvailablePetsPetsGet().subscribe(req => {
      console.log(req.response);
    })
  }
}
