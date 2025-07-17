export function cx(...classNames: (string | boolean | null | undefined)[]) {
  return classNames.flat().filter(Boolean).join(" ");
}
