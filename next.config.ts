import type { NextConfig } from "next";
import { withKeystatic } from "@keystatic/next/next";

const nextConfig: NextConfig = {};

export default withKeystatic()(nextConfig);
