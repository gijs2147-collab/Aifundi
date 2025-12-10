"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Loader2 } from "lucide-react";
import { submitOnboarding } from "./actions";

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Identity
  const [formData, setFormData] = useState({
    telefoonnummer: "",
    adres: "",
    postcode: "",
    woonplaats: "",
  });

  // Step 2: Fourthline KYC Mock
  const [kycCheckCompleted, setKycCheckCompleted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 3: Compliance
  const [vermogensherkomst, setVermogensherkomst] = useState("");
  const [verklaringAccepted, setVerklaringAccepted] = useState(false);

  // Validatie
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.telefoonnummer.trim())
      newErrors.telefoonnummer = "Telefoonnummer is verplicht";
    if (!formData.adres.trim()) newErrors.adres = "Adres is verplicht";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is verplicht";
    if (!formData.woonplaats.trim())
      newErrors.woonplaats = "Woonplaats is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!kycCheckCompleted) {
      setErrors({ kyc: "U moet eerst uw identiteit verifiëren" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!vermogensherkomst)
      newErrors.vermogensherkomst = "Selecteer de herkomst van uw vermogen";
    if (!verklaringAccepted)
      newErrors.verklaring = "U moet de verklaring accepteren";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    } else {
      // Hier zou je de data naar de server sturen
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    const result = await submitOnboarding({
      telefoonnummer: formData.telefoonnummer,
      adres: formData.adres,
      postcode: formData.postcode,
      woonplaats: formData.woonplaats,
      vermogensherkomst: vermogensherkomst,
    });

    if (result?.error) {
      setErrors({ submit: result.error });
    }
  };

  const handleStartVerification = async () => {
    setIsVerifying(true);
    setErrors({});

    // Simulate Fourthline connection (3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setKycCheckCompleted(true);
    setIsVerifying(false);
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">

      <Card className="relative w-full max-w-3xl border-primary/20 bg-card/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-6 pb-6">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Onboarding Investeerder
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Stap {currentStep} van {TOTAL_STEPS}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Voortgang</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stap 1: Identity */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Identiteit
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vul uw contactgegevens in.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefoonnummer" className="text-foreground">
                  Telefoonnummer *
                </Label>
                <Input
                  id="telefoonnummer"
                  type="tel"
                  value={formData.telefoonnummer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefoonnummer: e.target.value,
                    })
                  }
                  className={errors.telefoonnummer ? "border-destructive" : ""}
                  placeholder="+31 6 12345678"
                />
                {errors.telefoonnummer && (
                  <p className="text-xs text-destructive">
                    {errors.telefoonnummer}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="adres" className="text-foreground">
                  Adres *
                </Label>
                <Input
                  id="adres"
                  value={formData.adres}
                  onChange={(e) =>
                    setFormData({ ...formData, adres: e.target.value })
                  }
                  className={errors.adres ? "border-destructive" : ""}
                  placeholder="Straatnaam 123"
                />
                {errors.adres && (
                  <p className="text-xs text-destructive">{errors.adres}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postcode" className="text-foreground">
                    Postcode *
                  </Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) =>
                      setFormData({ ...formData, postcode: e.target.value })
                    }
                    className={errors.postcode ? "border-destructive" : ""}
                    placeholder="1234 AB"
                  />
                  {errors.postcode && (
                    <p className="text-xs text-destructive">
                      {errors.postcode}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="woonplaats" className="text-foreground">
                    Woonplaats *
                  </Label>
                  <Input
                    id="woonplaats"
                    value={formData.woonplaats}
                    onChange={(e) =>
                      setFormData({ ...formData, woonplaats: e.target.value })
                    }
                    className={errors.woonplaats ? "border-destructive" : ""}
                    placeholder="Amsterdam"
                  />
                  {errors.woonplaats && (
                    <p className="text-xs text-destructive">
                      {errors.woonplaats}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stap 2: Identificatie (Fourthline Mock) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Identificatie
                </h3>
                <p className="text-sm text-muted-foreground">
                  Verifieer uw identiteit via onze partner Fourthline.
                </p>
              </div>

              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {!kycCheckCompleted && !isVerifying && (
                      <>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center space-y-2">
                          <h4 className="text-lg font-semibold text-foreground">
                            Identiteit Verifiëren
                          </h4>
                          <p className="text-sm text-muted-foreground max-w-md">
                            We gebruiken onze partner Fourthline om uw identiteit
                            veilig te controleren.
                          </p>
                        </div>
                        <Button
                          onClick={handleStartVerification}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          size="lg"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Start Verificatie
                        </Button>
                      </>
                    )}

                    {isVerifying && (
                      <>
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <div className="text-center space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Verbinding maken met Fourthline...
                          </p>
                        </div>
                      </>
                    )}

                    {kycCheckCompleted && !isVerifying && (
                      <>
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                        <div className="text-center space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Identiteit Geverifieerd
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {errors.kyc && (
                <p className="text-xs text-destructive text-center">
                  {errors.kyc}
                </p>
              )}
            </div>
          )}

          {/* Stap 3: Compliance */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Compliance & Verklaring
                </h3>
                <p className="text-sm text-muted-foreground">
                  Voltooi de Wft (Wet op het financieel toezicht) compliance
                  vragen.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vermogensherkomst" className="text-foreground">
                  Herkomst Vermogen *
                </Label>
                <Select
                  value={vermogensherkomst}
                  onValueChange={setVermogensherkomst}
                >
                  <SelectTrigger
                    id="vermogensherkomst"
                    className={errors.vermogensherkomst ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Selecteer een optie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaris">Salaris</SelectItem>
                    <SelectItem value="erfenis">Erfenis</SelectItem>
                    <SelectItem value="onderneming">Onderneming</SelectItem>
                    <SelectItem value="anders">Anders</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vermogensherkomst && (
                  <p className="text-xs text-destructive">
                    {errors.vermogensherkomst}
                  </p>
                )}
              </div>

              <div className="space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="verklaring"
                    checked={verklaringAccepted}
                    onCheckedChange={(checked) =>
                      setVerklaringAccepted(checked === true)
                    }
                    className={errors.verklaring ? "border-destructive" : ""}
                  />
                  <label
                    htmlFor="verklaring"
                    className="text-sm text-foreground leading-relaxed cursor-pointer"
                  >
                    Ik ga akkoord met de voorwaarden *
                  </label>
                </div>
                {errors.verklaring && (
                  <p className="text-xs text-destructive ml-7">
                    {errors.verklaring}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigatie knoppen */}
          <div className="flex justify-between gap-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="text-foreground/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Vorige
            </Button>
            <Button
              onClick={handleNext}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isVerifying}
            >
              {currentStep === TOTAL_STEPS
                ? "Afronden & Indienen"
                : "Volgende"}
              {currentStep < TOTAL_STEPS && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

