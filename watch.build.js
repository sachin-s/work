const esbuild = require('esbuild');
const path = require('path');
const { exec } = require('child_process'); // Added missing exec import

// Helper function to execute shell commands
const runCommand = (command, description) => {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${description}`);
        exec(command, { cwd: path.resolve(__dirname) }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${stderr}`);
                reject(err);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
};

// Main build process
const build = async () => {
    try {
        // Optionally, you can run Tailwind CSS via the `tailwindcss` CLI directly, if needed.
        // If you're running the build from esbuild directly, you may not need this.
        await runCommand(
            'tailwindcss -i ./app/javascript/styles/tailwind.css -o ./app/assets/builds/application.css --watch',
            'Watching Tailwind CSS'
        );

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed!', error);
        process.exit(1); // Exit with failure code
    }
};

// Execute the build process
build();
