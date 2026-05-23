import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                process: 'readonly',
                console: 'readonly',
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
            },
        },
    },
    {
        files: ['**/*.ts'],
        ignores: ['**/*.config.ts'],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            '@typescript-eslint': ts,
            prettier: prettier,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // Enforce consistent indentation (4 spaces in this case)
            indent: ['error', 4],
            // Enforce the use of single quotes for strings
            quotes: ['error', 'single'],
            // Enforce semicolons at the end of statements
            semi: ['error', 'always'],
            // Enforce consistent line breaks (LF for Unix)
            'linebreak-style': ['error', 'unix'],
            // Require the use of === and !== (no implicit type conversions)
            eqeqeq: ['error', 'always'],
            // Enforce a maximum line length (usually 80 or 100 characters)
            'max-len': ['error', { code: 100 }],
            // Enable Prettier as a lint rule
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: true,
                },
            ],
            // Auto-sort imports
            'simple-import-sort/imports': 'error',
            // Auto-sort exports
            'simple-import-sort/exports': 'error',
        },
    },
];
