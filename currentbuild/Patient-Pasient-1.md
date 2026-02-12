# Pasient-1 - Mal v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Pasient-1**

## Example Patient: Pasient-1

**Kari Elisabeth Hansen**

Fødselsnummer: 13031353453

Kjønn: Kvinne

Fødselsdato: 13. mars 1990

Telefon: +47 12 34 56 78 (mobil)

E-post: kari.hansen@example.no

Adresse: Storgata 123, 5020 Bergen, Norge



## Resource Content

```json
{
  "resourceType" : "Patient",
  "id" : "Pasient-1",
  "meta" : {
    "profile" : ["http://hl7.no/fhir/ig/mal/StructureDefinition/mal-patient"]
  },
  "identifier" : [
    {
      "system" : "urn:oid:2.16.578.1.12.4.1.4.1",
      "value" : "13031353453"
    }
  ],
  "name" : [
    {
      "family" : "Hansen",
      "given" : ["Kari", "Elisabeth"]
    }
  ],
  "telecom" : [
    {
      "system" : "phone",
      "value" : "+47 12 34 56 78",
      "use" : "mobile"
    },
    {
      "system" : "email",
      "value" : "kari.hansen@example.no"
    }
  ],
  "gender" : "female",
  "birthDate" : "1990-03-13",
  "address" : [
    {
      "line" : ["Storgata 123"],
      "city" : "Bergen",
      "postalCode" : "5020",
      "country" : "NO"
    }
  ]
}

```
