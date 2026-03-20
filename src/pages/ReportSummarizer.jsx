import { useState } from "react";

export default function ReportSummarizer() {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState("Hindi");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fileToBase64 = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(",")[1]);
      r.onerror = () => rej("Failed");
      r.readAsDataURL(file);
    });

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const base64 = await fileToBase64(file);
      const isPDF = file.type === "application/pdf";
      const mediaType = isPDF ? "application/pdf" : file.type;

      const content = isPDF
        ? [
            {
              type: "document",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            {
              type: "text",
              text: `Analyze this medical report. Respond in ${lang}.`,
            },
          ]
        : [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            {
              type: "text",
              text: `Analyze this medical report. Respond in ${lang}.`,
            },
          ];

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a medical report analyzer. Read lab reports and explain in simple language.
Respond ONLY with valid JSON (no markdown):
{
  "plain_summary": "3-4 sentences in ${lang}, simple words, no jargon",
  "findings": [{"label":"Test Name","value":"Result","unit":"unit","status":"normal|high|low"}],
  "advice": ["tip in ${lang}"]
}`,
          messages: [{ role: "user", content }],
        }),
      });

      const data = await res.json();
      const raw = data.content.map((i) => i.text || "").join("");
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch {
      setError("Report analyze nahi ho saki. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧪 Report Summarizer</h2>

      {/* Upload */}
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setResult(null);
        }}
        className="mb-4 block w-full border p-2 rounded"
      />

      {/* Language */}
      <div className="flex gap-2 mb-4">
        {["Hindi", "English", "Hinglish", "Punjabi"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded border text-sm ${lang === l ? "bg-green-600 text-white border-green-600" : "border-gray-300"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Analyze Button */}
      <button
        onClick={analyze}
        disabled={!file || loading}
        className="w-full bg-green-700 text-white py-3 rounded font-semibold disabled:opacity-50"
      >
        {loading ? "⏳ Analyzing..." : "🧠 AI se Analyze Karein"}
      </button>

      {/* Error */}
      {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              💬 Simple Summary
            </p>
            <p className="text-gray-800">{result.plain_summary}</p>
          </div>

          {/* Findings */}
          <div className="grid grid-cols-2 gap-3">
            {result.findings?.map((f, i) => (
              <div key={i} className="bg-white border rounded-lg p-3">
                <p className="text-xs text-gray-500">{f.label}</p>
                <p className="text-xl font-bold">
                  {f.value}{" "}
                  <span className="text-sm font-normal text-gray-400">
                    {f.unit}
                  </span>
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${f.status === "high" ? "bg-red-100 text-red-600" : f.status === "low" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                >
                  {f.status === "high"
                    ? "⬆ High"
                    : f.status === "low"
                      ? "⬇ Low"
                      : "✅ Normal"}
                </span>
              </div>
            ))}
          </div>

          {/* Advice */}
          <div className="bg-white border rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              👨⚕️ Doctor Ki Salah
            </p>
            <ul className="space-y-2">
              {result.advice?.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-yellow-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            ⚠️ Ye AI summary sirf samajhne ke liye hai. Ilaaj ke liye doctor se
            milein.
          </p>
        </div>
      )}
    </div>
  );
}
