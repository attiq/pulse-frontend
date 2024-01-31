export const SET_LOADING = 'SET_LOADING';
export const SET_TAXONOMY_LOADING = 'SET_TAXONOMY_LOADING';
export const SET_SAVE_LOADING = 'SET_SAVE_LOADING';

export const setLoadingAction = (payload: boolean) => {
  return { type: SET_LOADING, payload };
};

export const setTaxonomyLoadingAction = (payload: boolean) => {
  return { type: SET_TAXONOMY_LOADING, payload };
};

export const setSaveLoadingAction = (payload: boolean) => {
  return { type: SET_SAVE_LOADING, payload };
};
