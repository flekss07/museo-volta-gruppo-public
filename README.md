# Progetto Django - Dettaglio Autore

Questo progetto è un'applicazione Django che mostra i dettagli di un autore e le sue opere.

## Struttura del progetto

- `models.py`: definisce i modelli `Autore` e `Opera`
- `views.py`: contiene la vista `dettaglio_autore` che mostra le info di un autore e le opere collegate
- `templates/dettaglio_autore.html`: il template HTML per visualizzare le informazioni

## Funzionalità

- Visualizzazione dei dati di un autore (nome, date, descrizione, foto)
- Elenco delle opere associate
- Link per tornare alla lista degli autori e alla home

## Nota

Il codice è pronto per essere integrato in un progetto Django.  
Per funzionare:
- L'app deve essere registrata in `INSTALLED_APPS`
- Le URL devono essere collegate tramite `urls.py`
