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

    async execute(client, interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const isbot = user.bot ? 'Sim' : 'Não';
        const createdAt = user.createdAt.toLocaleDateString();
        const joinedAt = member.joinedAt.toLocaleDateString();

        const userInfoEmbed = new EmbedBuilder()
            .setColor('White')//0x0099FF
            .setTitle(`**${user.tag}**`)
            .addFields(
                { name: 'Tag', value: `**${user.tag}**\`\n${user.id}\``, inline: true },
                { name: 'Entrou no servidor em', value: `\`${joinedAt}\``, inline: true},
                { name: 'Data de criação', value: `\`${createdAt}\``,},
                { name: 'É um bot?', value: `\`${isbot}\``,},   
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))

        return await interaction.reply({ embeds: [userInfoEmbed] })

    }
};