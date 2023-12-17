import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div class="page-content">
        <router-outlet></router-outlet>
    </div>`,
    styleUrls: ['./app.component.scss']
})

export class AppComponent {}