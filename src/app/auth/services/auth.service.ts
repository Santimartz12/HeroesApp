import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http : HttpClient) { }

  get auth(){
    return {...this._auth};
  }

  verificarAuth(): Observable<boolean>{

    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map( auth => {
        this._auth = auth;
        return true;
      } )
    )
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(resp => {this._auth = resp}),
      tap(resp => localStorage.setItem('token', JSON.stringify(resp.id)))
    );
  }

  logout(){
    this._auth = undefined;
    localStorage.removeItem('token');
  }

}
