import { describe, it, expect } from 'vitest';
import { levenshteinDistance, fuzzyMatch } from '../utils/fuzzySearch';

describe('levenshteinDistance', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0);
    expect(levenshteinDistance('abc', 'abc')).toBe(0);
  });

  it('returns correct distance for simple edits', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('cat', 'cut')).toBe(1);
    expect(levenshteinDistance('abc', '')).toBe(3);
    expect(levenshteinDistance('', 'abc')).toBe(3);
  });

  it('handles empty strings', () => {
    expect(levenshteinDistance('', '')).toBe(0);
  });

  it('handles unicode strings', () => {
    expect(levenshteinDistance('đại học', 'đại học')).toBe(0);
    expect(levenshteinDistance('đại học', 'dai hoc')).toBeGreaterThan(0);
  });

  it('is symmetric', () => {
    expect(levenshteinDistance('abc', 'xyz')).toBe(levenshteinDistance('xyz', 'abc'));
  });
});

describe('fuzzyMatch', () => {
  it('matches exact substrings', () => {
    expect(fuzzyMatch('taiwan', 'taiwan')).toBe(true);
    expect(fuzzyMatch('Taiwan', 'National Taiwan University')).toBe(true);
  });

  it('matches with minor typos (transposition)', () => {
    expect(fuzzyMatch('taiwna', 'taiwan')).toBe(true);
    expect(fuzzyMatch('scholarshp', 'scholarship')).toBe(true);
  });

  it('rejects completely different strings', () => {
    expect(fuzzyMatch('xyz', 'abc')).toBe(false);
    expect(fuzzyMatch('python', 'javascript')).toBe(false);
  });

  it('handles short queries (<=2 chars) with exact match only', () => {
    expect(fuzzyMatch('ab', 'abc')).toBe(true);
    expect(fuzzyMatch('xy', 'abc')).toBe(false);
  });

  it('handles empty inputs', () => {
    expect(fuzzyMatch('', 'abc')).toBe(false);
    expect(fuzzyMatch('abc', '')).toBe(false);
  });

  it('matches Vietnamese text', () => {
    // fuzzyMatch is case-sensitive; in production, inputs are normalized by matchSearch()
    expect(fuzzyMatch('đại học', 'đại học quốc lập')).toBe(true);
    expect(fuzzyMatch('cao hung', 'cao hùng')).toBe(true);
  });
});
