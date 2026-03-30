/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutDashboard, Building2, AlertTriangle, FileText, ClipboardList, Target, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import RiskRegister from './components/RiskRegister';
import Reports from './components/Reports';
import AssessmentForm from './components/AssessmentForm';
import StrategicReports from './components/StrategicReports';
import BCPForm from './components/BCPForm';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div dir="rtl" className="flex h-screen bg-gray-50 text-gray-900 font-sans print:bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col print:hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="h-10 w-auto object-contain" />
          <h1 className="text-lg font-bold text-emerald-800 leading-tight">سجل المخاطر<br/><span className="text-sm font-normal text-gray-500">هيئة المساحة الجيولوجية</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20} />} label="لوحة القيادة" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Building2 size={20} />} label="إدارة الإدارات" active={activeTab === 'departments'} onClick={() => setActiveTab('departments')} />
          <NavItem icon={<ClipboardList size={20} />} label="نموذج تقييم الإدارات" active={activeTab === 'assessment'} onClick={() => setActiveTab('assessment')} />
          <NavItem icon={<AlertTriangle size={20} />} label="سجل المخاطر" active={activeTab === 'risks'} onClick={() => setActiveTab('risks')} />
          <NavItem icon={<Activity size={20} />} label="نموذج استمرارية الأعمال" active={activeTab === 'bcp'} onClick={() => setActiveTab('bcp')} />
          <NavItem icon={<Target size={20} />} label="التحليلات الاستراتيجية" active={activeTab === 'strategic'} onClick={() => setActiveTab('strategic')} />
          <NavItem icon={<FileText size={20} />} label="التقارير" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto print:overflow-visible">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10 print:hidden">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'لوحة القيادة'}
            {activeTab === 'departments' && 'تصنيف الإدارات'}
            {activeTab === 'assessment' && 'نموذج التقييم الذاتي للإدارات'}
            {activeTab === 'risks' && 'سجل المخاطر الشامل'}
            {activeTab === 'bcp' && 'نموذج خطة استمرارية الأعمال (BCP)'}
            {activeTab === 'strategic' && 'التحليلات الاستراتيجية والمخرجات'}
            {activeTab === 'reports' && 'التقارير والإحصائيات'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">مدير النظام</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">م</div>
          </div>
        </header>
        <div className="p-6 print:p-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'departments' && <Departments />}
          {activeTab === 'assessment' && <AssessmentForm />}
          {activeTab === 'risks' && <RiskRegister />}
          {activeTab === 'bcp' && <BCPForm />}
          {activeTab === 'strategic' && <StrategicReports />}
          {activeTab === 'reports' && <Reports />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
