#!/usr/bin/env node

import { Command } from 'commander';
import { addCommand } from './commands/add';

function main() {
  const program = new Command();

  program
    .name('kanso-ui')
    .description('CLI to manage Kanso UI components')
    .version('0.1.0');

  program.addCommand(addCommand);

  program.parse();
}

main();
