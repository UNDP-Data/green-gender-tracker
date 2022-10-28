import { createContext } from 'react';
import { CtxDataType } from '../../Types';

const Context = createContext<CtxDataType>({
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
