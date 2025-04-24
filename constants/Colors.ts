/**
 * Color palette for the project.
 * Organized by purpose and theme (light/dark).
 */

const Colors = {
  // Core brand colors
  primary: '#447097',        // Primary accent (buttons, links)
  secondary: '#2F3A56',      // Secondary accent (headers, emphasis)

  // Background and neutral tones
  background: '#D6E6E6',     // Default background
  gray: '#A8CED7',           // Neutral elements (e.g. cards)
  lightGray: '#D6E6E6',      // Light variant for borders or highlights

  // Status indicators
  error: '#FF4C4C',          // Error messages, invalid inputs
  success: '#4CAF50',        // Success messages, valid inputs

  // Form elements
  inputBorder: '#A8CED7',    // Input field borders

  // Themed colors
  light: {
    text: '#2F3A56',         // Primary text color (light mode)
    background: '#D6E6E6',   // Background (light mode)
    tint: '#447097',         // Active elements (light mode)
    icon: '#2F3A56',         // Icons (light mode)
  },
  dark: {
    text: '#D6E6E6',         // Primary text color (dark mode)
    background: '#2F3A56',   // Background (dark mode)
    tint: '#A8CED7',         // Active elements (dark mode)
    icon: '#A8CED7',         // Icons (dark mode)
  },
};

export default Colors;
