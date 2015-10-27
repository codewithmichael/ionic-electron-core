import app from 'app';
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';

// Report crashes.
crashReporter.start();

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // Except on Mac.
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // Load index.html into the window.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Dereference the window object when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
