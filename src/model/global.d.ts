interface FileSystemDirectoryHandle {
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
  keys(): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<FileSystemHandle>;
}

interface Window {
  showDirectoryPicker(options?: {
    mode?: 'read' | 'readwrite';
    excludeAcceptAllOption?: boolean;
    startIn?: 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | FileSystemHandle;
    id?: string;
  }): Promise<FileSystemDirectoryHandle>;
}
