import React, { useEffect, useState } from "react";
import { AdminReferralsAPI, ReferralSettings } from "../../lib/api/types/adminReferrals";

const ReferralSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<ReferralSettings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res: any = await AdminReferralsAPI.getSettings();
        setSettings(res?.data ?? res);
      } catch (err) {
        console.error(err);
        alert("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onChange = (key: keyof ReferralSettings, value: any) => {
    setSettings((s) => (s ? { ...s, [key]: value } : s));
  };

  const save = async () => {
    if (!settings) return;
    setLoading(true);
    try {
      await AdminReferralsAPI.updateSettings(settings);
      alert("Settings updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 border rounded">
      <h3 className="text-lg font-semibold mb-4">Referral Settings</h3>

      <div className="grid grid-cols-2 gap-3">
        <label>
          Referrer Reward
          <input type="number" value={settings.referrerRewardAmount} onChange={(e) => onChange("referrerRewardAmount", Number(e.target.value))} className="w-full p-2 border rounded" />
        </label>

        <label>
          Referee Reward
          <input type="number" value={settings.refereeRewardAmount} onChange={(e) => onChange("refereeRewardAmount", Number(e.target.value))} className="w-full p-2 border rounded" />
        </label>

        <label>
          Referee Discount %
          <input type="number" value={settings.refereeDiscountPercentage} onChange={(e) => onChange("refereeDiscountPercentage", Number(e.target.value))} className="w-full p-2 border rounded" />
        </label>

        <label>
          Currency
          <input value={settings.currency} onChange={(e) => onChange("currency", e.target.value)} className="w-full p-2 border rounded" />
        </label>

        <label>
          Is Active
          <select value={String(settings.isActive)} onChange={(e) => onChange("isActive", e.target.value === "true")} className="w-full p-2 border rounded">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>

        <label>
          Require Email Verification
          <select value={String(settings.requireEmailVerification)} onChange={(e) => onChange("requireEmailVerification", e.target.value === "true")} className="w-full p-2 border rounded">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        <button onClick={save} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">Save Settings</button>
      </div>
    </div>
  );
};

export default ReferralSettingsPage;
