const player = require("discord-player")
const Discord = require("discord.js")
module.exports = {
    name: "skip",
    description: "skips the current song",

    execute(client, interaction, options) {

        const queue = player.queue.get(interaction.guildId)

        if (!interaction.member.voice.channel) return interaction.followu({ content: "You have to be in the channel" })

        if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followup({
            content: "You have to be in the same voice channel as me bro "
        })

        if (!queue.playing) return interaction.followup({ content: "No music is playing right now " })

        queue.skip()

        interaction.followUp({ content: `Song skipped` })
    }
}