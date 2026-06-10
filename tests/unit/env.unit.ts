import { expect, test } from '@playwright/test';

import { validateEnv } from '../../src/env.config';

const REQUIRED_VAR_NAMES = [
	'BASE_URL',
	'EMPTY_USER_EMAIL',
	'EMPTY_USER_PASSWORD',
	'DEMO_USER_EMAIL',
	'DEMO_USER_PASSWORD',
] as const;

const VALID_ENV_VALUES: Record<(typeof REQUIRED_VAR_NAMES)[number], string> = {
	BASE_URL: 'https://example.test',
	EMPTY_USER_EMAIL: 'empty@example.test',
	EMPTY_USER_PASSWORD: 'EmptyPassword123!',
	DEMO_USER_EMAIL: 'demo@example.test',
	DEMO_USER_PASSWORD: 'DemoPassword123!',
};

const ORIGINAL_ENV = { ...process.env };

function assignRequiredEnv(overrides: Partial<typeof VALID_ENV_VALUES> = {}): void {
	for (const name of REQUIRED_VAR_NAMES) {
		process.env[name] = overrides[name] ?? VALID_ENV_VALUES[name];
	}
}

test.describe('validateEnv', () => {
	test.describe.configure({ mode: 'serial' });

	test.beforeEach(() => {
		process.env = { ...ORIGINAL_ENV };
		assignRequiredEnv();
	});

	test.afterAll(() => {
		process.env = ORIGINAL_ENV;
	});

	test('returns required environment values when all required variables are set', { tag: ['@p1'] }, () => {
		// Arrange
		assignRequiredEnv({ DEMO_USER_PASSWORD: 'CustomDemoPassword!' });

		// Act
		const result = validateEnv();

		// Assert
		expect(result).toEqual({
			...VALID_ENV_VALUES,
			DEMO_USER_PASSWORD: 'CustomDemoPassword!',
		});
	});

	test('throws when one required variable is missing', { tag: ['@p1'] }, () => {
		// Arrange
		delete process.env.EMPTY_USER_EMAIL;

		// Act
		const runValidation = () => validateEnv();

		// Assert
		expect(runValidation).toThrowError('Missing or empty environment variables:');
		expect(runValidation).toThrowError('  - EMPTY_USER_EMAIL');
	});

	test('treats whitespace-only values as empty and lists all missing variables', { tag: ['@p1'] }, () => {
		// Arrange
		process.env.BASE_URL = '   ';
		process.env.DEMO_USER_PASSWORD = '';

		// Act
		const runValidation = () => validateEnv();

		// Assert
		expect(runValidation).toThrowError(
			'Missing or empty environment variables:\n  - BASE_URL\n  - DEMO_USER_PASSWORD'
		);
	});

	test('does not require optional display-name variables', { tag: ['@p1'] }, () => {
		// Arrange
		delete process.env.EMPTY_USER_DISPLAY_NAME;
		delete process.env.DEMO_USER_DISPLAY_NAME;

		// Act
		const result = validateEnv();

		// Assert
		expect(result).toEqual(VALID_ENV_VALUES);
	});
});
