import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseApiService {

  constructor(private http: HttpClient) { }
  getAllMasterData() {
    return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
  }
  getexpenselistData(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/expenses');
  }
  deleteexpenseById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/expenses/' + id);
  }
}
