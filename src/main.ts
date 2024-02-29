import "reflect-metadata";
import { app } from "./app/app";
import { environment } from "./app/environtment";

app.listen(environment.get("PORT"), () => {
  console.log("Server is running on port 3000");
});
