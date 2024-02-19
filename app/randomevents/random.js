const estadio = ['Na rua', 'Na lama', 'Morumbi', 'Maracanã', 'Camp Nou', 'Allianz Parque', 'Neo Química Arena', 'Mineirão', 'Beira-Rio', 'Arena Fonte Nova', 'Santiago Bernabéu', 'Estádio Old Trafford - Manchester, Reino Unido', 'Estádio San Siro - Milão, Itália', 'Estádio Anfield - Liverpool, Reino Unido', 'Estádio Wembley - Londres, Reino Unido', 'Estádio Allianz Arena - Munique, Alemanha']
const climas = [':white_sun_small_cloud: Ensolarado', ':cloud_rain: Chuvoso', ':partly_sunny: Nublado'];
const jogadores = ['Neymar Jr', 'Lula', 'Lionel Messi' , "Kevin de Bruyne", "Pelé", "Ronaldinho Gaúcho", "Cristiano Ronaldo", "Jair Bolsonaro", "Xuxa", "Silvio Santos", "Ana Maria Braga", "Luciano Hulk", "Elon Musk"]

const estadios = () => estadio[Math.floor(Math.random() * 15)];
const clima = () => climas[Math.floor(Math.random() * 3)];
const jogador = () => jogadores[Math.floor(Math.random() * 13)];

module.exports = {
    estadios: () => estadios(),
    climas: () => clima(),
    jogador: () => jogador(),
}