import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateStaffApiService {

  constructor(private http: HttpClient) { }
  getMasterData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getdesgdata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/designations');
  }
  getStaffData(department: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/staffs/filterByDepartment?department=' + department);
  }
  getDepartmentData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/departments');
  }
  save(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/staffs', data);
  }

  update(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/staffs/' + data.id, data);
  }

  uploadImage(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:8082/lrs/api/images/upload?createdBy=system', formData, { responseType: 'text' });
  }

}
