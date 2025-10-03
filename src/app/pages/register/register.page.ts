import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage {
  nombre = '';
  apellido = '';
  correo = '';
  password = '';
  confirmPassword = '';

  // modal
  showModal = false;
  modalMessage = '';
  modalType: 'error' | 'success' = 'error';

  constructor(private auth: AuthService, private router: Router) {}

  private openModal(message: string, type: 'error' | 'success' = 'error') {
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:"<>?~\-=\[\]\\;',./]).{6,}$/;
    return regex.test(password);
  }

  register() {
    if (!this.nombre || !this.apellido || !this.correo || !this.password || !this.confirmPassword) {
      this.openModal('Todos los campos son obligatorios.', 'error');
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.openModal('La contraseña no cumple con los requisitos (mín. 6, una mayúscula y un carácter especial).', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.openModal('Las contraseñas no coinciden.', 'error');
      return;
    }

    const user = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      username: this.correo,
      password: this.password,
    };

    if (this.auth.register(user)) {
      this.openModal('Usuario registrado correctamente. Te llevaremos al inicio de sesión.', 'success');
      setTimeout(() => {
        this.closeModal();
        this.router.navigate(['/login']);
      }, 1800);
    } else {
      this.openModal('El usuario ya existe.', 'error');
    }
  }
}
