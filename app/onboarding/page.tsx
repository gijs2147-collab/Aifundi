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
import { UploadCloud, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Persoonsgegevens
  const [formData, setFormData] = useState({
    voornaam: "",
    achternaam: "",
    telefoonnummer: "",
    adres: "",
  });

  // Step 2: Document upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Step 3: Compliance
  const [vermogensherkomst, setVermogensherkomst] = useState("");
  const [verklaringAccepted, setVerklaringAccepted] = useState(false);

  // Validatie
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.voornaam.trim()) newErrors.voornaam = "Voornaam is verplicht";
    if (!formData.achternaam.trim())
      newErrors.achternaam = "Achternaam is verplicht";
    if (!formData.telefoonnummer.trim())
      newErrors.telefoonnummer = "Telefoonnummer is verplicht";
    if (!formData.adres.trim()) newErrors.adres = "Adres is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!selectedFile) {
      setErrors({ document: "Upload een paspoort document" });
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

  const handleSubmit = () => {
    // TODO: Server-side validatie en opslag via Supabase
    console.log("Submitting:", {
      formData,
      selectedFile,
      vermogensherkomst,
      verklaringAccepted,
    });
    // Voor nu: redirect naar home
    router.push("/");
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      setSelectedFile(file);
      setErrors({});
    } else {
      setErrors({ document: "Alleen afbeeldingen en PDF's zijn toegestaan" });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
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
          {/* Stap 1: Persoonsgegevens */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Persoonsgegevens
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vul uw persoonlijke gegevens in voor de KYC verificatie.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="voornaam" className="text-foreground">
                    Voornaam *
                  </Label>
                  <Input
                    id="voornaam"
                    value={formData.voornaam}
                    onChange={(e) =>
                      setFormData({ ...formData, voornaam: e.target.value })
                    }
                    className={errors.voornaam ? "border-destructive" : ""}
                    placeholder="Jan"
                  />
                  {errors.voornaam && (
                    <p className="text-xs text-destructive">
                      {errors.voornaam}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achternaam" className="text-foreground">
                    Achternaam *
                  </Label>
                  <Input
                    id="achternaam"
                    value={formData.achternaam}
                    onChange={(e) =>
                      setFormData({ ...formData, achternaam: e.target.value })
                    }
                    className={errors.achternaam ? "border-destructive" : ""}
                    placeholder="Jansen"
                  />
                  {errors.achternaam && (
                    <p className="text-xs text-destructive">
                      {errors.achternaam}
                    </p>
                  )}
                </div>
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
                  placeholder="Straatnaam 123, 1234 AB Amsterdam"
                />
                {errors.adres && (
                  <p className="text-xs text-destructive">{errors.adres}</p>
                )}
              </div>
            </div>
          )}

          {/* Stap 2: KYC Documentatie */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  KYC Documentatie
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload een scan of foto van uw paspoort voor verificatie.
                </p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileInput}
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer space-y-4"
                >
                  {selectedFile ? (
                    <>
                      <CheckCircle2 className="h-12 w-12 text-primary" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Klik om een ander bestand te selecteren
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-12 w-12 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          Sleep uw paspoort hierheen
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          of klik om te bladeren
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          PNG, JPG, PDF (max. 10MB)
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {errors.document && (
                <p className="text-xs text-destructive text-center">
                  {errors.document}
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
                  Wat is de herkomst van uw vermogen? *
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
                    Ik verklaar dat ik investeer voor eigen rekening en risico
                    (Execution Only). *
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

