import { ArrowDownLeft, ArrowUpRight, Plus, WalletCards } from 'lucide-react';
import {
  BudgetRing,
  CashflowChart,
  Metric,
  PageHeading,
  TransactionFilters,
  TransactionList,
  Upcoming,
} from './components.jsx';
import {
  BUDGET_TOTAL,
  CATEGORIES,
  EXPENSE_CATEGORIES,
  GOAL_STYLES,
  upcomingPayments,
} from './data.js';
import { formatMoney, monthLabel, todayLabel } from './utils.js';

const sectionHeader = (eyebrow, title) => (
  <div>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="section-title">{title}</h2>
  </div>
);

function MonthMetrics({ totals }) {
  const left = BUDGET_TOTAL - totals.expense;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Metric
        label="Saldo do mês"
        value={formatMoney(totals.balance)}
        detail="Entradas menos saídas"
        icon={WalletCards}
        accent="lime"
      />
      <Metric
        label="Entradas no mês"
        value={formatMoney(totals.income)}
        detail={`${totals.incomeCount} entradas`}
        icon={ArrowDownLeft}
        accent="lime"
      />
      <Metric
        label="Saídas no mês"
        value={formatMoney(totals.expense)}
        detail={
          left >= 0
            ? `${formatMoney(left)} abaixo do limite`
            : `${formatMoney(-left)} acima do limite`
        }
        icon={ArrowUpRight}
        accent="orange"
      />
    </div>
  );
}

export function Overview({ totals, history, month, transactions, onNavigate, onDelete }) {
  const left = BUDGET_TOTAL - totals.expense;
  const usedPercent = (totals.expense / BUDGET_TOTAL) * 100;

  return (
    <div className="space-y-6">
      <section className="animate-rise">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-tangerine-dark">
          {todayLabel()}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Olá, Gabriel</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink/70">
          Aqui está um resumo do seu dinheiro para você seguir tranquila durante o mês.
        </p>
      </section>

      <MonthMetrics totals={totals} />

      <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="panel overflow-hidden">
          {sectionHeader('Últimos 6 meses', 'Fluxo de caixa')}
          <p className="mt-6 font-display text-3xl font-bold">{formatMoney(totals.balance)}</p>
          <p className="mt-1 text-xs text-ink/70">Saldo de {monthLabel(month)}</p>
          <CashflowChart history={history} selected={month} />
        </div>
        <div className="panel">
          {sectionHeader('Limite mensal', 'Seu orçamento')}
          <div className="mt-8 flex items-center justify-center">
            <BudgetRing percent={usedPercent} />
          </div>
          <div className="mt-7 flex items-center justify-between border-t-2 border-ink/10 pt-4 text-sm">
            <span className="text-ink/70">Gasto até agora</span>
            <strong>
              {formatMoney(totals.expense)}{' '}
              <span className="font-normal text-ink/70">/ {formatMoney(BUDGET_TOTAL)}</span>
            </strong>
          </div>
          <p className="mt-4 text-xs text-ink/70">
            {left >= 0 ? (
              <>
                Ainda dá para gastar <strong className="text-ink">{formatMoney(left)}</strong>
              </>
            ) : (
              <>
                Passaste o limite em <strong className="text-ink">{formatMoney(-left)}</strong>
              </>
            )}
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="panel">
          <div className="flex items-start justify-between">
            {sectionHeader('Onde seu dinheiro vai', 'Gastos por categoria')}
            <button
              onClick={() => onNavigate('budget')}
              className="text-xs font-bold text-tangerine-dark underline underline-offset-4"
            >
              Ver orçamento
            </button>
          </div>
          <div className="mt-7 space-y-5">
            {EXPENSE_CATEGORIES.map((name) => {
              const { icon: Icon, color } = CATEGORIES[name];
              const spent = totals.byCategory[name] ?? 0;
              const share = totals.expense ? Math.round((spent / totals.expense) * 100) : 0;
              return (
                <div key={name} className="flex items-center gap-3">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center ${color}`}>
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-bold">{name}</span>
                      <span className="font-mono text-xs font-bold">{formatMoney(spent)}</span>
                    </div>
                    <div className="h-2 bg-mist">
                      <div className={`h-full ${color}`} style={{ width: `${share}%` }} />
                    </div>
                  </div>
                  <span className="w-9 text-right font-mono text-xs text-ink/70">{share}%</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel bg-ink text-paper">
          <p className="eyebrow text-lime">Para não esquecer</p>
          <h2 className="section-title">Próximos pagamentos</h2>
          <div className="mt-6 space-y-2">
            {upcomingPayments.map((p) => (
              <Upcoming key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="flex items-start justify-between">
          {sectionHeader('Movimentações recentes', 'Suas transações')}
          <button onClick={() => onNavigate('transactions')} className="button-secondary">
            Ver todas
          </button>
        </div>
        <div className="mt-5">
          <TransactionList transactions={transactions.slice(0, 5)} onDelete={onDelete} />
        </div>
      </section>
    </div>
  );
}

export function TransactionsPage({ totals, transactions, filters, onAdd, onDelete }) {
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Seu histórico"
        title="Transações"
        description="Acompanhe tudo que entra e sai da sua conta, sem perder o fio do mês."
        action={
          <button onClick={onAdd} className="button-primary">
            <Plus size={17} /> Nova transação
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Metric
          label="Total de entradas"
          value={formatMoney(totals.income)}
          detail="Neste mês"
          icon={ArrowDownLeft}
          accent="lime"
        />
        <Metric
          label="Total de saídas"
          value={formatMoney(totals.expense)}
          detail="Neste mês"
          icon={ArrowUpRight}
          accent="orange"
        />
        <Metric
          label="Movimentações"
          value={String(transactions.length)}
          detail="Registros encontrados"
          icon={WalletCards}
          accent="lime"
        />
      </div>
      <div className="panel">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {sectionHeader('Extrato detalhado', 'Todas as movimentações')}
          <TransactionFilters {...filters} />
        </div>
        <div className="mt-5">
          <TransactionList transactions={transactions} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}

export function BudgetPage({ totals, month }) {
  const usedPercent = (totals.expense / BUDGET_TOTAL) * 100;
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Planejamento mensal"
        title="Orçamento"
        description="Veja quanto já gastou em cada categoria e quanto ainda pode gastar com tranquilidade."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <div className="panel bg-ink text-paper">
          <p className="eyebrow text-lime">{monthLabel(month)}</p>
          <h2 className="section-title">Seu limite geral</h2>
          <div className="mt-8 flex items-center justify-center">
            <BudgetRing percent={usedPercent} />
          </div>
          <div className="mt-7 border-t-2 border-paper/10 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-paper/70">Despesas</span>
              <strong>{formatMoney(totals.expense)}</strong>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-paper/70">Limite definido</span>
              <strong>{formatMoney(BUDGET_TOTAL)}</strong>
            </div>
          </div>
        </div>
        <div className="panel">
          {sectionHeader('Categorias', 'Limites por área')}
          <div className="mt-7 space-y-6">
            {EXPENSE_CATEGORIES.map((name) => {
              const { icon: Icon, color, limit } = CATEGORIES[name];
              const spent = totals.byCategory[name] ?? 0;
              const over = spent > limit;
              return (
                <div key={name}>
                  <div className="mb-2 flex items-center gap-3">
                    <div className={`grid h-8 w-8 place-items-center ${color}`}>
                      <Icon size={15} />
                    </div>
                    <span className="flex-1 text-sm font-bold">{name}</span>
                    <span className="font-mono text-xs font-bold">
                      {formatMoney(spent)}{' '}
                      <span className="font-sans font-normal text-ink/70">
                        / {formatMoney(limit)}
                      </span>
                    </span>
                  </div>
                  <div className="h-2 bg-mist">
                    <div
                      className={`h-full ${color}`}
                      style={{ width: `${Math.min((spent / limit) * 100, 100)}%` }}
                    />
                  </div>
                  {over && (
                    <p className="mt-1 text-xs font-bold text-tangerine-dark">
                      Acima do limite em {formatMoney(spent - limit)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GoalsPage({ goals, onAdd }) {
  const saved = goals.reduce((sum, g) => sum + g.saved, 0);
  const target = goals.reduce((sum, g) => sum + g.target, 0);
  const overall = target ? Math.round((saved / target) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Planos para o futuro"
        title="Metas"
        description="Pequenos depósitos hoje deixam os planos de amanhã muito mais leves."
        action={
          <button onClick={onAdd} className="button-primary">
            <Plus size={17} /> Nova meta
          </button>
        }
      />
      <div className="panel bg-lime">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-ink/80">Progresso geral</p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Você está construindo seu próximo passo.
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <strong className="font-display text-4xl">{overall}%</strong>
            <p className="text-xs font-bold text-ink/80">
              {formatMoney(saved)} de {formatMoney(target)}
            </p>
          </div>
        </div>
        <div className="mt-6 h-3 bg-ink/10">
          <div className="h-full bg-tangerine" style={{ width: `${overall}%` }} />
        </div>
      </div>
      {goals.length === 0 && (
        <p className="py-6 text-center text-sm text-ink/70">
          Ainda não tens metas. Cria a primeira em “Nova meta”.
        </p>
      )}
      <div className="grid gap-5 md:grid-cols-3">
        {goals.map((goal, index) => {
          const { icon: Icon, color } = GOAL_STYLES[index % GOAL_STYLES.length];
          const progress = Math.round((goal.saved / goal.target) * 100);
          return (
            <div key={goal.id} className="panel">
              <div className={`grid h-10 w-10 place-items-center ${color}`}>
                <Icon size={19} />
              </div>
              <h2 className="mt-7 font-display text-lg font-bold">{goal.title}</h2>
              <p className="mt-1 text-xs text-ink/70">
                {formatMoney(goal.saved)} guardados de {formatMoney(goal.target)}
              </p>
              <div className="mt-6 h-2 bg-mist">
                <div className="h-full bg-tangerine" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex justify-between text-xs font-bold">
                <span>{progress}% concluído</span>
                <span className="text-tangerine-dark">
                  Faltam {formatMoney(Math.max(goal.target - goal.saved, 0))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
