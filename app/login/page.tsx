"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from "@/app/auth/actions";
import { LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Als er geen error is, wordt er automatisch geredirect naar /dashboard
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">

      <Card className="relative w-full max-w-md border-primary/20 bg-card/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-foreground">
            Inloggen
          </CardTitle>
          <CardDescription>
            Log in op uw Aifundi account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                E-mailadres
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jan@example.com"
                required
                className="bg-white text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Wachtwoord
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white text-slate-900"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Inloggen..." : "Inloggen"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Nog geen account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Registreer hier
              </Link>
            </p>
            <Link
              href="/"
              className="block mt-4 hover:text-foreground underline"
            >
              Terug naar homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
