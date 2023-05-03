import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IUser } from './user.interface';

@Injectable()
export class UserService {
  private users: IUser[] = [
    {
      id: 1,
      firstname: 'Leanne',
      lastname: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      firstname: 'Ervin',
      lastname: 'Howell',
      email: 'Shanna@melissa.tv',
      phone: '010-692-6593 x09125',
    },
    {
      id: 3,
      firstname: 'Clementine',
      lastname: 'Bauch',
      email: 'Nathan@yesenia.net',
      phone: '1-463-123-4447',
    },
    {
      id: 4,
      firstname: 'Patricia',
      lastname: 'Lebsack',
      email: 'Julianne.OConner@kory.org',
      phone: '493-170-9623 x156',
    },
    {
      id: 5,
      firstname: 'Chelsey',
      lastname: 'Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      phone: '(254)954-1289',
    },
  ];

  constructor() {}

  getUsers(val: string | null = ''): Observable<IUser[]> {
    if (val?.length) {
      let copy: IUser[] = [...this.users];
      copy = copy.filter(
        (user) =>
          user.firstname.toLocaleLowerCase().includes(val.toLowerCase()) ||
          user.lastname.toLocaleLowerCase().includes(val.toLowerCase()) ||
          user.email.toLocaleLowerCase().includes(val.toLowerCase())
      );
      return of(copy);
    }
    return of(this.users);
  }
}
