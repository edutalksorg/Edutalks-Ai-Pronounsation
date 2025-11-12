import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AdminAPI from "@/lib/api/types/admin";

interface DashboardStats {
  totalUsers: number;
  totalInstructors: number;
  totalCourses: number;
  totalRevenue: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await AdminAPI.getDashboardStats();
        setStats(data);
      } catch (err) {
        toast({ title: "Failed to load dashboard stats", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div className="text-center mt-12">Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-bold">{stats?.totalUsers || 0}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Total Instructors</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-bold">{stats?.totalInstructors || 0}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Total Courses</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-bold">{stats?.totalCourses || 0}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-bold">₹{stats?.totalRevenue?.toLocaleString() || 0}</p></CardContent>
      </Card>
    </div>
  );
}
