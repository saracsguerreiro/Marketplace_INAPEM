import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, CreditCard, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function PMEFluxo() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    { num: 1, label: "Dados da Empresa" },
    { num: 2, label: "Pedido de Crédito" },
    { num: 3, label: "Aprovação" },
    { num: 4, label: "Escolha de Produtos" },
    { num: 5, label: "Confirmação" },
    { num: 6, label: "Dashboard" },
  ];

  return (
    <div className="min-h-screen bg-gray-bg">
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-coral transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>
          <div className="flex-1">
            <h3 className="text-sm">Pedido de Financiamento</h3>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.num} className="flex-1 relative flex flex-col items-center">
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-3 left-1/2 right-0 h-0.5 ${
                      currentStep > step.num ? "bg-coral" : "bg-border"
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-extrabold relative z-10 transition-all ${
                    currentStep > step.num
                      ? "bg-green-600 border-green-600 text-white"
                      : currentStep === step.num
                      ? "bg-coral border-coral text-white"
                      : "bg-white border-border text-muted-foreground"
                  }`}
                >
                  {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <div
                  className={`text-[10px] mt-1.5 text-center ${
                    currentStep === step.num
                      ? "text-coral font-extrabold"
                      : currentStep > step.num
                      ? "text-green-600 font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {currentStep === 1 && <Step1 onNext={() => setCurrentStep(2)} />}
        {currentStep === 2 && <Step2 onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
        {currentStep === 3 && <Step3 onNext={() => setCurrentStep(4)} />}
        {currentStep === 4 && <Step4 onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />}
        {currentStep === 5 && <Step5 onNext={() => navigate("/empresa/dashboard")} onBack={() => setCurrentStep(4)} />}
      </div>
    </div>
  );
}

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 1 DE 6
      </div>
      <h1 className="mb-2">Registo da <span className="text-coral">Empresa</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Insira os dados da sua empresa para começar o processo de candidatura.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1.5">Nome da Empresa <span className="text-coral">*</span></label>
          <input
            type="text"
            placeholder="Ex: TecnoLuanda Lda"
            className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1.5">NIF <span className="text-coral">*</span></label>
            <input
              type="text"
              placeholder="000000000"
              className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5">Telefone <span className="text-coral">*</span></label>
            <input
              type="tel"
              placeholder="+244 900 000 000"
              className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1.5">Email Empresarial <span className="text-coral">*</span></label>
          <input
            type="email"
            placeholder="empresa@exemplo.ao"
            className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs mb-1.5">Morada Completa <span className="text-coral">*</span></label>
          <input
            type="text"
            placeholder="Rua, Número, Bairro, Cidade"
            className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs mb-1.5">Setor de Atividade <span className="text-coral">*</span></label>
          <select className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors">
            <option>Selecione...</option>
            <option>Comércio</option>
            <option>Serviços</option>
            <option>Indústria</option>
            <option>Tecnologia</option>
            <option>Construção</option>
            <option>Outro</option>
          </select>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-6 bg-coral text-white py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        Continuar
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 2 DE 6
      </div>
      <h1 className="mb-2">Pedido de <span className="text-coral">Crédito</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Defina o valor e o prazo do financiamento que necessita.
      </p>

      <div className="bg-coral/5 border-2 border-coral/20 rounded-xl p-5 mb-6 flex items-center gap-4">
        <div className="text-3xl">💰</div>
        <div>
          <h4 className="text-sm text-coral mb-1">Crédito Pré-Aprovado Disponível</h4>
          <p className="text-xs text-muted-foreground">
            Baseado nos seus dados, estimamos até 500.000 Kz
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1.5">Valor do Crédito Solicitado <span className="text-coral">*</span></label>
          <input
            type="text"
            defaultValue="250.000 Kz"
            className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs mb-1.5">Prazo de Pagamento <span className="text-coral">*</span></label>
          <select className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors">
            <option>12 meses</option>
            <option>18 meses</option>
            <option>24 meses</option>
            <option>36 meses</option>
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1.5">Finalidade do Crédito <span className="text-coral">*</span></label>
          <textarea
            placeholder="Descreva para que vai utilizar este financiamento..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm outline-none focus:border-coral transition-colors resize-none"
          ></textarea>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-xl hover:bg-secondary/80 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-coral text-white py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Submeter Candidatura
        </button>
      </div>
    </div>
  );
}

function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-6">
        PASSO 3 DE 6
      </div>

      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="mb-3">Candidatura <span className="text-green-600">Aprovada</span>!</h1>
      <p className="text-muted-foreground mb-8 text-sm max-w-md mx-auto">
        Parabéns! O seu pedido de crédito foi aprovado. Pode agora escolher produtos e serviços no marketplace.
      </p>

      <div className="bg-secondary rounded-xl p-6 mb-6 text-left">
        <div className="flex justify-between py-2 border-b border-border text-sm">
          <span className="text-muted-foreground">Valor Aprovado:</span>
          <span className="font-extrabold">250.000 Kz</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border text-sm">
          <span className="text-muted-foreground">Prazo:</span>
          <span className="font-extrabold">12 meses</span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-muted-foreground">Prestação Mensal Estimada:</span>
          <span className="font-extrabold">~22.000 Kz</span>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-coral text-white py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-5 h-5" />
        Ir para o Marketplace
      </button>
    </div>
  );
}

function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const mockProducts = [
    { name: "Computador Dell OptiPlex", vendor: "TechSupply", price: 85000 },
    { name: "Impressora HP LaserJet", vendor: "OfficeMax", price: 45000 },
    { name: "Software Microsoft 365", vendor: "Microsoft Angola", price: 25000 },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 4 DE 6
      </div>
      <h1 className="mb-2">Escolha de <span className="text-coral">Produtos</span></h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Selecione os produtos e serviços que deseja adquirir com o financiamento.
      </p>

      <div className="bg-coral/5 border border-coral/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Crédito Disponível:</span>
          <span className="font-extrabold text-coral">250.000 Kz</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-coral" style={{ width: "62%" }}></div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">155.000 Kz utilizados</div>
      </div>

      <div className="space-y-3 mb-6">
        {mockProducts.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-xl">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              💻
            </div>
            <div className="flex-1">
              <div className="text-sm mb-1">{product.name}</div>
              <div className="text-xs text-muted-foreground">{product.vendor}</div>
            </div>
            <div className="text-right">
              <div className="font-extrabold">{product.price.toLocaleString()} Kz</div>
              <button className="text-xs text-coral hover:underline mt-1">Remover</button>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/marketplace"
        className="block w-full bg-secondary text-secondary-foreground py-3 rounded-xl text-center hover:bg-secondary/80 transition-colors mb-4"
      >
        + Adicionar Mais Produtos
      </Link>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-xl hover:bg-secondary/80 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-coral text-white py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          Confirmar Encomenda
        </button>
      </div>
    </div>
  );
}

function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[10px] px-3 py-1 rounded-full mb-3">
        PASSO 5 DE 6
      </div>
      <h1 className="mb-2">Aprovação da <span className="text-coral">Compra</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Confirme a sua encomenda. O INAPEM e o banco vão aprovar e pagar directamente ao fornecedor.
      </p>

      <div className="bg-secondary rounded-xl p-6 mb-6">
        <h3 className="mb-4 text-sm">Resumo da Encomenda</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>155.000 Kz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa de Processamento:</span>
            <span>0 Kz</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="font-extrabold">Total:</span>
            <span className="font-extrabold text-coral">155.000 Kz</span>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
        <p className="text-xs text-orange-800">
          ⚠️ Ao confirmar, o banco irá processar o pagamento directamente aos fornecedores.
          As prestações mensais serão debitadas da sua conta a partir do próximo mês.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-xl hover:bg-secondary/80 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-coral text-white py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Confirmar e Finalizar
        </button>
      </div>
    </div>
  );
}
