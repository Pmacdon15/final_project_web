import app from "./src/app.js";

// backend\src\app.js
// \backend\src\app.js
// backend\index.js
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`SampleData -> http://localhost:${port}/index.html`);
  console.log(`Programs -> http://localhost:${port}/programs.html`);
});
