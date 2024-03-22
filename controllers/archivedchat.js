const Message = require('../models/message');
const ArchivedChat = require('../models/archivedchat');

var cron = require('node-cron');
exports.job = cron.schedule(
	'2 4 * * * *', // cronTime
	async function () {
        // const messages=await Message.findAll();
        // for(let message of messages){
        //     const date=new Date(message.createdAt);
        //     const currentdate=new Date();
        //     if(currentdate.getMinutes()-date.getMinutes()==1){
        //         await Message.destroy({where:{id:message.id}});
        //         await ArchivedChat.create({
        //             username:message.username,
        //             message:message.message,
        //             file:message.file,
        //             userId:message.userId,
        //             groupId:message.groupId,
        //             fileurl:message.fileurl
        //         })
        //     }
        // }

        console.log('jjjj')
       
	}, // onTick
	null, // onComplete
	true, // start
	'IST' // timeZone
);
