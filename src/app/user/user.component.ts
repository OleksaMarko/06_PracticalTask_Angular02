import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public users: IUser[] = [];
  public form: FormGroup = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(2)]],
    lastName: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    ],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.list().subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(id: IUser['id']) {
    this.userService.delete(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
      this.snackBar.open(`User with id:  ${id} deleted`);
    });
  }

  submit() {
    const { firstName, lastName, email, phone } = this.form.value;
    const body: Partial<IUser> = {
      email,
      phone,
      username: `${firstName} ${lastName}`,
    };

    this.userService.create(body).subscribe((user) => {
      this.users = [...this.users, user];
      this.snackBar.open(`User ${user.username} addeed`);
      this.form.reset();
    });
  }
}
