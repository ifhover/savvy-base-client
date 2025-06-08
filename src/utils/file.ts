export function getFileNameFromContentDisposition(header: string) {
  // 匹配 filename*=
  let utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)/i
  let asciiFilenameRegex = /filename="?([^"]+)"?/i

  let utf8Matches = header.match(utf8FilenameRegex)
  if (utf8Matches && utf8Matches[1]) {
    return decodeURIComponent(utf8Matches[1])
  }

  let asciiMatches = header.match(asciiFilenameRegex)
  if (asciiMatches && asciiMatches[1]) {
    return asciiMatches[1]
  }

  return null // 没找到文件名
}
