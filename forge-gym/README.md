# FORGE GYM — App palestra per iPhone

Un diario di palestra **installabile dalla schermata Home di iPhone** tramite Safari, senza App Store, senza account e senza server. L'app funziona anche offline dopo il primo caricamento. Il codice è HTML/CSS/JavaScript puro: **non servono Node, npm né build**.

## Cosa trovi già pronto

- **Giorno 1** (11 voci) e **Giorno 2** (10 voci) trascritti dalle fotografie della scheda, con immagini ritagliate, descrizioni, serie, ripetizioni e recuperi.
- Creazione, duplicazione, modifica ed eliminazione di schede; inserimento dalla libreria o di esercizi personalizzati; riordino esercizi con frecce.
- Durante l'allenamento, per ciascuna serie: pulsanti rapidi per le ripetizioni, kg modificabili manualmente o con +/−, conferma **Fatto** e timer di recupero.
- Carico precedente precompilato nella seduta successiva. Registrazione automatica dopo ogni modifica.
- Storico delle sedute (anche parziali), dashboard con volume, serie e frequenza, progressione di carico per esercizio con grafico.
- **Suggerimento incrementi**: se nell'ultima seduta tutte le serie dell'esercizio sono state completate al limite alto o oltre, con kg positivi, l'app propone **+2,5 kg** o **+5 kg** (a seconda dell'esercizio). Puoi applicare i nuovi carichi alle singole serie o modificarli manualmente.
- Backup esportabile/importabile in JSON per trasferire i dati o conservarli su iCloud Drive.

### Come funziona il pulsante ripetizioni

Una serie prevista **6–8** mostra le scelte rapide **6 | 8 | 10**; una serie **8–10** mostra **8 | 10 | 12**. La conferma **Fatto** distingue i dati preimpostati dalle serie veramente eseguite. Per la **High Chest** sono state riportate due serie distinte (**6–8** e **8–10**).

### Pesi dei manubri

Negli esercizi con due manubri il peso registrato è riferito **al singolo manubrio**; il volume nella dashboard conta entrambi. Suggerimento di +2,5 kg/manubrio significa quindi un aumento complessivo di 5 kg: verifica che l'incremento sia gestibile e che i manubri siano disponibili. Gli altri esercizi memorizzano i kg mostrati dalla macchina o del carico totale registrato.

## Pubblica su GitHub Pages

1. Crea un repository su **https://github.com/new**, per esempio `forge-gym`. Può essere pubblico (GitHub Pages per i repository gratuiti). Non inserire nel repository i tuoi backup degli allenamenti.
2. Apri la cartella `forge-gym` di questo progetto e **carica tutti i suoi file e cartelle direttamente nella radice** del repository: `index.html`, `styles.css`, `app.js`, `core.js`, `seed.js`, `sw.js`, `manifest.webmanifest`, `assets/`, `.nojekyll` e `README.md`.
3. Su GitHub entra in **Settings → Pages → Build and deployment → Deploy from a branch**. Scegli `main`, cartella `/ (root)` e salva.
4. Aspetta che GitHub pubblichi il sito. Di solito l'indirizzo è:

   `https://TUO-USERNAME.github.io/forge-gym/`

   Il nome finale cambia se hai scelto un nome differente per il repository.
5. Apri quell'indirizzo **in Safari su iPhone**. Premi il pulsante **Condividi** e seleziona **Aggiungi alla schermata Home**. Conferma con **Aggiungi**.
6. Apri l'icona **Forge Gym** sulla Home. Il sito si comporta come un'app a schermo intero.

**Nota:** se usi lo ZIP dal computer, *estrai* i file prima di caricarli su GitHub: caricare solo lo ZIP nel repository non pubblica il sito. Per aggiornare l'app, modifica i file e fai commit; il service worker installerà la nuova cache alla successiva visita.

## Prova in locale (opzionale)

Da terminale, nella cartella del progetto:

```sh
python3 -m http.server 8000
```

Poi apri `http://localhost:8000/`. La modalità offline e l'installazione funzionano su `localhost` o HTTPS; GitHub Pages fornisce HTTPS automaticamente.

## Dove vengono salvati i dati?

Nel **localStorage** del browser/PWA, solo sul dispositivo. GitHub Pages ospita il codice e le immagini del catalogo, **non riceve il tuo diario**. La stessa app aperta su un altro telefono o browser non condivide lo storico. Se rimuovi l'icona, cancelli i dati del sito, usi un browser differente o cambi telefono, potresti perdere i progressi. Usa **Impostazioni → Scarica backup** regolarmente e conservalo in File/iCloud; per ripristinarlo usa **Impostazioni → Scegli un file**.

Le fotografie allegate sono usate **solo come fonte per le piccole immagini degli esercizi**. Non sono state incluse le foto intere contenenti nome e altri dati della scheda.

## Prima di affidarti ai suggerimenti

L'algoritmo usa una semplice regola di doppia progressione, non un modello medico o un personal trainer: se **tutte** le serie precedenti sono segnate come fatte, hanno un carico positivo e raggiungono il **limite massimo** previsto, propone il salto configurato. Altrimenti suggerisce di consolidare il carico e le ripetizioni. Sono consigli **facoltativi**, non applicazioni automatiche. Se la tecnica peggiora, c'è dolore o il salto minimo disponibile è troppo grande, non aumentare il peso. Modifica in ogni esercizio la dimensione del salto.

## Struttura

```text
forge-gym/
├── index.html             # Entry point PWA
├── styles.css             # Design responsive iPhone
├── app.js                 # Interfaccia, schede, allenamenti, backup
├── seed.js                # Catalogo e due giornate originali
├── core.js                # Calcoli, storico e progressione
├── sw.js                  # Offline cache
├── manifest.webmanifest   # Installazione Home
├── .nojekyll
└── assets/
    ├── exercises/         # Illustrazioni ritagliate
    └── icons/             # Icone Home/PWA
```

## Miglioramenti possibili

Per un'evoluzione futura: sincronizzazione crittografata tra dispositivi con account, timer personalizzabile, RPE/RIR, grafici stimati di 1RM, impostazioni per la progressione per esercizio e calendario delle sedute. Il presente progetto evita volutamente servizi a pagamento e complessità non necessarie alla versione iniziale.
