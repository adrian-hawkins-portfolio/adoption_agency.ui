import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

export interface NavSubItem {
  label: string;
  path: string;
  icon?: string;
}

export interface NavSection {
  id: string;
  title: string;
  icon: string;
  items: NavSubItem[];
}

@Component({
  selector: 'lib-core',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './core.html',
  styleUrl: './core.css',
})
export class Core {
// Global menu drawer toggle (Desktop & Mobile)
  isMenuOpen = signal(true);

  // Tracks open state for each dropdown section
  openSections = signal<Record<string, boolean>>({
    pets: true,        // Open by default
    adoption: false,
    inspection: false,
  });

  // Configurable Navigation Dictionary
  readonly navConfig: NavSection[] = [
    {
      id: 'pets',
      title: 'Pets',
      icon: '🐶',
      items: [
        { label: 'All Pets', path: '/pets/all-pets', icon: '🐾' },
        { label: 'Add Pet', path: '/pets/add-pet', icon: '➕' },
      ],
    },
    {
      id: 'adoption',
      title: 'Adoptions',
      icon: '📋',
      items: [
        { label: 'Adoption Applications', path: '/adoption/applications', icon: '📥' },
        { label: 'Approved Adoptions', path: '/adoption/approved', icon: '✅' },
      ],
    },
    {
      id: 'inspection',
      title: 'Inspections',
      icon: '🔍',
      items: [
        { label: 'Scheduled Inspections', path: '/inspection/scheduled', icon: '📅' },
        { label: 'Inspection History', path: '/inspection/history', icon: '📜' },
      ],
    },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  toggleSection(sectionId: string): void {
    this.openSections.update((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }

  isSectionOpen(sectionId: string): boolean {
    return !!this.openSections()[sectionId];
  }
}
