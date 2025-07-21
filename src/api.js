// src/api.js
const BASE_URL = "https://6gdijwesul.execute-api.eu-west-2.amazonaws.com/prod";

export async function addActivity(activityData) {
  const res = await fetch(`${BASE_URL}/AddActivity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activityData),
  });
  if (!res.ok) throw new Error("Failed to add activity");
  return await res.json();
}

export async function addJobPlan(jobPlanData) {
  const res = await fetch(`${BASE_URL}/AddJobPlan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobPlanData),
  });
  if (!res.ok) throw new Error("Failed to add job plan");
  return await res.json();
}
