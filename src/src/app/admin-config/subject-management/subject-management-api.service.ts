import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectManagementApiService {

    constructor(private http: HttpClient) { }
    deleteclssubById(id: any): Observable<any> {
        return this.http.delete('http://localhost:8082/lrs/api/class-subjects/' + id);
    }
    getsubjectmanlistData(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/class-subjects');
    }
    getstaff(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/staffs');
    }
    getsubjects(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/subjects');
    }
    getsections(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/sections');
    }
    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
}
