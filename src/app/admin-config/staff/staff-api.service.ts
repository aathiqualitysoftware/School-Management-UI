import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffApiService {
  constructor(private http: HttpClient) { }

  delete(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/staffs/' + id);
  }
  getMasterData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getStaffData(department: any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/staffs/filterByDepartment?department=' + department);
  }
}
