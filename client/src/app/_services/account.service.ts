import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource=new BehaviorSubject<User | null>(null);
  userSource$=this.currentUserSource.asObservable();


  baseUrl="https://localhost:5001/api/"
  constructor(private http:HttpClient) { }
  setcurrentsource(user_:User|null)
  {
    this.currentUserSource.next(user_)
  }
  login(model:any)
  {
    return this.http.post<User>(this.baseUrl+"account/login",model).pipe(
      map((response:User|null)=>{
        if(response)
        {
          localStorage.setItem('user',JSON.stringify(response));  
          this.currentUserSource.next(response);
        }
      })
    )
  }
  register(model:any)
  {
    return this.http.post<User>(this.baseUrl+"account/register",model).pipe(
      map(
        user=>{
          console.log(user);
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      )
    )
  }
  logout():void
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
