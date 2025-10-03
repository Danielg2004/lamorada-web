import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  register(user: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) => u.correo === user.correo);
    if (exists) return false;

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.correo === username && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  getActiveUser() {
    return this.getLoggedInUser();
  }
}
