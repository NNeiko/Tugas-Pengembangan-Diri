const progressBar = document.getElementById('reading-progress');
const sidebarPercent = document.getElementById('sidebar-percent');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const rawProgress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
    const clamped = Math.min(Math.max(rawProgress, 0), 100);
    progressBar.style.width = `${clamped}%`;
    if (sidebarPercent) {
        sidebarPercent.textContent = `${Math.round(clamped)}% selesai`;
    }
}, { passive: true });

const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const htmlEl = document.documentElement;

function updateThemeUI() {
    const isDark = htmlEl.classList.contains('dark');
    themeLabel.textContent = isDark ? 'Warm Paper' : 'Deep Slate';
    iconSun.classList.toggle('hidden', !isDark);
    iconMoon.classList.toggle('hidden', isDark);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.classList.add('dark');
}
updateThemeUI();

themeToggle.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    updateThemeUI();
});

let activeCodeMode = 'modular';

function switchCodeTab(mode) {
    activeCodeMode = mode;
    const modularPre = document.getElementById('code-modular');
    const spaghettiPre = document.getElementById('code-spaghetti');
    const tabModular = document.getElementById('tab-modular');
    const tabSpaghetti = document.getElementById('tab-spaghetti');
    const filenameEl = document.getElementById('code-filename');

    const activeClasses = ['bg-editorial-accent', 'text-white', 'dark:bg-editorial-slateAccent', 'dark:text-editorial-slate'];
    const inactiveClasses = ['text-editorial-muted', 'dark:text-editorial-slateMuted', 'hover:text-editorial-ink', 'dark:hover:text-editorial-slateInk'];

    if (mode === 'modular') {
        modularPre.classList.remove('hidden');
        spaghettiPre.classList.add('hidden');
        tabModular.classList.add(...activeClasses);
        tabModular.classList.remove(...inactiveClasses);
        tabSpaghetti.classList.remove(...activeClasses);
        tabSpaghetti.classList.add(...inactiveClasses);
        filenameEl.textContent = 'StealthAudioSystem.cs — Pendekatan Modular (Event & Interface)';
    } else {
        spaghettiPre.classList.remove('hidden');
        modularPre.classList.add('hidden');
        tabSpaghetti.classList.add(...activeClasses);
        tabSpaghetti.classList.remove(...inactiveClasses);
        tabModular.classList.remove(...activeClasses);
        tabModular.classList.add(...inactiveClasses);
        filenameEl.textContent = 'PlayerAllInOne.cs — Pendekatan Awal (Tightly Coupled)';
    }
}

document.querySelectorAll('[data-code-mode]').forEach((button) => {
    button.addEventListener('click', () => switchCodeTab(button.dataset.codeMode));
});

function showToast(message) {
    const toast = document.getElementById('toast-banner');
    toast.textContent = message;
    toast.classList.remove('opacity-0');
    setTimeout(() => {
        toast.classList.add('opacity-0');
    }, 2200);
}

function copyTextFallback(text) {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
}

document.getElementById('copy-code').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const targetId = activeCodeMode === 'modular' ? 'code-modular' : 'code-spaghetti';
    const codeEl = document.getElementById(targetId);

    copyTextFallback(codeEl.innerText);
    const originalText = button.textContent;
    button.textContent = 'Tersalin!';
    showToast('Cuplikan kode C# berhasil disalin');
    setTimeout(() => {
        button.textContent = originalText;
    }, 1800);
});

document.getElementById('copy-article-link').addEventListener('click', () => {
    copyTextFallback(window.location.href);
    showToast('Tautan artikel berhasil disalin');
});

const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const id = entry.target.getAttribute('id');
            tocLinks.forEach((link) => {
                link.classList.toggle('active', link.dataset.target === id);
            });
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '-10% 0px -45% 0px'
});

sections.forEach((section) => sectionObserver.observe(section));
