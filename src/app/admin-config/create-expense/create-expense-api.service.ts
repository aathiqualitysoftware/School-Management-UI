import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateExpenseApiService {

    constructor(private http: HttpClient) { }

    saveexpense(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/expenses', data);
    }
    updateexpense(data: any): Observable<any> {
        return this.http.put('http://localhost:8082/lrs/api/expenses/' + data.id, data);
    }
    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
}
