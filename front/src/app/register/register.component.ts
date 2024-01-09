import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private http: HttpClient,
    private auth: AuthService) { }

  ngOnInit(): void {
  }
  // register function api call to backend
  onsubmit(form: any) {
    console.log(form);
    const data = form.value;
    const user =
    {
      username: data.username,
      email_id: data.email_id,
      password: data.password
    }
    if (form.valid) {
      this.auth.registerUser(user).subscribe(res => {
        console.log("response is", res);
        if (res.status == 200) {

          alert("Successfully Registered  kindly go to Login To continue");
          this.router.navigate(['login'])
        }
        else if (res.status == 409) {
          alert("User Already Exits");
        }
        else
          alert('Invalid email or password');
      });
    }
    else
      alert('Enter Valid Credentials');
  }
}
