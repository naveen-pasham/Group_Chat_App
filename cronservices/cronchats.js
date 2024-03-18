const Message = require('../models/message');
const ArchivedChat = require('../models/archivedchat');

import { CronJob } from 'cron';

const job = new CronJob(
	'* * * * * *', // cronTime
	async function () {
        const messages=await Message.findAll();
        for(let message of messages){
            const date=new Date(message.createdAt);
            const currentdate=new Date();
            if(date.getHours()-currentdate.getHours()==24){
                await Message.destroy({where:{id:message.id}});
                await ArchivedChat.create({
                    username:message.username,
                    message:message.message,
                    file:message.file,
                    userId:message.userId,
                    groupId:message.groupId
                })
            }
        }
       
	}, // onTick
	null, // onComplete
	true, // start
	'IST' // timeZone
);
