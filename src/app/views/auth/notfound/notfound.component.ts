import { Location } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
  constructor(private location: Location) {}

  back(): void {
    this.location.back();
  }
}
