import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleApiService {

    constructor(private http: HttpClient) { }

    getrolesdata(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/roles');
    }

    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
    deleteroleById(id: any): Observable<any> {
        return this.http.delete('http://localhost:8082/lrs/api/roles/' + id);
    }

    private rolesSource = new BehaviorSubject<any[]>([]);
    roles$ = this.rolesSource.asObservable();

    setRoles(data: any[]) {
        this.rolesSource.next(data);
    }

    getRoles() {
        return this.rolesSource.value;
    }
}
