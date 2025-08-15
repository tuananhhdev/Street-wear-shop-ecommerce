import slugify from 'slugify';

export function buildSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'vi',
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
  });
}
