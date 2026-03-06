import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuarterlyReportApiService {

 
  constructor(private http: HttpClient) { }
  getExamReport(studentId : any): Observable<any> {
    return this.http.get("http://localhost:8082/lrs/api/exam-results/student-exam-report?studentId=" + studentId, {});
  }
   getExamDashboardReport(studentId : any, examTypeId: any, academicYear: any): Observable<any> {
    return this.http.get("http://localhost:8082/lrs/api/exam-results/student-exam-dashboard?studentId=" + studentId + "&examTypeId=" + examTypeId + "&academicYear=" + academicYear, {});
  }
}
