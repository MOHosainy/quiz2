import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  type:string="doctor"
  selectedValue:string=''
  students:any[]=[]
  // selectedRole:string
  // selectedRole: string;
  constructor(private fb:FormBuilder, private service:AuthService ,private router:Router,private toaster:ToastrService ) { }

  ngOnInit(): void {
    this.getUsers()
    this.createForm()
    // this.getRole()
  }
  getUsers(){
    this.service.getUsers(this.type).subscribe((res:any) =>{
      this.students=res

    })
   
  }
  getRole(event:any){
    this.type=event.value
    this.getUsers()

  }

  createForm(){
    this.loginForm=this.fb.group({
      // type:[this.type],
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required]],


    })
    
  }
  submit(){
    const model={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password


    }
    let index=this.students.findIndex(item=>item.email==this.loginForm.value.email)
    if(index !== -1){
      this.toaster.error("هذا الاكونت موجود","",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })

    }else{

      this.service.createUser(model).subscribe((res:any)=>{

        this.toaster.success("تم الانشاء بنجاح","",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })
        this.router.navigate(['/subjects'])
      })

    }
    
  }


}
