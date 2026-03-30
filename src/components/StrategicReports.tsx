import React, { useState } from 'react';
import { useRiskContext } from '../context/RiskContext';
import { 
  ShieldAlert, 
  Activity, 
  FileCheck, 
  Scale, 
  Map, 
  AlertOctagon, 
  FileText, 
  Briefcase,
  TrendingUp,
  Printer
} from 'lucide-react';

export default function StrategicReports() {
  const { departments } = useRiskContext();
  const [activeTab, setActiveTab] = useState('audit');

  const highRiskDepts = departments.filter(d => d.classification === 'عالية');
  const mediumRiskDepts = departments.filter(d => d.classification === 'متوسطة');
  const lowRiskDepts = departments.filter(d => d.classification === 'عادية');

  const tabs = [
    { id: 'audit', label: 'خطة المراجعة الداخلية', icon: <FileCheck size={18} /> },
    { id: 'bcp', label: 'استمرارية الأعمال (BCP)', icon: <Activity size={18} /> },
    { id: 'compliance', label: 'الالتزام والحوكمة', icon: <Scale size={18} /> },
    { id: 'corruption', label: 'مخاطر الفساد والسياسات', icon: <AlertOctagon size={18} /> },
    { id: 'heatmap', label: 'الخريطة الحرارية (Heat Map)', icon: <Map size={18} /> },
  ];

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      <div className="flex justify-between items-start print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">التحليلات الاستراتيجية المتقدمة</h1>
          <p className="text-gray-500 mt-2">
            توظيف نتائج تقييم المخاطر في التخطيط الاستراتيجي، المراجعة الداخلية، واستمرارية الأعمال.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
        >
          <Printer size={18} />
          تصدير التقرير
        </button>
      </div>

      {/* Print Header */}
      <div className="hidden print:flex items-center justify-between border-b-2 border-emerald-800 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="h-16 w-auto object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-emerald-900">هيئة المساحة الجيولوجية السعودية</h1>
            <p className="text-gray-600">التحليلات الاستراتيجية للمخاطر</p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-500">تاريخ التقرير: {new Date().toLocaleDateString('ar-SA')}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl p-2 flex overflow-x-auto gap-2 print:hidden">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 border border-transparent'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm print:border-none print:shadow-none print:p-0">
        
        {/* 1. Risk Based Internal Audit Plan */}
        <div className={`space-y-6 print:mb-12 print:break-inside-avoid print:block ${activeTab === 'audit' ? 'block' : 'hidden'}`}>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileCheck className="text-emerald-600" />
              خطة المراجعة الداخلية المبنية على المخاطر (Risk-Based Internal Audit Plan)
            </h2>
            <p className="text-gray-500 mt-1">توجيه موارد المراجعة الداخلية نحو الإدارات ذات المخاطر الأعلى لضمان فعالية الرقابة.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertOctagon size={18} />
                أولوية قصوى (الربع الأول والثاني)
              </h3>
              <p className="text-sm text-red-600 mb-4">مراجعة شاملة وفورية للعمليات والضوابط.</p>
              <ul className="space-y-2">
                {highRiskDepts.length > 0 ? highRiskDepts.map(d => (
                  <li key={d.id} className="bg-white px-3 py-2 rounded border border-red-100 text-sm font-medium text-gray-800 shadow-sm">{d.name}</li>
                )) : <li className="text-sm text-gray-500">لا توجد إدارات</li>}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <TrendingUp size={18} />
                أولوية متوسطة (الربع الثالث والرابع)
              </h3>
              <p className="text-sm text-yellow-600 mb-4">مراجعة دورية للعمليات الرئيسية.</p>
              <ul className="space-y-2">
                {mediumRiskDepts.length > 0 ? mediumRiskDepts.map(d => (
                  <li key={d.id} className="bg-white px-3 py-2 rounded border border-yellow-100 text-sm font-medium text-gray-800 shadow-sm">{d.name}</li>
                )) : <li className="text-sm text-gray-500">لا توجد إدارات</li>}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <ShieldAlert size={18} />
                مراجعة دورية (كل سنتين إلى 3 سنوات)
              </h3>
              <p className="text-sm text-green-600 mb-4">فحص عينات والتأكد من استمرار الامتثال.</p>
              <ul className="space-y-2">
                {lowRiskDepts.length > 0 ? lowRiskDepts.map(d => (
                  <li key={d.id} className="bg-white px-3 py-2 rounded border border-green-100 text-sm font-medium text-gray-800 shadow-sm">{d.name}</li>
                )) : <li className="text-sm text-gray-500">لا توجد إدارات</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Business Continuity (BCP) */}
        <div className={`space-y-6 print:mb-12 print:break-inside-avoid print:block ${activeTab === 'bcp' ? 'block' : 'hidden'}`}>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="text-emerald-600" />
              الإدارات الحرجة لاستمرارية الأعمال (Business Continuity Critical Departments)
            </h2>
            <p className="text-gray-500 mt-1">تحديد الإدارات التي تتطلب خطط استمرارية أعمال (BCP) وخطط تعافي من الكوارث (DRP) بشكل عاجل.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-red-200 bg-white rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">إدارات حرجة جداً (Tier 1)</h3>
              <p className="text-sm text-gray-600 mb-4">تتطلب خطة استمرارية أعمال (BCP) محدثة وتجارب وهمية (Mock Drills) مرتين سنوياً. أقصى فترة توقف مقبولة (MTPD) أقل من 24 ساعة.</p>
              <div className="flex flex-wrap gap-2">
                {highRiskDepts.map(d => (
                  <span key={d.id} className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-red-100">{d.name}</span>
                ))}
              </div>
            </div>

            <div className="border-2 border-yellow-200 bg-white rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500"></div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">إدارات هامة (Tier 2)</h3>
              <p className="text-sm text-gray-600 mb-4">تتطلب خطة استمرارية أعمال (BCP) وتجارب وهمية مرة سنوياً. أقصى فترة توقف مقبولة (MTPD) من 24 إلى 72 ساعة.</p>
              <div className="flex flex-wrap gap-2">
                {mediumRiskDepts.map(d => (
                  <span key={d.id} className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-yellow-100">{d.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Compliance & Governance */}
        <div className={`space-y-6 print:mb-12 print:break-inside-avoid print:block ${activeTab === 'compliance' ? 'block' : 'hidden'}`}>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Scale className="text-emerald-600" />
              نضج الحوكمة ومراقبة الالتزام (Governance Maturity & Compliance Monitoring)
            </h2>
            <p className="text-gray-500 mt-1">تحديد مستوى الرقابة المطلوبة لضمان الامتثال للأنظمة والتشريعات.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                <AlertOctagon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">مراقبة التزام مكثفة (نضج حوكمة منخفض)</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">هذه الإدارات تتطلب تقارير امتثال شهرية، وتعيين ضابط اتصال للالتزام (Compliance Champion) داخل الإدارة.</p>
                <div className="flex flex-wrap gap-2">
                  {highRiskDepts.map(d => (
                    <span key={d.id} className="bg-white text-gray-800 px-3 py-1 rounded border border-gray-300 text-sm">{d.name}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                <Scale size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">مراقبة التزام دورية (نضج حوكمة متوسط)</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">تتطلب تقارير امتثال ربع سنوية، ومراجعة دورية لمؤشرات الأداء (KPIs) المتعلقة بالحوكمة.</p>
                <div className="flex flex-wrap gap-2">
                  {mediumRiskDepts.map(d => (
                    <span key={d.id} className="bg-white text-gray-800 px-3 py-1 rounded border border-gray-300 text-sm">{d.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Corruption & Policies */}
        <div className={`space-y-6 print:mb-12 print:break-inside-avoid print:block ${activeTab === 'corruption' ? 'block' : 'hidden'}`}>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-emerald-600" />
              مخاطر الفساد والاحتياج للسياسات (Corruption Risk & Policy Needs)
            </h2>
            <p className="text-gray-500 mt-1">تحديد الإدارات الأكثر عرضة لمخاطر الاحتيال والفساد، والتي تتطلب سياسات وإجراءات (SOPs) أكثر صرامة.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg"><AlertOctagon size={20} /></div>
                <h3 className="font-bold text-gray-900 text-lg">إدارات عالية التعرض للفساد والاحتيال</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">تتطلب تطبيق مبدأ الفصل بين المهام (Segregation of Duties)، وتدوير وظيفي (Job Rotation)، وتفعيل خط الإبلاغ عن المخالفات (Whistleblowing).</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800 font-medium">
                {highRiskDepts.map(d => <li key={d.id}>{d.name}</li>)}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Briefcase size={20} /></div>
                <h3 className="font-bold text-gray-900 text-lg">إدارات تحتاج سياسات وأدلة عمل (SOPs) مكثفة</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">نظراً لارتفاع المخاطر، يجب توثيق كافة العمليات في هذه الإدارات بأدلة سياسات وإجراءات معتمدة ومحدثة، وتقليل الاعتماد على الاجتهاد الشخصي.</p>
              <ul className="list-disc list-inside space-y-1 text-gray-800 font-medium">
                {highRiskDepts.map(d => <li key={d.id}>{d.name}</li>)}
                {mediumRiskDepts.slice(0, 2).map(d => <li key={d.id} className="text-gray-600">{d.name} (أولوية ثانية)</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Heat Map */}
        <div className={`space-y-6 print:mb-12 print:break-inside-avoid print:block ${activeTab === 'heatmap' ? 'block' : 'hidden'}`}>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Map className="text-emerald-600" />
              الخريطة الحرارية للمخاطر لكل إدارة (Risk Heat Map per Department)
            </h2>
            <p className="text-gray-500 mt-1">توزيع الإدارات حسب مستوى الخطورة الإجمالي لتوفير نظرة شاملة للإدارة العليا (ERM).</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              {/* High Risk Column */}
              <div className="space-y-3">
                <div className="bg-red-500 text-white font-bold py-2 rounded-lg shadow-sm">
                  مخاطر عالية (High)
                </div>
                <div className="bg-white border-2 border-red-200 rounded-lg p-4 min-h-[200px] flex flex-col gap-2">
                  {highRiskDepts.map(d => (
                    <div key={d.id} className="bg-red-50 text-red-800 p-2 rounded border border-red-100 text-sm font-bold shadow-sm">
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium Risk Column */}
              <div className="space-y-3">
                <div className="bg-yellow-500 text-white font-bold py-2 rounded-lg shadow-sm">
                  مخاطر متوسطة (Medium)
                </div>
                <div className="bg-white border-2 border-yellow-200 rounded-lg p-4 min-h-[200px] flex flex-col gap-2">
                  {mediumRiskDepts.map(d => (
                    <div key={d.id} className="bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-100 text-sm font-bold shadow-sm">
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Risk Column */}
              <div className="space-y-3">
                <div className="bg-green-500 text-white font-bold py-2 rounded-lg shadow-sm">
                  مخاطر منخفضة (Low)
                </div>
                <div className="bg-white border-2 border-green-200 rounded-lg p-4 min-h-[200px] flex flex-col gap-2">
                  {lowRiskDepts.map(d => (
                    <div key={d.id} className="bg-green-50 text-green-800 p-2 rounded border border-green-100 text-sm font-bold shadow-sm">
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
