import React from 'react';

const Entry = ({ entry }) => {
  return (
    <div className="entry">
      <span>
        {entry.name}
      </span>
      {entry?.profile && entry.profile.length > 0 && (
        <div className="branch">
          {entry.profile.map((child, index) => (
            <div key={index} className="entry">
              <span>
                {child.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Entry;
