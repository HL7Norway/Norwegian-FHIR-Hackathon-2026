# Generate the 2026 hackathon evaluation form

[create-feedback-form.gs](create-feedback-form.gs) creates the proposed English-language
questionnaire in Google Forms and links it to a new Google Sheets response spreadsheet.
It includes all 19 numbered questions, optional comments, and organizer-only branching.
The track section is optional and asks respondents to evaluate their main track.

## Run the script

1. Sign in to the Google account that should own the form and response spreadsheet.
2. Open [Google Apps Script](https://script.google.com) and create a **New project**.
3. Replace the contents of the default `Code.gs` file with the entire contents of
   [create-feedback-form.gs](create-feedback-form.gs).
4. Save the project, select **createHackathonFeedbackForm** in the function selector,
   and click **Run**.
5. On the first run, review and authorize access to Google Forms and Google Sheets.
   If your organization's Google Workspace policy blocks authorization, contact
   your administrator rather than bypassing the restriction.
6. Open the **Execution log** for the form editing URL, responder URL and spreadsheet URL.

Every run creates a **new** form and spreadsheet. Do not rerun just to reopen the form;
use the logged editing URL or find it in Google Drive. If an execution fails, inspect
the error and the logged draft URL before retrying: a partial form or spreadsheet
may already exist. The script does not delete existing files or change existing forms.

## Review before sharing

The script deliberately creates an **unpublished** form so you can review it first.

- Open the editing URL and check the questions and privacy description.
- Confirm that email collection and response summaries are off.
- Review responder access in Google's publishing/access controls. Allow the intended
  attendees, including people outside your organization where appropriate. Workspace
  policies may restrict this; the script does not override those policies.
- Keep one-response-per-user restrictions off if you do not want to require Google sign-in.
- Preview on a phone and test the routing question at the end of the shared feedback:
  **Yes** opens organizer feedback; **No** and **Prefer not to say** submit the form.
  The final organizer section submits normally.
- Check that someone with no track participation can skip the optional track questions.
- Publish the form, verify that it accepts responses, and test the responder link with
  an account outside the owning organization or in a signed-out browser as appropriate.
- Share the **responder URL**, not the editing or spreadsheet URL. Use it in an email
  or QR code during the final plenary.

The required questions are roles, tracks attended, overall satisfaction and the
organizer routing question. All other questions are optional. Grids allow repeated
ratings across rows; they do not impose one answer per column.

## Handling feedback

Restrict editing and spreadsheet access to the organizing team. The form does not
ask for names, email addresses or organizations, but free text and small role/track
combinations can still identify people. Avoid publishing raw responses or identifiable
small-group breakdowns. Report results as **Keep / Change / Priority for next year**.

The generator can be checked locally with mocked Apps Script services, but authorization,
Google Workspace access policies, publishing and real submissions must be checked in
Google Forms after running it.
