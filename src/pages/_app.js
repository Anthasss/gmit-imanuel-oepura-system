import AdminLayout from "@/components/layout/AdminLayout";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import Footer from "@/components/layout/footer";
import JemaatLayout from "@/components/layout/JemaatLayout";
import MajelisLayout from "@/components/layout/MajelisLayout";
import Navigation from "@/components/layout/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps, router }) {
  const pathname = router.pathname;

  // Check if current route is role-based page
  const isAdminPage = pathname.startsWith("/admin");
  const isJemaatPage = pathname.startsWith("/jemaat");
  const isMajelisPage = pathname.startsWith("/majelis");
  const isEmployeePage = pathname.startsWith("/employee");
  const isOnboardingPage = pathname === "/onboarding";

  // If the component has a custom layout, use it
  if (Component.getLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {Component.getLayout(<Component {...pageProps} />)}
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  // For role-based pages, render with appropriate layout
  if (isAdminPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AdminLayout>
            <Toaster richColors position="top-right" />

            <Component {...pageProps} />
          </AdminLayout>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  if (isJemaatPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <JemaatLayout>
            <Toaster richColors position="top-right" />

            <Component {...pageProps} />
          </JemaatLayout>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  if (isMajelisPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MajelisLayout>
            <Toaster richColors position="top-right" />

            <Component {...pageProps} />
          </MajelisLayout>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  if (isEmployeePage) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <EmployeeLayout>
            <Toaster richColors position="top-right" />

            <Component {...pageProps} />
          </EmployeeLayout>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  // For onboarding page, render without navigation and footer
  if (isOnboardingPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          <Component {...pageProps} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  // For other pages (public pages), render with default layout
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation>
          <Toaster richColors position="top-right" />

          <Component {...pageProps} />
          <Footer />
        </Navigation>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
