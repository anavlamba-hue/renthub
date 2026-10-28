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

  constructor() {
    this.seedDemoUsers();
  }

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

  private seedDemoUsers(): void {
    const users = this.getUsers();

    const demoUsers: StoredUser[] = [
      {
        name: 'Anav',
        email: 'anav@lamba.com',
        password: 'anav1738',
      },
      {
        name: 'Navya',
        email: 'navya@lamba.com',
        password: 'navya1999',
      },
      {
        name: 'Sandy',
        email: 'sandy@gmail.com',
        password: 'sandy1972',
      },
    ];

    for (const demoUser of demoUsers) {
      const exists = users.some((user) => user.email === demoUser.email);

      if (!exists) {
        users.push(demoUser);
      }
    }

    localStorage.setItem(this.usersKey, JSON.stringify(users));
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
