module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    // Messaggio di login + RichPresence e Stato
    console.log(`Eseguito il login come ${client.user.tag}.`);
    client.user.setPresence({
      activities: [{ name: 'Power, Super Power' }],
    });
    client.user.setStatus('dnd');
  },
};
