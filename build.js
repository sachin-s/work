const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');
const postCssPlugin = require('esbuild-postcss'); // Corrected import
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // Added missing exec import
const copyPlugin = require('esbuild-plugin-copy'); // Plugin to copy assets

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
        // Run JavaScript bundling (equivalent to yarn build:js)
        await runCommand(
            'esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets --loader:.ttf=file --loader:.js=jsx',
            'Bundling JavaScript'
        );

        // Run CSS bundling with Sass and PostCSS (equivalent to yarn build:css)
        await esbuild.build({
            entryPoints: ['app/javascript/styles/tailwind.scss'], // Entry for Sass
            bundle: true,
            outdir: 'app/assets/builds',
            loader: {
                '.scss': 'css',
                '.ttf': 'file',  // Add loader for .ttf files to be copied
            },
            plugins: [
                sassPlugin(), // To handle Sass files
                postCssPlugin({
                    plugins: [
                        autoprefixer(),
                        cssnano(), // Minify CSS
                    ],
                }),
                copyPlugin({
                    src: path.resolve(__dirname, 'app/assets/fonts/*'), // Path to font files
                    dest: path.resolve(__dirname, 'app/assets/builds/'), // Output folder for fonts
                }),
            ],
            minify: true, // Minify CSS
        });

        // Optionally, you can run Tailwind CSS via the `tailwindcss` CLI directly, if needed.
        // If you're running the build from esbuild directly, you may not need this.
        await runCommand(
            'tailwindcss -i ./app/assets/builds/tailwind.css -o ./app/assets/builds/application.css',
            'Building Tailwind CSS'
        );

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed!', error);
        process.exit(1); // Exit with failure code
    }
};

// Execute the build process
build();
