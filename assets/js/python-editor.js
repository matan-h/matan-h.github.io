
// Define global variables
const pyodideReadyPromise = load_pyodide();
const output = document.getElementById("output");
const codeErrorElem = document.getElementById("code-error");
const params = new URLSearchParams(window.location.search);
const hebrewMode = params.has("hebrew_mode") ? params.get("hebrew_mode") : false;

let runCode = null;

// Initialize Pyodide
async function load_pyodide() {
  const pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    stdin: window.prompt,
    stdout: addTextToOutput,
    stderr: addTextToOutput,
  });

  // Load packages
  await pyodide.loadPackage("micropip");
  await pyodide.runPythonAsync(`
  import micropip
  for i in "ddebug[no-pdbr] markdown${hebrewMode?' hebrew-python':''}".split(' '):
    print('installing ',i)
    await micropip.install(i,keep_going=True)
  `)

  // Load core
  const corePythonCode = await fetch(
    "/assets/python/core.py"
  ).then((response) => response.text());
  await pyodide.runPythonAsync(corePythonCode);

  // Get the run_code function
  runCode = pyodide.globals.get("run_code");

  // Set the output to "Ready!"
  output.value = "Ready!";

  return pyodide;
}

// Add text to the output element
function addTextToOutput(text) {
  output.value += text + "\n";
}

// Run the given Python code
async function run(code) {
  // Clear the output element
  output.value = "";

  // Get the Hebrew mode setting
  const hebrewMode = params.has("hebrew_mode") ? params.get("hebrew_mode") : false;

  // Get Pyodide
  const pyodide = await pyodideReadyPromise;

  try {
    // Run the Python code
    const outputMap = runCode(code, hebrewMode).toJs();

    // If there is an error, display it
    if (outputMap.has("error")) {
      codeErrorElem.innerHTML = outputMap.get("error");
    } else {
      // Clear the error message
      codeErrorElem.innerHTML = "";
    }
  } catch (err) {
    // Display the error in the output element
    output.value += err;
  }
}

// Get the code parameters from the URL search query
const codeString = params.get("code");

// Initialize the code editor
function main() {
  const editor = monaco.editor.create(document.getElementById("container"), {
    value: codeString || "def main():\n\tprint('Hello world!')\nmain()",
    language: "python",
    theme: "vs-dark",
    readOnly: false,
  });

  // Add an event listener to the "Run" button
  document.getElementById("run").onclick = () => {
    run(editor.getValue());
  };
}

// Start the application
document.addEventListener("DOMContentLoaded", main);
