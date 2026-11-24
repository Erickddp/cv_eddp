// Genera assets/cv.pdf (ES) y assets/cv-en.pdf (EN).
// Uso: node tools/build_cv.js   (requiere Playwright)
const { chromium } = require('playwright');
const path = require('path');

const CONTACT = {
    email: 'cperickd@gmail.com',
    phone: '+52 55 3480 6184',
    web: 'cv.erickddp.com',
    site: 'erickddp.com',
    linkedin: 'linkedin.com/in/erick-dominguez-4296411a9',
    github: 'github.com/Erickddp'
};

const T = {
    es: {
        lang: 'es',
        role: 'AI Engineer · Contador Público',
        loc: 'Ciudad de México · Remoto · Por proyecto u objetivo',
        sum: 'Summary',
        sumT: 'Perfil',
        summary: 'AI Engineer con más de 6 años de experiencia como Contador Público. Construyo automatizaciones, agentes de IA y herramientas fiscales que entienden cómo funciona la contabilidad en México. He llevado la operación contable y fiscal de más de 86 empresas y hoy manejo más de 14 radiodifusoras. Busco proyectos remotos por objetivo donde la IA reduzca horas de trabajo manual y errores en finanzas.',
        expT: 'Experiencia',
        exp: [
            {
                role: 'Contador · Automatización con IA', org: 'Grupo Radio Centro', where: 'CDMX', date: 'Mar 2026 – Actualidad',
                b: [
                    'Contabilidad y cierre mensual de más de 14 radiodifusoras y 1 empresa de nómina.',
                    'Flujos asistidos por IA para capturar pólizas, conciliar bancos y comparar balanzas contra SAP Business One.',
                    'Registro de traspasos intercompañía y control fiscal del grupo.'
                ]
            },
            {
                role: 'AI Engineer y fundador', org: 'EDDP Servicios', where: 'Remoto', date: 'Sep 2025 – Actualidad',
                b: [
                    'Diseño y desarrollo de Timbra, plataforma de facturación CFDI 4.0 sin renta mensual (factura.erickddp.com).',
                    'Inteligencia MX: consola fiscal pública con 27 leyes con fuente oficial, 137 cifras de ley y 129 reglas de cálculo.',
                    'Automatizaciones con n8n, Python y LLMs para clientes: clasificación de gastos, reportes y asistentes.',
                    'Sitios web y tiendas en línea para negocios, más contabilidad y orientación fiscal a PyMEs.'
                ]
            },
            {
                role: 'Contador Jr · Automatización', org: 'Corporativo Dormimundo', where: 'CDMX', date: 'Ene 2023 – Sep 2025',
                b: [
                    'Contabilidad de hasta 20 razones sociales en paralelo: impuestos, DIOT, conciliaciones y reportes financieros.',
                    'Automaticé la validación y clasificación de CFDI con flujos en Python.',
                    'Construí dashboards operativos para seguimiento de indicadores y control interno.'
                ]
            },
            {
                role: 'Encargado de Cuentas por Pagar', org: 'PINFRA PDI', where: 'CDMX', date: 'Feb 2022 – Ene 2023',
                b: [
                    'Control de pagos a proveedores y aseguradoras, registros contables y conciliaciones.',
                    'Digitalización del flujo de pagos y validación documental.'
                ]
            },
            {
                role: 'Auxiliar contable y administrativo', org: 'Despacho Contable AM · Alcaldía Cuajimalpa', where: 'CDMX', date: '2019 – 2022',
                b: ['Pólizas, estados financieros iniciales, bases de datos administrativas y control documental.']
            }
        ],
        projT: 'Proyectos',
        proj: [
            ['Timbra', 'Facturación CFDI 4.0 en producción; pago por timbre, sin renta mensual.'],
            ['Inteligencia MX', 'Conocimiento fiscal estructurado como datos, base para asistentes de IA con referencias.'],
            ['Validación masiva de CFDI', 'Python para validar y clasificar XML de múltiples razones sociales.'],
            ['Flujos de IA para PyMEs', 'n8n + LLMs con supervisión humana en decisiones fiscales.']
        ],
        skillsT: 'Habilidades',
        skills: [
            ['IA y automatización', 'LLMs / prompting, agentes de IA, n8n, Python, APIs y webhooks, GitHub, Linux CLI'],
            ['Datos y producto', 'SQL, Power BI, Business Intelligence, desarrollo web, Notion, Google Workspace'],
            ['Fiscal y contable', 'CFDI 4.0, SAT, DIOT, cálculo de impuestos, estados financieros, conciliaciones, cierre mensual'],
            ['Sistemas', 'SAP Business One, Dynamics 365, Aspel COI, Odoo, Microsoft Office']
        ],
        eduT: 'Formación',
        edu: [
            ['Lic. en Inteligencia Artificial', 'UTEL Universidad', 'En curso'],
            ['Lic. en Contaduría Pública', 'CESCIJUC · Cédula Profesional 13758780', '2019 – 2023']
        ],
        certT: 'Certificaciones',
        cert: '+50 cursos: Ciberseguridad (12), Fiscal (11), Inteligencia Artificial (9), Privacidad de datos (8), Finanzas corporativas (7), Automatización (5).',
        langT: 'Idiomas',
        langs: 'Español (nativo) · Inglés (técnico)'
    },
    en: {
        lang: 'en',
        role: 'AI Engineer · Certified Public Accountant',
        loc: 'Mexico City · Remote · Project or goal-based',
        sumT: 'Profile',
        summary: 'AI Engineer with 6+ years of experience as a Certified Public Accountant. I build automations, AI agents and tax tools that understand how accounting really works in Mexico. I have managed accounting and tax operations for 86+ companies and currently handle 14+ radio stations. Looking for remote, goal-based projects where AI cuts manual hours and errors in finance.',
        expT: 'Experience',
        exp: [
            {
                role: 'Accountant · AI Automation', org: 'Grupo Radio Centro', where: 'Mexico City', date: 'Mar 2026 – Present',
                b: [
                    'Bookkeeping and month-end close for 14+ radio stations and 1 payroll company.',
                    'AI-assisted workflows to post journal entries, reconcile banks and compare trial balances against SAP Business One.',
                    'Intercompany transfers and tax control across the group.'
                ]
            },
            {
                role: 'AI Engineer & Founder', org: 'EDDP Servicios', where: 'Remote', date: 'Sep 2025 – Present',
                b: [
                    'Designed and built Timbra, a CFDI 4.0 e-invoicing platform with no monthly fee (factura.erickddp.com).',
                    'Inteligencia MX: public tax console with 27 laws linked to official sources, 137 statutory figures and 129 calculation rules.',
                    'Automations with n8n, Python and LLMs for clients: expense classification, reporting and assistants.',
                    'Websites and online stores for businesses, plus accounting and tax guidance for SMBs.'
                ]
            },
            {
                role: 'Junior Accountant · Automation', org: 'Corporativo Dormimundo', where: 'Mexico City', date: 'Jan 2023 – Sep 2025',
                b: [
                    'Accounting for up to 20 legal entities in parallel: taxes, DIOT filings, reconciliations and financial reports.',
                    'Automated CFDI validation and classification with Python workflows.',
                    'Built operational dashboards to track KPIs and internal controls.'
                ]
            },
            {
                role: 'Accounts Payable Lead', org: 'PINFRA PDI', where: 'Mexico City', date: 'Feb 2022 – Jan 2023',
                b: [
                    'Managed payments to vendors and insurers, bookkeeping and reconciliations.',
                    'Digitized the payments workflow and document validation.'
                ]
            },
            {
                role: 'Accounting & Administrative Assistant', org: 'AM Accounting Firm · Cuajimalpa Municipality', where: 'Mexico City', date: '2019 – 2022',
                b: ['Journal entries, initial financial statements, administrative databases and document control.']
            }
        ],
        projT: 'Projects',
        proj: [
            ['Timbra', 'CFDI 4.0 e-invoicing in production; pay per stamp, no monthly fee.'],
            ['Inteligencia MX', 'Mexican tax knowledge structured as data; foundation for AI assistants with references.'],
            ['Bulk CFDI validation', 'Python to validate and classify XML invoices across multiple entities.'],
            ['AI workflows for SMBs', 'n8n + LLMs with a human in the loop on tax decisions.']
        ],
        skillsT: 'Skills',
        skills: [
            ['AI & automation', 'LLMs / prompting, AI agents, n8n, Python, APIs & webhooks, GitHub, Linux CLI'],
            ['Data & product', 'SQL, Power BI, Business Intelligence, web development, Notion, Google Workspace'],
            ['Tax & accounting', 'CFDI 4.0 (Mexican e-invoicing), SAT, DIOT, tax calculation, financial statements, reconciliations, month-end close'],
            ['Systems', 'SAP Business One, Dynamics 365, Aspel COI, Odoo, Microsoft Office']
        ],
        eduT: 'Education',
        edu: [
            ['B.Sc. in Artificial Intelligence', 'UTEL University', 'In progress'],
            ['B.A. in Public Accounting (CPA)', 'CESCIJUC · Professional License 13758780', '2019 – 2023']
        ],
        certT: 'Certifications',
        cert: '50+ courses: Cybersecurity (12), Tax (11), Artificial Intelligence (9), Data privacy (8), Corporate finance (7), Automation (5).',
        langT: 'Languages',
        langs: 'Spanish (native) · English (technical)'
    }
};

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function html(t) {
    const exp = t.exp.map(e => `
      <div class="job">
        <div class="job-h"><h3>${esc(e.role)} <span class="org">· ${esc(e.org)}</span></h3><span class="date">${esc(e.date)}</span></div>
        <ul>${e.b.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>`).join('');
    return `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8">
<title>Erick Domínguez Del Prado — CV</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  @page { size: Letter; margin: 10mm 13mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.1pt/1.38 "Plus Jakarta Sans", Arial, sans-serif; color: #18181b; }
  a { color: inherit; text-decoration: none; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px;
           padding-bottom: 10px; border-bottom: 2px solid #0284c7; }
  h1 { margin: 0; font-size: 23pt; font-weight: 800; letter-spacing: -0.02em; line-height: 1.05; }
  .role { margin-top: 4px; font-size: 11.5pt; font-weight: 700; color: #0369a1; }
  .loc { margin-top: 2px; font-size: 9pt; color: #52525b; }
  .contact { text-align: right; font-size: 8.6pt; color: #3f3f46; line-height: 1.55; }
  .contact b { color: #18181b; font-weight: 600; }
  section { margin-top: 10px; }
  h2 { margin: 0 0 6px; font: 500 8.4pt "JetBrains Mono", monospace; text-transform: uppercase;
       letter-spacing: .12em; color: #0369a1; }
  p { margin: 0; }
  .summary { color: #27272a; }
  .job { margin-bottom: 6px; break-inside: avoid; }
  .job-h { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  h3 { margin: 0; font-size: 10.2pt; font-weight: 700; }
  .org { font-weight: 500; color: #52525b; }
  .date { flex: none; font: 500 8.2pt "JetBrains Mono", monospace; color: #52525b; }
  ul { margin: 3px 0 0; padding-left: 14px; }
  li { margin: 1px 0; color: #3f3f46; }
  li::marker { color: #0284c7; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 18px; }
  .proj b, .sk b { font-weight: 700; color: #18181b; }
  .proj p, .sk p { color: #3f3f46; }
  .sk p { margin-bottom: 3px; }
  .edu { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 3px; }
  .edu span { color: #52525b; }
  .muted { color: #3f3f46; }
</style></head><body>
<header>
  <div>
    <h1>Erick Domínguez Del Prado</h1>
    <div class="role">${esc(t.role)}</div>
    <div class="loc">${esc(t.loc)}</div>
  </div>
  <div class="contact">
    <div><b>${CONTACT.email}</b></div>
    <div>${CONTACT.phone}</div>
    <div><a href="https://${CONTACT.web}">${CONTACT.web}</a> · <a href="https://${CONTACT.site}">${CONTACT.site}</a></div>
    <div><a href="https://www.${CONTACT.linkedin}">${CONTACT.linkedin}</a></div>
    <div><a href="https://${CONTACT.github}">${CONTACT.github}</a></div>
  </div>
</header>

<section><h2>${t.sumT}</h2><p class="summary">${esc(t.summary)}</p></section>

<section><h2>${t.expT}</h2>${exp}</section>

<section><h2>${t.projT}</h2>
  <div class="two proj">${t.proj.map(p => `<p><b>${esc(p[0])}</b> — ${esc(p[1])}</p>`).join('')}</div>
</section>

<section><h2>${t.skillsT}</h2>
  <div class="sk">${t.skills.map(s => `<p><b>${esc(s[0])}:</b> ${esc(s[1])}</p>`).join('')}</div>
</section>

<section><h2>${t.eduT}</h2>
  ${t.edu.map(e => `<div class="edu"><div><b>${esc(e[0])}</b> · <span>${esc(e[1])}</span></div><span class="date">${esc(e[2])}</span></div>`).join('')}
</section>

<section class="two">
  <div><h2>${t.certT}</h2><p class="muted">${esc(t.cert)}</p></div>
  <div><h2>${t.langT}</h2><p class="muted">${esc(t.langs)}</p></div>
</section>
</body></html>`;
}

(async () => {
    const browser = await chromium.launch();
    for (const [key, file] of [['es', 'cv.pdf'], ['en', 'cv-en.pdf']]) {
        const page = await browser.newPage();
        await page.setContent(html(T[key]), { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const out = path.join(__dirname, '..', 'assets', file);
        await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
        console.log('wrote', out);
        await page.close();
    }
    await browser.close();
})();
