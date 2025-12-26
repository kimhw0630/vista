import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about';
import { HomeComponent } from './pages/home/home';
import { PracticeAreasComponent } from './pages/practice-areas/practice-areas';
import { AttorneysComponent } from './pages/attorneys/attorneys';
import { ContactComponent } from './pages/contact/contact';
import { AttorneyProfileComponent } from '../pages/attorney-profile/attorney-profile';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'practice-areas',
    component: PracticeAreasComponent
  },
  {
    path: 'attorneys',
    component: AttorneysComponent
  },
  {
    path: 'attorneys/:id',
    component: AttorneyProfileComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];
