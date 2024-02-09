const estadio = ['Na rua', 'Na lama', 'Morumbi', 'Maracanã', 'Camp Nou', 'Allianz Parque', 'Neo Química Arena', 'Mineirão', 'Beira-Rio', 'Arena Fonte Nova', 'Santiago Bernabéu', 'Estádio Old Trafford - Manchester, Reino Unido', 'Estádio San Siro - Milão, Itália', 'Estádio Anfield - Liverpool, Reino Unido', 'Estádio Wembley - Londres, Reino Unido', 'Estádio Allianz Arena - Munique, Alemanha']
const climas = [':white_sun_small_cloud: Ensolarado', ':cloud_rain: Chuvoso', ':partly_sunny: Nublado'];

function estadios() {
    return estadio[Math.floor(Math.random() * 15)];
};

function clima() {
    return climas[Math.floor(Math.random() * 3)];
};

const opcoes = {
    estadios: () => estadios(),
    climas: () => clima(),
};

module.exports = opcoes;


