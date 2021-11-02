const process = require("process");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const dd = process.argv[2];

const time = (endtime) => {
  const getTime = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (isNaN(t)) {
      console.log(
        "Введена неправильная дата, введите в формате - 2022-10-10T14:48:00"
      );
    } else {
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const months = Math.floor((t / (1000 * 60 * 60 * 24 * 30)) % 12);
      const years = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12));

      return {
        total: t,
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }
  };

  const updateClock = () => {
    const time = getTime(endtime);
    console.log(
      "Осталось: ",
      " Лет:",
      time.years,
      "-",
      " Месяцев: ",
      time.months,
      "-",
      " Дней:",
      time.days,
      "-",
      " Часов:",
      time.hours,
      "-",
      " Минут:",
      time.minutes,
      "-",
      " Секунд:",
      time.seconds
    );

    if (time.total <= 0) {
      console.log("Timer off");
      clearInterval(timeInterval);
    }
  };
  const timeInterval = setInterval(updateClock, 1000);
  emitter.on("updateTime", updateClock);
};

emitter.emit("updateTime", dd);
//формат ввода даты 2022-10-10T14:48:00
time(dd);
