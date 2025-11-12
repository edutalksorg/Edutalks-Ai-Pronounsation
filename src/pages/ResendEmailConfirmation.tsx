// src/pages/ResendEmailConfirmation.tsx
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
import { useToast } from "@/hooks/use-toast";
import AuthAPI from "@/lib/api/types/auth";

export default function ResendEmailConfirmation() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Correct API function name + correct payload type
      await AuthAPI.resendConfirmationEmail({ email });

      toast({
        title: "Confirmation email sent",
        description: "Check your inbox",
      });
    } catch (err: any) {
      toast({
        title: "Failed",
        description:
          err?.response?.data?.messages?.[0] ||
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Resend Confirmation Email</CardTitle>
          <CardDescription>Enter your email to resend confirmation</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-hero"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Resend Confirmation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
