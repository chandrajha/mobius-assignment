import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiNodeService } from '../api-node.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  userId: string;
  userDetails: any;

  constructor(private activeRoute:ActivatedRoute,private apiNode:ApiNodeService,private router:Router) { }

  ngOnInit(): void {
    this.userId=this.activeRoute.snapshot.paramMap.get('userId')
    this.getUserDetails(this.userId);
  }
  getUserDetails(userId){
    this.apiNode.getUserDetail(userId).subscribe(res=>{
      console.log("userDetails---->",res);
      this.userDetails=res;
      
    })
  }
  goToBack(){
    this.router.navigate(['/user-list'])
  }

}
