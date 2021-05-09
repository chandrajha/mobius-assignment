import {
  Component,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, mergeMap, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ApiNodeService } from '../api-node.service';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  filterText: string;
  searchControl: FormControl = new FormControl();
  users: any;
  total_count: any;
  usersFollowers = [];

  getBarGraphData: any;
  constructor(private apiNode: ApiNodeService, private router: Router) {}

  ngOnInit() {
    this.searchUsers();
  }

  searchUsers() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        switchMap((test: any) =>
          this.filterText?.length > 2
            ? this.apiNode.searchUsers(this.filterText)
            : new Observable((observer) => {
                observer.next('Nothing to do- no users to find');
                observer.complete();
              })
        )
      )
      .subscribe(
        (res: any) => {
          this.usersFollowers = [];
          if (res?.items) {
            this.users = res.items.slice(0, 10);
            this.total_count = res.total_count;
          } else {
            this.users = [];
            this.total_count = 0;
          }

          this.users.forEach((userName) => {
            new Promise((resolve, reject) => {
              this.apiNode.getUserFollowers(userName.login).subscribe((res) => {

                resolve(res.length);
              });
            }).then((followersLength: number) => {
              this.usersFollowers.push({
                name: userName.login,
                value: followersLength,
              });
            });
          });

        },
        (error) => {
          console.log('enter somthing.-->', error);
        }
      );
  }

  onSelect(user) {
    this.router.navigate(['/user-profile', user.login]);
  }

  totalFollowerList() {
    console.log('Total Followers:   ', JSON.stringify(this.usersFollowers));
      this.usersFollowers= [{"name":"amresh","value":2},{"name":"amreshsharma","value":3},{"name":"yamresh","value":3},{"name":"xamry","value":4},{"name":"amresh1495","value":7},{"name":"amreshkris","value":3},{"name":"amreshk005","value":3},{"name":"amreshkumar","value":6},{"name":"NikkyAmresh","value":18},{"name":"ltbringer","value":30}]
  }
}
