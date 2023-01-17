interface ITime {
  nanoseconds: number;
  seconds: number;
}

const getDate = (time: any) => {
  const date = time.toDate();
  console.log(date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hour = date.getHours();
  hour = hour.toString().padStart(2, "0");
  let min = date.getMinutes();
  min = min.toString().padStart(2, "0");
  return `${month}/${day} ${hour}:${min}`;
};

export default getDate;
