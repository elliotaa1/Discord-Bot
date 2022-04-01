const player = require("discord-player");
const client = require("../main");

module.exports = {
    name: "stop",
    description: "skips the current song & disconnects",

    async execute(client, message, command) {

        if (command === 'stop') {
            queue.stop();
            message.followUp({ content: `Music stopped` })
        }


        if (!message.member.voice.channel) return message.followUp({ content: "You have to be in the channel" })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.followUp({
            content: "You have to be in the same voice channel as me bro "
        })

        const queue = player.getQueue(message.guildId)

        if (!queue.playing) return message.followUp({ content: "No music is playing right now " })

        if (command === 'stop') {
            queue.stop()
            message.followUp({ content: `Music stopped` })
        }
    }
}