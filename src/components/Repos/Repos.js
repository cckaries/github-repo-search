import styles from './Repos.module.scss';
import ReposTable from './ReposTable/ReposTable';
import Search from '../shared/Search/Search';
import Select from '../shared/Select/Select';

const sortOptions = {
  stars: 'Stars',
  forks: 'Forks',
  'help-wanted-issues': 'Help-wanted issues',
  updated: 'Updated',
};

const orderOptions = {
  desc: 'DESC',
  asc: 'ASC',
};

let timer;

const debounce = (fn = () => {}, delayMs = 500) => {
  return (...args) => {
    if (!!timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), delayMs);
  };
};

const Repos = ({
  repos = [],
  reposCount = 0,
  isReposLoading = false,
  prevSearch = {},
  searchError = null,
  onGetSearchRepos = () => {},
}) => {
  const searchText = async q => {
    const processedQ = q.trim().toLowerCase();

    if (processedQ !== prevSearch.q) {
      await onGetSearchRepos({ q: processedQ, page: 1 });
    }
  };

  const changeSort = (sort = null) => {
    if (sort !== prevSearch.sort) {
      onGetSearchRepos({
        sort,
        order: !sort ? '' : prevSearch.order,
        page: 1,
      });
    }
  };

  const changeOrder = (order = null) => {
    if (!!prevSearch.sort && order !== prevSearch.order) {
      onGetSearchRepos({ order, page: 1 });
    }
  };

  const changePage = (page = null) => {
    if (page !== prevSearch.page) {
      onGetSearchRepos({ page });
    }
  };

  const scrollPage = e => {
    const { clientHeight, scrollHeight, scrollTop } = e.target;

    if (
      !!repos.length &&
      !searchError &&
      !isReposLoading &&
      clientHeight + scrollTop > scrollHeight - 5
    ) {
      changePage(prevSearch.page + 1);
    }
  };

  return (
    <div id="container" className={styles.Container}>
      <div className={styles.Top}>
        <div className={styles.Search}>
          <Search
            placeholder="Search..."
            onInput={e => {
              debounce(searchText)(e.target.value);
            }}
          />
          <Select
            name="sort"
            id="search-sort"
            value={prevSearch.sort}
            placeholder={'Sort by...'}
            options={sortOptions}
            onChange={e => changeSort(e.target.value)}
          />
          <Select
            name={'order'}
            id={'search-order'}
            value={prevSearch.order}
            options={orderOptions}
            isDefaultChecked={true}
            isDisabled={!prevSearch.sort}
            onChange={e => changeOrder(e.target.value)}
          />
        </div>
        <div className={styles.Count}>Total: {reposCount}</div>
      </div>
      {!!searchError && <div className={styles.Error}>{searchError}</div>}
      <div className={styles.Table}>
        <ReposTable repos={repos} prevSearch={prevSearch} isLoading={isReposLoading} onScroll={scrollPage} />
      </div>
    </div>
  );
};

export default Repos;
