import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { IUser } from './user.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  private originalUsers: IUser[] = [];
  public users: IUser[] = [];
  public selectedUsers: number[] = [];
  public sort = new FormControl('asc');
  public search = new FormControl('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.subscribeOnSort();
  }

  getUsers() {
    this.search.valueChanges
      .pipe(
        startWith(''),
        switchMap((val) => this.userService.getUsers(val))
      )
      .subscribe((res) => {
        this.users = res;
      });
  }

  subscribeOnSort() {
    this.sort.valueChanges.subscribe((val) => {
      if (val === 'asc') {
        this.users = this.users.sort((a, b) => a.id - b.id);
      } else {
        this.users = this.users.sort((a, b) => b.id - a.id);
      }
    });
  }

  deleteSelected() {
    this.users = this.users.filter((user) => !this.isSelected(user.id));
  }

  toggleSelection(id: number) {
    if (this.isSelected(id)) {
      this.selectedUsers = this.selectedUsers.filter((el) => el !== id);
    } else {
      this.selectedUsers.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedUsers.includes(id);
  }

  selectAll() {
    this.selectedUsers = [];
    this.users.forEach((user) => this.toggleSelection(user.id));
  }
}
