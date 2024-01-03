import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/core/models/AuthState';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  authState: AuthState | undefined 
  constructor(
    private readonly authService: AuthService 
  ){}
  ngOnInit(): void {
    this.authService.$authState.subscribe((authState) => {
      this.authState = authState
    })
  }


}
