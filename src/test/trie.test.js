import { describe, it, expect, beforeEach } from 'vitest';
import { Trie } from '../utils/trie';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('insert and search', () => {
    it('inserts and finds a single word', () => {
      trie.insert('hello');
      expect(trie.search('hello')).toBe(true);
      expect(trie.search('hell')).toBe(false);
      expect(trie.search('helloo')).toBe(false);
    });

    it('handles case insensitivity', () => {
      trie.insert('Hello');
      expect(trie.search('hello')).toBe(true);
      expect(trie.search('HELLO')).toBe(true);
    });

    it('handles empty strings', () => {
      trie.insert('');
      expect(trie.search('')).toBe(false);
      expect(trie.size).toBe(0);
    });
  });

  describe('startsWith', () => {
    it('finds prefixes', () => {
      trie.insert('taiwan');
      expect(trie.startsWith('tai')).toBe(true);
      expect(trie.startsWith('taiwan')).toBe(true);
      expect(trie.startsWith('xyz')).toBe(false);
    });
  });

  describe('suggest (autocomplete)', () => {
    it('returns suggestions for a prefix', () => {
      trie.insertAll(['taiwan', 'taipei', 'taichung', 'tainan', 'tokyo']);
      const results = trie.suggest('tai');
      expect(results).toContain('taiwan');
      expect(results).toContain('taipei');
      expect(results).toContain('taichung');
      expect(results).not.toContain('tokyo');
    });

    it('respects limit parameter', () => {
      trie.insertAll(['a1', 'a2', 'a3', 'a4', 'a5', 'a6']);
      expect(trie.suggest('a', 3).length).toBe(3);
    });

    it('returns empty for unknown prefix', () => {
      trie.insert('hello');
      expect(trie.suggest('xyz')).toEqual([]);
    });

    it('returns empty for empty prefix', () => {
      trie.insert('hello');
      expect(trie.suggest('')).toEqual([]);
    });

    it('handles Vietnamese text', () => {
      trie.insertAll(['đại học', 'đại học quốc lập', 'cao đẳng']);
      const results = trie.suggest('đại');
      expect(results).toContain('đại học');
      expect(results).toContain('đại học quốc lập');
      expect(results).not.toContain('cao đẳng');
    });
  });

  describe('size', () => {
    it('counts unique words', () => {
      trie.insert('hello');
      trie.insert('hello'); // duplicate
      trie.insert('world');
      expect(trie.size).toBe(2);
    });
  });

  describe('insertAll', () => {
    it('inserts multiple words', () => {
      trie.insertAll(['react', 'vue', 'angular']);
      expect(trie.search('react')).toBe(true);
      expect(trie.search('vue')).toBe(true);
      expect(trie.search('angular')).toBe(true);
      expect(trie.size).toBe(3);
    });
  });
});
