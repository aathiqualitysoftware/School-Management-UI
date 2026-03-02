import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CreateSubjectManagementApiService {
    constructor(private http: HttpClient) { }
    savesubjectman(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/class-subjects', data);
    }
    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
    updatesubjectman(data: any): Observable<any> {
        return this.http.put('http://localhost:8082/lrs/api/class-subjects/' + data.id, data);
    }
    getclasses(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/classes');
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
}
