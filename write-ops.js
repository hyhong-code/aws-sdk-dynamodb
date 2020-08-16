const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

// PUT ITEM
docClient.put(
  {
    TableName: "td_notes_sdk",
    Item: {
      user_id: "sdfjsdfehhwkf",
      timestamp: 2,
      title: "My note(Changed)",
      content: "This is my note(Changed)",
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

// UPDATE ITEM
docClient.update(
  {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "sdfjsdfehhwkf",
      timestamp: 2,
    },
    UpdateExpression: "set #t = :t", // To avoid clash with reserved keyword
    ExpressionAttributeNames: {
      "#t": "title",
    },
    ExpressionAttributeValues: {
      ":t": "Updated title",
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

// DELETE ITEM
docClient.delete(
  {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "sdfjsdfehhwkf",
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

// BATCH WRITE
docClient.batchWrite(
  {
    RequestItems: {
      td_notes_sdk: [
        {
          DeleteRequest: {
            Key: {
              user_id: "sdfjsdfehhwkf",
              timestamp: 2,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "userid111",
              timestamp: 1,
              title: "My note",
              content: "This is my note",
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "userid111",
              timestamp: 2,
              title: "My note2",
              content: "This is my note2",
            },
          },
        },
      ],
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
