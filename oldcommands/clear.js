module.exports = {
    name: "clear",
    aliases: ["cl", "delete"],
    permissions: ["ADMINISTRATOR"],
    description: "Clear Messages",
    async execute(message, args) {
        if (!args[0]) return message.reply("Please enter the amount of messages");
        if (isNaN(args[0])) return message.reply("please enter a real number");

        if (args[0] > 100) return message.reply("You cannot delete more than 100 msgs");
        if (args[0] < 1) return message.reply("You can delete one msg");

        await message.channel.messages.fetch({ limit: args[0] }).then((messages) => {
            message.channel.bulkDelete(messages);
        });
    }
}