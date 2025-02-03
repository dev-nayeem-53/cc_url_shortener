import * as os from "node:os";
import {spawn} from "node:child_process";


function openTerminal(command, cwd) {
  if (os.platform() === "win32") {
    // Windows: Use `start` with `cmd.exe` to run the command
    spawn("cmd.exe", ["/c", `start cmd.exe /k "cd /d ${cwd} && ${command}"`], { shell: true });
  } else if (os.platform() === "darwin") {
    // macOS: Use `osascript` to send commands to Terminal
    spawn("osascript", [
      "-e",
      `tell application "Terminal" to do script "cd ${cwd} && ${command}"`,
    ]);
  } else if (os.platform() === "linux") {
    // Linux: Use `x-terminal-emulator` or a specific terminal
    spawn("x-terminal-emulator", ["-e", `bash -c 'cd ${cwd} && ${command}; exec bash'`], {
      shell: true,
    });
  } else {
    console.error("Unsupported platform.");
  }
}

const backendPath = "./packages/backend"; // Adjust path as needed
const webAppPath = "./packages/web_app"; // Adjust path as needed

// Open terminals for backend and web app
openTerminal("npm run start:dev", backendPath);
openTerminal("npm run dev", webAppPath);
