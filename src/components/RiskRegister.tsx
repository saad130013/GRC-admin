import React, { useState } from 'react';
import { useRiskContext } from '../context/RiskContext';
import { getRiskSeverity, calculateRiskScore } from '../data/mockData';
import { Plus, X, Printer } from 'lucide-react';

export default function RiskRegister() {
  const { risks, departments, addRisk, updateRiskStatus } = useRiskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      
      {/* Print Header */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b-2 border-emerald-800 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="w-32 h-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">سجل المخاطر المؤسسية</h1>
            <p className="text-gray-600">هيئة المساحة الجيولوجية السعودية</p>
          </div>
          <div className="w-32 text-left">
            <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center print:hidden">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">سجل المخاطر</h3>
          <p className="text-gray-500 mt-1">إدارة ومتابعة المخاطر المسجلة على مستوى الهيئة</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
          >
            <Printer size={18} />
            تصدير PDF
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>تسجيل خطر جديد</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-right print:border-collapse print:border print:border-gray-300">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm print:bg-gray-100 print:border-gray-300">
              <tr>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">الخطر</th>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">الإدارة المعنية</th>
                <th className="px-6 py-3 font-semibold text-center print:border print:border-gray-300">الاحتمالية (1-5)</th>
                <th className="px-6 py-3 font-semibold text-center print:border print:border-gray-300">الأثر (1-5)</th>
                <th className="px-6 py-3 font-semibold text-center print:border print:border-gray-300">النتيجة (ISO/COSO)</th>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">مستوى الخطر</th>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 print:divide-gray-300">
              {risks.map(risk => {
                const dept = departments.find(d => d.id === risk.departmentId);
                const severity = getRiskSeverity(risk.score);
                return (
                  <tr key={risk.id} className="hover:bg-gray-50 transition-colors print:break-inside-avoid">
                    <td className="px-6 py-4 print:border print:border-gray-300">
                      <p className="font-medium text-gray-900">{risk.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1 print:line-clamp-none">{risk.description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 print:border print:border-gray-300">
                      {dept?.name}
                      <span className="block text-xs text-gray-400 mt-0.5">تصنيف: {dept?.classification}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium print:border print:border-gray-300">{risk.likelihood}</td>
                    <td className="px-6 py-4 text-center font-medium print:border print:border-gray-300">{risk.impact}</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-900 print:border print:border-gray-300">{risk.score}</td>
                    <td className="px-6 py-4 print:border print:border-gray-300">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${severity.color} print:bg-transparent print:text-black print:p-0 print:font-bold`}>
                        {severity.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 print:border print:border-gray-300">
                      <select
                        value={risk.status}
                        onChange={(e) => updateRiskStatus(risk.id, e.target.value as any)}
                        className="text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-transparent print:appearance-none print:border-none print:p-0 print:font-bold"
                      >
                        <option value="مفتوح">مفتوح</option>
                        <option value="قيد المعالجة">قيد المعالجة</option>
                        <option value="مغلق">مغلق</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {risks.length === 0 && (
            <div className="p-8 text-center text-gray-500">لا توجد مخاطر مسجلة.</div>
          )}
        </div>
      </div>

      {isModalOpen && <AddRiskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function AddRiskModal({ onClose }: { onClose: () => void }) {
  const { departments, addRisk } = useRiskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    departmentId: departments[0]?.id || '',
    likelihood: 3,
    impact: 3,
  });

  const selectedDept = departments.find(d => d.id === formData.departmentId);
  const previewScore = selectedDept ? calculateRiskScore(formData.likelihood, formData.impact, selectedDept.classification) : 0;
  const previewSeverity = getRiskSeverity(previewScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRisk({
      ...formData,
      status: 'مفتوح'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">تسجيل خطر جديد</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الخطر</label>
              <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وصف الخطر</label>
              <textarea required rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الإدارة المعنية</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})}>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.classification})</option>
                ))}
              </select>
              {selectedDept && (
                <p className="text-xs text-gray-500 mt-1">
                  معامل التأثير لهذه الإدارة: {selectedDept.classification === 'عالية' ? 'x 1.5' : selectedDept.classification === 'متوسطة' ? 'x 1.2' : 'x 1.0'}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاحتمالية (1-5)</label>
                <input type="range" min="1" max="5" className="w-full accent-emerald-600"
                  value={formData.likelihood} onChange={e => setFormData({...formData, likelihood: parseInt(e.target.value)})} />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>نادر (1)</span><span>شبه مؤكد (5)</span>
                </div>
                <div className="text-center font-bold mt-2">{formData.likelihood}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الأثر (1-5)</label>
                <input type="range" min="1" max="5" className="w-full accent-emerald-600"
                  value={formData.impact} onChange={e => setFormData({...formData, impact: parseInt(e.target.value)})} />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>طفيف (1)</span><span>كارثي (5)</span>
                </div>
                <div className="text-center font-bold mt-2">{formData.impact}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">معاينة التقييم (حسب معايير ISO و COSO)</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">النتيجة المحسوبة:</span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">{previewScore}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${previewSeverity.color}`}>
                    {previewSeverity.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors">
              حفظ الخطر
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
