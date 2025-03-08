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
    const range = 'monthly!A:K';

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

    const sheet = await fetchSheetData(range);

    const monthly = sheet.dataRows.map((row) => ({
        month: row[sheet.headers.indexOf('month')],
        eomonth: row[sheet.headers.indexOf('eomonth')],
        distance: row[sheet.headers.indexOf('distance')],
        duration: row[sheet.headers.indexOf('duration')],
        pace: row[sheet.headers.indexOf('pace')],
        avghr: row[sheet.headers.indexOf('avghr')],
        ascent: row[sheet.headers.indexOf('ascent')],
        cadence: row[sheet.headers.indexOf('cadence')],
        id: row[sheet.headers.indexOf('id')],
        weight: row[sheet.headers.indexOf('weight')],
        bodyfat: row[sheet.headers.indexOf('bodyfat')],
    }));

    // Define path for output file
    const dataDir = path.resolve('views/_data');
    const monthlyFile = path.join(dataDir, 'monthly.json');

    try {
        // Ensure the _data directory exists
        await fs.mkdir(dataDir, { recursive: true });

        // Save data to JSON file
        await fs.writeFile(monthlyFile, JSON.stringify(monthly, null, 2), 'utf-8');
        console.log(`Monthly data saved to ${monthlyFile}`);
    } catch (error) {
        console.error('Error writing data to file:', error);
    }
}

// Run the script
fetchAndSaveGoogleSheetsData()
    .then(() => console.log('Google Sheets data fetched and saved successfully.'))
    .catch((error) => console.error('Error fetching Google Sheets data:', error));
