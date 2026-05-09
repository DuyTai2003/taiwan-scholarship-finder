/**
 * Trie (Prefix Tree) data structure for efficient autocomplete suggestions.
 *
 * Time:
 *   - insert: O(k) where k = word length
 *   - search: O(k)
 *   - suggest (autocomplete): O(k + m) where m = number of matches
 *
 * Space: O(N * k) where N = number of words, k = average word length
 *
 * Used by the search to provide real-time autocomplete suggestions
 * as the user types in the search box.
 */

class TrieNode {
  constructor() {
    /** @type {Map<string, TrieNode>} */
    this.children = new Map();
    this.isEnd = false;
    this.word = null; // Store full word at terminal node
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
    this._size = 0;
  }

  /**
   * Insert a word into the trie
   * @param {string} word
   */
  insert(word) {
    if (!word) return;
    const normalized = word.toLowerCase().trim();
    let node = this.root;
    for (const char of normalized) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    if (!node.isEnd) {
      node.isEnd = true;
      node.word = word; // Store original casing
      this._size++;
    }
  }

  /**
   * Insert multiple words at once
   * @param {string[]} words
   */
  insertAll(words) {
    for (const w of words) {
      this.insert(w);
    }
  }

  /**
   * Check if exact word exists in trie
   * @param {string} word
   * @returns {boolean}
   */
  search(word) {
    if (!word) return false;
    const node = this._traverse(word.toLowerCase().trim());
    return node !== null && node.isEnd;
  }

  /**
   * Check if any word starts with the given prefix
   * @param {string} prefix
   * @returns {boolean}
   */
  startsWith(prefix) {
    if (!prefix) return false;
    return this._traverse(prefix.toLowerCase().trim()) !== null;
  }

  /**
   * Get autocomplete suggestions for a prefix
   * @param {string} prefix - The prefix to search for
   * @param {number} [limit=10] - Maximum number of suggestions
   * @returns {string[]} Array of suggested words
   */
  suggest(prefix, limit = 10) {
    if (!prefix) return [];
    const node = this._traverse(prefix.toLowerCase().trim());
    if (!node) return [];

    const results = [];
    this._collect(node, results, limit);
    return results;
  }

  /**
   * Get number of words in the trie
   */
  get size() {
    return this._size;
  }

  /**
   * Traverse to the node corresponding to a string
   * @private
   * @param {string} str
   * @returns {TrieNode|null}
   */
  _traverse(str) {
    let node = this.root;
    for (const char of str) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char);
    }
    return node;
  }

  /**
   * DFS to collect all words from a node
   * @private
   * @param {TrieNode} node
   * @param {string[]} results
   * @param {number} limit
   */
  _collect(node, results, limit) {
    if (results.length >= limit) return;
    if (node.isEnd) {
      results.push(node.word);
    }
    for (const child of node.children.values()) {
      this._collect(child, results, limit);
      if (results.length >= limit) return;
    }
  }
}
