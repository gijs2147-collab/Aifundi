"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp, Euro, PieChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// Mock data: Investeringswaarde over tijd (laatste 12 maanden)
const investeringsData = [
  { maand: "Jan 2024", waarde: 95000 },
  { maand: "Feb 2024", waarde: 96500 },
  { maand: "Mrt 2024", waarde: 98000 },
  { maand: "Apr 2024", waarde: 99500 },
  { maand: "Mei 2024", waarde: 101000 },
  { maand: "Jun 2024", waarde: 102500 },
  { maand: "Jul 2024", waarde: 104000 },
  { maand: "Aug 2024", waarde: 105500 },
  { maand: "Sep 2024", waarde: 107000 },
  { maand: "Okt 2024", waarde: 108500 },
  { maand: "Nov 2024", waarde: 110000 },
  { maand: "Dec 2024", waarde: 111500 },
];

const chartConfig = {
  waarde: {
    label: "Investeringswaarde",
    color: "hsl(var(--chart-1))",
  },
};

// Mock data: Fonds allocatie
const fondsAllocatie = {
  fondsNaam: "Fonds 1",
  totaalGeïnvesteerd: 111500,
  huidigeWaarde: 111500,
  rendement: 5.0,
  rendementBedrag: 5500,
  startDatum: "1 januari 2024",
};

export default function InvesteringenPage() {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Mijn Investeringen
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Overzicht van uw investeringsportefeuille en prestaties
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Totaal Geïnvesteerd
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-foreground">
              {formatCurrency(fondsAllocatie.totaalGeïnvesteerd)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In {fondsAllocatie.fondsNaam}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Huidige Waarde
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-foreground">
              {formatCurrency(fondsAllocatie.huidigeWaarde)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Inclusief rendement
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Totaal Rendement
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-600">
              +{fondsAllocatie.rendement}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(fondsAllocatie.rendementBedrag)} winst
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fonds Allocatie Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Fonds Allocatie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {fondsAllocatie.fondsNaam}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Gestart op {fondsAllocatie.startDatum}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(fondsAllocatie.huidigeWaarde)}
                </p>
                <p className="text-sm text-green-600">
                  +{fondsAllocatie.rendement}% rendement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waarde Over Tijd Grafiek */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Investeringswaarde Over Tijd
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Ontwikkeling van uw investeringswaarde in de afgelopen 12 maanden
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={investeringsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="maand"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border bg-card p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-muted-foreground">
                                {payload[0].payload.maand}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                {formatCurrency(payload[0].value as number)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="waarde"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

