(function () {
    'use strict';

    const root = document.documentElement;

    // ---------- Safe storage ----------
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
    };

    // ---------- English translations (Spanish lives in the HTML) ----------
    const EN = {
        'skip': 'Skip to content',
        'nav.projects': 'Projects',
        'nav.exp': 'Experience',
        'nav.stack': 'Stack',
        'nav.edu': 'Education',
        'nav.contact': 'Contact',

        'hero.status': 'Available · Remote · Project or goal-based',
        'hero.role2': 'Certified Public Accountant',
        'hero.lead': 'I build automations, AI agents and tax tools that understand how accounting really works in Mexico. Between the models and the numbers, I turn financial problems into systems that run.',
        'hero.cta1': 'See projects',
        'hero.cta2': "Let's talk about a project",
        'hero.cta3': 'Download CV (PDF)',
        'stat.years': 'years of experience',
        'stat.companies': 'companies managed',
        'stat.parallel': 'legal entities in parallel',

        'value.eyebrow': 'What I solve',
        'value.title': 'AI applied where the money moves',
        'value.lead': "Most AI profiles don't know tax authorities, and most accountants don't code. I work at that intersection.",
        'value.1.t': 'Process automation',
        'value.1.d': 'n8n and Python workflows that remove manual data entry: expense classification, reconciliations, reports and integrations between tools.',
        'value.2.t': 'AI agents and assistants',
        'value.2.d': 'LLMs embedded in real processes, with verifiable sources and human oversight. Tax guidance, document extraction and chatbots.',
        'value.3.t': 'Fiscal products and data',
        'value.3.d': 'CFDI 4.0 e-invoicing apps, bulk XML validation and dashboards so finance teams decide with data, not gut feeling.',

        'proj.eyebrow': 'Projects',
        'proj.title': "What I've built",
        'proj.lead': 'Products in production and projects I build in public.',
        'tag.live': 'In production',
        'tag.public': 'Public access',
        'proj.open': 'Open project →',
        'proj.explore': 'Explore →',
        'proj.all': 'See all →',
        'proj.timbra': 'CFDI 4.0 e-invoicing platform for Mexico: upload, review and issue invoices with no monthly fee, paying only for the stamps you use. Product design, tax rules and end-to-end development.',
        'proj.timbra.k1': 'stamping',
        'proj.timbra.k2': '1,000 stamps',
        'proj.timbra.k3': 'monthly fee',
        'proj.imx.tag': 'Tax knowledge · AI',
        'proj.imx': 'Public, structured tax-lookup console: Mexican laws linked to their official source, statutory figures and calculation rules modeled as data. A foundation for AI assistants that answer with references, not guesses.',
        'proj.imx.k1': 'laws with sources',
        'proj.imx.k2': 'statutory figures',
        'proj.imx.k3': 'calculation rules',
        'proj.auto.tag': 'Automation · Python',
        'proj.auto.t': 'Bulk CFDI validation and classification',
        'proj.auto': 'Python workflows that validate XML structure and classify invoices for up to 20 legal entities in parallel, cutting manual review and errors in month-end close and tax filings.',
        'proj.flows.tag': 'n8n · LLMs',
        'proj.flows.t': 'AI workflows for SMBs',
        'proj.flows': 'Expense classification, automated reports, chatbots and tool integrations for clients, always with a human in the loop on tax decisions.',
        'proj.web.tag': 'Web · Clients',
        'proj.web.t': 'Websites and online stores',
        'proj.web': 'Custom, fast, mobile-first sites launched with privacy notice and invoicing ready.',
        'proj.lab.tag': 'Lab',
        'proj.lab.t': 'More apps and experiments',
        'proj.lab': 'Tax tools and apps I build in public.',

        'exp.eyebrow': 'Experience',
        'exp.title': 'From corporate accounting to AI engineering',
        'remote': 'Remote',
        'exp.0.date': 'Sep 2025 – Present',
        'exp.0.role': 'AI Engineer & Founder',
        'exp.0.b1': 'Designed and built Timbra (CFDI 4.0 e-invoicing) and Inteligencia MX (structured tax lookup).',
        'exp.0.b2': 'Automations with n8n, Python and LLMs for clients: expense classification, reporting and assistants.',
        'exp.0.b3': 'Websites and online stores for businesses, plus accounting and tax guidance for SMBs.',
        'exp.1.date': 'Jan 2023 – Sep 2025',
        'exp.1.role': 'Junior Accountant · Automation',
        'exp.1.b1': 'Accounting for up to 20 legal entities in parallel: taxes, DIOT filings, reconciliations and financial reports.',
        'exp.1.b2': 'Automated CFDI validation and classification with Python workflows.',
        'exp.1.b3': 'Built operational dashboards to track KPIs and internal controls.',
        'exp.2.date': 'Feb 2022 – Jan 2023',
        'exp.2.role': 'Accounts Payable Lead',
        'exp.2.b1': 'Managed payments to vendors and insurers, bookkeeping and reconciliations.',
        'exp.2.b2': 'Digitized the payments workflow and document validation.',
        'exp.3.place': 'AM Accounting Firm · Cuajimalpa Municipality',
        'exp.3.role': 'Accounting & administrative assistant',
        'exp.3.d': 'Journal entries, initial financial statements, administrative databases and document control.',

        'stack.title': 'Tools I deliver with',
        'stack.ai': 'AI & automation',
        'stack.agents': 'AI agents',
        'stack.data': 'Data & product',
        'stack.web': 'Web development',
        'stack.sec': 'Defensive security',
        'stack.fin': 'Tax & accounting',
        'stack.tax': 'Tax calculation',
        'stack.fs': 'Financial statements',
        'stack.rec': 'Reconciliations',

        'edu.eyebrow': 'Education',
        'edu.title': 'Two degrees, one focus',
        'edu.ongoing': 'In progress',
        'edu.ai': 'B.Sc. in Artificial Intelligence',
        'edu.done': 'Graduated · 2019 – 2023',
        'edu.cp': 'B.A. in Public Accounting (CPA)',
        'edu.license': 'Professional License',
        'edu.verify': 'view certificate',
        'certs.title': '50+ courses and certifications',
        'certs.sec': 'Cybersecurity',
        'certs.tax': 'Tax',
        'certs.ai': 'Artificial Intelligence',
        'certs.priv': 'Data privacy',
        'certs.fin': 'Corporate finance',
        'certs.auto': 'Automation',
        'certs.all': 'See all certifications →',

        'work.eyebrow': 'How I work',
        'work.title': 'Remote, deliverable-driven, measurable results',
        'work.1.t': 'Per project',
        'work.1.d': 'Scope, deliverables and deadline defined up front. Ideal for an automation, an agent or a specific tool.',
        'work.2.t': 'Goal-based',
        'work.2.d': 'We agree on the metric (hours saved, errors removed, close time) and I work until we hit it.',
        'work.3.t': 'Ongoing collaboration',
        'work.3.d': 'Remote integration with your finance, data or product team, with weekly progress and async communication.',

        'contact.eyebrow': 'Contact',
        'contact.title': 'Have a process that should run on its own?',
        'contact.lead': "Tell me the problem and I'll personally reply with a scope proposal.",
        'contact.mail': 'Send email',
        'contact.copy': 'Copy email',
        'footer.loc': 'Mexico City · Working remotely'
    };

    const META = {
        es: {
            title: 'Erick Domínguez · AI Engineer & Contador Público',
            desc: 'AI Engineer con formación de Contador Público. Automatización, agentes de IA y herramientas fiscales para finanzas y PyMEs. Disponible remoto, por proyecto u objetivo.',
            copied: 'Correo copiado',
            langLabel: 'Change language to English',
            themeLabel: 'Cambiar tema'
        },
        en: {
            title: 'Erick Domínguez · AI Engineer & CPA',
            desc: 'AI Engineer with a CPA background. Automation, AI agents and tax tools for finance teams and SMBs. Available remote, per project or goal-based.',
            copied: 'Email copied',
            langLabel: 'Cambiar idioma a español',
            themeLabel: 'Toggle theme'
        }
    };

    // ---------- i18n ----------
    const nodes = document.querySelectorAll('[data-i18n]');
    const ES = {};
    nodes.forEach(n => { ES[n.dataset.i18n] = n.innerHTML; });

    let lang = store.get('lang') || (navigator.language || 'es').slice(0, 2);
    if (lang !== 'en') lang = 'es';

    function applyLang(l) {
        lang = l;
        const dict = l === 'en' ? EN : ES;
        nodes.forEach(n => {
            const v = dict[n.dataset.i18n];
            if (v !== undefined) n.innerHTML = v;
        });
        root.lang = l;
        document.title = META[l].title;
        const d = document.getElementById('meta-desc');
        if (d) d.setAttribute('content', META[l].desc);
        langBtn.setAttribute('aria-label', META[l].langLabel);
        themeBtn.setAttribute('aria-label', META[l].themeLabel);
        langBtn.dataset.active = l;
    }

    const langBtn = document.getElementById('lang-toggle');
    const themeBtn = document.getElementById('theme-toggle');

    langBtn.addEventListener('click', () => {
        const next = lang === 'es' ? 'en' : 'es';
        applyLang(next);
        store.set('lang', next);
    });

    // ---------- Theme ----------
    function setThemeColor() {
        const m = document.querySelector('meta[name="theme-color"]');
        if (m) m.setAttribute('content', root.dataset.theme === 'light' ? '#ffffff' : '#000000');
    }
    themeBtn.addEventListener('click', () => {
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        root.dataset.theme = next;
        store.set('theme', next);
        setThemeColor();
    });

    // ---------- Header shadow on scroll ----------
    const topbar = document.getElementById('topbar');
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---------- Active nav link ----------
    const navLinks = document.querySelectorAll('.nav a');
    if ('IntersectionObserver' in window) {
        const map = {};
        navLinks.forEach(a => { map[a.getAttribute('href').slice(1)] = a; });
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting && map[e.target.id]) {
                    navLinks.forEach(a => a.classList.remove('active'));
                    map[e.target.id].classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        Object.keys(map).forEach(id => {
            const el = document.getElementById(id);
            if (el) spy.observe(el);
        });

        // Reveal on scroll
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targets = document.querySelectorAll('.sec-head, .tile, .project, .tl-item, .stack-group, .edu-card, .certs, .contact-box');
        if (!reduce) {
            targets.forEach(t => t.classList.add('reveal'));
            const rev = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
                });
            }, { threshold: 0.12 });
            document.querySelectorAll('.reveal').forEach(t => rev.observe(t));
        } else {
            document.querySelectorAll('.reveal').forEach(t => t.classList.add('in'));
        }
    } else {
        document.querySelectorAll('.reveal').forEach(t => t.classList.add('in'));
    }

    // ---------- Copy email ----------
    const toast = document.getElementById('toast');
    let toastTimer;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    }
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => showToast(META[lang].copied), () => showToast(text));
            } else {
                showToast(text);
            }
        });
    });

    // ---------- Init ----------
    document.getElementById('year').textContent = new Date().getFullYear();
    applyLang(lang);
    setThemeColor();
    onScroll();
})();
