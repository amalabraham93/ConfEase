import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  editedUser = {
    name: '',
    email: ''
  };

  isModalOpen = false;

  openEditModal() {
    this.editedUser = { ...this.user };
    this.isModalOpen = true;
  }

  saveChanges() {
    // Logic to save the changes
    this.user = { ...this.editedUser };
    this.closeModal();
  }

  openImageUploadModal() {
    // Logic to open image upload modal
  }

  closeModal() {
    this.isModalOpen = false;
  }
}