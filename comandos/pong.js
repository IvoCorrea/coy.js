const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ola')
        .setDescription('Responde com "Olá Mundo!'),
       

    async execute(client, interaction) {
        return await interaction.reply({content: `Olá mundo`})
    }
}

