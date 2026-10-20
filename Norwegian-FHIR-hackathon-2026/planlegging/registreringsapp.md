# Attendee registration app

Web app hosted on a Windows PC for checking in attendees arriving at the Norwegian FHIR Hackathon on November 9, 2026, at Rebel in Oslo.

## Scope and source information

* This application is only for the 2026 Hackathon. The `FHIR-hackathon-2025` directory is outside the scope of the app.
* Actual attendance is separate from advance sign-up or staff-roster membership. Importing someone from either roster must not mark them as checked in.
* The [2026 index page](../input/pagecontent/index.md#tracks) is the source of truth for tracks.
* The **Track leads and partners** table in the [2026 agenda](../input/pagecontent/hack-agenda.md#track-leads-and-partners) documents the staff roster. It is not the attendee sign-up list and does not grant dashboard access automatically.
* The advance attendee roster comes from the event sign-up Google Sheet.
* Track leads must also check in using the app, following the same confirmation and email workflow as other attendees.
* Authorized staff can manually register and check in someone missing from both the staff roster and the Google Sheet attendee list.

## Source code repository

* Generate and maintain the application source code in a separate Git repository named `hackaton-registration-app`.
* The local repository location is `D:\Programdisk-2\GitRepo\hackaton-registration-app`, alongside this planning repository, not inside it.
* Keep frontend, backend, import scripts, email worker, tests and local Medplum deployment configuration in the application repository.
* Keep this planning specification in the current repository.
* Maintain all application-specific FHIR source artifacts in `D:\Programdisk-2\GitRepo\hackaton-registration-app`, including FSH profiles, extensions, CodeSystems, ValueSets, synthetic examples and the configuration/documentation needed to build the application's IG package.
* The application repository is the source of truth for its FHIR definitions. Use its generated IG package for validation; the event IG may reference that package rather than maintain duplicate definitions. Unrelated event IG content remains in the current repository.
* The application IG title and package ID are `hackathon-attendance-registration-app`; its FHIR machine-readable name is `HackathonAttendanceRegistrationApp` and its canonical URL is `https://hl7.no/fhir/ig/hackathon-attendance-registration-app`.
* Document setup, configuration and Windows startup instructions in the application repository. Do not commit real attendee data, runtime databases or secrets to either repository.
* Provide `scripts\Install-Prerequisites.ps1` in the application repository to install missing Windows prerequisites (Git, Node.js LTS with npm, and Docker Desktop with Compose) through WinGet and check the Docker Linux engine. Support a non-installing `-CheckOnly` mode and explicit failures for missing tools or incomplete setup.
* Once application manifests and deployment files exist, extend setup to validate supported versions, install locked npm dependencies, pull pinned Medplum and supporting service images, and document configuration and health checks. Prerequisite installation alone must not be reported as a runnable application.

## Goal

* Keep track of everyone that actually attends the Hackathon  
* Use-case for FHIR profiling and IG generation  
* Demonstrate the use of vibe coding a FHIR client/server  

## Features

1. Responsive check-in page for mobile and desktop, collecting name, email and affiliation, with an optional primary track.
2. Store expected participants as profiled FHIR R4 `Person` resources. On check-in, create a linked `Practitioner` and add it to the actual-attendance List.
3. Display confirmation only after attendance has been saved successfully.
4. Send a confirmation email through Brevo after successful check-in.
5. Provide an authenticated staff dashboard that collects attendance and email-workflow status through the FHIR API.
6. Support check-in from either roster and a staff-only manual override for people found in neither.
7. Show all near roster matches automatically during name input, starting after five letters. Let the attendee select their entry, prefill email and primary track, and allow a track change before confirming check-in.

### Primary tracks

Use stable local codes in a track `CodeSystem` and `ValueSet`. The display labels below follow the [2026 index page](../input/pagecontent/index.md#tracks); review them against that page before deployment.

| Proposed code | Track |
|---------------|-------|
| `care-plans` | Modeling Patient care plans as FHIR |
| `smart` | SMART on FHIR |
| `medication-definition` | Medication Definition on FHIR - Exploration of FHIR services from EMA and NoMA |
| `ihe-mhd` | Document sharing for IHE MHD |
| `ehds-summary` | EHDS patient summary |
| `fhir-101` | FHIR 101: Introduction to HL7 FHIR with practical assignments |

## Proposed architecture

* A Windows PC hosts the web app, backend and a local Medplum FHIR R4 server.
* Proposed implementation: React/TypeScript frontend and a Node.js/TypeScript backend. Serve the frontend and API from the same origin.
* Use Medplum as the required FHIR server, selected for the project's lower-resource hosting goal. Verify the complete local deployment's dependencies, persistent storage and measured resource use on the event PC before deployment.
* The backend validates input, builds FHIR resources and reports explicit success or error messages. Keep FHIR credentials and the Brevo API key on the backend.
* The browser accesses FHIR data through the backend, which enforces staff permissions. Do not expose an unrestricted FHIR endpoint to venue Wi-Fi.
* Use persistent storage and a durable email worker. FHIR is the source for dashboard status; a private local database may hold import staging, retry scheduling and idempotency keys.
* Use Brevo for transactional confirmation emails. Internet loss should delay email, not prevent local check-in.

## Proposed FHIR model and dashboard API

Use FHIR R4 (4.0.1), matching the event IG's FHIR version. Define profiles, extensions, terminology and synthetic examples with FSH in the application repository, together with the application's IG build configuration.

### Expected participant: Person

Use a `HackathonExpectedParticipant` profile of `Person` for imported attendees who have indicated that they want to attend and for people in the staff roster. Import does not create a Practitioner or record attendance.

* `identifier`: stable attendee ID in a 2026 event-controlled identifier system. Do not use email as the only identity key.
* `name`: attendee name.
* `telecom`: email address with `system = email`.
* Profile-defined affiliation extension with `valueString`.
* Profile-defined primary-track extension with `valueCoding`, bound to the track ValueSet.

Do not use `Person.active` as an attendance flag.

### Checked-in participant: Practitioner

Use a `HackathonCheckedInParticipant` profile of `Practitioner` for everyone who has actually checked in, including track leads and people registered through manual override.

* `identifier`: the same stable event-specific participant identifier used on the corresponding Person.
* `name`, `telecom`, affiliation and primary-track extensions: confirmed details captured at check-in.
* `qualification`: require one event-role qualification whose `code` is bound to a local `HackathonParticipationRole` CodeSystem and ValueSet:
  * `attendee`: a participant who is not a track lead, including other staff or partners.
  * `track-lead`: a confirmed track lead.
* `Person.link.target`: reference to the corresponding checked-in Practitioner, maintained on the Person.

Use the agenda and organizer-reviewed roster metadata to determine track-lead status; membership in the staff List alone does not make someone a track lead. Store the expected role in the source List's `entry.flag` using the same local role codes, and resolve conflicting roster roles before check-in. Only authorized staff may override the role.

This is an event-specific demonstration model requested for the hackathon. The qualification code represents participation role, not a professional credential, and the Practitioner resource must not be interpreted as evidence that an attendee is a healthcare professional. Document this modeling limitation in the IG.

Keep confirmed details consistent between the linked Person and Practitioner when staff makes corrections. Do not use `Practitioner.active` as an attendance flag; membership in the check-in List records attendance.

### Attendance status: List

Propose a profiled **FHIR List resource** as the main attendance-status resource for the staff dashboard. It represents an event-specific collection of people without modeling a hackathon visit as a clinical encounter.

Maintain three Lists:

| Logical List identifier | Purpose |
|----------------------|---------|
| `hackathon-2026-roster` | Advance sign-ups, with `entry.item` references to attendee Persons |
| `hackathon-2026-staff` | Staff roster from the agenda, including track leads, with `entry.item` references to Persons |
| `hackathon-2026-checkins` | Actual arrivals, with `entry.item` references to checked-in Practitioners and `entry.date` recording each check-in time |

For all three Lists, use `status = current`, `mode = working`, a stable event-specific identifier, a descriptive title and a locally defined `code` distinguishing the purposes. Update `List.date` when the list changes.

On check-in entries created by manual override, use a profile-defined boolean extension to identify the registration source for dashboard reporting. Keep the authorizing staff identity, time and override reason in the protected audit log.

The dashboard retrieves:

```http
GET [fhir-base]/List?identifier=https://hl7.no/fhir/ig/hackathon-attendance-registration-app/identifier/list|hackathon-2026-roster
GET [fhir-base]/List?identifier=https://hl7.no/fhir/ig/hackathon-attendance-registration-app/identifier/list|hackathon-2026-staff
GET [fhir-base]/List?identifier=https://hl7.no/fhir/ig/hackathon-attendance-registration-app/identifier/list|hackathon-2026-checkins
GET [fhir-base]/Person/[attendee-id]
GET [fhir-base]/Practitioner/[checkin-practitioner-id]
```

URL-encode the identifier search values in actual requests. Medplum assigns resource IDs; resolve each List by its stable identifier, then read the returned references. Do not require elevated credentials to assign custom IDs.

Fetch referenced Persons and Practitioners as needed, or use supported batch reads. Compute the checked-in total from the check-in List and track totals from the referenced Practitioners' primary-track codes. Split attendance into attendees and track leads using the event-role slice of `Practitioner.qualification.code`, not other professional qualifications. Count unique Practitioner references, excluding entries marked `deleted`.

Show advance sign-ups, staff-roster members, actual arrivals, people in each roster not yet checked in, and manual registrations separately. Match each roster Person to its checked-in Practitioner using `Person.link.target` and the shared event identifier. A person in both rosters has one Person and, after check-in, one linked Practitioner, counting only once in the overall arrival total. Manual registrations have both resources and belong in the check-in List but must not inflate either preloaded roster total. Importing staff information does not imply either advance sign-up or attendance.

These Lists are appropriate for this small, single-event app. FHIR search pagination pages matching resources, not entries within a List; the app must read each complete List.

### Email-workflow status: Task

Use a profiled `Task` for each attendee's confirmation-email workflow so the dashboard can obtain this status through FHIR as well.

* `identifier`: stable event-and-attendee email-job identifier.
* `code`: a local code for the 2026 check-in confirmation email.
* `intent = order`.
* `focus`: reference to the checked-in attendee's `Practitioner`.
* `status`: `ready` when queued, `in-progress` while sending, `completed` when Brevo accepts the message, or `failed` after permanent failure or exhausted retries.
* `statusReason`: actionable failure information without credentials or unnecessary personal data.
* `businessStatus`: optional delivery state, such as delivered or bounced, only when supported by provider feedback.

For an attendee, retrieve tasks using the standard reference search:

```http
GET [fhir-base]/Task?focus=Practitioner/[checkin-practitioner-id]
```

Filter to the confirmation-email code. For a dashboard-wide view, search Tasks by that code and follow all search Bundle pagination links.

Brevo acceptance is not proof of delivery. Display attendance success independently from email status, and provide staff with a retry action.

### Consistency and duplicate handling

* Use stable event identifiers and one check-in entry per person. Let Medplum assign Person and Practitioner resource IDs and persist their link. Use conditional creates by identifier and transaction-local references for new resources so repeated submissions reuse the existing identity and return its confirmation rather than creating another arrival or email job.
* Reconcile people appearing in both imported rosters to the same Person; flag ambiguous matches for staff review instead of merging automatically.
* Save the Practitioner with its event-role qualification, Person changes including its Practitioner link, the check-in List update and the email Task in a FHIR transaction Bundle before reporting success.
* Save the attendee's confirmed primary track on both Person and Practitioner in that transaction, including any change from the imported preference. Use the confirmed choice for dashboard track totals and the confirmation email. Changing track does not change the participant's event-role qualification.
* Use version-aware List updates (`If-Match`, or `request.ifMatch` in a transaction) and retry after rereading on a version conflict, so simultaneous arrivals cannot overwrite each other.
* Verify transaction and version-conflict behavior on the local Medplum server.
* Persist retry state and reconcile uncertain outcomes after restart. Do not blindly resend email after an ambiguous Brevo response.

## UI for the users

* Attendees, including track leads, use a phone or a stationary computer at the venue to start typing their name. After five letters, automatically show near matches as they type; no separate search action or affiliation entry is required.
* Show each candidate's name and affiliation so the attendee can quickly select their own entry. Affiliation input can optionally refine the matches.
* After selection, prefill name, affiliation, email and primary track from the matched Person and ask the attendee to confirm the details. Track leads do not need a Google Sheet entry to check in.
* Keep the primary-track selector editable, with choices from the 2026 track ValueSet. Attendees may keep or change their imported preference before submitting. If no preference was imported, leave it unselected.
* Authenticated staff can search both preloaded rosters and assist with unresolved matches or corrections. Attendees may view near matches during check-in, but must not receive unrestricted roster downloads or FHIR access.
* Show confirmation on screen after successful FHIR persistence, with email status shown separately.
* Send email to the confirmed roster address, or the address supplied for a walk-in.
* Clear personal details from the shared kiosk after completion.
* Staff dashboard access is assigned explicitly to authorized organizers; the agenda's staff table is a reference, not an authentication mechanism.

### Approximate roster matching

* Match on the backend against both rosters, deduplicated by Person identity. Normalize case, whitespace and punctuation and tolerate minor spelling differences. Support partial-name matching while the attendee types; use affiliation as an optional refinement, not a prerequisite.
* Start suggestions when the name contains at least five letters, excluding whitespace and punctuation. Hide and clear suggestions if input drops below that threshold.
* Debounce requests by approximately 200 ms and discard stale responses so suggestions always correspond to the latest input. Keep suggestions keyboard-accessible and easy to select on mobile.
* Display all near matches, ordered by relevance, with name and affiliation only. Define and test a near-match threshold with synthetic examples; do not require one uniquely confident candidate or hide other near matches. If results are paginated, make all matching candidates accessible.
* Require explicit candidate selection even when only one result remains; do not automatically choose a person. Then prefill email and primary track for review. If no suitable candidate appears, allow further typing or staff assistance. A failed approximate match is not proof that someone is missing from the rosters; staff must check before using manual override.
* Return only the candidate summaries and selected details needed for check-in, not the full roster or unrestricted FHIR data. Bind the subsequent submission to the selected identity on the backend; a track change must not create a new participant.
* This event deliberately prioritizes quick self-service selection: attendees are expected to choose their correct name. Suggestions and selection are not identity verification and can disclose roster membership, affiliation and the selected person's email. Document this accepted event-specific tradeoff in the privacy notice.
* Rate-limit abusive matching traffic without disrupting normal typing, and avoid caching or logging returned email addresses in browser diagnostics.
* Prefill is a draft only. Do not save attendance, change the imported track or queue email until the attendee explicitly confirms and the FHIR transaction succeeds.

### Manual override: person missing from both rosters

1. If no match is found in either roster, direct the person to authorized registration staff rather than rejecting them or allowing unrestricted self-service registration.
2. Staff checks for an existing Person, Practitioner or check-in to avoid duplicates, then selects **Manual registration**.
3. Staff enters and confirms name, email, affiliation and optional primary track, confirms the event role (attendee by default; track lead only after verification), and records an override reason.
4. The backend enforces staff authorization and normal validation. Create a stable Person identity, a linked Practitioner with the event-role qualification, a check-in entry referencing the Practitioner and marked as manual, and a confirmation-email Task in the same FHIR transaction used for normal check-in.
5. Display the normal confirmation and queue the email. Record the authorization in the audit log; do not add the person to either preloaded roster or grant dashboard access.

Manual override bypasses roster membership only, not validation, duplicate protection or successful FHIR persistence.

## Local hosting and privacy

* `localhost` is usable only on the hosting PC. Phones need a reachable venue-network address and HTTPS with a certificate trusted by their devices.
* Verify venue Wi-Fi permits phone-to-PC connections. Expose only the application port through Windows Firewall; keep the FHIR server and databases private.
* Provide a QR code for the check-in URL and keep a staffed kiosk as fallback.
* Never commit real attendee rosters, databases, exports or secrets to GitHub. Only synthetic FHIR examples belong in the public IG.
* Extend the [2026 privacy notice](../input/pagecontent/privacy.md) to cover check-in timestamps, Brevo processing and a concrete retention/deletion schedule before using real data.

## Other scripts

* Import a manual CSV export from the 2026 Google Sheet into Persons and the advance-sign-up List.
* Validate columns, report invalid rows and ambiguous duplicates, and preserve stable attendee IDs across repeat imports.
* Do not import dietary information or other fields unnecessary for check-in.
* Import staff names, affiliations and track associations from the agenda table into Persons and the staff List so track leads can check in without a Google Sheet entry. Resolve grouped entries with an organizer before any person-level import; do not invent individual records from team descriptions.
* Preserve expected event roles in roster entry flags after organizer review. Neither import creates Practitioners; those resources are created only on successful check-in.

## Implementation and verification

Perform application implementation and maintain all application-specific FHIR profiles, extensions, terminology, examples and IG build sources in the separate repository at `D:\Programdisk-2\GitRepo\hackaton-registration-app`.

1. Prove the local Medplum FHIR server, its resource use, phone connectivity and Brevo test email on the Windows PC.
2. Define and validate the Person, Practitioner, List and Task profiles, participation-role terminology and track terminology.
3. Build the check-in form and transactional FHIR persistence.
4. Add both roster imports, authenticated staff lookup, manual override, FHIR-backed dashboard and email worker.
5. Rehearse with synthetic data: imports creating Persons but no Practitioners, track-lead-only roster membership, correct attendee/track-lead qualification codes, a person in both rosters producing one linked Practitioner, authorized manual registration, unauthorized override rejection, duplicate and simultaneous submissions, FHIR failure, Brevo outage, process restart, and backup/restore.
6. Verify live matching with partial names, minor typos, similar names, optional affiliation refinement and no match. Confirm suggestions start at five letters, clear below that threshold, show all near matches and ignore stale responses during rapid typing. Verify keyboard and mobile selection, and that email and track prefill only after explicit selection. Confirm draft edits do not persist before submission and a changed track is saved on both resources and reflected in dashboard counts and email without changing identity or event role.

Acceptance requires profile-valid resources on Medplum, Person-only preloaded rosters, Practitioner-based check-ins linked to Persons, accurate attendee/track-lead counts from qualification codes, track-lead check-in without advance attendee sign-up, staff-authorized manual registration for people in neither roster, accurate deduplicated roster/check-in/track counts through FHIR reads, no false success on FHIR failure, persistent queued email work, and no public access to attendee lists or backend credentials.
