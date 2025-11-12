import React, { useEffect, useState } from "react";
import { DailyTopicsAPI } from "../lib/api/types/dailyTopics";

// strict unions to match your API types
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type TopicStatus = "Draft" | "Published" | "Archived";

interface Topic {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  difficulty: Difficulty;
  estimatedDurationMinutes: number;
  status?: TopicStatus;
  isFeatured?: boolean;
}

interface TopicForm {
  title: string;
  description: string;
  categoryId: string;
  difficulty: Difficulty;
  discussionPoints: string[];
  vocabularyList: string[];
  estimatedDurationMinutes: number;
  author: string;
}

const DailyTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<TopicForm>({
    title: "",
    description: "",
    categoryId: "",
    difficulty: "Beginner",
    discussionPoints: [],
    vocabularyList: [],
    estimatedDurationMinutes: 10,
    author: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // ========== FETCH TOPICS ==========
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await DailyTopicsAPI.list({ SearchTerm: searchTerm });
      // API might return { data: Topic[] } or Topic[] — normalize both
      const data = (res && (res.data ?? res)) as Topic[]; 
      setTopics(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // ========== HANDLE FORM CHANGE ==========
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "difficulty") {
      // cast to Difficulty union
      setForm((prev) => ({ ...prev, difficulty: value as Difficulty }));
      return;
    }
    if (name === "estimatedDurationMinutes") {
      setForm((prev) => ({ ...prev, estimatedDurationMinutes: Number(value) }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value } as unknown as TopicForm));
  };

  // ========== CREATE OR UPDATE TOPIC ==========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // build payload matching UpdateTopicRequest: include topicId and other fields
        const payload = {
          topicId: editingId,
          title: form.title,
          description: form.description,
          categoryId: form.categoryId,
          difficulty: form.difficulty,
          discussionPoints: form.discussionPoints,
          vocabularyList: form.vocabularyList,
          estimatedDurationMinutes: form.estimatedDurationMinutes,
        };
        await DailyTopicsAPI.update(editingId, payload);
        alert("✅ Topic updated successfully!");
      } else {
        // create expects TopicRequest which uses Difficulty union
        await DailyTopicsAPI.create(form);
        alert("✅ Topic created successfully!");
      }

      // Reset form and reload list
      setForm({
        title: "",
        description: "",
        categoryId: "",
        difficulty: "Beginner",
        discussionPoints: [],
        vocabularyList: [],
        estimatedDurationMinutes: 10,
        author: "",
      });
      setEditingId(null);
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert("⚠️ Error saving topic");
    } finally {
      setLoading(false);
    }
  };

  // ========== DELETE TOPIC ==========
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await DailyTopicsAPI.delete(id);
      alert("🗑️ Topic deleted successfully!");
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete topic");
    }
  };

  // ========== EDIT TOPIC ==========
  const handleEdit = (topic: Topic) => {
    setForm({
      title: topic.title,
      description: topic.description,
      categoryId: topic.categoryId,
      difficulty: topic.difficulty,
      discussionPoints: [],
      vocabularyList: [],
      estimatedDurationMinutes: topic.estimatedDurationMinutes,
      author: "",
    });
    setEditingId(topic.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ========== FEATURE TOGGLE ==========
  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await DailyTopicsAPI.toggleFeatured(id, !current);
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert("⚠️ Failed to toggle featured status");
    }
  };

  // ========== STATUS UPDATE ==========
  const changeStatus = async (id: string, status: TopicStatus) => {
    try {
      await DailyTopicsAPI.updateStatus(id, { topicId: id, status });
      alert("✅ Status updated!");
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  // ========== FAVORITE HANDLERS ==========
  const addFavorite = async (id: string) => {
    try {
      await DailyTopicsAPI.addFavorite(id);
      alert("❤️ Added to favorites!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to favorite");
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await DailyTopicsAPI.removeFavorite(id);
      alert("💔 Removed from favorites!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to remove favorite");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4 text-indigo-700">
        📚 Daily Topics Management
      </h1>

      {/* ===== CREATE / EDIT FORM ===== */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="estimatedDurationMinutes"
          placeholder="Duration (minutes)"
          value={form.estimatedDurationMinutes}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="col-span-2 p-2 border rounded"
          rows={3}
        />
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Saving..." : editingId ? "Update Topic" : "Create Topic"}
        </button>
      </form>

      {/* ===== SEARCH BAR ===== */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
      </div>

      {/* ===== TOPICS TABLE ===== */}
      {loading ? (
        <p>Loading topics...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Difficulty</th>
              <th className="p-2 border">Duration</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Featured</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 ? (
              topics.map((topic) => (
                <tr key={topic.id}>
                  <td className="p-2 border">{topic.title}</td>
                  <td className="p-2 border">{topic.difficulty}</td>
                  <td className="p-2 border">{topic.estimatedDurationMinutes} mins</td>
                  <td className="p-2 border">{topic.status ?? "Draft"}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => toggleFeatured(topic.id, topic.isFeatured ?? false)}
                      className={`px-2 py-1 text-xs rounded ${
                        topic.isFeatured ? "bg-yellow-400" : "bg-gray-300"
                      }`}
                    >
                      {topic.isFeatured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="p-2 border text-center space-x-1">
                    <button
                      onClick={() => handleEdit(topic)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(topic.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => addFavorite(topic.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                    >
                      ❤️
                    </button>
                    <button
                      onClick={() => removeFavorite(topic.id)}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                    >
                      💔
                    </button>
                    <select
                      value={topic.status ?? "Draft"}
                      onChange={(e) =>
                        changeStatus(topic.id, e.target.value as TopicStatus)
                      }
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan={6}>
                  No topics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DailyTopics;
