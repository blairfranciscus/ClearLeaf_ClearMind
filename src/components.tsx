import { asset, pages, type Page } from './content';

export function Header({ page }: { page: Page }) {
  return (
    <header className="site-header wrap">
      <a className="brand" href="./" aria-label="Clearleaf home">Clearleaf<span>Clear Mind, Clearleaf.</span></a>
      <nav aria-label="Main navigation">
        {pages.map(link => <a key={link.id} href={link.href} aria-current={page === link.id ? 'page' : undefined}>{link.name}</a>)}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-content">
        <div><a className="footer-brand" href="./">Clearleaf</a><p>Clear Mind, Clearleaf.</p></div>
        <nav aria-label="Footer navigation">{pages.map(link => <a key={link.id} href={link.href}>{link.name}</a>)}</nav>
      </div>
      <div className="wrap"><img className="flower-border" src={asset('wildflower-border')} alt="" width="2532" height="666" loading="lazy"/><p className="project-note">A University of Sydney marketing project. Clearleaf is a brand concept.</p></div>
    </footer>
  );
}

export function PageLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <a className={secondary ? 'page-link secondary' : 'page-link'} href={href}>{children}<span aria-hidden="true">↗</span></a>;
}
