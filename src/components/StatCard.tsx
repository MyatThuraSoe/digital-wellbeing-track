import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  className = "" 
}: StatCardProps) => {
  const trendColors = {
    up: 'text-accent',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className={`p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {trend && trendValue && (
            <div className={`flex items-center text-sm ${trendColors[trend]}`}>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};