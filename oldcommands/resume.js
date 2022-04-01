const player = require("discord-player")
const Discord = require("discord.js")

module.exports = {
    name: "resume",
    description: "Resumes the current song",

    async execute(message) {

        const serverQueue = player.queue.on(message.guild.id)

        if (!message.member.voice.channel) return message.followUp({ content: "You have to be in the channel" })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.followUp({
            content: "You have to be in the same voice channel as me bro "
        })


        if (!serverQueue.playing) return message.followUp({ content: "No music is playing right now " })

        serverQueue.setPaused(false)

        message.followUp({ content: `Song ${serverQueue.current.title} has been resume` })
    }
}