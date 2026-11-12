import { Expert, Project } from '../types';

export interface MatchingResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  totalRequirementsCount: number;
  matchedRequirementsCount: number;
  mode: 'project' | 'query' | 'baseline';
  targetLabel: string;
}

export function computeMatchingScore(
  expert: Expert,
  searchQuery: string = '',
  activeProject: Project | null = null
): MatchingResult {
  const expertSkillsLower = expert.skills.map((s) => s.toLowerCase());
  const expertText = `${expert.name} ${expert.title} ${expert.category} ${expert.bio} ${expert.skills.join(' ')}`.toLowerCase();

  // 1. ACTIVE PROJECT MATCHING MODE
  if (activeProject) {
    const required = activeProject.requiredSkills;
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    required.forEach((reqSkill) => {
      const reqLower = reqSkill.toLowerCase();
      // Check exact or partial match in expert's listed skills
      const hasSkill = expertSkillsLower.some(
        (es) => es === reqLower || es.includes(reqLower) || reqLower.includes(es)
      );

      if (hasSkill) {
        matchedSkills.push(reqSkill);
      } else if (expertText.includes(reqLower)) {
        // Mentioned in bio or experience
        matchedSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const matchRatio = required.length > 0 ? matchedSkills.length / required.length : 1;
    const categoryBonus = expert.category.toLowerCase() === activeProject.category.toLowerCase() ? 8 : 0;
    const ratingBonus = (expert.rating / 5) * 4;
    const verifiedBonus = expert.verified ? 3 : 0;

    // Base score calculation based on skill match ratio
    let rawScore = Math.round(matchRatio * 85 + categoryBonus + ratingBonus + verifiedBonus);

    // If all skills match, ensure high score 95-99%
    if (matchedSkills.length === required.length && required.length > 0) {
      rawScore = Math.max(95, Math.min(99, rawScore));
    } else if (matchedSkills.length === 0) {
      rawScore = Math.min(35, Math.round(categoryBonus * 2 + 15));
    } else {
      rawScore = Math.min(94, Math.max(40, rawScore));
    }

    return {
      score: rawScore,
      matchedSkills,
      missingSkills,
      totalRequirementsCount: required.length,
      matchedRequirementsCount: matchedSkills.length,
      mode: 'project',
      targetLabel: activeProject.title
    };
  }

  // 2. SEARCH QUERY MATCHING MODE
  const trimmedQuery = searchQuery.trim().toLowerCase();
  if (trimmedQuery.length > 0) {
    // Split query by commas or spaces to find target keywords
    const rawTokens = trimmedQuery.split(/[\s,]+/).filter((t) => t.length > 1);
    const matchedSkills: string[] = [];
    const matchedKeywords: string[] = [];

    // Check expert's explicit skills
    expert.skills.forEach((skill) => {
      const skillLower = skill.toLowerCase();
      if (
        skillLower.includes(trimmedQuery) ||
        trimmedQuery.includes(skillLower) ||
        rawTokens.some((token) => skillLower.includes(token) || token.includes(skillLower))
      ) {
        if (!matchedSkills.includes(skill)) {
          matchedSkills.push(skill);
        }
      }
    });

    // Check query tokens against title/bio/category
    rawTokens.forEach((token) => {
      if (expertText.includes(token) && !matchedKeywords.includes(token)) {
        matchedKeywords.push(token);
      }
    });

    let score = 20;

    if (matchedSkills.length > 0) {
      // Strong match on declared skills
      const skillBonus = Math.min(65, matchedSkills.length * 25);
      const tokenCoverage = rawTokens.length > 0 ? (matchedKeywords.length / rawTokens.length) * 20 : 15;
      score = Math.round(35 + skillBonus + tokenCoverage + (expert.rating >= 4.9 ? 5 : 0));
    } else if (matchedKeywords.length > 0) {
      // Moderate match in title/bio
      const tokenCoverage = rawTokens.length > 0 ? (matchedKeywords.length / rawTokens.length) * 50 : 25;
      score = Math.round(25 + tokenCoverage);
    } else {
      score = Math.round(15 + (expert.verified ? 10 : 5));
    }

    score = Math.max(15, Math.min(99, score));

    return {
      score,
      matchedSkills,
      missingSkills: [],
      totalRequirementsCount: rawTokens.length || 1,
      matchedRequirementsCount: matchedSkills.length || (matchedKeywords.length > 0 ? 1 : 0),
      mode: 'query',
      targetLabel: `Query: "${searchQuery}"`
    };
  }

  // 3. BASELINE FIT / PLATFORM REPUTATION SCORE (Default when no filter is active)
  // Reflects overall talent excellence, vetting score, and track record (88% - 98%)
  const baseVettingScore = Math.round(
    (expert.rating / 5) * 80 +
      (expert.verified ? 10 : 5) +
      Math.min(8, expert.completedProjects / 6)
  );

  return {
    score: Math.min(98, Math.max(85, baseVettingScore)),
    matchedSkills: expert.skills.slice(0, 3),
    missingSkills: [],
    totalRequirementsCount: expert.skills.length,
    matchedRequirementsCount: expert.skills.length,
    mode: 'baseline',
    targetLabel: 'Expertism Quality Fit'
  };
}
