const {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'joins and plays music',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;


        if (!voiceChannel)
            return message.channel.send('> Join a voice channel dumbass');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT'))
            return message.channel.send('> no perms, no bitches');
        if (!permissions.has('SPEAK'))
            return message.channel.send('> no perms, no bitches');
        if (!args.length)
            return message.channel.send('> no song link, no bitches, no maidens, no love. put a song link.');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query);
            return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
        };

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' });
            const player = createAudioPlayer();
            const resource = createAudioResource(stream);

            await player.play(resource);
            connection.subscribe(player);

            player.on('error', (error) => console.error(error));
            player.on(AudioPlayerStatus.Idle, () => {
                message.channel.send('Songs Finished');
            });

            await message.reply(`Now playing ***${video.title}***`);
        } else {
            message.channel.send('No video results found');
        }
    }
}