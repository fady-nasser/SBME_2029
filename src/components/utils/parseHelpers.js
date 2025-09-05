// Split multiple links separated by "|"
export function splitLinks(cell) {
  return (cell || "").split("|").map((s) => s.trim()).filter(Boolean);
}

// Convert "PHY-1-Lecture" into { subject_code, number, type }
export function parseLectureId(idStr) {
  if (!idStr) return null;
  const [subject_code, number, type] = idStr.split("-");
  return { subject_code, number, type };
}

// Find lecture in lectures array
export function findLecture(lectures, idStr) {
  const id = parseLectureId(idStr);
  return lectures.find(
    (l) =>
      l.subject_code === id.subject_code &&
      String(l.number) === String(id.number) &&
      l.type === id.type
  );
}
