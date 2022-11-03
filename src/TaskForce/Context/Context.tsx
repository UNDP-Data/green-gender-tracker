import { createContext } from 'react';
import { CtxTFDataType } from '../../Types';

const Context = createContext<CtxTFDataType>({
  selectedRegion: 'All',
  selectedIncomeGroup: 'All',
  selectedFragilityGroup: 'All',
  selectedHDI: 'All',
  selectedDevelopmentGroup: 'All',
  updateSelectedRegion: (_d: string) => {},
  updateSelectedIncomeGroup: (_d: string) => {},
  updateSelectedFragilityGroup: (_d: string) => {},
  updateSelectedHDI: (_d: string) => {},
  updateSelectedDevelopmentGroup: (_d: string) => {},
});

export default Context;
