# Medication Definition - Norwegian FHIR Hackathon 2026 v1.2.0

* [**Table of Contents**](toc.md)
* **Medication Definition**

## Medication Definition

The Medication Definition track will discuss two main topics:

* Structured medication data with R5's Medication Definition module
* Reimbursement data and decision support

### Structured medication data

In this topic, we will take a closer look at R5's Medication Definition module, and how the resources are used to implement IDMP-compatible medication databases with FHIR.

We will explore the public API of EMA's PMS, now in public beta, and NoMA's FHIR service.

* How to get access to the service
* What data is available in the service
* How can the service be connected to other data sources (e.g., national medication databases, warnings or guidelines)
* How to visualize the data for end users
* How to get related terminology through APIs

The agenda at the hackathon is flexible and gives space for the topics the participants are interested in. Feel free to bring your own use case. How can these services be useful to you?

#### Prerequisites

Get your API keys in advance for the services you are interested in testing.

Read the service documentations and the API specifications.

##### PMS Public API Beta

The public beta is open from June 2026 until early 2027. We expect the API to be available before and during the hackathon.

For information on PMS, see [Substance and product data management services](https://www.ema.europa.eu/en/human-regulatory-overview/research-development/data-medicines-iso-idmp-standards-overview/substance-product-organisation-referential-spor-master-data/substance-product-data-management-services).

Registration is free and fully self-service. Follow the instructions in the [EU IDMP Implementation Guide](https://www.ema.europa.eu/en/human-regulatory-overview/research-development/data-medicines-iso-idmp-standards-overview/substance-product-organisation-referential-spor-master-data/substance-product-data-management-services#eu-idmp-implementation-guide-12045), Chapter 1, Annex B.

The available endpoints and parameters are described in the PMS [OpenAPI Specification](https://api.pms.ema.europa.eu/public/v1/swagger). The specification also includes a test interface for running queries and the data elements returned by the service.

##### NoMA's FHIR Service

NoMA's FHIR Service is available both in production and a test environment. Read [How to Access the FHIR Service](https://www.dmp.no/en/about-us/distribution-of-data-on-medicinal-products/FHIR-service/how-to-access-the-fhir-service) and contact NoMA for an API key. The test environment can be a good fit for testing at the hackathon.

The use and content of the service is documented in the [Implementation Guide for NOMA's FHIR API v2.0](https://simplifier.net/guide/Implementation-guide-for-NoMA-s-FHIR-API-2.0.0/Home/The-NOMA-FHIR-API/Introduction.page.md?version=current).

### Reimbursement data and decision support

This topic concentrates on reimbursement data. Which resources and which approach can describe reimbursement data in FHIR? How can the same structure support both [blue and H-prescription](https://www.helsenorge.no/en/medicines/prescriptions/)?

Candidates and previous implementations:

* [The Swiss model for reimbursement data](https://fhir.ch/ig/ch-epl/spezialitaetenliste.html)
* [FormularyItem in the Pharmacy Incubator IG for R6](https://build.fhir.org/ig/HL7/phx-incubator/StructureDefinition-FormularyItem.html)

How can the data be made available for EHRs on a decision support API?

* Input and output data
* Data format (FHIR, CDS Hooks)

#### Prerequisites

Get your API keys in advance for the services you are interested in testing.

Read the service documentations and the API specifications.

##### NoMA H-prescription FHIR Service

Email [fest@dmp.no](mailto:fest@dmp.no) to request an API key. Specify that you request access to the H-prescription production API, endpoint `https://api.legemiddelverket.no/fhir-r4-hresept`.

