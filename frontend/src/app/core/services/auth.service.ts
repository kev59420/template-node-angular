import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, catchError, map, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../models/AuthState';
import { AuthStateDto } from '../dto/AuthStateDto';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthType } from '../enum/AuthType';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @BlockUI() blockUI!: NgBlockUI;

  isAuthenticated: boolean | undefined = undefined
  $authState = new ReplaySubject<AuthState | undefined>(1)
  private _authState : AuthState | undefined
  get authState(){
    return this._authState
  }
  constructor(
    private readonly http:HttpClient
  ) {
    this.$authState.subscribe((authState) => {
      this._authState = authState
      this.isAuthenticated = authState?.type !== AuthType.ANONYMOUS
    })
  }

  getAuthenticationState(): Observable<AuthState>{
    return this.http.get<AuthStateDto>(`${environment.backendPath}/auth/state`).pipe(
      map( authStateDto => new AuthState(authStateDto))
    )
  }

  setAuthentication(credentials: {email: string, password: string}) : Observable<AuthState>{
    this.blockUI.start("Authentification en cours")
    return this.http.post<AuthStateDto>(`${environment.backendPath}/auth/login`,credentials).pipe(
      switchMap((authStateDto) => {
        this.blockUI.stop()
        const newAuthState = new AuthState(authStateDto)
        this.$authState.next(newAuthState)
        return of(newAuthState)
      }),
      catchError((err) =>{
        this.blockUI.stop()
        return throwError(() => err)
      })
    )
  }
}
