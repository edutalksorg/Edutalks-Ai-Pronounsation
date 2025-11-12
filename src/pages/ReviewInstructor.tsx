import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UsersAPI from "@/lib/api/types/users";

interface Instructor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: string;
  status: string;
  rating?: number;
}

export default function ReviewInstructor() {
  const { toast } = useToast();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch instructors
  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      try {
        const data = await UsersAPI.getInstructors();
        setInstructors(data || []);
      } catch (err: any) {
        toast({
          title: "Failed to load instructors",
          description: err?.response?.data?.message || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  // ✅ Approve/Reject handler
  const handleReview = async (id: string, status: "Approved" | "Rejected") => {
    try {
      await UsersAPI.approveInstructor(id, { status });
      toast({
        title: `Instructor ${status}`,
        description: `Instructor has been ${status.toLowerCase()} successfully.`,
      });
      setInstructors((prev) =>
        prev.map((inst) => (inst.id === id ? { ...inst, status } : inst))
      );
    } catch (err: any) {
      toast({
        title: `Failed to ${status.toLowerCase()} instructor`,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading instructors...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Review Instructors</h1>
        <p className="text-muted-foreground">Approve or reject instructor applications</p>
      </div>

      {instructors.length === 0 ? (
        <p className="text-center text-muted-foreground">No instructor applications found.</p>
      ) : (
        <div className="space-y-4">
          {instructors.map((instructor) => (
            <Card key={instructor.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="gradient-hero text-white text-xl">
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{instructor.name}</CardTitle>
                      <CardDescription>{instructor.email}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{instructor.specialization}</Badge>
                        <Badge variant="outline">{instructor.experience}</Badge>
                        <Badge
                          variant={
                            instructor.status === "Approved"
                              ? "default"
                              : instructor.status === "Rejected"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {instructor.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {instructor.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{instructor.rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleReview(instructor.id, "Approved")}
                    className="gradient-success"
                    disabled={instructor.status === "Approved"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReview(instructor.id, "Rejected")}
                    variant="destructive"
                    disabled={instructor.status === "Rejected"}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
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
