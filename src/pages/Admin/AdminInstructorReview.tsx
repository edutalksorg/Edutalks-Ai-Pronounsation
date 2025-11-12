import React, { useState } from "react";
import { reviewInstructor } from "../../lib/api/types/admin";

/**
 * Minimal instructor review UI.
 * In a real app you would fetch pending instructor list from an endpoint.
 * Here we just accept applicationId and instructorId to call the review endpoint.
 */

const AdminInstructorReview: React.FC = () => {
  const [id, setId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [approve, setApprove] = useState(true);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !applicationId) {
      alert("Please provide both Instructor ID and Application ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await reviewInstructor(id, {
        applicationId,
        approve,
        notes,
      });

      alert("Review submitted successfully!");
      console.log("Response:", res);

      // Reset form
      setId("");
      setApplicationId("");
      setNotes("");
      setApprove(true);
    } catch (err: any) {
      console.error("Review submission failed:", err);
      alert(err?.response?.data?.message ?? "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Instructor Review</h2>
      <form onSubmit={submitReview} className="space-y-4">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Instructor ID (path param)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          placeholder="Application ID"
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={approve}
              onChange={() => setApprove(true)}
            />{" "}
            Approve
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={!approve}
              onChange={() => setApprove(false)}
            />{" "}
            Reject
          </label>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add review notes (optional)"
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AdminInstructorReview;
