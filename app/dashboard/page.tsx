import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  FileText,
  AlertTriangle,
  ArrowRight,
  Euro,
  FolderOpen,
  Percent,
} from "lucide-react";
import Link from "next/link";

// Mock data
const stats = [
  {
    label: "Totaal Geïnvesteerd",
    value: "€0,00",
    icon: Euro,
    description: "Totaal investeringsbedrag",
  },
  {
    label: "Lopende Projecten",
    value: "0",
    icon: FolderOpen,
    description: "Actieve investeringen",
  },
  {
    label: "Gemiddeld Rendement",
    value: "5%",
    icon: Percent,
    description: "Historisch gemiddelde",
  },
];

type Activity = {
  date: string;
  type: string;
  amount: string;
  status: string;
};

const recentActivity: Activity[] = [
  // Leeg voor nu - kan later worden gevuld met mock data
];

export default function DashboardPage() {
  const userName = "Jan de Vries";
  const kycCompleted = false; // Mock: KYC nog niet afgerond

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Welkom terug, {userName}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Hier is een overzicht van uw investeringsportefeuille
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Required Section */}
      {!kycCompleted && (
        <Alert className="border-primary/20 bg-primary/10">
          <AlertTriangle className="h-4 w-4 text-primary" />
          <div>
            <AlertTitle className="text-foreground">Verificatie vereist</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Uw KYC verificatie is nog niet afgerond. Voltooi de verificatie om
              te kunnen investeren.
            </AlertDescription>
            <div className="mt-4">
              <Button
                asChild
              >
                <Link href="/onboarding">
                  Rond verificatie af
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Alert>
      )}

      {/* Recent Activity Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Recente Activiteit
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Nog geen activiteit
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Uw investeringsactiviteit verschijnt hier
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">Datum</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Bedrag</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-foreground">
                      {activity.date}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {activity.type}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {activity.amount}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {activity.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

