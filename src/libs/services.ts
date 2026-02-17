export interface ServiceCategory {
  key: string; // This will be used to fetch translations
  url: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    key: "existingProjects",
    url: "/services/existing-projects"
  },
  {
    key: "newProjects",
    url: "/services/new-projects"
  }
];