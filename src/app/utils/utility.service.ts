import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Utilities {
    constructor(private http: HttpClient) {}

    public httpPostRequest(url: string, body: any = {}, opt: any = {}): Observable<any> {
        return this.http.post(url, body, opt);
    }
}