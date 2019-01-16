import v4 from 'uuid'

export default function () {
  let data = []
  for (let i = 0; i < 1000; i++) {
    data = [...data, {
      id: v4(),
      column1: v4(),
      column2: v4(),
      column3: v4()
    }]
  }
  return data
}
