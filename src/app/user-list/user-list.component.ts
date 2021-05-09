import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { debounceTime, mergeMap, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ApiNodeService } from '../api-node.service';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filterText:string;
  searchControl: FormControl= new FormControl()
  users: any;
  total_count: any;
  productSales=[
    {
      "name":"ram",
      "value":30
    },
    {
      "name":"pro-2",
      "value":100
    },
    {
      "name":"pro-3",
      "value":150
    },
    {
      "name":"pro-4",
      "value":210
    },
    {
      "name":"pro-5",
      "value":300
    },
    {
      "name":"pro-6",
      "value":50
    },
    {
      "name":"pro-7",
      "value":20
    },
    {
      "name":"pro-8",
      "value":100
    }
  ]

  usersFollowers=[];
  

  
  getBarGraphData: any;
  constructor(private apiNode:ApiNodeService,private router:Router){}

  ngOnInit(){
    this.searchUsers();  
    let abc=this.getUserFollowers('baeharam')
    console.log("abc==>",abc);
  

    
    
  }
  
  searchUsers(){
  
    this.searchControl.valueChanges.pipe(debounceTime(400),switchMap((test:any)=> this.apiNode.serchUsers(this.filterText))).subscribe((res:any)=>{
        
      this.users=res.items.slice(0,10); 
      this.total_count=res.total_count  
      console.log("--userList-->",this.users);

      this.users.forEach(user => {

        this.usersFollowers.push({userName:user.login, noOfFollowers:this.getUserFollowers(user.login)}) ;
      });


      console.log("usersFollowers--->",this.usersFollowers);
      


      



      // from(this.users).pipe(mergeMap((res:any)=>  this.apiNode.getUserFollowers(res.login))).subscribe(console.log);

     
      
    },(error)=>{
      console.log("enter somthing.-->",error);
      
    })
      
  }

 

  onSelect(user){
    this.router.navigate(['/user-profile',user.login])
  }

  getUserFollowers(userName){
    let totalFolowers;
    this.apiNode.getUserFollowers(userName).subscribe(res=>{
      console.log("followers-----11>",res.length);
      
      totalFolowers= res.length;
    })
    return totalFolowers;
  }


}
