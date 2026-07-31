import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Docusaurus site for the Kubernetes JavaScript client docs.
// The API reference is generated from TypeScript via typedoc at build time.
//
// The deployment URL is derived from the environment so the same config works
// for any fork or the upstream repo without hard-coding an owner/repo. On
// GitHub Actions, GITHUB_REPOSITORY is "<owner>/<repo>" and is set automatically;
// values can also be overridden explicitly via env vars for local previews.
const repository = process.env.GITHUB_REPOSITORY ?? 'kubernetes-client/javascript';
const [repoOwner, repoName] = repository.split('/');

const organizationName = process.env.DOCS_ORG ?? repoOwner;
const projectName = process.env.DOCS_REPO ?? repoName;

// GitHub Pages serves user/org sites at https://<owner>.github.io/<repo>/.
const url = process.env.DOCS_URL ?? `https://${organizationName}.github.io`;
const baseUrl = process.env.DOCS_BASE_URL ?? `/${projectName}/`;

const config: Config = {
    title: 'Kubernetes JavaScript Client',
    tagline: 'Node.js & TypeScript client for the Kubernetes API',
    favicon: 'img/favicon.ico',

    url,
    baseUrl,

    organizationName,
    projectName,
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.ts',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themes: [
        [
            '@easyops-cn/docusaurus-search-local',
            {
                hashed: true,
                indexDocs: true,
                indexBlog: false,
                docsRouteBasePath: '/',
            },
        ],
    ],

    themeConfig: {
        navbar: {
            title: 'Kubernetes JS Client',
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docs',
                    position: 'left',
                    label: 'API Reference',
                },
                {
                    href: `https://github.com/${repository}`,
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
