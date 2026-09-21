# NHN services - Norwegian FHIR Hackathon 2026 v1.4.0

* [**Table of Contents**](toc.md)
* **NHN services**

## NHN services

### Patient's Plans: Modeling Norwegian Patient Self-care Plans as FHIR

**Are you a developer, architect or interested in modeling data structures as FHIR resources?** During this track you'll get an opportunity of modeling real life use cases as FHIR resources and workflows. You'll explore today's non-FHIR API, its conceptual model, and how the current model maps to different FHIR resources and patterns.

Norsk helsenett facilitates an ongoing POC for sharing Patient Care Plans (no. **egenbehandlingsplan**) through the **Patient's Plans API**. The API is an **operation based API** going beyond CRUD, and currently uses custom JSON for data exchange. Ahead of planned extensions to the API and opening up the service for new providers, NHN is aiming at delivering **Patient's Plans** as a FHIR API.

The resource types considered so far are **CarePlan** and **EHDSCarePlan**, along with Task, ServiceRequest and Provenance as related resources. During the track we will discuss these resources along with others the participants will bring up, and how they fit into the use cases of the API.

#### About the facilitators

Norsk helsenett (NHN) is a national provider maintaining API services for exchanging medical records. Tormod, Michal and Jan are software developers at NHN working with the **Patient's Plans**, and have deep architectural knowledge of the service.

#### Prerequisites and preparations

The participants should:

* have some knowledge of different FHIR resources,
* explore the API in advance of the workshop by e.g. looking at [the documentation](https://utviklerportal.nhn.no/informasjonstjenester/pasientens-planer) and [Swagger UI](https://planer.dev.nhn.no/api/swagger/).

#### Learning goals

The participants will:

* gain hands-on experience modeling real life use cases as a FHIR API,
* match existing logical models to FHIR resources,
* explore an API that goes beyond basic CRUD paradigm.

