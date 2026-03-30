import React from 'react';
import { useRiskContext } from '../context/RiskContext';
import { FileDown, ShieldCheck } from 'lucide-react';

export default function Reports() {
  const { departments } = useRiskContext();

  const highRiskDepts = departments.filter(d => d.classification === 'عالية');
  const mediumRiskDepts = departments.filter(d => d.classification === 'متوسطة');
  const lowRiskDepts = departments.filter(d => d.classification === 'عادية');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto print:max-w-none print:w-full print:bg-white print:p-8">
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b-2 border-emerald-800 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="w-32 h-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تقرير تصنيف الإدارات والمخاطر</h1>
            <p className="text-gray-600">إدارة المخاطر المؤسسية</p>
          </div>
          <div className="w-32 text-left">
            <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">تقرير تصنيف الإدارات والمخاطر</h2>
          <p className="text-gray-500 mt-1">مبني على معايير ISO 31000 و COSO ERM لتقييم المخاطر المؤسسية</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm print:hidden"
        >
          <FileDown size={18} />
          <span>تصدير PDF</span>
        </button>
      </div>

      <div className="hidden print:block mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">تقرير تصنيف الإدارات والمخاطر</h2>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex gap-4 print:border-emerald-300 print:bg-emerald-50/50">
        <ShieldCheck className="text-emerald-600 shrink-0" size={32} />
        <div>
          <h3 className="text-emerald-800 font-bold text-lg mb-2">منهجية التقييم</h3>
          <p className="text-emerald-700 text-sm leading-relaxed">
            تم اعتماد منهجية تقييم المخاطر بناءً على معايير ISO 31000 وإطار عمل COSO ERM لضمان توجيه الموارد بشكل فعال. 
            يتم حساب درجة الخطر الأساسية (الاحتمالية × الأثر) ثم تضرب في معامل خطورة الإدارة:
            <br/>• <strong>إدارات عالية الخطورة:</strong> معامل 1.5 (تتطلب مراقبة مستمرة وإجراءات صارمة)
            <br/>• <strong>إدارات متوسطة الخطورة:</strong> معامل 1.2 (تتطلب مراجعة دورية)
            <br/>• <strong>إدارات عادية:</strong> معامل 1.0 (تخضع للإجراءات القياسية)
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <ReportSection title="الإدارات عالية الخطورة" depts={highRiskDepts} color="red" />
        <ReportSection title="الإدارات متوسطة الخطورة" depts={mediumRiskDepts} color="yellow" />
        <ReportSection title="الإدارات العادية" depts={lowRiskDepts} color="green" />
      </div>
    </div>
  );
}

function ReportSection({ title, depts, color }: { title: string, depts: any[], color: 'red' | 'yellow' | 'green' }) {
  const colorClasses = {
    red: 'bg-red-50 border-red-200 text-red-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    green: 'bg-green-50 border-green-200 text-green-800',
  };

  const badgeClasses = {
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-green-100 text-green-700',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden print-break-inside-avoid print:border-gray-300 print:shadow-none">
      <div className={`px-6 py-4 border-b ${colorClasses[color]} flex justify-between items-center`}>
        <h3 className="font-bold text-lg">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${badgeClasses[color]}`}>
          {depts.length} إدارات
        </span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {depts.map(dept => (
            <div key={dept.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-900 mb-1">{dept.name}</h4>
              <p className="text-xs text-gray-500">{dept.sector}</p>
            </div>
          ))}
          {depts.length === 0 && <p className="text-gray-500 text-sm">لا توجد إدارات في هذا التصنيف.</p>}
        </div>
      </div>
    </div>
  );
}
