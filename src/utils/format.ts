const SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

/**
 * Format a byte count into a human-readable string.
 * @example formatSize(1536) → "1.5 KB"
 */
export function formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), SIZE_UNITS.length - 1);
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(i > 0 ? 1 : 0)} ${SIZE_UNITS[i]}`;
}

export interface ItemCount {
    files: number;
    dirs: number;
}
