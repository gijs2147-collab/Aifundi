import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Calendar } from "lucide-react";

// Mock data: Kwartaalrapporten
const kwartaalRapporten = [
  {
    id: 1,
    naam: "Q4 2024 Kwartaalrapport",
    periode: "Q4 2024",
    datum: "15 januari 2025",
    type: "Kwartaalrapport",
    status: "Beschikbaar",
    bestandsgrootte: "2.4 MB",
  },
  {
    id: 2,
    naam: "Q3 2024 Kwartaalrapport",
    periode: "Q3 2024",
    datum: "15 oktober 2024",
    type: "Kwartaalrapport",
    status: "Beschikbaar",
    bestandsgrootte: "2.1 MB",
  },
  {
    id: 3,
    naam: "Q2 2024 Kwartaalrapport",
    periode: "Q2 2024",
    datum: "15 juli 2024",
    type: "Kwartaalrapport",
    status: "Beschikbaar",
    bestandsgrootte: "1.9 MB",
  },
  {
    id: 4,
    naam: "Q1 2024 Kwartaalrapport",
    periode: "Q1 2024",
    datum: "15 april 2024",
    type: "Kwartaalrapport",
    status: "Beschikbaar",
    bestandsgrootte: "2.0 MB",
  },
  {
    id: 5,
    naam: "Q4 2023 Kwartaalrapport",
    periode: "Q4 2023",
    datum: "15 januari 2024",
    type: "Kwartaalrapport",
    status: "Beschikbaar",
    bestandsgrootte: "1.8 MB",
  },
  {
    id: 6,
    naam: "Q3 2023 Kwartaalrapport",
    periode: "Q3 2023",
    datum: "15 oktober 2023",
    type: "Kwartaalrapport",
    status: "Beschikbaar",
    bestandsgrootte: "1.7 MB",
  },
];

export default function DocumentenPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Documenten
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Toegang tot uw persoonlijke documenten en fondsrapporten
        </p>
      </div>

      {/* Kwartaalrapporten Sectie */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Kwartaalrapporten
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Periodieke rapportages over de prestaties van het fonds
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Laatste update: {kwartaalRapporten[0].datum}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {kwartaalRapporten.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Nog geen documenten beschikbaar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground">Document</TableHead>
                    <TableHead className="text-muted-foreground">Periode</TableHead>
                    <TableHead className="text-muted-foreground">Datum</TableHead>
                    <TableHead className="text-muted-foreground">Grootte</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right text-muted-foreground">
                      Actie
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kwartaalRapporten.map((rapport) => (
                    <TableRow key={rapport.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {rapport.naam}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {rapport.type}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {rapport.periode}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {rapport.datum}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {rapport.bestandsgrootte}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {rapport.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">
                Over documenten
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Alle documenten zijn versleuteld en alleen toegankelijk voor
                geautoriseerde investeerders. Kwartaalrapporten worden
                automatisch toegevoegd na elke rapportageperiode.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

