require('dotenv').config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const fs = require('fs');
const path = require('path');
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (client) => {
  client.commands = new Collection();
  let commands = [];

  const commandsPath = path.join(__dirname, 'comandos');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command)
      commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST().setToken(TOKEN);

  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: commands,
      });

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();

  console.log(`Pronto! Login feito como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction?.commandName);
  if (!command) return;

  try {
    await command.execute(client, interaction);
  } catch (err) {
    console.log(err);
  }
});

client.login(TOKEN);