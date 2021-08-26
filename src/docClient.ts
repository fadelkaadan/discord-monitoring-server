import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-central-1",
  accessKeyId: "AKIARWWTAELR557ABMCO",
  secretAccessKey: "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",
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
