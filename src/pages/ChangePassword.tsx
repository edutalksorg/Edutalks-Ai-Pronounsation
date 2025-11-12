// src/pages/ChangePassword.tsx

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

// ✅ Default API import (from auth.ts)
import AuthAPI from "@/lib/api/types/auth";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password must match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Include confirmPassword (required by API)
      await AuthAPI.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast({
        title: "✅ Password updated successfully!",
        description: "You can now log in with your new password.",
      });

      // Reset form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const error =
        err?.response?.data?.messages?.[0] ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong.";

      toast({
        title: "❌ Failed to update password",
        description: error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="text-center">
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password securely</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isLoading ? "Saving..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
