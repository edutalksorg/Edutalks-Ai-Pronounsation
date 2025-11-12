// src/pages/ReferralSettings.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Settings, DollarSign, Users } from "lucide-react";
import AdminReferralsAPI from "@/lib/api/adminReferrals";

interface ReferralSettings {
  rewardPerReferral: number;
  minWithdrawalAmount: number;
  requireAdminApproval: boolean;
  allowCourseRedemption: boolean;
  totalReferrals?: number;
  totalPaid?: number;
  pendingAmount?: number;
}

export default function ReferralSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ReferralSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch referral settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await AdminReferralsAPI.getReferralSettings();
        setSettings({
          rewardPerReferral: data?.rewardPerReferral ?? 0,
          minWithdrawalAmount: data?.minWithdrawalAmount ?? 0,
          requireAdminApproval: data?.requireAdminApproval ?? false,
          allowCourseRedemption: data?.allowCourseRedemption ?? false,
          totalReferrals: data?.totalReferrals ?? 0,
          totalPaid: data?.totalPaid ?? 0,
          pendingAmount: data?.pendingAmount ?? 0,
        });
      } catch (err: any) {
        console.error("❌ Failed to fetch referral settings:", err);
        toast({
          title: "Failed to load referral settings",
          description: err?.response?.data?.messages?.[0] || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  // ✅ Handle save/update
  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await AdminReferralsAPI.updateReferralSettings({
        rewardPerReferral: settings.rewardPerReferral,
        minWithdrawalAmount: settings.minWithdrawalAmount,
        requireAdminApproval: settings.requireAdminApproval,
        allowCourseRedemption: settings.allowCourseRedemption,
      });
      toast({
        title: "Settings saved",
        description: "Referral settings updated successfully.",
      });
    } catch (err: any) {
      console.error("❌ Failed to update settings:", err);
      toast({
        title: "Failed to save settings",
        description: err?.response?.data?.messages?.[0] || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading referral settings...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Referral Settings</h1>
        <p className="text-muted-foreground">Configure your referral program preferences</p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* Cashback Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cashback Configuration
            </CardTitle>
            <CardDescription>Set referral reward amounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reward">Reward per Referral ($)</Label>
              <Input
                id="reward"
                type="number"
                value={settings.rewardPerReferral}
                onChange={(e) =>
                  setSettings({ ...settings, rewardPerReferral: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minWithdraw">Minimum Withdrawal Amount ($)</Label>
              <Input
                id="minWithdraw"
                type="number"
                value={settings.minWithdrawalAmount}
                onChange={(e) =>
                  setSettings({ ...settings, minWithdrawalAmount: Number(e.target.value) })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Withdrawal Settings
            </CardTitle>
            <CardDescription>Control withdrawal permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Admin Approval</Label>
                <p className="text-sm text-muted-foreground">
                  Users must get approval before withdrawing
                </p>
              </div>
              <Switch
                checked={settings.requireAdminApproval}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireAdminApproval: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Course Redemption</Label>
                <p className="text-sm text-muted-foreground">
                  Users can use wallet balance for courses
                </p>
              </div>
              <Switch
                checked={settings.allowCourseRedemption}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowCourseRedemption: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Referral Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Referral Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                  {settings.totalReferrals ?? 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Total Referrals</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold gradient-success bg-clip-text text-transparent">
                  ${settings.totalPaid?.toLocaleString() ?? 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Total Paid Out</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold text-primary">
                  ${settings.pendingAmount?.toLocaleString() ?? 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="gradient-hero" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
