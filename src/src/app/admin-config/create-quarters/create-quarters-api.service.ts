import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateQuartersApiService {

  constructor(private http: HttpClient) { }
  getyears(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
  savequarter(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/quarters', data);
  }

  updatequarter(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/quarters/' + data.quarterId, data);
  }
}
