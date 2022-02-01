module.exports.config = {
    name: "admin",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Quản lý admin bot",
    commandCategory: "config",
    usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '[Admin] ➢ 𝑫𝒂𝒏𝒉 𝑺𝒂́𝒄𝒉 𝑵𝒉𝒖̛̃𝒏𝒈 𝑯𝒐𝒕 𝑩𝒐𝒚 , 𝑮𝒊𝒓𝒍 𝑨𝑫𝑴𝑰𝑵 𝑩𝒐𝒕 ✘\n%1',
        "notHavePermssion": '𝑸𝒖𝒚𝒆̂̀𝒏 𝑳𝒐̂̀𝒏 𝑩𝒊𝒆̂𝒏 𝑮𝒊𝒐̛́𝒊',
        "addedNewAdmin": '[Admin] ✅Đ𝒂̃ 𝑻𝒉𝒆̂𝒎 %1 𝑻𝒉𝒂̆̀𝒏𝒈 𝑳𝒐𝒏 𝑵𝒂̀𝒚 𝑳𝒂̀𝒎 𝑨𝑫𝑴𝑰𝑵 𝑩𝒐𝒕\n\n%2',
        "removedAdmin": '[Admin] 📢Đ𝒂̃ Đ𝒂́ Đ𝒊́𝒕 %1 𝑮𝒊𝒐̛̀ 𝑴𝒂̀𝒚 𝑻𝒖𝒐̂̉𝒊 𝑳𝒐𝒏 𝑳𝒂̀𝒎 𝑨𝑫𝑴𝑰𝑵 𝑩𝒐𝒕 😼\n\n%2',
        "botnotadd": "📲𝑻𝒂𝒐 Đ𝒆́𝒍𝒍 𝑪𝒐́ 𝑸𝒖𝒚𝒆̂̀𝒏 𝑻𝒉𝒆̂𝒎 𝑴𝒂̀𝒚 𝑳𝒂̀𝒎 𝑨𝑫𝑴𝑰𝑵 𝑽𝒂̣̂𝒚 𝑵𝒉𝒆́ 𝑷𝑷"
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2',
        "botnotadd": "The bot does not have permission to add moderators."
    }
}

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions, senderID } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);

    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];
            var dem = 0;
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    dem += 1;
                    const name = await Users.getNameUser(idAdmin);
                    msg.push(`📩 ${dem}/ ${name} ➢ https://facebook.com/${idAdmin}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }

        case "add": {
            var idbot = api.getCurrentUserID();
            if (senderID == idbot) return api.sendMessage(getText("botnotadd"), threadID, messageID);
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[1]} ] » ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}