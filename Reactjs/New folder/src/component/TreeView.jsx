import React from 'react';
import Entry from './Entry';

const TreeView = ({ data }) => {
  return (
    <div id="tree">
      <div className="branch">
        {data?.map((entry, index) => (
          <Entry key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
