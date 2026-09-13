import  { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

const COLLEGE_DATA = {
  California: ["Stanford University", "UC Berkeley", "UCLA"],
  NewYork: ["Columbia University", "NYU", "Cornell University"],
  Texas: ["UT Austin", "Texas A&M", "Rice University"],
};

export default function App() {
  const [step, setStep] = useState(0); // 0: Landing, 1: OTP, 2: Bio/Age, 3: College, 4: Preferences, 5: Success
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", ""],
    firstName: "",
    lastName: "",
    dob: "",
    pronouns: "they/them",
    state: "",
    college: "",
    interests: [],
  });

  // Error States
  const [errors, setErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(30);

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (step === 1 && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpTimer]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Step 0: Landing -> Email Validation
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setErrors({ email: "Email is required." });
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(1);
      setOtpTimer(30);
    }, 800);
  };

  // Step 1: OTP Validation (Demo code: 1234)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const code = formData.otp.join("");
    if (code.length < 4) {
      setErrors({ otp: "Please enter the complete 4-digit code." });
      return;
    }
    if (code !== "1234") {
      setErrors({ otp: "Invalid OTP. Use demo code: 1234" });
      return;
    }
    setStep(2);
    setErrors({});
  };

  // Step 2: Personal Info & Age Check (< 18 validation)
  const handleBioSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.dob) {
      newErrors.dob = "Birth date is required.";
    } else {
      const birthYear = new Date(formData.dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 18) {
        newErrors.dob = "You must be at least 18 years old to join.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(3);
  };

  // Step 3: Dependent dropdowns
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.state) newErrors.state = "Please select a state.";
    if (!formData.college) newErrors.college = "Please select your college/university.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(4);
  };

  // Step 4: Final Submission
  const handleFinalSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(5);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-700/50">
        
        {/* Top Header & Step Tracker */}
        {step > 0 && step < 5 && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              className="p-2 hover:bg-slate-700 rounded-full transition"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Step {step} of 4
            </span>
            <div className="w-9" />
          </div>
        )}

        {/* STEP 0: LANDING */}
        {step === 0 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30 mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Join Nubpack</h1>
            <p className="text-slate-400 text-sm mb-6">Meet college peers, events, and community.</p>

            <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="text"
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                    errors.email ? "border-rose-500" : "border-slate-700"
                  } focus:outline-none focus:border-purple-500 text-sm`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 font-semibold rounded-xl transition flex justify-center items-center shadow-lg shadow-purple-600/25 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
              </button>
            </form>

            <p className="text-xs text-slate-500 mt-6">
              By continuing you agree to our{" "}
              <button onClick={() => setShowTerms(true)} className="text-purple-400 underline cursor-pointer">
                Terms & Conditions
              </button>
            </p>
          </div>
        )}

        {/* STEP 1: OTP VERIFICATION */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-1">Verify Email</h2>
            <p className="text-xs text-slate-400 mb-6">Enter the 4-digit code sent to {formData.email}</p>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-between gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={formData.otp[idx] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const nextOtp = [...formData.otp];
                      nextOtp[idx] = val;
                      updateField("otp", nextOtp);
                      if (val && idx < 3) document.getElementById(`otp-${idx + 1}`)?.focus();
                    }}
                    className="w-14 h-14 text-center text-xl font-bold bg-slate-900 border border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.otp}
                </p>
              )}

              <div className="text-center text-xs text-slate-400">
                {otpTimer > 0 ? (
                  `Resend code in ${otpTimer}s`
                ) : (
                  <button type="button" onClick={() => setOtpTimer(30)} className="text-purple-400 underline">
                    Resend Code
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 font-semibold rounded-xl transition cursor-pointer"
              >
                Verify Code
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: PROFILE DETAILS & AGE GUARD */}
        {step === 2 && (
          <form onSubmit={handleBioSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-1">Basic Identity</h2>
            <p className="text-xs text-slate-400 mb-4">Tell us what to call you.</p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 text-sm"
              />
              {errors.firstName && <p className="text-xs text-rose-400 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 text-sm"
              />
              {errors.lastName && <p className="text-xs text-rose-400 mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Date of Birth (18+)</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => updateField("dob", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 text-sm"
              />
              {errors.dob && <p className="text-xs text-rose-400 mt-1">{errors.dob}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-500 font-semibold rounded-xl transition cursor-pointer"
            >
              Continue
            </button>
          </form>
        )}

        {/* STEP 3: CROSS-FIELD DROPDOWNS */}
        {step === 3 && (
          <form onSubmit={handleLocationSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-1">Campus Location</h2>
            <p className="text-xs text-slate-400 mb-4">Connect with students at your university.</p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">State</label>
              <select
                value={formData.state}
                onChange={(e) => {
                  updateField("state", e.target.value);
                  updateField("college", ""); // reset dependent dropdown
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 text-sm"
              >
                <option value="">Select State</option>
                <option value="California">California</option>
                <option value="NewYork">New York</option>
                <option value="Texas">Texas</option>
              </select>
              {errors.state && <p className="text-xs text-rose-400 mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">College / University</label>
              <select
                value={formData.college}
                disabled={!formData.state}
                onChange={(e) => updateField("college", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-purple-500 text-sm disabled:opacity-40"
              >
                <option value="">Select College</option>
                {formData.state &&
                  COLLEGE_DATA[formData.state]?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
              {errors.college && <p className="text-xs text-rose-400 mt-1">{errors.college}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-500 font-semibold rounded-xl transition cursor-pointer"
            >
              Continue
            </button>
          </form>
        )}

        {/* STEP 4: PREFERENCES & FINAL SUBMIT */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-1">Preferences</h2>
            <p className="text-xs text-slate-400 mb-4">Pick tags that match your interests.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Tech", "Music", "Sports", "Gaming", "Art", "Startups"].map((tag) => {
                const active = formData.interests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const next = active
                        ? formData.interests.filter((i) => i !== tag)
                        : [...formData.interests, tag];
                      updateField("interests", next);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                      active
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 font-semibold rounded-xl transition flex justify-center items-center cursor-pointer shadow-lg shadow-purple-600/25"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Profile"}
            </button>
          </div>
        )}

        {/* STEP 5: SUCCESS STATE */}
        {step === 5 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold mb-1">Profile Complete!</h2>
            <p className="text-xs text-slate-400 mb-6">
              Welcome, {formData.firstName}! Your campus profile is ready.
            </p>
            <button
              onClick={() => {
                setStep(0);
                setFormData({
                  email: "",
                  otp: ["", "", "", ""],
                  firstName: "",
                  lastName: "",
                  dob: "",
                  pronouns: "they/them",
                  state: "",
                  college: "",
                  interests: [],
                });
              }}
              className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* TERMS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl max-w-sm w-full space-y-4">
            <h3 className="text-base font-semibold">Terms & Conditions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              By using Nubpack, you agree to respect campus community guidelines, verify your university credentials,
              and refrain from prohibited conduct.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-xs font-semibold rounded-xl cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}