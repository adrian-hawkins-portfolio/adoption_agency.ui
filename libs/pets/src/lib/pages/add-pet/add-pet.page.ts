import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Species, PetsService, BoaResponseModelPetModel } from '@adoption-agency/pets-service';
import { take } from 'rxjs';
import { ToastService } from '@adoption-agency.ui/common';
import { Store } from '@ngrx/store';
import { PetsActions } from '../../state';


@Component({
  imports: [ReactiveFormsModule],
  templateUrl: './add-pet.page.html',
  styleUrl: './add-pet.page.css',
})
export class AddPetPage {
  petService = inject(PetsService);
  toastService = inject(ToastService);
  store = inject(Store);
private fb = inject(FormBuilder);
  private router = inject(Router);

  isSubmitting = false;
  isDragging = false;

  // Selected file & preview URL signals
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);

  petForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    species: ['cat' as Species, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  setSpecies(species: Species): void {
    this.petForm.patchValue({ species });
  }

  // Handle file selection from <input type="file">
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  // Handle Drag & Drop
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  // Process selected file and generate preview
  private handleFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    // Revoke previous object URL if any to prevent memory leaks
    if (this.previewUrl()) {
      URL.revokeObjectURL(this.previewUrl()!);
    }

    this.selectedFile.set(file);
    this.previewUrl.set(URL.createObjectURL(file));
  }

  removeFile(): void {
    if (this.previewUrl()) {
      URL.revokeObjectURL(this.previewUrl()!);
    }
    this.selectedFile.set(null);
    this.previewUrl.set(null);
  }

  onSubmit(): void {
    if (this.petForm.invalid || !this.selectedFile()) {
      this.petForm.markAllAsTouched();
      return;
    }

    const { name, species, description } = this.petForm.getRawValue();
    const imageBlob: Blob = this.selectedFile()!;

    this.isSubmitting = true;

    this.petService.addPetPetsAddPetPost(name as string, species as Species, description as string, imageBlob)
    .pipe(take(1))
    .subscribe({
      next: (res: BoaResponseModelPetModel) => {
       this.toastService.success("Succesfulyl created pet");
       this.store.dispatch(PetsActions.PetsApiActions.addNewPet({pet: res.response}));
       this.router.navigate(['/pets/all-pets']); 
      },
      error: (res) => {
        console.log("");
      }
    })

    // --- CALL YOUR GENERATED API CLIENT HERE ---
    // this.petService.addPetPetsAddPetPost(
    //   name!,
    //   species as Species,
    //   description!,
    //   imageBlob
    // ).subscribe({
    //   next: (response) => {
    //     this.router.navigate(['/pets/all-pets']);
    //   },
    //   error: (err) => {
    //     this.isSubmitting = false;
    //   }
    // });

    console.log('Form Values:', { name, species, description, imageBlob });
  }

  onCancel(): void {
    this.router.navigate(['/pets/all-pets']);
  }

  ngOnDestroy(): void {
    if (this.previewUrl()) {
      URL.revokeObjectURL(this.previewUrl()!);
    }
  }
}
