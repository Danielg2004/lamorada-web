import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {
  user: any = null;

  // Derivados para saludo y avatar
  firstName = '';
  fullName = '';
  initials = '';
  saludo = 'Bienvenido';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.getActiveUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.fullName = `${this.user?.nombre ?? ''} ${this.user?.apellido ?? ''}`.trim();
    this.firstName = (this.user?.nombre ?? '').split(' ')[0] || 'Usuario';
    this.initials = this.buildInitials(this.user?.nombre, this.user?.apellido, this.user?.correo);
    this.saludo = this.buildSaludo();
  }

  private buildInitials(nombre?: string, apellido?: string, correo?: string): string {
    const n = (nombre || '').trim();
    const a = (apellido || '').trim();
    if (n || a) {
      return `${n.charAt(0)}${a.charAt(0)}`.toUpperCase();
    }
    // Si no hay nombre/apellido, usa correo
    const email = (correo || '').trim();
    return email ? email.charAt(0).toUpperCase() : 'LM';
  }

  private buildSaludo(): string {
    const h = new Date().getHours();
    if (h < 12) return '¡Buenos días';
    if (h < 19) return '¡Buenas tardes';
    return '¡Buenas noches';
  }
}
