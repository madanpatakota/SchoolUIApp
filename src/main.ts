import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// your existing bootstrapping...
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ enables data-bs-* modals, dropdowns, etc.


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
