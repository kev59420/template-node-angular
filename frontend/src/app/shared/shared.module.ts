import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BlockUIModule } from 'ng-block-ui';
import { CustomMessageSnackBarComponent } from './components/custom-message-snack-bar/custom-message-snack-bar.component';
@NgModule({
  declarations: [
    CustomMessageSnackBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatSlideToggleModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatSlideToggleModule,
    BlockUIModule
  ]
})
export class SharedModule { }
