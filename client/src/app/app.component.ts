import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users:any;
  constructor(private http:HttpClient,private service:AccountService){
    this.setUser();
  }
  setUser():void
  {
    const userString=localStorage.getItem('user');
    this.service.setcurrentsource(userString==null?null:JSON.parse(userString));
  }
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next:response=>
      {
        this.users=response;
      },
      error:error=>console.log(error),
      complete:()=>console.log("Completed Task")
    })
  }
}
