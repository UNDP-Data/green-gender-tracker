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

export interface PolicyGreenLenseDataType extends PolicyDataType {
  'Environmental relevance': 'YES' | 'NO';
  'Positive for environment': 'YES' | 'NO';
  'Gender-Green Nexus': 'YES' | 'NO';
}

export interface PolicyDataWithCountryData extends PolicyDataType {
  countryIncomeGroup: string;
  fragility: string;
  hdiGroup: string;
  ldc: boolean;
  sids: boolean;
}

export interface PolicyGreenLenseDataWithCountryData extends PolicyGreenLenseDataType {
  countryIncomeGroup: string;
  fragility: string;
  hdiGroup: string;
  ldc: boolean;
  sids: boolean;
}

export interface TFDataType {
  'Country Code': string;
  Country: string;
  'SDG Region': string;
  'Sub-region': string;
  'UNDP Region': string;
  incomeGroup: string;
  fragility: string;
  hdiGroup: string;
  ldc: boolean;
  sids: boolean;
  'Task Force Name': string;
  'Description of Task Force': string;
  Type: 'Expert' | 'Decision-Making';
  Sector: 'Public Health' | 'Multi-Sectoral' | 'Economic' | 'Enforcement' | 'Education' | 'Others';
  'Sector 2': 'Public Health' | 'Multi-Sectoral' | 'Others';
  '#Men'?: number;
  '#Women'?: number;
  Total?: number;
  '%Women'?: number;
  'Leader Gender': 'Man' | 'Woman' | 'Man and Woman (co-chairs)' | 'NA' ;
  'Woman Leader': 'Yes' | 'No' | 'Co-Chair' | 'Missing' ;
  'Composition Data': 'Yes' | 'No';
  'Composition Classification': 'Gender Parity' | 'Majority Men' | 'Majority Women' | 'NA';
  genderParity?: boolean;
  Sources?: string;
}

export interface CountrySummaryDataType {
  countryName: string;
  countryCode: string;
  region: string;
  incomeGroup: string;
  fragility: string;
  hdiGroup: string;
  ldc: boolean;
  sids: boolean;
  noOfPolicies: number;
  noOfGenderPolicies: number;
  noOfPoliciesAddressingVAWG: number;
  noOfPoliciesSupportingUnpaidCare: number;
  noOfPoliciesTargetingWomenEcoSecurity: number;
}
export interface CountryGreenLenseSummaryDataType {
  countryName: string;
  countryCode: string;
  region: string;
  incomeGroup: string;
  fragility: string;
  hdiGroup: string;
  ldc: boolean;
  sids: boolean;
  noOfPolicies: number;
  noOfGenderPolicies: number;
  noOfEnvironmetallyPositivePoliciesAddressingVAWG: number;
  noOfEnvironmetallyPositivePoliciesSupportingUnpaidCare: number;
  noOfEnvironmetallyPositivePoliciesTargetingWomenEcoSecurity: number;
  noOfPoliciesPositiveForEnvironment: number;
  noOfPoliciesGenderGreenNexus: number;
}

export interface CountryTFSummaryDataType {
  countryName: string;
  countryCode: string;
  region: string;
  noOfTF: number;
  incomeGroup: string;
  fragility: string;
  hdiGroup: string;
  ldc: boolean;
  sids: boolean;
  noOfTFWithWomenLeader: number;
  percentOfTFWithWomenLeader: number;
  noOfTFWithMajorityWomenOfGenderParity: number;
  noOfTFWithMembershipData: number;
  noOfTFWithLeadershipData: number;
  percentOfTFWithMajorityWomenOfGenderParity: number;
  percentOfTFMembersWomen: number;
  percentOfTFMembersWomenNA: boolean;
}

export interface CountryDataType {
  code: string;
  name: string;
}

export interface CtxDataType {
  selectedRegion: string;
  selectedIncomeGroup: string;
  selectedFragilityGroup: string;
  selectedHDI: string;
  selectedDevelopmentGroup: string;
  selectedPolicyMeasureCat: string;
  updateSelectedRegion: (_d: string) => void;
  updateSelectedIncomeGroup: (_d: string) => void;
  updateSelectedFragilityGroup: (_d: string) => void;
  updateSelectedHDI: (_d: string) => void;
  updateSelectedDevelopmentGroup: (_d: string) => void;
  updateSelectedPolicyMeasureCat: (_d: string) => void;
}

export interface CtxTFDataType {
  selectedRegion: string;
  selectedIncomeGroup: string;
  selectedFragilityGroup: string;
  selectedHDI: string;
  selectedDevelopmentGroup: string;
  updateSelectedRegion: (_d: string) => void;
  updateSelectedIncomeGroup: (_d: string) => void;
  updateSelectedFragilityGroup: (_d: string) => void;
  updateSelectedHDI: (_d: string) => void;
  updateSelectedDevelopmentGroup: (_d: string) => void;
}

export interface PromisingPoliciesDataType{
  'Measure ID 2': string;
  'Country code': string;
  'Flag link': string;
  Country: string;
  Region: string;
  Subregion: string;
  'Gender-sensitive dimension': 'Violence against women' | "Women's economic security" | 'Unpaid care work';
  'Policy measure category': string;
  'Policy measure type': string;
  'Policy measure sub-type': string;
  'Policy measure title': string;
  'Policy measure description': string;
  'Problem addressed': string;
  'Why promising': string;
  Who: string;
  Budget: string;
  'Potential challenges': string;
  'Further reading': string;
}

export interface CountryTaxonomyDataType {
  'Alpha-3 code-1':string;
  'Country or Area':string;
  'Alpha-2 code':string;
  'Numeric code':string;
  'Latitude (average)':string;
  'Longitude (average)':string;
  'Group 1':string;
  'Group 2':string;
  'Group 3':string;
  'LDC':boolean;
  'LLDC':boolean;
  'SIDS':boolean;
  'Development classification':string;
  'Income group':string;
}
