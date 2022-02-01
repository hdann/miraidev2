module.exports.config = {
    name: "taixiu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Chơi tài xỉu",
    commandCategory: "Giải trí",
    usages: "[tài/xỉu]",
    cooldowns: 5
};
module.exports.run = async function ({
    api,
    event,
    args,
    Currencies,
    Users
}) {
    const axios = global.nodemodule['axios'];
    const fs = global.nodemodule["fs-extra"];
    const dataMoney = await Currencies.getData(event.senderID);
    const moneyUser = dataMoney.money
    if (!args[0]) {
        return api.sendMessage("Bạn phải cược tài hoặc xỉu...", event.threadID, event.messageID)
    }
    const choose = args[0]
    if (choose != 'tài' && choose != 'xỉu') {
        api.sendMessage("Chỉ đặt cược tài hoặc xỉu!", event.threadID, event.messageID)
    }
    const money = args[1]
    if (money < 20 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 20$!!!", event.threadID, event.messageID);
    if (moneyUser < money) api.sendMessage(`Số dư bạn không đủ ${money}$ để có thể chơi`, event.threadID, event.messageID);
    else {
    try {
        const res = await axios.get(`https://api.leanhtruong.net/v2/taixiu.php?api_key=LEANHTRUONG=JbWVzfyuc7UFToBXRdc9ToTwv1Xd37T29EeuRYParkWNYlXh0B=APIKEY=PLANFREE&bet=t%C3%A0i`);
        var data = res.data;
        var ketqua = data.ketqua
        var ketquaGame = ketqua.slice(0, 3)
        if (choose == ketquaGame) {
            pathus = __dirname + `/cache/${event.senderID}.png`
            var img = (await axios.get(`${data.image}`, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(pathus, Buffer.from(img, "utf-8"));
            await Currencies.increaseMoney(event.senderID, parseInt(money * 2))
            return api.sendMessage({
                body: `📩Bạn đã thắng \n➡Được: ${money*2}$\n🔥Kết quả: ${ketqua.charAt(0).toUpperCase() + ketqua.slice(1)}❄`,
                attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.png`), event.messageID)
        } else {
            pathus = __dirname + `/cache/${event.senderID}.png`
            var img = (await axios.get(`${data.image}`, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(pathus, Buffer.from(img, "utf-8"));
            await Currencies.decreaseMoney(event.senderID, parseInt(money))
            return api.sendMessage({
                body: `🥺Bạn đã thua\n😏Mất: ${money}$\n↘Kết quả: ${ketqua.charAt(0).toUpperCase() + ketqua.slice(1)}✅`,
                attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.png`), event.messageID)
        }
    } catch {
        return api.sendMessage('Đã có lỗi xảy ra, vui lòng thử lại sau!!!', event.threadID, event.messageID);
    }
}
                               }