import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/pages/master-layout/master-layout.page').then(m => m.MasterLayoutPage),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'users'
            },
            {
                path: 'users',
                loadComponent: () => import('@users/pages').then(m => m.UsersPage)
            },
            {       
                path: 'favourite-users',
                loadComponent: () => import('@users/pages').then(m => m.FavouriteUsersPage)
            }
        ]
    }
];
