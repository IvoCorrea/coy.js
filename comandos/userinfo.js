const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Diz informações do usuario')
        .setDescriptionLocalizations({
            'pt-BR': 'Mostre a sua informação!',
        })
        .addUserOption(user => user.setName('user').setDescription('usuario').setRequired(false)),

    async execute(client, interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const isbot = user.bot ? 'Sim' : 'Não';
        const createdAt = user.createdAt.toLocaleDateString();

        let userRoles
        let member
        let joinedAt
        if (interaction.guild != null) {
            member = await interaction.guild.members.fetch(user.id);
            joinedAt = member.joinedAt.toLocaleDateString();
            userRoles = member.roles.cache.map(r => r).join(' ');
        } else {
            joinedAt = 'Dm'
            userRoles = `Dm's não possuem cargos.`
        }

        const userInfoEmbed = new EmbedBuilder()
            .setColor('White')//0x0099FF
            .setTitle(`**${user.tag}**`)
            .addFields(
                { name: '**Tag**', value: `${user.tag}`, inline: true },
                { name: '**Entrou no servidor em**', value: `${joinedAt}`, inline: true },
                { name: '**Data de criação**', value: `${createdAt}`, },
                { name: '**É um bot?**', value: `${isbot}`, },
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

            //Botao que mostra todos os cargos do usuario mencionado
            const roles = new ButtonBuilder()
            .setCustomId('cargos')
            .setLabel('Cargos')
            .setStyle(ButtonStyle.Secondary);

            const cargosEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`Cargos de ${user.tag}`)
            .setDescription(`${userRoles}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

            const row = new ActionRowBuilder()
            .addComponents(roles);

        return await interaction.reply({ embeds: [userInfoEmbed], components: [row] })
        .then(i => {
            const collector = i.createMessageComponentCollector({ componentType: ComponentType.Button, time: 25_000 });

            collector.on('collect', i=> {
                if (i.customId === 'cargos') i.reply({embeds:[cargosEmbed], ephemeral: true})
                else i.reply({content: 'Erro.', ephemeral: true});
            })

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        })

    }
};