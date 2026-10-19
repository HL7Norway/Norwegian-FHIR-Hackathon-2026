# Register app

Web app, running on localhost, for registering attendees showing up at the 2026 FHIR Hackathon.  

## Goal

* Keep track of everyone that actually attends the Hackathon 
* Use-case for FHIR profiling and IG generation
* Demonstrate the use of vibe coding a FHIR client/server

## Features

1. Registration page, name and affiliate
2. Bonus questions - primary track
3. Put the registrations in a FHIR Practitioner/Person resource and send information to a FHIR server
4. Send an email confirmation of the registered info to the email adress from attendees list.  

## Undecided

* Store the registrations on a separate server? Can it be exposed in the github repo?
* Access by wifi (security risk)
