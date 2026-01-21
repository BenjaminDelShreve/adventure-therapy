export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-bold text-at-dark-green">Adventure Therapy</div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Healing through nature, guided by professionals.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              <a href="#programs" className="hover:text-foreground">
                Programs
              </a>
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#programs" className="text-sm text-foreground/70 hover:text-foreground">
                  Heroes
                </a>
              </li>
              <li>
                <a href="#programs" className="text-sm text-foreground/70 hover:text-foreground">
                  Recovery
                </a>
              </li>
              <li>
                <a href="#programs" className="text-sm text-foreground/70 hover:text-foreground">
                  Couples
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Location</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-foreground/70">
                Founded in Arkansas… 
              </li>
              <li className="text-sm text-foreground/70">
                Adventuring Everywhere
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:jessy@adventuretherapy.com" className="text-sm text-foreground/70 hover:text-foreground break-all sm:break-normal">
                  jessy@adventuretherapy.com
                </a>
              </li>
              <li>
                <a href="tel:+14796444069" className="text-sm text-foreground/70 hover:text-foreground">
                  (479) 644-4069
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-foreground/60">
          <p>© 2026 Adventure Therapy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
