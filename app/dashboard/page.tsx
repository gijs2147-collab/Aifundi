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
import { createClient } from "@/lib/supabase/server";

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

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string | null;
  [key: string]: any;
};

async function getRecentUsers() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent users:", error);
    return [];
  }

  return (data as Profile[]) || [];
}

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user profile
  let userName = "Gebruiker";
  let kycCompleted = false;
  
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, kyc_status")
      .eq("id", user.id)
      .single();

    if (profile) {
      userName = profile.full_name || "Gebruiker";
      kycCompleted = profile.kyc_status === "verified";
    }
  }

  // Get recent users
  const recentUsers = await getRecentUsers();

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

      {/* Recent Users Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Recente Gebruikers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentUsers.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Nog geen gebruikers
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Nieuwe gebruikers verschijnen hier
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">Naam</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Registratiedatum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-foreground font-medium">
                      {user.full_name || "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email || "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString("nl-NL", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
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

