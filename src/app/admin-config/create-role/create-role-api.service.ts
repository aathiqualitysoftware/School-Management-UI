import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CreateRoleApiService {
    constructor(private http: HttpClient) { }
    saverole(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/roles', data);
    }
    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
    updaterole(data: any): Observable<any> {
        return this.http.put('http://localhost:8082/lrs/api/roles/' + data.roleId, data);
    }
}
