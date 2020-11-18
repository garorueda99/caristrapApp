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
};
