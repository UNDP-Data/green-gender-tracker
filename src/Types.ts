export interface PolicyDataType {
  'Country Code': string;
  'Country Name': string;
  Region: string;
  Subregion: string;
  'Policy Measure Category': string;
  'Policy Measure Type': string;
  'Policy Measure Sub-Type': string;
  'Policy Measure Description': string;
  Source?: string;
  'Addresses VAWG': 'YES' | 'NO';
  "Targets Women's Economic Security": 'YES' | 'NO';
  'Directly supports unpaid care': 'YES' | 'NO';
}

export interface TFDataType {
  'Country Code': string;
  Country: string;
  'SDG Region': string;
  'Sub-region': string;
  'UNDP Region': string;
  'Task Force Name': string;
  Type: 'Expert' | 'Decision-Making';
  Sector: 'Public Health' | 'Multi-Sectoral' | 'Economic' | 'Enforcement' | 'Education' | 'Others';
  'Sector 2': 'Public Health' | 'Multi-Sectoral' | 'Others';
  '#Men'?: number;
  '#Women'?: number;
  Total?: number;
  '%Women'?: number;
  'Leader Gender'?: 'Man' | 'Woman' | 'Man & Woman (co-chairs)' ;
  'Woman Leader'?: 'Yes' | 'No' | 'Co-Chair' | 'Missing' ;
  'Composition Data': 'Yes' | 'No';
  'Composition Classification'?: 'Gender Parity' | 'Majority Men' | 'Majority Women';
  Sources?: string;
}

export interface CountrySummaryDataType {
  countryName: string;
  countryCode: string;
  region: string;
  noOfPolicies: number;
  noOfGenderPolicies: number;
  noOfPoliciesAddressingVAWG: number;
  noOfPoliciesSupportingUnpaidCare: number;
  noOfPoliciesTargetingWomenEcoSecuirty: number;
}

export interface CountryTFSummaryDataType {
  countryName: string;
  countryCode: string;
  region: string;
  noOfTF: number;
  noOfTFWithWomenLeader: number;
  percentOfTFWithWomenLeader: number;
  noOfTFWithMajorityWomenOfGenderParity: number;
  percentOfTFWithMajorityWomenOfGenderParity: number;
  noOfTFMembers: number;
  noOfTFMembersWomen: number;
  percentOfTFMembersWomen: number;
}
