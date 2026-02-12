# Pasient-1 - Norwegian FHIR Hackathon 2026 v0.0.1

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Pasient-1**

## Example Patient: Pasient-1

Profile: [Pasient](StructureDefinition-mal-patient.md)

Rita Lin (no stated gender), DoB Unknown ( urn:oid:2.16.578.1.12.4.1.4.1#13031353453)

-------



## Resource Content

```json
{
  "resourceType" : "Patient",
  "id" : "Pasient-1",
  "meta" : {
    "profile" : [
      "http://hl7.no/fhir/ig/hackathon/2026/StructureDefinition/mal-patient"
    ]
  },
  "identifier" : [
    {
      "system" : "urn:oid:2.16.578.1.12.4.1.4.1",
      "value" : "13031353453"
    }
  ],
  "name" : [
    {
      "family" : "Lin",
      "given" : ["Rita"]
    }
  ]
}

```
