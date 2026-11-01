
import { API } from "../CONSTANT";

export async function getTraits() { 
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.get}`);
    if(response.status !== 200) {
        throw new Error(`Failed to fetch traits: ${response.status}`);
    } else{
        const traits = await response.json();
        return traits;
    }
}

export async function getTraitByCategory(category) {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.traits.getByCategory(category)}`);
    if(response.status !== 200) {
        throw new Error(`Failed to fetch trait by category: ${response.status}`);
    } else{
        const trait = await response.json();
        return trait;
    }
}