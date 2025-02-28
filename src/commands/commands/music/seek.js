const ms = require('ms');
const Command = require("../../Command");

module.exports = class MusicSeekCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'seek',
        aliases: [],
        usage: 'seek [time]',
        voiceChannelOnly: true,
        type: client.types.MUSIC,
    });
  }

    async run(message, args) {
        const queue = this.client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) return message.channel.send(`The indicated time is higher than the total time of the current song ${message.author}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

        await queue.seek(timeToMS);

        message.channel.send(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
    }
};