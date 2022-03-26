import { useEffect, useReducer } from 'react';

import styles from './Repos.module.scss';
import ReposTable from './ReposTable/ReposTable';
import Search from '../shared/Search/Search';

const specialCharsRegex = /[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_\s]/g;
let timer;

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

const Repos = ({
  repos = [],
  isReposReady = false,
  onGetSearchRepos = () => {},
}) => {
  const [
    { prevSearchText, prevSearchSort, prevSearchOrder, prevSearchPage },
    setState,
  ] = useReducer((prevState, nextState) => ({ ...prevState, ...nextState }), {
    prevSearchText: '',
    prevSearchSort: '',
    prevSearchOrder: '',
    prevSearchPage: 1,
  });

  const debounce = (fn = () => {}, delayMs = 500) => {
    return (...args) => {
      if (!!timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => fn(...args), delayMs);
    };
  };

  const processString = (text = '') => {
    return text.replace(specialCharsRegex, '').toLowerCase();
  };

  const searchText = async text => {
    const processedKeyword = processString(text);

    if (processedKeyword !== prevSearchText) {
      const res = await onGetSearchRepos({
        text: processedKeyword,
        sort: prevSearchSort,
        order: prevSearchOrder,
        page: 1,
      });

      if (res) {
        setState({ prevSearchText: processedKeyword });
      }
    }
  };

  const changeSort = async (sort = null) => {
    if (sort !== prevSearchSort) {
      const res = await onGetSearchRepos({
        text: prevSearchText,
        sort,
        order: prevSearchOrder,
        page: 1,
      });

      // if (res) {
      setState({
        prevSearchSort: sort,
        prevSearchOrder: !sort ? '' : prevSearchOrder,
      });
      // }
    }
  };

  const changeOrder = async (order = null) => {
    if (order !== prevSearchOrder) {
      const res = await onGetSearchRepos({
        text: prevSearchText,
        sort: prevSearchSort,
        order,
        page: 1,
      });

      // if (res) {
      setState({ prevSearchOrder: order });
      // }
    }
  };
  const changePage = async (page = null) => {
    if (page !== prevSearchPage) {
      const res = await onGetSearchRepos({
        text: prevSearchText,
        sort: prevSearchSort,
        order: prevSearchOrder,
        page,
      });

      if (res) {
        setState({ prevSearchPage: page });
      }
    }
  };

  const scrollPage = e => {
    console.log(
      'scroll',
      e.target.clientHeight,
      e.target.scrollHeight,
      e.target.scrollTop
    );
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', scrollPage);

  //   return () => {
  //     window.removeEventListener('scroll', scrollPage);
  //   };
  // }, []);

  const selectDom = ({
    name = null,
    id = null,
    value = '',
    options = {},
    isDefaultChecked = false,
    isDisabled = false,
    onChange = () => {},
  }) => (
    <select
      name={name}
      id={id}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
    >
      {!isDefaultChecked && <option value="">Select...</option>}
      {Object.keys(options).map((optionKey, optionIdx) => (
        <option
          key={optionIdx}
          value={optionKey}
          checked={optionKey === value}
          defaultChecked={isDefaultChecked && !optionIdx}
        >
          {options[optionKey]}
        </option>
      ))}
    </select>
  );

  return (
    <div id="container" className={styles.Container}>
      <div className={styles.Top}>
        <Search
          placeholder="Search..."
          onInput={e => {
            debounce(searchText)(e.target.value);
          }}
        />
        {selectDom({
          name: 'sort',
          id: 'search-sort',
          value: prevSearchSort,
          options: sortOptions,
          onChange: e => changeSort(e.target.value),
        })}
        {selectDom({
          name: 'order',
          id: 'search-order',
          value: prevSearchOrder,
          options: orderOptions,
          isDefaultChecked: true,
          isDisabled: !prevSearchSort,
          onChange: e => changeOrder(e.target.value),
        })}
      </div>
      <div className={styles.Table} onScroll={scrollPage}>
        <ReposTable isLoading={!isReposReady} repos={repos} />
      </div>
    </div>
  );
};

export default Repos;
