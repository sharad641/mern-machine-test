import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import xlsx from 'xlsx';

const normalizeKey = (k='') => k.toString().trim().replace(/\s+/g, '').toLowerCase();

const mapRow = (row) => {
  // Accept headers case-insensitively and with/without spaces
  const mapped = {};
  for (const [k, v] of Object.entries(row)) {
    mapped[normalizeKey(k)] = v;
  }
  const firstName = mapped['firstname'] || mapped['first_name'] || mapped['name'] || '';
  const phone = mapped['phone'] || mapped['phonenumber'] || mapped['mobile'] || mapped['number'] || '';
  const notes = mapped['notes'] || mapped['note'] || '';
  return { firstName: String(firstName || '').trim(), phone: String(phone || '').trim(), notes: String(notes || '').trim() };
};

export const parseUploadFile = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  let rows = [];
  if (ext === '.csv') {
    const content = fs.readFileSync(filePath, 'utf-8');
    const records = parse(content, { columns: true, skip_empty_lines: true });
    rows = records.map(mapRow);
  } else if (ext === '.xlsx' || ext === '.xls') {
    const wb = xlsx.readFile(filePath);
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const json = xlsx.utils.sheet_to_json(ws, { defval: '' });
    rows = json.map(mapRow);
  } else {
    throw new Error('Unsupported file type');
  }

  // Basic validation
  const invalid = rows.filter(r => !r.firstName || !r.phone);
  if (invalid.length > 0) {
    throw new Error('Some rows missing required fields FirstName or Phone');
  }
  return rows;
};
