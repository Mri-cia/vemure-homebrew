
export const API = {
  BASE_URL: "https://mockend.com/api/Mri-cia/vemure-homebrew",
  ENDPOINTS: {
    traits: {
        get: "/traits",
        getById: (id) => `/traits/${id}`,
        getByType: (type) => `/traits?type_eq=${type}`,
        getByCategory: (category) => `/tras?category_eq=${category}`,
    }

  }
}