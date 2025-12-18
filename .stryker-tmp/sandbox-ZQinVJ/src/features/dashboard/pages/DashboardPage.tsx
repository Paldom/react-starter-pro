// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { BarChart3, User, DollarSign, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatCard } from '../components/StatCard';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { useDashboardStatsQuery, useDashboardChartQuery } from '../hooks/use-dashboard-data';
import { formatCurrency, formatNumber } from '@/shared/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
export function DashboardPage() {
  if (stryMutAct_9fa48("81")) {
    {}
  } else {
    stryCov_9fa48("81");
    const {
      t,
      i18n
    } = useTranslation();
    const locale = stryMutAct_9fa48("82") ? (i18n.resolvedLanguage ?? i18n.language) && 'en-US' : (stryCov_9fa48("82"), (stryMutAct_9fa48("83") ? i18n.resolvedLanguage && i18n.language : (stryCov_9fa48("83"), i18n.resolvedLanguage ?? i18n.language)) ?? (stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), 'en-US')));
    const statsQuery = useDashboardStatsQuery();
    const chartQuery = useDashboardChartQuery();
    if (stryMutAct_9fa48("87") ? statsQuery.isPending && chartQuery.isPending : stryMutAct_9fa48("86") ? false : stryMutAct_9fa48("85") ? true : (stryCov_9fa48("85", "86", "87"), statsQuery.isPending || chartQuery.isPending)) {
      if (stryMutAct_9fa48("88")) {
        {}
      } else {
        stryCov_9fa48("88");
        return <section className="p-8" aria-busy>
        <p className="sr-only">{t(stryMutAct_9fa48("89") ? "" : (stryCov_9fa48("89"), 'dashboard.loading'))}</p>
        <DashboardSkeleton />
      </section>;
      }
    }
    if (stryMutAct_9fa48("92") ? statsQuery.isError && chartQuery.isError : stryMutAct_9fa48("91") ? false : stryMutAct_9fa48("90") ? true : (stryCov_9fa48("90", "91", "92"), statsQuery.isError || chartQuery.isError)) {
      if (stryMutAct_9fa48("93")) {
        {}
      } else {
        stryCov_9fa48("93");
        return <section className="p-8">
        <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
          {t(stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), 'dashboard.error'))}
        </div>
      </section>;
      }
    }
    const stats = statsQuery.data;
    const chartData = stryMutAct_9fa48("97") ? chartQuery.data && [] : stryMutAct_9fa48("96") ? false : stryMutAct_9fa48("95") ? true : (stryCov_9fa48("95", "96", "97"), chartQuery.data || (stryMutAct_9fa48("98") ? ["Stryker was here"] : (stryCov_9fa48("98"), [])));
    return <section className="p-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{t(stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), 'dashboard.title'))}</h1>
        <p className="text-muted-foreground">
          {t(stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), 'dashboard.subtitle'))}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t(stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), 'dashboard.totalRevenue'))} value={formatCurrency(stats.totalRevenue, locale)} icon={DollarSign} />
        <StatCard title={t(stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), 'dashboard.subscriptions'))} value={formatNumber(stats.subscriptions, locale)} icon={User} />
        <StatCard title={t(stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), 'dashboard.sales'))} value={formatNumber(stats.sales, locale)} icon={ShoppingCart} />
        <StatCard title={t(stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), 'dashboard.activeUsers'))} value={formatNumber(stats.activeUsers, locale)} icon={BarChart3} />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t(stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), 'dashboard.monthlyOverview'))}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chartData.map(stryMutAct_9fa48("106") ? () => undefined : (stryCov_9fa48("106"), item => <div key={item.name} className="flex items-center justify-between border-b py-2 last:border-0">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {formatNumber(item.value, locale)}
                  </span>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>;
  }
}