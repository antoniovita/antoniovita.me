---
title: "A IA Bateu no Teto? A Próxima Revolução Está Além das LLMs"
summary: "Como os harnesses e os modelos de decisão estão deslocando parte da evolução da inteligência artificial para os sistemas que organizam, verificam e executam o trabalho."
date: "2026-11-04"
categories: [ia, engenharia]
cover: "/articles/harness-ai.png"
coverAlt: "Placa com o nome Anthropic na fachada de um prédio de escritórios, com reflexo de luz do sol"
draft: false
---

Nos últimos anos, a evolução da inteligência artificial foi apresentada como uma corrida por escala. Mais dados, mais capacidade computacional e modelos maiores alimentaram a expectativa de que cada nova geração produziria um salto evidente de inteligência.

Essa lógica colocou o treinamento no centro da disputa. A pergunta era quanto maior um modelo poderia se tornar e quais capacidades surgiriam dessa expansão.

Mas transformar capacidade em trabalho exige outras peças. Um modelo pode escrever um programa e não verificar se ele funciona. Pode produzir uma análise convincente com informações desatualizadas. Pode resolver etapas de um projeto e perder decisões importantes antes de chegar ao fim.

É nesse espaço que os harnesses ganham relevância.

Um harness é a estrutura de software que organiza a atuação de um modelo: conecta ferramentas, administra o contexto, registra o progresso e coordena o ciclo entre decisões, ações e resultados.

A ascensão dessa camada, acompanhada pelo surgimento de modelos especializados em decisões, sugere uma mudança de direção. Parte da evolução da IA passa a depender de como suas capacidades são organizadas durante o uso.

Isso não demonstra que os LLMs pararam de evoluir. Mostra que treinar um modelo maior é apenas uma das formas de construir um sistema melhor.

## Os limites da corrida por escala

A hipótese de que os modelos chegaram a um teto definitivo precisa ser tratada com cuidado. Não existe uma demonstração de que a evolução dos LLMs tenha terminado abruptamente. Existem restrições à continuidade de determinadas estratégias de expansão.

Uma delas é a disponibilidade de dados. Em um estudo atualizado em 2024, pesquisadores da Epoch AI estimaram que, mantidas certas tendências, os conjuntos de treinamento poderiam alcançar o tamanho do estoque disponível de texto público produzido por humanos entre 2026 e 2032. O trabalho também discute caminhos para continuar avançando, como dados sintéticos e melhorias na eficiência do aprendizado. ([Villalobos et al.](https://arxiv.org/abs/2211.04325))

O problema, portanto, é como sustentar o progresso quando ampliar os recursos exige novas soluções.

Também há uma diferença entre desempenho técnico e utilidade econômica. Um sistema que resolve uma tarefa após muitas tentativas pode ser interessante como demonstração, mas precisa justificar seu custo para se tornar parte de uma operação cotidiana.

Para uma empresa, essa diferença aparece em uma pergunta concreta: quanto custa entregar o resultado correto, considerando tempo, revisão e retrabalho?

Essa perspectiva amplia a competição. Além da capacidade do modelo, passam a importar a informação disponível, a seleção de ferramentas e a forma como o sistema identifica e corrige erros.

## Harnesses como infraestrutura de execução

Quando um modelo solicita uma busca, algum software precisa realizá-la. Quando pede a execução de um código, é necessário fornecer um ambiente. Quando uma ferramenta retorna um erro, esse resultado precisa voltar ao modelo para orientar o próximo passo.

O harness coordena esse processo.

Em uma descrição de sua infraestrutura para agentes, a Anthropic define essa camada como o mecanismo que chama o modelo e encaminha suas solicitações de ferramentas à infraestrutura correspondente. ([Anthropic](https://www.anthropic.com/research/managed-agents))

Na prática, isso permite transformar uma interação em uma sequência de trabalho.

Imagine um pedido para analisar documentos financeiros. O sistema pode localizar arquivos, extrair dados, executar cálculos, comparar períodos e verificar se as conclusões possuem suporte nas fontes.

Cada etapa exige coordenação. Um documento ausente pode exigir uma nova busca. Uma tabela inconsistente pode demandar revisão. Uma conclusão sem evidência precisa ser identificada antes da entrega.

O desempenho observado passa a depender da combinação entre o modelo e esse processo.

Em um relato sobre agentes de programação, a Anthropic descreveu problemas como tentar implementar um projeto inteiro de uma vez ou declarar a tarefa concluída antes de cumprir todos os requisitos. A abordagem apresentada utilizava preparação do ambiente, trabalho incremental e registros que permitiam retomar o progresso entre sessões. ([Anthropic](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents))

O avanço, nesse caso, envolve criar condições para que capacidades existentes sejam utilizadas com continuidade.

### Tools: como a resposta do modelo vira uma ação

Em uma interação textual, um LLM recebe informações e gera uma saída em forma de texto ou conteúdo estruturado. Ele pode escrever um comando, produzir código ou solicitar uma ferramenta. A execução depende do software conectado ao modelo.

Essa distinção ajuda a entender o funcionamento dos agentes. Escrever uma instrução para consultar um arquivo não significa que o arquivo foi consultado. Para isso, o harness precisa receber a solicitação, executar a operação e devolver o resultado ao modelo.

É aí que entram as *tools*, ou ferramentas: funções que permitem pesquisar na internet, ler documentos, consultar bancos de dados, executar cálculos ou editar arquivos. O modelo solicita uma operação; o sistema a executa e retorna informações para orientar a próxima decisão. Esse ciclo é parte central da infraestrutura descrita pela Anthropic para seus agentes. ([Anthropic](https://www.anthropic.com/research/managed-agents))

Imagine uma análise de vendas. O modelo pode solicitar os registros de determinado período. Uma ferramenta consulta o banco de dados, outra executa os cálculos e o modelo interpreta os resultados para elaborar a análise.

A capacidade de agir surge dessa integração. O texto gerado pelo LLM participa de um processo controlado por software, com acesso a recursos e critérios de execução.

Essa explicação exige uma ressalva: existem modelos multimodais capazes de processar ou gerar imagens, áudio e outras modalidades. Mesmo nesses casos, realizar operações em sistemas externos depende de uma integração que execute as ações solicitadas.

### Subagentes: como dividir o trabalho

Os *subagents*, ou subagentes, permitem distribuir partes de uma tarefa entre diferentes execuções de um modelo. Cada uma pode receber um objetivo delimitado, um contexto próprio e ferramentas adequadas à sua função.

Um agente principal pode, por exemplo, coordenar uma pesquisa enquanto subagentes examinam documentos distintos. Depois, os resultados retornam para comparação e elaboração da resposta. Um subagente não exige necessariamente outro modelo: a mesma LLM pode ser utilizada em várias execuções com responsabilidades diferentes.

Essa divisão pode ser útil quando as atividades são independentes. Analisar conjuntos separados de documentos permite distribuir trabalho sem exigir que cada participante acompanhe todas as decisões dos demais.

Mas a coordenação também tem custo. Os resultados precisam ser transmitidos, conferidos e integrados. Quando uma etapa depende fortemente da anterior, dividir a execução pode aumentar a demora e perder contexto. Akita critica justamente a adoção automática de arquiteturas com muitos agentes, defendendo que a complexidade precisa ser justificada pelo problema e pelo resultado observado. ([Akita](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/))

Tools e subagentes ajudam a tornar concreta a mudança de direção da IA. O avanço passa a envolver decisões sobre quais recursos utilizar, como distribuir tarefas e como verificar o que foi feito. O modelo continua essencial, enquanto o harness organiza as condições para transformar suas saídas em trabalho executado.

## Fábio Akita e a diferença entre capacidade e resultado

Fábio Akita oferece uma leitura relevante dessa mudança. Ao relatar seu próprio experimento de treinamento, ele defende um futuro com modelos menores e especializados, apoiados por agentes capazes de buscar informações e utilizar ferramentas durante o trabalho.

Nessa interpretação, um modelo pode concentrar capacidade em um domínio e consultar documentos, dados recentes e recursos externos quando necessário. Akita também reconhece a distância entre gerar código plausível e atuar de forma confiável em um projeto. ([Akita, “Treinei meu próprio modelo de IA”](https://akitaonrails.github.io/2026/10/14/treinei-meu-proprio-modelo-de-ia-spoiler-e-so-pra-estudo/))

Sua posição, porém, inclui uma crítica ao entusiasmo em torno dos harnesses. Em outro artigo, ele questiona a transformação de práticas conhecidas de software em novas disciplinas e recomenda exigir evidências de ganho antes de acrescentar camadas de orquestração. ([Akita, “Hot take: Harness, Loop Engineering, Graph Engineering são Bullshit”](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/))

Essa ressalva ajuda a definir o debate. O valor de um harness precisa aparecer no resultado: menos falhas, melhor continuidade ou menor custo. A quantidade de componentes e o desenho da arquitetura, isoladamente, não comprovam avanço.

## Jev e a ascensão dos modelos de decisão

O Jev, apresentado pela TypeSafe AI em setembro de 2026, representa outra peça dessa transformação.

Sua proposta é produzir decisões estruturadas a partir de um contexto e de perguntas delimitadas. Em vez de redigir uma explicação aberta, ele pode escolher entre opções, atribuir uma pontuação ou estimar a probabilidade de uma afirmação.

A empresa apresenta esse tipo de sistema como um modelo *System One*, voltado a julgamentos rápidos que o software pode utilizar diretamente. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

Essa abordagem atende a uma necessidade recorrente dos agentes. Muitas etapas de um processo exigem escolher uma ferramenta, classificar uma solicitação ou decidir se a evidência disponível é suficiente.

Por exemplo, em um atendimento, o sistema pode precisar identificar se uma mensagem trata de cobrança, suporte técnico ou cancelamento. A elaboração da resposta pode ficar com um modelo generativo, enquanto a classificação é atribuída a um componente especializado.

Jev é um modelo que pode participar do harness. O harness continua responsável por organizar o fluxo e determinar o que acontece depois da decisão.

Há uma limitação importante: uma resposta dentro do formato permitido ainda pode estar errada. Akita destaca essa distinção em sua análise da TypeSafe, reconhecendo a utilidade da classificação rápida e questionando a associação entre saída estruturada e ausência de erros. ([Akita, “Por que coisas como TypeSafe IA não me interessam”](https://akitaonrails.github.io/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/))

## Clef, Clef-flash e AgentDecision-4B

O surgimento de outros modelos mostra que essa proposta começa a formar uma categoria.

Em outubro de 2026, a Cloudflare anunciou Clef e Clef-flash, modelos de decisão disponibilizados com pesos abertos sob licença Apache 2.0. A empresa descreve aplicações como classificação, encaminhamento de solicitações e decisões baseadas em probabilidades. ([Cloudflare](https://blog.cloudflare.com/clef-decision-models/))

A relevância dessa abordagem está na divisão do trabalho. Um sistema pode utilizar código convencional para regras exatas, um modelo especializado para classificações e um LLM para tarefas abertas de interpretação e geração.

A pesquisa JevAgentHarness explora essa divisão. Os autores propõem delegar determinadas escolhas a modelos de decisão, mantendo o LLM como alternativa quando a confiança é insuficiente. O trabalho também apresenta o AgentDecision-4B, treinado para lidar com estados encontrados durante a execução de agentes.

Nos cenários semelhantes aos dados de treinamento avaliados, os pesquisadores relataram reduções de custo entre 81,1% e 89,0% e aceleração de até 2,5 vezes, com perda inferior a três pontos percentuais na taxa de sucesso. São resultados de um preprint em condições específicas, que precisam ser distinguidos de uma garantia geral de desempenho. ([Zhu et al.](https://arxiv.org/abs/2610.21412))

O mesmo estudo encontrou queda de sucesso ao delegar decisões sem ajustar adequadamente os critérios de confiança. A especialização exige coordenação e avaliação do processo completo.

## Do treinamento ao desenho do sistema

Esses exemplos sustentam uma interpretação: parte da fronteira de evolução da IA está se deslocando para o sistema que utiliza os modelos.

O treinamento continua essencial. Jev, Clef e AgentDecision-4B também são produtos de treinamento, com objetivos próprios. A mudança está em ampliar a unidade de otimização: além do modelo isolado, passa-se a melhorar a combinação entre modelos, ferramentas, memória e critérios de decisão.

Outra frente é o uso de computação durante a resolução. Uma pesquisa de Charlie Snell e colaboradores mostrou que distribuir recursos adicionais nessa etapa pode melhorar resultados, dependendo da dificuldade da tarefa. Em determinadas condições estudadas, um modelo menor conseguiu superar outro 14 vezes maior. ([Snell et al.](https://arxiv.org/abs/2408.03314))

Isso sugere um futuro em que o sistema decide onde concentrar esforço. Uma classificação simples pode receber uma solução rápida. Um problema ambíguo pode exigir análise mais extensa, novas buscas ou revisão humana.

Como consequência, avaliar IA exigirá olhar para o trabalho concluído: sua qualidade, seu custo e a frequência com que precisa de correção.

Essa é a mudança de direção que os harnesses tornam visível. A capacidade disponível dentro de um modelo precisa encontrar uma estrutura capaz de utilizá-la bem.

## Conclusão

Os LLMs não têm um teto definitivo demonstrado. Mas os limites de depender apenas da expansão dos modelos tornam mais relevante a busca por outras formas de progresso.

Harnesses organizam a execução. Modelos de decisão, como Jev, Clef e Clef-flash, permitem especializar partes do processo. Pesquisas como JevAgentHarness investigam como combinar esses componentes sem comprometer o resultado.

A próxima fase da IA poderá avançar pela soma dessas melhorias: modelos mais capazes, decisões mais eficientes e processos que consigam verificar o próprio trabalho.

No fim, a disputa será medida pela capacidade de transformar inteligência disponível em resultados confiáveis.

## Referências

AKITA, Fábio. [*Treinei meu próprio modelo de IA (Spoiler: é só pra estudo).*](https://akitaonrails.github.io/2026/10/14/treinei-meu-proprio-modelo-de-ia-spoiler-e-so-pra-estudo/) AkitaOnRails, 14 out. 2026.

AKITA, Fábio. [*Hot take: Harness, Loop Engineering, Graph Engineering são Bullshit.*](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/) AkitaOnRails, 18 ago. 2026.

AKITA, Fábio. [*Por que coisas como TypeSafe IA não me interessam.*](https://akitaonrails.github.io/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/) AkitaOnRails, 16 set. 2026.

ANTHROPIC. [*Effective harnesses for long-running agents.*](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) 26 nov. 2025.

ANTHROPIC. [*Scaling Managed Agents: Decoupling the brain from the hands.*](https://www.anthropic.com/research/managed-agents) 8 abr. 2026.

CHEN, Michelle; RENEAU, Alex; FLANSBURG, Kevin. [*Introducing Clef: our open-source decision models, and new RL fine-tuning platform.*](https://blog.cloudflare.com/clef-decision-models/) Cloudflare, 1 out. 2026.

SNELL, Charlie et al. [*Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters.*](https://arxiv.org/abs/2408.03314) arXiv, 2024.

TYPESAFE AI. [*Introducing System One Models & Jev.*](https://typesafe.ai/blog/introducing-system-one-models-and-jev) 15 set. 2026.

VILLALOBOS, Pablo et al. [*Will we run out of data? Limits of LLM scaling based on human-generated data.*](https://arxiv.org/abs/2211.04325) arXiv, versão atualizada em 2024.

ZHU, Kunlun et al. [*JevAgentHarness: Benchmarking, Deploying and Training Decision Models That Share Control with LLMs.*](https://arxiv.org/abs/2610.21412) arXiv, preprint, 15 out. 2026.
