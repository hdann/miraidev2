module.exports.config = {
    name: "xinmodule",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "Bùi Lê Bảo Luân",//Vui lòng không thay credit nếu không muốn làm súc sinh
    description: "Van xin ai đó cho mình 1 mdl :))",
    commandCategory: "group",
    usages: "xinmodule @mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn xin module", event.threadID);
 let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("Bắt đầu xin, nhớ trả phí cho tao nha !");
setTimeout(() => {a({body: "Chào procoder " + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "Cho mình làm quen với nha idol" + " " + name, mentions: arraytag})}, 5000);
setTimeout(() => {a({body: "Nhưng mà mình không thích dài dòng nên mình nói thẳng luôn nha " + " " + name, mentions: arraytag})}, 7000);
setTimeout(() => {a({body: "Chuyện là mình muốn xin bro 1 cái mdl á " + " " + name, mentions: arraytag})}, 9000);
setTimeout(() => {a({body: "Được không bro?" + " " + name, mentions: arraytag})}, 12000);
setTimeout(() => {a({body: "Cậu có thể cho mình xin được không " + " " + name, mentions: arraytag})}, 15000);
setTimeout(() => {a({body: "Nhaaaaaaa " + " " + name, mentions: arraytag})}, 17000);
setTimeout(() => {a({body: "Yêu bạn nhiều lắm UwU " + " " + name, mentions: arraytag})}, 20000);
setTimeout(() => {a({body: "Cho mình xin mdl nháaa" + " " + name, mentions: arraytag})}, 23000);
setTimeout(() => {a({body: "Nha bro" + " " + name, mentions: arraytag})}, 25000);
setTimeout(() => {a({body: "Yêu bro nhiều lắm" + " " + name, mentions: arraytag})}, 28500);
setTimeout(() => {a({body: "Nha nha nha nha nha" + " " + name, mentions: arraytag})}, 31000);
setTimeout(() => {a({body: "Nhaaa :<" + " " + name, mentions: arraytag})}, 36000);
setTimeout(() => {a({body: "I love" + " " + name, mentions: arraytag})}, 39000);
setTimeout(() => {a({body: "Đợi mình nghỉ xíu, năn nỉ bạn mệt quá à" + " " + name, mentions: arraytag})}, 40000);
setTimeout(() => {a({body: "Hì hộc hì hộc" + " " + name, mentions: arraytag})}, 65000);
setTimeout(() => {a({body: "Khỏe rồi nè" + " " + name, mentions: arraytag})}, 70000);
setTimeout(() => {a({body: "Rồi giờ bạn có cho mình xin không hả" + " " + name, mentions: arraytag})}, 75000);
setTimeout(() => {a({body: "Cho hay không cho, không cho hay cho, nói 1 lời điiiiiiiiii" + " " + name, mentions: arraytag})}, 80000);
setTimeout(() => {a({body: "Đừng làm mình quạo nhaaaaa" + " " + name, mentions: arraytag})}, 85000);
setTimeout(() => {a("ăn ban đó")} , 90000);
setTimeout(() => {a({body: "Vẫn không cho à" + " " + name, mentions: arraytag})}, 95000);
setTimeout(() => {a({body: "Quạo òi nha" + " " + name, mentions: arraytag})}, 100000);
setTimeout(() => {a({body: "Không cho thì biến" + " " + name, mentions: arraytag})}, 105000);
setTimeout(() => {a("ĐỒ KI BO !")} , 110000);


  
  }