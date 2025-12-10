import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { approveKYC } from "./actions";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

async function getUsers() {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return users || [];
}

async function checkAdminAccess() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("=== ADMIN ACCESS CHECK DEBUG ===");
  console.log("User Error:", userError);
  console.log("User:", user);
  console.log("User ID:", user?.id);

  if (!user) {
    console.log("No user found, redirecting to login");
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, id, email, full_name")
    .eq("id", user.id)
    .single();

  console.log("Profile Query Error:", profileError);
  console.log("Profile Data:", profile);
  console.log("Profile Role:", profile?.role);
  console.log("Is Admin?", profile?.role === "admin");

  if (profileError) {
    console.log("Database error fetching profile:", profileError);
    return { allowed: false, role: "error", error: profileError.message };
  }

  if (profile?.role !== "admin") {
    console.log("Access denied - role is:", profile?.role);
    return { allowed: false, role: profile?.role || "unknown" };
  }

  console.log("Access granted - user is admin");
  return { allowed: true, role: profile.role };
}

function getRoleBadge(role: string) {
  if (role === "admin") {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">
        <ShieldCheck className="mr-1 h-3 w-3" />
        Admin
      </Badge>
    );
  }
  return (
    <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300">
      Investor
    </Badge>
  );
}

function getKYCStatusBadge(status: string) {
  if (status === "verified") {
    return (
      <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Geverifieerd
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">
        In behandeling
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30">
      {status || "Onbekend"}
    </Badge>
  );
}

export default async function AdminPage() {
  // Check admin access
  const accessCheck = await checkAdminAccess();

  // If access denied, show debug info instead of redirecting
  if (!accessCheck.allowed) {
    return (
      <div className="space-y-6 p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800">
              Access Denied: Role is <strong>{accessCheck.role}</strong>
            </p>
            {accessCheck.error && (
              <p className="text-red-700 mt-2 text-sm">
                Error: {accessCheck.error}
              </p>
            )}
            <p className="text-slate-600 mt-4 text-sm">
              Check de console logs voor meer debug informatie.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch users
  const users = await getUsers();
  
  console.log("=== FETCHING USERS ===");
  console.log("Users count:", users.length);
  console.log("Users data:", users);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Beheer gebruikers en KYC verificaties
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Totaal Gebruikers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">
              {users.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Geverifieerd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-600">
              {users.filter((u) => u.kyc_status === "verified").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              In behandeling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-yellow-600">
              {users.filter((u) => u.kyc_status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Alle Gebruikers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">Geen gebruikers gevonden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-600">Datum</TableHead>
                    <TableHead className="text-slate-600">Naam</TableHead>
                    <TableHead className="text-slate-600">Email</TableHead>
                    <TableHead className="text-slate-600">Rol</TableHead>
                    <TableHead className="text-slate-600">KYC Status</TableHead>
                    <TableHead className="text-right text-slate-600">
                      Actie
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-slate-900">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString("nl-NL", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "-"}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {user.full_name || "-"}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.email || "-"}
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role || "investor")}</TableCell>
                      <TableCell>
                        {getKYCStatusBadge(user.kyc_status || "pending")}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.kyc_status !== "verified" && (
                          <form action={approveKYC.bind(null, user.id)}>
                            <Button
                              type="submit"
                              size="sm"
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Keur KYC goed
                            </Button>
                          </form>
                        )}
                        {user.kyc_status === "verified" && (
                          <span className="text-xs text-slate-400">
                            Geverifieerd
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

