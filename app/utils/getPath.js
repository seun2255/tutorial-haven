function getPath(path) {
  const parts = path.split("/");
  return parts[parts.length - 1];
}

export default getPath;
