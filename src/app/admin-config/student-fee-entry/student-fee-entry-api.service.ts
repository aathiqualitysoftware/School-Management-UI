import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentFeeEntryApiService {
  constructor(private http: HttpClient) { }

  delete(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/studentfee/' + id);
  }
  getAllMasterData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getstudentfeeData(department: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/studentfee');
  }
}
