import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  private url="http://127.0.0.1:5000/usersignup";
  constructor(private http:HttpClient) { }

  signup(userdata:any):Observable<any>{
    return this.http.post<any>(this.url,userdata);
  }
}
