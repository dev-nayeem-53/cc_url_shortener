import {defineConfig} from "cz-git";

const types = [
  {value: 'feat', name: 'feat:     ✨  A new feature', emoji: '✨'},
  {value: 'fix', name: 'fix:      🐛  A bug fix', emoji: '🐛'},
  {value: 'docs', name: 'docs:     📝  Documentation only changes', emoji: '📝'},
  {value: 'style', name: 'style:    💄  Changes that do not affect the meaning of the code', emoji: '💄'},
  {value: 'refactor', name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature', emoji: '♻️'},
  {value: 'perf', name: 'perf:     ⚡️  A code change that improves performance', emoji: '⚡️'},
  {value: 'test', name: 'test:     ✅  Adding missing tests or correcting existing tests', emoji: '✅'},
  {value: 'build', name: 'build:    📦️   Changes that affect the build system or external dependencies', emoji: '📦️'},
  {value: 'ci', name: 'ci:       🎡  Changes to our CI configuration files and scripts', emoji: '🎡'},
  {value: 'chore', name: 'chore:    🔨  Other changes that don\'t modify src or test files', emoji: '🔨 '},
  {value: 'revert', name: 'revert:   ⏪️  Reverts a previous commit', emoji: '⏪️'},
]

export default defineConfig({
  extends: ['@commitlint/config-conventional'], formatter: '@commitlint/format',
  rules: {
    'type-enum': [2, 'always', types.map(type => type.value)],
  },
  prompt: {
    types,
    markBreakingChangeMode: true,
    issuePrefixes: [{value: "closes", name: "closes: ISSUES has been processed"}],
    useEmoji: true,
    allowBreakingChanges: ['feat', 'fix', 'refactor'],
    allowEmptyScopes: false,
  }
})
