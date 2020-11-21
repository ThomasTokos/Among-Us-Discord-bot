export default {
  // What the bot is "playing" Feel free to change this to anything
  activityString: 'your Among Us lobby',
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
}
