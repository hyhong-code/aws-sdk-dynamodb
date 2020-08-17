const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

// GET SINGLE ITEM (Partition key + sort key)
docClient.get(
  {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "userid111",
      timestamp: 1,
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);

// QUERY ITEMS (Partition key + sort key condition)
docClient.query(
  {
    TableName: "td_notes_sdk",
    KeyConditionExpression: "user_id = :uid and #timestamp > :timestamp",
    ExpressionAttributeNames: {
      "#timestamp": "timestamp",
    },
    ExpressionAttributeValues: {
      ":uid": "userid111",
      ":timestamp": 1,
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);

// SCAN (across partitions)
docClient.scan(
  {
    TableName: "td_notes_sdk",
    FilterExpression: "user_id = :user",
    ExpressionAttributeValues: {
      ":user": "userid111",
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);

// BATCH GET (across tables)
docClient.batchGet(
  {
    RequestItems: {
      td_notes_sdk: {
        Keys: [
          {
            user_id: "userid111",
            timestamp: 1,
          },
          {
            user_id: "userid111",
            timestamp: 2,
          },
        ],
      },
      td_notes: {
        Keys: [
          {
            user_id: "skdfueckefe",
            timestamp: 1597615675,
          },
        ],
      },
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);
