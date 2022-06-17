import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  {
  feed {
      id
      description
      url
  }
}
`;

const LinkList = () => {
  const {data} = useQuery(FEED_QUERY);
  return (
    <div>
      {data.feed.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;