---
title: "L'IA ha toccato il tetto? La prossima rivoluzione va oltre gli LLM"
summary: "Come gli harness e i modelli decisionali stanno spostando parte dell'evoluzione dell'intelligenza artificiale verso i sistemi che organizzano, verificano ed eseguono il lavoro."
date: "2026-11-04"
categories: [ia, engenharia]
cover: "/articles/harness-ai.png"
coverAlt: "Insegna con il nome Anthropic sulla facciata di un edificio per uffici, con il riflesso della luce del sole"
draft: false
---

Negli ultimi anni l'evoluzione dell'intelligenza artificiale è stata raccontata come una corsa alla scala. Più dati, più capacità di calcolo e modelli più grandi hanno alimentato l'aspettativa che ogni nuova generazione producesse un salto evidente di intelligenza.

Questa logica ha messo l'addestramento al centro della competizione. La domanda era quanto grande potesse diventare un modello e quali capacità sarebbero emerse da quell'espansione.

Ma trasformare la capacità in lavoro richiede altri tasselli. Un modello può scrivere un programma senza verificare che funzioni. Può produrre un'analisi convincente a partire da informazioni obsolete. Può risolvere alcune fasi di un progetto e perdere decisioni importanti prima di arrivare in fondo.

È in questo spazio che gli harness acquistano rilevanza.

Un harness è la struttura software che organizza l'azione di un modello: collega gli strumenti, gestisce il contesto, registra i progressi e coordina il ciclo tra decisioni, azioni e risultati.

L'ascesa di questo livello, accompagnata dalla comparsa di modelli specializzati nelle decisioni, suggerisce un cambio di direzione. Parte dell'evoluzione dell'IA comincia a dipendere da come le sue capacità vengono organizzate durante l'uso.

Questo non dimostra che gli LLM abbiano smesso di evolversi. Mostra che addestrare un modello più grande è solo uno dei modi per costruire un sistema migliore.

## I limiti della corsa alla scala

L'ipotesi che i modelli abbiano raggiunto un tetto definitivo va trattata con cautela. Non esiste alcuna dimostrazione che l'evoluzione degli LLM si sia fermata bruscamente. Esistono, invece, vincoli alla continuità di alcune strategie di espansione.

Uno è la disponibilità di dati. In uno studio aggiornato nel 2024, i ricercatori di Epoch AI hanno stimato che, se certe tendenze si mantenessero, i dataset di addestramento potrebbero raggiungere la dimensione dello stock disponibile di testo pubblico prodotto da esseri umani tra il 2026 e il 2032. Il lavoro discute anche le strade per continuare ad avanzare, come i dati sintetici e i miglioramenti nell'efficienza dell'apprendimento. ([Villalobos et al.](https://arxiv.org/abs/2211.04325))

Il problema, quindi, è come sostenere il progresso quando ampliare le risorse richiede nuove soluzioni.

C'è poi una differenza tra prestazione tecnica e utilità economica. Un sistema che risolve un compito dopo molti tentativi può essere interessante come dimostrazione, ma deve giustificare il proprio costo per entrare a far parte di un'operatività quotidiana.

Per un'azienda, questa differenza si traduce in una domanda concreta: quanto costa consegnare il risultato corretto, considerando tempo, revisione e rilavorazioni?

Questa prospettiva allarga la competizione. Oltre alla capacità del modello, contano l'informazione disponibile, la selezione degli strumenti e il modo in cui il sistema individua e corregge gli errori.

## Gli harness come infrastruttura di esecuzione

Quando un modello richiede una ricerca, qualche software deve eseguirla. Quando chiede di eseguire del codice, serve un ambiente in cui farlo. Quando uno strumento restituisce un errore, quel risultato deve tornare al modello per orientare il passo successivo.

L'harness coordina questo processo.

In una descrizione della propria infrastruttura per agenti, Anthropic definisce questo livello come il meccanismo che chiama il modello e inoltra le sue richieste di strumenti all'infrastruttura corrispondente. ([Anthropic](https://www.anthropic.com/research/managed-agents))

In pratica, questo permette di trasformare un'interazione in una sequenza di lavoro.

Si immagini la richiesta di analizzare dei documenti finanziari. Il sistema può individuare i file, estrarre i dati, eseguire calcoli, confrontare i periodi e verificare che le conclusioni trovino sostegno nelle fonti.

Ogni fase richiede coordinamento. Un documento mancante può richiedere una nuova ricerca. Una tabella incoerente può richiedere una revisione. Una conclusione priva di evidenze va individuata prima della consegna.

La prestazione osservata dipende così dalla combinazione tra il modello e questo processo.

In un resoconto sugli agenti di programmazione, Anthropic ha descritto problemi come il tentativo di implementare un intero progetto in una volta sola o la dichiarazione di compito concluso prima di aver soddisfatto tutti i requisiti. L'approccio presentato prevedeva la preparazione dell'ambiente, un lavoro incrementale e registri che permettevano di riprendere i progressi tra una sessione e l'altra. ([Anthropic](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents))

Il progresso, in questo caso, consiste nel creare le condizioni perché le capacità esistenti siano usate con continuità.

### Tools: come la risposta del modello diventa un'azione

In un'interazione testuale, un LLM riceve informazioni e genera un output sotto forma di testo o di contenuto strutturato. Può scrivere un comando, produrre codice o richiedere uno strumento. L'esecuzione dipende dal software collegato al modello.

Questa distinzione aiuta a capire come funzionano gli agenti. Scrivere un'istruzione per consultare un file non significa che il file sia stato consultato. Perché accada, l'harness deve ricevere la richiesta, eseguire l'operazione e restituire il risultato al modello.

È qui che entrano in gioco i *tools*, ovvero gli strumenti: funzioni che permettono di cercare su internet, leggere documenti, interrogare database, eseguire calcoli o modificare file. Il modello richiede un'operazione; il sistema la esegue e restituisce informazioni per orientare la decisione successiva. Questo ciclo è una parte centrale dell'infrastruttura descritta da Anthropic per i suoi agenti. ([Anthropic](https://www.anthropic.com/research/managed-agents))

Si immagini un'analisi delle vendite. Il modello può richiedere i registri di un determinato periodo. Uno strumento interroga il database, un altro esegue i calcoli e il modello interpreta i risultati per elaborare l'analisi.

La capacità di agire nasce da questa integrazione. Il testo generato dall'LLM partecipa a un processo controllato dal software, con accesso a risorse e criteri di esecuzione.

Questa spiegazione richiede una precisazione: esistono modelli multimodali in grado di elaborare o generare immagini, audio e altre modalità. Anche in questi casi, svolgere operazioni su sistemi esterni dipende da un'integrazione che esegua le azioni richieste.

### Subagent: come dividere il lavoro

I *subagents*, o subagent, permettono di distribuire parti di un compito tra diverse esecuzioni di un modello. Ciascuna può ricevere un obiettivo circoscritto, un contesto proprio e strumenti adatti alla sua funzione.

Un agente principale può, per esempio, coordinare una ricerca mentre i subagent esaminano documenti diversi. Poi i risultati tornano indietro per essere confrontati e usati nella stesura della risposta. Un subagent non richiede necessariamente un altro modello: lo stesso LLM può essere usato in più esecuzioni con responsabilità diverse.

Questa suddivisione può essere utile quando le attività sono indipendenti. Analizzare insiemi separati di documenti permette di distribuire il lavoro senza che ogni partecipante debba seguire tutte le decisioni degli altri.

Ma anche il coordinamento ha un costo. I risultati vanno trasmessi, verificati e integrati. Quando una fase dipende fortemente dalla precedente, dividere l'esecuzione può aumentare i tempi e far perdere contesto. Akita critica proprio l'adozione automatica di architetture con molti agenti, sostenendo che la complessità debba essere giustificata dal problema e dal risultato osservato. ([Akita](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/))

Tools e subagent aiutano a rendere concreto il cambio di direzione dell'IA. Il progresso passa a coinvolgere decisioni su quali risorse usare, come distribuire i compiti e come verificare quanto è stato fatto. Il modello resta essenziale, mentre l'harness organizza le condizioni per trasformare i suoi output in lavoro eseguito.

## Fábio Akita e la differenza tra capacità e risultato

Fábio Akita offre una lettura rilevante di questo cambiamento. Raccontando il proprio esperimento di addestramento, difende un futuro fatto di modelli più piccoli e specializzati, sostenuti da agenti in grado di cercare informazioni e usare strumenti durante il lavoro.

In questa interpretazione, un modello può concentrare la capacità in un dominio e consultare documenti, dati recenti e risorse esterne quando necessario. Akita riconosce anche la distanza tra generare codice plausibile e operare in modo affidabile su un progetto. ([Akita, "Treinei meu próprio modelo de IA"](https://akitaonrails.github.io/2026/10/14/treinei-meu-proprio-modelo-de-ia-spoiler-e-so-pra-estudo/))

La sua posizione, tuttavia, include una critica all'entusiasmo che circonda gli harness. In un altro articolo mette in discussione la trasformazione di pratiche note del software in nuove discipline e raccomanda di pretendere evidenze di guadagno prima di aggiungere livelli di orchestrazione. ([Akita, "Hot take: Harness, Loop Engineering, Graph Engineering são Bullshit"](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/))

Questa riserva aiuta a definire il dibattito. Il valore di un harness deve emergere nel risultato: meno errori, migliore continuità o costi inferiori. Il numero di componenti e il disegno dell'architettura, da soli, non dimostrano un progresso.

## Jev e l'ascesa dei modelli decisionali

Jev, presentato da TypeSafe AI nel settembre 2026, rappresenta un altro tassello di questa trasformazione.

La sua proposta è produrre decisioni strutturate a partire da un contesto e da domande circoscritte. Invece di redigere una spiegazione aperta, può scegliere tra diverse opzioni, assegnare un punteggio o stimare la probabilità di un'affermazione.

L'azienda presenta questo tipo di sistema come un modello *System One*, pensato per giudizi rapidi che il software può usare direttamente. ([TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev))

Questo approccio risponde a un'esigenza ricorrente degli agenti. Molte fasi di un processo richiedono di scegliere uno strumento, classificare una richiesta o decidere se le evidenze disponibili siano sufficienti.

Per esempio, in un servizio clienti il sistema potrebbe dover identificare se un messaggio riguarda la fatturazione, l'assistenza tecnica o una disdetta. La stesura della risposta può restare a un modello generativo, mentre la classificazione viene affidata a un componente specializzato.

Jev è un modello che può partecipare all'harness. L'harness resta responsabile di organizzare il flusso e di stabilire cosa accade dopo la decisione.

C'è un limite importante: una risposta nel formato consentito può comunque essere sbagliata. Akita sottolinea questa distinzione nella sua analisi di TypeSafe, riconoscendo l'utilità della classificazione rapida e mettendo in discussione l'associazione tra output strutturato e assenza di errori. ([Akita, "Por que coisas como TypeSafe IA não me interessam"](https://akitaonrails.github.io/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/))

## Clef, Clef-flash e AgentDecision-4B

La comparsa di altri modelli mostra che questa proposta comincia a formare una categoria.

Nell'ottobre 2026 Cloudflare ha annunciato Clef e Clef-flash, modelli decisionali resi disponibili con pesi aperti sotto licenza Apache 2.0. L'azienda descrive applicazioni come la classificazione, l'instradamento delle richieste e le decisioni basate su probabilità. ([Cloudflare](https://blog.cloudflare.com/clef-decision-models/))

La rilevanza di questo approccio sta nella divisione del lavoro. Un sistema può usare codice convenzionale per le regole esatte, un modello specializzato per le classificazioni e un LLM per i compiti aperti di interpretazione e generazione.

La ricerca JevAgentHarness esplora proprio questa divisione. Gli autori propongono di delegare alcune scelte a modelli decisionali, mantenendo l'LLM come alternativa quando la confidenza è insufficiente. Il lavoro presenta anche AgentDecision-4B, addestrato a gestire gli stati incontrati durante l'esecuzione degli agenti.

Negli scenari simili ai dati di addestramento valutati, i ricercatori hanno riportato riduzioni dei costi tra l'81,1% e l'89,0% e un'accelerazione fino a 2,5 volte, con un calo inferiore a tre punti percentuali nel tasso di successo. Sono risultati di un preprint in condizioni specifiche, da distinguere da una garanzia generale di prestazione. ([Zhu et al.](https://arxiv.org/abs/2610.21412))

Lo stesso studio ha rilevato un calo del successo quando le decisioni venivano delegate senza regolare adeguatamente i criteri di confidenza. La specializzazione richiede coordinamento e valutazione dell'intero processo.

## Dall'addestramento al disegno del sistema

Questi esempi sostengono un'interpretazione: parte della frontiera dell'evoluzione dell'IA si sta spostando verso il sistema che utilizza i modelli.

L'addestramento resta essenziale. Anche Jev, Clef e AgentDecision-4B sono prodotti di un addestramento, con obiettivi propri. Il cambiamento sta nell'ampliare l'unità di ottimizzazione: oltre al modello isolato, si comincia a migliorare la combinazione tra modelli, strumenti, memoria e criteri decisionali.

Un altro fronte è l'uso di calcolo durante la risoluzione. Una ricerca di Charlie Snell e colleghi ha mostrato che distribuire risorse aggiuntive in questa fase può migliorare i risultati, a seconda della difficoltà del compito. In determinate condizioni studiate, un modello più piccolo è riuscito a superarne un altro 14 volte più grande. ([Snell et al.](https://arxiv.org/abs/2408.03314))

Questo suggerisce un futuro in cui il sistema decide dove concentrare lo sforzo. Una classificazione semplice può ricevere una soluzione rapida. Un problema ambiguo può richiedere un'analisi più estesa, nuove ricerche o una revisione umana.

Di conseguenza, valutare l'IA richiederà di guardare al lavoro concluso: alla sua qualità, al suo costo e alla frequenza con cui ha bisogno di correzioni.

Questo è il cambio di direzione che gli harness rendono visibile. La capacità disponibile dentro un modello deve incontrare una struttura in grado di sfruttarla bene.

## Conclusione

Per gli LLM non è stato dimostrato alcun tetto definitivo. Ma i limiti del dipendere soltanto dall'espansione dei modelli rendono più rilevante la ricerca di altre forme di progresso.

Gli harness organizzano l'esecuzione. I modelli decisionali, come Jev, Clef e Clef-flash, permettono di specializzare parti del processo. Ricerche come JevAgentHarness indagano come combinare questi componenti senza compromettere il risultato.

La prossima fase dell'IA potrà avanzare grazie alla somma di questi miglioramenti: modelli più capaci, decisioni più efficienti e processi in grado di verificare il proprio lavoro.

In fin dei conti, la sfida si misurerà sulla capacità di trasformare l'intelligenza disponibile in risultati affidabili.

## Riferimenti

AKITA, Fábio. [*Treinei meu próprio modelo de IA (Spoiler: é só pra estudo).*](https://akitaonrails.github.io/2026/10/14/treinei-meu-proprio-modelo-de-ia-spoiler-e-so-pra-estudo/) AkitaOnRails, 14 ott. 2026.

AKITA, Fábio. [*Hot take: Harness, Loop Engineering, Graph Engineering são Bullshit.*](https://akitaonrails.github.io/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/) AkitaOnRails, 18 ago. 2026.

AKITA, Fábio. [*Por que coisas como TypeSafe IA não me interessam.*](https://akitaonrails.github.io/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/) AkitaOnRails, 16 set. 2026.

ANTHROPIC. [*Effective harnesses for long-running agents.*](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) 26 nov. 2025.

ANTHROPIC. [*Scaling Managed Agents: Decoupling the brain from the hands.*](https://www.anthropic.com/research/managed-agents) 8 apr. 2026.

CHEN, Michelle; RENEAU, Alex; FLANSBURG, Kevin. [*Introducing Clef: our open-source decision models, and new RL fine-tuning platform.*](https://blog.cloudflare.com/clef-decision-models/) Cloudflare, 1 ott. 2026.

SNELL, Charlie et al. [*Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters.*](https://arxiv.org/abs/2408.03314) arXiv, 2024.

TYPESAFE AI. [*Introducing System One Models & Jev.*](https://typesafe.ai/blog/introducing-system-one-models-and-jev) 15 set. 2026.

VILLALOBOS, Pablo et al. [*Will we run out of data? Limits of LLM scaling based on human-generated data.*](https://arxiv.org/abs/2211.04325) arXiv, versione aggiornata nel 2024.

ZHU, Kunlun et al. [*JevAgentHarness: Benchmarking, Deploying and Training Decision Models That Share Control with LLMs.*](https://arxiv.org/abs/2610.21412) arXiv, preprint, 15 ott. 2026.
