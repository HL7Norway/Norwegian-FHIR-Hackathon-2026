# EHDS track - Norwegian FHIR Hackathon 2026 v1.2.0

* [**Table of Contents**](toc.md)
* **EHDS track**

## EHDS track

### EHDS Patient Summary Track

#### Purpose

The purpose of this track is to give vendors and implementers a hands-on opportunity to explore and test the [HL7 Europe Patient Summary (EPS)](https://build.fhir.org/ig/hl7-eu/eps/) Implementation Guide. EPS is HL7 Europe's FHIR representation of the Patient Summary as currently described in the emerging EU specifications for the European Health Data Space (EHDS), and builds on the [Patient Summary Logical Model](https://www.xt-ehr.eu/fhir/models/en/overview-patientsummary.html) developed by the Xt-EHR Joint Action for the European Electronic Health Record Exchange Format (EEHRxF).

Neither the Patient Summary Logical Model nor the EPS Implementation Guide has been formally adopted. Both are draft, continuously changing specifications that represent the current best understanding of how the EU Commission's EHDS secondary legislation on the electronic health record exchange format is likely to be structured. Participants should treat this track as an early look at where the specification is heading, not as testing against a finished standard.

#### Prerequisites and preparations

* Basic knowledge of HL7 FHIR, in particular document-based implementation guides (Bundle, Composition, and profiled clinical resources). The FHIR 101 track is a good primer if this is unfamiliar.
* Some familiarity with the International Patient Summary (IPS), since EPS is built as a European specialisation of IPS and reuses much of its structure.
* No prior knowledge of EHDS or EEHRxF is required. A short overview will be given at the pre-meeting and at the start of the track.

##### Preparations

Participants are encouraged to review the following before the hackathon:

* [HL7 Europe Patient Summary Implementation Guide](https://build.fhir.org/ig/hl7-eu/eps/), particularly the Introduction and Logical Models pages
* [EHDS Logical Information Models – Patient Summary](https://www.xt-ehr.eu/fhir/models/en/overview-patientsummary.html), to see the underlying logical model EPS is derived from
* Optionally, the [HL7 FHIR International Patient Summary](https://hl7.org/fhir/uv/ips/STU2) for background on the parent specification

Presentation from the pre-meeting: **Coming**

#### Learning goals

By the end of the track, participants should:

* Understand how the EPS Implementation Guide relates to the EEHRxF Patient Summary Logical Model and to IPS, and where each fits in the chain from EU policy to a testable FHIR artifact
* Be able to navigate the EPS Implementation Guide: its sections, profiles, and obligations
* Have produced or validated example FHIR resources against one or more EPS profiles
* Understand the current maturity and open issues of the specification, and what is likely to still change before formal adoption
* Be able to relate EPS to their own product or national context, including how it compares to existing Norwegian solutions such as Kjernejournal

#### Use-cases and assignments

* Pick one or more sections of the Patient Summary (for example allergies, medication, or problems) and produce example instances conforming to the corresponding EPS profiles
* Validate produced instances against the EPS Implementation Guide using the FHIR validator
* Assemble a complete Patient Summary document (Composition/Bundle) from the produced sections and check it against the IG's document-level constraints
* Compare a section's structure in EPS against the same content in the Norwegian Kjernejournal / pasientsammendrag, and discuss where the models align or diverge
* For teams with a vendor system: discuss what it would take to expose or consume an EPS-conformant Patient Summary from that system, and identify the main gaps

