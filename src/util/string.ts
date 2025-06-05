/**
 * Format a string digit template.
 * @param template The template.
 * @param args Replacements.
 * @returns Formatted string.
 */
export function formatString(template: string, ...args: string[]) {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const argIndex = parseInt(index, 10);
    return args[argIndex] !== undefined ? args[argIndex] : match;
  });
}
