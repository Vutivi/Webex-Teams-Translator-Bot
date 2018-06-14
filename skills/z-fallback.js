//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
		if(message.text.indexOf("to-") >=0){
			markdown="Sorry, I did not understand your language. I only understand the languages within the Google Translate API which can be viewed from <a href='https://cloud.google.com/translate/docs/languages'>here</a>.";
			bot.reply(message, markdown);
		}
		else{
			var markdown = "Sorry, I did not understand your request.<br/>Try "
            + bot.appendMention(message, "help");
            
			bot.reply(message, markdown);
		}
    });
}
