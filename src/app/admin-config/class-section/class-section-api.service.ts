import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassSectionApiService {

  constructor(private http: HttpClient) { }

  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }

  getsectiondata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/sections');
  }

  deletesectionById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8083/lrs/api/sections/' + id);
  }
}
