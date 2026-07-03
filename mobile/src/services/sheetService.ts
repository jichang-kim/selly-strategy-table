import { TimelineEntry } from '../types/campaign';

const SHEET_ID = '1VX7kVN1upX1qFhitwQw46ukmH6FY-Iu2oAo8llyjAsA';
const GID = '490025442';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

function parseSheetDate(value: string | null): string | null {
  if (!value) return null;
  const match = /Date\((\d+),(\d+),(\d+)\)/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) + 1;
  const day = Number(match[3]);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseRows(rows: any[]): TimelineEntry[] {
  return rows
    .map((row, index) => {
      const cells = row.c || [];
      return {
        id: String(index),
        orderDate: parseSheetDate(cells[1]?.v),
        orderWeekday: cells[2]?.v,
        arrivalDate: parseSheetDate(cells[3]?.v),
        arrivalWeekday: cells[4]?.v,
        type: cells[5]?.v,
        item: cells[6]?.v,
        eventPrice: cells[9]?.v ?? null,
        discount: cells[10]?.v ?? null,
        quantity: cells[12]?.v ?? null,
        plannedLoss: cells[13]?.v ?? null,
        status: cells[19]?.v ?? '예정',
      };
    })
    .filter(entry => entry.item && entry.status !== '취소');
}

export async function fetchCalendarEntries(): Promise<TimelineEntry[]> {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  const match = /google\.visualization\.Query\.setResponse\((.*)\);/s.exec(text);
  if (!match) {
    throw new Error('Google Sheet response parse error');
  }
  const json = JSON.parse(match[1]);
  return parseRows(json.table.rows);
}
