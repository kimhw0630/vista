import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  features: {
    showTestimonials: boolean;
    showTrustIndicators: boolean;
    showCTA: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Load configuration from app-config.json
   * This should be called before the app initializes
   */
  async loadConfig(): Promise<void> {
    try {
      this.config = await firstValueFrom(
        this.http.get<AppConfig>('/assets/config/app-config.json')
      );
      console.log('App configuration loaded:', this.config);
    } catch (error) {
      console.error('Failed to load app configuration:', error);
      // Set default config as fallback
      this.config = {
        theme: {
          primaryColor: '#781723',
          secondaryColor: '#9e1e2d'
        },
        features: {
          showTestimonials: true,
          showTrustIndicators: true,
          showCTA: true
        }
      };
    }
  }

  /**
   * Get the loaded configuration
   */
  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded. Make sure loadConfig() is called during app initialization.');
    }
    return this.config;
  }

  /**
   * Get theme configuration
   */
  getTheme() {
    return this.getConfig().theme;
  }

  /**
   * Get features configuration
   */
  getFeatures() {
    return this.getConfig().features;
  }

  /**
   * Check if a specific feature is enabled
   */
  isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.getConfig().features[feature];
  }
}
