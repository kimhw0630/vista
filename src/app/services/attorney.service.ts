import { Injectable } from '@angular/core';

export interface Attorney {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  specialties?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  education?: Array<{ school: string; degree: string; year: string }>;
  barAdmissions?: string[];
  biography?: string[];
  experience?: Array<{ position: string; organization: string; startYear?: string; endYear?: string }>;
  practices?: Array<{ shortName: string; description?: string; }>;
  notableCases?: Array<{ description: string; }>;
  //Notable Cases
}

@Injectable({
  providedIn: 'root'
})
export class AttorneyService {
  private attorneys: Attorney[] = [
    {
      id: 'jae-hyun-park',
      name: 'Jae Hyun Park',
      title: 'Partner',
      description: 'Managing Partner | Ontario Lawyer & Notary Public.',
      image: 'images/JaeHyunPark_color.png',
      specialties: ['Corporate Law', 'Real Estate'],
      email: 'jpark@vista.law',
      phone: '(905) 886-3339',
      education: [
        {
          school: 'Osgoode Hall Law School',
          degree: 'Juris Doctor (J.D.)',
          year: '2010'
        },
        {
          school: 'University of Toronto',
          degree: 'Bachelor of Commerce (B.Comm.)',
          year: '2007'
        },
        {
          school: 'Recipient of Governor General of Canada Academic Medal (Bronze)',
          degree: '',
          year: '2007'
        }
      ],
      barAdmissions: [
        'Law Society of Ontario',
        'Notary Public for Ontario'
      ],
      biography: [
        'Jae Park is the managing partner at Vista Law LLP. ',
        'He is an Ontario lawyer and notary public.  Jae strives to provide practical, creative and efficient legal solutions/advice to his clients which range from small business owners to international corporations.',
        'Jae is a sports enthusiast, holding an official 6th degree black belt in Taekwondo.  During his spare time, you can find him teaching and sparring at his own dojang, Young Park Martial Arts in Hamilton'
      ],
      experience: [
        {
          position: 'Principal',
          organization: 'Jae Park Law (2012 to 2023)',
        },
         {
          position: 'Associate',
          organization: 'Keesmaat Dixon LLP (2007 to 2012)',
        },
         {
          position: 'Summer Associate',
          organization: 'Bae, Kim & Lee LLP, Seoul, Korea (2006)',
        },
      ],
      practices: [
        {
          shortName: 'Corporate & Commercial',           
        description: 'Incorporations, Shareholder Agreements, Business Structuring, Mergers & Acquisitions, Commercial Transactions'
        },
        {
          shortName: 'Real Estate', 
            description: 'Residential & Commercial Purchases/Sales, Leasing, Financing, Development'
        },
         {
          shortName: 'Franchise & Licensing', 
            description: 'Franchise and licensing law services, advising franchisors and franchisees on compliance, disclosure obligations, and commercial agreements.'
        },
         {
          shortName: 'Wills & Estates', 
            description: 'Wills and estates law services, including estate planning, probate, and estate administration.'
        },
         {
          shortName: 'Health Law', 
            description: 'Health law services, including regulatory compliance with the RCDSO and CSPO and advising on the acquisition and sale of dental practices.'
        }
      ],
      notableCases: [
        {
          description: 'International and national corporations including Mobis Canada, Pantos Canada, BFI Canada (now known as Waste Connections of Canada), Golfzon Canada, Korean Exchange Bank of Canada, Shinhan Bank Canada'      
        },
         {
          description: 'Negotiation/Finalization of a commercial lease for an international corporation (approximately 540,000 square feet in size and over $4 million dollars in annual rent)'      
        },
         {
          description: 'Acquisition of $31 million shopping plaza'      
        },
         {
          description: 'Acted for a land developer on its sale of 70-home development project to a national builder'      
        },
         {
          description: 'Establishment of a factory plant/warehouse for an international corporation'      
        },
         {
          description: 'Acquisition of $3.5 million dentist practice'      
        },
         {
          description: 'Sale of $5 million franchised campground business'      
        },
         {
          description: '$11 million secured financing for a private education institution'      
        },
         {
          description: 'Successfully closed more than 6,000 real estate and business transactions (as of March 1, 2023)'      
        },
         {
          description: 'Zikman v. 156665 Canada Inc.'      
        },
         {
          description: 'Pro Bono legal services for war veterans who served in the Korean War and Vietnam War'      
        }
      ]
    },
    {
      id: 'theresa-wooyeon-choi',
      name: 'Theresa Wooyeon Choi',
      title: 'Partner',
      description: 'Partner | Head of Real Estate Department',
      image: 'images/TheresaWooyeonChoi_color.png',
      specialties: ['Real Estate', 'Property Law'],
      email: 'tchoi@vista.law',
      phone: '(905) 886-3339'
    },
    {
      id: 'steven-hong',
      name: 'Steven Hong',
      title: 'Partner',
      description: 'Partner | Commercial Law & Civil Litigation.',
      image: 'images/StevenHong_color.png',
      specialties: ['Commercial Law', 'Civil Litigation'],
      email: 'shong@vista.law',
      phone: '(905) 886-3339'
    },
    {
      id: 'warren-chan',
      name: 'Warren Chan',
      title: 'Partner',
      description: 'Lawyer | Practicing in Association.',
      image: 'images/WarrenChan_color.png',
      specialties: ['General Practice'],
      email: 'wchan@vista.law',
      phone: '(905) 886-3339'
    },
    {
      id: 'chan-yeung-kang',
      name: 'Chan Yeung Kang',
      title: 'Counsel to the Firm',
      description: 'Honorary Member | Retired as of July 1, 2025.',
      image: 'images/ChanYeungKang_color.png',
      specialties: ['Counsel'],
      email: 'ckang@vista.law',
      phone: '(905) 886-3339'
    }
  ];

  getAttorneys(): Attorney[] {
    return this.attorneys;
  }

  getAttorneyById(id: string): Attorney | undefined {
    return this.attorneys.find(attorney => attorney.id === id);
  }
}
