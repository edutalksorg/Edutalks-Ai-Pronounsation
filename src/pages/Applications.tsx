import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdminAPI from "@/lib/api/types/admin";
import { CheckCircle, XCircle } from "lucide-react";

interface Application {
  id: string;
  name: string;
  type: string;
  email: string;
  date: string;
  status: string;
}

export default function Applications() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await AdminAPI.getApplications({ page: 1, pageSize: 10 });
      const arr = (data?.data ?? data) as any[];
      // normalize to { id, name, type, email, date, status }
      const normalized = (arr || []).map((x: any) => ({
        id: x.id || x.applicationId || x._id,
        name: x.name || x.fullName || x.applicantName,
        type: x.type || x.applicationType || "Instructor",
        email: x.email || x.applicantEmail,
        date: x.date || x.createdAt,
        status: x.status,
      }));
      setApplications(normalized);
    } catch {
      toast({ title: "Failed to load applications", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, status: "Approved" | "Rejected") => {
    try {
      await AdminAPI.approveApplication(id, { status });
      toast({ title: `Application ${status}` });
      fetchApplications();
    } catch {
      toast({ title: "Error updating application", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center mt-12">Loading applications...</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold mb-2">Applications</h1>
      <p className="text-muted-foreground mb-6">
        Review instructor and course applications.
      </p>

      {applications.length === 0 ? (
        <p className="text-center text-muted-foreground">No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <CardTitle>{app.name}</CardTitle>
                <CardDescription>{app.email}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{app.type}</Badge>
                  <Badge variant="outline">{app.date}</Badge>
                  <Badge
                    variant={
                      app.status === "Approved"
                        ? "default"
                        : app.status === "Rejected"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(app.id, "Approved")}
                    disabled={app.status === "Approved"}
                    className="gradient-success"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Approve
                  </Button>
                  <Button
                    onClick={() => handleApprove(app.id, "Rejected")}
                    disabled={app.status === "Rejected"}
                    variant="destructive"
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
