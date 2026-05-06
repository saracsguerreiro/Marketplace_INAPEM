import { CreditCard, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";

const spendingData = [
  { id: "jan", month: "Jan", value: 12000 },
  { id: "fev", month: "Fev", value: 15000 },
  { id: "mar", month: "Mar", value: 18000 },
  { id: "abr", month: "Abr", value: 22000 },
  { id: "mai", month: "Mai", value: 25000 },
];

export function CompanyDashboard() {
  const stats = [
    {
      icon: CreditCard,
      label: "Crédito Disponível",
      value: "€75.000",
      trend: "+15%",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: ShoppingBag,
      label: "Compras Este Mês",
      value: "€25.000",
      trend: "+8%",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: TrendingUp,
      label: "Total Financiado",
      value: "€150.000",
      trend: "+22%",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: Clock,
      label: "Próximo Vencimento",
      value: "15 Mai",
      trend: "€5.200",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  const activeLoans = [
    {
      id: "1",
      product: "Software ERP",
      amount: 5999,
      installments: "6/12",
      nextPayment: "15 Mai 2026",
      status: "Em dia",
    },
    {
      id: "2",
      product: "Equipamento Escritório",
      amount: 8500,
      installments: "3/24",
      nextPayment: "20 Mai 2026",
      status: "Em dia",
    },
  ];

  const recentOrders = [
    {
      id: "1",
      date: "02 Mai 2026",
      product: "Consultoria Marketing",
      amount: 3500,
      status: "Processando",
    },
    {
      id: "2",
      date: "28 Abr 2026",
      product: "Licenças Software",
      amount: 1200,
      status: "Entregue",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Dashboard - Empresa</h1>
        <p className="text-muted-foreground">Visão geral das suas finanças e compras</p>
      </div>

      <InsightsPanel insights={[
        {
          type: "up",
          title: "Tecnologia em alta",
          description: "Gastou 32% mais em Tecnologia este mês face ao mês anterior. É a sua categoria com maior crescimento.",
          action: "Ver produtos de Tecnologia",
        },
        {
          type: "alert",
          title: "Prestações a vencer",
          description: "Tem 2 prestações a vencer nos próximos 10 dias — total de 10.400 Kz. Garanta saldo suficiente.",
          action: "Ver financiamentos",
        },
        {
          type: "tip",
          title: "Oportunidade de poupança",
          description: "Empresas com o seu perfil poupam em média 18% ao consolidar compras de Equipamentos num único pedido.",
          action: "Explorar Equipamentos",
        },
        {
          type: "up",
          title: "Crédito bem utilizado",
          description: "Utilizou 75% do crédito disponível de forma eficiente. O seu histórico de pagamentos está em excelente estado.",
        },
      ]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-green-600">{stat.trend}</span>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="mb-6">Histórico de Gastos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#030213"
                fill="#030213"
                fillOpacity={0.1}
                name="Gastos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="mb-6">Financiamentos Ativos</h2>
          <div className="space-y-4">
            {activeLoans.map((loan) => (
              <div key={loan.id} className="bg-secondary rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{loan.product}</div>
                    <div className="text-sm text-muted-foreground">
                      Parcela {loan.installments}
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {loan.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Próximo pagamento:</span>
                  <span>{loan.nextPayment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="mb-6">Pedidos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Data</th>
                <th className="text-left py-3 px-4">Produto</th>
                <th className="text-left py-3 px-4">Valor</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">{order.date}</td>
                  <td className="py-4 px-4">{order.product}</td>
                  <td className="py-4 px-4">€{order.amount.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.status === "Entregue"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
