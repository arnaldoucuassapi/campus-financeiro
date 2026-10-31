import { useEffect, useState } from 'react';
import { CalendarDays, Check, ChevronDown, Search, Trash2, X } from 'lucide-react';
import { CATEGORIES, EXPENSE_CATEGORIES } from './data.js';
import { formatDate, formatMoney, monthLabel, shortMonth } from './utils.js';

export function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="animate-rise flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow text-tangerine-dark">{eyebrow}</p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink/70">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Metric({ label, value, detail, icon: Icon, accent }) {
  return (
    <div
      className={`panel relative overflow-hidden ${accent === 'orange' ? 'bg-tangerine' : 'bg-lime'}`}
    >
      <div className="flex items-start justify-between">
        <p className="eyebrow text-ink/80">{label}</p>
        <div className="grid h-9 w-9 place-items-center border-2 border-ink/20 bg-paper/30">
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-7 font-display text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-2 flex items-center gap-1 text-xs font-bold text-ink/80">
        <Check size={13} strokeWidth={3} />
        {detail}
      </p>
      <div className="absolute -bottom-8 -right-5 h-28 w-28 rounded-full border-[18px] border-ink/10" />
    </div>
  );
}

export function Upcoming({ title, day, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-paper/10 py-3 last:border-0">
      <div className="grid h-9 w-9 place-items-center bg-paper/10">
        <CalendarDays size={16} className="text-lime" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-paper/70">vence dia {day}</p>
      </div>
      <span className="font-mono text-sm font-bold">{formatMoney(value)}</span>
    </div>
  );
}

export function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-ink/70">
        Nenhuma transação encontrada. Altera a pesquisa ou o mês, ou usa “Nova transação”.
      </p>
    );
  }
  return (
    <div className="divide-y-2 divide-ink/10">
      {transactions.map((t) => {
        const { icon: Icon, color } = CATEGORIES[t.category];
        const isIncome = t.type === 'income';
        return (
          <div key={t.id} className="flex items-center gap-3 py-4">
            <div className={`grid h-10 w-10 shrink-0 place-items-center ${color}`}>
              <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{t.title}</p>
              <p className="mt-1 text-xs text-ink/70">
                {t.category} · {formatDate(t.date)}
              </p>
            </div>
            <p className={`font-mono text-sm font-bold ${isIncome ? 'text-lime-ink' : ''}`}>
              {isIncome ? '+' : '−'}
              {formatMoney(t.amount)}
            </p>
            <button
              onClick={() => onDelete(t.id)}
              aria-label={`Apagar ${t.title}`}
              className="icon-button"
            >
              <Trash2 size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function TransactionFilters({ query, setQuery, filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2">
      <label className="flex items-center gap-2 border-2 border-ink/10 px-3 py-2">
        <Search size={15} className="text-ink/60" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar"
          aria-label="Buscar transações"
          className="w-28 bg-transparent text-xs outline-none placeholder:text-ink/60"
        />
      </label>
      <select
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        aria-label="Filtrar por tipo"
        className="border-2 border-ink/10 bg-transparent px-3 py-2 text-xs font-bold outline-none"
      >
        <option value="Todas">Todas</option>
        <option value="income">Entradas</option>
        <option value="expense">Saídas</option>
      </select>
    </div>
  );
}

export function MonthSelect({ value, onChange, options }) {
  return (
    <label className="relative flex items-center gap-3 border-2 border-ink/15 bg-paper px-3 py-2 text-sm font-bold">
      <CalendarDays size={16} className="text-tangerine-dark" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Mês"
        className="cursor-pointer appearance-none bg-transparent pr-6 outline-none"
      >
        {options.map(({ key }) => (
          <option key={key} value={key}>
            {monthLabel(key)}
          </option>
        ))}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3" />
    </label>
  );
}

export function BudgetRing({ percent }) {
  const rounded = Math.round(percent);
  return (
    <div
      className="budget-ring"
      style={{ '--p': Math.min(rounded, 100) }}
      role="img"
      aria-label={`${rounded}% do orçamento usado`}
    >
      <div className="budget-inner">
        <strong>
          {rounded}
          <span>%</span>
        </strong>
        <small>usado</small>
      </div>
    </div>
  );
}

// history: [{ key, date, income, expense }] do mais antigo para o mais recente
export function CashflowChart({ history, selected }) {
  const max = Math.max(1, ...history.flatMap((m) => [m.income, m.expense]));
  const height = (value) => `${(value / max) * 100}%`;
  return (
    <div className="mt-8">
      <div
        className="flex h-44 items-end gap-3 border-b-2 border-ink/10 px-1 pt-4"
        role="img"
        aria-label="Entradas e saídas dos últimos meses"
      >
        {history.map((m) => (
          <div
            key={m.key}
            className={`flex h-full flex-1 items-end gap-1 ${m.key === selected ? '' : 'opacity-60'}`}
          >
            <div
              className="w-full bg-lime-dark"
              style={{ height: height(m.income) }}
              title={`Entradas: ${formatMoney(m.income)}`}
            />
            <div
              className="w-full bg-tangerine"
              style={{ height: height(m.expense) }}
              title={`Saídas: ${formatMoney(m.expense)}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 px-1">
        {history.map((m) => (
          <span key={m.key} className="flex-1 text-center text-xs text-ink/70">
            {shortMonth(m.date)}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-5 text-xs text-ink/70">
        <span className="flex items-center gap-2">
          <i className="h-3 w-3 bg-lime-dark" />
          Entradas
        </span>
        <span className="flex items-center gap-2">
          <i className="h-3 w-3 bg-tangerine" />
          Saídas
        </span>
      </div>
    </div>
  );
}

function Dialog({ eyebrow, title, onClose, children }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="animate-rise w-full max-w-md border-2 border-ink bg-paper p-6 shadow-retro"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow text-tangerine-dark">{eyebrow}</p>
            <h2 id="dialog-title" className="section-title">
              {title}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="icon-button">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function DialogButtons({ onClose, submitLabel }) {
  return (
    <div className="flex gap-3 pt-3">
      <button type="button" onClick={onClose} className="button-secondary flex-1">
        Cancelar
      </button>
      <button type="submit" className="button-primary flex-1 justify-center">
        {submitLabel}
      </button>
    </div>
  );
}

const NOT_BLANK = '.*\\S.*';

export function TransactionDialog({ onClose, onSave }) {
  const [type, setType] = useState('expense');
  const categories = type === 'income' ? ['Renda'] : EXPENSE_CATEGORIES;

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave({
      id: Date.now(),
      title: form.get('title').trim(),
      category: form.get('category'),
      amount: Number(form.get('amount')),
      type,
      date: new Date().toISOString(),
    });
  };

  return (
    <Dialog eyebrow="Registro rápido" title="Nova transação" onClose={onClose}>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="field-label">
          Descrição
          <input
            name="title"
            required
            autoFocus
            pattern={NOT_BLANK}
            title="Escreve uma descrição"
            placeholder="Ex.: Almoço no campus"
            className="field-input"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            Valor (Kz)
            <input
              name="amount"
              required
              min="1"
              step="1"
              type="number"
              placeholder="0"
              className="field-input"
            />
          </label>
          <label className="field-label">
            Categoria
            <select key={type} name="category" className="field-input">
              {categories.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        </div>
        <fieldset>
          <legend className="field-label mb-2">Tipo</legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
              />{' '}
              Saída
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
              />{' '}
              Entrada
            </label>
          </div>
        </fieldset>
        <DialogButtons onClose={onClose} submitLabel="Adicionar" />
      </form>
    </Dialog>
  );
}

export function GoalDialog({ onClose, onSave }) {
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const target = Number(form.get('target'));
    onSave({
      id: Date.now(),
      title: form.get('title').trim(),
      target,
      saved: Math.min(Number(form.get('saved') || 0), target),
    });
  };

  return (
    <Dialog eyebrow="Planos para o futuro" title="Nova meta" onClose={onClose}>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="field-label">
          Nome da meta
          <input
            name="title"
            required
            autoFocus
            pattern={NOT_BLANK}
            title="Escreve um nome"
            placeholder="Ex.: Bicicleta"
            className="field-input"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            Valor a atingir (Kz)
            <input
              name="target"
              required
              min="1"
              step="1"
              type="number"
              placeholder="0"
              className="field-input"
            />
          </label>
          <label className="field-label">
            Já guardado (Kz)
            <input
              name="saved"
              min="0"
              step="1"
              type="number"
              placeholder="0"
              className="field-input"
            />
          </label>
        </div>
        <DialogButtons onClose={onClose} submitLabel="Criar meta" />
      </form>
    </Dialog>
  );
}
