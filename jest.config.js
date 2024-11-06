// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(mp3|wav|ogg)$': '<rootDir>/tests/__mocks__/fileMock.js',  // Aggiungi questa riga per gestire i file audio
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
