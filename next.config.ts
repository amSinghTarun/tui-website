import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
	agentRules: false,
	turbopack: {
		// `website/` is an intentionally separate package inside the CLI repo.
		root: process.cwd(),
	},
};

export default nextConfig;
