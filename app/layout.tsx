import type {Metadata, Viewport} from 'next';
import type {ReactNode} from 'react';
import './globals.css';

export const metadata: Metadata = {
	title: 'Cloud TUI — Local-first coding agent',
	description:
		'Cloud TUI is a local-first terminal coding agent with context management, worktree-aware parallel work, approval checkpoints, and durable sessions.',
};

export const viewport: Viewport = {
	themeColor: '#151410',
};

export default function RootLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
