import {
  PolicyDataWithCountryData, CountrySummaryDataType, TFDataType, CountryTFSummaryDataType,
} from '../Types';

export const GetFilteredData = (data: PolicyDataWithCountryData[], region: string, incomeGroup: string, fragility: string, hdi: string, ldc: string) => {
  const dataFilteredByRegion = region !== 'All' ? data.filter((d: PolicyDataWithCountryData) => d.Region === region) : data;
  const dataFilteredByIncome = incomeGroup !== 'All' ? dataFilteredByRegion.filter((d) => d.countryIncomeGroup === incomeGroup) : dataFilteredByRegion;
  const dataFilteredByFragility = fragility !== 'All' ? dataFilteredByIncome.filter((d) => d.fragility === fragility) : dataFilteredByIncome;
  const dataFilteredByHDI = hdi !== 'All' ? dataFilteredByFragility.filter((d) => d.hdiGroup === hdi) : dataFilteredByFragility;
  const dataFilteredByDev = ldc !== 'All' ? dataFilteredByHDI.filter((d) => d.ldc) : dataFilteredByHDI;
  return dataFilteredByDev;
};

export const GetFilteredCountrySummaryData = (data: CountrySummaryDataType[], region: string, incomeGroup: string, fragility: string, hdi: string, ldc: string) => {
  const dataFilteredByRegion = region !== 'All' ? data.filter((d: CountrySummaryDataType) => d.region === region) : data;
  const dataFilteredByIncome = incomeGroup !== 'All' ? dataFilteredByRegion.filter((d) => d.incomeGroup === incomeGroup) : dataFilteredByRegion;
  const dataFilteredByFragility = fragility !== 'All' ? dataFilteredByIncome.filter((d) => d.fragility === fragility) : dataFilteredByIncome;
  const dataFilteredByHDI = hdi !== 'All' ? dataFilteredByFragility.filter((d) => d.hdiGroup === hdi) : dataFilteredByFragility;
  const dataFilteredByDev = ldc !== 'All' ? dataFilteredByHDI.filter((d) => d.ldc) : dataFilteredByHDI;
  return dataFilteredByDev;
};

export const GetFilteredTFData = (data: TFDataType[], region: string, incomeGroup: string, fragility: string, hdi: string, ldc: string) => {
  const dataFilteredByRegion = region !== 'All' ? data.filter((d: TFDataType) => d['SDG Region'] === region) : data;
  const dataFilteredByIncome = incomeGroup !== 'All' ? dataFilteredByRegion.filter((d) => d.incomeGroup === incomeGroup) : dataFilteredByRegion;
  const dataFilteredByFragility = fragility !== 'All' ? dataFilteredByIncome.filter((d) => d.fragility === fragility) : dataFilteredByIncome;
  const dataFilteredByHDI = hdi !== 'All' ? dataFilteredByFragility.filter((d) => d.hdiGroup === hdi) : dataFilteredByFragility;
  const dataFilteredByDev = ldc !== 'All' ? dataFilteredByHDI.filter((d) => d.ldc) : dataFilteredByHDI;
  return dataFilteredByDev;
};

export const GetFilteredCountryTFSummaryData = (data: CountryTFSummaryDataType[], region: string, incomeGroup: string, fragility: string, hdi: string, ldc: string) => {
  const dataFilteredByRegion = region !== 'All' ? data.filter((d: CountryTFSummaryDataType) => d.region === region) : data;
  const dataFilteredByIncome = incomeGroup !== 'All' ? dataFilteredByRegion.filter((d) => d.incomeGroup === incomeGroup) : dataFilteredByRegion;
  const dataFilteredByFragility = fragility !== 'All' ? dataFilteredByIncome.filter((d) => d.fragility === fragility) : dataFilteredByIncome;
  const dataFilteredByHDI = hdi !== 'All' ? dataFilteredByFragility.filter((d) => d.hdiGroup === hdi) : dataFilteredByFragility;
  const dataFilteredByDev = ldc !== 'All' ? dataFilteredByHDI.filter((d) => d.ldc) : dataFilteredByHDI;
  return dataFilteredByDev;
};
