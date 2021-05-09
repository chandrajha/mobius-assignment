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
  productSales = [
    {
      name: 'ram',
      value: 30,
    },
    {
      name: 'pro-2',
      value: 100,
    },
    {
      name: 'pro-3',
      value: 150,
    },
    {
      name: 'pro-4',
      value: 210,
    },
    {
      name: 'pro-5',
      value: 300,
    },
    {
      name: 'pro-6',
      value: 50,
    },
    {
      name: 'pro-7',
      value: 20,
    },
    {
      name: 'pro-8',
      value: 100,
    },
  ];

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
                // observable execution
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
                //console.log('followers-----11>', res.length);

                resolve(res.length);
              });
            }).then((followersLength: number) => {
              this.usersFollowers.push({
                name: userName.login,
                value: followersLength,
              });
            });
          });

          // from(this.users).pipe(mergeMap((res:any)=>  this.apiNode.getUserFollowers(res.login))).subscribe(console.log);
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
  }
}
