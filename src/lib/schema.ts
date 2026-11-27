// One JSON-LD @graph per page (playbook §11.4, §18.4), centred on the Person (/#person).
const id = (site: string, hash: string) => new URL(`#${hash}`, site).href;

/** @id of the site's main entity: /#person for personal-brand sites (§11.4), otherwise /#organization. */
export const mainEntityId = (site: string, type?: string) => id(site, type === 'Person' ? 'person' : 'organization');

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export interface Entity {
  type?: string;
  name: string;
  jobTitle?: string;
  logo: string;   // absolute URL
  image?: string; // absolute URL
  sameAs?: string[];
}

interface SchemaInput {
  site: string;
  canonical: string;
  title: string;
  description?: string;
  modified?: string;
  pageType?: PageType;
  lang?: string;
  org: Entity;
  extraNodes?: Record<string, unknown>[];
}

export function buildSchema(i: SchemaInput) {
  const { site, canonical, org, lang = 'en-US', pageType = 'WebPage' } = i;
  const entityId = mainEntityId(site, org.type);
  const siteId = id(site, 'website');

  const entity = {
    '@type': org.type ?? 'Organization',
    '@id': entityId,
    name: org.name,
    url: site,
    ...(org.type === 'Person'
      ? { ...(org.jobTitle && { jobTitle: org.jobTitle }), ...(org.image && { image: { '@type': 'ImageObject', '@id': id(site, 'personimage'), url: org.image } }) }
      : { logo: { '@type': 'ImageObject', '@id': id(site, 'logo'), url: org.logo } }),
    ...(org.sameAs?.length && { sameAs: org.sameAs }),
  };

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: site,
    name: org.name,
    publisher: { '@id': entityId },
    inLanguage: lang,
  };

  const webpage = {
    '@type': pageType,
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: i.title,
    ...(i.description && { description: i.description }),
    isPartOf: { '@id': siteId },
    about: { '@id': entityId },
    inLanguage: lang,
    ...(i.modified && { dateModified: i.modified }),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [entity, website, webpage, ...(i.extraNodes ?? [])],
  };
}

export const breadcrumb = (site: string, items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', url: site }, ...items].map((it, n) => ({ '@type': 'ListItem', position: n + 1, name: it.name, item: it.url })),
});
