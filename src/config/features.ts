// Block-related features
export const BLOCK_FEATURES = {
  showMinerDetails: false,
  showTransactionCount: false,
  blockCount: 10,
} as const;

// Transaction-related features
export const TRANSACTION_FEATURES = {
  latestTransactions: false,
  enabled: false,
} as const;

// Gas-related features
export const GAS_FEATURES = {
  historyPoints: 100,
} as const;

// Combine all features into a single export for convenience
export const FEATURES = {
  blocks: BLOCK_FEATURES,
  transactions: TRANSACTION_FEATURES,
  gas: GAS_FEATURES,
} as const;
