import MarkdownRenderer from "../Components/MarkdownRenderer";
import PerguntasForm from "../Components/PerguntasForm";

export const M3A1 = () =>
{
const perguntas = [
    {
        id: '101',
        texto: 'O que são registros vocais?',
        tipo: 'aberta',
        respostaCorreta: 'São formas distintas de vibração das pregas vocais que geram diferentes qualidades sonoras.'
    },
    {
        id: '102',
        texto: 'Qual registro vocal é mais usado para notas graves?',
        tipo: 'fechada',
        opcoes: ['Voz de cabeça', 'Voz mista', 'Voz de peito'],
        respostaCorreta: 'Voz de peito'
    },
    {
        id: '103',
        texto: 'Para que serve a voz mista na técnica vocal?',
        tipo: 'aberta',
        respostaCorreta: 'Ela suaviza a transição entre a voz de peito e a de cabeça, mantendo uniformidade no timbre.'
    },
    {
        id: '104',
        texto: 'Qual das opções é característica da voz de cabeça?',
        tipo: 'fechada',
        opcoes: ['Vibração torácica', 'Ressonância nas cavidades superiores', 'Uso exclusivo de consoantes'],
        respostaCorreta: 'Ressonância nas cavidades superiores'
    },
    {
        id: '105',
        texto: 'O que é falsete?',
        tipo: 'fechada',
        opcoes: ['Uma voz grave com pressão', 'Um modo de emissão com som leve e arejado', 'Uma técnica de respiração'],
        respostaCorreta: 'Um modo de emissão com som leve e arejado'
    },
    {
        id: '106',
        texto: 'O que caracteriza a mudança de registro vocal?',
        tipo: 'aberta',
        respostaCorreta: 'A mudança na coordenação das pregas vocais, afetando a qualidade sonora e a sensação de ressonância.'
    }
];

return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-3-aula-1.md" />
            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M3A2 = () =>
{
const perguntas = [
    {
        id: '201',
        texto: 'O que são modos fonatórios?',
        tipo: 'aberta',
        respostaCorreta: 'São diferentes formas de funcionamento das pregas vocais durante a emissão do som.'
    },
    {
        id: '202',
        texto: 'Qual modo fonatório apresenta som mais aveludado e com ar?',
        tipo: 'fechada',
        opcoes: ['Tenso', 'Fry', 'Soproso'],
        respostaCorreta: 'Soproso'
    },
    {
        id: '203',
        texto: 'O que caracteriza o modo tenso?',
        tipo: 'aberta',
        respostaCorreta: 'Uma emissão com maior pressão e força, que exige controle para evitar rigidez excessiva.'
    },
    {
        id: '204',
        texto: 'O modo fry pode ser usado para:',
        tipo: 'fechada',
        opcoes: ['Aquecimento vocal', 'Cantar em voz mista', 'Projetar notas agudas'],
        respostaCorreta: 'Aquecimento vocal'
    },
    {
        id: '205',
        texto: 'Qual modo fonatório é mais comum no canto natural e falado?',
        tipo: 'fechada',
        opcoes: ['Modal', 'Tenso', 'Soproso'],
        respostaCorreta: 'Modal'
    },
    {
        id: '206',
        texto: 'Por que é importante treinar diferentes modos fonatórios?',
        tipo: 'aberta',
        respostaCorreta: 'Para ampliar a expressividade vocal, proteger a voz e dominar diferentes estilos de emissão.'
    }
];

return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-3-aula-2.md" />
            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}

export const M3A3 = () =>
{
const perguntas = [
    {
        id: '301',
        texto: 'O que significa escurecer o timbre da voz?',
        tipo: 'aberta',
        respostaCorreta: 'É elevar o palato mole para ampliar a ressonância posterior e gerar um som mais encorpado.'
    },
    {
        id: '302',
        texto: 'Qual ação contribui para uma voz mais clara?',
        tipo: 'fechada',
        opcoes: ['Levantamento do palato mole', 'Abaixamento do palato mole', 'Pressão abdominal'],
        respostaCorreta: 'Abaixamento do palato mole'
    },
    {
        id: '303',
        texto: 'Como é a sensação física da voz escura?',
        tipo: 'aberta',
        respostaCorreta: 'A ressonância é sentida na parte posterior da boca e o som parece mais profundo.'
    },
    {
        id: '304',
        texto: 'O som escuro é favorecido por qual configuração vocal?',
        tipo: 'fechada',
        opcoes: ['Lábios abertos e som frontal', 'Palato mole levantado e ressonância posterior', 'Som nasal com ar'],
        respostaCorreta: 'Palato mole levantado e ressonância posterior'
    },
    {
        id: '305',
        texto: 'Qual benefício o cantor tem ao dominar a variação entre timbre claro e escuro?',
        tipo: 'aberta',
        respostaCorreta: 'Maior controle expressivo e adaptação do timbre ao estilo musical e à emoção interpretativa.'
    },
    {
        id: '306',
        texto: 'Clarear a voz ajuda a obter:',
        tipo: 'fechada',
        opcoes: ['Som mais grave', 'Mais pressão', 'Timbre mais leve e frontal'],
        respostaCorreta: 'Timbre mais leve e frontal'
    }
];

return (
        <main>
            <MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-3-aula-3.md" />
            <PerguntasForm perguntas={perguntas} />
        </main>
    );
}