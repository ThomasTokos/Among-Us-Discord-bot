// This is the clear basic config file, you will need to create a file called "config.ts" and fill in all of the following for the bot to work!
export default {
  discord: {
    token: '', //Create your bot here: https://discord.com/developers/applications
    adminIDs: [
      '', //In order to find the Discord User IDS you need to enable dev mode on Discord and copy their user ID.
      '',
      '',
    ],
    botID: '', //Can be found in the same place as the token
  },
  activityString: 'Watching a Low-IQ game of Among Us!', //What the bot is "playing" Feel free to change this to anything
  commands: {
    muteAll: '!m', //Feel free to changes these commands to whatever. You can also change the prefixes
    unmuteAll: '!um',
    down2play: '!down2play',
    d2p: '!d2p', //same thing as !down2play but shorter.
    queue: '!queue', //Enters you into the queue, when a lobby has max 10 players you enter the queue. When a player leaves or they have a spot the admin will run !nextInQueue
    nextInQueue: '!nextInQueue', //selects the next person in the queue, only can be run by admins
    help: '!help'
  },
  reactionEmoji: '✅', //this is the emoji that is added to the bot, the Emoji will be the one users react on.
};
