import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  @Output() eventemmiter=new EventEmitter();
  constructor(private accountservice:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  register()
  {
    this.accountservice.register(this.model).subscribe({
      next:()=>{},
      error:error=>{
        console.log(error);
        this.toastr.error(error.error)
      }
    });
  }
  cancel()
  {
    this.eventemmiter.emit(false);
  }

}
