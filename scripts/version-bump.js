const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const changesetDir = path.join(__dirname, '../.changeset');
const pkgPath = path.join(__dirname, '../package.json');
const changelogPath = path.join(__dirname, '../CHANGELOG.md');
const releaseNotesDir = path.join(__dirname, '../.github');
const releaseNotesPath = path.join(releaseNotesDir, 'RELEASE_NOTES.md');

// 1. Read all files in .changeset
if (!fs.existsSync(changesetDir)) {
  console.log('No .changeset directory found.');
  process.exit(0);
}

const files = fs.readdirSync(changesetDir);
const changesetFiles = files.filter(
  (f) => f.endsWith('.md') && f !== 'README.md'
);

if (changesetFiles.length === 0) {
  console.log('No changesets found to process.');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const pkgName = pkg.name;

const categories = {
  feat: { title: '✨ Features', changelogTitle: 'Features', items: [] },
  fix: { title: '🐛 Fixes', changelogTitle: 'Fixes', items: [] },
  refactor: {
    title: '♻ Refactoring',
    changelogTitle: 'Refactoring',
    items: [],
  },
  perf: { title: '⚡ Performance', changelogTitle: 'Performance', items: [] },
  docs: {
    title: '📚 Documentation',
    changelogTitle: 'Documentation',
    items: [],
  },
};

// Regex to match the package name and bump type in frontmatter
// e.g. "kanso-ui": minor
const frontmatterRegex = new RegExp(`"${pkgName}":\\s*(major|minor|patch)`);

for (const file of changesetFiles) {
  const filePath = path.join(changesetDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Split frontmatter and markdown body
  const parts = content.split('---');
  if (parts.length < 3) continue;

  const frontmatter = parts[1];
  const body = parts.slice(2).join('---').trim();

  const match = frontmatter.match(frontmatterRegex);
  if (!match) continue;

  const bumpType = match[1];
  const lines = body
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    let category = null;
    let cleanLine = line;

    // Check for commit-like prefix
    if (/^feat(?:\([^)]+\))?!?:/i.test(line)) {
      category = 'feat';
    } else if (/^fix(?:\([^)]+\))?!?:/i.test(line)) {
      category = 'fix';
    } else if (/^refactor(?:\([^)]+\))?!?:/i.test(line)) {
      category = 'refactor';
    } else if (/^perf(?:\([^)]+\))?!?:/i.test(line)) {
      category = 'perf';
    } else if (/^docs(?:\([^)]+\))?!?:/i.test(line)) {
      category = 'docs';
    }

    // Strip prefixes
    cleanLine = cleanLine
      .replace(/^(feat|fix|refactor|perf|docs)(?:\([^)]+\))?!?:?\s*/i, '')
      .replace(/^\s*-\s*/, '') // strip leading dashes/bullets if any
      .trim();

    if (!cleanLine) continue;

    // Capitalize first letter
    cleanLine = cleanLine.charAt(0).toUpperCase() + cleanLine.slice(1);

    if (!category) {
      // Fallback logic based on changeset bump type
      if (bumpType === 'major' || bumpType === 'minor') {
        category = 'feat';
      } else {
        category = 'fix';
      }
    }

    categories[category].items.push(cleanLine);
  }
}

// Keep track of the original changelog content before versioning runs
let originalChangelogContent = '';
if (fs.existsSync(changelogPath)) {
  originalChangelogContent = fs.readFileSync(changelogPath, 'utf8');
}

// 2. Run changeset version
console.log('Running changeset version...');
execSync('pnpm changeset version', { stdio: 'inherit' });

// 3. Read the new version
const newPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const newVersion = newPkg.version;
console.log(`Bumped version to v${newVersion}`);

// 4. Generate CHANGELOG section
let changelogSection = `## v${newVersion}\n\n`;
let hasChangelogContent = false;

for (const key of ['feat', 'fix', 'refactor', 'perf', 'docs']) {
  const cat = categories[key];
  if (cat.items.length > 0) {
    changelogSection += `### ${cat.changelogTitle}\n\n`;
    for (const item of cat.items) {
      changelogSection += `- ${item}\n`;
    }
    changelogSection += '\n';
    hasChangelogContent = true;
  }
}

if (!hasChangelogContent) {
  changelogSection += `- Internal updates and improvements.\n\n`;
}

// Ensure CHANGELOG starts properly and prepend
let finalChangelog = '';
if (originalChangelogContent.startsWith('# Changelog\n\n')) {
  finalChangelog = originalChangelogContent.replace(
    '# Changelog\n\n',
    `# Changelog\n\n${changelogSection}`
  );
} else if (originalChangelogContent.startsWith('# Changelog')) {
  finalChangelog = originalChangelogContent.replace(
    '# Changelog',
    `# Changelog\n\n${changelogSection}`
  );
} else {
  finalChangelog = `# Changelog\n\n${changelogSection}${originalChangelogContent}`;
}

fs.writeFileSync(changelogPath, finalChangelog, 'utf8');
console.log('Updated CHANGELOG.md');

// 5. Generate GitHub Release Notes
let releaseNotes = '';
let hasReleaseContent = false;

for (const key of ['feat', 'fix', 'refactor', 'perf', 'docs']) {
  const cat = categories[key];
  if (cat.items.length > 0) {
    releaseNotes += `${cat.title}\n\n`;
    for (const item of cat.items) {
      releaseNotes += `• ${item}\n`;
    }
    releaseNotes += '\n';
    hasReleaseContent = true;
  }
}

if (!hasReleaseContent) {
  releaseNotes += `• Internal updates and improvements.\n\n`;
}

if (!fs.existsSync(releaseNotesDir)) {
  fs.mkdirSync(releaseNotesDir, { recursive: true });
}
fs.writeFileSync(releaseNotesPath, releaseNotes.trim() + '\n', 'utf8');
console.log('Generated .github/RELEASE_NOTES.md');
