import React, { useState } from 'react';
import { useRiskContext } from '../context/RiskContext';
import { RiskLevel } from '../data/mockData';
import { Search, Printer } from 'lucide-react';

export default function Departments() {
  const { departments, updateDepartmentClassification } = useRiskContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('الكل');

  const sectors = ['الكل', ...Array.from(new Set(departments.map(d => d.sector)))];

  const filteredDepts = departments.filter(d => {
    const matchesSearch = d.name.includes(searchTerm);
    const matchesSector = filterSector === 'الكل' || d.sector === filterSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      
      {/* Print Header */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b-2 border-emerald-800 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="w-32 h-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">سجل الإدارات والمراكز</h1>
            <p className="text-gray-600">هيئة المساحة الجيولوجية السعودية</p>
          </div>
          <div className="w-32 text-left">
            <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">إدارة الإدارات</h2>
          <p className="text-gray-500 mt-1">استعراض وتصنيف الإدارات والمراكز التابعة للهيئة</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
        >
          <Printer size={18} />
          تصدير PDF
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث عن إدارة..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
          >
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right print:border-collapse print:border print:border-gray-300">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm print:bg-gray-100 print:border-gray-300">
              <tr>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">الإدارة / المركز</th>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">القطاع</th>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">تصنيف الخطورة</th>
                <th className="px-6 py-3 font-semibold print:border print:border-gray-300">معامل التأثير (ISO/COSO)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 print:divide-gray-300">
              {filteredDepts.map(dept => (
                <tr key={dept.id} className="hover:bg-gray-50 transition-colors print:break-inside-avoid">
                  <td className="px-6 py-4 text-gray-900 font-medium print:border print:border-gray-300">{dept.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm print:border print:border-gray-300">{dept.sector}</td>
                  <td className="px-6 py-4 print:border print:border-gray-300">
                    <select
                      value={dept.classification}
                      onChange={(e) => updateDepartmentClassification(dept.id, e.target.value as RiskLevel)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium border-0 ring-1 ring-inset ${
                        dept.classification === 'عالية' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                        dept.classification === 'متوسطة' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                        'bg-green-50 text-green-700 ring-green-600/20'
                      } focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer print:appearance-none print:bg-transparent print:ring-0 print:p-0 print:font-bold`}
                    >
                      <option value="عالية">عالية الخطورة</option>
                      <option value="متوسطة">متوسطة الخطورة</option>
                      <option value="عادية">عادية</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm print:border print:border-gray-300">
                    {dept.classification === 'عالية' ? 'x 1.5' : dept.classification === 'متوسطة' ? 'x 1.2' : 'x 1.0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDepts.length === 0 && (
            <div className="p-8 text-center text-gray-500">لا توجد إدارات مطابقة للبحث.</div>
          )}
        </div>
      </div>
    </div>
  );
}
