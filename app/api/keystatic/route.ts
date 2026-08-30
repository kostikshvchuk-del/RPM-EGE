import { handleRoute } from "@keystatic/next/api";
import config from "../../../../keystatic.config";

export const GET = handleRoute(config);
export const POST = handleRoute(config);
