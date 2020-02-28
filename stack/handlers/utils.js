const mapAttendanceSheetRowToObject = (row) => ({
  topicId: row['Topic ID'],
  userId: row['User ID'],
  userName: row.UserName,
  email: row.Email,
  imagePath: row.ImagePath,
  rating: row.Rating,
  comment: row.Comment,
});

const mapTopicSheetRowToObject = (row) => ({
  topicId: row.No,
  date: row.Date,
  name: row.Name,
  owner: row.Owner,
  status: row.Status,
  smeGroup: row['SME Group'],
  duration: row.Duration,
  notes: row.Notes,
});

module.exports = {
  mapAttendanceSheetRowToObject,
  mapTopicSheetRowToObject
}
