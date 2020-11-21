import config from '../config';

// Types
import type { Client } from 'discord.js';
import type GlobalObject from 'types/GlobalObject';

export default (client: Client, global: GlobalObject) => {

  //joined a server
  client.on("guildCreate", guild => {
      console.log("Joined a new guild: " + guild.name);
  })

  //removed from a server
  client.on("guildDelete", guild => {
      console.log("Left a guild: " + guild.name);
      //remove from guildArray
  })
}
