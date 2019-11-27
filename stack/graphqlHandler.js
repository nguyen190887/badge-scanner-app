export const index = async event => {
  console.log('Event', event);
  return [
    {
      id: 1,
      title: 'test 1',
    },
    {
      id: 2,
      title: 'test 2',
    },
  ];
};
