console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = async (event) => {
    data = event.data;

    console.log('Received event:', data);

    const operation = data["operation"];
    const payload = data["payload"];

    if (event.tableName) {
        payload.TableName = data["tableName"];
    }

    switch (operation) {
        case 'create':
            return await dynamo.putItem(payload).promise();
        case 'read':
            return await dynamo.getItem(payload).promise();
        case 'update':
            return await dynamo.updateItem(payload).promise();
        case 'delete':
            return await dynamo.deleteItem(payload).promise();
        case 'list':
            return await dynamo.scan(payload).promise();
        case 'echo':
            return payload;
        case 'ping':
            return 'pong';
        default:
            throw new Error(`Unrecognized operation "${operation}"`);
    }
};