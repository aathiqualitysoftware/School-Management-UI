import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsResultApiService {

  constructor(private http: HttpClient) { }
  getExanResults(): Observable<any> {

    return this.http.get("http://localhost:8082/lrs/api/exam-schedule/pre-upcoming-exam", {});
  }
}
