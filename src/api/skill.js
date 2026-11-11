
import { API } from "../CONSTANT";

export async function getSkills() { 
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.get}`);
    if(response.status !== 200) {
        throw new Error(`Failed to fetch traits: ${response.status}`);
    } else{
        const traits = await response.json();
        return traits;
    }
}

export async function getSkillsById(id) {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.skills.getById(id)}`);
    if(response.status !== 200) {
        throw new Error(`Failed to fetch trait by category: ${response.status}`);
    } else{
        const trait = await response.json();
        return trait;
    }
}