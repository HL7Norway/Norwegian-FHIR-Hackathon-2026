# Resultater fra 2026 - Norwegian FHIR Hackathon 2026 v1.5.0

* [**Table of Contents**](toc.md)
* **Resultater fra 2026**

## Resultater fra 2026

### Results from the Hackathon

Overall the hackathon was a great success. 87 participants gathered at Rebel in Oslo on monday 9th 2026 to work on health interoperability. The participants worked in the six annonced tracks and presented great results in the summary session at the end of the day. After the hackathon we invited to the traditional FHIR-beer, a social gathering this time hosted at Røør.

The day after the actual Hackathon Sigurd Ringbakken, Adam Kover, Ingvar Sørlien and Thomas Tveit Rosenlund gave a presentation summarizing the results from this years event.

* [EHIN presentation on the results from the Hackathon](2026-11-10-FHIR-Hackathon-2026-resultater.pdf)

#### FHIR 101

15 persons participated on the track (including track-leads).

Everyone managed to produce a FHIR IG. Several different use-cases where documented including:

* [Study finder IG](https://paulrylandsholm.github.io/ig-mal/currentbuild/)
* [Skin wound assessment](https://kristilerla.github.io/joda-sardokumentasjon-fhir/currentbuild) (Sårdokumentasjon)
* Encounter reporting modeling
* Several kinds of observation profiling
* CarePlan client app-demo
* Improvements to [The check-in kiosk app with demo](https://thomiz.github.io/hackathon-check-in-app/)

#### SMART on FHIR

~30 people participated on the track.

Most managed to get a SMART on FHIR application from [Navs template repository](https://github.com/navikt/smart-on-fhir-templates) using the `public` launch method.

Some experimented using `backend-services` and `client-secret` which entailed a more secure launch with wider scopes and extended use-cases.

Some other things that were accomplished:

* Using patient data to show graphs of measurements and min/max thresholds to warn the doctor.
* Writing back measurements and documents from the SMART app to the [mock EHR system](https://epj.ekstern.dev.nav.no/).
* DigDir and Aidn were able to launch Førerrett SMART app from Aidn's EHR, which is a real-world usage scenario.
* Some went as far as creating their own EHR systems and implemented SMART framework and FHIR strutured data to present SMART apps as they wished.

Takeaways from this session:

* SMART on FHIR is gaining in popularity and will be of great use for the EHR market to allow third party vendors.
* Use of AI for development significantly speeds up the process, but infrastructure, OAuth and privacy must be understood by humans creating applications that deal with health records.
* Variations in OS and backend/frontend expertise entail different setups, so we must facilitate for Windows, Linux and macOS.
* Some proprietary work-pcs are more locked down than others, therefore the participants must be warned of this before. attending.
* A track attendee limit must be set and number of facilitators should be requested based on that number.

