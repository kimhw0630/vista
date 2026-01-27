import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { TranslationService, Language } from './translation.service';

export interface Attorney {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription?: string;
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

interface AttorneyBase {
  id: string;
  image: string;
  specialties?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
}

interface AttorneyTranslations {
  [key: string]: {
    name?: string;
    title?: string;
    description?: string;
    shortDescription?: string;
    education?: Array<{ school: string; degree: string; year: string }>;
    barAdmissions?: string[];
    biography?: string[];
    experience?: Array<{ position: string; organization: string }>;
    practices?: Array<{ shortName: string; description?: string }>;
    notableCases?: Array<{ description: string }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AttorneyService {
  private translations$: Observable<AttorneyTranslations>;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {
    // Create an observable that loads translations whenever language changes
    this.translations$ = this.translationService.currentLanguage$.pipe(
      switchMap((lang: Language) => 
        this.http.get<AttorneyTranslations>(`assets/i18n/attorneys.${lang}.json`)
      ),
      shareReplay(1) // Cache the latest value
    );
  }

  // Language-independent base data only
  private attorneys: AttorneyBase[] = [
    {
      id: 'jae-hyun-park',
      image: 'images/JaeHyunPark_color.png',
      specialties: ['Corporate Law', 'Real Estate'],
      email: 'park@vistallp.ca',
      phone: '(905) 886-3339'
    },
    {
      id: 'theresa-wooyeon-choi',
      image: 'images/TheresaWooyeonChoi_color.png',
      specialties: ['Real Estate', 'Property Law'],
      email: 'choi@vistallp.ca',
      phone: '(905) 886-3339'
    },
    {
      id: 'steven-hong',
      image: 'images/StevenHong_color.png',
      specialties: ['Commercial Law', 'Civil Litigation'],
      email: 'hong@vistallp.ca',
      phone: '(905) 886-3339'
    },
    {
      id: 'warren-chan',
      image: 'images/WarrenChan_color.png',
      specialties: ['General Practice'],
      email: '',
      phone: '(905) 886-3339'
    },
    {
      id: 'chan-yeung-kang',
      image: 'images/ChanYeungKang_color.png',
      specialties: ['Counsel'],
      email: '',
      phone: ''
    }
  ];

  getAttorneys(): Attorney[] {
    // This method is deprecated, use getAttorneys$() instead
    return [];
  }

  getAttorneyById(id: string): Attorney | undefined {
    // This method is deprecated, use getAttorneyById$() instead
    return undefined;
  }

  // Observable versions for reactive updates
  getAttorneys$(): Observable<Attorney[]> {
    return this.translations$.pipe(
      map(translations => 
        this.attorneys.map(attorney => this.mergeTranslation(attorney, translations[attorney.id]))
      )
    );
  }

  getAttorneyById$(id: string): Observable<Attorney | undefined> {
    return this.translations$.pipe(
      map(translations => {
        const attorney = this.attorneys.find(a => a.id === id);
        if (!attorney) return undefined;
        return this.mergeTranslation(attorney, translations[id]);
      })
    );
  }

  private mergeTranslation(attorney: AttorneyBase, translation?: any): Attorney {
    if (!translation) {
      // Return a minimal Attorney object with empty fields if translation is missing
      return {
        ...attorney,
        name: '',
        title: '',
        description: '',
        shortDescription: '',
        education: [],
        barAdmissions: [],
        biography: [],
        experience: [],
        practices: [],
        notableCases: []
      };
    }

    // Merge base attorney data with translation
    return {
      ...attorney,
      name: translation.name || '',
      title: translation.title || '',
      description: translation.description || '',
      shortDescription: translation.shortDescription || '',
      education: translation.education || [],
      barAdmissions: translation.barAdmissions || [],
      biography: translation.biography || [],
      experience: translation.experience || [],
      practices: translation.practices || [],
      notableCases: translation.notableCases || []
    };
  }
}
