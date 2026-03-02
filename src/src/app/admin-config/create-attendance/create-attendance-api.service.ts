import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAttendanceApiService {

  constructor(private http: HttpClient) { }
  
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getSectionData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections');
  }
  getStudentData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/student/getAll');
  }
  getattendancedata(date: string, classId: number, sectionId: number): Observable<any> {
    const params = new HttpParams()
      .set('classId', classId)
      .set('sectionId', sectionId);

    return this.http.get(
      `http://localhost:8082/lrs/api/attendance/student/date/${date}`,
      { params }
    );
  }

  saveAttendace(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/attendance', data);
  }

  saveBulkAttendace(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/attendance/bulk', data);
  }
}
