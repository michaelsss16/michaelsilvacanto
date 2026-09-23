const normalizePath = (pathname = '') => {
  const normalized = String(pathname || '').replace(/^#/, '').replace(/\/+$/, '') || '/';
  return normalized === '/' ? '/' : normalized;
};

const formatSegment = (segment = '') => {
  if (!segment) {
    return '';
  }

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

export function getPageTitleFromPath(pathname = window.location.pathname) {
  const route = normalizePath(pathname);

  if (route === '/') {
    return 'Michael Silva - Music Space';
  }

  const segments = route.split('/').filter(Boolean);

  if (segments[0] === 'modulo' || /^modulo-\d+$/.test(segments[0])) {
    const moduloMatch = route.match(/modulo-(\d+)/i);
    if (segments[1] && /^aula-\d+$/i.test(segments[1])) {
      const aulaMatch = route.match(/aula-(\d+)/i);
      return `Módulo ${moduloMatch ? moduloMatch[1] : segments[0].replace(/\D/g, '')} - Aula ${aulaMatch ? aulaMatch[1] : segments[1].replace(/\D/g, '')}`;
    }

    return moduloMatch
      ? `Módulo ${moduloMatch[1]}`
      : formatSegment(segments[0]);
  }

  if (segments[0] === 'teclado' && segments.length > 1) {
    return `Teclado - ${segments.slice(1).map(formatSegment).join(' - ')}`;
  }

  if (segments.length === 1) {
    return formatSegment(segments[0]) || 'Michael Silva - Music Space';
  }

  return segments.map(formatSegment).join(' - ');
}
