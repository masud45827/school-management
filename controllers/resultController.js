const dynamodb = require('../db/db');

exports.postResult = async (ctx) => {
    console.log('cumming')
    const { description } = ctx.req.body;
    const pdf = ctx.req.file.filename;
    const id = new Date().toISOString(); // Using ISO string for a unique ID

    const params = {
        TableName: 'result',
        Item: {
            id,
            description,
            pdf
        }
    };

    try {
        await dynamodb.put(params).promise();
        ctx.body = 'Successfully uploaded';
    } catch (error) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(error, null, 2));
        ctx.status = 500;
        ctx.body = { error: 'Could not upload the notice' };
    }
};

exports.getResult = async (ctx) => {
    const params = {
        TableName: 'result'
    };

    try {
        const data = await dynamodb.scan(params).promise();
        ctx.body = data;
    } catch (error) {
        console.error('Unable to scan the table. Error JSON:', JSON.stringify(error, null, 2));
        ctx.status = 500;
        ctx.body = { error: 'Could not fetch the notices' };
    }
};