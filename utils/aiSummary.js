function generatePatientSummary(patient) {
  if (!patient) return "No patient data available.";

  const name = patient.fullName || "Unknown";
  const age = patient.age || "unknown age";
  const condition = patient.condition || "not specified";
  const allergies = patient.allergies || "none reported";
  const bloodGroup = patient.bloodGroup || "unknown";

  const summary = `
${name} is a patient with blood group ${bloodGroup}. 
Medical history indicates ${condition}. 
Known allergies include ${allergies}. 
Patient should be monitored closely during consultation for any complications.
  `.trim();

  return summary;
}

module.exports = generatePatientSummary;