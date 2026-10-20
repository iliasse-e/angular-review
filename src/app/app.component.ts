import { Component } from '@angular/core';
import { CsvDemoComponent } from './csv-demo/csv-demo.component';

@Component({
  selector: 'app-root',
  imports: [CsvDemoComponent],
  template: `
      <app-csv-demo />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
