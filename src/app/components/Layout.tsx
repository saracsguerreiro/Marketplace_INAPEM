import { Link, Outlet, useLocation } from "react-router";
import { ShoppingCart, LogIn, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import inapemLogo from "../../imports/inapem_MARKETPLACE_w.png";
import inapemLogoFooter from "../../imports/inapem-seeklogo-1.png";
import { LoginModal } from "./LoginModal";
import { FinancingAssistant } from "./FinancingAssistant";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState("PT");
  const { userType, login, logout } = useAuth();
  const { totalItems } = useCart();

  const getNavigation = () => {
    const baseNav = [
      { name: "Produtos e Serviços", path: "/marketplace" },
      { name: "Empresas", path: "/empresas" },
      { name: "Fornecedores", path: "/fornecedores" },
    ];

    if (userType === "empresa") {
      return [...baseNav, { name: "Dashboard", path: "/empresa/dashboard" }];
    } else if (userType === "fornecedor") {
      return [...baseNav, { name: "Dashboard", path: "/fornecedor/dashboard" }];
    } else {
      return baseNav;
    }
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={inapemLogo} alt="INAPEM" className="h-10" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-foreground/10"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-coral"
                        : "hover:text-coral/80"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/carrinho" className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-1 bg-primary-foreground/10 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("PT")}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    language === "PT"
                      ? "bg-coral text-white"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    language === "EN"
                      ? "bg-coral text-white"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  EN
                </button>
              </div>

              {userType ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-foreground rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </button>
              )}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-foreground/20"
                        : "hover:bg-primary-foreground/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 px-4 py-3">
                <Link
                  to="/carrinho"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors relative flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mx-auto" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-1/3 bg-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {userType ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-foreground rounded-lg hover:bg-gray-300 transition-colors flex-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setLoginModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:opacity-90 transition-opacity flex-1"
                  >
                    <LogIn className="w-4 h-4" />
                    Entrar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-secondary text-secondary-foreground mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={inapemLogoFooter} alt="INAPEM" className="h-8" />
              </div>
              <p className="text-muted-foreground">
                Marketplace e soluções de financiamento para PMEs
              </p>
            </div>
            <div>
              <h4 className="mb-4">Links Rápidos</h4>
              <div className="space-y-2">
                <Link to="/marketplace" className="block text-muted-foreground hover:text-foreground">
                  Marketplace
                </Link>
                <Link to="/financiamento" className="block text-muted-foreground hover:text-foreground">
                  Financiamento
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Contato</h4>
              <p className="text-muted-foreground">suporte@inapem.pt</p>
              <p className="text-muted-foreground">+351 21 000 0000</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            © 2026 Marketplace INAPEM. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={login}
      />
      <FinancingAssistant />
    </div>
  );
}
