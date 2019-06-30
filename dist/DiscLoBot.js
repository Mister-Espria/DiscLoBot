"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("./configdev");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.login(ConfigFile.config.token);
console.log("Bot Fired Up!");
bot.on("message", function (message) {
    if (message.content == "^clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages().then(function (list) {
                message.channel.bulkDelete(list);
            }, function (err) {
                message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
            });
        }
    }
});
bot.on("voiceStateUpdate", (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    const channellog = bot.channels.get(ConfigFile.config.channel_log);
    const channeljoin = bot.channels.get(ConfigFile.config.channel_join);
    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        if (ConfigFile.config.mute_state_on_join === true) {
            if (newMember.selfMute === true) {
                if (channellog) {
                    channellog.send(newMember.displayName + " Is Muted.");
                }
            }
            if (newMember.selfMute === false) {
                if (channellog) {
                    channellog.send(newMember.displayName + " Is Unmuted.");
                }
            }
        }
        if (channellog) {
            channellog.send(newMember.displayName + " Joined! Channel " + newUserChannel.name);
        }
        if (ConfigFile.config.message_layout_join === "big") {
            const attachment = new Discord.Attachment('./card_images/approved.png', 'approved.png');
            const embed = new Discord.RichEmbed()
                .setTitle(newMember.displayName + " Joined A Voicechannel")
                .setAuthor("Room Notifications", newMember.guild.iconURL)
                .setColor(ConfigFile.config.embed_message_color)
                .setDescription("Welcome to the **" + newUserChannel.name + "** Channel.🤔")
                .setFooter("Message was sent on")
                .setImage(newMember.user.displayAvatarURL)
                .attachFile(attachment)
                .setThumbnail('attachment://approved.png')
                .setTimestamp()
                .setURL("https://kiot.nl")
                .addField(newMember.displayName, "Enjoy your stay **" + newMember.displayName + "**!");
            channeljoin.send("", { embed });
        }
        if (ConfigFile.config.message_layout_join === "small") {
            const embed = new Discord.RichEmbed()
                .setTitle(newMember.displayName + " Joined A Voicechannel")
                .setAuthor("Room Notifications", newMember.guild.iconURL)
                .setColor(ConfigFile.config.embed_message_color)
                .setDescription("Welcome to the **" + newUserChannel.name + "** Channel.🤔")
                .setFooter("Message was sent on")
                .setThumbnail(newMember.user.displayAvatarURL)
                .setTimestamp()
                .setURL("https://kiot.nl")
                .addField(newMember.displayName, "Enjoy your stay **" + newMember.displayName + "**!");
            channeljoin.send("", { embed });
        }
    }
    else if (newUserChannel === undefined) {
        if (channellog) {
            channellog.send(newMember.displayName + " Left! Channel: " + oldUserChannel.name);
        }
    }
    else if (oldMember.voiceChannelID !== newMember.voiceChannelID) {
        bot.channels
            .get(ConfigFile.config.channel_log)
            .send(`${newMember} moved from voice channel ${oldUserChannel} to ${newUserChannel}`);
    }
    else if (oldMember.voiceChannelID === newMember.voiceChannelID) {
        if (newMember.selfMute === true) {
            if (channellog) {
                channellog.send(newMember.displayName + " Is Muted.");
            }
        }
        if (newMember.selfMute === false) {
            if (channellog) {
                channellog.send(newMember.displayName + " Is Unmuted.");
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY0xvQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Rpc2NMb0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLDBDQUEwQztBQUcxQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFHakMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBR25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFHN0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBUyxPQUFPO0lBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxRQUFRLEVBQUU7UUFDL0IsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUNsQyxVQUFTLElBQUk7Z0JBQ1gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxFQUNELFVBQVMsR0FBRztnQkFDVixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FDRixDQUFDO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBR0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNsRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQzVDLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7SUFHNUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxH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