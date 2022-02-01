module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang fix by Jukie",
  description: "thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "Nhóm",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users}) {
  var name = (await Users.getData(event.senderID)).name 
 switch(handleReply.type) {
   case "reply": {
     var idad = global.config.ADMINBOT;
     for(let ad of idad) {
     api.sendMessage({body: "🐳𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ "+name+":\n"+event.body, mentions: [{
      id: event.senderID,
      tag: name}]},ad , (e, data) => global.client.handleReply.push({
      name: this.config.name,
      messageID: data.messageID,
      messID: event.messageID,
      author: event.senderID,
      id: event.threadID,
      type: "calladmin"}))
     }
   break;}
    case "calladmin": {
      api.sendMessage({ body: `🐸𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻 ${name} đ𝗲̂́𝗻 𝗯𝗮̣𝗻:\n--------\n🐳${event.body}\n--------\n💗»𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝗴𝘂̛̉𝗶 𝗯𝗮́𝗼 𝗰𝗮́𝗼 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻`, mentions: [{tag: name, id : event.senderID}]}, handleReply.id, (e, data) => global.client.handleReply.push({
  name: this.config.name,
  author: event.senderID,
  messageID: data.messageID,
  type: "reply"}), handleReply.messID);
   break;}
     
     }
  
  
};

module.exports.run = async function({ api, event,Threads, args, Users }) {
  if (!args[0])
    return api.sendMessage(
      "🖤𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗻𝗵𝗮̣̂𝗽 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗰𝗮̂̀𝗻 𝗯𝗮́𝗼 𝗰𝗮́𝗼🤍",
      event.threadID,
      event.messageID
    );
  //var data = await api.getUserInfo(event.senderID); 
  var name = (await Users.getData(event.senderID)).name;
  var idbox = event.threadID;
 // const url = (api.getCurrentUserID(event.senderID));

  var datathread = (await Threads.getData(event.threadID)).threadInfo;
  var namethread = datathread.threadName;

  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
  var soad = global.config.ADMINBOT.length;
  api.sendMessage(
    "🐳Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝗯𝗮́𝗼 𝗰𝗮́𝗼 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗲̂́𝗻 𝗰𝗮́𝗰 𝗮𝗱𝗺𝗶𝗻 𝗯𝗼𝘁💗",
    event.threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`🤍𝗕𝗮́𝗼 𝗰𝗮́𝗼 𝘁𝘂̛̀: ${name}\n🖤𝗕𝗼𝘅ox: ${namethread} \n💜𝗜𝗗 𝗕𝗼𝘅: ${idbox}\n----------------\n💗𝗟𝗼̂̃𝗶: ${args.join(
            " "
          )}\n≻────🐸────≺\n💚𝗧𝗶𝗺𝗲: ${gio}`,
          ad, (error, info) =>
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              messID: event.messageID,
              id: idbox,
              type: "calladmin"
            })
        );
    }
    }
  );
};