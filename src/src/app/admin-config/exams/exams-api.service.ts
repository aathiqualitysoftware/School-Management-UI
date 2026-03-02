import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsApiService {

  constructor(private http: HttpClient) { }
  deleteexamById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/exams/' + id);
  }
  getexamlistData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/exams');
  }
  getall(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/class-subjects');
  }
  getsubjects(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/subjects');
  }
  getsections(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections');
  }
  getdatbyacademicyear(id: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/exams/academic-year/' + id);
  }
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getyears(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
}
