import app from "./src/app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`SampleData -> http://localhost:${port}/index.html`);  
});
