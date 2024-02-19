const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { estadios, climas, jogador } = require('../randomevents/random.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confronto')
        .setDescription('Começa uma disputa')
        .addUserOption(user => user.setName('adversario').setDescription('adv').setRequired(false)),

    async execute(client, interaction) {

        let contadorA = 0;
        let contadorB = 0;
        let total = getRandomIntInclusive(0, 8);
        let t1 = Math.floor(total / 2);
        let t2 = total - t1;
        let resultado = [];
        let contador = 0;
        let adversario = interaction.options.getUser('adversario') || client.user;

        for (let i = 0; i < t1; i++) {

            contador = contador + Math.floor(Math.random() * 30);
            let timeQueFezOGol = Math.round(Math.random());

            if (timeQueFezOGol === 1) {
                contadorA++
                resultado.push({ name: `**${contador}' ⚽ GOOOOOOOOOLLL**`, value: `${jogador()} marca para o time de ${interaction.user}` });
            }
            else if (timeQueFezOGol === 0) {
                contadorB++
                resultado.push({ name: `**${contador}' ⚽ GOOOOOOOOOLLL**`, value: `${jogador()} marca para o time de ${adversario}` });
            }
        };

        resultado.push({ name: `**FIM DO PRIMEIRO TEMPO!**`, value: `*Os times vão ao vestiario.*` });
        contador = 45;

        for (let i = 0; i < t2; i++) {
            contador = contador + Math.floor(Math.random() * 10);
            let timeQueFezOGol = Math.round(Math.random());

            if (timeQueFezOGol === 1) {
                contadorA++;
                resultado.push({ name: `**${contador}' ⚽ GOOOOOOOOOLLL**`, value: `${jogador()} marca para o time de ${interaction.user}` });
            }
            else if (timeQueFezOGol === 0) {
                contadorB++;
                resultado.push({ name: `**${contador}' ⚽ GOOOOOOOOOLLL**`, value: `${jogador()} marca para o time de ${adversario}` });
            }
        };
        resultado.push({ name: `**90'**`, value: `O juiz apita, fim de jogo!`, });

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const confronto = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor('White')
            .setDescription(`**:watch: 90'** \n :stadium: ${estadios()} \n ${climas()} 
            \n ${interaction.user} **${contadorA} x ${contadorB}** ${adversario}`)
            .addFields(resultado);

        interaction.reply({ embeds: [confronto] });

    }
};