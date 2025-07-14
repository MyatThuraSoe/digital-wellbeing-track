import { useEffect, useState } from 'react';
import { StatCard } from '@/components/StatCard';
import { ProgressRing } from '@/components/ProgressRing';
import { Card } from '@/components/ui/card';
import { Smartphone, Eye, Clock, Target } from 'lucide-react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data - in real app this would come from local storage/SQLite
  const todayStats = {
    screenTime: 4.5, // hours
    unlocks: 127,
    appOpens: 89,
    focusScore: 73
  };

  const screenTimeProgress = (todayStats.screenTime / 8) * 100; // assuming 8h target

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 pt-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Good afternoon</h1>
          <p className="text-white/80">Here's your digital wellbeing summary</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 -mt-4">
        {/* Today's Screen Time Circle */}
        <Card className="p-8 text-center shadow-medium bg-gradient-subtle">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">Today's Screen Time</h2>
            <div className="flex justify-center">
              <ProgressRing 
                progress={mounted ? screenTimeProgress : 0}
                size={160}
                strokeWidth={12}
                className="animate-scale-in"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {todayStats.screenTime}h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of 8h goal
                  </div>
                </div>
              </ProgressRing>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${screenTimeProgress <= 75 ? 'bg-accent' : 'bg-destructive'}`}></div>
              <span className="text-sm text-muted-foreground">
                {screenTimeProgress <= 75 ? 'On track' : 'Over goal'}
              </span>
            </div>
          </div>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Phone Unlocks"
            value={todayStats.unlocks}
            subtitle="times today"
            icon={Smartphone}
            trend="down"
            trendValue="-12%"
          />
          <StatCard
            title="App Opens"
            value={todayStats.appOpens}
            subtitle="times today"
            icon={Eye}
            trend="neutral"
            trendValue="±0%"
          />
        </div>

        {/* Focus Score Card */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Focus Score</h3>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">{todayStats.focusScore}%</span>
                <span className="text-sm text-accent">+5% from yesterday</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on app usage patterns and breaks between sessions
              </p>
            </div>
            <ProgressRing 
              progress={mounted ? todayStats.focusScore : 0}
              size={80}
              color="accent"
              className="animate-scale-in"
            >
              <div className="text-xs font-medium text-accent">
                {todayStats.focusScore}
              </div>
            </ProgressRing>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4">Most Used Apps Today</h3>
          <div className="space-y-3">
            {[
              { name: 'Instagram', time: '1h 23m', color: 'bg-pink-500' },
              { name: 'Chrome', time: '56m', color: 'bg-blue-500' },
              { name: 'Spotify', time: '45m', color: 'bg-green-500' },
              { name: 'WhatsApp', time: '32m', color: 'bg-green-600' },
            ].map((app, index) => (
              <div key={app.name} className="flex items-center justify-between animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{app.name[0]}</span>
                  </div>
                  <span className="font-medium">{app.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{app.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}