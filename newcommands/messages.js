module.exports = {
    name: 'kitty',
    description: "Post pictures of kitty",
    execute(message) {
        const PREFIX = '.';
        if (message.content.startsWith(PREFIX + 'kitty')) {
            number = 3;
            imageNumber = Math.floor(Math.random() * number) + 1;
            message.channel.send({ files: ["./kittyimages/" + imageNumber + ".jpg"] })

        }
    }
}