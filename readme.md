# DiscLoBot

## What does this bot do?

Discord Logger Bot Logs events of users joining or leaving a voicechannel and moving between them. Secondly it logs users mute or unmute themselves.

All these events will be logged in a channel of your choosing.
There is also an option to send only joining events to another channel in a nice formatted message in case you want to make that available to see to other members.

This is a selfhosted bot. I found public bot's which had this functionalty but they were not very reliable.

### Simple text logger:
![Logger](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/readme_images/Logger.PNG)

### Join messages in seperate channel:
#### Big:
![join_announcement_big](https://github.com/Mister-Espria/DiscLoBot/blob/master/readme_images/Join_announcement_big.PNG)


#### Small: 
![join_announcement_small](https://github.com/Mister-Espria/DiscLoBot/blob/master/readme_images/Join_announcement_small.PNG)

## Example Usecase
I use this bot in combination with [Home-Assistant](https://www.home-assistant.io/) and [Node-Red](https://nodered.org/). I use Node-Red to read the log messages created by DiscLoBot and based on the text perform an action in Home-Assistant. For example when i mute myself the led-strip behind my desk turns to red an back to it's orignal color if i unmute myself.
Or when a specific friend joins a voicechannel i will let google home announce it. The bot creates also Join messages in a seperate channel so on mobile you will receive also notifications if somebody joins a voicechannel.

#### prerequisites

1. A machine where you can run it from (I used a Debian machine).

2. npm and node installed. check with ``` npm -v  ``` and ``` node -v  ```

#### Installation

1. First follow [this simple guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) to create a bot and obtain a token.
2. [Download](https://github.com/Mister-Espria/DiscLoBot/archive/master.zip) the contens of this gitbub page and extract them to a folder on your machine.
3. Edit config.ts. Add your Discord_token obtained in step 1 and add the channel id for join messages and the channel id for all logging messages. 
    > Finding channel ID: On Discord, open your User Settings -> Appearance -> Enable Developer Mode. Then you can right click on any text channel and an option to `Copy ID` will show.
You can change other options in config.ts aswell. Check ConfigOptions below.
4. To run the bot i installed [PM2](http://pm2.keymetrics.io/) by running: `npm install pm2 -g `
5. Then navigate to the folder with `DiscLoBot.js` in it and run the command `pm2 start DiscLoBot.js`
    > To see Logs of the running bot use `pm2 monit DiscLoBot`

    > After changes to the bot or config you can reload the bot using `pm2 reload DiscLoBot`



##### ConfigOptions

Name | Type | Default | Supported Options | Description
---------|----------|---------|---------|---------
 token | string | required | - | Discord_Token 
 prefix | string | required | any combination of characters | Prefix for interacting with the bot
 receive_join_messages | boolean | required | `true|false` | Receive formatted Join messages in separate channel
 channel_join | string | required, if receive_join_message = true | 426146482629993420 | Your channel ID where you want the formatted Join messages to go
channel_log | string | required | 433146482629993433 | Your channel ID where logging message go to 
mute_state_on_join | boolean | false | `true|false`| Create initial Mute/Unmute state message when user joins voicechannel if true besides the join message.
message_layout_join | string | big | `big|small`| Set size of Join message see pictures on top for examples.
embed_message_color | string | #00AE86 | `All hex color codes`| Sets the color of the left bar alongside the Join message. Default = Green




#### Using with Node-Red
Install  `node-red-contrib-discord` in Node-red.

This is a basic flow example.





