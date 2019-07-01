"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("./configdev");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.login(ConfigFile.config.token);
console.log("Bot Fired Up!");
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
        if (ConfigFile.config.receive_join_messages === true) {
            if (ConfigFile.config.message_layout_join === "big") {
                const attachment = new Discord.Attachment("./card_images/approved.png", "approved.png");
                const embed = new Discord.RichEmbed()
                    .setTitle(newMember.displayName + " Joined A Voicechannel")
                    .setAuthor("Room Notifications", newMember.guild.iconURL)
                    .setColor(ConfigFile.config.embed_message_color)
                    .setDescription("Welcome to the **" + newUserChannel.name + "** Channel.🤔")
                    .setFooter("Message was sent on")
                    .setImage(newMember.user.displayAvatarURL)
                    .attachFile(attachment)
                    .setThumbnail("attachment://approved.png")
                    .setTimestamp()
                    .setURL("https://discordapp.com/")
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
                    .setURL("https://discordapp.com/")
                    .addField(newMember.displayName, "Enjoy your stay **" + newMember.displayName + "**!");
                channeljoin.send("", { embed });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY0xvQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Rpc2NMb0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLDBDQUEwQztBQUUxQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFHakMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBR25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFHN0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNsRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQzVDLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7SUFHNUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUduRSxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXJFLElBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO1FBRWhFLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFDakQsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDL0IsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDO2lCQUN2RDthQUNGO1lBQ0QsSUFBSSxTQUFTLENB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