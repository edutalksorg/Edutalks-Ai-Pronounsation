import React, { useEffect, useState } from "react";
import axiosClient from "../../lib/api/types/axiosClient";

type Profile = {
  id?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  role?: string;
  avatarUrl?: string;
  // add fields as your backend returns them
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res: any = await axiosClient.get("/api/v1/users/profile");
        setProfile(res?.data ?? res);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (!profile) return <div className="p-4">No profile data.</div>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-2">
        <div><strong>Name:</strong> {profile.fullName}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>Phone:</strong> {profile.phoneNumber}</div>
        <div><strong>Role:</strong> {profile.role}</div>
        {profile.avatarUrl && <img src={profile.avatarUrl} alt="avatar" className="w-24 h-24 rounded mt-3" />}
      </div>
    </div>
  );
};

export default ProfilePage;
