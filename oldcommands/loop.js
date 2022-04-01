const player = require("discord-player")
const Discord = require("discord.js")

module.exports = {
    name: "loop",
    description: "Loops the queue",
    options: [{

        name: "mode",
        description: "Choose a loop mode among 'off', 'track', 'queue, 'autoplay",
        type: "STRING",
        required: true
    }],

    async execute(message) {


        const songTitle = message.option.getString('mode').toLowerCase();

        const mode = ["off", "track", "queue", "autoplay"]

        if (!message.member.voice.channel) return message.followu({ content: "You have to be in the channel" })


        if (!serverQueue.playing) return message.followup({ content: "No music is playing right now " })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.followup({
            content: "You have to be in the same voice channel as me bro "
        })

        if (!mode.includes(songTitle)) return message.followUp({ content: `You can only choose among \`off\`, \`track\`, \`queue\`, \`autoplay\`` })

        if (songTitle === "off") {
            serverQueue.setRepeatMode(0)
            return message.followUp({ content: "Loop mode is now disabled" })

        } else if (songTitle === "track") {
            serverQueue.setRepeatMode(1)
            return message.followUp({ content: "Loop mode is now set to TRACK" })

        } else if (songTitle === "queue") {
            serverQueue.setRepeatMode(2)
            return message.followUp({ content: "Loop mode is now set to QUEUE" })

        } else if (songTitle === "autoplay") {
            serverQueue.setRepeatMode(3)
            return message.followUp({ content: "Loop mode is now set to AUTOPLAY" })

        }

    }
}