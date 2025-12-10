import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aifundi Capital | Investeer in consumptief krediet",
  description:
    "Modern fintech platform voor investeringen in consumptief krediet vanaf €100k. Veilig, transparant en volledig begeleid onboarding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
