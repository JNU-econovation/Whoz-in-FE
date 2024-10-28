import React from 'react';
import ReactDOM from 'react-dom';
import MemberStatusList from '../components/MemberStatusList';
import members from '../data/sampleData'

function Main() {
  return (
    <div>
      <MemberStatusList members={members} />
    </div>
  );
};

export default Main;