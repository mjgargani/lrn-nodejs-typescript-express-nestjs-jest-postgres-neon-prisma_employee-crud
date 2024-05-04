import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  findAll(role?: UserRole) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort(
      (a, b) => Number(b.id) - Number(a.id),
    );
    const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (+user.id === id) {
        return { ...user, ...updateUserDto };
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
