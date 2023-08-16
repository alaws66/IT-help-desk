const formatDate = (string) => {
  const timestamp = Date.parse(string);
  const date = new Date(timestamp);

  const timeOfDay = () => date.getUTCHours() > 12 ? 'pm' : 'am';

  const DMY = date.getDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  const time = date.getUTCHours() + ':' + date.getUTCMinutes() + timeOfDay();

  return DMY + ' ' + time;
}

export default formatDate;