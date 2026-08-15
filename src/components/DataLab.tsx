import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  PieChart as PieIcon, 
  Sliders,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react';
import { 
  dataLabProjects, 
  salesMonthlyData, 
  regionalDistributionData, 
  macroInflationData 
} from '../data/datalab';

export const DataLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'inflation' | 'regional' | 'variance'>('sales');
  const [scenarioMultiplier, setScenarioMultiplier] = useState<number>(1.0);

  const adjustedSalesData = salesMonthlyData.map((d) => ({
    ...d,
    revenue: Math.round(d.revenue * scenarioMultiplier),
    profit: Math.round(d.profit * scenarioMultiplier)
  }));

  const currentProjectInfo = dataLabProjects.find((p) => {
    if (activeTab === 'sales') return p.id === 'sales-analytics';
    if (activeTab === 'inflation') return p.id === 'economic-indicators';
    if (activeTab === 'regional') return p.id === 'customer-analytics';
    return p.id === 'financial-analytics';
  }) || dataLabProjects[0];

  return (
    <section 
      id="data-lab" 
      className="py-20 md:py-28 bg-[#020817] relative border-t border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs font-mono font-bold text-[#00D4FF] mb-3">
            <Activity className="w-3.5 h-3.5" />
            INTERACTIVE ANALYTICS WORKSPACE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            DATA LAB
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Explore live interactive business intelligence models, econometric time-series, and financial variance simulators.
          </p>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-4" />
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'sales', label: 'Sales & Profit Engine', icon: BarChart3 },
            { id: 'inflation', label: 'Kenya Inflation (VECM / CPI)', icon: TrendingUp },
            { id: 'regional', label: 'Channel & Regional Mix', icon: PieIcon },
            { id: 'variance', label: 'Budget vs Actual Variance', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`datalab-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0D6EFD] text-white shadow-lg shadow-[#0D6EFD]/30 border border-[#00D4FF]/50'
                    : 'bg-[#081B35] text-slate-300 hover:text-white hover:bg-[#0c2445] border border-blue-900/40'
                }`}
              >
                <Icon className="w-4 h-4 text-[#00D4FF]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-2xl bg-[#06152B] border border-[#00D4FF]/30 p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-8">
          
          {/* Top Bar: Title & Dynamic KPIs */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{currentProjectInfo.name}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {currentProjectInfo.description}
                </p>
              </div>

              {activeTab === 'sales' && (
                <div className="flex items-center gap-3 bg-[#081B35] px-3.5 py-2 rounded-xl border border-blue-800/40 text-xs">
                  <Sliders className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-slate-300">Scenario Factor:</span>
                  <button
                    onClick={() => setScenarioMultiplier(0.85)}
                    className={`px-2 py-0.5 rounded ${scenarioMultiplier === 0.85 ? 'bg-rose-500/30 text-rose-300 font-bold' : 'text-slate-400'}`}
                  >
                    Bear (-15%)
                  </button>
                  <button
                    onClick={() => setScenarioMultiplier(1.0)}
                    className={`px-2 py-0.5 rounded ${scenarioMultiplier === 1.0 ? 'bg-[#0D6EFD]/40 text-[#00D4FF] font-bold' : 'text-slate-400'}`}
                  >
                    Base (100%)
                  </button>
                  <button
                    onClick={() => setScenarioMultiplier(1.2)}
                    className={`px-2 py-0.5 rounded ${scenarioMultiplier === 1.2 ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-slate-400'}`}
                  >
                    Bull (+20%)
                  </button>
                </div>
              )}
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentProjectInfo.kpis.map((kpi, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#081B35]/80 border border-blue-900/40">
                  <div className="text-xs text-slate-400 font-medium">{kpi.label}</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
                    {activeTab === 'sales' && kpi.label === 'Total Revenue'
                      ? `$${(1.48 * scenarioMultiplier).toFixed(2)}M`
                      : kpi.value}
                  </div>
                  <div className="text-[11px] text-[#00D4FF] font-semibold mt-1">
                    {kpi.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="w-full h-80 sm:h-96 pt-2">
            {activeTab === 'sales' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adjustedSalesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#0D6EFD" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0D6EFD" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.15)" />
                  <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#06152B', borderColor: '#00D4FF', borderRadius: 8, color: '#fff' }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#00D4FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="profit" name="Gross Profit ($)" stroke="#0D6EFD" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                  <Line type="monotone" dataKey="target" name="Budget Target ($)" stroke="#F59E0B" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'inflation' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={macroInflationData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.15)" />
                  <XAxis dataKey="period" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#06152B', borderColor: '#00D4FF', borderRadius: 8, color: '#fff' }}
                    formatter={(val: any) => [`${val}%`, '']}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="headline" name="Headline CPI" stroke="#00D4FF" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="food" name="Food & Beverage CPI" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="energy" name="Energy & Transport CPI" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="core" name="Core Inflation (Non-Food)" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'regional' && (
              <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-6">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={regionalDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {regionalDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#06152B" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#06152B', borderColor: '#00D4FF', borderRadius: 8 }} />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3 p-4 rounded-xl bg-[#081B35]/60 border border-blue-900/30 text-xs sm:text-sm text-slate-300">
                  <div className="font-bold text-white text-sm">Regional Commercial Distribution</div>
                  <p>
                    Nairobi Central accounts for 42% of total transactional volume, followed by the Coast/Mombasa corridor (24%).
                  </p>
                  <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-[#06152B]">Highest AOV: Nairobi ($940)</div>
                    <div className="p-2 rounded bg-[#06152B]">Fastest Growth: Rift Valley (+28%)</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'variance' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adjustedSalesData.slice(0, 8)} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.15)" />
                  <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#06152B', borderColor: '#00D4FF', borderRadius: 8 }} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="revenue" name="Actual Performance ($)" fill="#0D6EFD" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Budget Benchmark ($)" fill="#38BDF8" radius={[4, 4, 0, 0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
