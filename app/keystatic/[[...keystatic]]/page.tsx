import { makePage } from "@keystatic/next/page";
import config from "../../../keystatic.config";

export const { GET, POST } = makePage(config);
