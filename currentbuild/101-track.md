# FHIR-101 - Norwegian FHIR Hackathon 2026 v1.5.0

* [**Table of Contents**](toc.md)
* **FHIR-101**

## FHIR-101

### Track: FHIR 101

FHIR IG authoring for documenting a FHIR RestfulAPI can seem like a big challenge to new FHIR developers. In this track we introduce the participants to FHIR implementation guide (IG) authoring, building and how to publish a draft on Github.

#### Prerequisites and preparations

There is no need for prior knowledge on HL7 FHIR or IG building before participation. You can build an IG entirely on Github but it will be faster if you have preinstalled the necessary tools on you own computer.

Basic knowledge of HL7 FHIR standard is helpful. We encurage everyone to have an idea of a practical/clinical use-case to explore during the workshop.

Some valuable video resources about HL7 FHIR are listed in [recommended preparation](https://hl7norway.github.io/Norwegian-FHIR-Hackathon-2026/currentbuild/index.html#recommended-preparation).

#### Learning goals

* Basic understanding of HL7 FHIR standard and FHIR Restful
* Basic understanding of the role of FHIR profiling
* Know the necessary tools for building FHIR IG's 
* IG publisher
* SUSHI (Publisher and SUSHI can run entirely on Github)
* Forge (must be installed on your computer, trial version available)
* Simplifier.net
 
* Basic understanding of Github for maintaining your codebase 
* Simplifier Github integration
 
* Learn how to write FHIR documentation using FSH or Forge
* Learn how to use the tools for FHIR IG authoring
* Learn how to present a draft IG using Github.io or Simplifier.net

### ASSIGNMENT 1: Tooling use cases

Explore different tooling option. Github workflow is recommended to get started fast. Local installation of IG-publisher and Forge is optional.

#### RECOMMENDED: Generate IG and publish on GitHub

1. Make sure you have a GitHub account
1. Go to[ig-mal](https://github.com/HL7Norway/ig-mal)and follow the instructions
1. Upload or write your FHIR profiles based in FHIR Shorthand (FSH)
1. Set up the publishing enviroment with GitHub Pages functionality
1. Run the publisher action

#### OPTIONAL: Install enviroment for IG publisher on your computer

You must have necessary rights to install and run software.

1. Install Java. IG Publisher requires Java 17 or later.
1. Download IG Publisher - https://github.com/HL7/ig-publisher.
1. Set Up Your IG Project Folder
1. Run the publisher
1. Optional: Use Sushi for FSH Projects

#### OPTIONAL: Using Firely Forge and Simplifier

You must have necessary rights to install and run software.

1. Create and edit FHIR profiles using Firely Forge
1. Upload and manage IG content on Simplifier.net
1. Collaborate with others, track changes, and validate content using Firely Terminal
1. Learn how to sync local work with Simplifier and use versioning

### ASSIGNMENT 2: Practical/clinical use cases

Explore practical/clinical uses cases and document user needs and requirements in a FHIR IG.

Possible use-cases to explore:

* Your own idea, against a FHIR test server, or a local FHIR server of choice.
* Pasientens måledata
* Pasientens planer

#### Practical assignments

Descriptions can be text, images and model artifacts.

* Describe the use-case in text. 
* Actors and roles
* The main use-case for each actor
 
* Functional requirements for different actors.
* Non-functional requirements for the actors.
* Describe one or more processes (process steps) that different actors are involved in
* Describe the most usefull information for each actor to support the processes
* What information is needed by different actors at stages of the process?
* Describe a FHIR model for information exchange

### Vibe code a FHIR client application

Use AI tools to develop an example app that stores/exchanges data using HL7 FHIR. Use the use-cases from the practical use-case exploration.

#### Possible FHIR backends

* [Pasientens måledata](https://utviklerportal.nhn.no/informasjonstjenester/pasientens-maaledata)
* [Pasientens planer](https://utviklerportal.nhn.no/informasjonstjenester/pasientens-planer)
* [HAPI testserver](https://hapi.fhir.org/baseR4)

