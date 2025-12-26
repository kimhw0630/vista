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
    { name: 'Jennifer Martinez', position: 'Office Manager', email: 'j.martinez@vista.law', phone: '(212) 555-0150' },
    { name: 'Robert Thompson', position: 'Legal Secretary', email: 'r.thompson@vista.law', phone: '(212) 555-0151' },
    { name: 'Lisa Anderson', position: 'Paralegal', email: 'l.anderson@vista.law', phone: '(212) 555-0152' },
    { name: 'William Davis', position: 'Court Clerk', email: 'w.davis@vista.law', phone: '(212) 555-0153' },
    { name: 'Maria Garcia', position: 'Administrative Assistant', email: 'm.garcia@vista.law', phone: '(212) 555-0154' },
    { name: 'James Wilson', position: 'Legal Assistant', email: 'j.wilson@vista.law', phone: '(212) 555-0155' },
    { name: 'Patricia Brown', position: 'Office Coordinator', email: 'p.brown@vista.law', phone: '(212) 555-0156' },
    { name: 'Christopher Lee', position: 'Records Clerk', email: 'c.lee@vista.law', phone: '(212) 555-0157' },
    { name: 'Nancy White', position: 'Receptionist', email: 'n.white@vista.law', phone: '(212) 555-0158' },
    { name: 'Daniel Harris', position: 'File Clerk', email: 'd.harris@vista.law', phone: '(212) 555-0159' },
    { name: 'Karen Taylor', position: 'Legal Secretary', email: 'k.taylor@vista.law', phone: '(212) 555-0160' },
    { name: 'Steven Moore', position: 'Office Assistant', email: 's.moore@vista.law', phone: '(212) 555-0161' }
  ];
}
