import { Routes } from "@angular/router";


export const countryRoutes: Routes = [
  {
    path: '',
    loadComponent:() => import('./layout/country-layout/country-layout.component'),
    children:[
      {
        path: 'by-capital',
        title:'By Capital',
        loadComponent:() => import('./pages/by-capital/by-capital.component')
      },
      {
        path:'by-country',
        title:'By Country',
        loadComponent: () => import('./pages/by-country/by-country.component')
      },
      {
        path: 'by-region',
        title: 'By Region',
        loadComponent: () => import('./pages/by-region/by-region.component')
      },
      {
        path:'by/:code',
        loadComponent: () => import('./pages/country-page/country-page.component')
      },
      {
        path: '**',
        redirectTo:'by-capital'
      }
    ]
  },
  {
    path: '**',
    redirectTo:''
  }
]


// export default countryRoutes;
