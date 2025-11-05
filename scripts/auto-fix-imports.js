#!/usr/bin/env node

/**
 * Automated Import Migration Script
 * Migrates old @/components/ui/ imports to /src/ui/ primitives
 * 
 * Usage:
 *   node scripts/auto-fix-imports.js           # Dry-run mode (preview only)
 *   node scripts/auto-fix-imports.js --apply   # Apply changes
 */

const fs = require('fs');
const path = require('path');

// Import mapping: old path -> new path
const IMPORT_MAPPINGS = {
  '@/components/ui/button': '@/ui/Button',
  '@/components/ui/card': '@/ui/Card',
  '@/components/ui/badge': '@/ui/Badge',
  '@/components/ui/input': '@/ui/Input',
  '@/components/ui/textarea': '@/ui/Textarea',
  '@/components/ui/select': '@/ui/Select',
  '@/components/ui/tag': '@/ui/Tag',
  // Add more mappings as needed
};

// Component name mappings (if component names changed)
const COMPONENT_NAME_MAPPINGS = {
  // Most stay the same, but add exceptions here if needed
};

const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /scripts/,
  /supabase/,
  /public/,
  /\.md$/,
  /integrations\/supabase/,
  /vite-env\.d\.ts/,
  /src\/ui\//,  // Don't modify the ui primitives themselves
  /src\/components\/ui\//,  // Don't modify the old ui components (they re-export)
];

class ImportMigrator {
  constructor(dryRun = true) {
    this.dryRun = dryRun;
    this.changes = [];
    this.errors = [];
  }

  shouldExclude(filePath) {
    return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
  }

  detectOldImports(content) {
    const imports = [];
    const importRegex = /import\s+(?:(\{[^}]+\})|(\w+))\s+from\s+['"](@\/components\/ui\/\w+)['"]/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const namedImports = match[1];
      const defaultImport = match[2];
      const importPath = match[3];
      
      if (IMPORT_MAPPINGS[importPath]) {
        imports.push({
          fullMatch: match[0],
          namedImports,
          defaultImport,
          oldPath: importPath,
          newPath: IMPORT_MAPPINGS[importPath],
          index: match.index
        });
      }
    }
    
    return imports;
  }

  migrateImport(importInfo) {
    const { namedImports, defaultImport, newPath } = importInfo;
    
    if (namedImports) {
      // Handle named imports: import { Button, buttonVariants } from '@/components/ui/button'
      return `import ${namedImports} from '${newPath}'`;
    } else if (defaultImport) {
      // Handle default imports: import Button from '@/components/ui/button'
      return `import { ${defaultImport} } from '${newPath}'`;
    }
    
    return null;
  }

  processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const oldImports = this.detectOldImports(content);
      
      if (oldImports.length === 0) {
        return null; // No changes needed
      }

      let newContent = content;
      let offset = 0;

      // Sort imports by index in reverse order to maintain correct positions
      oldImports.sort((a, b) => b.index - a.index);

      oldImports.forEach(importInfo => {
        const newImport = this.migrateImport(importInfo);
        
        if (newImport) {
          const beforeLength = newContent.length;
          newContent = 
            newContent.substring(0, importInfo.index) +
            newImport +
            newContent.substring(importInfo.index + importInfo.fullMatch.length);
          
          const afterLength = newContent.length;
          offset += (afterLength - beforeLength);
        }
      });

      return {
        filePath,
        oldImports,
        newContent,
        originalContent: content
      };

    } catch (error) {
      this.errors.push({
        filePath,
        error: error.message
      });
      return null;
    }
  }

  scanDirectory(dir) {
    const files = [];

    function walk(currentPath) {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (EXCLUDE_PATTERNS.some(pattern => pattern.test(fullPath))) {
          continue;
        }

        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
          files.push(fullPath);
        }
      }
    }

    walk(dir);
    return files;
  }

  run(srcDir) {
    console.log('🔍 Scanning for old imports...\n');
    
    const files = this.scanDirectory(srcDir);
    console.log(`Found ${files.length} TypeScript/TSX files\n`);

    files.forEach(file => {
      const result = this.processFile(file);
      
      if (result) {
        this.changes.push(result);
      }
    });

    this.printReport();

    if (!this.dryRun && this.changes.length > 0) {
      this.applyChanges();
    }
  }

  printReport() {
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║         📦 IMPORT MIGRATION REPORT                               ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

    if (this.changes.length === 0) {
      console.log('✅ No old imports found! All files are using /src/ui/ primitives.\n');
      return;
    }

    console.log(`Found ${this.changes.length} files with old imports:\n`);

    this.changes.forEach((change, index) => {
      console.log(`${index + 1}. ${change.filePath}`);
      console.log('   Changes:');
      
      change.oldImports.forEach(importInfo => {
        const newImport = this.migrateImport(importInfo);
        console.log(`   ❌ ${importInfo.fullMatch}`);
        console.log(`   ✅ ${newImport}`);
      });
      
      console.log();
    });

    if (this.errors.length > 0) {
      console.log('⚠️  ERRORS:\n');
      this.errors.forEach(error => {
        console.log(`   ${error.filePath}`);
        console.log(`   Error: ${error.error}\n`);
      });
    }

    console.log('─────────────────────────────────────────────────────────────────');
    console.log(`Total files to modify: ${this.changes.length}`);
    console.log(`Total import statements to migrate: ${this.changes.reduce((sum, c) => sum + c.oldImports.length, 0)}`);
    console.log('─────────────────────────────────────────────────────────────────\n');

    if (this.dryRun) {
      console.log('💡 DRY RUN MODE - No changes were made');
      console.log('   To apply these changes, run:');
      console.log('   node scripts/auto-fix-imports.js --apply\n');
    }
  }

  applyChanges() {
    console.log('📝 Applying changes...\n');

    let successCount = 0;
    let failCount = 0;

    this.changes.forEach(change => {
      try {
        fs.writeFileSync(change.filePath, change.newContent, 'utf-8');
        console.log(`✅ ${change.filePath}`);
        successCount++;
      } catch (error) {
        console.log(`❌ ${change.filePath} - ${error.message}`);
        failCount++;
      }
    });

    console.log('\n─────────────────────────────────────────────────────────────────');
    console.log(`✅ Successfully updated: ${successCount} files`);
    if (failCount > 0) {
      console.log(`❌ Failed: ${failCount} files`);
    }
    console.log('─────────────────────────────────────────────────────────────────\n');

    console.log('🎉 Migration complete!\n');
    console.log('Next steps:');
    console.log('1. Review the changes with: git diff');
    console.log('2. Test your application');
    console.log('3. Run: npm run build');
    console.log('4. Commit changes if everything works\n');
  }
}

// Main execution
const args = process.argv.slice(2);
const applyMode = args.includes('--apply');
const srcDir = path.join(process.cwd(), 'src');

const migrator = new ImportMigrator(!applyMode);
migrator.run(srcDir);

process.exit(0);
