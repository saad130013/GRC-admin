import React from 'react';
import { useRiskContext } from '../context/RiskContext';
import { getRiskSeverity } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, Building, AlertCircle, CheckCircle, Printer } from 'lucide-react';

export default function Dashboard() {
  const { departments, risks } = useRiskContext();

  const totalRisks = risks.length;
  const openRisks = risks.filter(r => r.status === 'مفتوح').length;
  const highRiskDepts = departments.filter(d => d.classification === 'عالية').length;

  const severityCounts = {
    'حرج': 0, 'عالي': 0, 'متوسط': 0, 'منخفض': 0
  };
  risks.forEach(r => {
    const sev = getRiskSeverity(r.score).label;
    if (sev in severityCounts) severityCounts[sev as keyof typeof severityCounts]++;
  });

  const pieData = [
    { name: 'حرج', value: severityCounts['حرج'], color: '#dc2626' },
    { name: 'عالي', value: severityCounts['عالي'], color: '#f97316' },
    { name: 'متوسط', value: severityCounts['متوسط'], color: '#facc15' },
    { name: 'منخفض', value: severityCounts['منخفض'], color: '#22c55e' },
  ].filter(d => d.value > 0);

  const deptClassCounts = {
    'عالية': 0, 'متوسطة': 0, 'عادية': 0
  };
  departments.forEach(d => {
    deptClassCounts[d.classification]++;
  });

  const barData = [
    { name: 'عالية الخطورة', count: deptClassCounts['عالية'] },
    { name: 'متوسطة الخطورة', count: deptClassCounts['متوسطة'] },
    { name: 'عادية', count: deptClassCounts['عادية'] },
  ];

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      
      {/* Print Header */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b-2 border-emerald-800 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="w-32 h-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">لوحة القيادة التنفيذية</h1>
            <p className="text-gray-600">نظرة عامة على حالة المخاطر في الهيئة</p>
          </div>
          <div className="w-32 text-left">
            <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">لوحة القيادة</h2>
          <p className="text-gray-500 mt-1">نظرة عامة على حالة المخاطر في الهيئة</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
        >
          <Printer size={18} />
          تصدير PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 print:grid-cols-4 print:gap-4">
        <StatCard icon={<AlertCircle className="text-red-500" />} title="إجمالي المخاطر" value={totalRisks} />
        <StatCard icon={<ShieldAlert className="text-orange-500" />} title="مخاطر مفتوحة" value={openRisks} />
        <StatCard icon={<Building className="text-blue-500" />} title="إدارات عالية الخطورة" value={highRiskDepts} />
        <StatCard icon={<CheckCircle className="text-green-500" />} title="مخاطر معالجة" value={risks.filter(r => r.status === 'مغلق').length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-2 print:gap-6 print:break-inside-avoid">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm print:border-gray-300 print:shadow-none">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">توزيع المخاطر حسب الشدة</h3>
          <div className="h-64" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm print:border-gray-300 print:shadow-none">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">تصنيف الإدارات</h3>
          <div className="h-64" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: number | string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 print:border-gray-300 print:shadow-none print:p-4">
      <div className="p-3 bg-gray-50 rounded-lg print:bg-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
