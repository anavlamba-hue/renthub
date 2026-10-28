import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly usersKey = 'renthub_users';
  private readonly sessionKey = 'renthub_current_user';

  register(name: string, email: string, password: string): string | null {
    const users = this.getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return 'An account with this email already exists.';
    }

    users.push({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    localStorage.setItem(this.usersKey, JSON.stringify(users));

    this.setSession({
      name: name.trim(),
      email: normalizedEmail,
    });

    return null;
  }

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();

    const user = this.getUsers().find(
      (item) => item.email === normalizedEmail && item.password === password,
    );

    if (!user) {
      return false;
    }

    this.setSession({
      name: user.name,
      email: user.email,
    });

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem(this.sessionKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem(this.sessionKey);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  private getUsers(): StoredUser[] {
    try {
      const storedUsers = localStorage.getItem(this.usersKey);
      return storedUsers ? (JSON.parse(storedUsers) as StoredUser[]) : [];
    } catch {
      return [];
    }
  }

  private setSession(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }
}
