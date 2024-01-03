import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appitem',
  templateUrl: './appitem.component.html',
  styleUrls: ['./appitem.component.scss']
})
export class AppitemComponent {
  @Input() titleApp!: string
  @Input() imgPath!: string
  @Input() backgroundColor!: string 
}
