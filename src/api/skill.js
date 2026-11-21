
import { API } from "../CONSTANT";

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const body = await response.json().catch(() => null);
  let message = `Request failed: ${response.status}`;
  if (body && body.message) {
    message = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message;
  }
  throw new ApiError(response.status, message);
}

const SKILL_ALLOWED_FIELDS = ["skill_name", "attribute", "difficulty", "notes", "requires_specialization"];

function stripSkillPayload(data) {
  const cleaned = {};
  for (const key of SKILL_ALLOWED_FIELDS) {
    if (key in data) {
      cleaned[key] = data[key];
    }
  }
  return cleaned;
}

export async function getSkills() {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.get}`);
  return handleResponse(response);
}

export async function getSkillById(id) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.getById(id)}`);
  return handleResponse(response);
}

export async function createSkill(data) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.get}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stripSkillPayload(data)),
  });
  return handleResponse(response);
}

export async function updateSkill(id, data) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.getById(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stripSkillPayload(data)),
  });
  return handleResponse(response);
}

export async function removeSkill(id) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.getById(id)}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}