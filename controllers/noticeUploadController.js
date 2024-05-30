const dynamodb = require('../db/db');
const Notice = require('../model/Notice')

exports.postNotice = async (ctx) => {
    console.log('cumming')
    const { description } = ctx.req.body;
    const pdf = ctx.req.file.filename;
    const id = new Date().toISOString();

    try {
        const data = await Notice.create({id,designation,pdf});
        ctx.body = 'Successfully uploaded';
    } catch (error) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(error, null, 2));
        ctx.status = 500;
        ctx.body = { error: 'Could not upload the notice' };
    }
};

exports.getNotice = async (ctx) => {
    try {
        const data = await Notice.get();
        ctx.body = data;
    } catch (error) {
        console.error('Unable to scan the table. Error JSON:', JSON.stringify(error, null, 2));
        ctx.status = 500;
        ctx.body = { error: 'Could not fetch the notices' };
    }
};