import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiNodeService {

  constructor(private http:HttpClient) { }


  searchUsers(searchText):Observable<any>{         
      return this.http.get('https://api.github.com/search/users?q='+searchText);   
 
  }
  getUserDetail(userId):Observable<any>{
    return this.http.get('https://api.github.com/users/'+userId);
    
  }
  getUserFollowers(userId):Observable<any>{
    return this.http.get('https://api.github.com/users/'+userId+'/followers');
    
  }

}
