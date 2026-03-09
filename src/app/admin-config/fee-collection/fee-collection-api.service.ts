import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeCollectionApiService {

  constructor(private http: HttpClient) { }
  getacademicyear(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getsections(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections');
  }
}
