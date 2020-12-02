/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import Error from '../Error/Error';
import NewsFeedRow from './NewsFeedRow/NewsFeedRow';
import GeneralUtil from '../../utils/general';
import styles from './NewsFeed.css';

const columns = [
  {
    name: 'Date/Time',
    selector: 'datetime',
    sortable: true
  },
  {
    name: 'Event',
    selector: 'type',
    sortable: true,
    grow: 3,
    wrap: true,
    cell: row => (
      <div>
        <div style={{ fontWeight: 700, paddingBottom: '5px' }}>{row.type}</div>
        {row.description}
      </div>
    )
  }
];

const newsFeed = props => {
  const { feed, error } = props;
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(!props.feed && !props.error);
  }, [props.feed, props.error]);

  let contents = <div className={styles.empty}>There are no actions or notifications to show</div>;
  if (feed) {
    const data = feed.map(f => {
      return { ...f, datetime: GeneralUtil.formatDateTime(f.timestamp) };
    });
    contents = (
      <DataTable
        title="News Feed"
        columns={columns}
        data={data}
        striped
        progressPending={pending}
        expandableRows
        expandableRowsComponent={<NewsFeedRow />}
      />
    );
  } else if (error) {
    contents = <Error>There was an error loading the news feed: {error}</Error>;
  }
  return <div className={styles.container}>{contents}</div>;
};

newsFeed.propTypes = {
  project: PropTypes.object.isRequired,
  feed: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string
};

newsFeed.defaultProps = {
  feed: null,
  error: null
};

export default newsFeed;