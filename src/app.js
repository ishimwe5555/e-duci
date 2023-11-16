async function loadApp() {
    if (process.env.NODE_ENV === 'production') {
      // In production, use the transpiled CommonJS modules
      await import("../build/server.js");
    } else {
      // In development, use the original ES Modules
      await import("./server.mjs");
    }
  }
  
  loadApp();
  