import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/universities', title: 'universities',  icon:'objects_spaceship', class: '' },
    { path: '/departments', title: 'departments',  icon:'design_bullet-list-67', class: '' },
    { path: '/students', title: 'students',  icon:'ui-1_bell-53', class: '' },
    { path: '/contracts', title: 'Contracts',  icon:'education_atom', class: '' },
    { path: '/teams', title: 'teams',  icon:'text_caps-small', class: '' },
    { path: '/projects', title: 'projects',  icon:'location_map-big', class: '' }


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
