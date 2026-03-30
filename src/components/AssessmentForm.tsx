import React, { useState } from 'react';
import { useRiskContext } from '../context/RiskContext';
import { assessmentCriteria, calculateDepartmentClassification } from '../data/mockData';
import { ClipboardCheck, AlertCircle, CheckCircle2, ShieldAlert, ShieldCheck, Shield, Printer } from 'lucide-react';

export default function AssessmentForm() {
  const { departments, submitDepartmentAssessment } = useRiskContext();
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (criterionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [criterionId]: score }));
  };

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const isComplete = Object.keys(answers).length === assessmentCriteria.length && selectedDeptId !== '';
  const currentClassification = calculateDepartmentClassification(totalScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    
    submitDepartmentAssessment(selectedDeptId, totalScore);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setSelectedDeptId('');
    setAnswers({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تم حفظ التقييم بنجاح!</h2>
          <p className="text-gray-600 mb-6">
            تم تحديث تصنيف الإدارة إلى <strong className="text-emerald-700">"{currentClassification}"</strong> بناءً على إجابات النموذج.
          </p>
          <button 
            onClick={resetForm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            تقييم إدارة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 print:max-w-none print:w-full print:m-0 print:p-0">
      
      {/* Print Header */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b-2 border-emerald-800 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="w-32 h-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Saudi_Geological_Survey_Logo.svg/1200px-Saudi_Geological_Survey_Logo.svg.png" alt="SGS Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">نموذج تقييم مخاطر الإدارات</h1>
            <p className="text-gray-600">وفق معايير ISO 31000 و COSO ERM</p>
          </div>
          <div className="w-32 text-left">
            <p className="text-sm text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-start print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">نموذج تقييم الإدارات</h1>
          <p className="text-gray-500 mt-2">
            هذا النموذج مصمم لتقييم مستوى الخطورة للإدارات بناءً على معايير <strong className="text-gray-700">ISO 31000</strong> لإدارة المخاطر وإطار عمل <strong className="text-gray-700">COSO ERM</strong>.
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

      {/* Prominent Score Display at Top */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-20 z-10 print:static print:shadow-none print:border-gray-300 print:mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${
            totalScore === 0 ? 'bg-gray-100 text-gray-400' :
            currentClassification === 'عالية' ? 'bg-red-100 text-red-600' : 
            currentClassification === 'متوسطة' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
          }`}>
            {totalScore === 0 ? <ClipboardCheck size={32} /> : 
             currentClassification === 'عالية' ? <ShieldAlert size={32} /> :
             currentClassification === 'متوسطة' ? <Shield size={32} /> : <ShieldCheck size={32} />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">نتيجة التقييم المباشرة</h2>
            <p className="text-sm text-gray-500 mt-1">أجب على جميع المعايير لتحديد تصنيف الإدارة</p>
          </div>
        </div>

        <div className="flex items-center gap-8 bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
          <div className="text-center">
            <span className="block text-sm text-gray-500 mb-1 font-medium">مجموع النقاط</span>
            <span className="text-3xl font-black text-gray-900">{totalScore} <span className="text-lg text-gray-400 font-normal">/ 45</span></span>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <span className="block text-sm text-gray-500 mb-2 font-medium">التصنيف المتوقع</span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
              totalScore === 0 ? 'bg-gray-100 text-gray-500 border-gray-200' :
              currentClassification === 'عالية' ? 'bg-red-50 text-red-700 border-red-200' : 
              currentClassification === 'متوسطة' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'
            }`}>
              {totalScore > 0 ? currentClassification : 'غير محدد'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 print:border-none print:shadow-none print:p-0">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Department Selection */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print:bg-white print:border-gray-300 print:p-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">الإدارة المراد تقييمها <span className="text-red-500 print:hidden">*</span></label>
            <select 
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium print:appearance-none print:border-gray-300 print:px-0 print:py-2 print:text-lg"
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
            >
              <option value="" disabled>-- اختر الإدارة --</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.isAssessed ? '(تم التقييم مسبقاً)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Criteria Questions */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">معايير التقييم</h3>
            
            {assessmentCriteria.map((criterion, index) => (
              <div key={criterion.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow print:break-inside-avoid print:shadow-none print:border-gray-300">
                <div className="mb-5">
                  <p className="font-bold text-gray-800 text-lg flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 ml-3 text-sm shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{criterion.question}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-2 mr-11 leading-relaxed">
                    {criterion.description}
                  </p>
                </div>
                <div className="space-y-3">
                  {criterion.options.map((option, optIndex) => {
                    const isSelected = answers[criterion.id] === option.score;
                    
                    // Determine colors based on the score value (1-5)
                    let colorClasses = 'border-gray-200 hover:bg-gray-50';
                    let iconColor = 'text-gray-300';
                    let radioColor = 'border-gray-300';
                    
                    if (isSelected) {
                      if (option.score === 1) {
                        colorClasses = 'bg-green-50 border-green-500 ring-1 ring-green-500 text-green-900';
                        iconColor = 'text-green-600';
                        radioColor = 'border-green-500 bg-green-500';
                      } else if (option.score === 2) {
                        colorClasses = 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 text-emerald-900';
                        iconColor = 'text-emerald-600';
                        radioColor = 'border-emerald-500 bg-emerald-500';
                      } else if (option.score === 3) {
                        colorClasses = 'bg-yellow-50 border-yellow-500 ring-1 ring-yellow-500 text-yellow-900';
                        iconColor = 'text-yellow-600';
                        radioColor = 'border-yellow-500 bg-yellow-500';
                      } else if (option.score === 4) {
                        colorClasses = 'bg-orange-50 border-orange-500 ring-1 ring-orange-500 text-orange-900';
                        iconColor = 'text-orange-600';
                        radioColor = 'border-orange-500 bg-orange-500';
                      } else {
                        colorClasses = 'bg-red-50 border-red-500 ring-1 ring-red-500 text-red-900';
                        iconColor = 'text-red-600';
                        radioColor = 'border-red-500 bg-red-500';
                      }
                    }

                    return (
                      <label 
                        key={optIndex} 
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${colorClasses}`}
                      >
                        <input 
                          type="radio" 
                          name={criterion.id} 
                          value={option.score}
                          checked={isSelected}
                          onChange={() => handleOptionSelect(criterion.id, option.score)}
                          className="sr-only"
                          required
                        />
                        
                        {/* Custom Radio Button */}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ml-4 shrink-0 transition-colors ${radioColor}`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        
                        <span className={`text-base flex-1 ${isSelected ? 'font-bold' : 'text-gray-700 font-medium'}`}>
                          {option.label}
                        </span>
                        
                        {/* Selected Icon Indicator */}
                        {isSelected && (
                          <CheckCircle2 size={24} className={`${iconColor} shrink-0`} />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t border-gray-200 flex justify-end print:hidden">
            <button 
              type="submit" 
              disabled={!isComplete}
              className={`px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 ${
                isComplete 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ClipboardCheck size={24} />
              <span>اعتماد وحفظ التقييم</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
