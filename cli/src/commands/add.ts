import { Command } from 'commander';
import prompts from 'prompts';
import pc from 'picocolors';
import ora from 'ora';
import { fetchComponent } from '../utils/registry';
import { writeComponentFile } from '../utils/fs';
import { installDependencies } from '../utils/package-manager';

export const addCommand = new Command('add')
  .description('Add a Kanso UI component to your project')
  .argument('[component]', 'The name of the component to add')
  .action(async (componentName: string | undefined) => {
    let name = componentName;

    if (!name) {
      const response = await prompts({
        type: 'text',
        name: 'component',
        message: 'Which component would you like to add?',
        validate: (value) =>
          value.trim().length > 0 ? true : 'Please enter a component name.',
      });

      if (!response.component) {
        process.exit(0);
      }

      name = response.component;
    }

    if (!name) {
      console.log(pc.red('No component specified.'));
      process.exit(1);
    }

    const spinner = ora(`Fetching ${name}...`).start();

    try {
      const component = await fetchComponent(name);

      if (!component) {
        spinner.fail(
          `Component ${pc.red(name)} not found in the Kanso UI registry.`
        );
        process.exit(1);
      }

      spinner.succeed(`Found component: ${pc.green(component.title)}`);

      const cwd = process.cwd();

      // Write files
      const writeSpinner = ora(`Writing files...`).start();
      try {
        if (component.files && component.files.length > 0) {
          for (const file of component.files) {
            writeComponentFile(cwd, file.path, file.content);
          }
          writeSpinner.succeed(`Added ${component.files.length} files.`);
        } else {
          // Fallback if no `files` array
          writeComponentFile(cwd, component.filePath, component.source);
          writeSpinner.succeed(`Added ${component.filePath}`);
        }
      } catch (error) {
        writeSpinner.fail(`Failed to write files.`);
        console.error(error);
        process.exit(1);
      }

      // Install dependencies
      if (component.dependencies && component.dependencies.length > 0) {
        await installDependencies(component.dependencies, cwd);
      }

      console.log('');
      console.log(pc.green(`✔ Successfully added ${name}.`));
    } catch (error) {
      spinner.fail(`Failed to add component.`);
      console.error(pc.red((error as Error).message));
      process.exit(1);
    }
  });
