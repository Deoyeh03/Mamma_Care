"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";
import { Activity, User as UserIcon, Droplets, Calendar, Phone, ActivitySquare, Save, Stethoscope } from "lucide-react";

export default function PatientProfile() {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [vitalsHistory, setVitalsHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    bloodPressure: "",
    weight: "",
    fetalHeartRate: "",
    doctorNotes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("staffRole") || "");
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/hospital/patient/${id}`);
        setPatient(res.data.patient);
        setVitalsHistory(res.data.vitals);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res = await api.post("/hospital/vitals", {
        patientId: id,
        ...form
      });
      // Add new vitals to the top of the history list (mocking exact structure for instant feedback)
      const recordedBy = { name: localStorage.getItem("staffName"), role: localStorage.getItem("staffRole") };
      setVitalsHistory([{ ...res.data.vitals, recordedBy }, ...vitalsHistory]);
      setForm({ ...form, bloodPressure: "", weight: "", fetalHeartRate: "", doctorNotes: "" });
      setMessage("Vitals saved successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error saving vitals");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <ActivitySquare className="animate-spin text-brand-500" size={48} />
    </div>
  );

  if (!patient) return (
    <div className="p-8 text-center text-gray-500 font-medium">Patient not found</div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Left Column: Patient Info & Vitals form */}
      <div className="lg:col-span-1 space-y-8">
        
        {/* Patient Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600"></div>
          <div className="flex items-center gap-4 mb-6 pt-2">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xl font-bold">
              {patient.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">{patient.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{patient._id}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-red-50 text-red-500 rounded-lg"><Droplets size={16} /></div>
              <div>
                <p className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Blood Group</p>
                <p className="font-bold text-gray-900">{patient.bloodGroup || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Calendar size={16} /></div>
              <div>
                <p className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Est. Delivery Date</p>
                <p className="font-bold text-gray-900">
                  {patient.edd ? new Date(patient.edd).toLocaleDateString() : "Not set"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-green-50 text-green-500 rounded-lg"><Phone size={16} /></div>
              <div>
                <p className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Emergency Contact</p>
                <p className="font-bold text-gray-900">{patient.emergencyContact || "None"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Record Vitals Form */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-brand-500" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Record Vitals</h3>
          </div>
          
          {message && (
            <div className={`p-3 mb-4 text-sm font-bold rounded-xl ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium">
            <div>
              <label className="block text-gray-700 mb-1">Blood Pressure (mmHg)</label>
              <input
                type="text"
                placeholder="120/80"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                value={form.bloodPressure}
                onChange={(e) => setForm({...form, bloodPressure: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                placeholder="65"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                value={form.weight}
                onChange={(e) => setForm({...form, weight: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fetal Heart Rate (bpm)</label>
              <input
                type="number"
                placeholder="140"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                value={form.fetalHeartRate}
                onChange={(e) => setForm({...form, fetalHeartRate: e.target.value})}
              />
            </div>

            {/* Role-Based Rendering: Only Doctor sees Notes */}
            {role === "Doctor" && (
              <div>
                <label className="block text-gray-700 mb-1 flex items-center gap-1">
                  <Stethoscope size={14} className="text-brand-500" />
                  Doctor Notes
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none resize-none h-24"
                  placeholder="Clinical observations..."
                  value={form.doctorNotes}
                  onChange={(e) => setForm({...form, doctorNotes: e.target.value})}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 py-3.5 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {submitting ? "Saving..." : "Save Record"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Vitals History */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 border-b pb-4">Clinical History</h3>
        
        {vitalsHistory.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-gray-500 font-medium">
            No history recorded yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {vitalsHistory.map((vital, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="mb-4 pb-4 border-b border-gray-50 flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      {new Date(vital.createdAt).toLocaleDateString()} • {new Date(vital.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                      <UserIcon size={14} className="text-brand-500" />
                      Recorded by: {vital.recordedBy?.name || "Staff"} 
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md ml-2">{vital.recordedBy?.role || "Staff"}</span>
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Blood Pressure</p>
                    <p className="font-black text-lg text-gray-900">{vital.bloodPressure} <span className="text-sm font-medium text-gray-400">mmHg</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Weight</p>
                    <p className="font-black text-lg text-gray-900">{vital.weight} <span className="text-sm font-medium text-gray-400">kg</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Fetal HR</p>
                    <p className="font-black text-lg text-gray-900">{vital.fetalHeartRate ? `${vital.fetalHeartRate} bpm` : "-"}</p>
                  </div>
                </div>

                {vital.doctorNotes && (
                  <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100">
                    <p className="text-xs text-brand-600 font-bold flex items-center gap-1 mb-1">
                      <Stethoscope size={12} /> Notes
                    </p>
                    <p className="text-sm text-gray-800 medium leading-relaxed">{vital.doctorNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
