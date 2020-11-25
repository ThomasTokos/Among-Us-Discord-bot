# Among Us Discord Bot
A fun, costume Discord Bot made in TypeScript to help large groups who play Among Us

## Commands
 - `!help` This command will send the user who typed it a message in their DMs with a list of all the commands.
 - `!m` mutes all players in the current voice channel. Admin Only
 - `!um` unmutes all players in the current voice channel. Admin Only
 - `!d2p` runs the down2play command. It will create a message in that channel asking users to react to the message if they want to play a game of Among us. With each reaction, the bot then adds their name to the list.
 - `!queue` Enters that user into a queue, if you're Among Us lobby is full this is useful to keep track to see who is ready to play next!
 - `!nextInQueue` Selects the next person in the queue. Admin Only

## Configuration

### Default Config File
We made this bot with one key thing in mind, customizability.
You can change anything from the reaction the bot post when the down to play command is run, to the prefix of the command, or even what the bot is playing.

### Production vs Development
This bot has two different configs, one for testing and the other for running the bot.
To run the bot for production, please make sure you input the correct requirements.

## Requirements
Node.js 12.x or later
A Discord Account to create the bot account.

## Installation
```bash
git clone https://github.com/ThomasTokos/Among-Us-Discord-bot.git
cd ./Among-Us-Discord-bot
npm install
```

## Usage
To run in development mode using `npm start`, this will execute the bot on the machine and use the development config token.

To run for production use `npm run build` this will create a new directory ./build and all of the JavaScript code will be placed there.
From there, you can run `node index.js`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contributors
This project would not have been possible without @Joshverd working on it. He wrote most of this :)
