import React from 'react';

const Loader = ({ gone }) => {
  return (
    <div id="loader" className={gone ? 'gone' : ''}>
      <div className="bindu-ring"></div>
      <div className="word">Narratives Creative Lab</div>
      <div className="skt-line">कथा आरभ्यते — the story begins</div>
    </div>
  );
};

export default Loader;