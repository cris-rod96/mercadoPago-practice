import server from "./src/server.js";
import { PORT } from "./src/config/index.js";

server.listen(PORT, () => {
  console.log(`Server raised in PORT: ${PORT}`);
});
