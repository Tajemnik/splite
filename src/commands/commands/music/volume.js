const Command = require("../../Command");

module.exports = class MusicVolumeCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'volume',
        aliases: ['vol'],
        usage: `{prefix}volume [1-${client.config.music.maxVol}]`,
        voiceChannelOnly: true,
        type: client.types.MUSIC,
    });
  }

    async run(message, args) {
        const maxVol = this.client.config.music.maxVol;
        const queue = this.client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`The volume you want to change is already the current one ${message.author}... try again ? ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`The specified number is not valid. Enter a number between **1** and **${maxVol}** ${message.author}... try again ? ❌`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${message.author}... try again ? ❌`);
    }
};