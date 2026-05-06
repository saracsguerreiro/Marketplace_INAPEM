import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

interface Insight {
  type: "up" | "down" | "alert" | "tip";
  title: string;
  description: string;
  action?: string;
}

interface Props {
  insights: Insight[];
}

const iconMap = {
  up:    { icon: TrendingUp,     color: "text-green-600",  bg: "bg-green-50",  border: "border-green-100" },
  down:  { icon: TrendingDown,   color: "text-red-500",    bg: "bg-red-50",    border: "border-red-100"   },
  alert: { icon: AlertTriangle,  color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100"},
  tip:   { icon: Lightbulb,      color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100"  },
};

export function InsightsPanel({ insights }: Props) {
  return (
    <div className="bg-white border-2 border-border rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-coral" />
        <h2 className="text-lg font-semibold">Insights Inteligentes</h2>
        <span className="ml-auto text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
          Actualizado agora
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight, i) => {
          const { icon: Icon, color, bg, border } = iconMap[insight.type];
          return (
            <div
              key={i}
              className={`flex gap-3 p-4 rounded-xl border ${bg} ${border}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-0.5">{insight.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                {insight.action && (
                  <button className={`mt-2 text-xs font-medium flex items-center gap-1 ${color} hover:underline`}>
                    {insight.action}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
