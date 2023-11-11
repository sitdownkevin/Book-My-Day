const eventToday = [
  {
    start_ts: new Date(2023, 11, 9, 9, 0, 0),
    end_ts: new Date(2023, 11, 9, 10, 50),
    id: "0x14",
  },
  {
    start_ts: new Date(2023, 11, 9, 12, 0, 5),
    end_ts: new Date(2023, 11, 9, 13, 0),
    id: "0x17",
  },
  {
    start_ts: new Date(2023, 11, 9, 19, 0, 0),
    end_ts: new Date(2023, 11, 9, 20, 50),
    id: "0x16",
  },
];

const eventTodayDb = {
  "0x14": {
    name: "吃必胜客",
    description: "公司食堂",
    type: "meal",
  },
  "0x15": {
    name: "吃肯德基",
    description: "休息15分钟",
    type: "break",
  },
  "0x16": {
    name: "运动时间",
    description: "健身房",
    type: "fitness",
  },
  "0x17": {
    name: "电影之夜",
    description: "和朋友看电影",
    type: "entertainment",
  },
};


module.exports = {
  eventToday, 
  eventTodayDb,
}