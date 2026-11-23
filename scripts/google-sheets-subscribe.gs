/**
 * Google Apps Script — receives homepage subscription sign-ups and appends
 * them to the bound Google Sheet.
 *
 * Setup:
 *  1. Create a Google Sheet (e.g. "Maatir Maanush — Subscribers").
 *  2. Extensions → Apps Script. Replace the default code with this file.
 *  3. (Optional) Set SECRET below to a random string and put the same value
 *     in GOOGLE_SHEETS_WEBHOOK_SECRET in the site's env.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *  5. Copy the Web app URL (ends in /exec) into GOOGLE_SHEETS_WEBHOOK_URL
 *     in .env.local and in the hosting provider's env vars, then redeploy.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit →
 * Version: New version, so the same /exec URL keeps working.
 */

var SECRET = ''            // must match GOOGLE_SHEETS_WEBHOOK_SECRET (leave '' to disable)
var SHEET_NAME = 'Subscribers'

function doPost(e) {
  var lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    var data = JSON.parse(e.postData.contents || '{}')
    if (SECRET && data.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorized' })
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Contact Number', 'Source'])
      sheet.setFrozenRows(1)
    }

    sheet.appendRow([
      new Date(),
      String(data.name || ''),
      // Leading apostrophe keeps "+91…" and leading zeros as text.
      "'" + String(data.phone || ''),
      String(data.source || ''),
    ])

    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
