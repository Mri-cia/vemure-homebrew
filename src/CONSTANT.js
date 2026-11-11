
export const API = {
  BASE_URL: "http://localhost:3001",
  ENDPOINTS: {
    traits: {
        get: "/traits",
        getById: (id) => `/traits/${id}`,
        getByType: (type) => `/traits?type_eq=${type}`,
        getByCategory: (category) => `/traits?category_eq=${category}`,
    },
    skills: {
      get: "/skills",
      getById: (id) => `/traits/${id}`,
    }

  }
}