import Roll from 'roll';

const DICE = new Roll();

type numberedString = [number, string];
const ROLLS = {
    AGES: "3d6-3",
    STATUSES: "2d6-2",
    ROLES: "1d5-1",
    HISTORIC: "2d6-2",
    MOTIVE: "2d6-2",
    VICIO: "2d6-2",
    OBJETIVE: "2d6-2",
    VIRTUE: "2d6-2"
}
const FIXED = {
    AGES: [
        "Criança",
        "Adolescente",
        "Jovem", "Jovem",
        "Adulto", "Adulto", "Adulto", "Adulto", "Adulto",
        "Meia Idade", "Meia Idade", "Meia Idade", "Meia Idade",
        "Velho",
        "Muito Velho",
        "Venerável"
    ],
    STATUSES: [
        { name: "Servo da casa ou cavaleiro errante comum ou homem livre.", value: 2 },
        { name: "Espada jurada.", value: 3 },
        { name: "Guarda ou Escudeiro.", value: 3 },
        { name: "Servo de alta posição da casa", value: 4 },
        { name: "Meistre, ", value: 4 },
        { name: "Septon auxiliar", value: 4 },
        { name: "Cavaleiro com terras", value: 4 },
        { name: "Bastardo nobre.", value: 4 },
        { name: "Brasão vassalo ou  protegido", value: 5 },
        { name: "Cortesão ou septon ou conselheiro.", value: 5 },
        { name: "Lorde da casa ou herdeiro ou Lady ou filhos.", value: 6 }
    ],
    ROLES: [
        "Especialista",
        "Guerreiro",
        "Ladino",
        "Líder",
        "Planejador"
    ],
    HISTORIC: [
        "Você serviu a outra casa (pajem, espada jurada).",
        "Você teve um tórrido caso de amor.",
        "Você lutou em uma batalha, ou esteve envolvido em uma.",
        "Você foi sequestrado e fugiu, ou seu resgate foi pago, ou você foi resgatado.",
        "Você viajou pelo mar estreito.",
        "Você realizou um feito signifi cativo, como salvar a vida de seu lorde, matar um javali gigante, etc.",
        "Você esteve em companhia de alguém famoso.",
        "Você esteve presente em um torneio importante (competindo ou assistindo).",
        "Você esteve envolvido em um escândalo vil.",
        "Você foi falsamente acusado de algo.",
        "Você foi capturado por outra casa e mantido como protegido ou prisioneiro."
    ],
    MOTIVE: [
        "Caridade",
        "Dever",
        "Medo",
        "Ganância",
        "Amor",
        "Ódio",
        "Luxúria",
        "Paz",
        "Estabilidade",
        "Excelência",
        "Loucura"
    ],
    VICIO: [
        "Ganancioso",
        "Arrogante",
        "Avarento",
        "Covarde",
        "Cruel",
        "Tolo",
        "Devasso",
        "Mesquinho",
        "Preconceituoso",
        "Conspirador",
        "Furioso"
    ],
    OBJETIVE: [
        "Iluminação",
        "Maestria de uma habilidade específica",
        "Fama",
        "Conhecimento",
        "Amor",
        "Poder",
        "Segurança",
        "Vingança",
        "Riqueza",
        "Justiça",
        "Fazer o bem"
    ],
    VIRTUE: [
        "Caridoso",
        "Casto",
        "Corajoso",
        "Dedicado",
        "Honesto",
        "Humilde",
        "Justo",
        "Magnânimo",
        "Piedoso",
        "Devoto",
        "Sábio"
    ]
}
const _generateGeneric = (type: string) => {
    const rolagem = DICE.roll(ROLLS[type]).result;
    return FIXED[type][+rolagem];
}

export const _generateAge = () => _generateGeneric("AGES");
export const _generateRole = () => _generateGeneric("ROLES");
export const _generateHistoric = () => _generateGeneric("HISTORIC");
export const _generateMotive = () => _generateGeneric("MOTIVE");
export const _generateObjetive = () => _generateGeneric("OBJETIVE");
export const _generateVicio = () => _generateGeneric("VICIO");
export const _generateVirtue = () => _generateGeneric("VIRTUE");

export const _generateStatus = (): numberedString => {
    const rolagem = DICE.roll("2d6-2").result;
    return [FIXED.STATUSES[+rolagem].value, FIXED.STATUSES[+rolagem].name];
}
