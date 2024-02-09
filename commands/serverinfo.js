const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ActionRowBuilder }
    = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Diz informações do server')
        .setDescriptionLocalizations({
            'pt-BR': 'Mostra a informação do server!'
        }),

    async execute(client, interaction) {
        const server = interaction.guild;
        if (server === null) return interaction.reply({ content: 'Não estamos em um servidor.' });
        const serverRoles = server.roles.cache.size;
        const { premiumSubscriptionCount, name, memberCount, id, ownerId } = server;

        //Embed da mensagem
        const serverEmbed = new EmbedBuilder()
            .setAuthor({ name: name, iconURL: server.iconURL() })
            .setThumbnail(server.iconURL({ dynamic: true }))
            .setColor('White')
            .setFields(
                { name: '**Dono**', value: `<@${ownerId}>`, inline: true },
                { name: '**Membros**', value: `${memberCount}`, inline: true },
                { name: '**Boosts**', value: `${premiumSubscriptionCount}` },
            )
            .setFooter({ text: `ID: ${id}  | Criado em: ${server.createdAt.toLocaleDateString('pt-BR')}` });

        //Botao onde mostra todos os chats do server
        const channels = new ButtonBuilder()
            .setCustomId('canais')
            .setLabel('Chats')
            .setStyle(ButtonStyle.Secondary);

        //Botao que mostra todos os cargos do servidor
        const roles = new ButtonBuilder()
            .setCustomId('cargos')
            .setLabel('Cargos')
            .setStyle(ButtonStyle.Secondary);

        //embed do botao cargos
        const cargosEmbed = new EmbedBuilder()
            .setAuthor({ name: name, iconURL: server.iconURL() })
            .setTitle('**Cargos**')
            .setColor('White')
            .setDescription(`${server.roles.cache.toJSON().join(' | ')}`);

        const chatsEmbed = new EmbedBuilder()
            .setAuthor({ name: name, iconURL: server.iconURL() })
            .addFields(
                {
                    name: '**Chats de texto**', value: `${server.channels.cache.filter((c) => c.type === 0).toJSON().length}`, inline: true
                },
                {
                    name: '**Chats de voz**', value: `${server.channels.cache.filter((c) => c.type === 2).toJSON().length}`,
                    inline: true
                },
                { 
                    name: '**Categorias**', value: `${server.channels.cache.filter((c) => c.type === 4).toJSON().length}` },
            )
            .setColor('White');

        const row = new ActionRowBuilder()
            .addComponents(roles)
            .addComponents(channels)

        await interaction.reply({ embeds: [serverEmbed], components: [row] })
            .then((i) => {
                const collector = i.createMessageComponentCollector({ componentType: ComponentType.Button, time: 25_000 });

                collector.on('collect', i => {
                    if (i.customId === 'cargos') i.reply({ embeds: [cargosEmbed] })
                    else if (i.customId == 'canais') i.reply({ embeds: [chatsEmbed] })
                    else i.reply({ content: 'Erro', ephemeral: true })
                })

                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} interactions.`);
                });
            });
    }
};