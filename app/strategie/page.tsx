import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  PieChart,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const strategyPillars = [
  {
    icon: Cpu,
    title: "Gedreven door Automatisering",
    description:
      "Onze technologie automatiseert het volledige kredietproces. Dit zorgt voor extreem lage operationele kosten vergeleken met traditionele partijen.",
  },
  {
    icon: ShieldCheck,
    title: "Consumptief Krediet",
    description:
      "Een stabiele toevoeging aan uw beleggingsportefeuille. Wij focussen op spreiding en beheersbare risico's binnen de consumentenmarkt.",
  },
  {
    icon: Users,
    title: "Schaal via Tussenpersonen",
    description:
      "Door samen te werken met vertrouwde intermediairs kunnen we efficiënt en op grote schaal kapitaal in de markt zetten.",
  },
];

export default function StrategiePage() {
  return (
    <main className="relative min-h-screen">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Aifundi Capital
            </p>
            <p className="text-base text-foreground">
              investeer in consumptief krediet
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="text-sm text-foreground/80" asChild>
              <Link href="/login">Inloggen</Link>
            </Button>
            <Button variant="ghost" className="text-sm text-foreground/80" asChild>
              <Link href="/signup">Registreren</Link>
            </Button>
            <Button variant="ghost" className="text-sm text-foreground/80" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Rendement door Technologie en Schaal
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Door overhead te elimineren, maximaliseren we het rendement voor de
            belegger.
          </p>
        </section>

        {/* 3-Koloms Grid voor Pijlers */}
        <section className="grid gap-8 md:grid-cols-3">
          {strategyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="border-border bg-card transition-shadow hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* CTA Sectie */}
        <section className="rounded-xl border-2 border-primary/20 bg-card/50 p-8 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Stap nu in AIFUNDI Fonds I
              </h2>
              <p className="text-lg text-muted-foreground">
                De inschrijving voor ons eerste closed-end fonds (€25 mln) is nu
                geopend.
              </p>
            </div>
            <div className="pt-4">
              <Button size="lg" className="px-8" asChild>
                <Link href="/signup">
                  Meld je aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

