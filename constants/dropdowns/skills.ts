import { DropdownOption } from "interfaces/dropdown";

export const SkillOptions: DropdownOption[] = [
    { value: 'react', label: 'React' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
    { value: 'git', label: 'Git' },
];

export const SkillLevelOptions: DropdownOption[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Expert' },
];

// export const SkillTypeCodes = SkillOptions.map((skill) => skill.value) as [string, ...string[]];

// export const SkillLevelCodes = SkillLevelOptions.map((skill) => skill.value) as [string, ...string[]];
