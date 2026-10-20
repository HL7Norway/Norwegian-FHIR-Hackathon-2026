# Attendee registration app

Web app, running on localhost, for registering attendees showing up at the 2026 FHIR Hackathon.  

## Goal

* Keep track of everyone that actually attends the Hackathon  
* Use-case for FHIR profiling and IG generation  
* Demonstrate the use of vibe coding a FHIR client/server  

## Features

1. Registration page, name, email and affiliate  
   1. Registration page should be possible to use both on mobile and desktop  
   2. Bonus questions - primary track  
2. Put the registrations in a FHIR Practitioner/Person resource and send information to a FHIR server.  
3. Send an email confirmation of the registered info to the email adress from the attendees list?  

## Proposed architecture

* A windows PC running the registration server and client  
* The client is a web app that takes input from the users  
* The server receives FHIR resources and returns OK/Error messages  
  * Builds a list of the registered attendees  
  * Sends confirmation mail to the attendees on successfull registration  
  * Run a lightweight FHIR server e.g. Medplum
* Use Brevo to send actual emails  

## UI for the users

* Use your phone or a stationary computer located at the venue to input name, affiliate and main track.  
  * Backstage: search for information from attendee list (preloaded), to autofill details  
* Get confirmation on screen  
* Get confirmation email to registered email adress  

## Other scripts

* A script to take the data from registration list (google sheet) into a list to be used by the registration app (to more quickly register people).  

## Undecided

* Store the registrations on a separate server? Can it be exposed in the github repo?  
* Access by wifi (security risk)  
