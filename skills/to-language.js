//
// Simplest use of Botkit's conversation system
//

const translate = require('google-translate-api');

//Languages available on Google API
var languageCodeDict={"afrikaans":"af","albanian":"sq","amharic":"am","arabic":"ar","armenian":"hy","azeerbaijani":"az","basque":"eu","belarusian":"be","bengali":"bn","bosnian":"bs","bulgarian":"bg","catalan":"ca","cebuano":"ceb","chinese(simplified)":"zh-CN","chinese(traditional)":"zh-TW","corsican":"co","croatian":"hr","czech":"cs","danish":"da","dutch":"nl","english":"en","esperanto":"eo","estonian":"et","finnish":"fi","french":"fr","frisian":"fy","galician":"gl","georgian":"ka","german":"de","greek":"el","gujarati":"gu","haitian":"ht","hausa":"ha","hawaiian":"haw","hebrew":"iw","hindi":"hi","hmong":"hmn","hungarian":"hu","icelandic":"is","igbo":"ig","indonesian":"id","irish":"ga","italian":"it","japanese":"ja","javanese":"jw","kannada":"kn","kazakh":"kk","khmer":"km","korean":"ko","kurdish":"ku","kyrgyz":"ky","lao":"lo","latin":"la","latvian":"lv","lithuanian":"lt","luxembourgish":"lb","macedonian":"mk","malagasy":"mg","malay":"ms","malayalam":"ml","maltese":"mt","maori":"mi","marathi":"mr","mongolian":"mn","myanmar":"my","nepali":"ne","norwegian":"no","nyanja":"ny","pashto":"ps","persian":"fa","polish":"pl","portuguese":"pt","punjabi":"pa","romanian":"ro","russian":"ru","samoan":"sm","scots-gaelic":"gd","serbian":"sr","sesotho":"st","shona":"sn","sindhi":"sd","sinhala":"si","slovak":"sk","slovenian":"sl","somali":"so","spanish":"es","sundanese":"su","swahili":"sw","swedish":"sv","tagalog":"tl","tajik":"tg","tamil":"ta","telugu":"te","thai":"th","turkish":"tr","ukrainian":"uk","urdu":"ur","uzbek":"uz","vietnamese":"vi","welsh":"cy","xhosa":"xh","yiddish":"yi","yoruba":"yo","zulu":"zu"};

module.exports = function (controller) {
	for(var key in languageCodeDict){
		controller.hears(["to-"+key], 'direct_message,direct_mention', function (bot, message) {
			
			//get target language only from message
			var target=message.text.match("(to-)(\\w+)")[2];
			
			bot.startConversation(message, function (err, convo) {
				
				//call the google translate API to translate the message only
				translate(message.text.split(target)[1], {to: languageCodeDict[target]}).then(res => {
					
					convo.say("Message translated to "+target+":\n\n"+res.text);
					
				}).catch(err => {
				console.error(err);
				});
    
			});

		});
	}
};
