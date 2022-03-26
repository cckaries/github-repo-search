import { useEffect, useReducer } from 'react';

import styles from './ReposTable.module.scss';
import Table from '../../shared/Table/Table';
import Thead from '../../shared/Table/Thead/Thead';
import Tbody from '../../shared/Table/Tbody/Tbody';
import Tr from '../../shared/Table/Tr/Tr';
import Th from '../../shared/Table/Th/Th';
import Td from '../../shared/Table/Td/Td';

const ReposTable = ({ repos = [], isReposReady = false }) => {
  const messageDom = (
    <p className={styles.Message}>
      {!isReposReady ? 'Loading...' : 'No results'}
    </p>
  );

  const reposDom = repos.map(repo => (
    <Tr
      key={repo.id}
      isClickable
      onClick={() => window.open(repo.html_url, '_blank')}
    >
      <Td customClass={styles.Cell}>{repo.full_name}</Td>
      <Td customClass={styles.Cell}>{repo.description}</Td>
      <Td customClass={styles.Cell}>{repo.language}</Td>
    </Tr>
  ));

  return (
    <div className={styles.Container}>
      {!repos.length ? (
        messageDom
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th customClass={styles.Cell}>Repo Name</Th>
              <Th customClass={styles.Cell}>Description</Th>
              <Th customClass={styles.Cell}>Language</Th>
            </Tr>
          </Thead>
          <Tbody>{reposDom}</Tbody>
        </Table>
      )}
    </div>
  );
};

export default ReposTable;
