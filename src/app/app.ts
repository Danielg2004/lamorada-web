import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav *ngIf="shouldShowNavbar()" class="navbar">
      <!-- Logo a la izquierda -->
      <div class="logo-container">
        <img src="assets/logos/lamorada.png" alt="LaMorada" class="logo" />
      </div>

      <!-- Links centrados -->
      <div class="center">
        <a routerLink="/profile" routerLinkActive="active">Perfil</a>
        <a routerLink="/upload" routerLinkActive="active">Subir eBook</a>
        <a routerLink="/ebooks" routerLinkActive="active">eBooks disponibles</a>
      </div>

      <!-- Botón a la derecha -->
      <div class="right">
        <button (click)="logout()" class="logout-btn">Cerrar sesión</button>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class App {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.auth.getActiveUser();
  }

  shouldShowNavbar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return this.isLoggedIn() && !hiddenRoutes.includes(this.router.url);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
