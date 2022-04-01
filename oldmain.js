const Discord = require('discord.js');

const intents = new Discord.Intents(32767)

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", 'GUILD_VOICE_STATES', 'GUILD_PRESENCES'] })


module.exports = client



const PREFIX = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Mashallah');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'test') {
        client.commands.get('test').execute(message, args);
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);

    const command = args.shift().toLowerCase();
    if (command === 'skip') {
        client.commands.get('skip').execute(message, args);
    } else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    } else if (command === 'stop') {
        client.commands.get('stop').execute(message, args);
    } else if (command === 'loop') {
        client.commands.get('loop').execute(message, args);
    }

});


client.login('OTU4ODE1MTQ2NTIyODQ1MjE0.YkS0MA.jwrHnB2_gpoiPFXS_yVP7FE10BI');