const LOCALE = 'pt-AO';
const pad = (n) => String(n).padStart(2, '0');

// ---------- Moeda (Kwanza) ----------
const money = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'AOA',
  maximumFractionDigits: 0,
});
export const formatMoney = (value) => money.format(value);

// ---------- Texto ----------
export const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// ---------- Datas ----------
const timeFormat = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' });
const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'short' });
const longDate = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const monthLong = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' });
const monthShort = new Intl.DateTimeFormat(LOCALE, { month: 'short' });

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;

export const monthKey = (iso) => toKey(new Date(iso));
export const todayLabel = () => capitalize(longDate.format(new Date()));
export const monthLabel = (key) => {
  const [year, month] = key.split('-').map(Number);
  return capitalize(monthLong.format(new Date(year, month - 1, 1)));
};
export const shortMonth = (date) => capitalize(monthShort.format(date).replace('.', ''));

export function lastMonths(count) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return { key: toKey(date), date };
  });
}

export function formatDate(iso) {
  const date = new Date(iso);
  const diff = Math.round((startOfDay(new Date()) - startOfDay(date)) / 864e5);
  if (diff === 0) return `Hoje, ${timeFormat.format(date)}`;
  if (diff === 1) return `Ontem, ${timeFormat.format(date)}`;
  return dayFormat.format(date);
}

// Datas de exemplo, sempre relativas a hoje
export function daysAgo(days, hour = 12, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}
export function monthsAgo(months, day, hour = 12) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - months, day, hour).toISOString();
}

// ---------- Cálculos ----------
export function summarize(transactions) {
  const result = { income: 0, expense: 0, incomeCount: 0, expenseCount: 0, byCategory: {} };
  for (const { type, amount, category } of transactions) {
    if (type === 'income') {
      result.income += amount;
      result.incomeCount += 1;
    } else {
      result.expense += amount;
      result.expenseCount += 1;
      result.byCategory[category] = (result.byCategory[category] ?? 0) + amount;
    }
  }
  result.balance = result.income - result.expense;
  return result;
}
