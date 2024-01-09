import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ShareService } from '../services/share.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,

    private auth: AuthService,
    private share: ShareService) { }

  ngOnInit(): void {

  }

  //login Submit function auth service function provided
  login(form: any) {
    console.log(form);
    const data = form.value;
    const user =
    {
      email_id: data.email_id,
      password: data.password
    }
    if (form.valid) {
      this.auth.loginUser(user).subscribe(res => {
        console.log("login response", res);
        if (res.status == 200) {
          const user_id = res.user_id;
          this.share.setUserId(user_id);

          this.share.setNotes(res.notes);
          this.router.navigate(['/user_notes']);
        }
        else
          alert('Invalid email or password');
      });

    }
    else
      alert("Enter Valid credential");
  }
}