/**
 * Run createHackathonFeedbackForm in Google Apps Script.
 * Each run creates a new, unpublished form and response spreadsheet.
 */
function createHackathonFeedbackForm() {
  const title = 'Norwegian FHIR Hackathon 2026 - Your feedback';
  const tracks = [
    "Digital home monitoring / Patient's Plans - modeling self-care plans as FHIR",
    'SMART on FHIR',
    'API access and document sharing - IHE MHD / European Health Data API',
    'EHDS Patient Summary',
    'Medication Definition - EMA/NOMA services, reimbursement and decision support',
    'FHIR 101 - FHIR fundamentals, implementation guides and practical assignments'
  ];
  const satisfaction = [
    '1 - Very dissatisfied',
    '2 - Dissatisfied',
    '3 - Neither satisfied nor dissatisfied',
    '4 - Satisfied',
    '5 - Very satisfied'
  ];
  const form = FormApp.create(title, false);
  Logger.log('Created draft form (also available if setup fails): ' + form.getEditUrl());
  form.setDescription(
    'Thank you for participating in the Norwegian FHIR Hackathon on 9 November 2026! ' +
    'Help us understand what worked, what did not, and what we should repeat or improve next time.\n\n' +
    'Estimated completion time: 5-7 minutes. Please evaluate only activities you took part in. ' +
    'Critical feedback is welcome, and comments are optional.\n\n' +
    'This form does not collect names or email addresses. Responses will be reviewed by the ' +
    'organizing team and reported in aggregate. Role and track combinations may still identify ' +
    'people in small groups.\n\n' +
    'Please avoid names, patient information, credentials or other sensitive information in comments.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setPublishingSummary(false);
  form.setIsQuiz(false);
  form.setShuffleQuestions(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Thank you! Your feedback will help us plan the next Norwegian FHIR hackathon.'
  );

  form.addSectionHeaderItem().setTitle('1. Your participation');
  addCheckboxQuestion(form, '1. In what role(s) did you participate?', [
    'Attendee',
    'Track lead / co-lead / facilitator',
    'Event organizer / planning partner',
    'Prefer not to say'
  ], true, true).setHelpText(
    'Select all that apply. Organizers may also have attended tracks. ' +
    'Choose "Prefer not to say" alone if you do not want to disclose your role.'
  );
  addCheckboxQuestion(form, '2. Which track(s) did you actively participate in?',
    tracks.concat(['Plenary sessions / event organization only']), true, true
  ).setHelpText(
    'Count working sessions, not just plenary introductions. ' +
    'Choose "Plenary sessions / event organization only" alone if you did not join a track.'
  );
  addChoiceQuestion(form, '3. Which track did you spend the most time in?',
    tracks.concat([
      'Time divided equally across tracks',
      'Plenary sessions / event organization only',
      'Other'
    ])
  );
  addChoiceQuestion(form, '4. How much experience did you have with FHIR before the event?', [
    'None',
    'Basic knowledge, little practical experience',
    'Some hands-on experience',
    'Extensive hands-on experience',
    'Prefer not to say'
  ]);

  form.addPageBreakItem().setTitle('2. The overall event');
  addChoiceQuestion(form, '5. Overall, how satisfied were you with the hackathon?',
    satisfaction, true
  );
  addRatingGrid(form, '6. How would you rate the following parts of the event?', [
    'Information and preparation instructions before the event',
    'Virtual pre-meeting on 2 November',
    'Welcome and plenary track introductions',
    'Opportunities to collaborate and meet other participants',
    'Final demos, summaries and discussion',
    'Venue and working spaces',
    'Wi-Fi and practical facilities',
    'Lunch and refreshments'
  ], satisfaction.concat(['Did not attend / Not applicable']));
  addRatingGrid(form, '7. How was the amount of time allocated to each activity?', [
    'Plenary introductions',
    'Hands-on work in tracks',
    'Breaks and informal networking',
    'Final demos and discussion'
  ], ['Too little', 'About right', 'Too much', 'Did not attend']);
  addChoiceQuestion(form, '8. To what extent did the event meet your expectations?', [
    'Not at all',
    'To a small extent',
    'To some extent',
    'To a large extent',
    'Completely',
    'I had no specific expectations'
  ]);

  form.addPageBreakItem()
    .setTitle('3. Your track experience')
    .setHelpText('Answer for your main track. Skip this section if you did not participate in a track.');
  addRatingGrid(form, '9. How would you rate the following in your main track?', [
    'Clarity of goals and assignments',
    'Relevance to your interests or work',
    'Suitability for your experience level',
    'Documentation and examples',
    'Access to tools, APIs, test data and environments',
    'Support from track leads',
    'Opportunities for practical participation'
  ], satisfaction.concat(['Not applicable']));
  addCheckboxQuestion(form, '10. What did you get out of the track?', [
    'Better understanding of FHIR or the relevant specifications',
    'Practical experience with tools or APIs',
    'A model, profile, implementation guide or documented design',
    'A working application, integration or successful API interaction',
    'Example resources or validation results',
    'Useful discussion, feedback or identification of open issues',
    'New contacts or potential collaborators',
    'Clear next steps for my work',
    'I did not achieve a useful outcome'
  ], false, true).setHelpText(
    'Select all that apply. Discussions and design work count as useful outcomes, ' +
    'not just working software. Select "I did not achieve a useful outcome" alone if applicable.'
  );
  addCheckboxQuestion(form, '11. What, if anything, prevented you from making progress?', [
    'Unclear preparation requirements',
    'Installation or tooling problems',
    'API access, authentication or credentials',
    'Unavailable or unstable test environment',
    'Missing documentation, examples or test data',
    'Difficulty level did not match my experience',
    'Not enough time',
    'Insufficient access to help',
    'No significant barriers'
  ], false, true).setHelpText(
    'Select all that apply, or select "No significant barriers" alone.'
  );

  form.addPageBreakItem().setTitle('4. Keep, change and improve');
  addCommentQuestion(form,
    '12. What did you like most, and what should we definitely repeat next time?');
  addCommentQuestion(form,
    '13. What did you dislike or find least useful? What would have made it better?');
  addCommentQuestion(form,
    '14. If we could make only ONE improvement next time, what should it be?');
  addCommentQuestion(form,
    '15. Which tracks, topics or activities would you like at the next hackathon?'
  ).setHelpText('Existing tracks, new topics and format suggestions are all welcome.');
  addChoiceQuestion(form,
    '16. Would you attend or help organize another Norwegian FHIR hackathon?', [
      'Definitely yes',
      'Probably yes',
      'Unsure',
      'Probably not',
      'Definitely not'
    ]
  );
  addCommentQuestion(form, 'What most influenced your answer about participating again?');

  const organizerRouting = form.addMultipleChoiceItem()
    .setTitle('Did you help organize the event or lead/facilitate a track?')
    .setHelpText('This determines whether you see the additional organizer questions.')
    .setRequired(true);
  const organizerSection = form.addPageBreakItem()
    .setTitle('5. Additional questions for track leads and organizers');
  organizerRouting.setChoices([
    organizerRouting.createChoice('Yes', organizerSection),
    organizerRouting.createChoice('No', FormApp.PageNavigationType.SUBMIT),
    organizerRouting.createChoice('Prefer not to say', FormApp.PageNavigationType.SUBMIT)
  ]);

  addCheckboxQuestion(form, '17. Which track(s) did you lead or help facilitate?',
    tracks.concat(['Event-wide organization only']), false, true
  );
  addRatingGrid(form, '18. How would you rate the organizational support?', [
    'Clarity of your role and responsibilities',
    'Coordination with the organizing team',
    'Time available to prepare',
    'Information about participant numbers and experience',
    'Support for preparing tools, access and test environments',
    'Rooms, equipment and on-the-day logistics'
  ], satisfaction.concat(['Not applicable']));
  addCommentQuestion(form,
    "19. From an organizer's perspective, what should we keep or change?"
  ).setHelpText(
    'Consider preparation workload, coordination, group size, participant readiness, ' +
    'co-facilitation, and documenting or following up results.'
  );

  const spreadsheet = SpreadsheetApp.create('Norwegian FHIR Hackathon 2026 - Feedback responses');
  Logger.log('Created response spreadsheet: ' + spreadsheet.getUrl());
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  const urls = {
    editUrl: form.getEditUrl(),
    responderUrl: form.getPublishedUrl(),
    spreadsheetUrl: spreadsheet.getUrl()
  };
  Logger.log('Setup complete. The form is UNPUBLISHED; review access settings and publish before sharing.');
  Logger.log(JSON.stringify(urls, null, 2));
  return urls;
}

function addCheckboxQuestion(form, title, choices, required, allowOther) {
  return form.addCheckboxItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .setRequired(required)
    .showOtherOption(allowOther);
}

function addChoiceQuestion(form, title, choices, required = false) {
  return form.addMultipleChoiceItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .setRequired(required);
}

function addRatingGrid(form, title, rows, columns) {
  return form.addGridItem()
    .setTitle(title)
    .setRows(rows)
    .setColumns(columns)
    .setRequired(false);
}

function addCommentQuestion(form, title) {
  return form.addParagraphTextItem().setTitle(title).setRequired(false);
}
