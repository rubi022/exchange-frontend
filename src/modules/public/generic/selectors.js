export const selectCurrentScreenType = (state) => state.public.genericStates.currentScreenType;

export const selectCurrentTheme = (state) => state.public.genericStates.color;
export const selectCreateBeneficiary = (state) => state.public.genericStates.createBeneficiary.create;
export const selectCurrencyForBeneficiary = (state) => state.public.genericStates.createBeneficiary.currency;
export const selectMarketSelectorState = (state) =>
state.public.genericStates.marketSelectorActive;
export const selectWindowWidth = (state) => state.public.genericStates.windowWidth;
export const selectCallbackLink = (state) => state.public.genericStates.callbackLink;
export const selectSignInLastLink = (state) => state.public.genericStates.signInLastLink;
export const selectOrderScreenDisplay = (state) => state.public.genericStates.orderScreenDisplay;
