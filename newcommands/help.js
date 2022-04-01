const { Client, RichEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Send help dm",
    execute(message, args) {
        const Embed = new RichEmbed()
            .setTitle("Helper Embed")
            .setColor(0xFF0000)
            .setDescription("Make sure to use the !help to get access to the commands");

        message.author.send(Embed);

    }
}