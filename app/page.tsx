import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  LineChart,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    icon: ShieldCheck,
    title: "Strakke governance",
    description: "KYC, KYB en server-side validatie via Supabase.",
  },
  {
    icon: Lock,
    title: "Bank-grade security",
    description: "Versleutelde dataflows en granular access control.",
  },
  {
    icon: LineChart,
    title: "Institutionele focus",
    description: "Instappen vanaf €100k met transparante rapportages.",
  },
];

const stats = [
  { label: "Minimum ticket", value: "€100.000" },
  { label: "Target IRR", value: "10–14%" },
  { label: "Sectorfocus", value: "consumptief krediet" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:py-16">
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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" className="bg-primary/10 text-primary">
              Contact team
            </Button>
          </div>
        </header>

        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Private onboarding vanaf €100.000
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Investeer in consumptief krediet
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Een modern fintech investeringsplatform met institutionele
                governance. Volledige onboarding, rapportage en risicobeheer
                vanuit één veilige omgeving.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="px-6" asChild>
                <Link href="/onboarding">
                  Start Onboarding
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 bg-secondary/60 text-primary hover:bg-secondary/80"
                asChild
              >
                <Link href="/strategie">
                  Bekijk strategie
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Server-side validatie, gegevensopslag en verificatie via Supabase
              voor maximale zekerheid en compliance.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-primary/10 bg-secondary/60 backdrop-blur"
                >
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-primary/10 bg-secondary/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Fonds snapshot
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gericht op consumptief krediet met bewezen cashflows en
                aantoonbare groeiambitie.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-primary/10 bg-background/40 px-4 py-3"
                  >
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-primary/15 bg-background/50 p-4 text-sm text-muted-foreground">
                Wij combineren menselijke expertise met automatisering. Alle
                data wordt server-side gevalideerd; gevoelige informatie verlaat
                de browser niet zonder versleuteling.
              </div>
              <div className="flex items-center justify-between rounded-xl border border-primary/15 bg-background/40 px-4 py-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Due diligence venster</p>
                  <p className="text-foreground">10 werkdagen</p>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Lock className="h-4 w-4" />
                  Versleutelde document flow
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
