export const formatList = (data) => {
  const formattedList = [];
  data.todos.forEach((element) => {
    const date = new Date(element.startDate);
    formattedList.push({
      ...element,
      startDate: new Intl.DateTimeFormat('en-US').format(date),
    });
  });
  return formattedList;
  console.log(formmattedList);
};

export const formatUserDate = (data) => {
  const formattedList = [];
  data.forEach((element) => {
    const date = new Date(element.date);
    formattedList.push({
      ...element,
      date: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
      }).format(date),
    });
  });
  return formattedList;
};
