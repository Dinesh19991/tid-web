/**
 * Waitlist endpoint — Google Apps Script (Web App)
 * ------------------------------------------------------------------
 * This is the SOURCE OF RECORD for the script that powers the website
 * waitlist. The LIVE copy runs in the Google Apps Script project named
 * "TID", bound to the waitlist Google Sheet, and is exposed as a Web App
 * whose /exec URL is set in Vercel as VITE_WAITLIST_ENDPOINT (see
 * ../src/lib/waitlist.ts).
 *
 * What it does on each signup POST:
 *   1. Appends the signup to the first sheet: [date, email, source, ts]
 *   2. Sends the confirmation email via Resend from noreply@trytid.com,
 *      using the live template at https://www.trytid.com/waitlist-email.html
 *      (../public/waitlist-email.html). Because it FETCHES that file, any
 *      future template edit just needs a site redeploy — no script change.
 *
 * Requires a Script Property:  RESEND_API_KEY  (Project Settings → Script
 * Properties). Use the same Resend key the app uses.
 *
 * IMPORTANT: editing this file does NOT change the live email. To ship a
 * change, paste it into the Apps Script editor and redeploy:
 *   Deploy → Manage deployments → Edit → Version: "New version" → Deploy.
 */

// ===== CONFIG =====
var TEMPLATE_URL = 'https://www.trytid.com/waitlist-email.html'; // live welcome template

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var email = (e.parameter.email || '').trim();
    if (email) {
      // 1) log the signup — columns: date | email | source | ts
      sheet.appendRow([new Date(), email, e.parameter.source || '', e.parameter.ts || '']);

      // 2) send the confirmation via Resend, using the live template
      var html = UrlFetchApp.fetch(TEMPLATE_URL).getContentText();
      var apiKey = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
      UrlFetchApp.fetch('https://api.resend.com/emails', {
        method: 'post',
        contentType: 'application/json',
        headers: { 'Authorization': 'Bearer ' + apiKey },
        muteHttpExceptions: true,
        payload: JSON.stringify({
          from: 'Tid <noreply@trytid.com>',
          to: [email],
          subject: "You're on the Tid waitlist ✦",
          html: html
        })
      });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional manual test — set your email, then Run ▸ testWaitlistEmail.
function testWaitlistEmail() {
  var TEST_TO = 'you@example.com'; // ← your email
  var html = UrlFetchApp.fetch(TEMPLATE_URL).getContentText();
  var apiKey = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  var resp = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post', contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + apiKey }, muteHttpExceptions: true,
    payload: JSON.stringify({ from: 'Tid <noreply@trytid.com>', to: [TEST_TO], subject: "You're on the Tid waitlist ✦", html: html })
  });
  Logger.log(resp.getResponseCode() + ' ' + resp.getContentText());
}
