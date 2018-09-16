const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.on('ready', () =>{ 
	//log no terminal quando conectar
	console.log("Connect as " + client.user.tag)
	
	//mudar status para playing with javascript
	client.user.setActivity("with JavaScript")
	
	//mudar status para watching youtube
	//client.user.setActivity("Youtube", {type: "WATCHING"})
	
	//log os servers que o bot esta conectado
	client.guilds.forEach((guild) => {
		console.log(guild.name)
		
		//log dos canais de cada server que o bot esta conectado
		guild.channels.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
		// general ID 488841686693445650
		})

	})
	//setting the variable
	let generalChannel = client.channels.get("488841686693445650")
	//send hello world to the channel
	generalChannel.send("Hello World")
	//send attachments to the channel
	//const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png")
	//generalChannel.send(attachment)
})
//code runs when someone other than the bot sends a msg
client.on('message', (receivedMessage) => {
	if(receivedMessage.author.bot) return;


	receivedMessage.channel.send("Message Received, " + receivedMessage.author.toString() + ": " + receivedMessage.content)
	receivedMessage.react("🔥")

	let fullCommand = receivedMessage.content.substr(1)
	let splitCommand = fullCommand.split(" ")
	let primaryCommand = splitCommand[0]
	let arguments = splitCommand.slice(1)
	let secondCommand = splitCommand[1]
	//list of commands
	if (primaryCommand == "help") {
		receivedMessage.channel.send('Os comandos são: !help, !bitcoin, !id, !tempo [id]')
	}
	//bitcoin price tracker
	if (primaryCommand == "bitcoin") {
		axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
.then(response => {
	receivedMessage.channel.send("O preço de 1 Bitcoin é: " + response.data.bpi.USD.rate + "USD");
})
.catch(error => {
	console.log(error);
});
	}
	//city IDs for weather query
	if (primaryCommand == "id") {
		receivedMessage.channel.send('Bh: 2270968, Sp: 3448439, Rio: 3451190');
	}

	//weather query
	if (primaryCommand == "tempo") {
		axios.get('http://api.openweathermap.org/data/2.5/forecast?id=' + secondCommand + '&APPID=650db9386970e475b6e91a56cb136f82')
.then(response => {
	var Temp = (response.data.list[0].main.temp);
	var TempF = (Temp - 273).toFixed(1);

	var Cidade = (response.data.city.name);
	receivedMessage.channel.send("Cidade: " + Cidade + " - Temperatura atual: " + TempF + " Celsius");
	
})
.catch(error => {
	console.log("Escolha um !id correto");
	});
}


})

	


client.login(process.env.BOT_TOKEN);