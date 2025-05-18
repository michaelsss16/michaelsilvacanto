import MarkdownRenderer from "../Components/MarkdownRenderer";
import PerguntasForm from "../Components/PerguntasForm";

export const M1A1 = () => {
    const perguntas = [
        {
            id: '1',
            texto: 'O que é música?',
            tipo: 'aberta',
            respostaCorreta: 'É a organização de sons e silêncios no tempo, usada para expressar emoções, ideias e experiências.'
        },
        {
            id: '2',
            texto: 'Quais são os elementos que compõem a música?',
            tipo: 'aberta',
            respostaCorreta: 'Melodia, harmonia, ritmo, timbre e dinâmica.'
        },
        {
            id: '3',
            texto: 'Cantar é apenas emitir sons?',
            tipo: 'fechada',
            opcoes: ['Sim', 'Não'],
            respostaCorreta: 'Não'
        },
        {
            id: '4',
            texto: 'Marque os aspectos essenciais para estudar canto:',
            tipo: 'fechada',
            opcoes: ['Técnica vocal, musicalidade, interpretação e repertório', 'Ritmo, dança e improvisação'],
            respostaCorreta: 'Técnica vocal, musicalidade, interpretação e repertório'
        },
        {
            id: '5',
            texto: 'Descreva a importância da postura na técnica vocal.',
            tipo: 'aberta',
            respostaCorreta: 'A postura correta alinha o corpo, melhora a respiração e projeta melhor a voz.'
        },
        {
            id: '6',
            texto: 'Qual é a diferença principal entre voz falada e voz cantada?',
            tipo: 'aberta',
            respostaCorreta: 'A voz cantada tem controle respiratório e expressão musical, enquanto a falada foca na clareza da mensagem.'
        },
        {
            id: '7',
            texto: 'A música pode ser usada apenas para entretenimento?',
            tipo: 'fechada',
            opcoes: ['Sim', 'Não'],
            respostaCorreta: 'Não'
        },
        {
            id: '8',
            texto: 'Por que a articulação é importante no canto?',
            tipo: 'aberta',
            respostaCorreta: 'Porque garante que as palavras sejam compreendidas com clareza.'
        },
        {
            id: '9',
            texto: 'Qual dos itens abaixo faz parte da musicalidade?',
            tipo: 'fechada',
            opcoes: ['Percepção musical', 'Performance', 'Expressão corporal'],
            respostaCorreta: 'Percepção musical'
        },
        {
            id: '10',
            texto: 'Explique o que significa cantar com emoção.',
            tipo: 'aberta',
            respostaCorreta: 'É expressar sentimentos através da voz, usando dinâmica, articulação e interpretação.'
        }
    ];

    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-1.md" />

            <h2>Material extra</h2>
            <h3>Podcast</h3>
            <audio controls>
  <source src="/michaelsilvacanto/podcasts/Podcast-M1A1.wav" type="audio/wav" />
  Seu navegador não suporta o elemento de áudio.
</audio>

            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M1A2 = () => {
    const perguntas = [
        {
            id: '1',
            texto: 'Quais são os três principais sistemas envolvidos na produção da voz?',
            tipo: 'fechada',
            opcoes: ['Respiratório, fonatório e digestivo', 'Respiratório, fonatório e articulatório'],
            respostaCorreta: 'Respiratório, fonatório e articulatório'
        },
        {
            id: '2',
            texto: 'O que acontece quando as pregas vocais estão mais tensionadas?',
            tipo: 'fechada',
            opcoes: ['Emitimos notas mais graves', 'Emitimos notas mais agudas'],
            respostaCorreta: 'Emitimos notas mais agudas'
        },
        {
            id: '3',
            texto: 'Qual das estruturas a seguir faz parte do aparelho fonatório?',
            tipo: 'fechada',
            opcoes: ['Palato mole', 'Epiglote'],
            respostaCorreta: 'Epiglote'
        },
        {
            id: '4',
            texto: 'A função da epiglote é:',
            tipo: 'fechada',
            opcoes: ['Controlar o fluxo de ar e vibrar as pregas vocais', 'Direcionar o ar para os pulmões e o alimento para o estômago'],
            respostaCorreta: 'Direcionar o ar para os pulmões e o alimento para o estômago'
        },
        {
            id: '5',
            texto: 'Qual estrutura do aparelho articulatório contribui fortemente para a projeção da voz no canto lírico?',
            tipo: 'fechada',
            opcoes: ['Língua', 'Palato mole'],
            respostaCorreta: 'Palato mole'
        },
        {
            id: '6',
            texto: 'O que são os formantes vocais?',
            tipo: 'fechada',
            opcoes: ['São músculos das pregas vocais', 'Frequências de ressonância que definem o timbre e projetam a voz'],
            respostaCorreta: 'Frequências de ressonância que definem o timbre e projetam a voz'
        },
        {
            id: '7',
            texto: 'A caixa torácica atua como câmara de ressonância especialmente para:',
            tipo: 'fechada',
            opcoes: ['Notas agudas', 'Notas graves'],
            respostaCorreta: 'Notas graves'
        },
        {
            id: '8',
            texto: 'Qual é a importância da hidratação vocal?',
            tipo: 'fechada',
            opcoes: ['Aumenta o volume da voz', 'Evita fadiga e lesões vocais'],
            respostaCorreta: 'Evita fadiga e lesões vocais'
        },
        {
            id: '9',
            texto: 'Cite dois registros vocais mencionados na aula.',
            tipo: 'aberta',
            respostaCorreta: 'Peitoral e falsete'
        },
        {
            id: '10',
            texto: 'Explique o papel do aparelho articulatório na produção vocal.',
            tipo: 'aberta',
            respostaCorreta: 'Ele molda o som das pregas vocais, formando fonemas e vogais, além de projetar e ressoar a voz.'
        }
    ];

    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-2.md" />

            <h3>Podcast</h3>
            <audio controls>
  <source src="/michaelsilvacanto/podcasts/Podcast-M1A2.wav" type="audio/wav" />
  Seu navegador não suporta o elemento de áudio.
</audio>

            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M1A3 = () => {
    const perguntas = [
        {
            id: '1',
            texto: 'Qual é o principal objetivo do alongamento corporal antes do canto?',
            tipo: 'fechada',
            opcoes: ['Ganhar força muscular', 'Liberar tensões e melhorar a eficiência vocal'],
            respostaCorreta: 'Liberar tensões e melhorar a eficiência vocal'
        },
        {
            id: '2',
            texto: 'Qual exercício ajuda a melhorar a flexibilidade dos lábios?',
            tipo: 'fechada',
            opcoes: ['Girar os ombros', 'Fazer bico com os lábios e sorrir'],
            respostaCorreta: 'Fazer bico com os lábios e sorrir'
        },
        {
            id: '3',
            texto: 'O exercício "Girar a cabeça" deve ser feito:',
            tipo: 'fechada',
            opcoes: ['Rapidamente para estimular o pescoço', 'Com calma, 10 vezes para cada lado'],
            respostaCorreta: 'Com calma, 10 vezes para cada lado'
        },
        {
            id: '4',
            texto: 'Descreva brevemente por que é importante fazer alongamento antes de cantar.',
            tipo: 'aberta',
            respostaCorreta: 'Para relaxar a musculatura, evitar lesões vocais e garantir liberdade vocal.'
        },
        {
            id: '5',
            texto: 'Cite dois exercícios de alongamento descritos na aula.',
            tipo: 'aberta',
            respostaCorreta: 'Espreguiçar e bocejar; girar os ombros.'
        }
    ];
    return (

        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-3.md" />
            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M1A4 = () => {
    const perguntas = [
        {
          id: '1',
          texto: 'Qual é a principal função do aquecimento vocal?',
          tipo: 'fechada',
          opcoes: [
            'Melhorar a postura corporal',
            'Preparar a voz para uma performance segura e eficiente'
          ],
          respostaCorreta: 'Preparar a voz para uma performance segura e eficiente'
        },
        {
          id: '2',
          texto: 'Qual exercício é indicado para promover suavidade na transição entre registros vocais?',
          tipo: 'fechada',
          opcoes: [
            'Glissando ("sirene")',
            'Sopro articulado em "F" ou "S"'
          ],
          respostaCorreta: 'Glissando ("sirene")'
        },
        {
          id: '3',
          texto: 'Quando é o melhor momento para fazer o desaquecimento vocal?',
          tipo: 'fechada',
          opcoes: [
            'Antes do aquecimento vocal',
            'Logo após ensaios ou apresentações'
          ],
          respostaCorreta: 'Logo após ensaios ou apresentações'
        },
        {
          id: '4',
          texto: 'Explique por que o desaquecimento vocal é importante após o uso intenso da voz.',
          tipo: 'aberta',
          respostaCorreta: 'Porque ajuda a relaxar os músculos vocais, evita fadiga e preserva a saúde das pregas vocais.'
        },
        {
          id: '5',
          texto: 'Cite dois exercícios usados no aquecimento vocal e dois no desaquecimento vocal.',
          tipo: 'aberta',
          respostaCorreta: 'Aquecimento: vibração de língua ou lábios, glissando; Desaquecimento: sons de murmúrio, sopro articulado em "F" ou "S".'
        }
      ];
      
    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-4.md" />
            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M1A5 = () => {
    const perguntas = [
        {
          id: '1',
          texto: 'Qual tipo de respiração é mais indicado para o canto?',
          tipo: 'fechada',
          opcoes: [
            'Respiração torácica',
            'Respiração costo-diafragmática-abdominal'
          ],
          respostaCorreta: 'Respiração costo-diafragmática-abdominal'
        },
        {
          id: '2',
          texto: 'Por que a inspiração deve ser feita pela boca durante o canto?',
          tipo: 'fechada',
          opcoes: [
            'Porque a boca aquece o ar inspirado',
            'Porque permite uma entrada rápida e eficiente de ar'
          ],
          respostaCorreta: 'Porque permite uma entrada rápida e eficiente de ar'
        },
        {
          id: '3',
          texto: 'O que acontece com o abdômen durante a inspiração correta no canto?',
          tipo: 'fechada',
          opcoes: [
            'Ele se contrai',
            'Ele se expande'
          ],
          respostaCorreta: 'Ele se expande'
        },
        {
          id: '4',
          texto: 'Explique o que é a respiração costo-diafragmática-abdominal e por que ela é importante para o canto.',
          tipo: 'aberta',
          respostaCorreta: 'É a respiração que utiliza o diafragma, o abdômen e as costelas, proporcionando maior controle, sustentação e eficiência vocal.'
        },
        {
          id: '5',
          texto: 'Cite dois benefícios diretos da respiração correta para a voz do cantor.',
          tipo: 'aberta',
          respostaCorreta: 'Aumenta a resistência vocal e melhora a projeção sem esforço excessivo.'
        }
      ];
      
    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-5.md" />
            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M1A6 = () => {
    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-6.md" />
        </main>
    );
};

export const M1A7 = () => {
    return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-7.md" />
        </main>);
};