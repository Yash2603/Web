import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private login_url="http://localhost:5000/login";
private register_url="http://localhost:5000/register";

  constructor(private http:HttpClient) { }
  loginUser(user: any)
{
  return this.http.post<any>(this.login_url,user)
}
registerUser(user:any)
{
  return this.http.post<any>(this.register_url,user)
}
}
