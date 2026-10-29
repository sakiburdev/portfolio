import portfolio from "@/data/portfolio.json";

export const DATA = portfolio;
export const PERSONAL = portfolio?.personalInfo ?? {};
export const ABOUT = portfolio?.about ?? {};
export const DESIGNATIONS = (PERSONAL?.designation ?? []).filter(Boolean);
export const EDUCATION = portfolio?.education ?? [];
export const SKILLS = portfolio?.skills ?? [];
export const PROJECTS = portfolio?.projects ?? [];
