import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeuCepService {
  constructor(private http: HttpClient) {}

  /*localizapet(Pet: string): Observable<any> {
    const url = `https://dog.ceo/api/breeds/image/random/${pet}/json/`;

    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.get(url, header);
  }*/
}
