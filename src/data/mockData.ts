export type RiskLevel = 'عالية' | 'متوسطة' | 'عادية';

export interface Department {
  id: string;
  name: string;
  sector: string;
  classification: RiskLevel;
  isAssessed?: boolean;
  assessmentScore?: number;
}

export interface Risk {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  score: number;
  status: 'مفتوح' | 'مغلق' | 'قيد المعالجة';
  dateIdentified: string;
}

export interface AssessmentCriterion {
  id: string;
  question: string;
  description: string;
  options: { label: string; score: number }[];
}

export const assessmentCriteria: AssessmentCriterion[] = [
  {
    id: 'c1',
    question: 'الأهمية الاستراتيجية (Strategic Impact)',
    description: 'مدى تأثير الإدارة على تحقيق الأهداف الاستراتيجية للهيئة ومبادرات رؤية 2030.',
    options: [
      { label: 'تأثير معدوم أو محدود جداً', score: 1 },
      { label: 'تأثير منخفض (دعم إداري غير مباشر)', score: 2 },
      { label: 'تأثير متوسط (يساهم في مبادرات فرعية)', score: 3 },
      { label: 'تأثير مرتفع (يساهم بشكل مباشر في أهداف رئيسية)', score: 4 },
      { label: 'تأثير حرج جداً (محور أساسي لتحقيق الرؤية)', score: 5 }
    ]
  },
  {
    id: 'c2',
    question: 'الأثر المالي (Financial Impact)',
    description: 'حجم الخسائر المالية المحتملة أو حجم الميزانية المدارة في حال تعثر عمليات الإدارة.',
    options: [
      { label: 'أقل من 100 ألف ريال', score: 1 },
      { label: 'من 100 ألف إلى 500 ألف ريال', score: 2 },
      { label: 'من 500 ألف إلى 2 مليون ريال', score: 3 },
      { label: 'من 2 مليون إلى 10 مليون ريال', score: 4 },
      { label: 'أكثر من 10 مليون ريال', score: 5 }
    ]
  },
  {
    id: 'c3',
    question: 'الأثر التشغيلي واستمرارية الأعمال (Operational Impact)',
    description: 'تأثير توقف أعمال الإدارة على العمليات الأساسية والخدمات الحيوية للهيئة.',
    options: [
      { label: 'تأثير داخلي لا يذكر', score: 1 },
      { label: 'تأثير محدود يمكن تداركه خلال أيام', score: 2 },
      { label: 'تأثير متوسط يعيق بعض الخدمات مؤقتاً', score: 3 },
      { label: 'تأثير كبير يوقف خدمات رئيسية لعدة أيام', score: 4 },
      { label: 'شلل تام في العمليات الأساسية للهيئة', score: 5 }
    ]
  },
  {
    id: 'c4',
    question: 'الامتثال التنظيمي والقانوني (Legal & Compliance)',
    description: 'مستوى الخضوع للتشريعات واللوائح واحتمالية التعرض لمساءلة قانونية أو غرامات.',
    options: [
      { label: 'إجراءات داخلية فقط', score: 1 },
      { label: 'لوائح تنظيمية بسيطة', score: 2 },
      { label: 'متطلبات حكومية متوسطة التعقيد', score: 3 },
      { label: 'تشريعات صارمة مع احتمالية غرامات', score: 4 },
      { label: 'تشريعات حرجة (مخالفتها تؤدي لمساءلة جنائية أو إيقاف العمل)', score: 5 }
    ]
  },
  {
    id: 'c5',
    question: 'السمعة وثقة أصحاب المصلحة (Reputation)',
    description: 'الأثر المحتمل لأخطاء الإدارة على سمعة الهيئة محلياً ودولياً.',
    options: [
      { label: 'لا يوجد تأثير على السمعة', score: 1 },
      { label: 'تأثير داخلي بين الموظفين فقط', score: 2 },
      { label: 'تأثير محدود على بعض الشركاء المحليين', score: 3 },
      { label: 'تغطية إعلامية سلبية على مستوى المملكة', score: 4 },
      { label: 'أضرار جسيمة بالسمعة دولياً وفقدان ثقة الجهات العليا', score: 5 }
    ]
  },
  {
    id: 'c6',
    question: 'أمن المعلومات وحماية البيانات (Information Security)',
    description: 'مدى حساسية وسرية البيانات التي تعالجها الإدارة (مثل البيانات الجيولوجية الوطنية).',
    options: [
      { label: 'بيانات عامة ومتاحة للجميع', score: 1 },
      { label: 'بيانات داخلية غير حساسة', score: 2 },
      { label: 'بيانات سرية يقتصر الوصول إليها على الموظفين', score: 3 },
      { label: 'بيانات وطنية حساسة تسريبها يسبب أضراراً', score: 4 },
      { label: 'بيانات سيادية بالغة السرية تسريبها يهدد الأمن القومي', score: 5 }
    ]
  },
  {
    id: 'c7',
    question: 'الصحة والسلامة المهنية والبيئة (HSE)',
    description: 'مستوى المخاطر الجسدية أو البيئية المرتبطة بأنشطة الإدارة (مثل العمل الميداني).',
    options: [
      { label: 'بيئة عمل مكتبية آمنة تماماً', score: 1 },
      { label: 'مخاطر مكتبية بسيطة (إجهاد، انزلاق)', score: 2 },
      { label: 'زيارات ميدانية محدودة أو مختبرات منخفضة الخطورة', score: 3 },
      { label: 'عمليات ميدانية مكثفة أو تعامل مع مواد خطرة', score: 4 },
      { label: 'مخاطر عالية جداً (تنقيب، إشعاع، مناطق وعرة)', score: 5 }
    ]
  },
  {
    id: 'c8',
    question: 'الاعتماد على التقنية والبنية التحتية (Technology Reliance)',
    description: 'مدى اعتماد الإدارة على الأنظمة التقنية لأداء مهامها الحيوية.',
    options: [
      { label: 'اعتماد ضعيف (عمل ورقي/يدوي)', score: 1 },
      { label: 'اعتماد منخفض (برامج مكتبية أساسية)', score: 2 },
      { label: 'اعتماد متوسط (أنظمة داخلية غير حرجة)', score: 3 },
      { label: 'اعتماد عالي (أنظمة متخصصة وقواعد بيانات)', score: 4 },
      { label: 'اعتماد كلي وحرج (توقف التقنية يعني توقف الإدارة تماماً)', score: 5 }
    ]
  },
  {
    id: 'c9',
    question: 'رأس المال البشري والكفاءات (Human Capital)',
    description: 'مدى توفر الكفاءات المتخصصة وتأثير تسرب الموظفين على أداء الإدارة.',
    options: [
      { label: 'مهام روتينية يسهل تعويض الموظفين فيها', score: 1 },
      { label: 'مهام تتطلب تدريباً بسيطاً', score: 2 },
      { label: 'مهام تتطلب خبرة متوسطة متوفرة في السوق', score: 3 },
      { label: 'مهام تخصصية يصعب إيجاد بديل لها بسرعة', score: 4 },
      { label: 'كفاءات نادرة جداً (خبراء جيولوجيين) تسربهم يوقف العمل', score: 5 }
    ]
  }
];

export const calculateDepartmentClassification = (totalScore: number): RiskLevel => {
  // Max score is 45 (9 criteria * 5)
  if (totalScore >= 32) return 'عالية';
  if (totalScore >= 20) return 'متوسطة';
  return 'عادية';
};

export const initialDepartments: Department[] = [
  // الإدارة التنفيذية
  { id: 'd1', name: 'الإدارة العليا للاتصال المؤسسي والمعرفة', sector: 'الإدارة التنفيذية', classification: 'عادية' },
  { id: 'd2', name: 'الإدارة العليا لمركز أبحاث ودراسات زمزم', sector: 'الإدارة التنفيذية', classification: 'عالية' },
  { id: 'd3', name: 'الإدارة العليا لخدمات المستثمرين', sector: 'الإدارة التنفيذية', classification: 'متوسطة' },
  { id: 'd4', name: 'مكتب دعم المشاريع', sector: 'الإدارة التنفيذية', classification: 'متوسطة' },
  { id: 'd5', name: 'وحدة المعادن الاستراتيجية الحرجة', sector: 'الإدارة التنفيذية', classification: 'عالية' },
  { id: 'd6', name: 'الإدارة العليا للقانونية', sector: 'الإدارة التنفيذية', classification: 'متوسطة' },
  { id: 'd7', name: 'الإدارة العليا للمراجعة الداخلية والالتزام', sector: 'الإدارة التنفيذية', classification: 'عالية' },
  { id: 'd8', name: 'الإدارة العليا للدعم والانجاز', sector: 'الإدارة التنفيذية', classification: 'عادية' },
  { id: 'd9', name: 'إدارة مكتب رئيس الهيئة التنفيذي', sector: 'الإدارة التنفيذية', classification: 'عادية' },

  // قطاع الموارد البشرية والمالية
  { id: 'd10', name: 'الإدارة العليا للموارد البشرية', sector: 'قطاع الموارد البشرية والمالية', classification: 'متوسطة' },
  { id: 'd11', name: 'الإدارة العليا للشؤون المالية', sector: 'قطاع الموارد البشرية والمالية', classification: 'عالية' },
  { id: 'd12', name: 'الإدارة العليا للحوكمة والمخاطر والالتزام', sector: 'قطاع الموارد البشرية والمالية', classification: 'عالية' },
  { id: 'd13', name: 'مركز الاتصالات الإدارية', sector: 'قطاع الموارد البشرية والمالية', classification: 'عادية' },
  { id: 'd14', name: 'قسم مراقبة المخزون', sector: 'قطاع الموارد البشرية والمالية', classification: 'متوسطة' },

  // قطاع المبادرات والمشاريع الاستراتيجية
  { id: 'd15', name: 'الإدارة العليا للمبادرات', sector: 'قطاع المبادرات والمشاريع الاستراتيجية', classification: 'متوسطة' },
  { id: 'd16', name: 'الإدارة العليا للمشاريع الاستراتيجية', sector: 'قطاع المبادرات والمشاريع الاستراتيجية', classification: 'عالية' },
  { id: 'd17', name: 'الإدارة العليا للبيانات الجيولوجية الوطنية', sector: 'قطاع المبادرات والمشاريع الاستراتيجية', classification: 'عالية' },

  // قطاع البرامج الجيولوجية
  { id: 'd18', name: 'مركز المسح والتنقيب', sector: 'قطاع البرامج الجيولوجية', classification: 'عالية' },
  { id: 'd19', name: 'مركز المخاطر الجيولوجية', sector: 'قطاع البرامج الجيولوجية', classification: 'عالية' },
  { id: 'd20', name: 'مركز الصحاري والدعم الجيوتقني', sector: 'قطاع البرامج الجيولوجية', classification: 'متوسطة' },
  { id: 'd21', name: 'مركز الجيولوجيا التطبيقية', sector: 'قطاع البرامج الجيولوجية', classification: 'متوسطة' },
  { id: 'd22', name: 'مركز الخدمات الجيولوجية', sector: 'قطاع البرامج الجيولوجية', classification: 'متوسطة' },
  { id: 'd23', name: 'مشروع خدمات الدعم الفني', sector: 'قطاع البرامج الجيولوجية', classification: 'عادية' },
  { id: 'd24', name: 'وحدة دعم عمليات قاعدة المعلومات الوطنية الجيولوجية', sector: 'قطاع البرامج الجيولوجية', classification: 'متوسطة' },
  { id: 'd25', name: 'إدارة المختبرات والمراكز', sector: 'قطاع البرامج الجيولوجية', classification: 'عالية' },

  // الإدارة العامة للخدمات المشتركة
  { id: 'd26', name: 'إدارة المشتريات والمستودعات', sector: 'الإدارة العامة للخدمات المشتركة', classification: 'متوسطة' },
  { id: 'd27', name: 'إدارة الدعم اللوجستي', sector: 'الإدارة العامة للخدمات المشتركة', classification: 'متوسطة' },
  { id: 'd28', name: 'إدارة الأمن والصحة والسلامة', sector: 'الإدارة العامة للخدمات المشتركة', classification: 'عالية' },
  { id: 'd29', name: 'إدارة الخدمات والمرافق', sector: 'الإدارة العامة للخدمات المشتركة', classification: 'عادية' },
  { id: 'd30', name: 'قسم خدمات الطيران', sector: 'الإدارة العامة للخدمات المشتركة', classification: 'عالية' },

  // الإدارة العامة للتخطيط والتطوير
  { id: 'd31', name: 'إدارة السياحة الجيولوجية', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'متوسطة' },
  { id: 'd32', name: 'إدارة التخطيط وقياس الأداء', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'متوسطة' },
  { id: 'd33', name: 'إدارة التميز المؤسسي', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'عادية' },
  { id: 'd34', name: 'مركز الأعمال', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'متوسطة' },
  { id: 'd35', name: 'إدارة الشراكات الاستراتيجية', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'متوسطة' },
  { id: 'd36', name: 'مركز الأزمات والكوارث', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'عالية' },
  { id: 'd37', name: 'مكتب إدارة البيانات', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'عالية' },
  { id: 'd38', name: 'مركز الوثائق والمحفوظات', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'متوسطة' },
  { id: 'd39', name: 'وحدة تقييم المشاريع', sector: 'الإدارة العامة للتخطيط والتطوير', classification: 'متوسطة' },

  // الإدارة العليا للتحول الرقمي وتقنية المعلومات
  { id: 'd40', name: 'إدارة عمليات تقنية المعلومات', sector: 'الإدارة العليا للتحول الرقمي وتقنية المعلومات', classification: 'عالية' },
  { id: 'd41', name: 'إدارة الخدمات الالكترونية', sector: 'الإدارة العليا للتحول الرقمي وتقنية المعلومات', classification: 'متوسطة' },
  { id: 'd42', name: 'إدارة نظام تخطيط الموارد المؤسسية', sector: 'الإدارة العليا للتحول الرقمي وتقنية المعلومات', classification: 'عالية' },
  { id: 'd43', name: 'إدارة التحول الرقمي', sector: 'الإدارة العليا للتحول الرقمي وتقنية المعلومات', classification: 'متوسطة' },
];

export const initialRisks: Risk[] = [
  {
    id: 'r1',
    departmentId: 'd40', // IT Operations
    title: 'تعطل الخوادم الرئيسية',
    description: 'انقطاع الخدمة بسبب فشل في الخوادم الرئيسية مما يؤدي لتوقف الأنظمة.',
    likelihood: 3,
    impact: 5,
    score: 23, // 3 * 5 * 1.5 (High Dept) = 22.5 -> 23
    status: 'مفتوح',
    dateIdentified: '2024-01-15'
  },
  {
    id: 'r2',
    departmentId: 'd18', // Survey and Exploration
    title: 'تأخر تصاريح العمل الميداني',
    description: 'تأخر في استخراج التصاريح اللازمة للفرق الميدانية مما يعيق الجدول الزمني.',
    likelihood: 4,
    impact: 3,
    score: 18, // 4 * 3 * 1.5 (High Dept) = 18
    status: 'قيد المعالجة',
    dateIdentified: '2024-02-10'
  },
  {
    id: 'r3',
    departmentId: 'd10', // HR
    title: 'تسرب الكفاءات النادرة',
    description: 'استقالة موظفين ذوي خبرات نادرة في التخصصات الجيولوجية.',
    likelihood: 3,
    impact: 4,
    score: 14, // 3 * 4 * 1.2 (Medium Dept) = 14.4 -> 14
    status: 'مفتوح',
    dateIdentified: '2024-03-05'
  }
];

export const getDepartmentWeight = (classification: RiskLevel) => {
  switch (classification) {
    case 'عالية': return 1.5;
    case 'متوسطة': return 1.2;
    case 'عادية': return 1.0;
    default: return 1.0;
  }
};

export const calculateRiskScore = (likelihood: number, impact: number, deptClassification: RiskLevel) => {
  const baseScore = likelihood * impact;
  const weight = getDepartmentWeight(deptClassification);
  return Math.round(baseScore * weight);
};

export const getRiskSeverity = (score: number) => {
  if (score >= 20) return { label: 'حرج', color: 'bg-red-600 text-white', border: 'border-red-600', text: 'text-red-600' };
  if (score >= 15) return { label: 'عالي', color: 'bg-orange-500 text-white', border: 'border-orange-500', text: 'text-orange-500' };
  if (score >= 8) return { label: 'متوسط', color: 'bg-yellow-400 text-black', border: 'border-yellow-400', text: 'text-yellow-600' };
  return { label: 'منخفض', color: 'bg-green-500 text-white', border: 'border-green-500', text: 'text-green-600' };
};
