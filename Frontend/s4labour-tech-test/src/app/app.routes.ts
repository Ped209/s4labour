import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/components/master-layout/master-layout.page').then(m => m.MasterLayoutPage),
    }
];
