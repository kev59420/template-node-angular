import dataSourceLocal from "./dataSourceLocal";
import dataSourceProd from "./dataSourceProd";

export default process.env.NODE_ENV === "production"
  ? dataSourceProd
  : dataSourceLocal;