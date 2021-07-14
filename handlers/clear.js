function handleClear(message, number) {
    try {
        number = parseInt(number) + 1
    }
    catch (err) {
        message.channel.send("Invalid number!")
        return
    }

    if (number > 100)
        number = 101

    if (number < 1)
        number = 1

    message.channel.bulkDelete(number);
}

module.exports = { handleClear };