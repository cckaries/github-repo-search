import { useSelector, useDispatch } from 'react-redux';

import Repos from '../components/Repos/Repos';
import { getSearchReposThunk, reposActions } from '../store/repos';

const ReposPage = () => {
  const dispatch = useDispatch();
  const { reposCount, prevSearch, searchError, isReposLoading } = useSelector(
    state => state.repos
  );

  return (
    <Repos
      reposCount={reposCount}
      prevSearch={prevSearch}
      searchError={searchError}
      isReposLoading={isReposLoading}
      onGetSearchRepos={payload => dispatch(getSearchReposThunk(payload))}
    />
  );
};

export default ReposPage;
