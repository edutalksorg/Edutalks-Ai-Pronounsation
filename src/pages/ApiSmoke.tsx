import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, XCircle, Loader2 } from "lucide-react";
import axiosClient from "@/lib/api/types/axiosClient";

type ApiHealth = "unknown" | "healthy" | "degraded" | "down";

interface ApiStatus {
  name: string;
  endpoint: string;
  status: ApiHealth;
  message?: string;
}

export default function ApiSmoke() {
  const [apiEndpoints, setApiEndpoints] = useState<ApiStatus[]>([
    { name: "Authentication API", endpoint: "/auth/login", status: "unknown" },
    { name: "User Management API", endpoint: "/users/profile", status: "unknown" },
    { name: "Topics API", endpoint: "/topics", status: "unknown" },
    { name: "Quizzes API", endpoint: "/quizzes", status: "unknown" },
    { name: "Payments API", endpoint: "/payments/history", status: "unknown" },
    { name: "Wallet API", endpoint: "/wallet/balance", status: "unknown" },
  ]);

  const [testing, setTesting] = useState<string | null>(null);
  const [autoTesting, setAutoTesting] = useState(false);

  // Auto-test on mount
  useEffect(() => {
    const runInitialTests = async () => {
      setAutoTesting(true);
      for (const api of apiEndpoints) {
        await testEndpoint(api.endpoint, true);
      }
      setAutoTesting(false);
    };
    runInitialTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const testEndpoint = async (endpoint: string, isAuto = false) => {
    if (!isAuto) setTesting(endpoint);
    try {
      const response = await axiosClient.get(endpoint);
      const updated: ApiStatus[] = apiEndpoints.map((api) =>
        api.endpoint === endpoint
          ? {
              ...api,
              status: response.status === 200 ? "healthy" : "degraded",
              message: response.statusText || "OK",
            }
          : api
      );
      setApiEndpoints(updated);
    } catch (error: any) {
      const updated: ApiStatus[] = apiEndpoints.map((api) =>
        api.endpoint === endpoint
          ? {
              ...api,
              status: "down",
              message:
                error?.response?.data?.message || "No response from server",
            }
          : api
      );
      setApiEndpoints(updated);
    } finally {
      if (!isAuto) setTesting(null);
    }
  };

  const summary = useMemo(() => {
    const total = apiEndpoints.length;
    const healthy = apiEndpoints.filter((a) => a.status === "healthy").length;
    const degraded = apiEndpoints.filter((a) => a.status === "degraded").length;
    const down = apiEndpoints.filter((a) => a.status === "down").length;
    return { healthy, degraded, down, total };
  }, [apiEndpoints]);

  const getStatusBadge = (status: ApiHealth) => {
    switch (status) {
      case "healthy":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Healthy
          </Badge>
        );
      case "degraded":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Activity className="h-3 w-3 mr-1" /> Degraded
          </Badge>
        );
      case "down":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Down
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Activity className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">API Health Monitor</h1>
          <p className="text-muted-foreground">
            Automatically checks backend API connectivity
          </p>
        </div>
        <Button
          onClick={() => {
            setApiEndpoints((prev) =>
              prev.map((api) => ({ ...api, status: "unknown" }))
            );
            for (const api of apiEndpoints) testEndpoint(api.endpoint, true);
          }}
          disabled={autoTesting}
          variant="outline"
        >
          {autoTesting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Auto Testing...
            </>
          ) : (
            "Re-Test All"
          )}
        </Button>
      </div>

      {/* 🌈 Summary Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1 font-medium">
          <span>Total APIs: {summary.total}</span>
          <span>
            ✅ {summary.healthy} Healthy | ⚠️ {summary.degraded} Degraded | ❌{" "}
            {summary.down} Down
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-3 bg-green-500 inline-block"
            style={{
              width: `${(summary.healthy / summary.total) * 100}%`,
            }}
          ></div>
          <div
            className="h-3 bg-yellow-400 inline-block"
            style={{
              width: `${(summary.degraded / summary.total) * 100}%`,
            }}
          ></div>
          <div
            className="h-3 bg-red-500 inline-block"
            style={{
              width: `${(summary.down / summary.total) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* API Cards */}
      <div className="grid gap-4">
        {apiEndpoints.map((api) => (
          <Card key={api.endpoint}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{api.name}</CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {api.endpoint}
                  </CardDescription>
                </div>
                {getStatusBadge(api.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => testEndpoint(api.endpoint)}
                  disabled={testing === api.endpoint || autoTesting}
                  variant="outline"
                  size="sm"
                >
                  {testing === api.endpoint ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Run Test"
                  )}
                </Button>
                <div className="text-sm text-muted-foreground truncate max-w-sm">
                  {api.message || "Waiting..."}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
