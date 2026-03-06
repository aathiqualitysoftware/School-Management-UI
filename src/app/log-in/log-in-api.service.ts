import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInApiService {

  
 constructor(private http: HttpClient) { }
 login(loginObj: any): Observable<any> {
    console.log('Calling login API with:', loginObj);
    return this.http.post("http://localhost:8082/lrs/auth/login", loginObj);
  }
  getLogInUserTypes(): Observable<any> {
    console.log('Calling getLogInUserTypes API');
    return this.http.get('http://localhost:8082/lrs/logInUserTypes');
  }
}
