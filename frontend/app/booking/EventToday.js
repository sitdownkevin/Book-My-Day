

const settings = {
  start_ts: new Date(2023, 11, 9, 7, 0, 0),
  end_ts: new Date(2023, 11, 9, 21, 0, 0),
  height_ratio: 1000,
};

function formatTime(hours, minutes) {
  let h = hours;
  let m = minutes;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  return `${h}:${m}`;
}

function DisplayMode(props) {
  var mode;
  if (props.event.type == "fake") {
    mode = null;
  } else if (Number(props.event.style.height.split("px")[0]) < 120) {
    mode = 0;
  } else if (Number(props.event.style.height.split("px")[0]) < 200) {
    mode = 1;
  } else {
    mode = 2;
  }

  switch (mode) {
    case 0:
      return (
        <>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row space-x-4">
              <p className="text-3xl">
                {props.eventTodayDb[props.event.id].name}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-2xl">
              {formatTime(
                props.event.start_ts.getHours(),
                props.event.start_ts.getMinutes()
              )}
            </p>
            <p className="text-2xl ">
              {formatTime(
                props.event.end_ts.getHours(),
                props.event.end_ts.getMinutes()
              )}
            </p>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              <p>{props.eventTodayDb[props.event.id].description}</p>
            </div>

            <div className="flex flex-row space-x-4">
              <p className="text-3xl">
                {props.eventTodayDb[props.event.id].name}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-2xl">
              {formatTime(
                props.event.start_ts.getHours(),
                props.event.start_ts.getMinutes()
              )}
            </p>
            <p className="text-2xl ">
              {formatTime(
                props.event.end_ts.getHours(),
                props.event.end_ts.getMinutes()
              )}
            </p>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              <p>{props.eventTodayDb[props.event.id].description}</p>
            </div>

            <div className="flex flex-row space-x-4">
              <p className="text-3xl">
                {props.eventTodayDb[props.event.id].name}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-2xl">
              {formatTime(
                props.event.start_ts.getHours(),
                props.event.start_ts.getMinutes()
              )}
            </p>
            <p className="text-2xl ">
              {formatTime(
                props.event.end_ts.getHours(),
                props.event.end_ts.getMinutes()
              )}
            </p>
          </div>
        </>
      );
    default:
      return <></>;
  }
}

function EventToday({ eventToday, eventTodayDb, selectedTs }) {
  var renderedEventToday = [];
  for (let i = 0; i < eventToday.length; i++) {
    if (i == 0) {
      var fake_item = {
        type: "fake",
        id: "fake",
        className:
          "flex flex-row justify-between border border-red-200 hover:bg-red-200 hover:cursor-pointer",
        style: {},
        start_ts: settings.start_ts,
        end_ts: eventToday[0].start_ts,
      };

      fake_item.style["height"] = `${((fake_item.end_ts - fake_item.start_ts) /
        (settings.end_ts - settings.start_ts)) *
        settings.height_ratio
        }px`;

      renderedEventToday.push(fake_item);
    }

    var real_item = {
      type: "event",
      className: "flex flex-row justify-between border rounded-lg",
      style: {},
      ...eventToday[i],
    };

    real_item.style["height"] = `${((real_item.end_ts - real_item.start_ts) /
      (settings.end_ts - settings.start_ts)) *
      settings.height_ratio
      }px`;

    renderedEventToday.push(real_item);

    if (eventToday[i].end_ts != settings.end_ts) {
      var fake_item = {
        type: "fake",
        id: "fake",
        className:
          "flex flex-row justify-between border p-4 border-red-200 hover:bg-red-300 hover:cursor-pointer",
        style: {},
        start_ts: eventToday[0].end_ts,
        end_ts:
          i == eventToday.length - 1
            ? settings.end_ts
            : eventToday[i + 1].start_ts,
      };

      fake_item.style["height"] = `${((fake_item.end_ts - fake_item.start_ts) /
        (settings.end_ts - settings.start_ts)) *
        settings.height_ratio
        }px`;

      renderedEventToday.push(fake_item);
    }
  }

  return (
    <>
      <main className="flex flex-col w-96 h-5/6 px-4 align-item overflow-y-auto">
        <h1 className="text-5xl">{(new Date(selectedTs)).toDateString()}</h1>
        {renderedEventToday.map((event, index) => {
          return (
            <div className={event.className} style={event.style} key={index}>
              {
                <DisplayMode
                  eventTodayDb={eventTodayDb}
                  event={event}
                />
              }
            </div>
          );
        })}
      </main>
    </>
  );
}

export { EventToday };
