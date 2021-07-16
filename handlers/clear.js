function handleClear(message, number) {
	try {
		number = parseInt(number) + 1;
	}
	catch (err) {
		message.channel.send('Invalid number!');
		return;
	}

	if (number > 100) {number = 100;}

	if (number < 1) {number = 1;}

	try {
		message.channel.bulkDelete(number);
	}
	catch (err) {
		console.log(err);
	}
}

module.exports = { handleClear };