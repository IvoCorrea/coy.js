const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ola')
        .setDescription('Responde com "Olá'),
       

    async execute(client, interaction) {
        //1084680981144948786
        if (interaction.user.id == '1084680981144948786') {
            return await interaction.reply({content: `Oi, minha princesa`})
        } else {
            return await interaction.reply({content: `Olá`})
        }
        
    }
}

