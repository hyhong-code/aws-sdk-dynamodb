const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });
const dynamodb = new AWS.DynamoDB();

// LIST TABLES
// dynamodb.listTables({}, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// DESCRIBE TABLE
// dynamodb.describeTable(
//   {
//     TableName: "td_notes_sdk",
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(JSON.stringify(data, null, 2));
//     }
//   }
// );

// CREATE TABLE
dynamodb.createTable(
  {
    TableName: "td_notes_sdk",
    AttributeDefinitions: [
      { AttributeName: "user_id", AttributeType: "S" }, // S => String
      { AttributeName: "timestamp", AttributeType: "N" }, // N => Number
    ],
    KeySchema: [
      { AttributeName: "user_id", KeyType: "HASH" }, // HASH => Partition Key
      { AttributeName: "timestamp", KeyType: "RANGE" }, // RANGE => Sort Key
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
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

// UPDATE TABLE
// dynamodb.updateTable(
//   {
//     TableName: "td_notes_sdk",
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 2,
//       WriteCapacityUnits: 1, // Cannot omit WriteCapacityUnits while updating
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(JSON.stringify(data, null, 2));
//     }
//   }
// );

// DELETE TABLE
// dynamodb.deleteTable(
//   {
//     TableName: "td_notes_sdk",
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(JSON.stringify(data, null, 2));
//     }
//   }
// );
