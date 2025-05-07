// TODO: move this to a common place

import { By } from "@serenity-js/web";

export function byLabel(label: string) {
  return By.deepCss(getPlaywrightByLabelSelector(label));
}
export function byPlaceholder(placeholder: string) {
  return By.deepCss(getPlaywrightByPlaceholderSelector(placeholder));
}

// See https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/utils/isomorphic/locatorUtils.ts

function getPlaywrightByLabelSelector(text: string | RegExp, options?: { exact?: boolean }): string {
  return "internal:label=" + escapeForTextSelector(text, !!options?.exact);
}
function getPlaywrightByPlaceholderSelector(text: string | RegExp, options?: { exact?: boolean }): string {
  return getByAttributeTextSelector("placeholder", text, options);
}
function getByAttributeTextSelector(attrName: string, text: string | RegExp, options?: { exact?: boolean }): string {
  return `internal:attr=[${attrName}=${escapeForAttributeSelector(text, options?.exact || false)}]`;
}
function escapeForTextSelector(text: string | RegExp, exact: boolean): string {
  if (typeof text !== "string") return escapeRegexForSelector(text);
  return `${JSON.stringify(text)}${exact ? "s" : "i"}`;
}
function escapeRegexForSelector(re: RegExp): string {
  // Unicode mode does not allow "identity character escapes", so we do not escape and
  // hope that it does not contain quotes and/or >> signs.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape
  // TODO: rework RE usages in internal selectors away from literal representation to json, e.g. {source,flags}.
  if (re.unicode || (re as any).unicodeSets) return String(re);
  // Even number of backslashes followed by the quote -> insert a backslash.
  return String(re)
    .replace(/(^|[^\\])(\\\\)*(["'`])/g, "$1$2\\$3")
    .replace(/>>/g, "\\>\\>");
}
function escapeForAttributeSelector(value: string | RegExp, exact: boolean): string {
  if (typeof value !== "string") return escapeRegexForSelector(value);
  // TODO: this should actually be
  //   cssEscape(value).replace(/\\ /g, ' ')
  // However, our attribute selectors do not conform to CSS parsing spec,
  // so we escape them differently.
  return `"${value.replace(/\\/g, "\\\\").replace(/["]/g, '\\"')}"${exact ? "s" : "i"}`;
}
