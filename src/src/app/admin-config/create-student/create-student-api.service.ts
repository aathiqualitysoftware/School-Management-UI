import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateStudentApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8082/lrs/api/studs';
  getMasterData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }

  getStudentData(classId: any, sectionId: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/studs/class-section?classId=' + classId + '&sectionId=' + sectionId);
  }
  getClassData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/classes');
  }
  getyears(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
  getSectionData(classId: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections/class/' + classId);
  }
  save(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/studs', data);
  }
  //  save(data: any): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('profileImage', data?.profileImage);
  //   formData.append('stud', data);
  //   return this.http.post('http://localhost:8082/lrs/api/studs',formData);
  // }
  update(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/studs/' + data.studentId, data);
  }
  uploadImage(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:8082/lrs/api/images/upload?createdBy=system', formData, { responseType: 'text' });
  }

}
