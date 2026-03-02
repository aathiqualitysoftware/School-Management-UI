import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateExamApiService {

  constructor(private http: HttpClient) { }
  getall(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/class-subjects');
  }
  getsubjects(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/subjects');
  }
  getsections(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections');
  }
  saveexam(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/exams', data);
  }
  updateexam(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/exams/' + data.id, data);
  }
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getyears(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
}
