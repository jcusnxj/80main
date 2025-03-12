import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path'; 

// Load environment variables from .env file
dotenv.config();

async function fetchAndSaveGoogleSheetsData() {
const sheets = google.sheets('v4');
const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
const sheetId = process.env.GOOGLE_SHEET_ID;
const range1 = 'log!A:K';
const range2 = 'monthly!A:K';

if (!apiKey || !sheetId) {
throw new Error('Missing required environment variables.');
}

async function fetchSheetData(range) {
try {
const response = await sheets.spreadsheets.values.get({
key: apiKey,
spreadsheetId: sheetId,
range,
});

const rows = response.data.values;

if (!rows || rows.length === 0) {
console.log(`No data found for range: ${range}`);
return { headers: [], dataRows: [] };
}

const headers = rows[0];
const dataRows = rows.slice(1);

return { headers, dataRows };

} catch (error) {

console.error(`Error fetching data for range: ${range}`, error);
return { headers: [], dataRows: [] };
}
}

const [sheet1, sheet2] = await Promise.all([
fetchSheetData(range1),
fetchSheetData(range2),
]);

const workout = sheet1.dataRows.map((row) => ({
date: row[sheet1.headers.indexOf('date')],
distance: row[sheet1.headers.indexOf('distance')],
duration: row[sheet1.headers.indexOf('duration')],
pace: row[sheet1.headers.indexOf('pace')],
avghr: row[sheet1.headers.indexOf('avghr')],
ascent: row[sheet1.headers.indexOf('ascent')],
cadence: row[sheet1.headers.indexOf('cadence')],
garmin: row[sheet1.headers.indexOf('garmin')],
location: row[sheet1.headers.indexOf('location')],
id: row[sheet1.headers.indexOf('id')],
post: row[sheet1.headers.indexOf('post')],
}));

const monthly = sheet2.dataRows.map((row) => ({
month: row[sheet2.headers.indexOf('month')],
eomonth: row[sheet2.headers.indexOf('eomonth')],
distance: row[sheet2.headers.indexOf('distance')],
duration: row[sheet2.headers.indexOf('duration')],
pace: row[sheet2.headers.indexOf('pace')],
avghr: row[sheet2.headers.indexOf('avghr')],
ascent: row[sheet2.headers.indexOf('ascent')],
cadence: row[sheet2.headers.indexOf('cadence')],
id: row[sheet2.headers.indexOf('id')],
weight: row[sheet2.headers.indexOf('weight')],
bodyfat: row[sheet2.headers.indexOf('bodyfat')],
}));

// Define paths for output files
const dataDir = path.resolve('views/_data');
const workoutFile = path.join(dataDir, 'workout.json');
const monthlyFile = path.join(dataDir, 'monthly.json'); 

try {
// Ensure the _data directory exists
await fs.mkdir(dataDir, { recursive: true });

// Save data to JSON files
await fs.writeFile(workoutFile, JSON.stringify(workout, null, 2), 'utf-8');
console.log(`Workout data saved to ${workoutFile}`);

await fs.writeFile(monthlyFile, JSON.stringify(monthly, null, 2), 'utf-8');
console.log(`Monthly data saved to ${monthlyFile}`);

} catch (error) {

console.error('Error writing data to files:', error);
}
}

// Run the script
fetchAndSaveGoogleSheetsData()
.then(() => console.log('Google Sheets data fetched and saved successfully.'))
.catch((error) => console.error('Error fetching Google Sheets data:', error));