// Types
import type GlobalObject from 'types/GlobalObject';

export default {
  getQueueForGuild,
}

// Gets the queue of users waiting to play
function getQueueForGuild(
  {
    guildID,
    global,
  } : {
    guildID: string,
    global: GlobalObject,
  },
): string[] {
  // If there is no guild queue for this quild ID, create one.
  if(!global.queue[guildID]) global.queue[guildID] = [];

  // Get the guild's queue from the global queue object
  const guildQueue = global.queue[guildID];

  // Return it
  return guildQueue;
}
