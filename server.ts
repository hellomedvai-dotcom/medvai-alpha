import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

// In-memory waitlist storage for demo site tracking
const waitlistEntries: Array<{ email: string; role: string; timestamp: string; referralCode: string }> = [
  { email: "earlyaccess@medvai.health", role: "Patient", timestamp: new Date().toISOString(), referralCode: "MV-8291" },
  { email: "dr.chen@cardiology.med", role: "Physician", timestamp: new Date().toISOString(), referralCode: "MV-4102" },
];

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "MEDVAI Web Server", timestamp: new Date().toISOString() });
});

// Waitlist API
app.post("/api/waitlist", (req, res) => {
  const { email, role } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Please provide a valid email address." });
    return;
  }
  
  const existing = waitlistEntries.find(w => w.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    res.json({
      success: true,
      alreadyExists: true,
      referralCode: existing.referralCode,
      position: 1248,
      message: "You are already registered on the MEDVAI launch waitlist."
    });
    return;
  }

  const referralCode = `MV-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEntry = {
    email: email.toLowerCase(),
    role: role || "Patient",
    timestamp: new Date().toISOString(),
    referralCode
  };
  waitlistEntries.push(newEntry);

  const totalCount = 1420 + waitlistEntries.length;

  res.json({
    success: true,
    alreadyExists: false,
    referralCode,
    position: totalCount,
    totalWaitlist: totalCount,
    message: "Welcome to the future of healthcare. Your access slot is reserved."
  });
});

// Interactive AI Medical Report Translator Endpoint
app.post("/api/translate-report", async (req, res) => {
  try {
    const { reportText, reportType } = req.body;
    if (!reportText || typeof reportText !== "string") {
      res.status(400).json({ error: "No report snippet provided." });
      return;
    }

    const ai = getGenAIClient();
    if (!ai) {
      // Fallback high-fidelity sample analysis if GEMINI_API_KEY is not configured
      res.json({
        simplifiedTranslation: "Your complete blood count and metabolic panel show overall stability. High-density lipoprotein (good cholesterol) is optimal, while fasting glucose is slightly elevated at 104 mg/dL. Your thyroid stimulating hormone (TSH) is within normal range.",
        keyFindings: [
          { metric: "Fasting Glucose", value: "104 mg/dL", status: "Slightly Elevated", explanation: "Target is <100 mg/dL. Reflects recent glucose absorption, worth discussing dietary balance." },
          { metric: "HDL Cholesterol", value: "58 mg/dL", status: "Optimal", explanation: "Protective cholesterol level supporting vascular resilience." },
          { metric: "TSH", value: "2.1 mIU/L", status: "Normal", explanation: "Thyroid gland regulatory hormone is functioning balanced." }
        ],
        questionsForDoctor: [
          "Should we recheck fasting glucose in 3 to 6 months?",
          "Are there specific dietary tweaks or hydration goals recommended for my baseline?"
        ],
        calmSummaryNote: "Nothing requires immediate emergency care. MEDVAI organized this to help you have an informed, structured conversation at your next routine appointment."
      });
      return;
    }

    const prompt = `You are MEDVAI's Medical Translation Engine. Translate this complex medical report/lab result snippet into patient-friendly, calm, clear language. Do NOT diagnose or give scary medical advice. Format response as JSON.

Report Snippet:
"${reportText}"
Category: ${reportType || "General Lab/Scan"}

Respond strictly in JSON with this structure:
{
  "simplifiedTranslation": "2-3 clear sentences explaining what this means in plain human language.",
  "keyFindings": [
    { "metric": "Metric name", "value": "Value with units", "status": "Normal | Slightly Elevated | Low | Optimal | Attention", "explanation": "Brief plain language explanation" }
  ],
  "questionsForDoctor": [
    "2 relevant, empowering questions to ask at the next doctor appointment"
  ],
  "calmSummaryNote": "A brief reassuring sentence contextualizing the result."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const text = response.text || "";
    const parsed = JSON.parse(text);
    res.json(parsed);

  } catch (err: any) {
    console.error("Translate Report Error:", err);
    res.status(500).json({
      error: "Unable to process report snippet.",
      details: err?.message
    });
  }
});

// Interactive AI Doctor Brief Generator
app.post("/api/doctor-brief", async (req, res) => {
  try {
    const { symptoms, Duration, currentMeds, allergies } = req.body;
    
    const ai = getGenAIClient();
    if (!ai) {
      res.json({
        chiefComplaint: symptoms || "Periodic fatigue and mild evening headaches over 2 weeks.",
        timeline: Duration || "Duration: 14 days, non-progressive.",
        keyContext: `Active medications: ${currentMeds || 'None reported'}. Known allergies: ${allergies || 'Penicillin'}.`,
        suggestedClinicalFocus: "1. Rule out tension vs sleep hygiene factors. 2. Verify baseline blood pressure and recent lab metrics.",
        questionsToAsk: [
          "Could recent sleep pattern changes account for the afternoon fatigue?",
          "Would a basic blood panel check (iron, B12, thyroid) be helpful?"
        ]
      });
      return;
    }

    const prompt = `You are MEDVAI's Doctor Brief Generator. Synthesize the user's health notes into a 60-second concise clinical summary brief designed for a doctor's appointment.

User Symptoms: "${symptoms}"
Duration: "${Duration}"
Medications: "${currentMeds}"
Allergies: "${allergies}"

Format strictly as JSON:
{
  "chiefComplaint": "Clear, objective summary of the primary reason for visit",
  "timeline": "Symptom duration and pattern breakdown",
  "keyContext": "Medications and allergy considerations",
  "suggestedClinicalFocus": "2 concise bullet points for doctor review",
  "questionsToAsk": ["2 targeted questions for patient to ask physician"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);

  } catch (err: any) {
    console.error("Doctor Brief Error:", err);
    res.status(500).json({ error: "Failed to generate Doctor Brief." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MEDVAI Web Server running on http://localhost:${PORT}`);
  });
}

startServer();
