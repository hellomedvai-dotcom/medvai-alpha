/**
 * MEDVAI Careers Application - Google Apps Script Backend
 * 
 * AUTOMATIC GOOGLE SHEETS CONNECTOR SCRIPT
 * 
 * How to deploy in 30 seconds:
 * 1. Open your target Google Sheet (or create a new blank Google Sheet).
 * 2. Click Extensions > Apps Script in the Google Sheets top menu.
 * 3. Delete any code in Code.gs and paste THIS entire file content.
 * 4. Click "Deploy" > "New deployment" (top right button).
 * 5. Select type: "Web app" (click gear icon next to "Select type").
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"  <-- CRITICAL FOR FRONTEND SUBMISSIONS
 * 8. Click "Deploy", authorize permissions when prompted, and copy the "Web app URL".
 * 9. Paste the Web App URL into your environment variable: VITE_GOOGLE_SHEETS_SCRIPT_URL
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for lock to avoid race conditions with multiple submissions
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create styled headers if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Email',
        'Role Applied For',
        'Phone',
        'Location',
        'Experience',
        'Availability',
        'LinkedIn',
        'GitHub',
        'Portfolio',
        'Resume Link',
        'Strongest Role',
        'Tech Stack',
        'Hours / Week',
        'Motivation',
        'Application Q&A'
      ]);
      
      // Style headers: Bold, Dark Background, White Text
      var headerRange = sheet.getRange(1, 1, 1, 17);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0f172a');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Parse incoming JSON body
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.email || '',
      data.role || '',
      data.phone || '',
      data.location || '',
      data.experience || '',
      data.availability || '',
      data.linkedIn || '',
      data.gitHub || '',
      data.portfolio || '',
      data.resumeLink || '',
      data.q8_strongest_role || '',
      data.q9_tech_stack || '',
      data.q10_hours || '',
      data.q12_motivation || '',
      data.qaBlob || ''
    ]);

    // Send email notification
    var emailBody = 'MEDVAI APPLICATION\n\n' +
      'Name:\n' + (data.fullName || 'Not provided') + '\n\n' +
      'Email:\n' + (data.email || 'Not provided') + '\n\n' +
      'Phone:\n' + (data.phone || 'Not provided') + '\n\n' +
      'Location:\n' + (data.location || 'Not provided') + '\n\n' +
      'Portfolio:\n' + (data.portfolio || 'Not provided') + '\n\n' +
      'LinkedIn:\n' + (data.linkedIn || 'Not provided') + '\n\n' +
      'GitHub:\n' + (data.gitHub || 'Not provided') + '\n\n' +
      'Experience:\n' + (data.experience || 'Not provided') + '\n\n' +
      'Availability:\n' + (data.availability || data.q10_hours || 'Not provided') + '\n\n' +
      'Role:\n' + (data.role || 'Not provided') + '\n\n' +
      'Role-specific answers:\n\n' +
      (data.qaBlob || 'Not provided') +
      'Additional message:\n' + (data.additionalMessage || 'Not provided');
      
      
      MailApp.sendEmail({
        to: 'hellomedvai@gmail.com',
        subject: 'New MEDVAI Team Application — ' + (data.role || ''),
        body: emailBody
      });

      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', message: 'MEDVAI Google Sheets Connector Web App is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
