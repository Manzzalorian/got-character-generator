import { _generateAge, _generateStatus, _generateRole, _generateHistoric, _generateMotive, _generateObjetive, _generateVicio, _generateVirtue } from './../api/src/character';
import { APIGatewayProxyHandler, SQSHandler } from 'aws-lambda';
import * as uuid from 'uuid'
import { config, DynamoDB, SQS } from 'aws-sdk';
import { Promise } from "bluebird";
import { aws } from "./config";

config.setPromisesDependency(Promise);
config.update(aws);

const dynamoDb = new DynamoDB.DocumentClient();
const sqs = new SQS({ apiVersion: '2012-11-05' });
export const read: APIGatewayProxyHandler = async (event, _context) => {
  const ID = event.pathParameters.id;
  try {
    const paramsGet = {
      TableName: process.env.DYNAMODB_TABLE,
      //ProjectionExpression: "#ak, DADOS",
      KeyConditionExpression: "#ak = :ak",
      ExpressionAttributeNames: {
        "#ak": "id"
      },
      ExpressionAttributeValues: {
        ":ak": ID
      }
    };

    const result = await dynamoDb.query(paramsGet).promise();
    if (result.Count === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify("ID não encontrado", null, 2),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items[0], null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify("Erro interno", null, 2),
    };
  }

}

export const create: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event)
  const ID = uuid.v1();
  try {
    const data = JSON.parse(event.body)
    const URL = process.env.THE_QUEUE_URL;
    const params = {
      DelaySeconds: 5,
      MessageAttributes: {
        "creator": {
          DataType: "String",
          StringValue: "EoZ2v4XbNH6C4nKm018Xu1uUiLcpRs8L29mBJflC"
        },
        "id": {
          DataType: "String",
          StringValue: ID
        }
      },
      MessageBody: data.name,
      QueueUrl: URL
    };
    await sqs.sendMessage(params).promise();
    console.log("Success data SQS", data);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify("Erro ao criar o personagem", null, 2),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(ID, null, 2),
  };
}

export const generateChar: SQSHandler = async (event, _context) => {
  const name = event.Records[0].body;
  const id = event.Records[0].messageAttributes.id.stringValue;
  const creator = event.Records[0].messageAttributes.creator.stringValue;
  let params;
  try {
    params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: id,
        name: name,
        age: _generateAge(),
        status: _generateStatus(),
        role: _generateRole(),
        historic: _generateHistoric(),
        objetive: _generateObjetive(),
        virtue: _generateVirtue(),
        motive: _generateMotive(),
        vicio: _generateVicio(),
        creator: creator
      }
    }
    _context.succeed(await dynamoDb.put(params).promise());
  } catch (error) {
    _context.fail(error);
  }
}


