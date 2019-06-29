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
        if (channeljoin) {
            let embcolor = "5838556";
            if (newMember.displayName === "Kiotam") {
                embcolor = "3447003";
            }
        }
        if (channellog) {
            channellog.send(newMember.displayName + " Joined! Channel " + newUserChannel.name);
        }
        const embed = new Discord.RichEmbed()
            .setTitle(newMember.displayName + " Joined A Voicechannel")
            .setAuthor("Room Notifications", "https://www.sccpre.cat/mypng/detail/77-779070_open-door-icon-png-white-png-download-front.png")
            .setColor(0x00AE86)
            .setDescription("Welcome to the **" + newUserChannel.name + "** Channel.🤔")
            .setFooter("Message was sent on")
            .setImage(newMember.user.displayAvatarURL)
            .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/12/17/check-145512_960_720.png")
            .setTimestamp()
            .setURL("https://kiot.nl")
            .addField(newMember.displayName, "Enjoy your stay **" + newMember.displayName + "**!");
        channeljoin.send("", { embed });
    }
    else if (newUserChannel === undefined) {
        if (channellog) {
            channellog.send(newMember.displayName + " Left! Channel: " + oldUserChannel.name);
        }
    }
    else if (oldMember.voiceChannelID !== newMember.voiceChannelID) {
        bot.channels.get(ConfigFile.config.channel_log).send(`${newMember} moved from voice channel ${oldUserChannel} to ${newUserChannel}`);
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