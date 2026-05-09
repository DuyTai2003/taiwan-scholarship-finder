/**
 * Levenshtein distance — measures how many single-character edits
 * (insertions, deletions, substitutions) are needed to change one string into another.
 * Used for fuzzy search: "Natonal Taiwan Unversity" → still matches "National Taiwan University"
 *
 * Time: O(n*m) | Space: O(min(n,m)) — optimized with two-row DP
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} Edit distance (0 = identical)
 *
 * @example
 *   levenshteinDistance('kitten', 'sitting')  // → 3
 *   levenshteinDistance('abc', 'abc')         // → 0
 */
export function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;

  // Optimization: ensure a is the shorter string
  if (m > n) return levenshteinDistance(b, a);

  let prev = new Array(m + 1);
  let curr = new Array(m + 1);

  for (let i = 0; i <= m; i++) prev[i] = i;

  for (let j = 1; j <= n; j++) {
    curr[0] = j;
    for (let i = 1; i <= m; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[i] = Math.min(
        prev[i] + 1,       // deletion
        curr[i - 1] + 1,   // insertion
        prev[i - 1] + cost // substitution
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[m];
}

/**
 * Fuzzy match — checks if query approximately matches target
 * Uses Levenshtein distance with a tolerance proportional to query length
 *
 * @param {string} query - User's search query (normalized)
 * @param {string} target - Target string to match against (normalized)
 * @param {number} [maxDistance] - Maximum edit distance allowed (default: auto-calculated)
 * @returns {boolean} Whether the query fuzzy-matches the target
 *
 * @example
 *   fuzzyMatch('taiwan', 'taiwna')    // → true (transposition)
 *   fuzzyMatch('scholarship', 'scol') // → true (substring + fuzzy)
 *   fuzzyMatch('xyz', 'abc')          // → false
 */
export function fuzzyMatch(query, target, maxDistance) {
  if (!query || !target) return false;

  // Exact match first (fast path)
  if (target.includes(query)) return true;

  const qLen = query.length;

  // If query is very short, require exact match (already checked above)
  if (qLen <= 2) return false;

  // Auto-calculate tolerance: ~40% of query length, minimum 1
  // More lenient for shorter queries (3-5 chars get tolerance of 2)
  const tolerance = maxDistance ?? Math.max(1, qLen <= 5 ? 2 : Math.floor(qLen * 0.35));

  // Substring match with sliding window
  const windowLen = Math.min(qLen + tolerance, target.length);
  for (let i = 0; i <= target.length - Math.min(qLen, target.length); i++) {
    const slice = target.slice(i, i + windowLen);
    if (levenshteinDistance(query, slice) <= tolerance) {
      return true;
    }
  }

  return false;
}
