export let config = {
    "token": "ENTER_DISCORD_TOKEN_HERE",
    "prefix": "?",
    "receive_join_messages": true,             //true for receiving nice formatted join messages in channel_join. false means only messages will be sent to channel_log so entering channel id for channel_join is not necessary
    "channel_join": "ENTER_CHANNEL_ID_FOR_JOIN_ANNOUNCEMENTS_HERE",     //Only needed if receive_join_messages = true
    "channel_log": "ENTER_CHANNEL_ID_FOR_LOGGING_HERE",
    "mute_state_on_join": false,                // if true; sends the muted/unmuted state when the user joins, in a message to channel_log. if false; message not send when user joins a voicechannel
    "message_layout_join": "big",               // big for a message with a big picture of the user or small with only a thumbnail size picture of the user
    "embed_message_color": "#00AE86"            //this is the hex color of the left bar of the message #BC0026
}