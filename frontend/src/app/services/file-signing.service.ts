import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileSigningService {
  private apiUrl = 'http://localhost:8080/api/signed-files/sign';

  constructor(private http: HttpClient) {}

  signFile(payload: { fileName: string; certificateName: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
