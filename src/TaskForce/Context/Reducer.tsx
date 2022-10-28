export default (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_REGION':
      return { ...state, selectedRegion: action.payload };
    case 'UPDATE_SELECTED_INCOME_GROUP':
      return { ...state, selectedIncomeGroup: action.payload };
    case 'UPDATE_SELECTED_FRAGILITY_GROUP':
      return { ...state, selectedFragilityGroup: action.payload };
    case 'UPDATE_SELECTED_HDI':
      return { ...state, selectedHDI: action.payload };
    case 'UPDATE_SELECTED_DEVELOPMENT_GROUP':
      return { ...state, selectedDevelopmentGroup: action.payload };
    default:
      return { ...state };
  }
};
