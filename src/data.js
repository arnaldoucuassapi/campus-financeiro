import { Bus, Coffee, GraduationCap, PiggyBank, Target, Utensils, WalletCards } from 'lucide-react';
import { daysAgo, monthsAgo } from './utils.js';

// Valores em kwanzas (Kz). O ícone e a cor de cada transação vêm da categoria.
export const CATEGORIES = {
  Educação: { icon: GraduationCap, color: 'bg-tangerine', limit: 70000 },
  Alimentação: { icon: Utensils, color: 'bg-lime-dark', limit: 50000 },
  Transporte: { icon: Bus, color: 'bg-ink text-paper', limit: 15000 },
  Lazer: { icon: Coffee, color: 'bg-yellow-300', limit: 10000 },
  Renda: { icon: WalletCards, color: 'bg-lime', limit: 0 },
};
export const EXPENSE_CATEGORIES = Object.keys(CATEGORIES).filter((name) => name !== 'Renda');
export const BUDGET_TOTAL = EXPENSE_CATEGORIES.reduce(
  (sum, name) => sum + CATEGORIES[name].limit,
  0,
);

export const initialTransactions = [
  {
    id: 1,
    title: 'Bolsa de estudos',
    category: 'Renda',
    type: 'income',
    amount: 180000,
    date: daysAgo(0, 9, 42),
  },
  {
    id: 2,
    title: 'Mensalidade — Engenharia',
    category: 'Educação',
    type: 'expense',
    amount: 68000,
    date: daysAgo(0, 8, 15),
  },
  {
    id: 3,
    title: 'Supermercado Ponto Certo',
    category: 'Alimentação',
    type: 'expense',
    amount: 42500,
    date: daysAgo(1, 18, 30),
  },
  {
    id: 4,
    title: 'Café da biblioteca',
    category: 'Lazer',
    type: 'expense',
    amount: 1800,
    date: daysAgo(1, 15, 20),
  },
  {
    id: 5,
    title: 'Freela — revisão de texto',
    category: 'Renda',
    type: 'income',
    amount: 35000,
    date: daysAgo(3, 14, 0),
  },
  {
    id: 6,
    title: 'Táxi mensal',
    category: 'Transporte',
    type: 'expense',
    amount: 12000,
    date: daysAgo(4, 10, 10),
  },
  {
    id: 7,
    title: 'Bolsa de estudos',
    category: 'Renda',
    type: 'income',
    amount: 180000,
    date: monthsAgo(1, 2),
  },
  {
    id: 8,
    title: 'Mensalidade — Engenharia',
    category: 'Educação',
    type: 'expense',
    amount: 68000,
    date: monthsAgo(1, 5),
  },
  {
    id: 9,
    title: 'Supermercado Ponto Certo',
    category: 'Alimentação',
    type: 'expense',
    amount: 51000,
    date: monthsAgo(1, 14),
  },
  {
    id: 10,
    title: 'Cinema',
    category: 'Lazer',
    type: 'expense',
    amount: 8500,
    date: monthsAgo(1, 20),
  },
  {
    id: 11,
    title: 'Bolsa de estudos',
    category: 'Renda',
    type: 'income',
    amount: 180000,
    date: monthsAgo(2, 2),
  },
  {
    id: 12,
    title: 'Mensalidade — Engenharia',
    category: 'Educação',
    type: 'expense',
    amount: 68000,
    date: monthsAgo(2, 5),
  },
  {
    id: 13,
    title: 'Táxi mensal',
    category: 'Transporte',
    type: 'expense',
    amount: 14000,
    date: monthsAgo(2, 8),
  },
  {
    id: 14,
    title: 'Mercado',
    category: 'Alimentação',
    type: 'expense',
    amount: 47000,
    date: monthsAgo(2, 16),
  },
];

export const upcomingPayments = [
  { title: 'Internet', day: 20, value: 15000 },
  { title: 'Renda do quarto', day: 25, value: 45000 },
  { title: 'Pacote de dados', day: 28, value: 5000 },
];

export const initialGoals = [
  { id: 1, title: 'Notebook novo', saved: 157500, target: 450000 },
  { id: 2, title: 'Viagem de férias', saved: 208000, target: 300000 },
  { id: 3, title: 'Reserva de emergência', saved: 64000, target: 600000 },
];
export const GOAL_STYLES = [
  { icon: GraduationCap, color: 'bg-lime' },
  { icon: Target, color: 'bg-tangerine' },
  { icon: PiggyBank, color: 'bg-blue-100' },
];
