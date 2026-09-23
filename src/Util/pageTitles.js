const normalizePath = (pathname = '') => {
  const normalized = String(pathname || '').replace(/^#/, '').replace(/\/+$/, '') || '/';
  return normalized === '/' ? '/' : normalized;
};

const formatSegment = (segment = '') => {
  if (!segment) return '';

  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => {
      const clean = part.replace(/\./g, ' ');
      if (!clean) return '';
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    })
    .join(' ');
};

const buildPageLabel = (pathname = window.location.pathname) => {
  const route = normalizePath(pathname);

  if (route === '/') {
    return 'Home';
  }

  const segments = route.split('/').filter(Boolean);

  if (segments[0] === 'modulo' || /^modulo-\d+$/i.test(segments[0])) {
    const moduloMatch = route.match(/modulo-(\d+)/i);
    const moduloNumber = moduloMatch ? moduloMatch[1] : segments[0].replace(/\D/g, '');

    if (segments[1] && /^aula-\d+$/i.test(segments[1])) {
      const aulaMatch = route.match(/aula-(\d+)/i);
      const aulaNumber = aulaMatch ? aulaMatch[1] : segments[1].replace(/\D/g, '');
      return `Módulo ${moduloNumber} - Aula ${aulaNumber}`;
    }

    return `Módulo ${moduloNumber}`;
  }

  if (segments[0] === 'teclado' && segments.length > 1) {
    return `Teclado - ${segments.slice(1).map(formatSegment).join(' - ')}`;
  }

  if (segments.length === 1) {
    return formatSegment(segments[0]) || 'Home';
  }

  return segments.map(formatSegment).join(' - ');
};

export function getPageTitleFromPath(pathname = window.location.pathname) {
  const pageLabel = buildPageLabel(pathname);
  if (pageLabel === 'Home') {
    return 'MS Music Space';
  }

  return `MS Music Space - ${pageLabel}`;
}
