import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
// , provideStore(reducers, { metaReducers })