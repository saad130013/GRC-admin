import React, { useState } from 'react';
import { useRiskContext } from '../context/RiskContext';
import { Printer, Plus, Trash2, Activity, ShieldAlert, Server, Users, MapPin, CheckSquare, PhoneCall, Link as LinkIcon, FlaskConical } from 'lucide-react';

interface CriticalFunction {
  id: string;
  name: string;
  mtpd: string;
  rto: string;
  rpo: string;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  type: 'داخلي' | 'مورد خارجي' | 'جهة حكومية';
}

interface Dependency {
  id: string;
  name: string;
  type: 'إدارة داخلية' | 'مورد خارجي' | 'نظام تقني';
  description: string;
  criticality: 'عالية' | 'متوسطة' | 'منخفضة';
}

interface TestRecord {
  id: string;
  date: string;
  scenario: string;
  outcome: 'ناجح' | 'ناجح جزئياً' | 'فاشل';
  lessonsLearned: string;
}

export default function BCPForm() {
  const { departments } = useRiskContext();
  const [selectedDeptId, setSelectedDeptId] = useState('');
  
  const [criticalFunctions, setCriticalFunctions] = useState<CriticalFunction[]>([
    { id: '1', name: '', mtpd: '', rto: '', rpo: '' }
  ]);

  const [resources, setResources] = useState({
    itSystems: '',
    personnel: '',
    workspace: '',
    procedures: ''
  });

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: '', role: '', phone: '', email: '', type: 'داخلي' }
  ]);

  const [dependencies, setDependencies] = useState<Dependency[]>([
    { id: '1', name: '', type: 'إدارة داخلية', description: '', criticality: 'عالية' }
  ]);

  const [testRecords, setTestRecords] = useState<TestRecord[]>([
    { id: '1', date: '', scenario: '', outcome: 'ناجح', lessonsLearned: '' }
  ]);

  // Handlers for Critical Functions
  const handleAddFunction = () => {
    setCriticalFunctions([
      ...criticalFunctions,
      { id: Date.now().toString(), name: '', mtpd: '', rto: '', rpo: '' }
    ]);
  };

  const handleRemoveFunction = (id: string) => {
    if (criticalFunctions.length > 1) {
      setCriticalFunctions(criticalFunctions.filter(f => f.id !== id));
    }
  };

  const handleFunctionChange = (id: string, field: keyof CriticalFunction, value: string) => {
    setCriticalFunctions(criticalFunctions.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  // Handlers for Contacts
  const handleAddContact = () => setContacts([...contacts, { id: Date.now().toString(), name: '', role: '', phone: '', email: '', type: 'داخلي' }]);
  const handleRemoveContact = (id: string) => { if (contacts.length > 1) setContacts(contacts.filter(c => c.id !== id)); };
  const handleContactChange = (id: string, field: keyof Contact, value: string) => setContacts(contacts.map(c => c.id === id ? { ...c, [field]: value } : c));

  // Handlers for Dependencies
  const handleAddDependency = () => setDependencies([...dependencies, { id: Date.now().toString(), name: '', type: 'إدارة داخلية', description: '', criticality: 'عالية' }]);
  const handleRemoveDependency = (id: string) => { if (dependencies.length > 1) setDependencies(dependencies.filter(d => d.id !== id)); };
  const handleDependencyChange = (id: string, field: keyof Dependency, value: string) => setDependencies(dependencies.map(d => d.id === id ? { ...d, [field]: value } : d));

  // Handlers for Test Records
  const handleAddTestRecord = () => setTestRecords([...testRecords, { id: Date.now().toString(), date: '', scenario: '', outcome: 'ناجح', lessonsLearned: '' }]);
  const handleRemoveTestRecord = (id: string) => { if (testRecords.length > 1) setTestRecords(testRecords.filter(t => t.id !== id)); };
  const handleTestRecordChange = (id: string, field: keyof TestRecord, value: string) => setTestRecords(testRecords.map(t => t.id === id ? { ...t, [field]: value } : t));

  return (
    <div className="max-w-5xl mx-auto space-y-6 print:max-w-none print:w-full print:m-0 print:p-0">
      
      {/* Print Header */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b-2 border-emerald-800 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="w-32 h-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">خطة استمرارية الأعمال (BCP)</h1>
            <p className="text-gray-600">هيئة المساحة الجيولوجية السعودية</p>
          </div>
          <div className="w-32 text-left">
            <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-start print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">نموذج خطة استمرارية الأعمال (BCP)</h1>
          <p className="text-gray-500 mt-2">
            نموذج لتحديد العمليات الحرجة واستراتيجيات التعافي لضمان استمرارية تقديم الخدمات أثناء الأزمات.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
        >
          <Printer size={18} />
          تصدير PDF
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 print:border-none print:shadow-none print:p-0">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Department Selection */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print:bg-white print:border-gray-300 print:p-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">الإدارة المعنية <span className="text-red-500 print:hidden">*</span></label>
            <select 
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium print:hidden"
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
            >
              <option value="">-- اختر الإدارة --</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            <div className="hidden print:block text-lg font-bold text-gray-900 mt-2 border-b border-gray-300 pb-2">
              {departments.find(d => d.id === selectedDeptId)?.name || 'لم يتم تحديد الإدارة'}
            </div>
          </div>

          {/* Critical Functions (BIA) */}
          <div className="space-y-4 print:break-inside-avoid">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <Activity className="text-emerald-600" size={20} />
              الأنشطة والعمليات الحرجة (Critical Business Functions)
            </h3>
            <p className="text-sm text-gray-500 print:hidden">حدد العمليات الأساسية التي لا يمكن للإدارة التوقف عنها، مع تحديد أوقات التعافي المستهدفة.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse print:border print:border-gray-300">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200 print:bg-gray-100 print:border-gray-300">
                    <th className="p-3 font-semibold text-gray-700 w-2/5 print:border print:border-gray-300">اسم العملية / النشاط الحرج</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300" title="Maximum Tolerable Period of Disruption">أقصى فترة توقف (MTPD)</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300" title="Recovery Time Objective">وقت التعافي (RTO)</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300" title="Recovery Point Objective">نقطة استرداد البيانات (RPO)</th>
                    <th className="p-3 font-semibold text-gray-700 w-12 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {criticalFunctions.map((func, index) => (
                    <tr key={func.id} className="border-b border-gray-100 print:border-gray-300">
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input 
                          type="text" 
                          placeholder="مثال: صرف الرواتب، إصدار التراخيص..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden"
                          value={func.name}
                          onChange={(e) => handleFunctionChange(func.id, 'name', e.target.value)}
                        />
                        <div className="hidden print:block text-gray-800 font-medium">{func.name || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden"
                          value={func.mtpd}
                          onChange={(e) => handleFunctionChange(func.id, 'mtpd', e.target.value)}
                        >
                          <option value="">اختر...</option>
                          <option value="4 ساعات">4 ساعات</option>
                          <option value="24 ساعة">24 ساعة</option>
                          <option value="48 ساعة">48 ساعة</option>
                          <option value="أسبوع">أسبوع</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{func.mtpd || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden"
                          value={func.rto}
                          onChange={(e) => handleFunctionChange(func.id, 'rto', e.target.value)}
                        >
                          <option value="">اختر...</option>
                          <option value="ساعتان">ساعتان</option>
                          <option value="12 ساعة">12 ساعة</option>
                          <option value="24 ساعة">24 ساعة</option>
                          <option value="3 أيام">3 أيام</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{func.rto || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden"
                          value={func.rpo}
                          onChange={(e) => handleFunctionChange(func.id, 'rpo', e.target.value)}
                        >
                          <option value="">اختر...</option>
                          <option value="صفر (مزامنة فورية)">صفر (مزامنة فورية)</option>
                          <option value="ساعة واحدة">ساعة واحدة</option>
                          <option value="24 ساعة (نسخ يومي)">24 ساعة (نسخ يومي)</option>
                          <option value="أسبوع">أسبوع</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{func.rpo || '-'}</div>
                      </td>
                      <td className="p-2 text-center print:hidden">
                        <button 
                          onClick={() => handleRemoveFunction(func.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          disabled={criticalFunctions.length === 1}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={handleAddFunction}
              className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium mt-2 print:hidden"
            >
              <Plus size={16} /> إضافة عملية أخرى
            </button>
          </div>

          {/* Resource Requirements */}
          <div className="space-y-6 print:break-inside-avoid">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <ShieldAlert className="text-emerald-600" size={20} />
              متطلبات التعافي والموارد (Recovery Resources)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-gray-700 flex items-center gap-2">
                  <Server size={18} className="text-blue-600" />
                  الأنظمة التقنية والتطبيقات المطلوبة
                </label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px] print:hidden"
                  placeholder="اذكر أسماء الأنظمة (مثل: نظام تخطيط الموارد ERP، البريد الإلكتروني، الخوادم...)"
                  value={resources.itSystems}
                  onChange={(e) => setResources({...resources, itSystems: e.target.value})}
                ></textarea>
                <div className="hidden print:block mt-2 text-gray-800 whitespace-pre-wrap border border-gray-300 p-4 rounded-lg min-h-[100px] bg-gray-50">
                  {resources.itSystems || 'لا يوجد'}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-700 flex items-center gap-2">
                  <Users size={18} className="text-orange-600" />
                  الموظفين الأساسيين (فريق التعافي)
                </label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px] print:hidden"
                  placeholder="اذكر المسميات الوظيفية أو أسماء الموظفين الأساسيين لعودة العمل..."
                  value={resources.personnel}
                  onChange={(e) => setResources({...resources, personnel: e.target.value})}
                ></textarea>
                <div className="hidden print:block mt-2 text-gray-800 whitespace-pre-wrap border border-gray-300 p-4 rounded-lg min-h-[100px] bg-gray-50">
                  {resources.personnel || 'لا يوجد'}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-700 flex items-center gap-2">
                  <MapPin size={18} className="text-red-600" />
                  موقع العمل البديل (Alternative Workspace)
                </label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px] print:hidden"
                  placeholder="هل يمكن العمل عن بعد؟ أو هل يوجد فرع بديل للعمل منه؟"
                  value={resources.workspace}
                  onChange={(e) => setResources({...resources, workspace: e.target.value})}
                ></textarea>
                <div className="hidden print:block mt-2 text-gray-800 whitespace-pre-wrap border border-gray-300 p-4 rounded-lg min-h-[100px] bg-gray-50">
                  {resources.workspace || 'لا يوجد'}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-700 flex items-center gap-2">
                  <CheckSquare size={18} className="text-green-600" />
                  إجراءات العمل اليدوية البديلة (Workarounds)
                </label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px] print:hidden"
                  placeholder="في حال تعطل الأنظمة، كيف سيتم تسيير العمل يدوياً أو ورقياً؟"
                  value={resources.procedures}
                  onChange={(e) => setResources({...resources, procedures: e.target.value})}
                ></textarea>
                <div className="hidden print:block mt-2 text-gray-800 whitespace-pre-wrap border border-gray-300 p-4 rounded-lg min-h-[100px] bg-gray-50">
                  {resources.procedures || 'لا يوجد'}
                </div>
              </div>
            </div>
          </div>

          {/* Communication Plan */}
          <div className="space-y-4 print:break-inside-avoid print:mt-8">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <PhoneCall className="text-emerald-600" size={20} />
              خطة الاتصال والطوارئ (Communication Plan)
            </h3>
            <p className="text-sm text-gray-500 print:hidden">بيانات الاتصال الهامة وقت الأزمات (شجرة الاتصال، الموردين الحرجين، الجهات الحكومية).</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse print:border print:border-gray-300">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200 print:bg-gray-100 print:border-gray-300">
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">الاسم</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">الصفة / الدور</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">رقم الهاتف</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">البريد الإلكتروني</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">نوع الجهة</th>
                    <th className="p-3 font-semibold text-gray-700 w-12 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-gray-100 print:border-gray-300">
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={contact.name} onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)} />
                        <div className="hidden print:block text-gray-800">{contact.name || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={contact.role} onChange={(e) => handleContactChange(contact.id, 'role', e.target.value)} />
                        <div className="hidden print:block text-gray-800">{contact.role || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" dir="ltr" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden text-right" value={contact.phone} onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)} />
                        <div className="hidden print:block text-gray-800" dir="ltr">{contact.phone || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="email" dir="ltr" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden text-right" value={contact.email} onChange={(e) => handleContactChange(contact.id, 'email', e.target.value)} />
                        <div className="hidden print:block text-gray-800" dir="ltr">{contact.email || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={contact.type} onChange={(e) => handleContactChange(contact.id, 'type', e.target.value as any)}>
                          <option value="داخلي">داخلي</option>
                          <option value="مورد خارجي">مورد خارجي</option>
                          <option value="جهة حكومية">جهة حكومية</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{contact.type || '-'}</div>
                      </td>
                      <td className="p-2 text-center print:hidden">
                        <button onClick={() => handleRemoveContact(contact.id)} className="text-red-500 hover:text-red-700 p-1" disabled={contacts.length === 1}><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleAddContact} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium mt-2 print:hidden"><Plus size={16} /> إضافة جهة اتصال</button>
          </div>

          {/* Dependencies */}
          <div className="space-y-4 print:break-inside-avoid print:mt-8">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <LinkIcon className="text-emerald-600" size={20} />
              الاعتماديات والترابط (Dependencies)
            </h3>
            <p className="text-sm text-gray-500 print:hidden">الإدارات الأخرى أو الموردين الخارجيين الذين تعتمد عليهم الإدارة لتنفيذ عملياتها الحرجة.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse print:border print:border-gray-300">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200 print:bg-gray-100 print:border-gray-300">
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">اسم الجهة / النظام</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">النوع</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300 w-2/5">وصف الاعتمادية</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">مستوى الأهمية</th>
                    <th className="p-3 font-semibold text-gray-700 w-12 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {dependencies.map((dep) => (
                    <tr key={dep.id} className="border-b border-gray-100 print:border-gray-300">
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={dep.name} onChange={(e) => handleDependencyChange(dep.id, 'name', e.target.value)} />
                        <div className="hidden print:block text-gray-800 font-medium">{dep.name || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={dep.type} onChange={(e) => handleDependencyChange(dep.id, 'type', e.target.value as any)}>
                          <option value="إدارة داخلية">إدارة داخلية</option>
                          <option value="مورد خارجي">مورد خارجي</option>
                          <option value="نظام تقني">نظام تقني</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{dep.type || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={dep.description} onChange={(e) => handleDependencyChange(dep.id, 'description', e.target.value)} />
                        <div className="hidden print:block text-gray-800">{dep.description || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={dep.criticality} onChange={(e) => handleDependencyChange(dep.id, 'criticality', e.target.value as any)}>
                          <option value="عالية">عالية</option>
                          <option value="متوسطة">متوسطة</option>
                          <option value="منخفضة">منخفضة</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{dep.criticality || '-'}</div>
                      </td>
                      <td className="p-2 text-center print:hidden">
                        <button onClick={() => handleRemoveDependency(dep.id)} className="text-red-500 hover:text-red-700 p-1" disabled={dependencies.length === 1}><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleAddDependency} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium mt-2 print:hidden"><Plus size={16} /> إضافة اعتمادية</button>
          </div>

          {/* Testing & Exercising */}
          <div className="space-y-4 print:break-inside-avoid print:mt-8">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <FlaskConical className="text-emerald-600" size={20} />
              سجل التجارب والاختبارات (Testing & Exercising)
            </h3>
            <p className="text-sm text-gray-500 print:hidden">توثيق متى تم اختبار خطة استمرارية الأعمال، السيناريو المستخدم، والدروس المستفادة.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse print:border print:border-gray-300">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200 print:bg-gray-100 print:border-gray-300">
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300 w-32">تاريخ الاختبار</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300">السيناريو</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300 w-32">النتيجة</th>
                    <th className="p-3 font-semibold text-gray-700 print:border print:border-gray-300 w-2/5">الدروس المستفادة</th>
                    <th className="p-3 font-semibold text-gray-700 w-12 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {testRecords.map((test) => (
                    <tr key={test.id} className="border-b border-gray-100 print:border-gray-300">
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden text-sm" value={test.date} onChange={(e) => handleTestRecordChange(test.id, 'date', e.target.value)} />
                        <div className="hidden print:block text-gray-800" dir="ltr">{test.date || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" placeholder="مثال: انقطاع الكهرباء..." className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={test.scenario} onChange={(e) => handleTestRecordChange(test.id, 'scenario', e.target.value)} />
                        <div className="hidden print:block text-gray-800">{test.scenario || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={test.outcome} onChange={(e) => handleTestRecordChange(test.id, 'outcome', e.target.value as any)}>
                          <option value="ناجح">ناجح</option>
                          <option value="ناجح جزئياً">ناجح جزئياً</option>
                          <option value="فاشل">فاشل</option>
                        </select>
                        <div className="hidden print:block text-gray-800">{test.outcome || '-'}</div>
                      </td>
                      <td className="p-2 print:border print:border-gray-300 print:p-3">
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none print:hidden" value={test.lessonsLearned} onChange={(e) => handleTestRecordChange(test.id, 'lessonsLearned', e.target.value)} />
                        <div className="hidden print:block text-gray-800">{test.lessonsLearned || '-'}</div>
                      </td>
                      <td className="p-2 text-center print:hidden">
                        <button onClick={() => handleRemoveTestRecord(test.id)} className="text-red-500 hover:text-red-700 p-1" disabled={testRecords.length === 1}><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleAddTestRecord} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium mt-2 print:hidden"><Plus size={16} /> إضافة سجل اختبار</button>
          </div>

          {/* Signatures (Print Only) */}
          <div className="hidden print:block pt-12 mt-12 border-t border-gray-200 print:break-inside-avoid">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-bold text-gray-800 mb-8">مُعد الخطة (ممثل الإدارة)</p>
                <div className="border-b border-gray-400 mx-8"></div>
                <p className="text-sm text-gray-500 mt-2">الاسم والتوقيع</p>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-8">مدير الإدارة</p>
                <div className="border-b border-gray-400 mx-8"></div>
                <p className="text-sm text-gray-500 mt-2">الاسم والتوقيع</p>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-8">إدارة المخاطر واستمرارية الأعمال</p>
                <div className="border-b border-gray-400 mx-8"></div>
                <p className="text-sm text-gray-500 mt-2">الاعتماد</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
