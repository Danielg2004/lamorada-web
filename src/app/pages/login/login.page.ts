import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage {
  username = '';
  password = '';

  // Modal
  showModal = false;
  modalMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  private openModal(message: string) {
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  login() {
    if (!this.username || !this.password) {
      this.openModal('Ingresa tu correo y contraseña.');
      return;
    }

    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.openModal('Usuario o contraseña incorrectos.');
    }
  }
}
