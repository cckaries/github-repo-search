import { useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, parseISO } from 'date-fns';

import styles from './ReposTable.module.scss';
import Table from '../../shared/Table/Table';
import Thead from '../../shared/Table/Thead/Thead';
import Tbody from '../../shared/Table/Tbody/Tbody';
import Tr from '../../shared/Table/Tr/Tr';
import Th from '../../shared/Table/Th/Th';
import Td from '../../shared/Table/Td/Td';

const ReposTable = memo(
  ({ updatedAt = null, onScroll = () => {} }) => {
    const { repos, isReposLoading } = useSelector(state => state.repos);
    const tbodyRef = useRef(null);

    useEffect(() => {
      if (!!updatedAt) {
        tbodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [updatedAt]);

    const loadingDom = (
      <Tr customClass={styles.Loading}>
        <td>Loading...</td>
      </Tr>
    );

    const reposDom = repos.map((repo, repoIdx) => (
      <Tr
        key={repoIdx}
        isClickable
        isAnimationActive
        onClick={() => window.open(repo.html_url, '_blank')}
      >
        <Td customClass={styles.Cell}>{repo.full_name}</Td>
        <Td customClass={styles.Cell}>{repo.description}</Td>
        <Td customClass={styles.Cell}>{repo.language}</Td>
        <Td customClass={styles.Cell}>
          {format(parseISO(repo.updated_at), 'MMM. d, yyyy')}
        </Td>
        <Td customClass={styles.Cell}>{repo.stargazers_count}</Td>
        <Td customClass={styles.Cell}>{repo.forks}</Td>
      </Tr>
    ));

    return (
      <div className={styles.Container}>
        <Table>
          <Thead>
            <Tr>
              <Th customClass={styles.Cell}>Name</Th>
              <Th customClass={styles.Cell}>Description</Th>
              <Th customClass={styles.Cell}>Language</Th>
              <Th customClass={styles.Cell}>Updated At</Th>
              <Th customClass={styles.Cell}>
                <FontAwesomeIcon icon="fa-solid fa-star" />
              </Th>
              <Th customClass={styles.Cell}>
                <FontAwesomeIcon icon="fa-solid fa-code-fork" />
              </Th>
            </Tr>
          </Thead>
          <Tbody ref={tbodyRef} onScroll={onScroll}>
            {reposDom}
            {isReposLoading && loadingDom}
          </Tbody>
        </Table>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.updatedAt === nextProps.updatedAt
);

export default ReposTable;
