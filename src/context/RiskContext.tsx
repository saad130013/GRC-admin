import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Department, Risk, initialDepartments, initialRisks, RiskLevel, calculateRiskScore, calculateDepartmentClassification } from '../data/mockData';

interface RiskContextType {
  departments: Department[];
  risks: Risk[];
  updateDepartmentClassification: (id: string, classification: RiskLevel) => void;
  submitDepartmentAssessment: (id: string, score: number) => void;
  addRisk: (risk: Omit<Risk, 'id' | 'score' | 'dateIdentified'>) => void;
  updateRiskStatus: (id: string, status: Risk['status']) => void;
}

const RiskContext = createContext<RiskContextType | undefined>(undefined);

export const RiskProvider = ({ children }: { children: ReactNode }) => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [risks, setRisks] = useState<Risk[]>(initialRisks);

  const updateDepartmentClassification = (id: string, classification: RiskLevel) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, classification } : d));
    
    // Recalculate risks for this department
    setRisks(prev => prev.map(r => {
      if (r.departmentId === id) {
        return {
          ...r,
          score: calculateRiskScore(r.likelihood, r.impact, classification)
        };
      }
      return r;
    }));
  };

  const submitDepartmentAssessment = (id: string, score: number) => {
    const newClassification = calculateDepartmentClassification(score);
    setDepartments(prev => prev.map(d => d.id === id ? { 
      ...d, 
      classification: newClassification,
      isAssessed: true,
      assessmentScore: score
    } : d));

    // Recalculate risks for this department
    setRisks(prev => prev.map(r => {
      if (r.departmentId === id) {
        return {
          ...r,
          score: calculateRiskScore(r.likelihood, r.impact, newClassification)
        };
      }
      return r;
    }));
  };

  const addRisk = (riskData: Omit<Risk, 'id' | 'score' | 'dateIdentified'>) => {
    const dept = departments.find(d => d.id === riskData.departmentId);
    if (!dept) return;

    const newRisk: Risk = {
      ...riskData,
      id: `r${Date.now()}`,
      score: calculateRiskScore(riskData.likelihood, riskData.impact, dept.classification),
      dateIdentified: new Date().toISOString().split('T')[0]
    };

    setRisks(prev => [newRisk, ...prev]);
  };

  const updateRiskStatus = (id: string, status: Risk['status']) => {
    setRisks(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <RiskContext.Provider value={{ departments, risks, updateDepartmentClassification, submitDepartmentAssessment, addRisk, updateRiskStatus }}>
      {children}
    </RiskContext.Provider>
  );
};

export const useRiskContext = () => {
  const context = useContext(RiskContext);
  if (!context) throw new Error('useRiskContext must be used within a RiskProvider');
  return context;
};
