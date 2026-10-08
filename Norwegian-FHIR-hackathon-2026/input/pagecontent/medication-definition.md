The Medication Definition track will discuss two main topics:

* Structured medication data with R5's Medication Definition module
* Reimbursement data and decision support

### Structured medication data

In this topic, we will take a closer look at R5's Medication Definition module,
and how the resources are used to create IDMP-compatible representations of medication data with FHIR.

We will explore the public API of EMA's PMS, now in public beta, and NoMA's FHIR service.

* How to get access to the service
* What data is available in the service
* How can the service be connected to other data sources (e.g., national medication databases, warnings or guidelines)
* How to visualize the data for end users
* How to get related terminology through APIs

The agenda at the hackathon is flexible and gives space for the topics
the participants are interested in.
Feel free to bring your own use case. How can these services be useful to you?

#### Prerequisites

Get your API keys in advance for PMS.

Read the service documentation and the API specification for the services you are interested in testing.

##### PMS Public API Beta

The public beta is open from June 2026 until early 2027.
We expect the API to be available before and during the hackathon.

For information on PMS, see [Substance and product data management services](https://www.ema.europa.eu/en/human-regulatory-overview/research-development/data-medicines-iso-idmp-standards-overview/substance-product-organisation-referential-spor-master-data/substance-product-data-management-services).

Registration is free and fully self-service. Follow the instructions in the [EU IDMP Implementation Guide](https://www.ema.europa.eu/en/human-regulatory-overview/research-development/data-medicines-iso-idmp-standards-overview/substance-product-organisation-referential-spor-master-data/substance-product-data-management-services#eu-idmp-implementation-guide-12045), Chapter 1, Annex B.

The available endpoints and parameters are described in the PMS [OpenAPI Specification](https://api.pms.ema.europa.eu/public/v1/swagger).
The specification also includes a test interface for running queries
and the data elements returned by the service.

##### NoMA's FHIR Service

NoMA's FHIR Service is available both in production and a test environment.
Read [How to Access the FHIR Service](https://www.dmp.no/en/about-us/distribution-of-data-on-medicinal-products/FHIR-service/how-to-access-the-fhir-service).
An API key will be provided for participants at the hackathon.
This key will only be valid on the day of the hackathon and will be revoked after the event.
Participants can use this key for testing and do not need to contact NoMA in advance for a personal API key.

 The use and content of the service is documented in the [Implementation Guide for NOMA's FHIR API v2.0](https://simplifier.net/guide/Implementation-guide-for-NoMA-s-FHIR-API-2.0.0/Home/The-NOMA-FHIR-API/Introduction.page.md?version=current).

### Reimbursement data and decision support

This topic concentrates on reimbursement data.

#### Reimbursement data in FHIR

Which resources and which approach can describe reimbursement data in FHIR?
How can the same structure support both [blue and H-prescription](https://www.helsenorge.no/en/medicines/prescriptions/)?

An analysis has identified the need for the following data:

* Medicinal product data
    * Medicinal product name
    * Dose form
    * Strength
    * Marketing authorization and marketing dates
    * Approved indications
* Reimbursement data
    * Funding responsibility
    * Legal basis for funding
    * Health technology assessment status
    * The medicine’s reimbursable use; indication, sub-indication, or area of use
    * Conditions for reimbursement
* Price data
    * Reimbursement price (might be confidential)

While the first category is part of the IDMP data model and also detailed in the [Electronic Medicinal Product Information (ePI) FHIR Implementation Guide](https://hl7.org/fhir/uv/emedicinal-product-info/STU1/), the other categories are not yet standardized.

Candidates and previous implementations:

* [The Swiss model for reimbursement data](https://fhir.ch/ig/ch-epl/spezialitaetenliste.html)
* [FormularyItem in the Pharmacy Incubator IG for R6](https://build.fhir.org/ig/HL7/phx-incubator/StructureDefinition-FormularyItem.html)

#### Reimbursement decision support

How can the data be made available for EHRs on a decision support API?

* Input and output data
* Data format (FHIR, CDS Hooks)

#### Prerequisites

Read the service documentations and the API specifications.

##### NoMA H-prescription FHIR Service

An API key will be provided for participants at the hackathon.
This key will only be valid on the day of the hackathon and will be revoked after the event.
Participants can use this key for testing and do not need to contact NoMA in advance for a personal API key.
