const toLocalTime = (dt: number, timezone: number) => {
  const time = new Date((dt + timezone) * 1000);
  return time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export default toLocalTime;
