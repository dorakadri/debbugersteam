import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { StudentsComponent } from '../../students/students.component';
import { FormStudentComponent } from '../../students/form-student/form-student.component';
import { ListStudentComponent } from '../../students/list-student/list-student.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',      component: UserProfileComponent },
    { path: 'students',      component: ListStudentComponent },
    { path:'students/ajouter',      component: FormStudentComponent },
     { path:'students',      component: FormStudentComponent },
    { path: 'students',      loadChildren: () => import('../../students/students.module').then(x=>x.StudentsModule) },
    { path: 'contracts',      loadChildren: () => import('../../contracts/contracts.module').then(x=>x.ContractsModule) },
    { path: 'projects',      loadChildren: () => import('../../projects/projects.module').then(x=>x.ProjectsModule) },
    { path: 'students',      loadChildren: () => import('../../students/students.module').then(x=>x.StudentsModule) },
    { path: 'teams',      loadChildren: () => import('../../teams/teams.module').then(x=>x.TeamsModule) },
    { path: 'universities',      loadChildren: () => import('../../universities/universities.module').then(x=>x.UniversitiesModule) },
    { path: 'departments',      loadChildren: () => import('../../departments/departments.module').then(x=>x.DepartmentsModule) }
];
