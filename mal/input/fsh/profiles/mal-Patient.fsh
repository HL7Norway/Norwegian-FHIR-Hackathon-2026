Profile:     MalPatient
Id:          mal-patient
Parent:      NoBasisPatient
Title:       "Pasient"
Description: "Informasjon om pasienten, basert på no-basis."
* ^status = #draft
* ^date = "2025-01-22"
* ^publisher = "HL7 Norge"

* identifier MS
* name.family MS

// Eksempel på norsk pasient med fødselsnummer og adresse

Instance: Pasient-1
InstanceOf: MalPatient
Description: "Eksempel på norsk pasient med fødselsnummer, navn og kontaktinformasjon"
* text.status = #generated
* text.div = "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Kari Elisabeth Hansen</strong></p><p>Fødselsnummer: 13031353453</p><p>Kjønn: Kvinne</p><p>Fødselsdato: 13. mars 1990</p><p>Telefon: +47 12 34 56 78 (mobil)</p><p>E-post: kari.hansen@example.no</p><p>Adresse: Storgata 123, 5020 Bergen, Norge</p></div>"
* identifier.system = "urn:oid:2.16.578.1.12.4.1.4.1"
* identifier.value = "13031353453"
* name.family = "Hansen"
* name.given[0] = "Kari"
* name.given[1] = "Elisabeth"
* telecom[0].system = #phone
* telecom[0].value = "+47 12 34 56 78"
* telecom[0].use = #mobile
* telecom[1].system = #email
* telecom[1].value = "kari.hansen@example.no"
* gender = #female
* birthDate = "1990-03-13"
* address.line = "Storgata 123"
* address.city = "Bergen"
* address.postalCode = "5020"
* address.country = "NO"
