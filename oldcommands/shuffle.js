const player = require("discord-player")
const Discord = require("discord.js")

module.exports = {
    name: "shuffle",
    description: "Shuffles the queue",

    async execute(message) {

        const queue = player.queue.get(interaction.guildId)

        if (!interaction.member.voice.channel) return interaction.followu({ content: "You have to be in the channel" })

        if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followup({
            content: "You have to be in the same voice channel as me bro "
        })

        if (!queue.playing) return interaction.followup({ content: "No music is playing right now " })

        queue.shuffle()

        interaction.followUp({ content: `the current queue has been shuffled` })
    }
}