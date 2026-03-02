import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesApiService {

  constructor(private http: HttpClient) { }
  getacademicyear(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
  getclasses(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/classes');
  }
  getfeestatus(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/fee-status');
  }
}
