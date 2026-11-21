import { describe, expect, it } from 'vitest';
import { projectWebsiteUrl } from '@/lib/utils/shell/project-website';

describe('localized project website links', () => {
  it.each([
    ['zh-CN', '/zh'],
    ['zh-TW', '/tw'],
    ['ja-JP', '/ja'],
    ['ko-KR', ''],
    ['ru-RU', ''],
    ['en-US', ''],
    ['tr-TR', ''],
    ['pt-BR', ''],
    ['unknown', ''],
  ])('maps %s to a stable documentation route without query parameters', (locale, prefix) => {
    expect(projectWebsiteUrl(locale)).toBe(`https://ramonmods.github.io/MangoDisk${prefix}`);
    expect(projectWebsiteUrl(locale, '/docs/ai#custom-service')).toBe(
      `https://ramonmods.github.io/MangoDisk${prefix}/docs/ai#custom-service`
    );
  });
});
