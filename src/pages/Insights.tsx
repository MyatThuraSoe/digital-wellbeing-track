import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const barData = [
  { name: 'Instagram', time: 83, color: '#E4405F' },
  { name: 'Chrome', time: 56, color: '#4285F4' },
  { name: 'Spotify', time: 45, color: '#1DB954' },
  { name: 'WhatsApp', time: 32, color: '#25D366' },
  { name: 'YouTube', time: 28, color: '#FF0000' },
  { name: 'Twitter', time: 19, color: '#1DA1F2' },
];

const pieData = [
  { name: 'Social Media', value: 35, color: '#E4405F' },
  { name: 'Productivity', value: 25, color: '#4285F4' },
  { name: 'Entertainment', value: 20, color: '#1DB954' },
  { name: 'Communication', value: 15, color: '#25D366' },
  { name: 'Other', value: 5, color: '#8E8E93' },
];

const unlockData = [
  { time: '6:00', unlocks: 2 },
  { time: '8:00', unlocks: 8 },
  { time: '10:00', unlocks: 15 },
  { time: '12:00', unlocks: 23 },
  { time: '14:00', unlocks: 19 },
  { time: '16:00', unlocks: 25 },
  { time: '18:00', unlocks: 21 },
  { time: '20:00', unlocks: 18 },
  { time: '22:00', unlocks: 12 },
];

const chartConfig = {
  time: { label: "Time (minutes)", color: "hsl(var(--primary))" },
  unlocks: { label: "Unlocks", color: "hsl(var(--accent))" }
};

export default function Insights() {
  const [timeframe, setTimeframe] = useState('today');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 pt-12">
        <h1 className="text-2xl font-bold">Usage Insights</h1>
        <p className="text-white/80">Detailed analytics of your digital habits</p>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Time Period Selector */}
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value={timeframe} className="space-y-6 mt-6">
            {/* App Usage Bar Chart */}
            <Card className="p-6 shadow-soft">
              <h3 className="font-semibold mb-4">Time Spent per App</h3>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      className="fill-muted-foreground"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      fontSize={12}
                      className="fill-muted-foreground"
                      label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'hsl(var(--muted))' }}
                    />
                    <Bar 
                      dataKey="time" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      className="animate-fade-in"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>

            {/* Category Pie Chart */}
            <Card className="p-6 shadow-soft">
              <h3 className="font-semibold mb-4">Usage by Category</h3>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      className="animate-scale-in"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>

            {/* Unlock Pattern Line Chart */}
            <Card className="p-6 shadow-soft">
              <h3 className="font-semibold mb-4">Phone Unlocks Throughout Day</h3>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={unlockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                    <XAxis 
                      dataKey="time" 
                      fontSize={12}
                      className="fill-muted-foreground"
                    />
                    <YAxis 
                      fontSize={12}
                      className="fill-muted-foreground"
                      label={{ value: 'Unlocks', angle: -90, position: 'insideLeft' }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ stroke: 'hsl(var(--muted))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="unlocks" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: 'hsl(var(--accent))', strokeWidth: 2 }}
                      className="animate-fade-in"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>

            {/* Weekly Summary */}
            <Card className="p-6 shadow-soft">
              <h3 className="font-semibold mb-4">Weekly Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">31.5h</div>
                  <div className="text-sm text-muted-foreground">Total Screen Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">892</div>
                  <div className="text-sm text-muted-foreground">Total Unlocks</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">4.5h</div>
                  <div className="text-sm text-muted-foreground">Daily Average</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">127</div>
                  <div className="text-sm text-muted-foreground">Avg Unlocks/Day</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}