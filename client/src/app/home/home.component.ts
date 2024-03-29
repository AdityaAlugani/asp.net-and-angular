import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any;
  registerMode=false;
  constructor(private http:HttpClient) { }

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
  
  updateRegister():void
  {
    this.registerMode=!this.registerMode;
  }
  closeRegister(value:boolean)
  {
    this.registerMode=value;
  }

}
