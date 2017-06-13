/**
 * Mitsift Sift. DAG's 'Parse' node implementation
 */
'use strict';

// Javascript nodes are run in a Node.js sandbox so you can require dependencies following the node paradigm
// e.g. var moment = require('moment');

// Entry point for DAG node
module.exports = function(got) {
  // inData contains the key/value pairs that match the given query
  const inData = got['in'];

  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  console.log('mitsift: parse.js: running...');

  let results = [];
  inData.data.map(function(datum) {
    console.log('MSGID: ', datum.key);
    // Parse the JMAP information for each message more info here https://docs.redsift.com/docs/server-code-jmap
    const jmapInfo = JSON.parse(datum.value);
    let date = new Date(jmapInfo.date)
    //
    //
    console.log("DETAILS: ", jmapInfo)
    // Not all emails contain a textBody so we do a cascade selection
    let recipients = jmapInfo.to;
    if (!recipients) {
      recipients = ["Unknown@mail.com"];
    }
    recipients.forEach(r => {
      const body = jmapInfo.textBody || jmapInfo.strippedHtmlBody || '';
      let summary = {
        MessageID: jmapInfo.id,
        SenderEmail: jmapInfo.from.email,
        RecieverEmail: r,
        Year: date.getFullYear(),
        Month: date.getMonth(),
        Day: date.getDate(),
        DayName: days[date.getDay()],
        Hour: date.getHours(),
        has_FERC: 0,
        has_Affair: 0,
        has_Devastating: 0,
        has_Investigation: 0,
        has_Disclosure: 0,
        has_Bonus: 0,
        has_Meeting: 0,
        has_Plan: 0,
        has_Services: 0,
        has_Report: 0,
        email_Value: 1
      }
      // Emit into "messages" stores so count can be calculated by the "Count" node
      results.push({
        name: 'messageSummarys',
        key: jmapInfo.id,
        value: summary
      });
    })

  });

  // Possible return values are: undefined, null, promises, single or an array of objects
  // return objects should have the following structure
  // {
  //   name: '<name of node output>',
  //   key: 'key1',
  //   value: '1'
  // };
  return results;
};

/**
 * Simple function to count number of words in a string
 */
function countWords(body) {
  let s = body.replace(/\n/gi, ' ');
  s = s.replace(/(^\s*)|(\s*$)/gi, '');
  s = s.replace(/[ ]{2,}/gi, '');
  return s.split(' ').length;
}
