import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@doe.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Alice Smith',
      role: 'ENGINEER',
      email: 'alice@smith.com',
    },
    {
      id: 4,
      name: 'Bob Smith',
      role: 'ENGINEER',
      email: 'bob@smith.com',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      role: 'ADMIN',
      email: 'charlie@brown.com',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return role ? this.users.filter((user) => user.role === role) : this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort(
      (a, b) => Number(b.id) - Number(a.id),
    );
    const newUser = { id: usersByHighestId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (+user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => +user.id !== id);
    return removedUser;
  }
}
