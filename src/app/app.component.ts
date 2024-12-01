import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <main>
        <app-home></app-home>
      </main>
      <footer>
        <p>&copy; 2024 AI Trading Bot. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header h1 {
      color: #3f51b5;
    }
    footer {
      margin-top: 20px;
      text-align: center;
      color: #666;
    }
  `]
})
export default class AppComponent {
  title = 'AI Trading Bot';
}

