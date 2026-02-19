const DEBUG = localStorage.getItem("DEBUG") === "true"

if (DEBUG) {
  import("./debug.css")
  import("./controls.js").then((debugControls) => {
    debugControls.startupControls()
  })
  import("./info.js").then((debugInfo) => {
    debugInfo.showDebugData()
  })
}
