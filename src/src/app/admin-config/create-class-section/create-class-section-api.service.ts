import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateClassSectionApiService {

  constructor(private http: HttpClient) { }
 
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  savesection(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/sections', data);
  }

  updatesection(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/sections/' + data.id, data);
  }
}
