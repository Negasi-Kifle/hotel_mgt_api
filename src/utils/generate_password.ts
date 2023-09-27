import { generate } from "generate-password";

/**
 * Generates a random password
 */
export default (): string => {
  return generate({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
};
