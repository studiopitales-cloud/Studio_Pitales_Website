// Maps original filenames with special chars to sanitized output basenames
const NAME_MAP = {
  '/DSC07873 (1).jpg': '/DSC07873-1',
  '/DSC08236 (1).jpg': '/DSC08236-1',
}

export function srcSet(imgPath, widths) {
  const base = NAME_MAP[imgPath] ?? imgPath.replace('.jpg', '')
  return widths.map(w => `${base}-${w}.jpg ${w}w`).join(', ')
}
