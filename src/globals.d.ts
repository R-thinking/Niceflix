export declare global {
  type Timer = ReturnType<typeof setTimeout> | null | number;
}
