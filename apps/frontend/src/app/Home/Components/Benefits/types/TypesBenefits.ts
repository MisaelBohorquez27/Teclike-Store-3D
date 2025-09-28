// Tipos para BenefitsGrid.tsx

export interface Benefit {
  title: string;
  value: string;
  description: string;
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
}