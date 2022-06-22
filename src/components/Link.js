import React from 'react';

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.question} {link.answer}
      </div>
    </div>
  );
};

export default Link;