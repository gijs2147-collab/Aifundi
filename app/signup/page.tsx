"use client";

import { useState } from "react";
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
import { signup } from "@/app/auth/actions";
import { UserPlus, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await signup(formData);

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
            Registreren
          </CardTitle>
          <CardDescription>
            Maak een nieuw Aifundi account aan
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
              <Label htmlFor="full_name" className="text-foreground">
                Volledige Naam *
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Jan de Vries"
                required
                className="bg-white text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                E-mailadres *
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
                Wachtwoord *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-white text-slate-900"
              />
              <p className="text-xs text-muted-foreground">
                Minimaal 6 tekens
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {loading ? "Registreren..." : "Account aanmaken"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Al een account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Log hier in
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

