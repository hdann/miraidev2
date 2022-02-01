 /*
* @Module made by DuyVuong
* @No edit credits
* @Ban user edit credits
*/
module.exports.config = {
    name: "baugai",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "DuyVuong",
    description: "Game bầu cua có đặt cược </> Coder by DuyVuong",
    commandCategory: "economy",
    usages: "<[tlinh/danh/ngoc/anh/dieu/thao] hoặc[🐓/🦞/🍐/🦀/🐟/🦌]> <Số tiền cược (lưu ý phải trên 50$)>",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, event, args, Currencies, getText, permssion }) {
    try {
      const { threadID, messageID, senderID } = event;
      const { getData, increaseMoney, decreaseMoney } = Currencies;
      const request = require('request');
      const axios = require('axios');
      if (this.config.credits != 'DuyVuong') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))');
        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      }
      const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
      const slotItems = ["tlinh", "danh", "ngoc", "thao", "dieu", "anh"];
      const money = (await getData(senderID)).money;
      if (isNaN(args[1]) == true) return api.sendMessage('Nội dung "Số tiền cược" mà bạn nhập không phải 1 con số hợp lệ!', threadID, messageID);
      var moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 50) return api.sendMessage('Số tiền đặt cược không được dưới 50$', threadID, messageID);
      if (moneyBet > money) return api.sendMessage('Tài khoản của bạn không đủ tiền để chơi ban nha di.', threadID, messageID);
      var number = [], list = [], listimg = [], win = false;
      var baugai1 = slotItems[Math.floor(Math.random() * slotItems.length)];
      var baugai2 = slotItems[Math.floor(Math.random() * slotItems.length)];
      var baugai3 = slotItems[Math.floor(Math.random() * slotItems.length)];
      // ARGS
      let content = args[0];
      var content1;
      if (content == 'anh' || content == '💕') {
        content1 = 'anh';
      }
      else if (content == 'ngoc' || content == '❣️') {
        content1 = 'ngoc';
      }
      else if (content == 'tlinh' || content == '🦋') {
        content1 == 'tlinh';
      }
      else if (content == 'danh' || content == '💗') {
        content1 = 'danh';
      }
      else if (content == 'thao' || content == '🖤') {
        content1 = 'thao';
      }
      else if (content == 'dieu' || content == '💕') {
        content1 = 'dieu';
      }
      else {
        return api.sendMessage(`Sai định dạng\n${global.config.PREFIX}${this.config.name} <[gà/tôm/bầu/cua/cá/nai] hoặc[💕/❣️/🦋/💗/🖤/💕]> <Số tiền cược (lưu ý phải trên 50$)>`, threadID, messageID);
      }
      // request
      if (!existsSync(__dirname + '/cache/tlinh.jpg')) {
        request('https://i.imgur.com/lqVSFSi.jpg').pipe(createWriteStream(__dirname + '/cache/tlinh.jpg'));
      }
      if (!existsSync(__dirname + '/cache/danh.jpg')) {
        request('https://i.imgur.com/Maw3xlB.jpg').pipe(createWriteStream(__dirname + '/cache/danh.jpg'));
      }
      if (!existsSync(__dirname + '/cache/ngoc.jpg')) {
        request('https://i.imgur.com/m5I7bMw.jpg').pipe(createWriteStream(__dirname + '/cache/ngoc.jpg'));
      }
      if (!existsSync(__dirname + '/cache/thao.jpg')) {
        request('https://i.imgur.com/dZ3lwyV.jpg').pipe(createWriteStream(__dirname + '/cache/dieu.jpg'));
      }
      if (!existsSync(__dirname + '/cache/anh.jpg')) {
        request('https://i.imgur.com/GrkpDYt.jpg').pipe(createWriteStream(__dirname + '/cache/anh.jpg'));
      }
      if (!existsSync(__dirname + '/cache/thao.jpg')) {
        request('https://i.imgur.com/yOrp8Pz.jpg').pipe(createWriteStream(__dirname + '/cache/thao.jpg'));
      }
      if (!existsSync(__dirname + '/cache/baugai.gif')) {
        request('https://i.imgur.com/BZ211jO.gif').pipe(createWriteStream(__dirname + '/cache/baugai.gif'));
      }
      // baugai 1
      if (baugai1 == 'tlinh') {
        var bau1 = 'tlinh';
        var bau_1 = __dirname + '/cache/tlinh.jpg';
      }
      else if (baucua1 == 'danh') {
        var bau1 = 'danh';
        var bau_1 = __dirname + '/cache/danh.jpg';
      }
      else if (baugai1 == '') {
        var bau1 = 'ngoc';
        var bau_1 = __dirname + '/cache/ngoc.jpg';
      }
      else if (baugai1 == 'anh') {
        var bau1 = 'anh';
        var bau_1 = __dirname + '/cache/anh.jpg';
      }
      else if (baugai1 == 'dieu') {
        var bau1 = 'dieu';
        var bau_1 = __dirname + '/cache/dieu.jpg';
      }
      else if (baugai1 == 'thao') {
        var bau1 = 'thao';
        var bau_1 = __dirname + '/cache/thao.jpg';
      }
      // baugai 2
      if (baugai2 == 'tlinh') {
        var bau2 = 'tlinh';
        var bau_2 = __dirname + '/cache/tlinh.jpg';
      }
      else if (baugai2 == 'danh') {
        var bau2 = 'danh';
        var bau_2 = __dirname + '/cache/danh.jpg';
      }
      else if (baugai2 == 'ngoc') {
        var bau2 = 'ngoc';
        var bau_2 = __dirname + '/cache/ngoc.jpg';
      }
      else if (baugai2 == 'anh') {
        var bau2 = 'anh';
        var bau_2 = __dirname + '/cache/anh.jpg';
      }
      else if (baugai2 == 'dieu') {
        var bau2 = 'dieu';
        var bau_2 = __dirname + '/cache/dieu.jpg';
      }
      else if (baugai2 == 'thao') {
        var bau2 = 'thao';
        var bau_2 = __dirname + '/cache/thao.jpg';
      }
      // baugai 3
      if (baucua3 == 'tlinh') {
        var bau3 = 'tlinh';
        var bau_3 = __dirname + '/cache/tlinh.jpg';
      }
      else if (baugai3 == 'danh') {
        var bau3 = 'danh';
        var bau_3 = __dirname + '/cache/danh.jpg';
      }
      else if (baugai3 == 'ngoc') {
        var bau3 = 'ngoc';
        var bau_3 = __dirname + '/cache/ngoc.jpg';
      }
      else if (baugai3 == 'anh') {
        var bau3 = 'anh';
        var bau_3 = __dirname + '/cache/anh.jpg';
      }
      else if (baugai3 == 'dieu') {
        var bau3 = 'dieu';
        var bau_3 = __dirname + '/cache/dieu.jpg';
      }
      else if (baugai3 == 'thao') {
        var bau3 = 'thao';
        var bau_3 = __dirname + '/cache/thao.jpg';
      }
      // array baucua
      list.push(bau1);
      list.push(bau2);
      list.push(bau3);
      // array img
      listimg.push(createReadStream(__dirname + '/cache/' + bau1 + '.jpg'))
      listimg.push(createReadStream(__dirname + '/cache/' + bau2 + '.jpg'))
      listimg.push(createReadStream(__dirname + '/cache/' + bau3 + '.jpg'))
      // ICON
      // icon 1
      if (bau1 == 'dieu') {
        var icon1 = '🐓';
      }
      else if (bau1 == 'thao') {
        var icon1 = '🦞'
      }
      else if (bau1 == 'tlinh') {
        var icon1 = '🍐';
      }
      else if (bau1 == 'danh') {
        var icon1 = '🦀';
      }
      else if (bau1 == 'anh') {
        var icon1 = '🐟';
      }
      else if (bau1 == 'ngoc') {
        var icon1 = '🦌';
      }
      // icon 2
      if (bau2 == 'thao') {
        var icon2 = '❤️';
      }
      else if (bau2 == 'tlinh') {
        var icon2 = '🦞'
      }
      else if (bau2 == 'anh') {
        var icon2 = '🍐';
      }
      else if (bau2 == 'dieu') {
        var icon2 = '🦀';
      }
      else if (bau2 == 'danh') {
        var icon2 = '🐟';
      }
      else if (bau2 == 'ngoc') {
        var icon2 = '🖤';
      }
      // icon 3
      if (bau3 == 'thao') {
        var icon3 = '💗';
      }
      else if (bau3 == 'ngoc') {
        var icon3 = '🦋'
      }
      else if (bau3 == 'anh') {
        var icon3 = '❤️';
      }
      else if (bau3 == 'dieu') {
        var icon3 = '❣️';
      }
      else if (bau3 == 'danh') {
        var icon3 = '💞';
      }
      else if (bau3 == 'tlinh') {
        var icon3 = '💕';
      }
      // sendMessage
      api.sendMessage({
        body: '💖❤️bố mẹ còng lưng nuôi con ,con ở nhà chơi bầu cua..🌺\nChúc bạn bán nhà uwu !',
        attachment: createReadStream(__dirname + '/cache/baucua.gif')
      }, threadID, (err, info) => {
        if (err) return api.sendMessage(err, threadID, messageID);
        setTimeout(() => {
          api.unsendMessage(info.messageID);
          var check = list.findIndex(i => i.toString() == content1);
          var check2 = list.includes(content1);
          //console.log(check);
          //console.log(icon1 + icon2 + icon3);
          if (check >= 0 || check2 == true) {
            return api.sendMessage({
              body: `🌺Lắc được: ${icon1} | ${icon2} | ${icon3}\n🌺 vì bán sổ đỏ nên Bạn đã thắng và nhận được ${moneyBet * 3}$`,
              attachment: listimg
            }, threadID, () => Currencies.increaseMoney(senderID, moneyBet * 3), messageID);
          }
          else if (check < 0 || check2 == false) {
            return api.sendMessage({
              body: `🌺Lắc được: ${icon1} | ${icon2} | ${icon3}\n🌺 thôi thua rồi vĩnh biệt cụ , cụ ra đường vui vẻ ${moneyBet}$`,
              attachment: listimg
            }, threadID, () => Currencies.decreaseMoney(senderID, moneyBet), messageID);
          }
          else {
            return api.sendMessage('Đã xảy ra lỗi. Vui lòng thử lại sau 5s', threadID, messageID);
          }
        }, 20000);
      }, messageID);
    }
    catch (err) {
      console.error(err);
      return api.sendMessage(err, event.threadID, event.messageID);
    }
      }