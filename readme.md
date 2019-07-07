# DiscLoBot

## What does this bot do?

Discord Logger Bot Logs events of users joining or leaving a voicechannel and moving between them. Secondly it logs users mute or unmute themselves.

All these events will be logged in a channel of your choosing.
There is also an option to send only joining events to another channel in a nice formatted message in case you want to make that available to see to other members.

This is a selfhosted bot. I found public bots which had this functionalty but they were not very reliable.

> With the Node-Red part below, you can pretty much build your bot to control anything you want. There is a Node-Red example to control your Home-Assistant lights, switches, scripts and more.

### Simple text logger:
![Logger](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/readme_images/Logger.PNG)

### Join messages in seperate channel:
#### Big:
![join_announcement_big](https://github.com/Mister-Espria/DiscLoBot/blob/master/readme_images/Join_announcement_big.PNG)


#### Small: 
![join_announcement_small](https://github.com/Mister-Espria/DiscLoBot/blob/master/readme_images/Join_announcement_small.PNG)

## Example Usecase
I use this bot in combination with [Home-Assistant](https://www.home-assistant.io/) and [Node-Red](https://nodered.org/). I use Node-Red to read the log messages created by DiscLoBot and based on the text perform an action in Home-Assistant. For example when i mute myself the led-strip behind my desk turns to red an back to it's orignal color if i unmute myself.
Or when a specific friend joins a voicechannel i will let google home announce it. The bot creates also Join messages in a seperate channel so on pc and mobile you will receive also notifications if somebody joins a voicechannel. It all depends on how you set it up as you have the flexibility of Node-Red.

## Setup

#### prerequisites

1. A machine where you can run it from (I used a Debian machine).

2. npm and node installed. check with ``` npm -v  ``` and ``` node -v  ```

#### Installation

1. First follow [this simple guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) to create a bot and obtain a token.
2. [Download](https://github.com/Mister-Espria/DiscLoBot/releases/latest) the latest release and extract the files to a folder on your machine.
3. Edit config.ts. Add your Discord_token obtained in step 1 and add the channel id for join messages and the channel id for all logging messages. 
    > **Finding channel ID:** 
    On Discord, open your User Settings -> Appearance -> Enable Developer Mode. Then you can right click on any text channel and an option to `Copy ID` will show.
You can change other options in config.ts aswell. Check [ConfigOptions](https://github.com/Mister-Espria/DiscLoBot#configoptions) below.
4. To run the bot i installed [PM2](http://pm2.keymetrics.io/) by running: `npm install pm2 -g `
5. Then navigate to the folder with `DiscLoBot.js` in it and run the command `pm2 start DiscLoBot.js`
    > To see Logs of the running bot use `pm2 monit DiscLoBot`

    > After changes to the bot or config you can reload the bot using `pm2 reload DiscLoBot`

    > When you have the bot running you can activate auto-start on boot by using `pm 2 startup` followed by `pm2 save`



##### ConfigOptions

Name | Type | Default | Supported Options | Description
---------|----------|---------|---------|---------
 token | string | required | - | Discord Token 
 receive_join_messages | boolean | required |  `true` \| `false` | Receive formatted Join messages in separate channel.
 channel_join | string | required, if receive_join_message = true | 426146482629993420 | Your channel ID where you want the formatted Join messages to go.
channel_log | string | required | 433146482629993433 | Your channel ID where logging message go to.
mute_state_on_join | boolean | false |  `true` \| `false` | Create initial Mute/Unmute state message when user joins voicechannel if true besides the join message.
message_layout_join | string | big |  `big` \| `small` | Set size of Join message see pictures on top for examples.
embed_message_color | string | #00AE86 | `All hex color codes`| Sets the color of the left bar alongside the Join message.


## Node-Red

#### Reading Discord messages with Node-Red
Install  `node-red-contrib-discord` in Node-red. To do this click the top right corner in Node-Red > Manage Palette > install > type in searchbox: node-red-contrib-discord > install

Drag the discord node into your flow and create another discord token to avoid conflicts with the DiscLoBot. Use the same [guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) to add the bot to your Discord and obtain the token.

This discord node will read all the messages of all the channels it has read permissions.
So this means you can do automations based on any message.

#### Node-Red Examples
1. [This is a basic flow example based on the messages the DiscLoBot creates.](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/node-red_example/example_1_voicestate_messages.json.txt)
    
    Use this example to be able to act on you or other people joining, leaving, muting etc.

    ![Node-red_example](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/readme_images/Node-red_example.PNG)


2. [Node-Red example to control devices in Home-Assistant through Discord.](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/node-red_example/example_2_ha_control.json.txt)

    Use this example to control your Home-Assitant lights, switches and scripts with Discord.
script
    ![Node-red_control_ha](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/readme_images/Control_HA.PNG)

    >For this example it is **not** needed to have the DiscLoBot installed. Only the discord node in Node-Red.
    In this example the prefix is set as `!` Whenever you want to issue a command you start with this prefix.

    Let's say you got these entity's you want to control: 
    * light.hallway
    * switch.pc
    * script.pc_reboot

    With this example you can control these devices within Discord by typing:

    `!light hallway`     
    `!light hallway off`    
    `!switch pc`       
    `!switch pc on`      
    `!script pc_reboot` 

    > If the service `on` or `off` is not provided `toggle` will be used.

    > Before a message is sent to Home-Assistant Node-Red wil perform a check in the `Permissions` node. Only messages from an Owner or Admin of the server will go through. This can be changed to other roles or users or anything else you want to limit acces to your Home-Assistant devices.

3. [Same as previous example with the addition of retrieving Home-Assistant binary_sensor/sensor info in Discord.](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/node-red_example/example_3_including_sensors.json.txt)

    ![Node-red_control_ha_with_sensorsinfo](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/readme_images/Node-Red_example_3.PNG)

    This example is the same as the previous one, except for the fact that you can ask for sensor and binary_sensor state. A message will return with the state and when it last changed. But there is a caveat; you need to create a webhook within Discord which is easy. The channel where you create the webhook will receive the messages. So you can ask in every channel for the info, but only the channel the webhook is created for will receive the message.
   
    You can use `!sensor` and `!binary_sensor`. The message will look like this:
    
    ![example_message_sensorinfo](https://raw.githubusercontent.com/Mister-Espria/DiscLoBot/master/readme_images/Example_sensor_message.PNG)
    
> If you use more than one example, you can just use one discordMessage node instead of multiple.

## Future

* Add error logging.
* Look into making the bot easy to install (maybe hassio addon) and maybe integrate it with Red Discord bot, but no promises on this.


