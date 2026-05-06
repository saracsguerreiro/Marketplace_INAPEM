import { createBrowserRouter } from "react-router";
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
import { Layout } from "./components/Layout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: NewHome },
        { path: "marketplace", Component: Marketplace },
        { path: "marketplace/:id", Component: ProductDetail },
        { path: "carrinho", Component: Cart },
        { path: "financiamento", Component: Financing },
        { path: "pme/fluxo", Component: PMEFluxo },
        { path: "empresas", Component: EmpresasInfo },
        { path: "empresas/registo", Component: EmpresaRegisto },
        { path: "fornecedores", Component: FornecedoresInfo },
        { path: "fornecedores/registo", Component: FornecedorRegisto },
        { path: "empresa/dashboard", Component: CompanyDashboard },
        { path: "fornecedor/dashboard", Component: SupplierDashboard },
        { path: "login", Component: Login },
      ],
    },
  ],
  { basename: "/Marketplace_INAPEM" }
);
