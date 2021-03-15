export const lists = [
  {
    id: '1',
    name: 'Shopping',
    users: [{
      id: '120',
      name: 'Arek'
    }],
    items: [
      {
        id: '11',
        name: 'milk',
        stage: 'items'
      },
      {
        id: '12',
        name: 'bread',
        stage: 'items'
      },
      {
        id: '13',
        name: 'coffee',
        stage: 'items'
      }
    ]
  },
  {
    id: '2',
    name: 'Task',
    users: [{
      id: '120',
      name: 'Arek'
    }],
    items: [
      {
        id: '21',
        name: 'Program',
        stage: 'items'
      },
      {
        id: '22',
        name: 'Fresh',
        stage: 'done'
      },
    ]
  },
  {
    id: '3',
    name: 'To build',
    users: [{
      id: '150',
      name: 'Arek'
    }],
    items: [
      {
        id: '31',
        name: 'House',
        stage: 'items'
      },
      {
        id: '32',
        name: 'Car',
        stage: 'items'
      }
    ]
  }
]

export const projects = [
  {
    id: '1',
    name: 'AX Office',
    users: [
      {
        name: 'Arek',
        id: '120'
      }
    ],
    tasks: [
      {
        id: '123',
        name: 'Styling',
        desc: 'Make a styling for all inputs on projects',
        date: ''
      },

    ]
  }
]