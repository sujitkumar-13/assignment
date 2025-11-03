import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignedFileService {
  private baseUrl = 'http://localhost:8080/api/signed-files';

  constructor(private http: HttpClient) {}

  getSignedFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
