function handleClear(message,number) {
    try{
        number = parseInt(number)
    }
    catch(err){
        message.channel.send("Invalid number!")
    }

    if(number>100)
        number = 100

    if(number<1)
        number = 1

    message.channel.bulkDelete(number);
}

module.exports = { handleClear };