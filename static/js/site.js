const initDocsTheme = () => {
	const button = document.querySelector('.theme-toggle');
	if (!button) return;
	const apply = (mode) => {
		document.documentElement.dataset.theme = mode;
		button.setAttribute('aria-checked', String(mode === 'dark'));
		const color = getComputedStyle(document.documentElement).getPropertyValue('--sable-bg-container').trim();
		document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', color));
	};
	apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
	button.addEventListener('click', () => {
		const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
		apply(next);
		try { localStorage.setItem('sable-docs-theme', next); } catch {}
	});
};

const initCodeBlockLabels = () => {
	document.querySelectorAll('pre > code[data-lang]').forEach((codeBlock) => {
		const pre = codeBlock.parentElement;
		const language = codeBlock.getAttribute('data-lang');

		if (!pre || !language) return;

		pre.setAttribute('data-lang', language);
	});
};

const initTableScroll = () => {
	document.querySelectorAll('article table').forEach((table) => {
		if (table.parentElement?.classList.contains('table-scroll')) return;
		const wrap = document.createElement('div');
		wrap.className = 'table-scroll';
		table.replaceWith(wrap);
		wrap.append(table);
	});
};

const initDocsNav = () => {
	const button = document.querySelector('.nav-toggle-button');
	const nav = document.getElementById('docs-nav');
	const overlay = document.querySelector('.nav-overlay');
	const closeButton = document.querySelector('.nav-close-button');
	const main = document.querySelector('main');

	if (!button || !nav || !overlay) return;

	const mobileQuery = window.matchMedia('(max-width: 60rem)');
	const syncClosedState = () => {
		const isHidden = button.getAttribute('aria-expanded') !== 'true' && mobileQuery.matches;
		if (isHidden && nav.contains(document.activeElement)) button.focus();
		if ('inert' in nav) nav.inert = isHidden;
		nav.setAttribute('aria-hidden', String(isHidden));
		overlay.hidden = button.getAttribute('aria-expanded') !== 'true';
	};
	const setOpen = (open) => {
		document.body.classList.toggle('nav-open', open);
		button.setAttribute('aria-expanded', String(open));
		button.tabIndex = open && mobileQuery.matches ? -1 : 0;
		if (main && 'inert' in main) main.inert = open && mobileQuery.matches;
		syncClosedState();
		if (open && mobileQuery.matches) {
			const focusCloseButton = () => {
				if (!closeButton || !mobileQuery.matches || button.getAttribute('aria-expanded') !== 'true') return;
				if (getComputedStyle(closeButton).visibility !== 'visible') {
					requestAnimationFrame(focusCloseButton);
					return;
				}
				closeButton.focus();
			};
			requestAnimationFrame(focusCloseButton);
		}
	};
	const closeNav = (restoreFocus = true) => {
		setOpen(false);
		if (restoreFocus && mobileQuery.matches) {
			requestAnimationFrame(() => requestAnimationFrame(() => button.focus()));
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
	closeButton?.addEventListener('click', () => closeNav());
	overlay.addEventListener('click', () => closeNav());
	nav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			if (mobileQuery.matches) closeNav(false);
		});
	});
	document.addEventListener('keydown', (event) => {
		if (button.getAttribute('aria-expanded') !== 'true') return;
		if (event.key === 'Escape') closeNav();
		if (event.key === 'Tab' && mobileQuery.matches) {
			const controls = [...nav.querySelectorAll('a[href], button:not([disabled])')];
			const first = controls[0];
			const last = controls[controls.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		}
	});
	if (typeof mobileQuery.addEventListener === 'function') {
		mobileQuery.addEventListener('change', handleViewportChange);
	}
};

const initDocsOutline = () => {
	const outline = document.querySelector('.docs-outline');
	if (!outline) return;
	const entries = [...outline.querySelectorAll('a')].map((link) => ({
		link,
		heading: document.getElementById(decodeURIComponent(link.hash.slice(1))),
	})).filter((entry) => entry.heading);
	if (!entries.length) return;

	let active = -1;
	let pinned = null;
	let frame = 0;
	const setActive = (index) => {
		if (index === active) return;
		active = index;
		outline.style.setProperty('--outline-index', String(index));
		outline.classList.add('tracking');
		entries.forEach(({ link }, position) => {
			if (position === index) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		});
		const list = outline.closest('.docs-nav-list');
		if (!list || list.closest('[aria-hidden="true"]')) return;
		const bounds = list.getBoundingClientRect();
		const link = entries[index].link.getBoundingClientRect();
		if (link.top < bounds.top) list.scrollTop += link.top - bounds.top;
		else if (link.bottom > bounds.bottom) list.scrollTop += link.bottom - bounds.bottom;
	};
	const update = () => {
		frame = 0;
		if (pinned !== null) {
			setActive(pinned);
			return;
		}
		const page = document.documentElement;
		if (page.scrollHeight > innerHeight && scrollY + innerHeight >= page.scrollHeight - 1) {
			setActive(entries.length - 1);
			return;
		}
		let index = 0;
		for (let position = 0; position < entries.length; position++) {
			if (entries[position].heading.getBoundingClientRect().top > innerHeight / 4) break;
			index = position;
		}
		setActive(index);
	};
	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};
	const readHash = () => {
		let id;
		try { id = decodeURIComponent(location.hash.slice(1)); } catch {}
		const index = entries.findIndex(({ heading }) => heading.id === id);
		pinned = index >= 0 ? index : null;
		schedule();
	};
	entries.forEach(({ link, heading }, index) => {
		link.addEventListener('click', (event) => {
			if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey || event.button !== 0) return;
			event.preventDefault();
			const detailsParent = heading.closest('details');
			if (detailsParent) detailsParent.open = true;
			pinned = index;
			setActive(index);
			const hash = link.hash;
			if (location.hash !== hash) history.pushState(null, '', hash);
			if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
			heading.focus({ preventScroll: true });
			heading.scrollIntoView({
				block: 'start',
				behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
			});
		});
	});
	const release = () => { pinned = null; };
	for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
		window.addEventListener(event, release, { passive: true });
	}
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule);
	window.addEventListener('hashchange', readHash);
	window.addEventListener('load', schedule, { once: true });
	document.fonts.ready.then(schedule);
	readHash();
};

const initInstallBanner = () => {
	const hero = document.getElementById('install-hero');
	if (!hero) return;

	let releaseData = {
		version: '2.3.0',
		windows: { url: 'https://git.sable.moe/SableClient/sable-next/releases/download/v2.3.0/sable-2.3.0-x64.exe' },
		macos: { url: 'https://git.sable.moe/SableClient/sable-next/releases/download/v2.3.0/sable-2.3.0-arm64.dmg' },
		linux: { url: 'https://git.sable.moe/SableClient/sable-next/releases/download/v2.3.0/sable-2.3.0-x86_64.AppImage' },
		android: {
			playstore: 'https://play.google.com/store/apps/details?id=moe.sable.client',
			apk: 'https://git.sable.moe/SableClient/sable-next/releases/download/v2.3.0/sable-2.3.0-android-universal.apk',
		},
		ios: { url: 'https://testflight.apple.com/join/PT2DSC3f' },
		web: { url: 'https://app.sable.moe/' },
	};

	const scriptData = document.getElementById('sable-release-data');
	if (scriptData) {
		try {
			const parsed = JSON.parse(scriptData.textContent);
			if (parsed && typeof parsed === 'object') {
				releaseData = { ...releaseData, ...parsed };
			}
		} catch {}
	}

	const filename = (url) => url.split('/').pop().split('#')[0].split('?')[0];
	const configs = {
		windows: {
			key: 'windows',
			title: 'Download Sable',
			btnIcon: 'download-simple',
			btnText: 'Download for Windows',
			url: releaseData.windows.url,
			download: filename(releaseData.windows.url),
			external: false,
			secondary: '',
		},
		macos: {
			key: 'macos',
			title: 'Download Sable',
			btnIcon: 'download-simple',
			btnText: 'Download for macOS',
			url: releaseData.macos.url,
			download: filename(releaseData.macos.url),
			external: false,
			secondary: '',
		},
		linux: {
			key: 'linux',
			title: 'Download Sable',
			btnIcon: 'download-simple',
			btnText: 'Download for Linux',
			url: releaseData.linux.url,
			download: filename(releaseData.linux.url),
			external: false,
			secondary: '',
		},
		android: {
			key: 'android',
			title: 'Download Sable',
			btnIcon: 'arrow-right',
			btnText: 'Get on Google Play',
			url: releaseData.android.playstore,
			download: '',
			external: true,
			secondary: `or <a href="${releaseData.android.apk}" download="${filename(releaseData.android.apk)}">download standalone APK</a>`,
		},
		ios: {
			key: 'ios',
			title: 'Download Sable',
			btnIcon: 'arrow-right',
			btnText: 'Join TestFlight Beta',
			url: releaseData.ios.url,
			download: '',
			external: true,
			secondary: '',
		},
		web: {
			key: 'web',
			title: 'Open Sable',
			btnIcon: 'arrow-right',
			btnText: 'Open app.sable.moe',
			url: releaseData.web.url,
			download: '',
			external: true,
			secondary: '',
		},
	};

	const detectPlatform = () => {
		const params = new URLSearchParams(window.location.search);
		const requested = (params.get('platform') || params.get('os'))?.toLowerCase();
		if (requested && configs[requested]) return requested;

		const uaData = navigator.userAgentData?.platform?.toLowerCase() || '';
		const ua = (navigator.userAgent || '').toLowerCase();
		const plat = (navigator.platform || '').toLowerCase();
		const oscpu = (navigator.oscpu || '').toLowerCase();
		const touch = navigator.maxTouchPoints || 0;

		if (/iphone|ipad|ipod/.test(ua) || (plat === 'macintel' && touch > 1) || (uaData === 'macos' && touch > 1)) {
			return 'ios';
		}
		if (/android/.test(ua) || uaData === 'android' || /android/.test(plat)) {
			return 'android';
		}
		if (/linux|x11/.test(ua) || /linux|x11/.test(plat) || /linux/.test(oscpu) || uaData === 'linux') {
			return 'linux';
		}
		if (/macintosh|mac os x/.test(ua) || /mac/.test(plat) || uaData === 'macos') {
			return 'macos';
		}
		if (/windows|win32|win64/.test(ua) || /win/.test(plat) || uaData === 'windows') {
			return 'windows';
		}
		return 'web';
	};

	const applyPlatform = (platformKey) => {
		const config = configs[platformKey] || configs.windows;
		hero.dataset.platform = config.key;

		const title = document.getElementById('install-hero-title');
		if (title) title.textContent = config.title;

		const ctaBtn = document.getElementById('install-cta-btn');
		const ctaIcon = document.getElementById('install-cta-icon');
		const ctaText = document.getElementById('install-cta-text');

		if (ctaBtn) {
			ctaBtn.href = config.url;
			if (config.download) {
				ctaBtn.setAttribute('download', config.download);
			} else {
				ctaBtn.removeAttribute('download');
			}
			if (config.external) {
				ctaBtn.setAttribute('target', '_blank');
				ctaBtn.setAttribute('rel', 'noopener external');
			} else {
				ctaBtn.removeAttribute('target');
				ctaBtn.removeAttribute('rel');
			}
		}

		if (ctaIcon) ctaIcon.className = `icon icon--${config.btnIcon}`;
		if (ctaText) ctaText.textContent = config.btnText;

		const secondary = document.getElementById('install-hero-secondary');
		if (secondary) secondary.innerHTML = config.secondary;
	};

	applyPlatform(detectPlatform());

	const disclosure = document.getElementById('other-platforms');
	const expandLink = document.getElementById('install-more-link');

	const openDisclosure = () => {
		if (!disclosure) return;
		disclosure.open = true;
		const toggleText = disclosure.querySelector('.toggle-text');
		if (toggleText) toggleText.textContent = 'Hide options';
		try {
			disclosure.scrollIntoView({
				behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
				block: 'start',
			});
		} catch {
			disclosure.scrollIntoView(true);
		}
	};

	if (expandLink) {
		expandLink.addEventListener('click', (event) => {
			event.preventDefault();
			if (disclosure && disclosure.open) {
				disclosure.open = false;
				const toggleText = disclosure.querySelector('.toggle-text');
				if (toggleText) toggleText.textContent = 'Show all';
			} else {
				openDisclosure();
			}
		});
	}

	if (disclosure) {
		disclosure.addEventListener('toggle', () => {
			const toggleText = disclosure.querySelector('.toggle-text');
			if (toggleText) {
				toggleText.textContent = disclosure.open ? 'Hide options' : 'Show all';
			}
		});

		const checkHash = () => {
			if (location.hash) {
				const targetId = decodeURIComponent(location.hash.slice(1));
				if (targetId === 'other-platforms' || disclosure.querySelector(`#${CSS.escape(targetId)}`)) {
					openDisclosure();
				}
			}
		};
		window.addEventListener('hashchange', checkHash);
		checkHash();
	}
};

if (document.readyState === 'loading') {
	document.addEventListener(
		'DOMContentLoaded',
		() => {
			initDocsTheme();
			initCodeBlockLabels();
			initTableScroll();
			initDocsNav();
			initDocsOutline();
			initInstallBanner();
		},
		{ once: true },
	);
} else {
	initDocsTheme();
	initCodeBlockLabels();
	initTableScroll();
	initDocsNav();
	initDocsOutline();
	initInstallBanner();
}

