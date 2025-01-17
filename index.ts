import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

const tasksConfig = {
  tasks: [
    {
      name: 'Basic Singleton',
      folder: '1-singletons',
      entry: 'basic-singleton.js',
    },
    {
      name: 'Singleton Creator',
      folder: '1-singletons',
      entry: 'singleton-creator.js',
    },
    {
      name: 'Observer Pattern',
      folder: '4-observer-pattern',
      entry: 'index.js',
    },
    {
      name: 'Data Transformation',
      folder: '5-data-transformation',
      entry: 'index.js',
    },
    {
      name: 'Object Deep Copy',
      folder: '6-object-manipulation',
      entry: 'deep-copy.js',
    },
    {
      name: 'Object Equivalence',
      folder: '6-object-manipulation',
      entry: 'is-equal.js',
    },
  ],
};

type TaskConfig = {
  name: string;
  folder: string;
  entry: string;
};

const runTask = async (task: TaskConfig) => {
  try {
    const taskPath = path.join(__dirname, 'tasks', task.folder, task.entry);

    if (!fs.existsSync(taskPath)) {
      console.error(`Entry file ${task.entry} for ${task.name} not found.`);
      return;
    }

    const taskModule = await import(taskPath);
    if (taskModule.runDemos) {
      console.log(`Running demos for ${task.name}...\n`);
      await taskModule.runDemos();
      console.log(`\nFinished running demos for ${task.name}.\n`);
    } else {
      console.log(`No runDemos function found in ${task.name}.`);
    }
  } catch (error) {
    console.error(`Error running ${task.name}:`, error);
  }
};

const mainMenu = async () => {
  let continueLoop = true;

  while (continueLoop) {
    const { selectedTask } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTask',
        message: 'Choose a task to run:',
        choices: tasksConfig.tasks.map((task) => task.name),
      },
    ]);

    const taskConfig = tasksConfig.tasks.find(
      (task) => task.name === selectedTask,
    );
    if (taskConfig) {
      await runTask(taskConfig);
    } else {
      console.error('Invalid task selection.');
    }

    const { continueSelection } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueSelection',
        message: 'Do you want to select another task?',
        default: false,
      },
    ]);

    continueLoop = continueSelection;
  }

  console.log('Goodbye!');
};

mainMenu();
