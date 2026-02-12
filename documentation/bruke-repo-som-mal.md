# Hvordan bruke denne repoen som en mal

Denne guiden vil hjelpe deg med å bruke denne repoen som en mal for å lage din egen FHIR Implementation Guide (IG) ved å bruke GitHubs "Use this template" funksjon og GitHub Actions for generering.

## Trinn 1: Bruk repoen som en mal

![Use this template](use-this-template.png)

1. Gå til [HL7Norway/ig-mal](https://github.com/HL7Norway/ig-mal) repoen på GitHub.
2. Klikk på den grønne "Use this template"-knappen øverst til høyre
3. Velg "Create a new repository" fra rullegardinmenyen.

## Trinn 2: Opprett et nytt repository

1. Skriv inn et nytt repo-navn for din IG, for eksempel `min-ig`.
2. Legg til en beskrivelse hvis ønskelig.
3. Velg om repoen skal være offentlig eller privat.
4. Klikk på den grønne "Create repository from template"-knappen.

## Trinn 3: Oppdater konfigurasjon

**Viktig:** Du må oppdatere flere filer for å tilpasse malen til ditt prosjekt.

### 3.1 Oppdater `sushi-config.yaml`

Åpne `mal/sushi-config.yaml` og endre følgende felter:

```yaml
id: ditt.fhir.ig.navn           # Endre fra hl7.fhir.no.mal
canonical: http://example.org/fhir/din-ig
name: DinIG                     # Endre fra Mal
title: "Din Implementation Guide"
description: "Beskrivelse av din IG"  # Endre fra TODO
publisher:
  name: Din Organisasjon        # Endre fra HL7 Norge
  url: https://www.example.org
```

### 3.2 Oppdater miljøvariabel i GitHub Actions

Åpne `.github/workflows/ig-gh-pages.yml` og `.github/workflows/validate-fsh.yml`, og endre:

```yaml
env:
  IG_SHORTNAME: ditt-ig-navn    # Endre fra 'mal'
```

### 3.3 Flytt eller gi nytt navn til `mal/`-mappen

Du bør endre navnet på `mal/`-mappen til noe som passer ditt prosjekt, f.eks. `min-ig/`.  
Husk å oppdatere `IG_SHORTNAME` i GitHub Actions tilsvarende.

## Trinn 4: Tilpass FSH-innhold

### 4.1 Rediger profiler

Rediger eller erstatt FSH-filene i `[ditt-mappenavn]/input/fsh/profiles/`:

- `mal-Patient.fsh` → gi nytt navn og tilpass innhold
- `mal-Observation-blodprove.fsh` → erstatt med dine egne profiler

### 4.2 Oppdater aliaser

Sjekk `[ditt-mappenavn]/input/fsh/aliases.fsh` og legg til aliaser du trenger.

## Trinn 5: Oppdater innhold og dokumentasjon

### 5.1 Rediger hovedsiden

Oppdater `[ditt-mappenavn]/input/pagecontent/index.md` med informasjon om din IG.

### 5.2 Legg til eksempler

Du kan lage eksempler på to måter:

- **I FSH-profiler:** Som `Instance`-objekter i samme fil som profilen (anbefalt for maler)
- **Separate filer:** Opprett `input/examples/` og legg JSON/XML-eksempler der

## Trinn 6: Test og valider

### 6.1 Aktiver GitHub Actions

GitHub Actions er allerede konfigurert, men du må kanskje aktivere dem:

1. Gå til "Settings" → "Actions" → "General" i din repo
2. Sørg for at "Allow all actions and reusable workflows" er valgt

### 6.2 Test validering

1. Gå til "Actions"-fanen i din repo
2. Velg "Validate FSH Files"
3. Klikk "Run workflow" → "Run workflow"
4. Sjekk at valideringen kjører uten feil

## Trinn 7: Publiser din IG

1. Gå til "Actions"-fanen
2. Velg workflowen "Build and Deploy IG to GitHub Pages"  
3. Klikk "Run workflow" for å generere og publisere
4. Etter vellykket kjøring, aktiver GitHub Pages:
   - Gå til "Settings" → "Pages"
   - Velg "Deploy from a branch" → `gh-pages` → `/root`
   - Din IG vil være tilgjengelig på `https://[ditt-brukernavn].github.io/[repo-navn]/`

## Checklist for oppsett

For å sikre at du har fulgt alle trinn:

- [ ] Opprettet repo fra template
- [ ] Oppdatert `sushi-config.yaml` med dine verdier
- [ ] Endret `IG_SHORTNAME` i `.github/workflows/`-filene
- [ ] Gitt nytt navn til `mal/`-mappen (valgfritt, men anbefalt)
- [ ] Tilpasset FSH-profiler og eksempler
- [ ] Oppdatert `index.md` med din dokumentasjon
- [ ] Testet FSH-validering i GitHub Actions
- [ ] Kjørt IG-generering og aktivert GitHub Pages

## Eksempel på komplett sushi-config.yaml

```yaml
id: din.organisasjon.fhir.ig.navn
canonical: http://din-organisasjon.no/fhir/ig/ditt-navn
name: DittIGNavn
title: "Ditt IG Tittel"
description: "Detaljert beskrivelse av implementasjonsguiden din"
status: draft
version: 0.1.0
fhirVersion: 4.0.1
copyrightYear: 2025+
releaseLabel: ci-build
jurisdiction: urn:iso:std:iso:3166#NO "Norway"
publisher:
  name: Din Organisasjon
  url: https://www.din-organisasjon.no
dependencies:
  hl7.fhir.no.basis: 2.2.0
menu:
  Hjem: index.html
  Artefakter: artifacts.html
  Innhold: toc.html
```

## Vanlige problemer og løsninger

- **GitHub Actions feiler:** Sjekk at `IG_SHORTNAME` matcher mappenavnet ditt
- **FSH-validering feiler:** Kontroller at alle profiler har riktige referanser
- **IG genereres ikke:** Sørg for at `sushi-config.yaml` er korrekt utfylt
- **GitHub Pages vises ikke:** Aktiver GitHub Pages i repo-innstillinger
