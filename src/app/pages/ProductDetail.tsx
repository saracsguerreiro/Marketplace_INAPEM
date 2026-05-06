import { useParams, Link, useNavigate } from "react-router";
import { Star, CheckCircle, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { LoginModal } from "../components/LoginModal";
import { RecommendedProducts } from "../components/RecommendedProducts";
import { useRecommendations, trackProduct } from "../hooks/useRecommendations";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { userType, login } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const product = {
    id: id || "1",
    name: "Software de Gestão ERP",
    category: "Tecnologia",
    price: 450000,
    supplier: "TechSolutions Angola",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description:
      "Sistema ERP completo para gestão empresarial, incluindo módulos de contabilidade, RH, vendas, compras e inventário. Ideal para pequenas e médias empresas.",
    features: [
      "Módulo de Contabilidade Integrada",
      "Gestão de Recursos Humanos",
      "Controle de Vendas e CRM",
      "Gestão de Inventário",
      "Relatórios e Dashboard em Tempo Real",
      "Suporte Técnico 24/7",
      "Atualizações Gratuitas",
      "Integração com Bancos",
    ],
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        image: product.image,
      });
    }
    navigate("/carrinho");
  };

  const handleSolicitarFinanciamento = () => {
    if (!userType) {
      setLoginModalOpen(true);
      return;
    }

    // Adiciona ao carrinho antes de ir para o fluxo
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        image: product.image,
      });
    }
    navigate("/pme/fluxo");
  };

  const handleLoginSuccess = (userType: "empresa" | "fornecedor") => {
    login(userType);
    setLoginModalOpen(false);

    // Após login, adiciona ao carrinho e navega para o fluxo
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        image: product.image,
      });
    }
    navigate("/pme/fluxo");
  };

  const similarProducts = useRecommendations(product.id, product.category);

  useEffect(() => {
    trackProduct(product.id, product.category);
  }, [product.id, product.category]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar aos Produtos e Serviços
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Coluna esquerda: foto + descrição + características */}
        <div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-6 border-2 border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-6">
            <h3 className="mb-3">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="mb-4">Características</h3>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna direita: info + ações */}
        <div>
          <div className="text-sm text-coral mb-2 uppercase tracking-wide">{product.category}</div>
          <h1 className="mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {product.rating} ({product.reviews} avaliações)
            </span>
          </div>

          <div className="mb-6">
            <div className="text-2xl text-coral mb-2 font-extrabold">
              {product.price.toLocaleString()} Kz
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              Fornecedor: {product.supplier}
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6 mb-6">
            <h3 className="mb-3">Financiamento Disponível</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>12x de</span>
                <span className="text-foreground font-semibold">{Math.round(product.price / 12).toLocaleString()} Kz/mês</span>
              </div>
              <div className="flex justify-between">
                <span>24x de</span>
                <span className="text-foreground font-semibold">{Math.round(product.price / 24).toLocaleString()} Kz/mês</span>
              </div>
              <div className="flex justify-between">
                <span>36x de</span>
                <span className="text-foreground font-semibold">{Math.round(product.price / 36).toLocaleString()} Kz/mês</span>
              </div>
            </div>
          </div>

          {/* Seleção de Quantidade */}
          <div className="mb-6">
            <label className="block mb-3 text-sm">Quantidade</label>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                className="w-12 h-12 rounded-xl border-2 border-border hover:border-coral flex items-center justify-center transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-12 h-12 rounded-xl border-2 border-border hover:border-coral flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
              <div className="text-muted-foreground">
                Total: <span className="text-coral font-bold">{(product.price * quantity).toLocaleString()} Kz</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <button
              onClick={handleSolicitarFinanciamento}
              className="w-full bg-coral text-white py-4 rounded-xl text-center hover:opacity-90 transition-opacity font-semibold"
            >
              Solicitar Financiamento
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full bg-white border-2 border-coral text-coral py-4 rounded-xl hover:bg-coral hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>

      <RecommendedProducts
        products={similarProducts}
        title="Empresas como a sua também compraram..."
        subtitle="Produtos e serviços relacionados com o que está a ver"
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}
