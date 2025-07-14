import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProgressRing } from '@/components/ProgressRing';
import { StatCard } from '@/components/StatCard';
import { Clock, Target, Smartphone, Plus, Edit } from 'lucide-react';

interface Goal {
  id: string;
  type: 'screen_time' | 'unlocks' | 'app_specific';
  title: string;
  target: number;
  current: number;
  unit: string;
  enabled: boolean;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      type: 'screen_time',
      title: 'Daily Screen Time',
      target: 8,
      current: 4.5,
      unit: 'hours',
      enabled: true
    },
    {
      id: '2', 
      type: 'unlocks',
      title: 'Phone Unlocks',
      target: 100,
      current: 127,
      unit: 'times',
      enabled: true
    },
    {
      id: '3',
      type: 'app_specific',
      title: 'Instagram Usage',
      target: 30,
      current: 83,
      unit: 'minutes',
      enabled: false
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, enabled: !goal.enabled } : goal
    ));
  };

  const getProgressColor = (current: number, target: number, type: string) => {
    const progress = (current / target) * 100;
    if (type === 'unlocks' || type === 'app_specific') {
      return progress <= 100 ? 'accent' : 'destructive';
    }
    return progress <= 100 ? 'accent' : 'destructive';
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Goals & Limits</h1>
            <p className="text-white/80">Set healthy digital boundaries</p>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Daily Overview */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Active Goals"
            value={goals.filter(g => g.enabled).length}
            subtitle={`of ${goals.length} total`}
            icon={Target}
          />
          <StatCard
            title="Goals Met"
            value="1"
            subtitle="today"
            icon={Target}
            trend="up"
            trendValue="+1"
          />
          <StatCard
            title="Avg Success"
            value="67%"
            subtitle="this week"
            icon={Clock}
            trend="up"
            trendValue="+5%"
          />
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card className="p-6 shadow-medium animate-scale-in">
            <h3 className="font-semibold mb-4">Create New Goal</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal-type">Goal Type</Label>
                <select 
                  id="goal-type"
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                >
                  <option value="screen_time">Daily Screen Time</option>
                  <option value="unlocks">Phone Unlocks</option>
                  <option value="app_specific">Specific App Usage</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-target">Target</Label>
                  <Input id="goal-target" type="number" placeholder="8" />
                </div>
                <div>
                  <Label htmlFor="goal-unit">Unit</Label>
                  <Input id="goal-unit" placeholder="hours" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddGoal(false)}>
                  Create Goal
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = getProgress(goal.current, goal.target);
            const isOverLimit = goal.current > goal.target;
            
            return (
              <Card 
                key={goal.id} 
                className={`p-6 shadow-soft transition-all duration-300 animate-fade-in ${
                  goal.enabled ? 'border-primary/20' : 'opacity-60'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {goal.type === 'screen_time' && <Clock className="h-5 w-5 text-primary" />}
                      {goal.type === 'unlocks' && <Smartphone className="h-5 w-5 text-primary" />}
                      {goal.type === 'app_specific' && <Target className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Target: {goal.target} {goal.unit} daily
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Switch
                      checked={goal.enabled}
                      onCheckedChange={() => toggleGoal(goal.id)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-2xl font-bold">
                        {goal.current}
                      </span>
                      <span className="text-muted-foreground">
                        / {goal.target} {goal.unit}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          isOverLimit ? 'bg-destructive' : 'bg-accent'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className={isOverLimit ? 'text-destructive' : 'text-accent'}>
                        {isOverLimit ? `${(goal.current - goal.target).toFixed(1)} ${goal.unit} over limit` : 
                         `${(goal.target - goal.current).toFixed(1)} ${goal.unit} remaining`}
                      </span>
                      <span className="text-muted-foreground">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="ml-6">
                    <ProgressRing
                      progress={progress}
                      size={80}
                      color={isOverLimit ? 'destructive' as any : 'accent'}
                      className="animate-scale-in"
                    >
                      <div className="text-center">
                        <div className={`text-sm font-bold ${
                          isOverLimit ? 'text-destructive' : 'text-accent'
                        }`}>
                          {progress.toFixed(0)}%
                        </div>
                      </div>
                    </ProgressRing>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Achievement Section */}
        <Card className="p-6 shadow-soft bg-gradient-subtle">
          <h3 className="font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Weekly Goal Achieved!</p>
                <p className="text-sm text-muted-foreground">Stayed under 35h screen time this week</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Mindful Monday</p>
                <p className="text-sm text-muted-foreground">Under 80 unlocks yesterday</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}