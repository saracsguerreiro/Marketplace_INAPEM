import { HashRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { NewHome } from "./pages/NewHome";
import { Marketplace } from "./pages/Marketplace";
import { Financing } from "./pages/Financing";
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { SupplierDashboard } from "./pages/SupplierDashboard";
import { ProductDetail } from "./pages/ProductDetail";
import { PMEFluxo } from "./pages/PMEFluxo";
import { Login } from "./pages/Login";
import { EmpresasInfo } from "./pages/EmpresasInfo";
import { FornecedoresInfo } from "./pages/FornecedoresInfo";
import { EmpresaRegisto } from "./pages/EmpresaRegisto";
import { FornecedorRegisto } from "./pages/FornecedorRegisto";
import { Cart } from "./pages/Cart";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<NewHome />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/:id" element={<ProductDetail />} />
              <Route path="carrinho" element={<Cart />} />
              <Route path="financiamento" element={<Financing />} />
              <Route path="pme/fluxo" element={<PMEFluxo />} />
              <Route path="empresas" element={<EmpresasInfo />} />
              <Route path="empresas/registo" element={<EmpresaRegisto />} />
              <Route path="fornecedores" element={<FornecedoresInfo />} />
              <Route path="fornecedores/registo" element={<FornecedorRegisto />} />
              <Route path="empresa/dashboard" element={<CompanyDashboard />} />
              <Route path="fornecedor/dashboard" element={<SupplierDashboard />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}
