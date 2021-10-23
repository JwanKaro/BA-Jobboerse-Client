# Bundesagenutr für arbeit Jobbörse Client
Die **Inoffizieller** API-Client für die Jobsuche von der Arbeitsagentur.

---
## **Beispiel**
Lade die Environment Variables.
```.env
BA_CLIENT_ID="--------_----_----_----_------------"
BA_CLIENT_SECRET="--------_----_----_----_------------"
BA_HOST_AUTH="https://api-con.arbeitsagentur.de/oauth/gettoken_cc"
BA_ENCRYPTION_KEY_PATH="./secrets/encryption.key"
```

Dann viel spaß

```typescript
import BaClient from "BaArbeitClient"

const client = new BaClient()

async function main(){
    await client.init()

    const results = await client.Search({
        title:"Fachinformatiker"
    }) 

}
main()
```

## Environment
BA = Bundesagentur für Arbeit 

| Keys              | Required | Beschreibung                                                                                                  |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| BA_CLIENT_ID      | True     | Die Client-ID ist für die Authentifizierung erforderlich. Man kann dies vom BA direkt oder indirekt bekommen. |
| BA_CLIENT_SECRET  | True     | Genau wie bei der Client-ID                                                                                   |
| BA_HOST_AUTH      | True     | Die Authentifizierungsserver URL. <br> Defualt:  `https://api-con.arbeitsagentur.de/oauth/gettoken_cc`        |
| BA_ENCRYPTION_KEY | True     | Der Verschlüsselungsschlüssel wird benötigt, um die Tokens von BA sicher zu speichern.                        |


# Client ID & Secret 
Um die Client ID & Secret zu finden, muss man nach sie in der BA-seite suchen. Oder direkt von dem [bund.dev](https://jobsuche.api.bund.dev/) kopieren.

<br>

# Progress
Die client ist noch nicht vollstandig fertig. 

![20%](https://progress-bar.dev/20)

### TODOs:

- [x] Authentifizierungsprozess
- [x] Tokens für die zukünftige benutzung speichern.
- [x] Suchfunktion implementieren
- [ ] Konfigurator-Objekt statt `.env`
- [ ] Besser speicher Implementierung
- [ ] die Methode `init` besser implementieren
- [ ] Suchergebnisse verarbeiten
- [ ] Die API-Endpoints implementieren und zu jedem einen **Handler** codieren
 <br>

Api Endpoints

```json
{
   "service":{
      "accesstoken":{
         "host":"https://sso.arbeitsagentur.de",
         "port":"443",
         "prefix":""
      },
      "cookiepicture":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"",
         "resource":"/sso/baicon.png"
      },
      "oauthtoken":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"",
         "resource":"/oauth/gettoken_cc"
      },
      "header":{
         "host":"https://con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/hf/hf-v5",
         "resource":"/ct/releases/v3.x/bahf-webcomponents/bahf-webcomponents.js"
      },
      "headermodule":{
         "host":"https://con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/hf/hf-v5",
         "resource":"/ct/releases/v3.x/bahf-webcomponents/bahf-webcomponents.esm.js"
      },
      "stellenangebote":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pc/v4/jobs"
      },
      "orte":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/kataloge-service",
         "resource":"/ed/v1/orte"
      },
      "suggest":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/suggest-service",
         "resource":"/ed/v1/vorschlaege"
      },
      "jobdetails":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pc/v2/jobdetails"
      },
      "kontaktdaten":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pc/v2/jobs/{jobid}/bewerbung"
      },
      "kontaktdatenangemeldet":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pd/v2/jobs/{jobid}/bewerbung"
      },
      "stellenmeldung":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pc/v2/jobs/{jobid}/meldung"
      },
      "arbeitgeberlogo":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/ed/v1/arbeitgeberlogo"
      },
      "anmeldestatus":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pc/v1/anmeldestatus"
      },
      "vormerkungen":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pd/v1/vormerkungen"
      },
      "suchauftraege":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/jobboerse/jobsuche-service",
         "resource":"/pd/v1/suchauftraege"
      },
      "login":{
         "host":"https://con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/apok/sso/",
         "resource":"/pd/login?next_url="
      },
      "assignment":{
         "host":"https://api-con.arbeitsagentur.de",
         "port":"443",
         "prefix":"/prod/aas/aas",
         "resource":"/pc/v1/assignment"
      },
      "profil":{
         "host":"https://con.arbeitsagentur.de",
         "port":"",
         "prefix":"/prod/profil/profil-ui/pd/"
      }
   }
}
```

