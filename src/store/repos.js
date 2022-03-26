import { createSlice } from '@reduxjs/toolkit';

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    repos: [],
    reposCount: 0,
    isReposLoading: false,
    prevSearch: {
      q: '',
      sort: '',
      order: '',
      page: 1,
    },
    searchError: null,
  },
  reducers: {
    setIsReposLoading(state, action) {
      state.isReposLoading = action.payload;
    },
    setRepos(state, action) {
      state.repos =
        state.prevSearch.page > 1
          ? [...state.repos, ...action.payload.items]
          : action.payload.items || [];
      state.reposCount = action.payload?.total_count || 0;
    },
    setPrevSearch(state, action) {
      state.prevSearch = { ...state.prevSearch, ...action.payload };
    },
    setSearchError(state, action) {
      state.searchError = action.payload;
    },
  },
});

export const getSearchReposThunk = (payload = {}) => {
  return async (dispatch, getState) => {
    dispatch(reposActions.setIsReposLoading(true));
    const { repos } = getState();
    const getSearchRepos = async () => {
      const params = {
        ...repos.prevSearch,
        ...payload,
      };

      if (!params.q) {
        return {};
      }

      const res = await fetch(
        'https://api.github.com/search/repositories?' +
          new URLSearchParams(params)
      );

      if (res.status > 400) {
        switch (res.status) {
          case 422:
            throw Error('Error: Validation failed');
          case 503:
            throw Error('Error: Service unavilable');
          default:
            throw Error(`Error: ${res.message || res.status || 'unknown'}`);
        }
      } else {
        switch (res.status) {
          case 304:
            return;
          default:
            return res.json();
        }
      }
    };

    try {
      const resJson = await getSearchRepos();
      dispatch(reposActions.setPrevSearch(payload));
      dispatch(reposActions.setSearchError(null));
      if (!!resJson) {
        dispatch(reposActions.setRepos(resJson));
      }
    } catch (err) {
      dispatch(reposActions.setSearchError(err.message));
    } finally {
      dispatch(reposActions.setIsReposLoading(false));
    }
  };
};

export const reposActions = reposSlice.actions;
export default reposSlice.reducer;
