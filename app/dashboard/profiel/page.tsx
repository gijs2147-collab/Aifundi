"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Bell, Save } from "lucide-react";

// Mock data: Huidige gebruiker gegevens
const initialPersoonsgegevens = {
  voornaam: "Jan",
  achternaam: "de Vries",
  email: "jan@example.com",
  telefoonnummer: "+31 6 12345678",
  adres: "Straatnaam 123",
  postcode: "1234 AB",
  plaats: "Amsterdam",
  land: "Nederland",
};

const initialEmailVoorkeuren = {
  kwartaalRapporten: true,
  marktUpdates: true,
  fondsNieuws: false,
  transactieNotificaties: true,
  marketingEmails: false,
};

export default function ProfielPage() {
  const [persoonsgegevens, setPersoonsgegevens] = useState(initialPersoonsgegevens);
  const [emailVoorkeuren, setEmailVoorkeuren] = useState(initialEmailVoorkeuren);
  const [isSaving, setIsSaving] = useState(false);

  const handlePersoonsgegevensChange = (field: string, value: string) => {
    setPersoonsgegevens((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailVoorkeurChange = (key: string, checked: boolean) => {
    setEmailVoorkeuren((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Server-side opslag via Supabase
    setTimeout(() => {
      setIsSaving(false);
      // Hier zou je een success toast kunnen tonen
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Profiel</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Beheer uw persoonlijke gegevens en communicatievoorkeuren
        </p>
      </div>

      {/* Persoonsgegevens */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Persoonsgegevens
              </CardTitle>
              <CardDescription>
                Uw persoonlijke informatie en contactgegevens
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="voornaam" className="text-foreground">
                Voornaam
              </Label>
              <Input
                id="voornaam"
                value={persoonsgegevens.voornaam}
                onChange={(e) =>
                  handlePersoonsgegevensChange("voornaam", e.target.value)
                }
                className="bg-card text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achternaam" className="text-foreground">
                Achternaam
              </Label>
              <Input
                id="achternaam"
                value={persoonsgegevens.achternaam}
                onChange={(e) =>
                  handlePersoonsgegevensChange("achternaam", e.target.value)
                }
                className="bg-card text-foreground"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mailadres
            </Label>
            <Input
              id="email"
              type="email"
              value={persoonsgegevens.email}
              onChange={(e) =>
                handlePersoonsgegevensChange("email", e.target.value)
              }
              className="bg-card text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefoonnummer" className="text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefoonnummer
            </Label>
            <Input
              id="telefoonnummer"
              type="tel"
              value={persoonsgegevens.telefoonnummer}
              onChange={(e) =>
                handlePersoonsgegevensChange("telefoonnummer", e.target.value)
              }
              className="bg-card text-foreground"
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="adres" className="text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adres
            </Label>
            <Input
              id="adres"
              value={persoonsgegevens.adres}
              onChange={(e) =>
                handlePersoonsgegevensChange("adres", e.target.value)
              }
              className="bg-card text-foreground"
              placeholder="Straatnaam en huisnummer"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="postcode" className="text-foreground">
                Postcode
              </Label>
              <Input
                id="postcode"
                value={persoonsgegevens.postcode}
                onChange={(e) =>
                  handlePersoonsgegevensChange("postcode", e.target.value)
                }
                className="bg-card text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plaats" className="text-foreground">
                Plaats
              </Label>
              <Input
                id="plaats"
                value={persoonsgegevens.plaats}
                onChange={(e) =>
                  handlePersoonsgegevensChange("plaats", e.target.value)
                }
                className="bg-card text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="land" className="text-foreground">
                Land
              </Label>
              <Input
                id="land"
                value={persoonsgegevens.land}
                onChange={(e) =>
                  handlePersoonsgegevensChange("land", e.target.value)
                }
                className="bg-card text-foreground"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Opslaan..." : "Wijzigingen opslaan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Voorkeuren */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                E-mail Voorkeuren
              </CardTitle>
              <CardDescription>
                Beheer welke e-mails u wilt ontvangen
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="space-y-0.5">
                <Label htmlFor="kwartaalRapporten" className="text-base font-medium text-foreground cursor-pointer">
                  Kwartaalrapporten
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ontvang automatisch kwartaalrapporten van het fonds
                </p>
              </div>
              <Switch
                id="kwartaalRapporten"
                checked={emailVoorkeuren.kwartaalRapporten}
                onCheckedChange={(checked) =>
                  handleEmailVoorkeurChange("kwartaalRapporten", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="space-y-0.5">
                <Label htmlFor="marktUpdates" className="text-base font-medium text-foreground cursor-pointer">
                  Marktupdates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Wekelijkse updates over marktontwikkelingen
                </p>
              </div>
              <Switch
                id="marktUpdates"
                checked={emailVoorkeuren.marktUpdates}
                onCheckedChange={(checked) =>
                  handleEmailVoorkeurChange("marktUpdates", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="space-y-0.5">
                <Label htmlFor="fondsNieuws" className="text-base font-medium text-foreground cursor-pointer">
                  Fondsnieuws
                </Label>
                <p className="text-sm text-muted-foreground">
                  Nieuws en updates over fondsactiviteiten
                </p>
              </div>
              <Switch
                id="fondsNieuws"
                checked={emailVoorkeuren.fondsNieuws}
                onCheckedChange={(checked) =>
                  handleEmailVoorkeurChange("fondsNieuws", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="space-y-0.5">
                <Label htmlFor="transactieNotificaties" className="text-base font-medium text-foreground cursor-pointer">
                  Transactienotificaties
                </Label>
                <p className="text-sm text-muted-foreground">
                  E-mailmeldingen bij belangrijke transacties
                </p>
              </div>
              <Switch
                id="transactieNotificaties"
                checked={emailVoorkeuren.transactieNotificaties}
                onCheckedChange={(checked) =>
                  handleEmailVoorkeurChange("transactieNotificaties", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails" className="text-base font-medium text-foreground cursor-pointer">
                  Marketing e-mails
                </Label>
                <p className="text-sm text-muted-foreground">
                  Nieuwsbrieven en promotionele content
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={emailVoorkeuren.marketingEmails}
                onCheckedChange={(checked) =>
                  handleEmailVoorkeurChange("marketingEmails", checked)
                }
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Opslaan..." : "Voorkeuren opslaan"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

