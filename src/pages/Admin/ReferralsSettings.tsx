import React, { useEffect, useState } from "react";
import { AdminReferralsAPI, type ReferralSettings } from "../../lib/api/types/adminReferrals";

const ReferralsSettings: React.FC = () => {
  const [settings, setSettings] = useState<Partial<ReferralSettings>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
     
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await AdminReferralsAPI.getSettings();
      // API wrapper already returns response.data
      setSettings(res?.data ?? res);
    } catch (err) {
      alert("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await AdminReferralsAPI.updateSettings(settings as ReferralSettings);
      alert("Settings updated successfully");
      console.log(res);
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Referral Settings</h2>
        <div className="space-x-2">
          <button
            onClick={loadSettings}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Loading..." : "Reload"}
          </button>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Referrer Reward Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.referrerRewardAmount ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, referrerRewardAmount: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Referee Reward Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.refereeRewardAmount ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, refereeRewardAmount: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Referee Discount %</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.refereeDiscountPercentage ?? ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, refereeDiscountPercentage: Number(e.target.value) }))
            }
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Currency</label>
          <input
            className="w-full p-2 border rounded"
            value={settings.currency ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, currency: e.target.value }))}
          />
        </div>

        {/* Bonus tiers */}
        <div>
          <label className="block text-sm mb-1">Bonus Tier 1 Count</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.bonusTier1Count ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, bonusTier1Count: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Bonus Tier 1 Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.bonusTier1Amount ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, bonusTier1Amount: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Bonus Tier 2 Count</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.bonusTier2Count ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, bonusTier2Count: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Bonus Tier 2 Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.bonusTier2Amount ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, bonusTier2Amount: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Bonus Tier 3 Count</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.bonusTier3Count ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, bonusTier3Count: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Bonus Tier 3 Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.bonusTier3Amount ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, bonusTier3Amount: Number(e.target.value) }))}
          />
        </div>

        {/* Booleans */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.requireEmailVerification ?? false}
            onChange={(e) => setSettings((s) => ({ ...s, requireEmailVerification: e.target.checked }))}
          />
          <span>Require Email Verification</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.requireFirstPayment ?? false}
            onChange={(e) => setSettings((s) => ({ ...s, requireFirstPayment: e.target.checked }))}
          />
          <span>Require First Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.enableIpTracking ?? false}
            onChange={(e) => setSettings((s) => ({ ...s, enableIpTracking: e.target.checked }))}
          />
          <span>Enable IP Tracking</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.enableDeviceFingerprinting ?? false}
            onChange={(e) =>
              setSettings((s) => ({ ...s, enableDeviceFingerprinting: e.target.checked }))
            }
          />
          <span>Enable Device Fingerprinting</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.isActive ?? false}
            onChange={(e) => setSettings((s) => ({ ...s, isActive: e.target.checked }))}
          />
          <span>Is Active</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.allowTrialCompletionReward ?? false}
            onChange={(e) =>
              setSettings((s) => ({ ...s, allowTrialCompletionReward: e.target.checked }))
            }
          />
          <span>Allow Trial Completion Reward</span>
        </div>

        {/* Numbers */}
        <div>
          <label className="block text-sm mb-1">Reward Pending Period (hours)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.rewardPendingPeriodHours ?? ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, rewardPendingPeriodHours: Number(e.target.value) }))
            }
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Referral Expiry (days)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.referralExpiryDays ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, referralExpiryDays: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Max Referrals / Day</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.maxReferralsPerDay ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, maxReferralsPerDay: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Max Referrals / Month</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.maxReferralsPerMonth ?? ""}
            onChange={(e) => setSettings((s) => ({ ...s, maxReferralsPerMonth: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Trial Completion Reward Multiplier</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={settings.trialCompletionRewardMultiplier ?? ""}
            onChange={(e) =>
              setSettings((s) => ({ ...s, trialCompletionRewardMultiplier: Number(e.target.value) }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralsSettings;
