import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',      component: UserProfileComponent },
    { path: 'contracts',      loadChildren: () => import('../../contracts/contracts.module').then(x=>x.ContractsModule) },
    { path: 'projects',      loadChildren: () => import('../../projects/projects.module').then(x=>x.ProjectsModule) },
    { path: 'students',      loadChildren: () => import('../../students/students.module').then(x=>x.StudentsModule) },
    { path: 'teams',      loadChildren: () => import('../../teams/teams.module').then(x=>x.TeamsModule) },
    { path: 'universities',      loadChildren: () => import('../../universities/universities.module').then(x=>x.UniversitiesModule) },
    { path: 'departments',      loadChildren: () => import('../../departments/departments.module').then(x=>x.DepartmentsModule) }
];
