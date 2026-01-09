import StoreProvider from "./StoreProvider";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Product Management</title>
      <body className="w-screen h-screen bg-quaternary">
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
