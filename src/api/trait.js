
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

const TRAIT_ALLOWED_FIELDS = ["trait_name", "type", "category", "notes"];

function stripTraitPayload(data) {
  const cleaned = {};
  for (const key of TRAIT_ALLOWED_FIELDS) {
    if (key in data) {
      cleaned[key] = data[key];
    }
  }
  return cleaned;
}

export async function getTraits() {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.get}`);
  return handleResponse(response);
}

export async function getTraitByCategory(category) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.getByCategory(category)}`);
  return handleResponse(response);
}

export async function getTraitById(id) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.getById(id)}`);
  return handleResponse(response);
}

export async function createTrait(data) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.get}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stripTraitPayload(data)),
  });
  return handleResponse(response);
}

export async function updateTrait(id, data) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.getById(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stripTraitPayload(data)),
  });
  return handleResponse(response);
}

export async function removeTrait(id) {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.getById(id)}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}
