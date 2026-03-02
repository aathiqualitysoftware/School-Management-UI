import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceReportApiService {

 
  constructor(private http: HttpClient) { }
  getAttendanceReport(studentId : any,fromDate: any,toDate: any): Observable<any> {

    return this.http.get("http://localhost:8082/lrs/api/attendance?studentId=" + studentId + "&fromDate=" + fromDate + "&toDate=" + toDate, {});
  }
  
}
