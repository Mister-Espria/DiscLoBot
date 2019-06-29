// Import Data form config.ts
import * as ConfigFile from "./config";


const Discord = require("discord.js");
const bot = new Discord.Client();

// Bot Logs in, Using token provided in config.ts
bot.login(ConfigFile.config.token);

//log in console to show bot is ready!
console.log("Bot Fired Up!");

//delete multiple messages if user has perrmission to do so by typing ^clear
bot.on("message", function(message) {
  if (message.content == "^clear") {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.fetchMessages().then(
        function(list) {
          message.channel.bulkDelete(list);
        },
        function(err) {
          message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
        }
      );
    }
  }
});

/// Bot subscribes to voiceStateupdate, which is fired every time a user Joins/leaves or Mutes/Unmutes
bot.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  // Channel for logging in just plain text. ENTER CHANNEL ID in config.ts
  const channellog = bot.channels.get(ConfigFile.config.channel_log);

  // Channel for only joining, with nice formatted message. ENTER CHANNEL ID in config.ts
  const channeljoin = bot.channels.get(ConfigFile.config.channel_join); // 427146486623633420



  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    // User Joins a voice channel
     if(ConfigFile.config.mute_state_on_join === true){
      if (newMember.selfMute === true) {
        if (channellog) {
          channellog.send(newMember.displayName + " Is Muted.");
        }
      } if (newMember.selfMute === false) {
        // User unmutes himself
        if (channellog) {
          channellog.send(newMember.displayName + " Is Unmuted.");
        }
      }
    }


    if (channeljoin) {
      let embcolor = "5838556";

      if (newMember.displayName === "Kiotam") {
        embcolor = "3447003";
      }
    }

    if (channellog) {
      channellog.send(
        newMember.displayName + " Joined! Channel " + newUserChannel.name
      );
    }

    // var tijd = Date.now();

    // const embed = {
    //   title: newMember.displayName + " Joined A Voicechannel",
    //   description: "Welcome to the **" + newUserChannel.name + "** Channel.🤔",
    //   url: "https://kiot.nl",
    //   color: 5838556,
    //   timestamp: tijd,
    //   footer: {
    //     icon_url:
    //       "https://www.natuurmuseumbrabant.nl/fileadmin/Icons/clock_icon.png",
    //     text: "Message was sent on"
    //   },
    //   thumbnail: {
    //     url:
    //       "https://cdn.pixabay.com/photo/2013/07/12/12/17/check-145512_960_720.png"
    //   },
    //   image: {
    //     url: newMember.user.displayAvatarURL
    //   },
    //   author: {
    //     name: "Room Notifications",
    //     url: "https://kiot.nl",
    //     icon_url:
    //       "https://www.sccpre.cat/mypng/detail/77-779070_open-door-icon-png-white-png-download-front.png"
    //   },
    //   fields: [
    //     {
    //       name: newMember.displayName,
    //       value: "Enjoy your stay **" + newMember.displayName + "**!"
    //     }
    //   ]
    // };

    // // Sends above contructed message
    // channeljoin.send("", { embed });
    
    


    const embed = new Discord.RichEmbed()
    .setTitle(newMember.displayName + " Joined A Voicechannel")
    .setAuthor("Room Notifications", "https://www.sccpre.cat/mypng/detail/77-779070_open-door-icon-png-white-png-download-front.png")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor(0x00AE86)
    .setDescription("Welcome to the **" + newUserChannel.name + "** Channel.🤔")
    .setFooter("Message was sent on")
    .setImage(newMember.user.displayAvatarURL)
    .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/12/17/check-145512_960_720.png")
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
    .setURL("https://kiot.nl")
    .addField(newMember.displayName,
      "Enjoy your stay **" + newMember.displayName + "**!")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    // .addField("Inline Field", "They can also be inline.", true)
    /*
     * Blank field, useful to create some space.
     */
    // .addBlankField(true)
    // .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
   
    channeljoin.send("", { embed });




































  } else if (newUserChannel === undefined) {
    // User leaves a voice channel or Mutes/ Unmutes
    //Sends Message in Channel log with which user left which channel
    if (channellog) {
      channellog.send(
        newMember.displayName + " Left! Channel: " + oldUserChannel.name
      );
    }
  }

   else if (oldMember.voiceChannelID !== newMember.voiceChannelID) {
  // user moved from one voice channel to another (old channel ID is different from the new one)
  bot.channels.get(ConfigFile.config.channel_log).send(`${newMember} moved from voice channel ${oldUserChannel} to ${newUserChannel}`);
} 
   else if (oldMember.voiceChannelID === newMember.voiceChannelID) {
   //user stays in same channel (old channel ID is same from the new one), check if user did mute/unmute
     // If nobody is joining or leaving check if somebody muted or unmuted
          // User mutes himself
          
          if (newMember.selfMute === true) {
          if (channellog) {
            channellog.send(newMember.displayName + " Is Muted.");
          }
        } if (newMember.selfMute === false) {
          // User unmutes himself
          if (channellog) {
            channellog.send(newMember.displayName + " Is Unmuted.");
          }
        }

 }

});




// bot.on('voiceStateUpdate', (oldMember, newMember) => {
//   let newUserChannel = newMember.voiceChannellet oldUserChannel = oldMember.voiceChannel;

//   if(!oldUserChannel && newUserChannel) {
//       // user joined a channel without being in one previously (old channel is undefined, new channel is defined)
//       bot.channels.get('529566151731052566').send(`${newMember} joined voice channel ${newUserChannel}`);
//   } else if (oldMember.voiceChannelID !== newMember.voiceChannelID) {
//       // user moved from one voice channel to another (old channel ID is different from the new one)
//       bot.channels.get('529566151731052566').send(`${newMember} moved from voice channel ${oldUserChannel} to ${newUserChannel}`);
//   }
// });