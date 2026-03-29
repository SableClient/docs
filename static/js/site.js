const initCodeBlockLabels = () => {
	document.querySelectorAll('pre > code[data-lang]').forEach((codeBlock) => {
		const pre = codeBlock.parentElement;
		const language = codeBlock.getAttribute('data-lang');

		if (!pre || !language) return;

		pre.setAttribute('data-lang', language);
	});
};

const initDocsNav = () => {
	const button = document.querySelector('.nav-toggle-button');
	const nav = document.getElementById('docs-nav');
	const overlay = document.querySelector('.nav-overlay');
	const closeButton = document.querySelector('.nav-close-button');

	if (!button || !nav || !overlay) return;

	const mobileQuery = window.matchMedia('(max-width: 60rem)');
	const syncClosedState = () => {
		const isHidden = button.getAttribute('aria-expanded') !== 'true' && mobileQuery.matches;
		nav.setAttribute('aria-hidden', String(isHidden));
		if ('inert' in nav) nav.inert = isHidden;
		overlay.hidden = button.getAttribute('aria-expanded') !== 'true';
	};
	const setOpen = (open) => {
		document.body.classList.toggle('nav-open', open);
		button.setAttribute('aria-expanded', String(open));
		syncClosedState();
		if (open && mobileQuery.matches) {
			requestAnimationFrame(() => closeButton?.focus());
		}
	};
	const closeNav = () => {
		setOpen(false);
		if (mobileQuery.matches) {
			requestAnimationFrame(() => button.focus());
		}
	};
	const handleViewportChange = (event) => {
		if (!event.matches) closeNav();
		syncClosedState();
	};

	if (document.readyState === 'complete') {
		requestAnimationFrame(syncClosedState);
	} else {
		window.addEventListener('load', () => requestAnimationFrame(syncClosedState), { once: true });
	}
	button.addEventListener('click', () => {
		setOpen(button.getAttribute('aria-expanded') !== 'true');
	});
	closeButton?.addEventListener('click', closeNav);
	overlay.addEventListener('click', closeNav);
	nav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			if (mobileQuery.matches) closeNav();
		});
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeNav();
	});
	if (typeof mobileQuery.addEventListener === 'function') {
		mobileQuery.addEventListener('change', handleViewportChange);
	}
};

if (document.readyState === 'loading') {
	document.addEventListener(
		'DOMContentLoaded',
		() => {
			initCodeBlockLabels();
			initDocsNav();
		},
		{ once: true },
	);
} else {
	initCodeBlockLabels();
	initDocsNav();
}
