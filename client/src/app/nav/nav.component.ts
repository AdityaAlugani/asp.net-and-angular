import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { flatMap, Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={}

  constructor(public accountService:AccountService,private route:Router,private toastr:ToastrService) { 
  }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.model).subscribe({
      next:response=>{
        console.log(response);
        this.route.navigateByUrl('/members')
      },
      error:error=>this.toastr.error(error.error)
    });
    console.log(this.model)
  }
  logout()
  {
    this.accountService.logout();
    this.route.navigateByUrl('/')
  }

}
