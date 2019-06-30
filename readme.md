# DiscLoBot

## What does this bot do?

DiscLoBot Logs events of users joining or leaving a voicechannel and moving between them. Secondly it logs users mute or unmute themselves.

All these events will be logged in a channel of your choosing.
There is also an option to send only joining events to another channel in a nice formatted message in case you want to make that available to see to other members.

## Example Usecase
I use this bot in combination with Home-Assistant and Node-Red. I use Node-Red to read the log messages created by DiscLoBot and based on the text perform an action in Home-Assistant. For example when i mute myself the led-strip behind my desk turns to red an back to it's orignal color if i unmute myself.
Or when a specific friend joins a voicechannel i will let google home announce it. The bot creates also Join messages in a seperate channel so on mobile you will receive also notifications if somebody joins a voicechannel.
