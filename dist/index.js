"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("./config");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1Q0FBdUM7QUFHdkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR2pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUduQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRzdCLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVMsT0FBTztJQUNoQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksUUFBUSxFQUFFO1FBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FDbEMsVUFBUyxJQUFJO2dCQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFDRCxVQUFTLEdBQUc7Z0JBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQ0YsQ0FBQztTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUdILEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDbEQsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztJQUM1QyxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBRzVDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFD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