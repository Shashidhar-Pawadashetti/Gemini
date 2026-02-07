import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

import '@testing-library/jest-dom';
