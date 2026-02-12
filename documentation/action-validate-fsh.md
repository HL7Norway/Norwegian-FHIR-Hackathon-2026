# Validere FSH-filer

Denne GitHub Actions workflowen er designet for å validere FHIR Shorthand (FSH)-filer i et prosjekt, slik at du slipper å generere ny IG hver gang. I tillegg har noen [online validatorer](https://fshonline.fshschool.org/) problemer hvis man f.eks. benytter seg av no-basis.

Den benytter seg av [fsh-validator](https://github.com/glichtner/fsh-validator) - [se dokumentasjon](https://fsh-validator.readthedocs.io/en/latest/).

## Trigger

Workflowen kan utløses på flere måter:

- **Manuell utløsing** (`workflow_dispatch`) med valgbare parametere
- **Pull requests** som endrer FSH-filer eller sushi-config.yaml
- **Push til main** som endrer FSH-filer eller sushi-config.yaml

## Miljøvariabler

- `IG_SHORTNAME`: mal

**Viktig:** Husk å endre denne til ditt navn på katalogen som IG'en ligger i når du bruker malen.

## Manuelle kjøringsvalg

Når du kjører workflowen manuelt, kan du velge:

- **Run SUSHI validation**: Kjører en omfattende SUSHI-byggvalidering (standard: av)
- **Fail workflow if SUSHI validation has errors**: Lar workflowen feile ved SUSHI-feil (standard: av)

## Jobber

### validate

**Kjører på:** `ubuntu-latest`

#### Steg

1. **Checkout repository**
   - Bruker `actions/checkout@v4` for å sjekke ut koden fra repository.

   ```yaml
   - name: Checkout repository
     uses: actions/checkout@v4
   ```

2. **Setup Node.js**
   - Bruker `actions/setup-node@v4` for å sette opp Node.js versjon 20.

   ```yaml
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: '20'
   ```

3. **Set up Python**
   - Bruker `actions/setup-python@v5` for å sette opp Python versjon 3.x.

   ```yaml
   - name: Set up Python
     uses: actions/setup-python@v5
     with:
       python-version: '3.x'
   ```

4. **Install fsh-sushi**
   - Installerer `fsh-sushi` globalt ved hjelp av npm.

   ```yaml
   - name: Install fsh-sushi
     run: npm install -g fsh-sushi
   ```

5. **Install hl7.fhir.no.basis-2.2.0-snapshots in local cache**
   - Installerer nødvendige FHIR-pakker og setter opp lokal cache.

   ```yaml
   - name: Install hl7.fhir.no.basis-2.2.0-snapshots in local cache
     run: |
       echo "NPM install fhir r4 core 4.0.1 from package registry"
       npm --registry https://packages.simplifier.net install hl7.fhir.r4.core@4.0.1
       echo "NPM install fhir no-basis220 from https://github.com/HL7Norway/resources/"
       curl -L -o hl7.fhir.no.basis-2.2.0-snapshots.tgz https://raw.githubusercontent.com/HL7Norway/resources/main/snapshots/hl7.fhir.no.basis-2.2.0-snapshots.tgz
       npm install hl7.fhir.no.basis-2.2.0-snapshots.tgz
       echo "Create .fhir packages cache directory for no-basis"
       mkdir -p $HOME/.fhir/packages/hl7.fhir.no.basis#2.2.0/package
       echo "Copy local no-basis snapshot to .fhir package cache directory"
       cp -r ./node_modules/hl7.fhir.no.basis/* $HOME/.fhir/packages/hl7.fhir.no.basis#2.2.0/package
   ```

6. **Install fsh-validator**
   - Installer `fsh-validator` fra GitHub.

   ```yaml
   - name: Install fsh-validator
     run: pip install -U git+https://github.com/glichtner/fsh-validator
   ```

7. **Run fsh-validator**
   - Kjører `fsh-validator` for å validere alle FSH-filer.

   ```yaml
   - name: Run fsh-validator
     run: |
       cd ${{ env.IG_SHORTNAME }}/input/fsh/
       fsh-validator --all --log-path fsh-validator.log
   ```

8. **Run SUSHI validation** (valgfritt)
   - Kjører kun hvis aktivert manuelt. Utfører en fullstendig SUSHI-byggevalidering.

   ```yaml
   - name: Run SUSHI validation
     if: ${{ github.event.inputs.run_sushi_validation == 'true' }}
     continue-on-error: true
     timeout-minutes: 10
     run: |
       cd ${{ env.IG_SHORTNAME }}
       sushi . --require-latest 2>&1 | tee sushi-validation.log
   ```

9. **Display validation results**
   - Viser resultater fra både FSH og SUSHI validering (hvis kjørt).

10. **Upload validation artifacts**
    - Laster opp alle valideringslogger som artefakter.

    ```yaml
    - name: Upload validation artifacts
      uses: actions/upload-artifact@v4
      with:
        name: fsh-validation-results-${{ github.run_number }}
        path: |
          ${{ env.IG_SHORTNAME }}/input/fsh/fsh-validator.log
          ${{ env.IG_SHORTNAME }}/sushi-validation.log
    ```

11. **Generate job summary**
    - Lager en detaljert rapport som vises i GitHub Actions UI med feil- og advarselstelling.

## Konfigurasjon for nye brukere

Når du bruker ig-mal som template, må du:

### 1. Oppdater miljøvariabel

Endre `IG_SHORTNAME` i `.github/workflows/validate-fsh.yml`:

```yaml
env:
  IG_SHORTNAME: ditt-ig-mappenavn  # Endre fra 'mal'
```

### 2. Sikre mappestruktur

Workflowen forventer denne strukturen:

```text
ditt-ig-mappenavn/
├── input/
│   └── fsh/
│       ├── profiles/
│       ├── valuesets/
│       └── aliases.fsh
└── sushi-config.yaml
```

### 3. Teste workflowen

**Automatisk kjøring:**

- Workflowen kjører automatisk ved pull requests og push til main
- Kun FSH-validering kjøres automatisk

**Manuell kjøring:**

1. Gå til "Actions" → "Validate FSH Files"
2. Klikk "Run workflow"
3. Velg ønskede alternativer:
   - ☐ Run SUSHI validation (anbefalt for grundig testing)
   - ☐ Fail workflow if SUSHI validation has errors (kun hvis du vil at SUSHI-feil skal stoppe workflowen)

### 4. Tolke resultater

Workflowen genererer en detaljert rapport som viser:

- Antall FSH-feil og advarsler
- SUSHI-valideringsresultater (hvis aktivert)
- Lenke til fullstendige logger

**Grønn status:** Alle valideringer bestått  
**Gul status:** Advarsler funnet, men ikke kritiske feil  
**Rød status:** Feil funnet som må rettes

For mer informasjon, se den originale workflow-filen [her](https://github.com/HL7Norway/ig-mal/blob/main/.github/workflows/validate-fsh.yml).
