const async = require("async");
const _ = require("underscore");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

let startKey = []; // To store key of last returned doc
let results = [];
let pages = 0;
async.doWhilst(
  //iteratee
  (callback) => {
    const params = {
      TableName: "td_notes_sdk",
      Limit: 3,
    };

    // Start returning documents from last returned document on
    if (!_.isEmpty(startKey)) {
      params.ExclusiveStartKey = startKey;
    }

    docClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(err, {});
      } else {
        // If has not reached to the end, store last document returned
        if (typeof data.LastEvaluatedKey !== "undefined") {
          startKey = data.LastEvaluatedKey;
        } else {
          startKey = [];
        }

        // If there are documents returned
        if (!_.isEmpty(data.Items)) {
          results = _.union(results, data.Items); // Join two arrays
        }

        pages++;
        callback(null, results);
      }
    });
  },

  // truth test, will run iteratee as long as returning true
  (results, callback) => {
    if (_.isEmpty(startKey)) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  },

  // callback, called when done
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log("Item Count", data.length);
      console.log("Pages", pages);
    }
  }
);
