// src/api.ts
const API_BASE = 'https://6gdijwesul.execute-api.eu-west-2.amazonaws.com'; // Replace with your real endpoint if needed

export async function addJobPlan(data: any) {
  const response = await fetch(`${API_BASE}/add-job-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to add job plan: ${response.statusText}`);
  }

  return response.json();
}

export async function addActivity(data: any) {
  const response = await fetch(`${API_BASE}/add-activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to add activity: ${response.statusText}`);
  }

  return response.json();
}
