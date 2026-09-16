import { fireEvent, render, screen } from '@testing-library/react';
import MarkdownRenderer from './Components/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: async () => '# Conteúdo de teste'
    });

    window.open = jest.fn();
    Object.defineProperty(window.navigator, 'share', {
      value: undefined,
      configurable: true
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('exibe botão de compartilhar da aula com fallback para WhatsApp', async () => {
    render(<MarkdownRenderer filePath="/michaelsilvacanto/aulas/modulo-1-aula-1.md" />);

    const button = await screen.findByRole('button', { name: /compartilhar aula/i });
    fireEvent.click(button);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
      'noopener,noreferrer'
    );
  });
});
