import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../models/AuthState';
import { AuthStateDto } from '../dto/AuthStateDto';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @BlockUI() blockUI!: NgBlockUI;

  isAuthenticated: boolean | undefined = undefined
  $authState = new ReplaySubject<AuthState | undefined>(1)
  constructor(
    private readonly http:HttpClient
  ) {}

  getAuthenticationState(): Observable<AuthState>{
    return this.http.get<AuthStateDto>(`${environment.backendPath}/auth/state`)
  }

  setAuthentication(credentials: {email: string, password: string}) : Observable<AuthState>{
    this.blockUI.start("Authentification en cours")
    return this.http.post<AuthStateDto>(`${environment.backendPath}/auth/login`,credentials).pipe(
      switchMap((authStateDto) => {
        this.blockUI.stop()
        const newAuthState = new AuthState(authStateDto)
        this.$authState.next(newAuthState)
        return of(newAuthState)
      })
    )
  }
}
