### SMART on FHIR Track

> FHIR is the data. SMART is what makes an app safe to plug into someone else's journal system.
> In this track you build the plug.

Track lead: Leo-Andreas Ervik, Nav.

**NOTE! The track description is currently under active development and changes will occur without
further notice.**

### Table of Contents

* [What this track is about](#what-this-track-is-about)
* [Terms and abbreviations](#terms-and-abbreviations)
* [What the track provides](#what-the-track-provides)
* [About the skeletons](#about-the-skeletons)
* [Prerequisites](#prerequisites)
* [Learning goals](#learning-goals)
* [Use-cases and assignments](#use-cases-and-assignments)
* [Bronze](#bronze)
* [Silver](#silver)
* [Gold](#gold)
* [Practical](#practical)
* [Reference material](#reference-material)
* [Questions](#questions)

### What this track is about

Most of us know FHIR as "resources and a REST API". Far fewer have worked with the SMART half of
SMART on FHIR and how an application is launched from inside an EPJ, how it learns which patient,
which
clinician and which consultation without anyone typing anything. And how the EPJ stays in control of
what that application is allowed to see.

By the end of the day you will have built a working SMART application and launched it from an EPJ
provided by the track, against synthetic Norwegian patients.

No prior SMART or FHIR experience is needed. You do not need to be a developer to contribute, see
[Roles for non-developers](#roles-for-non-developers).

### Terms and abbreviations

The track mixes Norwegian and international terminology, because the specifications are written in
English while the systems and identifiers we work with are Norwegian. This is the vocabulary we use.

**Systems and standards**

| Term          | Means                                                                                                                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EPJ           | Elektronisk pasientjournal. The clinical system that holds the record and launches your app. This page uses EPJ throughout.                                                             |
| EHR           | Electronic Health Record. The international term for the same thing. The SMART specification calls the flow we use *EHR launch*, so you will meet "EHR" in the spec where we say "EPJ". |
| FHIR          | HL7's standard for exchanging health data. The data model and the REST API.                                                                                                             |
| SMART         | The standard that lets an EPJ launch a third-party app, authenticate the user, and hand the app a limited, short-lived access token.                                                    |
| SMART on FHIR | The two combined. SMART handles who you are and what you may see, FHIR handles the data itself.                                                                                         |
| HelseID       | The national identity provider for Norwegian health personnel.                                                                                                                          |
| IG            | Implementation Guide. A published specification such as this page's parent document.                                                                                                    |
{: .grid .table-striped}

**SMART and OAuth vocabulary**

| Term           | Means                                                                                                   |
|----------------|---------------------------------------------------------------------------------------------------------|
| Launch         | The EPJ opening your app, passing along a one-time `launch` identifier.                                 |
| Launch context | What the app is told about the situation: which patient, which encounter, which user.                   |
| Scope          | The permissions the app asks for, for example `patient/Condition.read`. A contract between app and EPJ. |
| Access token   | The short-lived credential the app uses when calling the FHIR API.                                      |
| ID-token       | Tells the app who the logged-in user is.                                                                |
| PKCE           | Proof Key for Code Exchange. Stops someone else from stealing and using your authorization code.        |
| Discovery      | Reading `.well-known/smart-configuration` to learn where the EPJ's endpoints are.                       |
| JWKS           | The public keys used to verify that a token really came from who it claims.                             |
{: .grid .table-striped}

**Norwegian identifiers and code systems**

| Term                | Means                                                                             |
|---------------------|-----------------------------------------------------------------------------------|
| Fødselsnummer       | The 11-digit Norwegian national identity number.                                  |
| D-nummer            | Identity number for people without a fødselsnummer, such as short-term residents. |
| HPR-nummer          | The identifier for registered health personnel. Identifies the clinician.         |
| Organisasjonsnummer | The identifier for a legal entity, such as a fastlegekontor.                      |
| ICPC-2              | Diagnosis coding used in Norwegian primary care.                                  |
| ICD-10              | Diagnosis coding used in specialist care.                                         |
| LOINC               | International coding for measurements and lab results.                            |
{: .grid .table-striped}

### What the track provides

* An **EPJ** with its own SMART authorization server and a FHIR R4 API. This is the system that
  launches your application.
* **Synthetic Norwegian patient data**: patients with fødselsnummer and d-nummer, clinicians with
  HPR-nummer, organisations with organisasjonsnummer, consultations, diagnoses coded with ICPC-2 and
  ICD-10, and measurements.
* **Starter skeletons**, one per client authentication type, with the SMART launch sequence laid out
  as numbered `TODO`s for you to fill in.
* **Credentials** on the day: your team's `client_id`, secret or key pair, a test clinician to log
  in as, and a list of patients.
* Mentors circulating throughout the day.

### About the skeletons

The skeletons implement the SMART launch from scratch, server-side. They do not use an off-the-shelf
SMART client library, for two reasons:

1. You learn more by making the discovery request, generating the PKCE verifier, validating the
   token and extracting the launch context yourself than by calling `authorize()`.
2. The common browser-side libraries keep tokens in local storage. The skeletons keep them on the
   server and show you how.

Reference implementations are provided for when you get stuck.

### Prerequisites

No prior SMART or FHIR knowledge is required, and there is no required pre-work. Turn up and we will
get you running. If FHIR itself is new to you, consider dropping into
the [FHIR 101 track](101-track.html) in the morning.

What you need on the day:

| Requirement      | Detail                                                                                                                     |
|------------------|----------------------------------------------------------------------------------------------------------------------------|
| A laptop         | Any operating system. You will be writing and running code on it.                                                          |
| A code editor    | Visual Studio Code, IntelliJ IDEA or whichever you already use. Either is fine.                                            |
| A GitHub account | You will clone the starter repository and push your team's work.                                                           |
| Node 22          | Only if you want to run locally. A one-click GitHub Codespace is provided, which needs nothing installed beyond a browser. |
| A charger        | ⚡️                                                                                                                         |
{: .grid .table-striped}

Optional, only if SMART is entirely new to you, and you want a head start:

* [SMART App Launch Implementation Guide](https://hl7.org/fhir/smart-app-launch/), skim "App Launch"
  and "Scopes and Launch Context".
* [FHIR 101](https://vimeo.com/1102006982/68c2e4fcfb) and
  [Newcomer orientation](https://vimeo.com/542197402/8fb80fea04).

### Learning goals

By the end of the day you should be able to:

* explain in one sentence why SMART exists, and what problem it solves for a clinician;
* describe the launch sequence, and say what each of `iss`, `launch`, `state`, `code_verifier`,
  `aud` and `code` is protecting against;
* read a `.well-known/smart-configuration` document and know which endpoints matter;
* explain scopes as a contract between the app and the EPJ, and inspect a token to see what was
  actually granted;
* explain why access tokens belong on the server and not in the browser;
* name the three SMART client authentication types, and say which one a Norwegian EPJ vendor should
  be using today;
* describe how HelseID relates to, and differs from, the EPJ's own SMART authorization server.

### Use-cases and assignments

Assignments come in three tiers. Pick the one that matches your team and move up during the day.
This is a learning track, not a competition. There are no prizes, and helping the team next to you
is encouraged.

### Bronze

*It launched.* Target: every team, before lunch.

Launch the skeleton from the EPJ, complete the authorization code exchange on the server, and
display the patient's name and age together with the active consultation. Then open your browser's
network tab and explain each redirect to someone else in the room.

### Silver

*It is useful, and it is honest.* Pick one.

* **Clinical mini-app**: read the patient's diagnoses and measurements and render something a
  clinician would actually glance at. A trend, a summary, a flag.
* **Scope detective**: request narrower scopes than the skeleton does. Decode the access token and
  the ID-token. Prove what you were granted versus what you asked for, and demonstrate the FHIR API
  refusing a request outside your scopes.
* **Confidential client**: redo the launch using a client secret instead of a public client. Explain
  what changed, and why an EPJ vendor would insist on it.

### Gold

*It writes back, or it does something nobody expected.* Pick one.

* **Write-back**: create a document or a measurement in the EPJ from your application, and watch it
  appear in the journal.
* **Asymmetric client authentication**: implement `private_key_jwt` end to end.
* **Backend services**: a system-to-system SMART flow, with no user present at all.
* **Break it**: attack your own application. Tamper with `state`. Replay a `code`. Send a token with
  the wrong `aud`. Use an expired token. Ask for a resource outside your scopes. Document what the
  server correctly rejected, and what it did not.

### Practical

* **Language**: the track is facilitated in Norwegian. All written material, code and documentation
  is in English, with Norwegian terms kept where they are the actual names of things. See
  [Terms and abbreviations](#terms-and-abbreviations).
* **AI tools**: GitHub Copilot, Claude, Cursor and similar are welcome. They are good at OAuth
  boilerplate and at reading HTTP error responses. They know very little about HelseID and Norwegian
  code systems, and will confidently invent both.
* **Organization**: work in teams or individually. OAuth is complicated, we recommend pairing.
* **Results**: each team publishes a repository with a short README.

### Reference material

* [SMART App Launch IG (STU 2.2)](https://hl7.org/fhir/smart-app-launch/)
* [Scopes and launch context](https://hl7.org/fhir/smart-app-launch/scopes-and-launch-context.html)
* [Conformance and `.well-known/smart-configuration`](https://hl7.org/fhir/smart-app-launch/conformance.html)
* [SMART App Launcher](https://launch.smarthealthit.org), public sandbox used as fallback environment
* [navikt/smart-on-fhir](https://github.com/navikt/smart-on-fhir), Nav's server-only SMART on FHIR library
* [navikt/smart-on-fhir-validator](https://github.com/navikt/smart-on-fhir-validator), validates a SMART/FHIR implementation against Nav's requirements
* [HL7 FHIR R4 resource list](https://hl7.org/fhir/R4/resourcelist.html)
* [OID-identifikatorserier i helse- og omsorgstjenesten](https://www.helsedirektoratet.no/digitalisering-og-e-helse/e-helsestandarder-og-standardiseringstiltak/oid-identifikatorserier-i-helse-og-omsorgstjenesten), the authoritative list of Norwegian identifier series

### Questions

Contact the track lead, [Leo-Andreas Ervik (Nav)](mailto:leo-andreas.ervik@nav.no), or ask in the
track channel.
