/**
 * Mitsift Sift. DAG's 'Count' node implementation
 */
'use strict';

// Entry point for DAG node
module.exports = function (got) {
  const inData = got.in;
  let emailStats = [];

  try{
    emailStats = inData.data.map(d => JSON.parse(d.value));
  }catch(e){
    console.error('mitsift: count.js: something went wrong with input:', e);
  }

  console.log('mitsift: count.js: running...');
  let words = emailStats
    .map(d => d.words)
    .reduce((p, c) => p + c, 0);

  return [
    { name: 'messageData', key: 'MESSAGES', value: emailStats }
  ];
};
