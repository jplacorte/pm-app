import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
