import MarkdownRenderer from "../Components/MarkdownRenderer";
import PerguntasForm from "../Components/PerguntasForm";
import LessonNav from "../Components/LessonNav";

export const M2A1 = () => {
const perguntas = [
    {
        id: '21',
        texto: 'O que é altura na música?',
        tipo: 'aberta',
        respostaCorreta: 'É a propriedade do som que determina se ele é grave ou agudo, relacionada à frequência da vibração sonora.'
    },
    {
        id: '22',
        texto: 'Qual é a principal diferença entre timbre e intensidade?',
        tipo: 'aberta',
        respostaCorreta: 'O timbre diferencia as vozes e instrumentos mesmo com a mesma nota; a intensidade se refere ao volume do som.'
    },
    {
        id: '23',
        texto: 'O que influencia diretamente na duração de uma nota no canto?',
        tipo: 'aberta',
        respostaCorreta: 'A respiração eficiente e o apoio diafragmático influenciam no tempo que uma nota é sustentada com qualidade.'
    },
    {
        id: '24',
        texto: 'Qual das opções abaixo representa uma nota com maior duração?',
        tipo: 'fechada',
        opcoes: ['Semibreve', 'Colcheia', 'Semínima'],
        respostaCorreta: 'Semibreve'
    },
    {
        id: '25',
        texto: 'A dinâmica musical influencia na expressividade da interpretação?',
        tipo: 'fechada',
        opcoes: ['Sim', 'Não'],
        respostaCorreta: 'Sim'
    },
    {
        id: '26',
        texto: 'Qual das propriedades do som está relacionada ao brilho ou corpo da voz?',
        tipo: 'fechada',
        opcoes: ['Timbre', 'Altura', 'Intensidade'],
        respostaCorreta: 'Timbre'
    }
];

    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-2-aula-1.md" />
            <PerguntasForm perguntas={perguntas} pagId="m2a1" />
            <LessonNav modulo="2" aulaAtual={1} totalAulas={5} />
        </main>
    );
}

export const M2A2 = () => {
const perguntas = [
    {
        id: '27',
        texto: 'Qual é a principal diferença entre tessitura vocal e extensão vocal?',
        tipo: 'aberta',
        respostaCorreta: 'A extensão vocal é o total de notas que um cantor pode emitir; a tessitura vocal são as notas que ele consegue cantar com conforto e qualidade.'
    },
    {
        id: '28',
        texto: 'O que deve ser considerado para saber se uma nota está dentro da tessitura vocal?',
        tipo: 'aberta',
        respostaCorreta: 'Conforto na emissão, qualidade sonora, estabilidade e flexibilidade vocal.'
    },
    {
        id: '29',
        texto: 'Por que respeitar a tessitura vocal é importante?',
        tipo: 'aberta',
        respostaCorreta: 'Para garantir um canto saudável, evitar fadiga vocal e explorar o potencial da voz com segurança.'
    },
    {
        id: '30',
        texto: 'Qual das opções representa uma voz feminina com tessitura mais grave?',
        tipo: 'fechada',
        opcoes: ['Soprano', 'Mezzo-soprano', 'Contralto'],
        respostaCorreta: 'Contralto'
    },
    {
        id: '31',
        texto: 'A tessitura vocal está mais relacionada ao esforço ou ao conforto na emissão das notas?',
        tipo: 'fechada',
        opcoes: ['Esforço', 'Conforto'],
        respostaCorreta: 'Conforto'
    },
    {
        id: '32',
        texto: 'Qual das vozes abaixo tem tessitura entre C3 e C5?',
        tipo: 'fechada',
        opcoes: ['Tenor', 'Barítono', 'Baixo'],
        respostaCorreta: 'Tenor'
    }
];

    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-2-aula-2.md" />
            <PerguntasForm perguntas={perguntas} pagId="m2a2" />
            <LessonNav modulo="2" aulaAtual={2} totalAulas={5} />
        </main>
    );
}

export const M2A3 = () => {
	const perguntas = [
    {
        id: '33',
        texto: 'O que é melodia na música?',
        tipo: 'aberta',
        respostaCorreta: 'É a sequência de sons organizados que formam a linha principal da música, responsável por guiar nossa audição.'
    },
    {
        id: '34',
        texto: 'Qual é a função da harmonia em uma música?',
        tipo: 'aberta',
        respostaCorreta: 'Sustentar e complementar a melodia, criando um ambiente sonoro com notas simultâneas que formam acordes.'
    },
    {
        id: '35',
        texto: 'Por que o ritmo é considerado o pulso da música?',
        tipo: 'aberta',
        respostaCorreta: 'Porque ele organiza os sons no tempo, marca o movimento da música e conecta os demais elementos musicais.'
    },
    {
        id: '36',
        texto: 'Explique a diferença entre harmonia maior e harmonia menor.',
        tipo: 'aberta',
        respostaCorreta: 'A harmonia maior transmite alegria e otimismo; a menor transmite tristeza ou melancolia.'
    },
    {
        id: '37',
        texto: 'Quais são os elementos que formam a melodia?',
        tipo: 'aberta',
        respostaCorreta: 'Altura, duração, ritmo e contorno.'
    },
    {
        id: '38',
        texto: 'Qual das opções abaixo representa uma característica do ritmo?',
        tipo: 'fechada',
        opcoes: ['Contorno', 'Compasso', 'Altura'],
        respostaCorreta: 'Compasso'
    },
    {
        id: '39',
        texto: 'A melodia é a parte da música que:',
        tipo: 'fechada',
        opcoes: ['Forma acordes com várias notas', 'Nos faz sentir vontade de dançar', 'Mais ouvimos e lembramos'],
        respostaCorreta: 'Mais ouvimos e lembramos'
    },
    {
        id: '40',
        texto: 'A harmonia é composta por:',
        tipo: 'fechada',
        opcoes: ['Notas únicas em sequência', 'Notas simultâneas que formam acordes', 'Som grave e agudo'],
        respostaCorreta: 'Notas simultâneas que formam acordes'
    },
    {
        id: '41',
        texto: 'A síncopa é um elemento do ritmo que:',
        tipo: 'fechada',
        opcoes: ['Organiza notas por altura', 'Representa silêncio', 'Acentua uma parte fraca do compasso'],
        respostaCorreta: 'Acentua uma parte fraca do compasso'
    },
    {
        id: '42',
        texto: 'Qual das opções expressa a importância do ritmo?',
        tipo: 'fechada',
        opcoes: ['Cria progressões harmônicas', 'Une os elementos musicais e transmite movimento', 'Define a altura da nota'],
        respostaCorreta: 'Une os elementos musicais e transmite movimento'
    }
];

	return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-2-aula-3.md" />
            <PerguntasForm perguntas={perguntas} pagId="m2a3" />
            <LessonNav modulo="2" aulaAtual={3} totalAulas={5} />
        </main>
    );
}
export const M2A4 = () => {
	const perguntas = [
    {
        id: '43',
        texto: 'O que significa cantar afinado?',
        tipo: 'aberta',
        respostaCorreta: 'Significa emitir sons que correspondem exatamente às frequências corretas das notas musicais dentro de uma melodia.'
    },
    {
        id: '44',
        texto: 'Quais fatores podem afetar a afinação vocal de um cantor?',
        tipo: 'aberta',
        respostaCorreta: 'Percepção auditiva, controle da voz, postura, respiração, memória muscular e registro vocal.'
    },
    {
        id: '45',
        texto: 'Qual é a diferença entre afinação absoluta e afinação relativa?',
        tipo: 'aberta',
        respostaCorreta: 'Afinação absoluta é a capacidade de cantar uma nota sem referência; afinação relativa é ajustar-se a partir de uma nota ou tom ouvido.'
    },
    {
        id: '46',
        texto: 'Cantar com tensão excessiva pode causar que tipo de desafinação?',
        tipo: 'fechada',
        opcoes: ['Flat (nota baixa demais)', 'Sharp (nota alta demais)', 'Oscilação na afinação'],
        respostaCorreta: 'Sharp (nota alta demais)'
    },
    {
        id: '47',
        texto: 'Quando um cantor oscila entre tons próximos e não fixa a nota corretamente, ele apresenta:',
        tipo: 'fechada',
        opcoes: ['Afinação absoluta', 'Desafinação por tensão', 'Oscilação na afinação'],
        respostaCorreta: 'Oscilação na afinação'
    },
    {
        id: '48',
        texto: 'A maioria dos cantores utiliza qual tipo de afinação?',
        tipo: 'fechada',
        opcoes: ['Afinação absoluta', 'Afinação relativa', 'Afinação oscilante'],
        respostaCorreta: 'Afinação relativa'
    }
];

	return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-2-aula-4.md" />
            <PerguntasForm perguntas={perguntas} pagId="m2a4" />
            <LessonNav modulo="2" aulaAtual={4} totalAulas={5} />
        </main>
    );
}

export const M2A5 = () => {
	const perguntas = [
    {
        id: '49',
        texto: 'Por que a dicção é importante no canto?',
        tipo: 'aberta',
        respostaCorreta: 'Porque garante que as palavras sejam compreendidas com clareza e que a interpretação seja eficaz.'
    },
    {
        id: '50',
        texto: 'Quais fatores influenciam a articulação durante o canto?',
        tipo: 'aberta',
        respostaCorreta: 'Movimentação da boca, controle da língua, velocidade da fala, força dos fonemas e respiração adequada.'
    },
    {
        id: '51',
        texto: 'Quando o cantor canta com palavras pouco claras, isso pode prejudicar:',
        tipo: 'fechada',
        opcoes: ['A afinação', 'A articulação da língua', 'A compreensão da letra e a interpretação'],
        respostaCorreta: 'A compreensão da letra e a interpretação'
    },
    {
        id: '52',
        texto: 'Cantar com a boca pouco aberta pode causar:',
        tipo: 'fechada',
        opcoes: ['Melhor ressonância', 'Sons abafados e dicção prejudicada', 'Melhor controle vocal'],
        respostaCorreta: 'Sons abafados e dicção prejudicada'
    },
    {
        id: '53',
        texto: 'Qual dos exercícios abaixo é indicado para fortalecer os músculos da boca e melhorar a articulação?',
        tipo: 'fechada',
        opcoes: ['Leitura com entonação', 'Exercício com caneta', 'Respiração circular'],
        respostaCorreta: 'Exercício com caneta'
    }
];

	return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-2-aula-5.md" />
            <PerguntasForm perguntas={perguntas} pagId="m2a5" />
            <LessonNav modulo="2" aulaAtual={5} totalAulas={5} />
        </main>
    );
}