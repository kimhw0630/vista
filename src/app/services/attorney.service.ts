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
      email: 'park@vistallp.ca',
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
        'Jae Park is the managing partner at Vista Law LLP. He is an Ontario lawyer and notary public.',
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
      email: 'choi@vistallp.ca',
      phone: '(905) 886-3339',
      education: [
        {
          school: 'University of Ottawa',
          degree: 'Juris Doctor (J.D.)',
          year: '2010'
        },
        {
          school: 'Binghamton University (State University of New York at Binghamton)',
          degree: 'Bachelor of Arts',
          year: '2007'
        }
      ],
       biography: [
        'Theresa Wooyeon Choi is an Ontario lawyer and notary public.',
        'She is a partner at Vista Law LLP and is the head of the firm’s Real Estate Department.  Theresa’s attention to detail, along with her professional and friendly demeanor, will ensure that clients’ real estate and business transactions are completed in a pleasant manner.',
        'Theresa enjoys giving back to the community:  she regularly volunteers at not-for-profit events such as pro bono real estate law courses/seminars, human rights initiatives.',
       ],
       experience: [
        {
          position: 'Principal',
          organization: 'Wooyeon Choi Law (2016 to 2023)',
        },
         {
          position: 'Counsel',
          organization: 'The Peaceful Unification Advisory Council of Korea (2020 to 2023)',
        },
         {
          position: 'Board of Director',
          organization: 'Korean Canadian Symphony Orchestra',
        },
        
      ],
      notableCases: [
        {
          description: 'Sale of $11.8 million commercial building'      
        },
         {
          description: 'Acquisition of $9.38 million medical office building'      
        },
         {
          description: '$3.5 million private equity funding to a land developer'      
        },
        {
          description: 'successfully closed more than 2,000 real estate and business transactions (as of March 1, 2023)'      
        }
      ],
      practices: [
        {
          shortName: 'Real Estate Law',           
        description: 'Residential and commercial real estate transactions, including purchases, sales, refinancing, and closings.'
        },
        {
          shortName: 'Business Incorporation & Structuring', 
            description: 'Incorporation and legal structuring for new and growing businesses, including advice on ownership and compliance.'
        },
         {
          shortName: 'Business Acquisition & Sale', 
            description: 'Legal representation for the purchase and sale of businesses, including asset and share transactions.'
        },
      ],

    },
    {
      id: 'steven-hong',
      name: 'Steven Hong',
      title: 'Partner',
      description: 'Partner | Commercial Law & Civil Litigation.',
      image: 'images/StevenHong_color.png',
      specialties: ['Commercial Law', 'Civil Litigation'],
      email: 'hong@vistallp.ca',
      phone: '(905) 886-3339',
      education: [
      {
          school: 'University of Western (Western Law)',
          degree: 'Juris Doctor (J.D.)',
          year: '2019'
        },
        {
          school: 'University of Western',
          degree: 'B.M.O.S. (Bachelor of Management & Organizational Studies)',
          year: '2010'
        },
      ],
       biography: [
        'Steven Hong is a partner at Vista Law LLP with a focus on the areas of Commercial Law and Civil Litigation.',
        'He is fluent in both English and Korean and has a strong connection to the Korean-Canadian community in Toronto. Steven Hong obtained his law degree from the University of Western Ontario. ',
        'Outside of his practice, Steven enjoys playing sports and musical instruments. He is also an avid traveler who has visited five continents to date.',
       ],
       experience: [
        {
          position: 'Associate',
          organization: 'Jae Park Law (2020-2023)',
        },
         {
          position: 'Articling',
          organization: 'Agro Zaffiro LLP (2018-2020)',
        },
        
      ],
      notableCases: [
        {
          description: 'Representation in various jurisdictions (Superior Court of Jusitce, Divisional Court, Small Claims Court, and Landlord Tenant Board) '      
        },
      ],
      practices: [
        {
          shortName: 'Employment Law',           
        description: 'Advising employers and employees on workplace matters, including contracts, terminations, and employment standards.'
        },
        {
          shortName: 'Commercial Law', 
            description: 'Legal support for commercial transactions, contracts, and business operations.'
        },
         {
          shortName: 'Corporate Law', 
            description: 'Corporate governance, reorganizations, and ongoing legal advice for corporations.'
        },
         {
          shortName: 'Real Estate Law', 
            description: 'Residential and commercial real estate transactions, including purchases, sales, and refinancing.'
        },
        {
          shortName: 'Wills & Estates', 
            description: 'Estate planning services, including wills, powers of attorney, and estate administration.'
        },
      ],
    },
    {
      id: 'warren-chan',
      name: 'Warren Chan',
      title: 'Partner',
      description: 'Partner | Practicing in Association.',
      image: 'images/WarrenChan_color.png',
      specialties: ['General Practice'],
      email: '',
      phone: '(905) 886-3339',
       education: [
      {
          school: 'Osgoode Hall Law School',
          degree: 'LLB (Bachelor of Laws)',
          year: '2019'
        },
        {
          school: 'University of Western',
          degree: 'Bachelor (Hons.)',
          year: '2010'
        },
      ],
       biography: [
        'Warren Chan is a lawyer practicing in association* at Vista Law LLP.',
        'A graduate of the Osgoode Hall Law School, Warren practices in all areas of immigration law serving both individual and corporate clients. Warren provides services in English, Chinese and Korean.',
        'When not in the office, Warren enjoys travelling and cheering on his kids at their various sports events and activities. He is also an enthusiastic but cautious skier.'
       ],
       practices: [
        {
          shortName: 'Express Entry',           
        description: 'Assistance with federal skilled worker, skilled trades, and Canadian experience class applications.'
        },
        {
          shortName: 'Provincial Nominee Programs (PNP) & Atlantic Immigration Program (AIP)', 
            description: 'Guidance on immigration programs run by provinces and Atlantic regions to support employer-driven and skilled worker applications.'
        },
         {
          shortName: 'Family Sponsorship & Reunification', 
            description: 'Helping Canadian citizens and permanent residents sponsor eligible family members.'
        },
         {
          shortName: 'Work Permits', 
            description: 'Applications for temporary work permits, including LMIA-based, investor, intra-company transferee, and significant benefit categories.'
        },
        {
          shortName: 'Study Permits', 
            description: 'Assistance with study permit applications and extensions for international students.'
        },
        {
          shortName: 'Humanitarian & Compassionate (H&C) Applications', 
            description: 'Representation in special immigration applications based on humanitarian and compassionate considerations.'
        },
        {
          shortName: 'Admissibility & Criminal Rehabilitation', 
            description: 'Addressing immigration inadmissibility issues, including criminal history and rehabilitation applications.'
        },
      ],
       experience: [
        {
          position: 'Principal',
          organization: 'Warren Chan Professional Corporation (Practicing in Association with Vista Law LLP)',
        },
         {
          position: 'Corporate, Commercial & Securities Lawyer',
          organization: 'Boutique Law Firm, Toronto (Prior to Vista Law LLP)',
        },
        
      ],
    },
    {
      id: 'chan-yeung-kang',
      name: 'Chan Yeung Kang',
      title: 'Counsel to the Firm',
      description: 'Honorary Member | Retired as of July 1, 2025.',
      image: 'images/ChanYeungKang_color.png',
      specialties: ['Counsel'],
      email: '',
      phone: '',
       education: [
      {
          school: 'Osgoode Hall Law School',
          degree: 'Juris Doctor (J.D.)',
          year: '2019'
        },
      ],
       biography: [
        'Chan Yeung Kang is the first-ever Korean Canadian Lawyer in Canada.',
        'He retired from the practice of law as of July 1, 2025 and will remain as an honorary member of Vista Law LLP.',
       ],
       experience: [
        {
          position: 'Principal',
          organization: ' C.Y. Kang Professional Corporation (1981 to 2025)',
        },
         {
          position: 'Director',
          organization: 'Shinhan Bank Canada',
        },
         {
          position: 'Director',
          organization: 'Ontario Gaming and Lottery Corporation',
        },
         {
          position: 'Director',
          organization: 'Metro YMCA',
        },
         {
          position: 'Director',
          organization: 'Korean YMCA',
        },
         {
          position: 'Founder of Tentmakers’ Ministry',
          organization: 'Christian Mission Organization YWAM',
        },
      ],
      notableCases: [
        {
          description: 'Registering several hundreds of churches as charities with Canada Revenue Agency, including other non-profit organizations such as Korean Cultural Association, Arirang Age-Friendly Community Centre, Canada YLT Scholarship Foundation, Korean Canadian Alzheimer’s Society, Good Farmers Canada, Good Neighbours Canada, Hope Network for the Ecosystem, Korean Canadian Church Music, Maum Family Care Centre, Stretched Arm Society, and etc.',
        
        },
        {
          description: 'Extensive experience in negotiating commercial leases for Korea Food Trading/ Galleria Supermarket, and etc.',
        },
         {
          description: 'Establishing several franchises such as The Owl of Minerva, Kitchen Food Fair, and etc.',
        }
      ],
       practices: [
         {
          shortName: 'Real Estate Law (Commercial & Residential)', 
            description: 'Residential and commercial real estate transactions, including purchases, sales, and refinancing.'
        },
        {
          shortName: 'Corporate & Commercial Law',           
        description: 'Support for business operations, contracts, and corporate governance.'
        },
        {
          shortName: 'Franchise Law', 
            description: 'Advice on franchise agreements, compliance, and operations for franchisors and franchisees'
        },
         {
          shortName: 'Corporate Structuring & Incorporation', 
            description: 'Assistance with business incorporation, structuring, and ongoing corporate compliance.'
        },
        
        {
          shortName: 'Charities & Non-Profit Organizations (NPOs)', 
            description: 'Legal support for establishing, managing, and maintaining non-profit organizations.'
        },
        {
          shortName: 'Wills & Estates', 
            description: 'Estate planning, wills, powers of attorney, and estate administration.'
        },
        {
          shortName: 'Notarization / Notary Services', 
            description: 'Witnessing and certifying documents, affidavits, and international notarizations'
        },
      ],
    }
  ];

  getAttorneys(): Attorney[] {
    return this.attorneys;
  }

  getAttorneyById(id: string): Attorney | undefined {
    return this.attorneys.find(attorney => attorney.id === id);
  }
}
