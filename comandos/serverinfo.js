const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Diz informações do server')
        .setDescriptionLocalizations({
            'pt-BR': 'Mostra a informação do server!'
        }),

    async execute(client, interaction) {
        const server = interaction.guild;
        const { name, memberCount, id, createdTimestamp, ownerId }  = server;

        const serverEmbed = new EmbedBuilder()
        .setAuthor({ name: name, iconURL: server.iconURL() })
        .setThumbnail(server.iconURL({ dynamic: true }))
        .setColor('White')
        .setFields(
            {name:'**Nome**', value: `${name}`, inline: true},
            {name:'**Membros**', value: `${memberCount}`, inline: true},
            {name: '**Dono**', value: `<@${ownerId}>`, inline: false},
        )
        .setFooter({text: `ID: ${id} | Criado em: ${server.createdAt.toLocaleDateString()}`});

        await interaction.reply({embeds: [serverEmbed] });
    }
};