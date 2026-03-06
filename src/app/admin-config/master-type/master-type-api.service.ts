import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MasterTypeApiService {

    constructor(private http: HttpClient) { }


    getmastertypedata(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/master-types');
    }
    deletemastertypeById(id: any): Observable<any> {
        return this.http.delete('http://localhost:8082/lrs/api/master-types/' + id);
    }
}
