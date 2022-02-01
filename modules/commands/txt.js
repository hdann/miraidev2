module.exports.config = {
	name: 'txt',
	version: '2.0.0',
	hasPermssion: 2,
	credits: 'BằngVIP', /** Dựa trên givefile của NTKhang! */
	description: '',
	commandCategory: 'admin',
	usages: 'givefile',
	cooldowns: 5,
	dependencies: {"fs-extra":""}
};

module.exports.run = async ({ args, api, event }) => {
  var a = function (a) { api.sendMessage(a, event.threadID); }
  const permission = ["100035627980308","100036186248587"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Xin hộ cái tuổi givefile cái?", event.threadID, event.messageID);
	const fs = global.nodemodule["fs-extra"];
	var path = [],
		pathrn = [],
		pathrntxt = [];
	var msg = '';
	var notfound = "";
	for(let file of args) {
	 if(!fs.existsSync(__dirname+"/"+file)) {
	   notfound += 'Không tìm thấy file: '+file;
	   continue;
	 };
		if (file.endsWith('.js')) {
			fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
			pathrn.push(
				fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
			);
			pathrntxt.push(file.replace('.js', '.txt'));
		} else {
			path.push(fs.createReadStream(__dirname + '/' + file));
		}
    a("Check tin nhắn Bot hộ tao cái. Tao gửi file rồi đấy👌");
	}

	var mainpath = [...path, ...pathrn];
  if (pathrn.length != 0)
		msg +=
			'File của chú đấy, húp đi 😒';
	api.sendMessage({ body: msg+"\n"+notfound, attachment: mainpath }, event.messageReply.senderID);
	pathrntxt.forEach(file => {
		fs.unlinkSync(__dirname + '/' + file);
	});
};