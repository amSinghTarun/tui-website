'use client';

import {useEffect, useState} from 'react';

type ContextStage = 'fresh' | 'artifact' | 'summary';
type Approval = 'approved' | 'rejected' | undefined;

type Session = {
	description: string;
	id: string;
	lastOpened: string;
	title: string;
};

const heroFeatures = [
	{
		description: 'Preserves useful decisions without carrying every old edit.',
		href: '#context',
		name: 'Contextual memory',
		number: '01',
	},
	{
		description:
			'Delegates independent work while the main agent keeps moving.',
		href: '#workflow',
		name: 'Parallel sub-agents',
		number: '02',
	},
	{
		description: 'Gives each focused task a visible Git merge path.',
		href: '#workflow',
		name: 'Isolated worktrees',
		number: '03',
	},
	{
		description: 'Keeps commands and file tools inside the project you opened.',
		href: '#safety',
		name: 'Workspace boundary',
		number: '04',
	},
	{
		description: 'Pauses risky actions and turns unknowns into questions.',
		href: '#control',
		name: 'Human checkpoints',
		number: '05',
	},
	{
		description: 'Turns an implementation request into trackable work.',
		href: '#plan',
		name: 'Visible task plans',
		number: '06',
	},
	{
		description: 'Returns you to local project conversations with /session.',
		href: '#sessions',
		name: 'Restorable sessions',
		number: '07',
	},
] as const;

const overviewFeatures = [
	{
		description:
			'Long conversations stay useful without dragging every historical file rewrite into the next turn.',
		index: '01',
		symbol: '⌁',
		title: 'Context that earns its place',
	},
	{
		description:
			'Split independent work across focused sub-agents while the main agent keeps the implementation moving.',
		index: '02',
		symbol: '⌘',
		title: 'Parallel by design',
	},
	{
		description:
			'Risky actions and material decisions pause for your answer instead of becoming silent side effects.',
		index: '03',
		symbol: '⊹',
		title: 'Guardrails in the flow',
	},
	{
		description:
			'Return to a project and pick up the conversation where you left it, locally.',
		index: '04',
		symbol: '◫',
		title: 'Sessions that remember',
	},
] as const;

const planSteps = [
	'Inspect the existing settings architecture',
	'Create accessible settings navigation',
	'Add keyboard focus behavior',
	'Verify the updated interaction flow',
];

const planMessages = [
	'Working on keyboard focus behavior…',
	'Verifying the updated interaction flow…',
	'Implementation plan complete.',
	'Inspecting the existing settings architecture…',
];

const savedSessions: Session[] = [
	{
		description:
			'Keyboard navigation is in place. Two focused worktrees completed; focus wrapping is next.',
		id: '84d1a2f3',
		lastOpened: 'last opened today, 10:42',
		title: 'Settings navigation',
	},
	{
		description:
			'The billing API mapping is ready. The remaining decision is how to surface proration.',
		id: '26ab9e10',
		lastOpened: 'last opened yesterday',
		title: 'Billing API review',
	},
	{
		description:
			'Initial visual system is established, with the mobile navigation pass still queued.',
		id: '7c4e2da1',
		lastOpened: 'last opened Sep 18',
		title: 'Marketing site refresh',
	},
];

function contextStageFor(value: number): ContextStage {
	if (value >= 82) return 'summary';
	if (value >= 42) return 'artifact';
	return 'fresh';
}

export default function ProductSite() {
	const [contextValue, setContextValue] = useState(12);
	const [artifactInspected, setArtifactInspected] = useState(false);
	const [hasConflict, setHasConflict] = useState(false);
	const [outsideWorkspaceBlocked, setOutsideWorkspaceBlocked] = useState(false);
	const [approval, setApproval] = useState<Approval>();
	const [selectedAnswer, setSelectedAnswer] = useState<string>();
	const [completedTasks, setCompletedTasks] = useState(2);
	const [selectedSession, setSelectedSession] = useState<Session>(
		savedSessions[0],
	);
	const [copyStatus, setCopyStatus] = useState('');

	const stage = contextStageFor(contextValue);
	const contextNote =
		stage === 'summary'
			? 'A durable summary now carries the implementation state, decisions, and next step.'
			: stage === 'artifact'
			? artifactInspected
				? 'The full historical update is available locally when the agent needs it.'
				: 'Oversized historical updates become local artifacts instead of permanent prompt bulk.'
			: 'Slide to see how a session gets lighter without losing its useful history.';

	const approvalLabel =
		approval === 'approved'
			? 'APPROVED'
			: approval === 'rejected'
			? 'REJECTED'
			: 'AWAITING INPUT';
	const approvalResult =
		approval === 'approved'
			? 'Approved. The command can now continue in the active workspace.'
			: approval === 'rejected'
			? 'Rejected. The command remains unexecuted.'
			: 'The command remains paused until you decide.';
	const inputResult = selectedAnswer
		? 'Captured: ' +
		  selectedAnswer +
		  '. The agent can now proceed with that constraint.'
		: 'Choose an answer to continue the focused implementation.';

	useEffect(() => {
		document.documentElement.classList.add('has-js');
		const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

		if (typeof IntersectionObserver === 'undefined') {
			elements.forEach(element => element.classList.add('is-visible'));
			return () => document.documentElement.classList.remove('has-js');
		}

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				});
			},
			{threshold: 0.12},
		);

		elements.forEach(element => observer.observe(element));

		return () => {
			observer.disconnect();
			document.documentElement.classList.remove('has-js');
		};
	}, []);

	const advancePlan = () => {
		setCompletedTasks(current =>
			current >= planSteps.length ? 2 : Math.min(current + 1, planSteps.length),
		);
	};

	const copyCommand = async () => {
		try {
			await navigator.clipboard.writeText('cloud-tui');
			setCopyStatus('Copied to clipboard');
		} catch {
			setCopyStatus('Copy cloud-tui from the command above');
		}
	};

	const selectNewSession = () => {
		setSelectedSession({
			description:
				'New local conversation ready. Cloud TUI will start with the project directory you opened.',
			id: 'new-session',
			lastOpened: 'created now',
			title: 'New local session',
		});
	};

	return (
		<>
			<div className="site-grain" aria-hidden="true" />
			<div className="site-shell" id="top">
				<header className="navigation wrap">
					<a className="brand" href="#top" aria-label="Cloud TUI home">
						<span className="brand-mark" aria-hidden="true">
							◈
						</span>
						<span>CLOUD TUI</span>
					</a>
					<nav aria-label="Primary navigation">
						<a href="#context">Context</a>
						<a href="#workflow">Workflow</a>
						<a href="#safety">Control</a>
						<a href="#sessions">Sessions</a>
					</nav>
					<a className="nav-command" href="https://www.npmjs.com/package/cloud-tui" target="_blank">
						cloud-tui <span>↗</span>
					</a>
				</header>

				<main>
					<section className="hero wrap" aria-labelledby="hero-title">
						<div className="hero-copy" data-reveal>
							<p className="eyebrow">
								<span /> LOCAL-FIRST CODING AGENT
							</p>
							<h1 id="hero-title">
								The coding agent that stays in your terminal—
								<em>and in your control.</em>
							</h1>
							<p className="hero-lede">
								Cloud TUI understands the project you opened, carries useful
								context forward, and coordinates real implementation work
								without treating your workspace like a black box.
							</p>
							<div className="hero-actions">
								<a className="button button-dark" href="#install">
									Run cloud-tui <span>↓</span>
								</a>
								<a className="text-link" href="#workflow">
									Explore the workflow <span>↓</span>
								</a>
							</div>
							<div className="hero-proof">
								<div>
									<strong>LOCAL</strong>
									<span>workspace sessions</span>
								</div>
								<div>
									<strong>HUMAN</strong>
									<span>approval checkpoints</span>
								</div>
								<div>
									<strong>GIT</strong>
									<span>worktree coordination</span>
								</div>
							</div>
						</div>

						<aside
							className="hero-feature-index"
							data-reveal
							aria-label="Explore Cloud TUI capabilities"
						>
							<div className="feature-index-topline">
								<span>CAPABILITY INDEX</span>
								<b>07 SYSTEMS</b>
							</div>
							<div className="feature-index-list">
								{heroFeatures.map(feature => (
									<a href={feature.href} key={feature.number}>
										<span className="feature-index-number">
											{/* {feature.number} */}
										</span>
										<span className="feature-index-copy">
											<strong>{feature.name}</strong>
											<small>{feature.description}</small>
										</span>
										<i aria-hidden="true">↘</i>
									</a>
								))}
							</div>
							<p className="feature-index-note">
								Choose a system to inspect it in detail.
							</p>
						</aside>
					</section>

					<section className="signal-strip" aria-label="Cloud TUI capabilities">
						<div className="signal-track">
							<span>
								LOCAL CONTEXT <i>✦</i>
							</span>
							<span>
								PARALLEL WORKTREES <i>✦</i>
							</span>
							<span>
								HUMAN CHECKPOINTS <i>✦</i>
							</span>
							<span>
								DURABLE SESSIONS <i>✦</i>
							</span>
							<span>
								LOCAL CONTEXT <i>✦</i>
							</span>
							<span>
								PARALLEL WORKTREES <i>✦</i>
							</span>
						</div>
					</section>

					<section className="intro-section wrap" aria-labelledby="built-title">
						<div className="section-heading" data-reveal>
							<p className="eyebrow">
								<span /> WHY CLOUD TUI
							</p>
							<h2 id="built-title">
								Built for long-running work, not one-off answers.
							</h2>
						</div>
						<div className="feature-grid">
							{overviewFeatures.map(feature => (
								<article
									className="feature-card"
									data-reveal
									key={feature.index}
								>
									<span className="feature-index">{feature.index}</span>
									<div className="feature-symbol">{feature.symbol}</div>
									<h3>{feature.title}</h3>
									<p>{feature.description}</p>
								</article>
							))}
						</div>
					</section>

					<section
						className="context-section"
						id="context"
						aria-labelledby="context-title"
					>
						<div className="wrap context-layout">
							<div className="context-copy" data-reveal>
								<p className="eyebrow eyebrow-inverse">
									<span /> CONTEXT ENGINE
								</p>
								<h2 id="context-title">
									Keep the signal. <em>Leave the bulk behind.</em>
								</h2>
								<p>
									As a run grows, Cloud TUI archives oversized historical file
									updates as local context artifacts and replaces them with
									lightweight references. When old detail matters again, the
									agent can retrieve it on demand.
								</p>
								<p>
									After repeated compaction, a durable session summary carries
									forward the decisions, constraints, implementation state, and
									next steps that still matter.
								</p>
								<div className="context-tags">
									<span>Large edits → local artifacts</span>
									<span>Details → on demand</span>
									<span>Long run → summary</span>
								</div>
							</div>
							<div className="context-console" data-reveal>
								<div className="console-label">
									<span>CONTEXT PRESSURE</span>
									<b>{stage.toUpperCase()}</b>
								</div>
								<div className="pressure-meter">
									<span
										style={{
											background: stage === 'summary' ? '#e5bd7f' : '#d4ff6a',
											width: contextValue + '%',
										}}
									/>
								</div>
								<input
									id="context-range"
									type="range"
									min="0"
									max="100"
									value={contextValue}
									onChange={event => {
										setContextValue(Number(event.target.value));
										setArtifactInspected(false);
									}}
									aria-label="Explore context compaction"
								/>
								<div className="pressure-scale">
									<span>fresh</span>
									<span>working</span>
									<span>long-running</span>
								</div>
								<div
									className="history-stack"
									data-stage={stage === 'fresh' ? undefined : stage}
								>
									<div className="history-row user">
										<span>USER</span>
										<p>Build settings navigation with keyboard support.</p>
									</div>
									<div className="history-row model">
										<span>MODEL</span>
										<p>
											updateFile · SettingsPanel.tsx <b>4.8 KB</b>
										</p>
									</div>
									<div className="history-row model collapse-target">
										<span>MODEL</span>
										<p>
											updateFile · focus-manager.ts <b>8.2 KB</b>
										</p>
									</div>
									<div className="artifact-row">
										<span>◇</span>
										<p>
											context artifact <code>settings-history-02.txt</code>
										</p>
										<button
											type="button"
											onClick={() => setArtifactInspected(true)}
										>
											{artifactInspected ? 'inspected' : 'inspect'}
										</button>
									</div>
									<div className="summary-row">
										<span>∼</span>
										<p>
											<b>Durable summary</b>
											<br />
											Keyboard navigation added; focus wrapping remains to
											verify.
										</p>
									</div>
								</div>
								<p className="console-note">{contextNote}</p>
							</div>
						</div>
					</section>

					<section
						className="worktree-section wrap"
						id="workflow"
						aria-labelledby="workflow-title"
					>
						<div className="section-heading split-heading" data-reveal>
							<div>
								<p className="eyebrow">
									<span /> PARALLEL EXECUTION
								</p>
								<h2 id="workflow-title">
									Give independent work its own <em>branch of reality.</em>
								</h2>
							</div>
							<p>
								Delegate focused tasks into isolated Git worktrees, checkpoint
								before integration, and keep merge status visible.
							</p>
						</div>
						<div
							className="worktree-board"
							data-state={hasConflict ? 'conflict' : 'clean'}
							data-reveal
						>
							<div className="board-controls">
								<span>
									<i /> worktree coordinator
								</span>
								<button
									type="button"
									onClick={() => setHasConflict(value => !value)}
								>
									{hasConflict
										? 'Resolve merge conflict'
										: 'Simulate merge conflict'}
								</button>
							</div>
							<div className="branch-map">
								<div className="main-branch">
									<span>main</span>
									<b>●</b>
									<p>checkpoint: settings foundation</p>
								</div>
								<div className="branch-lines" aria-hidden="true">
									<i />
									<i />
									<i />
								</div>
								<article className="agent-branch agent-one">
									<div className="agent-top">
										<span>AGENT 01</span>
										<b>running</b>
									</div>
									<h3>Settings UI</h3>
									<p>worktree / settings-ui</p>
									<div className="agent-progress">
										<span style={{width: '82%'}} />
									</div>
									<small>82% · visual components</small>
								</article>
								<article className="agent-branch agent-two">
									<div className="agent-top">
										<span>AGENT 02</span>
										<b>ready</b>
									</div>
									<h3>Keyboard behavior</h3>
									<p>worktree / focus-behavior</p>
									<div className="agent-progress">
										<span style={{width: '100%'}} />
									</div>
									<small>100% · awaiting merge</small>
								</article>
								<div className="merge-node">
									<span>↘</span>
									<div>
										<b>{hasConflict ? 'Conflict detected' : 'Merge ready'}</b>
										<small>
											{hasConflict
												? 'manual resolution required'
												: 'checkpoint before integration'}
										</small>
									</div>
								</div>
							</div>
							<div className="worktree-footnote">
								<span>Focused delegated prompts</span>
								<span>One isolated Git worktree per sub-agent</span>
								<span>Conflict visibility</span>
							</div>
						</div>
					</section>

					<section
						className="scope-section"
						id="safety"
						aria-labelledby="scope-title"
					>
						<div className="wrap scope-layout">
							<div
								className={
									'scope-explorer' +
									(outsideWorkspaceBlocked ? ' is-blocked' : '')
								}
								data-reveal
							>
								<div className="explorer-top">
									<span>ACTIVE WORKSPACE</span>
									<b>~/projects/acme-app</b>
								</div>
								<div className="tree">
									<p className="tree-root">
										<span>⌄</span> acme-app <small>opened directory</small>
									</p>
									<p>
										<span>├─</span> src/
									</p>
									<p>
										<span>│&nbsp; ├─</span> settings/
									</p>
									<p>
										<span>│&nbsp; └─</span> app.tsx
									</p>
									<p>
										<span>├─</span> package.json
									</p>
									<p>
										<span>└─</span> README.md
									</p>
								</div>
								<div className="outside-tree">
									<span>×</span>
									<p>
										~/Documents/private-notes
										<small>outside active workspace</small>
									</p>
								</div>
								<button
									className="scope-probe"
									type="button"
									onClick={() => setOutsideWorkspaceBlocked(true)}
								>
									Probe outside directory <span>→</span>
								</button>
								<p className="scope-feedback">
									{outsideWorkspaceBlocked
										? 'Blocked: this path is outside the active workspace.'
										: 'File tools and shell commands resolve inside the directory you opened.'}
								</p>
							</div>
							<div className="scope-copy" data-reveal>
								<p className="eyebrow">
									<span /> WORKSPACE SCOPE
								</p>
								<h2 id="scope-title">
									Open a directory. Give the agent that directory—
									<em>not your machine.</em>
								</h2>
								<p>
									Cloud TUI resolves the workspace from the directory where you
									launch it. File tools and shell commands are scoped to that
									project workspace, and commands that target a working
									directory outside it are rejected.
								</p>
								<p className="scope-caveat">
									Workspace-scoped guardrails, not an operating-system sandbox.
								</p>
							</div>
						</div>
					</section>

					<section
						className="checkpoint-section wrap"
						id="control"
						aria-labelledby="checkpoint-title"
					>
						<div className="section-heading" data-reveal>
							<p className="eyebrow">
								<span /> HUMAN CHECKPOINTS
							</p>
							<h2 id="checkpoint-title">
								The agent asks when the decision <em>belongs to you.</em>
							</h2>
							<p>
								Approval-gated operations wait for a real answer. Missing
								product decisions become structured questions, not assumptions.
							</p>
						</div>
						<div className="checkpoint-grid">
							<article className="approval-card" data-reveal>
								<div className="card-topline">
									<span>PERMISSION REQUEST</span>
									<b>{approvalLabel}</b>
								</div>
								<div className="warning-orb">!</div>
								<h3>
									Delete <code>legacy-settings.ts</code>?
								</h3>
								<p>Reason: removes a project file from the active workspace.</p>
								<div className="approval-actions">
									<button
										type="button"
										className="approve"
										onClick={() => setApproval('approved')}
									>
										Approve <span>↵</span>
									</button>
									<button
										type="button"
										className="reject"
										onClick={() => setApproval('rejected')}
									>
										Reject <span>esc</span>
									</button>
								</div>
								<p
									className={
										'approval-result' + (approval ? ' is-' + approval : '')
									}
								>
									{approvalResult}
								</p>
							</article>
							<article className="input-card" data-reveal>
								<div className="card-topline">
									<span>DECISION REQUEST</span>
									<b>QUESTION 1 / 2</b>
								</div>
								<div className="question-number">01</div>
								<h3>Which authentication flow should the dashboard use?</h3>
								<div className="answer-options">
									{['Existing SSO', 'Email + password', 'Describe it'].map(
										answer => (
											<button
												type="button"
												key={answer}
												className={
													selectedAnswer === answer ? 'selected' : undefined
												}
												onClick={() => setSelectedAnswer(answer)}
											>
												<i />{' '}
												{answer === 'Describe it' ? 'I’ll describe it' : answer}
											</button>
										),
									)}
								</div>
								<p className="input-result">{inputResult}</p>
							</article>
						</div>
					</section>

					<section className="plan-section" id="plan">
						<div className="wrap plan-layout">
							<div className="plan-copy" data-reveal>
								<p className="eyebrow eyebrow-inverse">
									<span /> VISIBLE EXECUTION
								</p>
								<h2>
									Turn a vague request into work you can <em>follow.</em>
								</h2>
								<p>
									For implementation work, Cloud TUI can form a short
									outcome-focused task plan, surface it in the conversation, and
									mark progress as each meaningful step completes.
								</p>
								<button
									className="button button-light"
									type="button"
									onClick={advancePlan}
								>
									{completedTasks === planSteps.length
										? 'Restart demo plan'
										: 'Advance demo plan'}{' '}
									<span>→</span>
								</button>
							</div>
							<div className="task-plan-card" data-reveal>
								<div className="task-plan-head">
									<div>
										<span>IMPLEMENTATION PLAN</span>
										<b>Settings navigation</b>
									</div>
									<strong>
										{completedTasks} / {planSteps.length}
									</strong>
								</div>
								<div className="task-progress">
									<span
										style={{
											width: (completedTasks / planSteps.length) * 100 + '%',
										}}
									/>
								</div>
								<ol>
									{planSteps.map((step, index) => {
										const isComplete = index < completedTasks;
										const isActive =
											index === completedTasks &&
											completedTasks < planSteps.length;
										return (
											<li
												className={
													(isComplete ? 'complete ' : '') +
													(isActive ? 'active' : '')
												}
												key={step}
											>
												<i>{isComplete ? '✓' : isActive ? '◌' : '○'}</i>
												<span>{step}</span>
											</li>
										);
									})}
								</ol>
								<div className="plan-stream">
									<span>◆</span>
									<p>{planMessages[Math.max(0, completedTasks - 2)]}</p>
								</div>
							</div>
						</div>
					</section>

					<section
						className="sessions-section wrap"
						id="sessions"
						aria-labelledby="sessions-title"
					>
						<div className="section-heading split-heading" data-reveal>
							<div>
								<p className="eyebrow">
									<span /> LOCAL SESSION MEMORY
								</p>
								<h2 id="sessions-title">
									Come back to the codebase, <em>not a blank chat.</em>
								</h2>
							</div>
							<p>
								Each canonical workspace has a stable identity. Open a saved
								local conversation with <code>/session</code>, or begin clean
								with <code>/new</code>.
							</p>
						</div>
						<div className="session-demo" data-reveal>
							<div className="session-command">
								<span>›</span> /session
								<small>saved local sessions for ~/projects/acme-app</small>
							</div>
							<div className="session-body">
								<div
									className="session-list"
									role="listbox"
									aria-label="Session picker"
								>
									{savedSessions.map(session => (
										<button
											type="button"
											className={
												'session-item' +
												(selectedSession.id === session.id ? ' active' : '')
											}
											key={session.id}
											role="option"
											aria-selected={selectedSession.id === session.id}
											onClick={() => setSelectedSession(session)}
										>
											<span>›</span>
											<b>{session.id}</b>
											<small>{session.lastOpened}</small>
											{selectedSession.id === session.id ? (
												<em>ACTIVE</em>
											) : null}
										</button>
									))}
								</div>
								<aside className="session-preview">
									<span>RESTORED TRANSCRIPT</span>
									<h3>{selectedSession.title}</h3>
									<p>{selectedSession.description}</p>
									<div>
										<b>project</b> acme-app <b>session</b> {selectedSession.id}
									</div>
								</aside>
							</div>
							<div className="session-bottom">
								<span>↑↓ navigate · ENTER select · ESC cancel</span>
								<button type="button" onClick={selectNewSession}>
									+ /new local session
								</button>
							</div>
						</div>
					</section>

					<section
						className="closing-section"
						id="install"
						aria-labelledby="closing-title"
					>
						<div className="closing-grid" aria-hidden="true" />
						<div className="wrap closing-content" data-reveal>
							<p className="eyebrow eyebrow-inverse">
								<span /> YOUR CODEBASE. YOUR TERMINAL. YOUR FINAL SAY.
							</p>
							<h2 id="closing-title">
								Less context switching.
								<br />
								<em>More intentional shipping.</em>
							</h2>
							<p>
								Bring agentic implementation work into the place developers
								already reason about software. Preserve useful context, make
								parallel work legible, and stop for the decisions only a person
								should make.
							</p>
							<a href="https://www.npmjs.com/package/cloud-tui" target="_blank" className="install-command">
								<code>cloud-tui</code>
								<small aria-live="polite">{copyStatus}</small>
							</a>
							<p className="install-note">
								Run it from the project directory you want it to use.
							</p>
						</div>
					</section>
				</main>

				<footer className="footer wrap">
					<a className="brand" href="#top">
						<span className="brand-mark" aria-hidden="true">
							◈
						</span>
						<span>CLOUD TUI</span>
					</a>
					<p>
						Local workspace sessions · Approval-aware tools · Git worktree
						coordination
					</p>
					<a href="#top">Back to top ↑</a>
				</footer>
			</div>
		</>
	);
}
