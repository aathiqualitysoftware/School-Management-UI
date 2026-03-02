import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {

  constructor(private http: HttpClient) { }

  deleteUserById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/studs/' + id);
  }
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getStudentData(classId: any, sectionId: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/studs/class-section?classId=' + classId + '&sectionId=' + sectionId);
  }
  // getClassData(): Observable<any> {
  //   return this.http.get('http://localhost:8082/lrs/api/classes');
  // }
  getSectionData(classId: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections/class/' + classId);
  }
}
