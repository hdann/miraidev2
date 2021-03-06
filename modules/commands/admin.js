module.exports.config = {
    name: "admin",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Quแบฃn lรฝ admin bot",
    commandCategory: "config",
    usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '[Admin] โข ๐ซ๐๐๐ ๐บ๐ฬ๐๐ ๐ต๐๐ฬฬ๐๐ ๐ฏ๐๐ ๐ฉ๐๐ , ๐ฎ๐๐๐ ๐จ๐ซ๐ด๐ฐ๐ต ๐ฉ๐๐ โ\n%1',
        "notHavePermssion": '๐ธ๐๐๐ฬฬ๐ ๐ณ๐ฬฬ๐ ๐ฉ๐๐ฬ๐ ๐ฎ๐๐ฬฬ๐',
        "addedNewAdmin": '[Admin] โฤ๐ฬ ๐ป๐๐ฬ๐ %1 ๐ป๐๐ฬฬ๐๐ ๐ณ๐๐ ๐ต๐ฬ๐ ๐ณ๐ฬ๐ ๐จ๐ซ๐ด๐ฐ๐ต ๐ฉ๐๐\n\n%2',
        "removedAdmin": '[Admin] ๐ขฤ๐ฬ ฤ๐ฬ ฤ๐ฬ๐ %1 ๐ฎ๐๐ฬฬ ๐ด๐ฬ๐ ๐ป๐๐ฬฬ๐ ๐ณ๐๐ ๐ณ๐ฬ๐ ๐จ๐ซ๐ด๐ฐ๐ต ๐ฉ๐๐ ๐ผ\n\n%2',
        "botnotadd": "๐ฒ๐ป๐๐ ฤ๐ฬ๐๐ ๐ช๐ฬ ๐ธ๐๐๐ฬฬ๐ ๐ป๐๐ฬ๐ ๐ด๐ฬ๐ ๐ณ๐ฬ๐ ๐จ๐ซ๐ด๐ฐ๐ต ๐ฝ๐ฬฃฬ๐ ๐ต๐๐ฬ ๐ท๐ท"
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
                    msg.push(`๐ฉ ${dem}/ ${name} โข https://facebook.com/${idAdmin}`);
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
                    listAdd.push(`[ ${id} ] ยป ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[1]} ] ยป ${name}`), threadID, messageID);
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
                    listAdd.push(`[ ${id} ] ยป ${event.mentions[id]}`);
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
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] ยป ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}