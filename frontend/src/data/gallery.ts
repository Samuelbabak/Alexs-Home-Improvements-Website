import metadata from './gallery.json';
import type { ProjectDisplayData } from '../components/ProjectDisplay';

interface GalleryMetadata {
  id: string;
  folder: string;
  title: string;
  location?: string;
  category: string;
  description?: string;
}

const mediaFiles = import.meta.glob('/media/projects/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const prefixOrder = ['before', 'damage', 'progress', 'after'];

const prefixFor = (path: string) => {
  const filename = path.split('/').pop()?.toLowerCase() ?? '';
  return prefixOrder.find((prefix) => filename.startsWith(prefix)) ?? 'after';
};

const sortMedia = (first: string, second: string) => {
  const firstPrefix = prefixOrder.indexOf(prefixFor(first));
  const secondPrefix = prefixOrder.indexOf(prefixFor(second));
  if (firstPrefix !== secondPrefix) return firstPrefix - secondPrefix;
  return first.localeCompare(second, undefined, { numeric: true });
};

export const PROJECTS: ProjectDisplayData[] = (metadata as GalleryMetadata[]).map((project) => {
  const paths = Object.keys(mediaFiles)
    .filter((path) => path.includes(`/media/projects/${project.folder}/`))
    .sort(sortMedia);

  return {
    ...project,
    images: paths.filter((path) => prefixFor(path) !== 'before').map((path) => mediaFiles[path]),
    coverImage: paths.find((path) => prefixFor(path) === 'after') ? mediaFiles[paths.find((path) => prefixFor(path) === 'after')!] : undefined,
    beforeImages: paths
      .filter((path) => prefixFor(path) === 'before')
      .map((path) => mediaFiles[path]),
  };
});
