import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private currentEnv: any = "local";

  private environmentData: any = {
    local_DEV: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-dev",
        "clientId": "ofi-vega-portal-dev"
      },
      // "apiUrl": "https://vega-manna-dev.olamdigital.com/",
      "apiUrl": "http://localhost:8082/",
      "redirectUrl": "http://localhost:4200/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    local: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-sit",
        "clientId": "ofi-vega-portal-sit"
      },
      "apiUrl": "http://localhost:8082/",
      "redirectUrl": "http://localhost:4200/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    local_UAT: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-uat",
        "clientId": "ofi-vega-portal-uat"
      },
      "apiUrl": "http://localhost:8082/",
      "redirectUrl": "http://localhost:4200/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    dev: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-dev",
        "clientId": "ofi-vega-portal-dev"
      },
      "apiUrl": "https://vega-manna-dev.olamdigital.com/",
      "redirectUrl": "https://digitalwarehouse-dev.ofi.com/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    sit: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-sit",
        "clientId": "ofi-vega-portal-sit"
      },
      "apiUrl": "https://vega-manna-sit.olamdigital.com/",
      "redirectUrl": "https://digitalwarehouse-sit.ofi.com/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    uat: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-uat",
        "clientId": "ofi-vega-portal-uat"
      },
      "apiUrl": "https://vega-manna-uat.olamdigital.com/",
      "redirectUrl": "https://digitalwarehouse-uat.ofi.com/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    preprod: {
      "keycloakConfig": {
        "url": "https://digitalauthdev.olamnet.com/auth/",
        "realm": "vega-manna-uat",
        "clientId": "ofi-vega-portal-uat"
      },
      "apiUrl": "https://vegax-pprd.olamdigital.com/",
      "redirectUrl": "https://digitalwarehouse-pprd.ofi.com/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76"
    },
    prod: {
      "keycloakConfig": {
        "url": "https://digitalauth.olamnet.com/auth/",
        "realm": "vega",
        "clientId": "ofi-vega-portal"
      },
      "apiUrl": "https://vega-prod.olamdigital.com/",
      "redirectUrl": "https://digitalwarehouse.ofi.com/",
      "basePath": "home",
      "cryptoKey": "18jkbasdhuicjhg+79o=76",
      "lowerEnv": {
        "apiUrl": "https://vega-manna-uat.olamdigital.com/",
      }
    }
  }

  constructor(private http: HttpClient) { }

  public getConfig(key: any) {
    
    if(this.currentEnv) {

      return this.environmentData[this.currentEnv][key];
    }
    return null;
  }

  public getEnv() {
    return this.currentEnv;
  }

  public async loadEnvAndConfig() {
    return new Promise((resolve) => {
      this.http.get('../assets/env/env.json')
        .pipe(map(res => res)).subscribe((envResponse: any) => {
          this.currentEnv = envResponse['env'];
          
          resolve(true);
        });
    });
  }
}
