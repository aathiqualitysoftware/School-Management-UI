import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsApiService {

  constructor(private http: HttpClient) { }

  getsubject(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/subjects');
  }
  deletesubjectById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/subjects/' + id);
  }
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
}
