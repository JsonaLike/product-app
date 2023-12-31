import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-app';
}


export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}
