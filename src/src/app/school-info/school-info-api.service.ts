import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolInfoApiService {

  constructor(private http: HttpClient) { }
  getSchoolInfo(): Observable<any> {

    return this.http.get("http://localhost:8082/lrs/api/school-info", {});
  }
  
}
