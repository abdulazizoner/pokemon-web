# Project instructions

- This repository is a static Pokémon card showcase, not an ecommerce backend.
- Sales, payment, orders, customer data, and stock truth live on Shopier.
- WP-04, WP-05, WP-06, WP-07, and WP-08 are locally complete and regression-verified, but the project is not production-live or stakeholder-accepted.
- Keep WP-01, WP-02, WP-03, WP-09, and WP-10 suspended until their company-access gates are satisfied.
- Production output must remain deployable as static files to Natro shared hosting.
- Do not add a backend, database, authentication, cart, checkout, or runtime Node dependency.
- Use Turkish for customer-facing copy.
- All card sale URLs must use `https://www.shopier.com/`.
- Placeholder brand, contacts, products, and images must be visibly identifiable as provisional.
- Real product entries require front and back photographs and an explicit condition note.
- Use `src/content.config.ts` as schema ownership and `src/lib/cards.ts` as the typed collection-access boundary.
- Use Node.js 22.12 or newer and the pinned pnpm package-manager version.
- Run the production build through `pnpm build`; it includes content, type, static-asset, and internal-link validation.
- Run browser regression against `pnpm local:test`, not the development server.
- Preserve keyboard navigation, reduced-motion support, responsive behavior, and semantic HTML.
- Never commit Shopier/Natro credentials, MFA data, company documents, customer data, or real secrets.
