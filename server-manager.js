import { spawn, exec } from 'child_process';
import { loadEnv } from 'vite';

import { onSectionUpdate } from './src/helper-functions/onSectionUpdate.js';

// constants
const isProduction = process.env.NODE_ENV === 'production';
const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// Start server.js in a subprocess
// returns a function to stop the server and remove listeners
const startServer = () => {
	const serverProcess = spawn('node', ['server.js'], {
		cwd: process.cwd(), // Set the current working directory to the script's directory
		stdio: 'inherit' // Inherit stdio to display output in the parent process
	});

	// Handle subprocess exit
	serverProcess.on('close', (code) => {
		console.log(`server.js exited with code ${code}`);
	});

	// Handle errors
	serverProcess.on('error', (err) => {
		console.error('Failed to start server.js:', err);
	});

	return () => {
		console.log('Stopping server.js...');
		serverProcess.kill('SIGINT'); // Send SIGINT to the subprocess
	};
};

let stopCurrentServerProcess = startServer();

// stop server process on exit
process.on('exit', () => {
	stopCurrentServerProcess();
});

// run build command on projects change
let updating = Promise.resolve(); // when updating, this will be set to a promise which resolves when the build is done
let updateQueued = false; // when an update is queued (because the last update is still running), this will be set to true
onSectionUpdate({
	supabaseURL: env.SUPABASE_URL,
	supabaseAnonKey: env.SUPABASE_ANON_KEY,
	supabaseTableName: env.SUPABASE_TABLE_NAME,
}, () => {
	if (updateQueued) {
		console.log("Project updated: update already queued, skipping...");
		return;
	}

	updateQueued = true;
	console.log("Project updated: update queued...");
	updating.then(() => {
		updateQueued = false;
		updating = new Promise((res) => {
			if (isProduction) {
				// rebuild the project
				console.log("Project updated: rebuilding...");
				exec("npm run build:without-deploy", (error, stdout, stderr) => {
					console.log(error, stdout, stderr);

					// restart the server
					console.log("Project updated: restarting server...");
					stopCurrentServerProcess();
					exec("npm run deploy", (error, stdout, stderr) => {
						console.log(error, stdout, stderr);
						stopCurrentServerProcess = startServer();
						res();
					});
				});
			}
			else {
				console.log("Project updated: restarting server...");
				stopCurrentServerProcess();
				stopCurrentServerProcess = startServer();
			}
		});
	});
});
