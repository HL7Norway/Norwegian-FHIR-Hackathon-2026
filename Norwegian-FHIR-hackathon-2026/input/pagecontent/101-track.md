### Track: FHIR 101

FHIR IG authoring for documenting a FHIR RestfulAPI can seem like a big challenge to new FHIR developers. In this track we introduce the participants to FHIR implementation guide (IG) authoring, building and how to publish a draft on Github.  

<div>{% include main-use-casev2.svg %}</div>

#### Prerequisites and preparations

There is no need for prior knowledge on FHIR or IG building before participation. You can build an IG entirely on Github but it will be faster if you have preinstalled the necessary tools on you own computer. 

Basic knowlege of HL7 FHIR standard is helpful, also a thought about a use-case you want to work with before the workshop.

#### Learning goals

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

### Basic use cases

The basic use cases are described over.

### Advanced use cases

Some advanced assignments.

#### Generate IG and publish on GitHub

1. Make sure you have a GitHub account
2. Go to [ig-mal](https://github.com/HL7Norway/ig-mal) and follow the instructions
3. Upload or write your FHIR profiles based in FHIR Shorthand (FSH)
4. Set up the publishing enviroment with GitHub Pages functionality
5. Run the publisher action

#### Install enviroment for IG publisher on your computer

You must have necessary rights to install and run software.  

1. Install Java. IG Publisher requires Java 17 or later.
2. Download IG Publisher - https://github.com/HL7/ig-publisher.
3. Set Up Your IG Project Folder
4. Run the publisher
5. Optional: Use Sushi for FSH Projects

#### Using Firely Forge and Simplifier for Collaborative IG Development

You must have necessary rights to install and run software.

1. Create and edit FHIR profiles using Firely Forge
2. Upload and manage IG content on Simplifier.net
3. Collaborate with others, track changes, and validate content using Firely Terminal
4. Learn how to sync local work with Simplifier and use versioning
