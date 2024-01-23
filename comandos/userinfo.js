const { SlashCommandBuilder } = require('discord.js');
const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Diz informações do usuario')
    .setDescriptionLocalizations({
      'pt-BR': 'Mostre a sua informação!',
    })
   .addUserOption(user => user.setName('user').setDescription('usuario pinto').setRequired(false)),
   
    async execute(client , interaction){
        let user = interaction.options.getUser('user') || interaction.user;
        //const member = await interaction.guild.members.fetch(user.id);
        
        const userInfoEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Informações do usuario`)
        .setDescription(`Informações de ${user}`)
        .addFields(
            { name: 'Tag', value: user.tag, inline: true },
            { name: 'ID', value: user.id, inline: true },
        )
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
    
        return await interaction.reply({ embeds: [userInfoEmbed] })
        
    }
};