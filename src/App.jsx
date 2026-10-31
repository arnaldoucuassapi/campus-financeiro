import { useCallback, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  LayoutDashboard,
  Menu,
  Plus,
  Target,
  X,
} from 'lucide-react';
import { GoalDialog, MonthSelect, TransactionDialog } from './components.jsx';
import { initialGoals, initialTransactions } from './data.js';
import { BudgetPage, GoalsPage, Overview, TransactionsPage } from './pages.jsx';
import { lastMonths, monthKey, normalize, summarize } from './utils.js';

const NAV = [
  { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transações', icon: ArrowUpRight },
  { id: 'budget', label: 'Orçamento', icon: BarChart3 },
  { id: 'goals', label: 'Metas', icon: Target },
];
const MONTHS = lastMonths(6); // do mês atual para trás

export default function App() {
  const [page, setPage] = useState('overview');
  const [month, setMonth] = useState(MONTHS[0].key);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todas');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [goals, setGoals] = useState(initialGoals);
  const [dialog, setDialog] = useState(null); // 'transaction' | 'goal' | null
  const [menuOpen, setMenuOpen] = useState(false);
  const closeDialog = useCallback(() => setDialog(null), []);

  const monthTransactions = useMemo(
    () =>
      transactions
        .filter((t) => monthKey(t.date) === month)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [transactions, month],
  );
  const totals = useMemo(() => summarize(monthTransactions), [monthTransactions]);
  const visible = useMemo(() => {
    const q = normalize(query);
    return monthTransactions.filter(
      (t) =>
        (normalize(t.title).includes(q) || normalize(t.category).includes(q)) &&
        (filter === 'Todas' || t.type === filter),
    );
  }, [monthTransactions, query, filter]);
  const history = useMemo(
    () =>
      [...MONTHS].reverse().map(({ key, date }) => ({
        key,
        date,
        ...summarize(transactions.filter((t) => monthKey(t.date) === key)),
      })),
    [transactions],
  );

  const addTransaction = (transaction) => {
    setTransactions((current) => [transaction, ...current]);
    setMonth(MONTHS[0].key); // mostra o mês onde a transação foi criada
    setDialog(null);
  };
  const deleteTransaction = (id) =>
    setTransactions((current) => current.filter((t) => t.id !== id));
  const addGoal = (goal) => {
    setGoals((current) => [...current, goal]);
    setDialog(null);
  };
  const goTo = (id) => {
    setPage(id);
    setMenuOpen(false);
  };

  const filters = { query, setQuery, filter, setFilter };
  const current = NAV.find((item) => item.id === page);

  return (
    <div className="min-h-screen bg-cream text-ink selection:bg-tangerine selection:text-white">
      {menuOpen && (
        <button
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-20 bg-ink/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r-2 border-ink bg-lime px-6 py-7 transition-[transform,visibility] lg:visible lg:translate-x-0 ${
          menuOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border-2 border-ink bg-paper shadow-retro-sm">
              <CircleDollarSign size={23} strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display text-xl font-bold leading-none">
                campus<span className="text-tangerine-dark">.</span>
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em]">gestão leve</p>
            </div>
          </div>
          <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu" className="lg:hidden">
            <X size={20} />
          </button>
        </div>
        <div className="mt-14 flex-1">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">
            Menu principal
          </p>
          <nav className="space-y-1">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                aria-current={page === id ? 'page' : undefined}
                className={`nav-link ${page === id ? 'nav-link-active' : ''}`}
              >
                <Icon size={18} />
                {label}
                {id === 'transactions' && (
                  <span className="ml-auto bg-ink px-2 py-0.5 text-[10px] text-lime">
                    {monthTransactions.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t-2 border-ink/20 pt-5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-tangerine font-display font-bold">
              AS
            </div>
            <div>
              <p className="text-sm font-bold">Gabriel Escutelo</p>
              <p className="text-xs text-ink/70">5º semestre · Eng. Informática</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="flex h-20 items-center justify-between gap-3 border-b-2 border-ink/10 bg-paper/80 px-5 backdrop-blur-sm sm:px-10">
          <button onClick={() => setMenuOpen(true)} aria-label="Abrir menu" className="lg:hidden">
            <Menu />
          </button>
          <div className="hidden items-center gap-2 text-sm font-bold sm:flex">
            <span className="text-ink/70">Minha conta</span>
            <span>/</span>
            <span>{current.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {page !== 'goals' && <MonthSelect value={month} onChange={setMonth} options={MONTHS} />}
            <button onClick={() => setDialog('transaction')} className="button-primary">
              <Plus size={17} strokeWidth={3} />
              <span className="hidden sm:inline">Nova transação</span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1450px] px-5 py-8 sm:px-10 lg:px-12">
          {page === 'overview' && (
            <Overview
              totals={totals}
              history={history}
              month={month}
              transactions={monthTransactions}
              onNavigate={goTo}
              onDelete={deleteTransaction}
            />
          )}
          {page === 'transactions' && (
            <TransactionsPage
              totals={totals}
              transactions={visible}
              filters={filters}
              onAdd={() => setDialog('transaction')}
              onDelete={deleteTransaction}
            />
          )}
          {page === 'budget' && <BudgetPage totals={totals} month={month} />}
          {page === 'goals' && <GoalsPage goals={goals} onAdd={() => setDialog('goal')} />}
          <footer className="flex flex-col justify-between gap-2 py-8 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/70 sm:flex-row">
            <span>Campus / {new Date().getFullYear()}</span>
            <span>Feito para respirar melhor com o dinheiro.</span>
          </footer>
        </div>
      </main>

      {dialog === 'transaction' && (
        <TransactionDialog onClose={closeDialog} onSave={addTransaction} />
      )}
      {dialog === 'goal' && <GoalDialog onClose={closeDialog} onSave={addGoal} />}
    </div>
  );
}
