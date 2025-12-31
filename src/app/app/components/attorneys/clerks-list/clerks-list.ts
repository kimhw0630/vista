import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clerks-list',
  imports: [CommonModule],
  templateUrl: './clerks-list.html',
  styleUrl: './clerks-list.scss',
  standalone: true
})
export class ClerksList {
  clerks = [
    { name: 'Sandy Jin', position: 'Office Manager (for Immigration Department)', email: 'sandy@vistallp.ca', phone: '(416) 733-2187' },
    { name: 'Ivy Park', position: 'Administrative Assistant', email: 'ivy@vistallp.ca', phone: '(905) 886-3339', ext:'232' },
    { name: 'Grace Choi', position: 'Client Relations Coordinator', email: 'grace@vistallp.ca', phone: '(905) 886-3339', ext:'227' },
    { name: 'Jessica Lee', position: 'Office Manager', email: 'jessica@vistallp.ca', phone: '(905) 886-3339', ext:'225' },
    { name: 'Jina Yoo', position: 'Senior Law Clerk', email: 'jina@vistallp.ca', phone: '(905) 886-3339', ext:'228' },
    { name: 'Lucy Jo', position: 'Law Clerk', email: 'lucy@vistallp.ca', phone: '(905) 886-3339', ext:'226' },
    { name: 'Yan Wei', position: 'Senior Law Clerk', email: 'yan@vistallp.ca  ', phone: '(905) 886-3339', ext:'224' },
    { name: 'Jia Shin', position: 'Junior Law Clerk', email: 'jia@vistallp.ca', phone: '(905) 886-3339', ext:'230' },
    { name: 'Alicia Cha', position: 'Senior Law Clerk', email: 'alicia@vistallp.ca', phone: '(905) 886-3339', ext:'231' },
    { name: 'Sue Ghang', position: 'Law Clerk', email: 'sg@vistallp.ca ', phone: '(905) 886-3339', ext:'235' },
    { name: 'Sunny Park', position: 'Law Clerk', email: 'sunny@vistallp.ca', phone: '(905) 886-3339', ext:'236' },
    { name: 'Eunice Shin', position: 'Law Clerk', email: 'eunice@vistallp.ca', phone: '(905) 886-3339', ext:'237' }
  ];
}
