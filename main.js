const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")
const { MessageEmbed } = require('discord.js');


dotenv.config()
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = '958815146522845214'
const GUILD_ID = '333496011475648515'

const PREFIX = '.';

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES"
    ]
})

client.newcommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./newcommands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./newcommands/${file}`);

    client.newcommands.set(command.name, command);
}

client.on('ready', () => {

    client.user.setActivity(`.help || Drums of Liberation in ${client.guilds.cache.size} Servers `, { type: "PLAYING" })

    client.user.setPresence({
        status: "online"

    })
});


client.once('ready', () => {
    console.log('Hi :3');
});

client.on('messageCreate', message => {
    var words = ["suicide", "Suicide", "kms"]

    for (var i = 0; i < words.length; i++) {

        if (message.author.bot) return; {

            if (message.content.includes(words[i])) {
                message.reply('If anyone is contemplating suicide, please do not do it. It is not worth it, call this number instead: 1-800-273-8255. Or if you are not in the USA you can find your local line here: http://www.suicide.org/international-suicide-hotlines.html');

            }

        }
    }
});





client.on('messageCreate', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help') {

        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Document')
            .setURL('')
            .setAuthor({ name: 'Luffytaro', iconURL: 'https://i.imgur.com/UtVz8Nm.jpeg', url: '' })
            .setDescription('A multi-purpose bot that provides music, fun stuff and more to come.')
            .setThumbnail('https://i.imgur.com/soxGLae.jpeg')
            .addField('Prefix: ', ' `.` ', true)
            .addField('Fun Commands:', `.PING, .KITTY`)
            .addField('Music commands', '`/play`, `/skip`, `/shuffle`, `/pause`, `/resume`, `/queue`, `/quit`')
            .setImage('https://i.imgur.com/QoKNIvd.jpeg')
            .setTimestamp()
            .setFooter({ text: 'A bot still under-development, DM elliot#4620 for questions', iconURL: 'https://i.imgur.com/UtVz8Nm.jpeg' });

        message.author.send({ embeds: [exampleEmbed] });
    }

    if (command === 'ping') {
        client.newcommands.get('ping').execute(message, args);
    } else if (command == 'kitty') {
        client.newcommands.get('kitty').execute(message, args);
    } else if (command === 'clear') {
        client.newcommands.get('clear').execute(message, args);
    }
});


client.slashcommands = new Discord.Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles) {
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => {
            console.log("Successfully loaded")
            process.exit(0)
        })
        .catch((err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        })
} else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Not a valid slash command")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}