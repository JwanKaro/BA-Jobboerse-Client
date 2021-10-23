
/**
 * +-----------------------------------------------------------------+
 * |                                                                 |
 * |                        Search types                             |
 * |                                                                 |
 * +-----------------------------------------------------------------+
 */

import { Method } from "axios"

type JobSearchType =
    "job" |
    "selfReliance" |
    "internship" |
    "trainee"
type ContractPeriod =
    {
        unlimited?: 1,
        limited?: 2
    }
type WorkingTime = {
    fullTime?: boolean,
    partTime?: boolean,
    weekends?: boolean,
    homeoffice?: boolean,
    miniJob?: boolean,
}
export type SearchParams = {
    title?: string,
    location?: string,
    maxJobs?: number;
    publishedWithIn?: number,
    thirdPartyResources?: boolean,
    type?: JobSearchType,
    contractPeriod?: ContractPeriod,
    disabilityFrendliy?: boolean,
    coronaAction?: boolean,
    radiusOfLocation?: number,
    workingTime?: WorkingTime
}



export interface SearchResponse {
    stellenangebote: Stellenangebote[];
    maxErgebnisse: number;
    page: number;
    size: number;
    woOutput: WoOutput;
    facetten: Facetten;
}

interface Facetten {
    befristung: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    behinderung: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    berufsfeld: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    pav: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    arbeitsort: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    veroeffentlichtseit: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    schulbildung: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    arbeitgeber: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    beruf: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    berufserfahrung: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    branche: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    arbeitszeit: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    eintrittsdatum: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    corona: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
    zeitarbeit: {
        counts: ArbeitgeberCounts;
        maxCount: number;
    };
}

interface Arbeitgeber {
    counts: ArbeitgeberCounts;
    maxCount: number;
}

interface ArbeitgeberCounts {
    elkaGbRJürgenSchmidtAlbertNeteler: number;
    fitForFacts: number;
    neubauerPartnerAkademieFürWeiterbildung: number;
    vereinFrauenInArbeitEV: number;
}

interface BerufClass {
    counts: { [key: string]: number };
    maxCount: number;
}

interface Arbeitszeit {
    counts: ArbeitszeitCounts;
    maxCount: number;
}

interface ArbeitszeitCounts {
    ho: number,
    mj: number,
    snw: number,
    tz: number,
    vz: number
}

interface counts {
    counts: {[key: string|number]: any};
    maxCount: number;
}


interface Berufsfeld {
    counts: BerufsfeldCounts;
    maxCount: number;
}

interface BerufsfeldCounts {
    einkaufUndVertrieb: number;
    itNetzwerktechnikAdministrationOrganisation: number;
    innenarchitekturRaumausstattung: number;
    lehrtätigkeitAnAußerschulischenBildungseinrichtungen: number;
    lehrtätigkeitBerufsbildenderFächerUndBetrieblicheAusbildung: number;
    sprachUndLiteraturwissenschaften: number;
    technischeMediengestaltung: number;
    technischeProduktionsplanungUndSteuerung: number;
}

interface Schulbildung {
    counts: SchulbildungCounts;
    maxCount: number;
}

interface SchulbildungCounts {
    [key: number]: number;
}

interface Veroeffentlichtseit {
    counts: VeroeffentlichtseitCounts;
    maxCount: number;
}

interface VeroeffentlichtseitCounts {
    the14: number;
    the28: number;
    alle: number;
}

interface Stellenangebote {
    beruf: string;
    titel: string;
    refnr: string;
    arbeitsort: StellenangeboteArbeitsort;
    arbeitgeber: string;
    aktuelleVeroeffentlichungsdatum: Date;
    modifikationsTimestamp: Date;
    eintrittsdatum: Date;
    logoHashId?: string;
    hashId: string;
}

interface StellenangeboteArbeitsort {
    plz?: string;
    ort: string;
    ortsteil?: string;
    strasse?: string;
    region: string;
    land: string;
    koordinaten: coordinates;
    entfernung: string;
}



interface WoOutput {
    bereinigterOrt: string;
    suchmodus: string;
    koordinaten: coordinates[];
}



/**
 * +-----------------------------------------------------------------+
 * |                                                                 |
 * |                   Responses from the API                        |
 * |                                                                 |
 * +-----------------------------------------------------------------+
 */


interface coordinates {
    lat: number;
    lon: number;
}

interface Arbeitsorte {
    land: string;
    region: string;
    ort: string;
    koordinaten: any[];
}

interface ArbeitgeberAdresse {
    land: string;
    region: string;
    plz: string;
    ort: string;
    strasse: string;
    strasseHausnummer: string;
}

interface Mobilitaet {
    reisebereitschaft: string;
    fuehrerscheine: any[][];
}

interface Fuehrungskompetenzen {
    fuehrungsverantwortung: string;
}


interface ExternalLink {
    href: string;
}

interface Links {
    self: ExternalLink;
    arbeitgeberlogo: ExternalLink;
    bewerbung: ExternalLink;
    details: ExternalLink;
}

export interface JobApiResponse {
    aktuelleVeroeffentlichungsdatum: string;
    alternativBerufe: string[];
    angebotsart: string;
    arbeitgeber: string;
    branchenbezeichnung: string;
    arbeitgeberHashId: string;
    arbeitsorte: Arbeitsorte[];
    arbeitszeitmodelle: string[];
    befristung: string;
    betriebsgroesse: string;
    eintrittsdatum: string;
    ersteVeroeffentlichungsdatum: string;
    freieBezeichnung: string;
    hashId: string;
    hauptberuf: string;
    modifikationsTimestamp: Date;
    stellenbeschreibung: string;
    referenznummer: string;
    tarifvertrag: string;
    fuerFluechtlingeGeeignet: boolean;
    nurFuerSchwerbehinderte: boolean;
    anzahlOffeneStellen: number;
    arbeitgeberAdresse: ArbeitgeberAdresse;
    staerken: string[];
    mobilitaet: Mobilitaet;
    fuehrungskompetenzen: Fuehrungskompetenzen;
    verguetung: string;
    arbeitgeberdarstellungUrl: string;
    hauptDkz: string;
    alternativDkzs: string[];
    istBetreut: boolean;
    istGoogleJobsRelevant: boolean;
    angebotsartGruppe: string;
    anzeigeAnonym: boolean;
    _links: Links;
}



/**
 * +-----------------------------------------------------------------+
 * |                                                                 |
 * |                          Functions                              |
 * |                                                                 |
 * +-----------------------------------------------------------------+
 */

export interface ActionRequest {
    url: string;
    method: Method;
    data?: any;
}