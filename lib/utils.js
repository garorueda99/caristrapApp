export const formatList = (data) => {
  const formattedList = [];
  data.forEach((element) => {
    const date = new Date(element.startDate);
    formattedList.push({
      ...element,
      startDate: new Intl.DateTimeFormat('en-US').format(date),
    });
  });
  return formattedList;
  // [
  //   {
  //     _id: '5fb580187b9f1422706703f3',
  //     frequency: 'none',
  //     machine_name: 'Narrow fabric Loom',
  //     startDate: '11/28/2020',
  //     status: 'Open',
  //     tag: '1',
  //     title: 'Oil Change',
  //   },
  // ];
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
